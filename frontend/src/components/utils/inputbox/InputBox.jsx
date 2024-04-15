import { useEffect, useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import './InputBox.scss'
import { useSelector } from "react-redux";

const InputBox = ({ name, type, placeholder, values, onChange, onBlur, errors, touched }) => {
    const { inputBorder } = useSelector((state) => state.theme)
    const [hide, setHide] = useState(false)
    const [isPass, setPass] = useState(false)

    useEffect(() => {
        if (type === 'password') {
            setHide(true)
            setPass(true)
        }
    }, [])

    return (
        <>
            <div className={`inputBox`}>
                <input
                    name={name}
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