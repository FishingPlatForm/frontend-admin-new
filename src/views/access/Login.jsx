import { Button, message, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { loginAxios } from '../../commons/request/access';
import { Redirect, withRouter } from 'react-router-dom';

const Login = () => {
    const [redirect, setRedirect] = useState(false); //是否登录成功
    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = async (values) => {
        let res = await loginAxios({
            "password": values.password,
            "userid": values.username
        })
        if (res.success && res.data) {
            localStorage.setItem("token", res.data);
            setRedirect(true);
            message.success("登录成功")
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            username: "epicfish-admin",
            password: "epicfish520@"
        })
    }, [])
    // 检测 是否是邮箱跳转过来
    if (redirect) {
        return <Redirect to="/console" />
    }
    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default withRouter(Login);