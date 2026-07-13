# appium-wdio

Android mobile automation suite for [Sauce Labs My Demo App](https://github.com/saucelabs/my-demo-app-android) using **WebdriverIO**, **Appium 2**, and **TypeScript**.

## Architecture

| Layer | Location | Responsibility |
| ------- | ---------- | ---------------- |
| Specs | `tests/**` | Intent only (actions + assertions) |
| Screens | `src/screens/**` | User actions |
| Selectors | `*.selectors.ts` | Locators only |
| Helpers | `src/helpers/**` | Explicit waits / shared utilities |
| Config | `src/config/**`, `wdio.conf.ts` | Env + capabilities |

Specs call screen methods only — no raw locators, no `browser.pause` (use `waitStable` only when documented for non-DOM animations).

## Prerequisites (macOS)

1. **Node.js 20+** (nvm recommended)
2. **JDK 17** (Temurin/Zulu)
3. **Android Studio** with Platform-Tools, Emulator, and a system image (API 34+ recommended)
4. An **AVD** (e.g. `Pixel_7_API_34`)

### Shell environment (`~/.zshrc`)

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export ANDROID_HOME="$HOME/Library/Android/sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin"
```

Reload the shell, then verify:

```bash
java -version
adb version
emulator -list-avds
adb devices
```

## First-time project setup

```bash
git clone <repo-url> appium-wdio
cd appium-wdio
npm install
npx appium driver list --installed   # expect uiautomator2
```

If the driver is missing:

```bash
npm run appium:driver:install
```

### Download the APK

Place My Demo App **v2.2.0** under `apps/android/` (gitignored):

```bash
curl -L -o apps/android/mda-2.2.0-25.apk \
  https://github.com/saucelabs/my-demo-app-android/releases/download/2.2.0/mda-2.2.0-25.apk
```

### Configure `.env`

```bash
cp .env.example .env
```

Edit `.env` so `ANDROID_DEVICE_NAME` matches your AVD (`emulator -list-avds`), `ANDROID_PLATFORM_VERSION` matches the emulator OS, and `APP_PATH` points at the APK.

## Run the smoke suite

1. Start the AVD (Android Studio Device Manager or `emulator -avd <name>`).
2. Wait until `adb devices` shows `device` (not `offline`).
3. Run:

```bash
npm run test:android
```

Appium is started automatically by `@wdio/appium-service`. The smoke spec opens the side menu and asserts **Log In** is visible.

### Useful scripts

| Script | Purpose |
| -------- | --------- |
| `npm run test:android` | Run WDIO against the local emulator |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run appium:driver:list` | List installed Appium drivers |

## Layout

```text
apps/android/          # local APK (not committed)
src/config/            # env + Android capabilities
src/helpers/           # wait helpers
src/screens/           # screen objects + selectors
tests/smoke/           # smoke specs
wdio.conf.ts           # local Appium runner config
.cursorrules           # project testing standards
```
