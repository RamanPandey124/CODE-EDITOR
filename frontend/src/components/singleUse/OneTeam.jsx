import { useState } from "react"
import JoinTeam from "../reuseable/JoinTeam"

const OneTeam = ({ team }) => {
    const [isModalOpen, setModelOpen] = useState(false)

    return (
        <div className="team-box">
            <h2>{team.name}</h2>
            <hr />
            <p>{team.users.length} Users connected</p>
            <button className="createbtn" onClick={() => setModelOpen(true)}>join now</button>
            <JoinTeam isModalOpen={isModalOpen} onClose={() => setModelOpen(false)} name={team.name} />
        </div>
    )
}

export default OneTeam