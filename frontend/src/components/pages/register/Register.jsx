import Signup from "./singup/Signup"
import './Register.scss'
import ContentBox from "../../utils/contentbox/ContentBox"
import { registerContent } from "../../../assets/refrences/UiText"



const Register = () => {
    return (
        <div className={`register-main`}>
            <ContentBox content={registerContent}/>

            <div className={`register-form`}>
                <Signup />
            </div>
        </div>
    )
}

export default Register

