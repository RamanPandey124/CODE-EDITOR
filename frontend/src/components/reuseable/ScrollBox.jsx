import { useEffect, useState } from "react"
import CreateTeam from "../singleUse/CreateTeam"
import JoinNew from "../singleUse/JoinNew"


const ScrollBox = () => {
    const [scroll, setScroll] = useState(0)
    const [display, setDisplay] = useState(false)

    const controlScroll = () => {
        setScroll(window.scrollY)
        controlDisplay()
    }
    const controlDisplay = () => {
        if (scroll > 300) {
            setDisplay(true)
        }
        else {
            setDisplay(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', controlScroll)
    }, [scroll])

    return (
        <div className={`scrollBox ${display && 'scrollDisplay'}`}>
            <CreateTeam className={`createTeam scrollbtn`} />
            <JoinNew className={" joinTeam scrollbtn"} />
        </div>
    )
}

export default ScrollBox