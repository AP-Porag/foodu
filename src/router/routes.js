import AuthGaurd from './admin-auth-gaurd'

const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '',
        component: () => import('pages/Home.vue')
      },
      { path: '/categories',
        component: () => import('pages/Categories.vue')
      },
      { path: '/foods',
        component: () => import('pages/Foods.vue')
      },
      { path: '/login',
        component: () => import('pages/Auth.vue')
      },
      { path: '/checkout',
        component: () => import('pages/Checkout.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    beforeEnter:AuthGaurd,
    children: [
      { path: '',
        component: () => import('pages/admin/Dashboard.vue')
      },
      { path: 'dashboard',
        component: () => import('pages/admin/Dashboard.vue')
      },
      { path: 'categories',
        component: () => import('pages/admin/Categories.vue')
      },
      { path: 'products',
        component: () => import('pages/admin/Products.vue')
      },
      { path: 'orders',
        component: () => import('pages/admin/Orders.vue')
      },
      { path: 'users',
        component: () => import('pages/admin/Users.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]



export default routes
