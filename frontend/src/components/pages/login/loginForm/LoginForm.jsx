import { useFormik } from 'formik'
import './LoginForm.scss'
import FormBox from '../../../utils/formbox/FormBox'
import InputBox from '../../../utils/inputbox/InputBox'
import { logFormContent } from '../../../../assets/refrences/UiText'
import { LoginFormSchema } from '../../../../assets/yup files/RegisterYup'


const LoginForm = () => {



    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginFormSchema,
        onSubmit: (values, action) => {
            console.log(values)
            action.resetForm()
        }
    })


    return (
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
                <input className={`loginbtn`} type='submit' value={'Login'} />
            </form>
        </FormBox>
    )
}

export default LoginForm