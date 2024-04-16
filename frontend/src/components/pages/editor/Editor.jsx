
import { useEffect } from "react"
import "./Editor.scss"
import { useDispatch, useSelector } from 'react-redux'
import { getTeam } from "../../../redux/actions/teamAction"

const Editor = () => {
    const dispatch = useDispatch()
    const { teamData } = useSelector((state) => state.team)
    // console.log(teamData)

    useEffect(() => {
        dispatch(getTeam())
    }, [])

    return (
        <div className="editor">
            {teamData != null && <div className="editor-info">
                <h1>Team name : {teamData.TeamName}</h1>
                <h3>Team Id : {teamData._id}</h3>

                <div className="userBox">
                    {teamData.users.length && teamData.users.map((v) => (
                        <div className="users" key={v._id}>
                            <p>{v.name}</p>
                        </div>
                    ))}
                </div>

            </div>}
            <div className="editor-code">
            </div>

        </div>
    )
}

export default Editor