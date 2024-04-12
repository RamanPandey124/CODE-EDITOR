import { Link } from 'react-router-dom'
import './FormBox.scss'

const FormBox = ({ children, content }) => {
    return (
        <div className='form-main'>
            <div className={`bubbleA`} style={{ background: content.bubbleA }}></div>
            <div className={`form-sub`}>
                <h3>{content.title}</h3>
                <p>{content.subTitle}</p>

                {children}
                <hr className='hrline' />
                <p className='navigate'>
                    {content.navigateText}
                    <Link to={`/${content.navigateTo}`} style={{ color: content.navigateColor }}>{content.navigateTo}</Link>
                </p>
            </div>
            <div className={`bubbleB `} style={{ background: content.bubbleB }}></div>

        </div>
    )
}

export default FormBox