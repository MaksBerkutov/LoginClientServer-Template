import { IMenuItem } from '@type/Model/menu-item'
import { IonIcon } from '@ionic/react'
import './MenuItem.css'
import { homeOutline } from 'ionicons/icons'
interface MenuItemProps {
	isLogo: Boolean
	Info: IMenuItem
}
//	<img src={Image} alt='Logo Menu' />
//<img src={Image} alt={`Logo ${Name}`} />
const MenuItem = ({  isLogo, Info }: MenuItemProps) => {
	const { Name, Image, Redirect } = Info
	if (isLogo)
		return (
			<li  className='navbar-logo flexbox-left'>
				<a className='navbar-item-inner flexbox' href={Redirect}>
					<img src={Image} alt='Logo Menu' style={{ height: '100px' }} />
				</a>
			</li>
		)
	//<img src={Image} alt={`Logo ${Name}`} />
	return (
		<li  className='navbar-item flexbox-left'>
			<a className='navbar-item-inner flexbox-left' href={Redirect}>
				<div className='navbar-item-inner-icon-wrapper flexbox'>
					<IonIcon icon={homeOutline}></IonIcon>
				</div>
				<span className='link-text'>{Name}</span>
			</a>
		</li>
	)
}
MenuItem.defaultProps = {
	isLogo: false,
}
export default MenuItem
