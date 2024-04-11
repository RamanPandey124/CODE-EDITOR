import Signup from "./singup/Signup"
import './Register.scss'
import ContentBox from "../../utils/contentbox/ContentBox"
import { registerContent } from "../../../assets/refrences/UiText"
import DragBox from "../../utils/dragBox/DragBox"



const Register = () => {
    return (
        <div className={`register-main`}>
            <ContentBox content={registerContent} />

            <DragBox>
                <Signup />
            </DragBox>
        </div>
    )
}

export default Register

