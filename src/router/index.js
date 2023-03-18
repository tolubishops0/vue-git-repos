import { createRouter, createWebHistory } from 'vue-router'
import repoView from '../views/RepoView.vue'
import NotFound from '../views/NotFoundView.vue'
import LayoutView from '../views/LayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path:'/',
      name: 'layout',
      component:LayoutView,
    },
    {
      path: '/repo/:name',
      name:'repo',
      component: repoView
    },

    { 
      path: '/:pathMatch(.*)', 
      component: NotFound 
  },
]
})
  



export default router
