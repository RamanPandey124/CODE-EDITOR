
import { loginContent } from '../../../assets/refrences/UiText'
import ContentBox from '../../utils/contentbox/ContentBox'
import DragBox from '../../utils/dragBox/DragBox'
import './Login.scss'
import LoginForm from './loginForm/LoginForm'



const Login = () => {
    return (
        <div className={`login-main`}>
            <ContentBox content={loginContent} />

            <DragBox>
                <LoginForm />
            </DragBox>
        </div>
    )
}

export default Login

