import { UserOutlined, EyeTwoTone, LockOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { signinUserAction } from '../../redux/actions/auth';

// Stylesheets
import './public/signin.scss';

const SignIn = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleSubmit = async(values) => {
        const res = await dispatch(
            signinUserAction({
                data: form.getFieldValue()
            })
        )
    }

    return(
        <Form 
            form      = {form}
            className = "sign-form"
            onFinish  = {handleSubmit}
        >
            <h1 className='form-header-title'>Login Page</h1>
            <Form.Item 
                name         = "email"
                label        = "Email"
                initialValue = "admin@yahoo.com"
                labelCol     = {{span: 24}}
                wrapperCol   = {{span: 24}}
                rules        = {[
                    {
                        required : true,
                        message  : 'Please input your username!',
                    },
                ]}
            >
                <Input 
                    size        = "large" 
                />
            </Form.Item>
            <Form.Item 
                name         = "password"
                label        = "Password"
                initialValue = "admin123"
                labelCol     = {{span: 24}}
                wrapperCol   = {{span: 24}}
                rules        = {[
                    {
                        required : true,
                        message  : 'Please input your password!',
                    },
                ]}
            >
                <Input.Password
                    size        = "large" 
                    iconRender  = {(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item
                wrapperCol   = {{
                    span       : 24,
                }}
            >
                <Button 
                    shape        = "round"
                    size         = "large"  
                    htmlType     = "submit"
                    className    = "button submit"
                    style        = {{
                        width: '100%'
                    }}
                >
                    Submit
                </Button>
            </Form.Item>
            <Form.Item
                style        = {{ textAlign: 'center' }}
                wrapperCol   = {{
                    span       : 24,
                }}
            >
                <Link to="/sign/up"  style={{ color: 'var(--link-color)' }} replace={true}>Create an account</Link>
            </Form.Item>
        </Form>
    );
}

export default SignIn;