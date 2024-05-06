import { useState } from 'react';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Actions
import { registerNewUserAction } from '../../redux/actions/auth';

// Stylesheets
import './public/signin.scss';

const SignIn = () => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const [ stateLoading, setLoading ] = useState(false);

    const handleSubmit = async() => {
        setLoading(true);
        const res = await dispatch(
            registerNewUserAction({
                data: form.getFieldValue()
            })
        )
        setLoading(false);
        const status     = res.status>=200 && res.status<=299? "success":"warning";
        const message    = status==="success"? res.data.message:res.data.error;
        const noteAction = (status, message) => new Promise(( resolve, reject ) => {
            api[status]({
                message     : status,
                description : message,
                placement   : 'topRight',
            });
            let delayReturn;
            clearTimeout(delayReturn);
            delayReturn = setTimeout(() => resolve(), 500);
        });

        await noteAction(status, message);

        if( status==="success" ){
            navigate("/sign",{ replace: true });
        }
    }

    return(
        <>
            <Form 
                form      = {form}
                className = "sign-form"
                onFinish  = {handleSubmit}
            >
                <h1 className='form-header-title'>Register user</h1>
                <Form.Item 
                    name         = "username"
                    label        = "Username"
                    initialValue = "test2"
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
                    name         = "email"
                    label        = "Email"
                    initialValue = "admin1@yahoo.com"
                    labelCol     = {{span: 24}}
                    wrapperCol   = {{span: 24}}
                    rules        = {[
                        {
                            required : true,
                            message  : 'Please input your email!',
                        },
                        {
                            type     : 'email',
                        }
                    ]}
                >
                    <Input
                        size        = "large" 
                    />
                </Form.Item>
                <Form.Item 
                    name         = "password"
                    label        = "password"
                    initialValue = "admin123"
                    labelCol     = {{span: 24}}
                    wrapperCol   = {{span: 24}}
                    rules        = {[
                        {
                            required : true,
                            message  : 'Please input your password!',
                        },
                        { 
                            min      : 6,
                            message  : 'Password must be at least 6 characters long'
                        },
                    ]}
                >
                    <Input.Password
                        size        = "large" 
                        iconRender  = {(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item 
                    name         = "role"
                    label        = "Role"
                    initialValue = "user"
                    labelCol     = {{span: 24}}
                    wrapperCol   = {{span: 24}}
                    rules        = {[
                        {
                            required : true,
                            message  : 'Please input your role',
                        },
                    ]}
                >
                    <Select
                        size        = "large" 
                        options     = {['user'].map((item) => ({
                            value: item,
                            label: item,
                        }))}
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
                        loading      = {stateLoading}
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
                    <Link to="/" style={{ color: 'var(--link-color)' }} replace={true}>Block to Login Page</Link>
                </Form.Item>
            </Form>
            {contextHolder}
        </>
    );
}

export default SignIn;