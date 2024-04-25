import '/public/sass/singleuse/Header.scss';
import { FaLaptopCode } from "react-icons/fa";
import Logout from './Logout';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useContext, useState } from 'react';
import { CounterContext } from '@/contextApi/Context';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { MdDarkMode, MdLightMode, MdCancel } from "react-icons/md";
import { RiQuoteText } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import CreateTeam from './CreateTeam';
import JoinNew from './JoinNew';



const Header = () => {
    const isAuthenticated = useIsAuthenticated()
    const { state } = useContext(CounterContext)
    const [isDark, setDark] = useState(true)
    const [isBar, setBar] = useState(false)


    return (
        <div className={`header`}>
            <div className={`headerTitle ${!isAuthenticated() && "headerAll"}`}>
                <FaLaptopCode className='laptopIcon' />
                <h6>CollabEditor</h6>

                {isAuthenticated() ?
                    <span className='quoteDisplay' onClick={() => setBar(!isBar)}>
                        {isBar ? <MdCancel className='riQuote ' /> : <RiQuoteText className='riQuote' />}
                    </span> :
                    <div className={`unAuthTheme`} onClick={() => setDark(!isDark)}>
                        {isDark ? <MdLightMode className='headerIcon' /> : <MdDarkMode className='headerIcon' />}
                    </div>
                }
            </div>

            {isAuthenticated() && <div className={`headerBar ${isBar && "headerBarDisplay"}`}>
                <div className='userMenu'>
                    <div className='navbar'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/editor'}>Editor</Link>
                        <Link to={'/tasks'}>Tasks</Link>
                    </div>
                    <div className='identityBar'>
                        <p>{state.user?.name}<CgProfile className='userIcon headerIcon' /></p>
                    </div>
                </div>

                <div className='personalBar'>
                    <RxDropdownMenu className='dropDown' />

                    <div className='dropBox'>
                        <div className='dropMenu'>
                            <CreateTeam className={'teamCraft actionBackground'} title={'create new'} />
                            <JoinNew className={'teamCraft actionBackground'} title={'join team'} />
                            <div className='actionCraft'>
                                <Logout />
                                <div className={`themeBox actionBackground`} onClick={() => setDark(!isDark)}>
                                    {isDark ? <MdLightMode className='headerIcon' /> : <MdDarkMode className='headerIcon' />}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>}

        </div>
    )
}



export default Header