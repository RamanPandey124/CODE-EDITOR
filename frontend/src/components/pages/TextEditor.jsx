import "public/sass/pages/TextEditor.scss"
import { getTeam } from "@/services/AxiosApi"
import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import LiveBlock from "../singleUse/LiveBlock";
import { CounterContext } from "@/contextApi/Context";

const TextEditor = () => {
    const teamToken = window.localStorage.getItem('teamToken')
    if (!teamToken) {
        return <Navigate to={'/'} replace />
    }
    const [team, setTeam] = useState(null)
    const navigate = useNavigate()
    const { dispatch } = useContext(CounterContext)

    const teamFunc = async () => {
        const data = await getTeam(teamToken)
        setTeam(data?.team)
        if (data?.user) {
            dispatch({ type: 'USER', value: data.user })
        }

    }

    const leaveTeam = async () => {
        window.localStorage.removeItem('teamToken')
        navigate('/')
    }



    useEffect(() => {
        { teamToken && teamFunc() }
    }, [])

    return (
        <div className="code-editor">
            {team && <div className="editor-container">
                <div className="team-details">
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
                    <div className="team-action">
                        <div className="actionbtn chatbtn"><IoChatboxEllipsesSharp className="btnIcon" /> Chat</div>
                        <div className="actionbtn leavebtn" onClick={leaveTeam}><CiLogout className="btnIcon" /> Leave</div>
                    </div>
                </div>

                {team && <LiveBlock id={team._id} />}
            
            </div>}
        </div>
    )

}

export default TextEditor