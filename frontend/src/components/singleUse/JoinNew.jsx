import { useState } from "react";
import JoinTeam from "../reuseable/JoinTeam"

const JoinNew = ({ className }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div className={className} onClick={() => setIsModalOpen(true)}>
                <p>Join team</p>
            </div>
            <JoinTeam isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

export default JoinNew