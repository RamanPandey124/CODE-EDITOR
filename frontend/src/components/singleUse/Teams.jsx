import { useState } from "react"
import "public/sass/singleuse/Teams.scss"
import { RiTeamFill } from "react-icons/ri";
import OneTeam from "./OneTeam";

const Teams = ({ teamList }) => {
    // console.log(teamList)
    const [team, setTeam] = useState(teamList)

    const searchTeam = (e) => {
        const remaining = teamList.filter((v) => v.name.includes(e))
        console.log(remaining)
        setTeam(remaining)
    }

    return (
        <div className="Teams-container">
            <div className="team-search">
                <input
                    type="text"
                    placeholder="search team"
                    onChange={(e) => searchTeam(e.target.value)} />
            </div>
            <h1><RiTeamFill /> Teams</h1>
            <div className="teams-main">
                {(team && team.length) ? team.map((v) => (
                    <OneTeam team={v} key={v._id} />
                )) : null}

            </div>
        </div>
    )
}

export default Teams