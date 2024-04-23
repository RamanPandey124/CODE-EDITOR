import '/public/sass/singleuse/Header.scss';
import { useSelector } from 'react-redux'
import { FaLaptopCode } from "react-icons/fa";
import ThemeBox from './ThemeBox';
import Logout from './Logout';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useContext, useState } from 'react';
import { CounterContext } from '@/contextApi/Context';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { MdDarkMode, MdLightMode, MdCancel } from "react-icons/md";
import { RiQuoteText } from "react-icons/ri";

const Header = () => {
    const { shadow } = useSelector((state) => state.theme)
    const isAuthenticated = useIsAuthenticated()
    const { state } = useContext(CounterContext)
    const [isDark, setDark] = useState(true)
    const [feature, setFeature] = useState(true)


    return (
        <div className={`header`}>
            <div className='headerTitle'>
                <FaLaptopCode className='headerIcon' />
                <h2>CollabEditor</h2>

                {isAuthenticated() && <span className='quoteDisplay' onClick={() => setFeature(!feature)}>
                    {feature ? <MdCancel className='riQuote ' /> : <RiQuoteText className='riQuote' />}
                </span>}
            </div>


            {feature && <div className='headerFeature'>
                {isAuthenticated() && <>
                    <div className='navbar'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/code-editor'}>Editor</Link>
                    </div>
                    <div className='headerControl'>
                        <div className='userName'>
                            <p>{state.name} <CgProfile className='userIcon' /></p>
                        </div>
                        <Logout />
                    </div>
                </>}

                <div className={`themeBox ${!isAuthenticated() && "themeRight"}`} onClick={() => setDark(!isDark)}>
                    {isDark ? <MdLightMode className='themeIcon dark-hover' /> : <MdDarkMode className='themeIcon dark-hover' />}
                </div>
            </div>}

        </div>
    )
}

export default Header