import { createRouter, createWebHistory, RouterView, type RouteRecordRaw } from 'vue-router'
import CryptoPage from '@/pages/Crypto/CryptoPage.vue'

const StubPage = () => import('@/pages/StubPage.vue')

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/crypto' },
  {
    path: '/crypto',
    component: RouterView,
    meta: { tabsGroup: 'crypto', sidebar: { label: 'Main Page', icon: 'pi pi-home', order: 0 } },
    children: [
      { path: '', redirect: { name: 'crypto.list' } },
      {
        path: 'cryptocurrencies',
        name: 'crypto.list',
        component: CryptoPage,
        meta: { nav: { group: 'crypto', label: 'Cryptocurrencies', icon: 'pi pi-chart-line' } },
      },
      {
        path: 'categories',
        name: 'crypto.categories',
        component: StubPage,
        meta: { nav: { group: 'crypto', label: 'Categories', icon: 'pi pi-sitemap' } },
      },
      {
        path: 'defi',
        name: 'crypto.defi',
        component: StubPage,
        meta: { nav: { group: 'crypto', label: 'DeFi', icon: 'pi pi-sliders-h' } },
      },
      {
        path: 'nft',
        name: 'crypto.nft',
        component: StubPage,
        meta: { nav: { group: 'crypto', label: 'NFT', icon: 'pi pi-images' } },
      },
    ],
  },
  {
    path: '/portfolio',
    component: StubPage,
    meta: { sidebar: { label: 'Portfolio', icon: 'pi pi-briefcase', order: 10 } },
  },
  {
    path: '/trade',
    component: StubPage,
    meta: { sidebar: { label: 'Trade', icon: 'pi pi-refresh' } },
  },
  {
    path: '/news',
    component: StubPage,
    meta: { sidebar: { label: 'News', icon: 'pi pi-th-large' } },
  },
  {
    path: '/notifications',
    component: StubPage,
    meta: { sidebar: { label: 'Notifications', icon: 'pi pi-bell' } },
  },

  {
    path: '/jobs',
    component: StubPage,
    meta: { sidebar: { label: 'Job Center', icon: 'pi pi-clipboard' } },
  },
  {
    path: '/ref',
    component: StubPage,
    meta: { sidebar: { label: 'Referral Link', icon: 'pi pi-user-plus' } },
  },
  {
    path: '/dev',
    component: StubPage,
    meta: { sidebar: { label: 'Development', icon: 'pi pi-cog' } },
  },
  {
    path: '/honors',
    component: StubPage,
    meta: { sidebar: { label: 'Honors', icon: 'pi pi-thumbs-up' } },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
