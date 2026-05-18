#!/usr/bin/env node
// Release script for imamzain.org
// Usage:
//   bun run release                  # auto-detect bump from commits, interactive confirm
//   bun run release -- --minor       # force minor bump
//   bun run release -- --dry-run     # preview only, no writes
//   bun run release -- --yes         # skip confirm
//   bun run release -- --skip-push   # don't push tag/branch
//   bun run release -- --skip-gh     # don't create GitHub Release
//
// Prerequisites:
//   - On `main` branch, clean working tree, up-to-date with origin/main
//   - `gh` CLI installed and authenticated (unless --skip-gh)

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const pkgPath = resolve(repoRoot, "package.json");
const changelogPath = resolve(repoRoot, "CHANGELOG.md");

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const args = {
	major: flag("--major"),
	minor: flag("--minor"),
	patch: flag("--patch"),
	dryRun: flag("--dry-run"),
	yes: flag("--yes"),
	skipPush: flag("--skip-push"),
	skipGh: flag("--skip-gh"),
	allowDirty: flag("--allow-dirty"),
	forceBranch: flag("--force-branch"),
	help: flag("--help") || flag("-h"),
};

if (args.help) {
	console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1, 14).join("\n").replace(/^\/\/ ?/gm, ""));
	process.exit(0);
}

const sh = (cmd, opts = {}) =>
	execSync(cmd, { cwd: repoRoot, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], ...opts }).trim();

const shTry = (cmd) => {
	try {
		return sh(cmd);
	} catch {
		return null;
	}
};

const die = (msg) => {
	console.error(`\nrelease: ${msg}\n`);
	process.exit(1);
};

// --- Preflight ----------------------------------------------------------------

const branch = sh("git rev-parse --abbrev-ref HEAD");
if (branch !== "main" && !args.forceBranch) {
	die(`must be on 'main' (currently on '${branch}'). Use --force-branch to override.`);
}

const dirty = sh("git status --porcelain");
if (dirty && !args.allowDirty) {
	die(`working tree is dirty. Commit/stash first, or pass --allow-dirty.\n${dirty}`);
}

if (!args.dryRun) {
	try {
		sh("git fetch origin --tags");
	} catch (e) {
		console.warn(`release: warning — git fetch failed (${e.message}). Continuing.`);
	}
	const local = shTry(`git rev-parse ${branch}`);
	const remote = shTry(`git rev-parse origin/${branch}`);
	if (local && remote && local !== remote) {
		die(`local '${branch}' is not in sync with origin/${branch}. Pull/push first.`);
	}
}

// --- Read current version + last tag -----------------------------------------

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const currentVersion = pkg.version;

const lastTag = shTry(`git describe --tags --abbrev=0 --match "v*.*.*"`);
const tagRange = lastTag ? `${lastTag}..HEAD` : "HEAD";

// Collect commits since last tag (or whole history if no tag yet). Exclude merges
// so we list real changes, not the merge-commit noise from PRs.
const rawLog = shTry(`git log ${tagRange} --no-merges --pretty=format:"%H%x09%s%x09%b%x1e"`);
const commits = (rawLog || "")
	.split("\x1e")
	.map((c) => c.trim())
	.filter(Boolean)
	.map((c) => {
		const [hash, subject, body] = c.split("\t");
		return { hash, subject: subject || "", body: body || "" };
	});

if (commits.length === 0) {
	die(`no new commits since ${lastTag || "repo start"}. Nothing to release.`);
}

// --- Categorize commits via Conventional Commits -----------------------------

const CONVENTIONAL_RE = /^(?<type>feat|fix|perf|refactor|chore|docs|test|style|build|ci|revert)(?<scope>\([^)]+\))?(?<breaking>!)?:\s*(?<subject>.+)$/;

const groups = {
	breaking: [],
	feat: [],
	fix: [],
	perf: [],
	refactor: [],
	chore: [],
	docs: [],
	test: [],
	style: [],
	build: [],
	ci: [],
	revert: [],
	other: [],
};

let hasBreaking = false;
let hasFeat = false;

for (const c of commits) {
	const m = c.subject.match(CONVENTIONAL_RE);
	const breakingFooter = /^BREAKING CHANGE:/m.test(c.body);
	if (m) {
		const type = m.groups.type;
		const bang = !!m.groups.breaking;
		const entry = {
			scope: m.groups.scope ? m.groups.scope.slice(1, -1) : null,
			subject: m.groups.subject.trim(),
			hash: c.hash.slice(0, 7),
		};
		if (bang || breakingFooter) {
			hasBreaking = true;
			groups.breaking.push(entry);
		}
		groups[type].push(entry);
		if (type === "feat") hasFeat = true;
	} else {
		groups.other.push({ scope: null, subject: c.subject, hash: c.hash.slice(0, 7) });
	}
}

// --- Decide bump -------------------------------------------------------------

