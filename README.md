# appium-wdio

Android and iOS mobile automation suite for Sauce Labs My Demo App using **WebdriverIO**, **Appium 2**, and **TypeScript**.

- Android: [my-demo-app-android](https://github.com/saucelabs/my-demo-app-android)
- iOS: [my-demo-app-ios](https://github.com/saucelabs/my-demo-app-ios)

## Architecture

| Layer | Location | Responsibility |
| ------- | ---------- | ---------------- |
| Specs | `tests/**` | Intent only (actions + assertions) |
| Screens | `src/screens/**` | User actions |
| Selectors | `*.selectors.ts` | Locators only |
| Helpers | `src/helpers/**` | Explicit waits / shared utilities |
| Config | `src/config/**`, `wdio.*.conf.ts` | Env + platform capabilities |

Specs call screen methods only — no raw locators, no `browser.pause` (use `waitStable` only when documented for non-DOM animations).

## Prerequisites (macOS)

1. **Node.js 20+** (nvm recommended)
2. **JDK 17** (Temurin/Zulu) — Android
3. **Android Studio** with Platform-Tools, Emulator, and a system image (API 34+ recommended)
4. An **AVD** (e.g. `Pixel_7_API_34` or your local AVD name)
5. **Xcode** (latest stable) with Command Line Tools and at least one **iOS Simulator** — iOS

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
xcode-select -p
xcrun simctl list devices available
```

## First-time project setup

```bash
git clone <repo-url> appium-wdio
cd appium-wdio
npm install
npx appium driver list --installed   # expect uiautomator2 and xcuitest
```

If a driver is missing:

```bash
npm run appium:driver:install
```

### Download the Android APK

Place My Demo App **v2.2.0** under `apps/android/` (gitignored):

```bash
curl -L -o apps/android/mda-2.2.0-25.apk \
  https://github.com/saucelabs/my-demo-app-android/releases/download/2.2.0/mda-2.2.0-25.apk
```

### Download the iOS Simulator app

Use the **Simulator** build (a normal `.ipa` will not install on Simulator):

```bash
curl -L -o apps/ios/SauceLabs-Demo-App.Simulator.zip \
  https://github.com/saucelabs/my-demo-app-ios/releases/download/2.2.2/SauceLabs-Demo-App.Simulator.zip
unzip -o apps/ios/SauceLabs-Demo-App.Simulator.zip -d apps/ios
```

Point `IOS_APP_PATH` at the extracted `.app` (typically `./apps/ios/Payload/My Demo App.app`).

Bundle ID for recent builds: `com.saucelabs.mydemo.app.ios`.

**Xcode / WebDriverAgent:** the Simulator runtime must match your Xcode iOS Simulator SDK (`xcodebuild -showsdks`). If `xcodebuild` reports missing platforms or Appium fails with WDA code 70, install the matching runtime:

```bash
xcodebuild -downloadPlatform iOS
```

### Configure `.env`

```bash
cp .env.example .env
```

| Variable | Set to |
| ---------- | -------- |
| `ANDROID_DEVICE_NAME` | AVD from `emulator -list-avds` |
| `ANDROID_PLATFORM_VERSION` | Emulator OS version (`adb shell getprop ro.build.version.release`) |
| `APP_PATH` | Path to the Android APK |
| `IOS_DEVICE_NAME` | Simulator from `xcrun simctl list devices available` |
| `IOS_PLATFORM_VERSION` | Simulator iOS version |
| `IOS_APP_PATH` | Path to the Simulator `.app` |

## Run the smoke suite

Appium is started automatically by `@wdio/appium-service`. The smoke spec opens the side menu and asserts **Log In** is visible.

### Android

1. Start the AVD (`emulator -avd <name>` or Android Studio Device Manager).
2. Wait until `adb devices` shows `device` (not `offline`).
3. Run:

```bash
npm run test:android
```

### iOS

1. Boot a Simulator (Xcode → Open Developer Tool → Simulator, or `xcrun simctl boot "<device>"`).
2. Confirm it is booted: `xcrun simctl list devices booted`.
3. Run:

```bash
npm run test:ios
```

### Useful scripts

| Script | Purpose |
| -------- | --------- |
| `npm run test:android` | Run WDIO against the local Android emulator |
| `npm run test:android:smoke` | Android smoke specs only (`tests/smoke/**`) |
| `npm run test:ios` | Run WDIO against the local iOS Simulator |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run appium:driver:list` | List installed Appium drivers |
| `npm run appium:driver:install` | Install UiAutomator2 + XCUITest drivers |

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every **pull request** and **push** to `main`.

| Job | What it runs |
| ----- | -------------- |
| `typecheck` | `npm ci` + `npm run typecheck` |
| `android-smoke` | API 34 emulator + Appium UiAutomator2 + `npm run test:android:smoke` |

The Android job downloads My Demo App APK **v2.2.0** (`mda-2.2.0-25.apk`) from the [official release](https://github.com/saucelabs/my-demo-app-android/releases/download/2.2.0/mda-2.2.0-25.apk) into `apps/android/` (not committed) and writes a CI `.env` (`emulator-5554` / platform `14`).

**iOS is not run in CI** — use local Simulator: `npm run test:ios`.

**Branch protection (recommended):** GitHub → Settings → Branches → protect `main` → require `typecheck` and `android-smoke` before merge.

## Layout

```text
.github/workflows/     # CI (typecheck + Android smoke on main / PRs)
apps/android/          # local APK (not committed)
apps/ios/              # local Simulator .app (not committed)
src/config/            # env + Android/iOS capabilities
src/helpers/           # wait helpers
src/screens/           # screen objects + selectors
tests/smoke/           # smoke specs
wdio.shared.conf.ts    # shared runner options
wdio.android.conf.ts   # Android capabilities
wdio.ios.conf.ts       # iOS capabilities
.cursorrules           # project testing standards
```
