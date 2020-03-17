import React, { useContext } from 'react'
import logo from '../assets/svg/AppIcon.svg'
import { AuthContext } from '../contextProviders/AuthContext'
import HeaderLinks from './HeaderLinks'

const Header = () => {
	let {auth} = useContext(AuthContext)
	let links = auth.user ? <HeaderLinks /> : null
	return (
		<header className="header">
			Corona
			<div className="header__logo">
				<img
					src={logo}
					className="header__logo--puple"
					alt="app-icon"
				/>
			</div>
			Watch
			{links}
		</header>
	)
}

export default Header
