import { createRouter, createWebHistory } from 'vue-router'
import SelectView from '@/views/SelectView.vue'
import ClassesView from '@/views/ClassesView.vue'
import ProfessionsView from '@/views/ProfessionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Select',
      component: SelectView
    },
    {
      path: '/:page(classes)/:class?/:spec?/:build?',
      name: 'Classes',
      component: ClassesView
    },
    {
      path: '/:page(professions)/:prof?/:build?',
      name: 'Professions',
      component: ProfessionsView
    }
  ]
})

export default router
