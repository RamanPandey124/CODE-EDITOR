import { useState } from "react";
import JoinTeam from "../reuseable/JoinTeam"
import { MdOutlineJoinLeft } from "react-icons/md";

const JoinNew = ({ className, title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div className={className} onClick={() => setIsModalOpen(true)}>
                <p><MdOutlineJoinLeft className="headerIcon" /> {title}</p>
            </div>
            <JoinTeam isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

export default JoinNew