import './ContentBox.scss'

const ContentBox = ({ content }) => {
    return (
        <div className={`ContentBox-main`}>
            <h1>{content.title}</h1>
            <p>{content.subTitle}</p>
            <div className={`bgImage`}>
                <img src={content.imgPath} />
            </div>
        </div>
    )
}

export default ContentBox