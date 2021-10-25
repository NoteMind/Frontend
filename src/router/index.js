import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Documents = () => import('@/views/documentsPage.vue')
const Trash = () => import('@/views/trashPage.vue')
const Recent = () => import('@/views/nearlyPage.vue')

const routes = [
  {
    path: '',
    redirect: '/Recent'
  },
  {
    path: '/Documents',
    component: Documents
  },
  {
    path: '/Trash',
    component: Trash
  },
  {
    path: '/Recent',
    component: Recent
  }
]

const router = new VueRouter({
  routes
})

export default router