let bump;
if (args.major) bump = "major";
else if (args.minor) bump = "minor";
else if (args.patch) bump = "patch";
else if (hasBreaking) bump = "major";
else if (hasFeat) bump = "minor";
else bump = "patch";

const [maj, min, pat] = currentVersion.split(".").map(Number);
const nextVersion =
	bump === "major" ? `${maj + 1}.0.0` :
	bump === "minor" ? `${maj}.${min + 1}.0` :
	`${maj}.${min}.${pat + 1}`;

// --- Build changelog section -------------------------------------------------

const today = new Date().toISOString().slice(0, 10);

const sectionTitles = {
	breaking: "Breaking Changes",
	feat: "Features",
	fix: "Bug Fixes",
	perf: "Performance",
	refactor: "Refactoring",
	docs: "Documentation",
	test: "Tests",
	build: "Build",
	ci: "CI",
	style: "Style",
	chore: "Chores",
	revert: "Reverts",
	other: "Other",
};

const renderSection = (key) => {
	const items = groups[key];
	if (!items.length) return "";
	const lines = items.map((e) => {
		const scope = e.scope ? `**${e.scope}:** ` : "";
		return `- ${scope}${e.subject} (${e.hash})`;
	});
	return `### ${sectionTitles[key]}\n\n${lines.join("\n")}\n`;
};

const orderedKeys = ["breaking", "feat", "fix", "perf", "refactor", "docs", "build", "ci", "test", "style", "chore", "revert", "other"];
const newSection = `## [${nextVersion}] - ${today}\n\n${orderedKeys.map(renderSection).filter(Boolean).join("\n")}`;

// --- Preview -----------------------------------------------------------------

console.log("");
console.log(`  Current version : ${currentVersion}`);
console.log(`  Last tag        : ${lastTag || "(none — first tagged release)"}`);
console.log(`  Commits since   : ${commits.length}`);
console.log(`  Bump            : ${bump}${args[bump] ? " (forced via flag)" : " (auto-detected)"}`);
console.log(`  Next version    : ${nextVersion}`);
console.log("");
console.log("--- CHANGELOG preview ".padEnd(78, "-"));
console.log(newSection);
console.log("".padEnd(78, "-"));
console.log("");

if (args.dryRun) {
	console.log("release: --dry-run, no changes made.");
	process.exit(0);
}

if (!args.yes) {
	const rl = readline.createInterface({ input: stdin, output: stdout });
	const answer = (await rl.question(`Proceed with release v${nextVersion}? [y/N] `)).trim().toLowerCase();
	rl.close();
	if (answer !== "y" && answer !== "yes") {
		console.log("release: aborted.");
		process.exit(0);
	}
}

// --- Write package.json + CHANGELOG.md ---------------------------------------

pkg.version = nextVersion;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

let changelog;
try {
	changelog = readFileSync(changelogPath, "utf8");
} catch {
	changelog = `# Changelog\n\nAll notable changes to imamzain.org are documented here.\nFormat follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).\nVersion numbers follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n## [Unreleased]\n`;
}

// Insert the new section right after the "## [Unreleased]" marker if present,
// else right after the header block.
if (changelog.includes("## [Unreleased]")) {
	changelog = changelog.replace("## [Unreleased]\n", `## [Unreleased]\n\n${newSection}\n`);
} else {
	changelog = changelog.trimEnd() + `\n\n${newSection}\n`;
}
writeFileSync(changelogPath, changelog);

// --- Commit + tag ------------------------------------------------------------

sh(`git add package.json CHANGELOG.md`);
sh(`git commit -m "chore(release): v${nextVersion}"`);
sh(`git tag -a v${nextVersion} -m "Release v${nextVersion}"`);
console.log(`release: created tag v${nextVersion}`);

if (!args.skipPush) {
	sh(`git push origin ${branch}`);
	sh(`git push origin v${nextVersion}`);
	console.log(`release: pushed ${branch} and v${nextVersion}`);
} else {
	console.log(`release: --skip-push set, did not push.`);
}

// --- GitHub Release ----------------------------------------------------------

if (!args.skipGh && !args.skipPush) {
	const hasGh = shTry("gh --version");
	if (!hasGh) {
		console.warn(`release: 'gh' CLI not found, skipping GitHub Release. Install from https://cli.github.com or pass --skip-gh next time.`);
	} else {
		const notesPath = resolve(repoRoot, `.release-notes-${nextVersion}.tmp.md`);
		writeFileSync(notesPath, newSection);
		try {
			sh(`gh release create v${nextVersion} --title "v${nextVersion}" --notes-file "${notesPath}"`);
			console.log(`release: created GitHub Release v${nextVersion}`);
		} catch (e) {
			console.warn(`release: gh release create failed — ${e.message}. The tag is pushed; you can create the Release manually.`);
		} finally {
			try {
				execSync(`node -e "require('fs').unlinkSync('${notesPath.replace(/\\/g, "\\\\")}')"`);
			} catch {}
		}
	}
}

console.log(`\nrelease: done. v${nextVersion} is live.`);
