import { useState } from "react"
import "public/sass/singleuse/Teams.scss"
import { RiTeamFill } from "react-icons/ri";
import OneTeam from "./OneTeam";
import { FaSearch, FaSearchMinus } from "react-icons/fa";
import { useSelector } from "react-redux";

const Teams = ({ teamList }) => {
    const [team, setTeam] = useState(teamList)
    const [search, setSearch] = useState(false)
    const { theme } = useSelector((state) => state.theme)

    const searchTeam = (e) => {
        const remaining = teamList.filter((v) => v.name.includes(e))
        setTeam(remaining)
    }

    return (
        <div className="Teams-container">
            <div className={`teams-Header ${theme}`}>
                <h1 className="teamTitle"><RiTeamFill /> Teams</h1>
                <div className="teamSearch">
                    {search ?
                        <>
                            <FaSearchMinus className="faSearch faMinus" onClick={() => setSearch(false)} />
                            <input
                                type="text"
                                placeholder="search team"
                                onChange={(e) => searchTeam(e.target.value)}
                            />
                        </> : <FaSearch className="faSearch" onClick={() => setSearch(true)} />
                    }
                </div>
            </div>

            <div className="teams-main">
                {(team && team.length) ? team.map((v) => (
                    <OneTeam team={v} key={v._id} />
                )) : null}

            </div>
        </div>
    )
}

export default Teams