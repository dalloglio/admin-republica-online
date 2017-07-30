import Vue from 'vue'
import Router from 'vue-router'

// Auth
import AuthLogin from '@/components/Auth/Login'
import AuthLogout from '@/components/Auth/Logout'

// Home
import Home from '@/components/Home'
import Teste from '@/components/Teste'

// Ads
import AdIndex from '@/components/Ads/Index'
import AdCreate from '@/components/Ads/Create'
import AdEdit from '@/components/Ads/Edit'

// Banners
import BannerIndex from '@/components/Banners/Index'
import BannerCreate from '@/components/Banners/Create'
import BannerEdit from '@/components/Banners/Edit'

// Categories
import CategoryIndex from '@/components/Categories/Index'
import CategoryCreate from '@/components/Categories/Create'
import CategoryEdit from '@/components/Categories/Edit'

// Filters
import FilterIndex from '@/components/Filters/Index'
import FilterCreate from '@/components/Filters/Create'
import FilterEdit from '@/components/Filters/Edit'

// Forms - Contacts
import ContactIndex from '@/components/Forms/Contacts/Index'
import ContactShow from '@/components/Forms/Contacts/Show'
// Forms - Newsletters
import NewsletterIndex from '@/components/Forms/Newsletters/Index'
// Forms - Resumes
import ResumeIndex from '@/components/Forms/Resumes/Index'
import ResumeShow from '@/components/Forms/Resumes/Show'

// Partners
import PartnerIndex from '@/components/Partners/Index'
import PartnerCreate from '@/components/Partners/Create'
import PartnerEdit from '@/components/Partners/Edit'

// Users
import UserIndex from '@/components/Users/Index'
import UserCreate from '@/components/Users/Create'
import UserEdit from '@/components/Users/Edit'

Vue.use(Router)

const router = new Router({
  routes: [
    // Auth
    { path: '/login', name: 'auth.login', component: AuthLogin, meta: { requiresAuth: false } },
    { path: '/logout', name: 'auth.logout', component: AuthLogout, meta: { requiresAuth: true } },

    // Ads
    { path: '/ads', name: 'ads.index', component: AdIndex, meta: { requiresAuth: true } },
    { path: '/ads/create', name: 'ads.create', component: AdCreate, meta: { requiresAuth: true } },
    { path: '/ads/:id/edit', name: 'ads.edit', component: AdEdit, meta: { requiresAuth: true } },

    // Home
    { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
    { path: '/teste', name: 'teste', component: Teste, meta: { requiresAuth: true } },

    // Banners
    { path: '/banners', name: 'banners.index', component: BannerIndex, meta: { requiresAuth: true } },
    { path: '/banners/create', name: 'banners.create', component: BannerCreate, meta: { requiresAuth: true } },
    { path: '/banners/:id/edit', name: 'banners.edit', component: BannerEdit, meta: { requiresAuth: true } },

    // Categories
    { path: '/categories', name: 'categories.index', component: CategoryIndex, meta: { requiresAuth: true } },
    { path: '/categories/create', name: 'categories.create', component: CategoryCreate, meta: { requiresAuth: true } },
    { path: '/categories/:id/edit', name: 'categories.edit', component: CategoryEdit, meta: { requiresAuth: true } },

    // Filters
    { path: '/filters', name: 'filters.index', component: FilterIndex, meta: { requiresAuth: true } },
    { path: '/filters/create', name: 'filters.create', component: FilterCreate, meta: { requiresAuth: true } },
    { path: '/filters/:id/edit', name: 'filters.edit', component: FilterEdit, meta: { requiresAuth: true } },

    // Forms - Contacts
    { path: '/contacts', name: 'contacts.index', component: ContactIndex, meta: { requiresAuth: true } },
    { path: '/contacts/:id', name: 'contacts.show', component: ContactShow, meta: { requiresAuth: true } },
    // Forms - Newsletters
    { path: '/newsletters', name: 'newsletters.index', component: NewsletterIndex, meta: { requiresAuth: true } },
    // Forms - Resumes
    { path: '/resumes', name: 'resumes.index', component: ResumeIndex, meta: { requiresAuth: true } },
    { path: '/resumes/:id', name: 'resumes.show', component: ResumeShow, meta: { requiresAuth: true } },

    // Partners
    { path: '/partners', name: 'partners.index', component: PartnerIndex, meta: { requiresAuth: true } },
    { path: '/partners/create', name: 'partners.create', component: PartnerCreate, meta: { requiresAuth: true } },
    { path: '/partners/:id/edit', name: 'partners.edit', component: PartnerEdit, meta: { requiresAuth: true } },

    // Users
    { path: '/users', name: 'users.index', component: UserIndex, meta: { requiresAuth: true } },
    { path: '/users/create', name: 'users.create', component: UserCreate, meta: { requiresAuth: true } },
    { path: '/users/:id/edit', name: 'users.edit', component: UserEdit, meta: { requiresAuth: true } }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Vue.auth.isAuthenticated()) {
      next({
        name: 'auth.login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
