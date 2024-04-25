import "public/sass/reuseable/WorkspaceWrapper.scss"
import { getTeam } from "@/services/AxiosApi"
import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci";
import { CounterContext } from "@/contextApi/Context";
import { RiTeamFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import JoinTeam from "./JoinTeam";



const WorkspaceWrapper = ({ children }) => {
    const teamToken = window.localStorage.getItem('teamToken')
    const navigate = useNavigate()
    if (!teamToken) {
        return (
            <div className="workspace-wrapper">
                <JoinTeam isModalOpen={true} onClose={() => navigate('/')} current={true} />
            </div>
        )
    }

    const { state, dispatch } = useContext(CounterContext)
    const { team } = state
    const [teamPanel, setTeamPanel] = useState(false)

    const teamFunc = async () => {
        const data = await getTeam(teamToken)
        if (data?.user) {
            dispatch({ type: 'USER', value: data.user })
        }
        dispatch({ type: 'TEAM', value: data.team })
    }

    const leaveTeam = async () => {
        window.localStorage.removeItem('teamToken')
        navigate('/')
    }

    useEffect(() => {
        { teamToken && teamFunc() }
    }, [])

    return (
        <div className="workspace-wrapper">
            <div className="team-display">
                {teamPanel ?
                    <div className="teamPanel">
                        {team &&
                            <>
                                <MdCancel className="MdCancel teamIcon" onClick={() => setTeamPanel(false)} />
                                <div className="team-name">
                                    <h1>{team.TeamName}</h1>
                                    <p>team id {team._id}</p>
                                </div>
                                <div className="team-users">
                                    <h1>users</h1>
                                    <p>{team.users.length} users connected</p>
                                    <div className="Userlist">
                                        {team.users.length && team.users.map((v) => (
                                            <div className="singleUser" key={v._id}>{v.name}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="actionbtn" onClick={leaveTeam}>
                                    <CiLogout className="CiLogout teamIcon" /> Leave
                                </div>
                            </>}
                    </div> :
                    <RiTeamFill className="RiTeamFill teamIcon" onClick={() => setTeamPanel(true)} />}
            </div>

            {team && children}

        </div>
    )

}

export default WorkspaceWrapper

