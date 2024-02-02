import './menu.css'
import { IMenuItem } from '@type/Model/menu-item'
import MenuItem from './MenuItem/MenuItem'
interface MenuProps {
	Items: Array<IMenuItem>
	IndexLogo: Number
}
const Menu = ({ Items, IndexLogo }: MenuProps) => {
	return (
		<nav id='navbar'>
			<ul className='navbar-items flexbox-col'>
				{Items.map((value, index) => (
					<>
						{index !== IndexLogo ? (
							<MenuItem key={value.Name} Info={value} />
						) : (
							<MenuItem key={value.Name} isLogo={true} Info={value} />
						)}
					</>
				))}
			</ul>
		</nav>
	)
}

export default Menu
