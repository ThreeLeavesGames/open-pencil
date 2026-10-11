import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import WorkspaceView from './views/WorkspaceView.vue'

const router = createRouter({
  // A VS Code webview's URL is not an app route, so routing stays in memory there.
  history: window.__openPencilVSCodeHost ? createMemoryHistory() : createWebHistory(),
  routes: [
    { path: '/', component: WorkspaceView },
    { path: '/storage', redirect: '/' },
    { path: '/demo', component: WorkspaceView, meta: { demo: true } },
    { path: '/share/:roomId', component: WorkspaceView }
  ]
})

export default router
