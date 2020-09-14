import QuetionTypeManager from '../pages/Admin/QuetionTypeManager.vue';
import MainDashboard from '../pages/Admin/MainDashboard.vue';
import QuestionManager from '../pages/Admin/QuestionManager.vue';
import HomePage from '../pages/Client/HomePage.vue';
import PageNotFound from '../components/PageNotFound.vue';

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  isAuthenticated = currentUser && currentUser.type === 'admin' ? true : false;

  if (isAuthenticated) {
    next();
  } else {
    next('/');
  }
}

export const routes = [
  {
    path: '/',
    component: HomePage,
    meta: { title: 'Trang Chủ - App Trắc Nghiệm' }
  },
  {
    path: '/admin',
    component: MainDashboard,
    beforeEnter: guardMyroute,
    meta: { title: 'Admin' },
    children: [
      {
        path: '/admin',
        name: '',
        component: QuetionTypeManager,
        meta: { title: 'Quản Lý Loại Câu Hỏi - App Trắc Nghiệm' }
      },
      {
        path: '/admin/question-manager/:id',
        name: '',
        component: QuestionManager,
        meta: { title: 'Quản Lý Câu Hỏi - App Trắc Nghiệm' }
      }
    ]
  },
  {
    path: '/client',
    component: HomePage,
    meta: { title: 'Trang Chủ - App Trắc Nghiệm' }
  },

  {
    path: '*',
    component: PageNotFound,
    meta: { title: 'Không Tìm Thấy Trang - App Trắc Nghiệm' }
  },
]
