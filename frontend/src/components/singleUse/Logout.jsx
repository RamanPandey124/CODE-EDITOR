import '/public/sass/singleuse/Logout.scss';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { toast } from 'react-toastify'

const Logout = () => {
    const sighOut = useSignOut()
    function logoutFunc() {
        sighOut()
        toast.error('Logout')
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
    return (
        <div className="logout" onClick={logoutFunc}>
            Logout
        </div>
    )
}

export default Logout