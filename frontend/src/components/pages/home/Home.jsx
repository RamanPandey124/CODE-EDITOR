import Create from '../../subComponents/create&join/Create';
import Header from '../../subComponents/header/Header';
import Profile from '../../subComponents/profile/Profile';
import TeamForm from '../../utils/teamform/TeamForm';
import './Home.scss'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

const Home = () => {
    const isAuthenticated = useIsAuthenticated()


    return (
        <div className='home'>
            <Create />
            <Profile />
            <TeamForm />
        </div>
    );
};

export default Home;
