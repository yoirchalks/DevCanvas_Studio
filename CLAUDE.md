# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                  # ng serve - dev server at http://localhost:4200 (dev config, live reload)
npm run build               # ng build - production build to dist/
npm run watch                # ng build --watch --configuration development
npm test                     # ng test - Karma/Jasmine unit tests (watch mode by default)
node dist/DevCanvas_Studio/server/server.mjs   # run the built SSR server (npm run serve:ssr:DevCanvas_Studio)
```

Run a single test file/suite: `ng test` opens Karma in watch mode; narrow scope with Jasmine's `fdescribe`/`fit` in the spec, or pass `--include` to filter files, e.g. `ng test --include='**/app.spec.ts'`.

There is no e2e framework configured (not scaffolded by default). No lint script is defined in package.json.

## Architecture

This is an Angular 20.3 application generated via `ng new` with **standalone APIs, zoneless change detection, and SSR** all enabled — there are no NgModules anywhere in this codebase, and none should be added.

- **Bootstrap**: [src/main.ts](src/main.ts) bootstraps the standalone `App` component with `appConfig` (browser entry). [src/main.server.ts](src/main.server.ts) + [src/app/app.config.server.ts](src/app/app.config.server.ts) provide the server-side bootstrap.
- **App config split**: [src/app/app.config.ts](src/app/app.config.ts) holds shared/browser providers (`provideZonelessChangeDetection`, `provideBrowserGlobalErrorListeners`, `provideRouter`, `provideClientHydration(withEventReplay())`). Server-only providers (`provideServerRendering(withRoutes(...))`) live in `app.config.server.ts` and are merged on top via `mergeApplicationConfig`. Add new providers to the correct file depending on whether they must run on the server, browser, or both.
- **Routing has two parallel route tables**: [src/app/app.routes.ts](src/app/app.routes.ts) (`Routes`, client router) and [src/app/app.routes.server.ts](src/app/app.routes.server.ts) (`ServerRoute[]`, controls SSR rendering mode per path — currently everything is `RenderMode.Prerender`). When adding a client route, add a matching entry in `app.routes.server.ts` and choose the correct `RenderMode` (`Prerender`, `Server`, or `Client`) — routes with dynamic/user-specific data should not stay `Prerender`.
- **SSR server**: [src/server.ts](src/server.ts) is a plain Express app using `AngularNodeAppEngine`. Any Express REST endpoints go in the marked section before the catch-all Angular render handler. `writeResponseToNodeResponse` bridges Angular's Response objects to Express's `res`.
- **Change detection is zoneless** (`provideZonelessChangeDetection`, no `zone.js` in polyfills) — component state must be signal-driven (`signal()`, `computed()`) or use `OnPush`-compatible patterns; code that relies on implicit zone-triggered change detection (e.g. mutating plain fields and expecting the view to update) will not render.

## Conventions to follow (Angular 20+ current best practice)

These aren't yet exercised elsewhere in the codebase (it's a fresh scaffold), so follow them by default for new code:

- **Standalone only**: every component/directive/pipe omits `standalone: true` (it's the default in v20) and declares its own `imports` array. Never introduce `NgModule`.
- **Signals for state**: use `signal()`/`computed()`/`effect()` for local component state, not plain class fields mutated imperatively — required for zoneless CD to pick up changes. `App.title` in [src/app/app.ts](src/app/app.ts) is the existing pattern to mirror.
- **New control-flow syntax** in templates: `@if`/`@for`/`@switch`, not `*ngIf`/`*ngFor`/`*ngSwitch`. `@for` requires a `track` expression.
- **`inject()` over constructor injection** for DI in new code.
- **Native signal inputs/outputs** where applicable: `input()`/`output()`/`model()` instead of `@Input()`/`@Output()` decorators.
- **File naming**: this project uses the newer Angular CLI convention of un-suffixed filenames (`app.ts`, `app.html`, `app.css`, not `app.component.ts`) — keep new generated files consistent with this scheme if using `ng generate`.
- Quotes: single quotes in `.ts` (enforced via `.editorconfig` and Prettier config in `package.json`); Prettier is configured with `printWidth: 100` and an Angular HTML parser override for `*.html`.
- TypeScript is in `strict` mode with `strictTemplates`, `strictInjectionParameters`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, and `noImplicitReturns` all on — new code must satisfy these.
