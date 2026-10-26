<!--
PR title must follow Conventional Commits, e.g.
  feat(doctor): add prescription print button
  fix(opd): keep table filters after refresh
With squash merge, the title becomes the commit message on main and decides the next version.
-->

## What changed

<!-- What does this PR do, and why? Keep it short. -->

## Related issue

<!-- e.g. Closes #123. Write "None" if there isn't one. -->

## Type of change

- [ ] `feat`: new feature for users
- [ ] `fix`: bug fix for users
- [ ] Breaking change (`feat!` / `fix!`): existing behaviour changes
- [ ] `refactor`, `style`, `perf`, `test`, `docs`, `chore`, `ci` or `build`: no change for users
- [ ] Hotfix: targets a `hotfix/*` branch

## Screenshots

<!-- For UI changes, add before/after screenshots or a short screen recording. Delete this section otherwise. -->

## How to test

<!-- Steps a reviewer can follow to check the change, including the role to log in with. -->

1.

## Checklist

- [ ] PR title follows Conventional Commits
- [ ] Tests added or updated for the change
- [ ] `pnpm lint`, `pnpm format:check`, `pnpm test` and `pnpm build` pass locally
- [ ] Checked in the browser, including at small screen sizes if the UI changed
- [ ] Storybook stories added or updated for new or changed shared components
- [ ] No secrets, API keys, or real patient data in code, screenshots or test data
- [ ] Docs updated if setup, scripts or workflows changed
