import '/public/sass/pages/Signup.scss';
import { useFormik } from 'formik'
import { signUpSchema } from '@/assets/yup files/RegisterYup'
import { signupContent } from '@/assets/refrences/UiText'
import FormBox from '../reuseable/FormBox';
import InputBox from '../reuseable/InputBox';
import { useState } from 'react';
import { userSignup } from "@/services/AxiosApi"
import Loader from '../singleUse/Loader';



const Signup = () => {
    const [loading, setLoading] = useState(false)

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: signUpSchema,
        onSubmit: async (values, action) => {
            setLoading(true)
            await userSignup(values)
            setLoading(false)
            action.resetForm()
        }
    })


    return (
        <div className='signup-main'>
            <FormBox content={signupContent}>
                <form onSubmit={handleSubmit}>
                    <InputBox
                        focus
                        name={'name'}
                        placeholder={'Username'}
                        values={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.name}
                        touched={touched.name}
                    />
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
                    <InputBox
                        type={'password'}
                        name={'confirmPassword'}
                        placeholder={'Confirm Password'}
                        values={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.confirmPassword}
                        touched={touched.confirmPassword}
                    />
                    <button
                        className={`signbtn`}
                        disabled={loading}
                        type='submit'
                    >{loading ? <Loader /> : 'signup'}</button>
                </form>
            </FormBox>
        </div>
    )
}

export default Signup