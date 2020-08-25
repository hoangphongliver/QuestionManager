import Dashboard from '../pages/Admin/Dashboard.vue';
import MainDashboard from '../pages/Admin/MainDashboard.vue';
import QuestionManager from '../pages/Admin/QuestionManager.vue';
import HomePage from '../pages/Client/HomePage.vue'

export const routes = [
  {
    path: '/',
    component: HomePage,
    meta: { title: 'Home' }
  },
  {
    path: '/admin',
    component: MainDashboard,
    meta: { title: 'Admin' },
    children: [
      {
        path: '/admin',
        name: '',
        component: Dashboard,
        meta: { title: 'Dashboard' }
      },
      {
        path: '/question-manager/:id',
        name: '',
        component: QuestionManager,
        meta: { title: 'Dashboard' }
      }
    ]
  },
  {
    path: '/client',
    component: HomePage,
    meta: { title: 'HomePage' }
  },
]
