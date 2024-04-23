import { useState } from "react"
import JoinTeam from "../reuseable/JoinTeam"
import { memo } from "react"

const OneTeam = ({ team }) => {
    const [isModalOpen, setModelOpen] = useState(false)
    const randomIcon = getRandomIcon();

    return (
        <div className="team-box">
            <FontAwesomeIcon icon={randomIcon} className="fontAwesome" />
            <h2>{team.name}</h2>
            <hr />
            <p>{team.users.length} Users</p>
            <button className="createbtn joinbtn" onClick={() => setModelOpen(true)}>join now</button>
            <JoinTeam isModalOpen={isModalOpen} onClose={() => setModelOpen(false)} name={team.name} />
        </div>
    )
}

// export default (OneTeam)
export default memo(OneTeam)


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faUserFriends,
    faUserPlus,
    faUserCheck,
    faUserCog,
    faUserShield,
    faUserTag,
    faUserTie,
    faUserNinja,
    faHandsHelping
} from '@fortawesome/free-solid-svg-icons';

const icons = [
    faUsers, faUserFriends, faUserPlus, faUserCheck, faUserCog, faUserShield, faUserTag, faUserTie, faUserNinja, faHandsHelping
]

function getRandomIcon() {
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
}
