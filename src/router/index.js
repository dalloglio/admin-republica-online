import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

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

// Partners
import PartnerIndex from '@/components/Partners/Index'
import PartnerCreate from '@/components/Partners/Create'
import PartnerEdit from '@/components/Partners/Edit'

// Users
import UserIndex from '@/components/Users/Index'
import UserCreate from '@/components/Users/Create'
import UserEdit from '@/components/Users/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },

    // Ads
    { path: '/ads', name: 'ads.index', component: AdIndex },
    { path: '/ads/create', name: 'ads.create', component: AdCreate },
    { path: '/ads/:id/edit', name: 'ads.edit', component: AdEdit },

    // Banners
    { path: '/banners', name: 'banners.index', component: BannerIndex },
    { path: '/banners/create', name: 'banners.create', component: BannerCreate },
    { path: '/banners/:id/edit', name: 'banners.edit', component: BannerEdit },

    // Categories
    { path: '/categories', name: 'categories.index', component: CategoryIndex },
    { path: '/categories/create', name: 'categories.create', component: CategoryCreate },
    { path: '/categories/:id/edit', name: 'categories.edit', component: CategoryEdit },

    // Filters
    { path: '/filters', name: 'filters.index', component: FilterIndex },
    { path: '/filters/create', name: 'filters.create', component: FilterCreate },
    { path: '/filters/:id/edit', name: 'filters.edit', component: FilterEdit },

    // Partners
    { path: '/partners', name: 'partners.index', component: PartnerIndex },
    { path: '/partners/create', name: 'partners.create', component: PartnerCreate },
    { path: '/partners/:id/edit', name: 'partners.edit', component: PartnerEdit },

    // Users
    { path: '/users', name: 'users.index', component: UserIndex },
    { path: '/users/create', name: 'users.create', component: UserCreate },
    { path: '/users/:id/edit', name: 'users.edit', component: UserEdit }
  ]
})
