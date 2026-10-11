import { watch } from 'vue'

import { allTabs, getActiveStore, openFileInNewTab } from '@/app/tabs'

/**
 * Set by the VS Code extension's injected bridge before the app boots. The bridge
 * supplies a FileSystemFileHandle stand-in, so saving reuses the browser handle path
 * in `write.ts` and needs no VS Code branch of its own.
 */
interface VSCodeHost {
  handle: FileSystemFileHandle
  onDirtyChange: (dirty: boolean) => void
  setSave: (save: () => Promise<boolean>) => void
}

declare global {
  interface Window {
    __openPencilVSCodeHost?: VSCodeHost
  }
}

export async function connectVSCodeHost(): Promise<void> {
  const host = window.__openPencilVSCodeHost
  if (!host) return
  host.setSave(() => getActiveStore().saveFigFile())
  await openFileInNewTab(await host.handle.getFile(), host.handle)
  // Watch only after the open settles; loading the file briefly counts as a change.
  watch(
    () => allTabs.value.some((tab) => tab.isDirty),
    (dirty) => host.onDirtyChange(dirty)
  )
}
