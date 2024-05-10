import '/public/sass/singleuse/Header.scss';
import { FaLaptopCode } from "react-icons/fa";
import Logout from './Logout';
import { useContext, useState } from 'react';
import { CounterContext } from '@/contextApi/Context';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { MdDarkMode, MdLightMode, MdCancel } from "react-icons/md";
import { RiQuoteText } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import CreateTeam from './CreateTeam';
import JoinNew from './JoinNew';
import { dark, light } from '@/redux/slices/themeSlice';
import { useDispatch, useSelector } from 'react-redux';



const Header = () => {
    const isAuthenticated = localStorage.getItem('accessToken') ? true : false
    const { state } = useContext(CounterContext)
    const [isDark, setDark] = useState(true)
    const [isBar, setBar] = useState(false)
    const dispatch = useDispatch()

    const { headerBg, shadow, actionBg } = useSelector((state) => state.theme)

    function handleTheme() {
        if (isDark) {
            dispatch(light())
        }
        else {
            dispatch(dark())
        }
        setDark(!isDark)
    }



    return (
        <div className={`header ${headerBg}`}>
            <div className={`headerTitle ${!isAuthenticated && "headerAll"}`}>
                <FaLaptopCode className='laptopIcon' />
                <h6>CollabEditor</h6>

                {isAuthenticated ?
                    <span id='quoteDisplay' className='quoteDisplay' onClick={() => setBar(!isBar)}>
                        {isBar ? <MdCancel className='riQuote ' /> : <RiQuoteText className='riQuote' />}
                    </span> :
                    <div id='unAuthTheme' className={`unAuthTheme`} onClick={handleTheme}>
                        {isDark ? <MdLightMode className='headerIcon' /> : <MdDarkMode className='headerIcon' />}
                    </div>
                }
            </div>

            {isAuthenticated && <div id="headerBar" className={`headerBar ${isBar && "headerBarDisplay"}`}>
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
                        <div className={`dropMenu ${shadow} ${headerBg}`}>
                            <CreateTeam className={`teamCraft actionBackground ${actionBg}`} title={'create new'} />
                            <JoinNew className={`teamCraft actionBackground ${actionBg}`} title={'join team'} />
                            <div className='actionCraft'>
                                <Logout />
                                <div className={`themeBox actionBackground ${actionBg}`} onClick={handleTheme}>
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