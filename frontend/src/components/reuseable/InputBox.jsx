import '/public/sass/reuseable/InputBox.scss';
import { useEffect, useRef, useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useSelector } from "react-redux";

const InputBox = ({ name, type, placeholder, values, onChange, onBlur, errors, touched, focus=false }) => {
    const { inputBorder } = useSelector((state) => state.theme)
    const inputRef = useRef(null)
    const [hide, setHide] = useState(false)
    const [isPass, setPass] = useState(false)

    useEffect(() => {
        if (type === 'password') {
            setHide(true)
            setPass(true)
        }

        if (inputRef && focus) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <>
            <div className={`inputBox`}>
                <input
                    name={name}
                    ref={inputRef}
                    type={isPass ? 'password' : 'text'}
                    placeholder={placeholder}
                    value={values}
                    onChange={onChange}
                    onBlur={onBlur}
                    autoComplete="off"
                    className={inputBorder}
                />
                {hide && <span
                    className={`eye`}
                    onClick={(e) => { e.preventDefault(); setPass(!isPass) }}>
                    {!isPass ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>}
                {(errors && touched) ?
                    <p style={{ color: 'red' }}>{errors}</p> : null}
            </div>
        </>
    )
}

export default InputBox