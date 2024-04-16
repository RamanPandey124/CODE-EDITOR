import { useEffect } from 'react'
import './Profile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { userProfile } from '../../../redux/actions/authAction'
import userImage from '../../../assets/images/file.png'
import { motion } from 'framer-motion'
import { create } from '../../../redux/slices/inputSlice'

const Profile = () => {
    const dispatch = useDispatch()
    const { userDetails, userTeams } = useSelector((state) => state.auth)
    // console.log(userDetails, userTeams)

    function JoinFunc(v) {
        const obj = {
            _id: v._id,
            title: `Join ${v.name}`,
            value: v._id,
        }
        dispatch(create(obj))
    }

    useEffect(() => {
        dispatch(userProfile())
    }, [])

    return (
        <div className={`profile`}>
            <div className='userDetails'>
                <img src={userImage} />
                <h1>{userDetails.name}</h1>
                <h3>{userDetails.email}</h3>
                <p>Team joined : {userTeams.length}</p>
            </div>
            <div className='userTeams'>
                <h1>Teams</h1>
                <div className='userTeam'>
                    {userTeams.length && userTeams.map((v) => (
                        <motion.div
                            key={v._id}
                            layoutId={v.id}
                            onClick={() => JoinFunc(v)}
                            className='teamBox'
                        >
                            <h3>Team name: {v.name}</h3>
                            <p>{v.users.length}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Profile