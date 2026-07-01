---
name: branch-push
description: Use whenever the user asks to "push" changes (e.g. "fix X and push it", "push this"). Branches before making changes, commits in small logical chunks while working, pushes the branch, fast-forward merges into main, then pushes main.
---

Workflow for any request that includes "push":

1. **Branch before changes.** From an up-to-date `main` (fetch/pull first if a remote exists), create a new branch. Name it descriptively from the task (kebab-case, e.g. `fix-login-redirect`, `add-dark-mode-toggle`). Never make the requested changes directly on `main`.

2. **Make the changes, committing in small logical units as you go** — not one giant commit at the end. Each commit should represent one coherent change (e.g. "add signal for theme state" separate from "wire toggle into header component"). Write commit messages following this repo's existing log style (check `git log --oneline -10` for tone/format). Follow the repo's standard commit safety rules: never `--no-verify`, never force-push, only stage relevant files.

3. **Push the branch** to `origin` with upstream tracking (`git push -u origin <branch>`).

4. **Fast-forward merge into main:**
   - Switch to `main`, pull latest from origin.
   - If `main` has moved ahead of the branch's base (diverged), **stop and ask the user** how to proceed (rebase the branch, or merge normally) — do not force a fast-forward or fall back to a merge commit silently, since that changes history shape they didn't ask for.
   - Otherwise: `git merge --ff-only <branch>`.

5. **Push main** to `origin`.

Confirm with the user before the push-to-remote steps (3 and 5) only if they haven't already established blanket approval for this workflow in the conversation — pushing to a shared remote is a visible, hard-to-reverse action per standing safety rules.

Do not delete the feature branch automatically after merging unless the user asks.
