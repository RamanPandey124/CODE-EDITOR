import '/public/sass/reuseable/FormBox.scss';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const FormBox = ({ children, content }) => {
    const { shadow } = useSelector((state) => state.theme)
    return (
            <div className={`form-main ${shadow}`}>
                <h3>{content.title}</h3>
                <p>{content.subTitle}</p>

                {children}
                <hr className='hrline' />
                <p className='navigate'>
                    {content.navigateText}
                    <Link to={`/${content.navigateTo}`} style={{ color: content.navigateColor }}>{content.navigateTo}</Link>
                </p>
            </div>
    )
}

export default FormBox