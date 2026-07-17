import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ARTIFACTS_DIR = path.resolve('artifacts');

/**
 * Best-effort CI/local debug dump when a stable UI wait fails.
 * Never throws — diagnostics must not mask the original error.
 */
export async function captureUiDebugArtifacts(label: string): Promise<void> {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const base = `${label}-${stamp}`;

  try {
    await mkdir(ARTIFACTS_DIR, { recursive: true });
  } catch {
    return;
  }

  try {
    await browser.saveScreenshot(path.join(ARTIFACTS_DIR, `${base}.png`));
  } catch {
    // ignore
  }

  try {
    const source = await browser.getPageSource();
    await writeFile(path.join(ARTIFACTS_DIR, `${base}.xml`), source, 'utf8');
  } catch {
    // ignore
  }

  try {
    const packageName = await driver.getCurrentPackage().catch(() => 'unknown');
    const activity = await driver.getCurrentActivity().catch(() => 'unknown');
    await writeFile(
      path.join(ARTIFACTS_DIR, `${base}-context.txt`),
      `package=${packageName}\nactivity=${activity}\n`,
      'utf8'
    );
  } catch {
    // ignore
  }
}
