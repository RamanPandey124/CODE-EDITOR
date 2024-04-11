
import { loginContent } from '../../../assets/refrences/UiText'
import ContentBox from '../../utils/contentbox/ContentBox'
import './Login.scss'
import LoginForm from './loginForm/LoginForm'



const Login = () => {
    return (
        <div className={`login-main`}>
            <ContentBox content={loginContent} />

            <div className={`login-form`}>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login

