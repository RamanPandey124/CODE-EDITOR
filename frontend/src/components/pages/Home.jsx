import "public/sass/pages/Home.scss"
import { useContext, useEffect, useState } from 'react'
import Profile from '@/assets/images/profile.png'
import { userProfile } from '@/services/AxiosApi';
import socket from "@/sockets/Socket";
import Loader from "../singleUse/Loader";
import Teams from "../singleUse/Teams";
import { CounterContext } from "@/contextApi/Context";


const Home = () => {
    const [user, setUser] = useState(null)
    const { dispatch } = useContext(CounterContext)

    async function userData() {
        const userData = await userProfile()
        setUser(userData)
        if (userData !== 'error') {
            dispatch({ type: 'USER', value: userData })
        }
    }

    useEffect(() => {
        userData()
    }, [])
    socket.connect()

    if (user == null) {
        return <Loader position={'absolute'} all={true} />
    }

    return (
        <div className='home'>
            <div className='userdetails'>
                <div className="profileImg">
                    <img src={Profile} />
                </div>
                <div className="profiles">
                    <div className="profileNames">
                        <h1>{user.name}</h1>
                        <p>email : {user.email}</p>
                    </div>
                </div>
            </div>
            <Teams teamList={user.teams} />
        </div>
    );
};

export default Home;
