/**
 * Resolves a root-relative bundled asset (`/canvaskit.wasm`, `/Inter-Regular.ttf`). Hosts that
 * serve the app from somewhere other than a site root, like the VS Code webview, set
 * `globalThis.__OPENPENCIL_ASSET_BASE__` to that folder's URL before the app boots.
 */
export function bundledAssetURL(path: string): string {
  const base = (globalThis as { __OPENPENCIL_ASSET_BASE__?: string }).__OPENPENCIL_ASSET_BASE__
  return base ? new URL(path.replace(/^\//, ''), base).href : path
}

/** True for files under the host-provided asset base, which must bypass the web-font proxy. */
export function isBundledAssetURL(url: string): boolean {
  const base = (globalThis as { __OPENPENCIL_ASSET_BASE__?: string }).__OPENPENCIL_ASSET_BASE__
  return !!base && url.startsWith(base)
}
