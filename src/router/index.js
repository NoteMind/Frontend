import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Documents = () => import('@/views/documentsPage.vue')
const Trash = () => import('@/views/trashPage')

const routes = [
  {
    path: '',
    redirect: '/Documents'
  },
  {
    path: '/Documents',
    component: Documents
  },
  {
    path: '/Trash',
    component: Trash
  }
]

const router = new VueRouter({
  routes
})

export default router
