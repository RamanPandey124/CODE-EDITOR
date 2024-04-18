import "public/sass/singleuse/Loader.scss"

const Loader = ({ position, all=false }) => {

    return (
        <div className="center" style={{ position }}>
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            {all && <><div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
            </>}
        </div>

    )
}

export default Loader