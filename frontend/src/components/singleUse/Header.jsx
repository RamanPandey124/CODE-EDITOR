import '/public/sass/singleuse/Header.scss';
import { useSelector } from 'react-redux'
import { FaLaptopCode } from "react-icons/fa";
import ThemeBox from './ThemeBox';
import Logout from './Logout';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
// import { useEffect, useState } from 'react';

const Header = () => {
    const { shadow } = useSelector((state) => state.theme)
    const isAuthenticated = useIsAuthenticated()


    return (
        <div className={`header ${shadow}`}>
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