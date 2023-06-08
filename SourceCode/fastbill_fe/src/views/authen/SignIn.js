import React, {useState} from "react";
import "../../assets/styles/index.css";
import signin_bg from "../../assets/images/signin_bg.jpg";
import {EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Checkbox, Form, Input, Typography} from "antd";

import {Login} from "../../utils/API/AuthAPI"
import {useNavigate} from "react-router-dom";

export default function SignInScreen() {
    const navigate = useNavigate();
    const {Text} = Typography;
    const [mess, setMess] = useState();
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    const actionLogin = {
        success: () => {
            navigate("/home")
        },
        error: (e) => {
            setMess("Sai tài khoản hoặc mật khẩu")
        }

    }

    const handleLogin = (values) => {
        setMess("")
        Login(values, actionLogin)
    }

    return (
        <div className="login-container w-full h-full">
            {/* Form user info */}
            <div className="login w-1/2 pt-48 h-full">
                <div className="max-w-md h-5/6 m-auto px-4 pt-10 shadow-lg shadow-gray-500/50">
                    <h1 className="h-12 text-4xl text-center">Đăng nhập</h1>
                    <p className="h-20 text-lg font-light text-slate-500">
                        Đăng nhập ngay để sử dụng các tính năng hữu ích của Phenikaa Electric nào!
                    </p>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleLogin}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email !",
                                },
                            ]}
                        >
                            <Input
                                id="email"
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                placeholder="Email"
                                className="h-12"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu !",
                                },
                            ]}
                        >
                            <Input.Password
                                id="password"
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Mật khẩu"
                                className="h-12"
                                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            />

                        </Form.Item>
                        {mess?
                            <div className={"text-center pb-2"}>
                                <Text className={'text-center'} type="danger">{mess}</Text>
                            </div>
                           :
                            ''}
                        <Form.Item>
                            <Button type="primary" htmlType="submit"
                                    className="login-form-button w-full h-10 bg-blue-400">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                        <p className="login-form-forgot ml-[70%] cursor-pointer select-none hover:text-blue-600">
                            Quên mật khẩu ?
                        </p>
                    </Form>
                </div>
            </div>

            {/* Sub background image */}
            <div
                className="login-bg w-3/5 bg-blue-200"
                style={{
                    backgroundImage: `url(${signin_bg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                }}
            ></div>
        </div>
    );
}
