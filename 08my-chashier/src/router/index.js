import { createRouter, createWebHistory } from 'vue-router'
import Cashier from '../components/Cashier.vue'
import History from '../components/History.vue'
const history = createWebHistory()
const routes = [
    {
        path: '/',
        name: 'Cashier',
        component: Cashier
    },
    {
        path: '/history',
        name: 'History',
        component: History
    }
]
const router = createRouter({ history, routes })
export default router