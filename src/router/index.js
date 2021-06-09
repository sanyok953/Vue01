import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import News from '@/components/News'
import New from '@/components/New'
import Games from '@/components/Games'
import Game from '@/components/Game'
import About from '@/components/About'
import Login from '@/components/Login'
import NewNews from '@/components/NewNews'
import EditNews from '@/components/EditNews'
import NewGame from '@/components/NewGame'
import EditGame from '@/components/EditGame'
import NewTeam from '@/components/NewTeam'
import EditTeam from '@/components/EditTeam'

Vue.use(VueRouter)

const routes = [
	// home
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	// news
	{
		path: '/news',
		name: 'news',
		component: News
	},
	{
		path: '/newsFull/:url',
		props: true,
		name: 'newsFull',
		component: New
	},
	{
		path: '/newNews',
		name: 'newNews',
		component: NewNews,
		beforeEnter: AuthGuard
	},
	{
		path: '/editNews/:ide',
		props: true,
		name: 'editNews',
		component: EditNews,
		beforeEnter: AuthGuard
	},
	// games
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
		path: '/newGame',
		name: 'newGame',
		component: NewGame,
		beforeEnter: AuthGuard
	},
	{
		path: '/editGame/:ide',
		props: true,
		name: 'editGame',
		component: EditGame,
		beforeEnter: AuthGuard
	},
	// about
	{
		path: '/about',
		name: 'about',
		component: About
	},
	{
		path: '/newTeam',
		name: 'newTeam',
		component: NewTeam,
		beforeEnter: AuthGuard
	},
	{
		path: '/editTeam/:ide',
		props: true,
		name: 'editTeam',
		component: EditTeam,
		beforeEnter: AuthGuard
	},
	// login
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
