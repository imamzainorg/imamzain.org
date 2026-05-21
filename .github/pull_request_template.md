<!--
PR title must follow Conventional Commits, e.g.:
  feat(library): add reading-progress indicator
  fix(api): restore SSRF check in /api/download
  perf(images): drop unused Cloudinary variants

See CONTRIBUTING.md for the full rules.
-->

## Summary

<!-- 1–3 bullets describing what changed and why. The "why" matters more than the "what" — the diff already shows the what. -->

-
-

## Type

<!-- Pick one. Used to sanity-check your title type. -->

- [ ] `feat` — new user-visible feature
- [ ] `fix` — bug fix
- [ ] `perf` — performance
- [ ] `refactor` — no behavior change
- [ ] `ci` — CI / workflow changes
- [ ] `chore` — tooling / config / content
- [ ] `docs` — docs only
- [ ] `release` — release-please-managed release PR (auto-generated; tick only if you understand why)

## Test plan

<!-- A bulleted checklist a reviewer can actually follow. -->

- [ ]
- [ ]

## Screenshots / clips

<!-- Required for any UI change. Drag-drop into this box. -->

## Checklist

- [ ] Branch is up to date with `main`
- [ ] `bun run lint` passes locally
- [ ] `bun run build` passes locally
- [ ] I opened the affected pages in a browser and clicked around
- [ ] No `console.log`, dead code, or commented-out blocks left behind
- [ ] If this is a breaking change, the commit subject has `!` or the body has a `BREAKING CHANGE:` footer
