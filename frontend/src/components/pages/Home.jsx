import '/public/sass/pages/Home.scss';
import API from '@/services/API';
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Profile from '@/assets/images/profile.png'
import NewTeam from '../singleUse/NewTeam';
import { userProfile } from '@/services/AxiosApi';


const Home = () => {
    const [user, setUser] = useState(null)

    async function userData() {
        setUser(await userProfile())
    }

    useEffect(() => {
        userData()
    }, [])

    return (
        <div className='home'>
            {user != null && <div className='profile'>
                <div className='userdetails'>
                    <img src={Profile} />
                    <h1>{user.name}</h1>
                    <p>email : {user.email}</p>
                    <div className='editbtn'>Edit profile</div>
                    <hr />
                </div>
                <div className='newTeam'>
                    <NewTeam
                        title="Create new"
                        className="teambtn createTeam"
                        cpwd={true}
                    />
                    <NewTeam
                        title="Join team"
                        className="teambtn joinTeam"
                    />
                </div>
            </div>}
            <div className='teams'>

            </div>
        </div>
    );
};

export default Home;
