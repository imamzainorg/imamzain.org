# Git history cleanup runbook (reclaim ~4.5 GB from `.git`)

> Status: **deferred** (2026-06-17). The team chose to postpone the rewrite. This is
> the runbook for when you're ready to coordinate it.

## The problem

The working tree is tiny (HEAD ≈ 42 MB, `public/` ≈ 33 MB) but `.git` is **~4.6 GB**
(`git count-objects -vH` → `size-pack: 4.56 GiB`, 25 packs, 736 loose objects).

Commit `08a067f` *("refactor: deleted all local files now that they are all hosted on a
cdn")* removed the large media from the tree, but the blobs are still reachable from
**every branch**, so they remain in the pack. The media now lives on
`cdn.imamzain.org`, so stripping it from history loses nothing the app uses.

### Dead directories — safe to strip (absent from HEAD, CDN-hosted)

| Path | ~Unique blob size |
|---|---|
| `public/research` | 2.0 GB |
| `public/audio` | 1.4 GB |
| `public/books` | 1.1 GB |
| `public/gallery` | 406 MB |
| `public/news` | 131 MB |
| `public/library` | 114 MB |

Stripping these six drops `.git` from **~4.6 GB → ~30–60 MB**.

### Do NOT strip (still live in HEAD)

`public/images`, `public/general`, `src/data` — these contain files the app currently
serves. A whole-directory `--invert-paths` on them would delete live assets.

## Prerequisites checked on this machine

- `git filter-repo` is **not** installed, but Python 3.14 + pip 25.2 are present →
  `pip install git-filter-repo` works.
- Remote: `https://github.com/imamzainorg/imamzain.org.git`, **11 branches**, 19 refs,
  1557 commits.
- Active branches / automation to coordinate around: `feat/applications-gallery`,
  `fix/qutuf-sajjadiya-start-contract`, `content/add-news-posts`,
  `feat/gallery-featured-images`, `feat/research-component-redesign`,
  `fix/download-filename-preservation`, and the **release-please** branch.

## Before you start

1. **Merge or close open PRs** first (the rewrite changes every commit hash).
2. **Commit or stash the in-progress migration work** in the working tree
   (`public/applications/`, `src/app/applications/`, `src/components/phone-mockup.tsx`,
   `public/theme-init.js`, `next.config.ts` edits, the staged `public/application/*`
   deletions). A re-clone after the rewrite will NOT carry uncommitted changes.
3. **Tell every collaborator** they'll need to re-clone right after the force-push.

## Steps (run from `C:\Users\aboturab\desktop\work`)

```bat
:: 0. Install the tool
pip install git-filter-repo
python -m git_filter_repo --version

:: 1. Full safety backup (mirror = all refs/branches/tags). Keep untouched as rollback.
git clone --mirror https://github.com/imamzainorg/imamzain.org.git imamzain-backup.git

:: 2. Fresh mirror to rewrite (filter-repo refuses to run on a non-fresh working copy)
git clone --mirror https://github.com/imamzainorg/imamzain.org.git imamzain-rewrite.git
cd /d C:\Users\aboturab\desktop\work\imamzain-rewrite.git

:: 3. Strip dead media directories from ALL history
::    (whole dirs only — no Arabic filenames need typing)
python -m git_filter_repo --invert-paths ^
  --path public/research/ --path public/audio/ --path public/books/ ^
  --path public/gallery/ --path public/news/ --path public/library/

:: 4. Aggressive cleanup
git reflog expire --expire=now --all
git gc --prune=now --aggressive

:: 5. VERIFY before pushing — size-pack should be tens of MB, none of the six dirs left
git count-objects -vH
```

```bash
# (bash) confirm no dead-media blobs remain
git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
  < <(git rev-list --objects --all) | sort -k3 -nr | head -20
```

```bat
:: 6. Force-push the rewritten history (ONLY after team is ready)
git push --force --mirror https://github.com/imamzainorg/imamzain.org.git

:: 7. Everyone (including you) re-clones into a clean folder
git clone https://github.com/imamzainorg/imamzain.org.git
```

## Warnings

- **Destructive & shared.** Every commit hash changes on all 11 branches. Anyone who
  pushes from an old clone re-introduces the blobs — everyone MUST re-clone.
- `--force --mirror` **deletes** remote refs not present in your mirror. If unsure,
  push branches explicitly with `--force` instead of `--mirror`.
- **GitHub won't shrink immediately.** Unreachable objects linger until GitHub GCs them
  (open PRs can keep them alive). Your local re-clone shrinks right away; the remote may
  take time — contact GitHub Support to force a GC if needed.
- Re-create/re-base the **release-please** branch after the rewrite or CI may break.

## Rollback

`imamzain-backup.git` is an untouched full mirror. To restore the remote:
`cd imamzain-backup.git && git push --force --mirror https://github.com/imamzainorg/imamzain.org.git`

## Alternatives considered

- **BFG Repo-Cleaner** — works but needs Java (not installed) and is clumsier for
  stripping by directory path. Keep as fallback only.
- **Fresh orphan history** (one commit of current HEAD) — smallest result but destroys
  all 1557 commits of blame/PR history and breaks open work. Not recommended.
