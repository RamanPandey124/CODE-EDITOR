import "public/sass/pages/CodeEditor.scss"
import { getTeam } from "@/services/AxiosApi"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import CodeContainer from "../singleUse/CodeContainer";


const CodeEditor = () => {
    const teamToken = window.localStorage.getItem('teamToken')
    if (!teamToken) {
        return <Navigate to={'/'} replace />
    }
    const [team, setTeam] = useState(null)
    // console.log(team)

    const teamFunc = async () => {
        setTeam(await getTeam(teamToken))
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
                        <div className="actionbtn chatbtn"><IoChatboxEllipsesSharp className="btnIcon"/> Chat</div>
                        <div className="actionbtn leavebtn"><CiLogout className="btnIcon"/> Leave</div>
                    </div>
                </div>
                <CodeContainer/>
            </div>}
        </div>
    )

}

export default CodeEditor