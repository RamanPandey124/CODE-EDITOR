import './Signup.scss'
import { useFormik } from 'formik'
import InputBox from '../../../utils/inputbox/InputBox'
import { signUpSchema } from '../../../../assets/yup files/RegisterYup'
import FormBox from '../../../utils/formbox/FormBox'
import { signupContent } from '../../../../assets/refrences/UiText'


const Signup = () => {



    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {
            console.log(values)
            action.resetForm()
        }
    })


    return (
        <FormBox content={signupContent}>
            <form onSubmit={handleSubmit}>
                <InputBox
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
                <input className={`signbtn`} type='submit' value={'signup'} />
            </form>
        </FormBox>
    )
}

export default Signup