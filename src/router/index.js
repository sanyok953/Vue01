import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import News from '@/components/News'
import New from '@/components/New'
import Games from '@/components/Games'
import Game from '@/components/Game'
import About from '@/components/About'
import Login from '@/components/Login'
import NewNews from '@/components/NewNews'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/news',
		name: 'news',
		component: News
	},
	{
		path: '/newsFull/:id',
		props: true,
		name: 'newsFull',
		component: New
	},
	{
		path: '/games',
		name: 'games',
		component: Games
	},
	{
		path: '/game/:id',
		props: true,
		name: 'game',
		component: Game
	},
	{
		path: '/about',
		name: 'about',
		component: About
	},
	{
		path: '/newNews',
		name: 'newNews',
		component: NewNews
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
