
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'


const Home = () => {
    const isAuthenticated = useIsAuthenticated()
    console.log(isAuthenticated())


    return (
        <div>
            home
        </div>
    );
};

export default Home;
