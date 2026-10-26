# Vite CI/CD Playground

A small React + Vite app with the same tooling and CI/CD setup as `abate-emr-frontend-v2`, for trying out the workflow safely.

**Deploys are simulated.** The deploy workflow runs every real step (environments, approvals, variable check, build) but instead of uploading to S3 it prints what it would upload and saves the built site as a downloadable artifact. Nothing is published anywhere.

The app shows which environment, version and commit it was built for, so you can see exactly what each deploy contains.

## Setup on your machine

```bash
corepack enable
pnpm install
cp .env.example .env
pnpm dev
```

## What's configured

| Area                | Files                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Lint, format, types | `eslint.config.js`, `stylelint.config.mjs`, `.prettierrc`, `tsconfig*.json`                                         |
| Tests               | `vitest.config.ts`, `src/**/*.test.tsx`                                                                             |
| Git hooks           | `.husky/pre-commit` (lint-staged), `.husky/commit-msg` (commitlint)                                                 |
| CI                  | `.github/workflows/ci.yml`: lint, format check, test, build on every PR                                             |
| Release             | `.github/workflows/release.yml` + Release Please (`release-please-config.json`, `.release-please-manifest.json`)    |
| Deploy              | `.github/workflows/deploy.yml` (simulated)                                                                          |
| GitHub settings     | Environments `development`, `staging`, `production` (production needs approval); rulesets on `main` and `hotfix/**` |
| Repo hygiene        | PR template, issue templates, `CODEOWNERS`, Dependabot                                                              |

The flow:

```
PR ──▶ CI ──▶ merge to main ──▶ deploy development
                    │
                    └─▶ Release Please updates the Release PR
                               │ merge it
                               ▼
                         tag vX.Y.Z ──▶ staging ──▶ (approve) ──▶ production
```

## Exercises

Do them in order. Each one shows one part of the setup.

### 1. A commit message that gets rejected

```bash
git switch -c feat/greeting
# change the <h1> text in src/App.tsx
git commit -am "changed heading"
```

The `commit-msg` hook rejects it. Try again with a Conventional Commit:

```bash
git commit -am "feat: change the page heading"
```

### 2. A feature PR

```bash
git push -u origin feat/greeting
gh pr create --fill
```

- **Actions** tab: the **CI** workflow runs lint, format check, tests and build.
- The PR shows **Review required**, because `CODEOWNERS` makes you the reviewer and GitHub doesn't let you approve your own PR.
- When CI is green, tick **Merge without waiting for requirements to be met (bypass rules)** and squash-merge. This is the bypass. Note that the **CI** rule can't be bypassed: it's in a separate ruleset with no bypass list.

After the merge, **Actions → Release** runs:

- **deploy-development** builds `main` and deploys it to development. Open the run's **Summary** to see what would be uploaded, and download the `site-development` artifact to open the build.
- **release-please** opens a PR called `chore(main): release 0.1.0`.

### 3. Cut a release

Open the Release PR. It bumps `package.json` to `0.1.0` and adds `CHANGELOG.md`. Merge it (bypass again).

**Actions → Release** now:

1. deploys `main` to **development**,
2. creates tag `v0.1.0` and a GitHub Release,
3. deploys `v0.1.0` to **staging**,
4. **waits** at **deploy-production**. Click **Review deployments**, tick `production`, and approve.
5. deploys the same `v0.1.0` to **production**.

Check **Code → Releases** and the **Environments** list on the repo's main page: each environment shows what's deployed.

### 4. CI blocks a broken PR

```bash
git switch main && git pull
git switch -c fix/broken
# in src/App.test.tsx, change "Clicked 1 times" to "Clicked 2 times"
git commit -am "fix: demo of a failing test"
git push -u origin fix/broken
gh pr create --fill
```

CI fails, and the merge button stays blocked, even with bypass: the CI ruleset can't be bypassed. Close the PR without merging.

### 5. Roll back

**Actions → Deploy → Run workflow**, environment `production`, ref `v0.1.0` (or any older tag). Approve it. The production app now shows that version.

### 6. Hotfix

Make one more `feat:` release first (repeat exercises 2 and 3) so production is on `v0.2.0` and `main` has moved on. Then:

```bash
git fetch --tags
git switch -c hotfix/0.2.x v0.2.0
git push -u origin hotfix/0.2.x

git switch -c fix/urgent
# make a small change
git commit -am "fix: urgent production fix"
git push -u origin fix/urgent
gh pr create --base hotfix/0.2.x --fill
```

Merge that PR. Release Please opens a Release PR **on the hotfix branch**. Merge it: `v0.2.1` goes to staging, then production after approval. Development isn't touched. Finally, open a PR from `hotfix/0.2.x` into `main` and merge it with a **merge commit**.

### 7. Dependabot

Within a week, Dependabot opens `chore(deps): ...` PRs. They run through CI like any other PR and don't trigger a release on their own.

## One manual step: `RELEASE_PLEASE_TOKEN`

PRs opened by the default `GITHUB_TOKEN` don't trigger workflows, so CI never runs on the Release PR, and the CI ruleset blocks it. To fix this:

1. Create a [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new) for **only this repository**, with **Contents: Read and write** and **Pull requests: Read and write**.
2. `gh secret set RELEASE_PLEASE_TOKEN` and paste it.
3. If a Release PR is already open, close it; Release Please recreates it with the new token on the next push to `main`.

Without the token, you can still get CI to run on a Release PR by closing and reopening it yourself.
