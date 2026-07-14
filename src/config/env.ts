import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

dotenv.config({ path: path.join(repoRoot, '.env') });

export interface AndroidEnv {
  readonly deviceName: string;
  readonly platformVersion: string;
  readonly appPath: string;
}

export interface IosEnv {
  readonly deviceName: string;
  readonly platformVersion: string;
  readonly appPath: string;
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env and set it.`
    );
  }
  return value;
}

function resolveAppPath(appPath: string): string {
  return path.isAbsolute(appPath) ? appPath : path.resolve(repoRoot, appPath);
}

/**
 * Typed, validated Android run settings loaded from `.env`.
 * Keeps device/APK details out of committed WDIO config.
 */
export function loadAndroidEnv(): AndroidEnv {
  return {
    deviceName: requireEnv('ANDROID_DEVICE_NAME'),
    platformVersion: requireEnv('ANDROID_PLATFORM_VERSION'),
    appPath: resolveAppPath(requireEnv('APP_PATH')),
  };
}

/**
 * Typed, validated iOS Simulator run settings loaded from `.env`.
 * Keeps device/.app details out of committed WDIO config.
 */
export function loadIosEnv(): IosEnv {
  return {
    deviceName: requireEnv('IOS_DEVICE_NAME'),
    platformVersion: requireEnv('IOS_PLATFORM_VERSION'),
    appPath: resolveAppPath(requireEnv('IOS_APP_PATH')),
  };
}
