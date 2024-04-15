import './Header.scss'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaLaptopCode } from "react-icons/fa";
import ThemeBox from '../themeBox/ThemeBox';
import Logout from '../logout/Logout';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useEffect, useState } from 'react';


const Header = () => {

    const { pathname } = useLocation()
    const background = (pathname.toLowerCase() === '/login') ? 'headerBgY' : "headerBg"
    const { shadow } = useSelector((state) => state.theme)
    const isAuthenticated = useIsAuthenticated()


    return (
        <div className={`header  ${background} ${shadow}`}>
            <div className='headerTitle'>
                <FaLaptopCode className='headerIcon' />
                <h2>Let's Code</h2>
            </div>
            <div className='headerFeature'>
                <ThemeBox />
                {isAuthenticated() && <Logout />}
            </div>

        </div>
    )
}

export default Header