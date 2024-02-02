import { IMenuItem } from '@type/Model/menu-item'
const MenuItems: Array<IMenuItem> = [
	{
		Name: 'Logo',
		Image: 'http://localhost:3000/Image/Navigate/Logo.png',
		Redirect: '/menu',
	},
	{
		Name: 'Home',
		Image: 'home-outline',
		Redirect: '/menu/home',
	},
]
const IndexLogo: number = 0
export { MenuItems, IndexLogo }
