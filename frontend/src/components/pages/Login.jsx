import '/public/sass/pages/Login.scss';
import { useFormik } from 'formik'
import FormBox from '../reuseable/FormBox';
import InputBox from '../reuseable/InputBox.jsx';
import { logFormContent } from '@/assets/refrences/UiText'
import { LoginFormSchema } from '@/assets/yup files/RegisterYup'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useState } from 'react';
import { userLogin } from "@/services/AxiosApi"
import Loader from '../singleUse/Loader';

const Login = () => {
    const signIn = useSignIn()
    const [loading, setLoading] = useState(false)

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginFormSchema,
        onSubmit: async (values, action) => {
            setLoading(true)
            await userLogin(values, signIn)
            setLoading(false)
            action.resetForm()
        }
    })


    return (
        <div className='login-main'>
            <FormBox content={logFormContent}>
                <form onSubmit={handleSubmit}>
                    <InputBox
                        name={'email'}
                        placeholder={'Email'}
                        values={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.email}
                        touched={touched.email}

                    />
                    <InputBox
                        type={'password'}
                        name={'password'}
                        placeholder={'Password'}
                        values={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.password}
                        touched={touched.password}
                    />
                    <button
                        className={`signbtn`}
                        disabled={loading}
                        type='submit'
                    >
                        {loading ? <Loader /> : 'login'}
                    </button>

                </form>
            </FormBox>
        </div>
    )
}

export default Login