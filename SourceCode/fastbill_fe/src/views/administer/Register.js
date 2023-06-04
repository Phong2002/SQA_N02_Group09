import React from 'react'
import Navigate from "../../components/layout/Navigate";
import Header from "../../components/layout/Header";
import Sider from "antd/es/layout/Sider";
import {Button, DatePicker, Form, Input, notification, Radio, Select} from 'antd';
import {Option} from "antd/es/mentions";
import Search from "antd/es/input/Search";
import { Avatar, Divider, List, Skeleton ,message} from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import requester from "../../infrastructure/requester";

export default function Register() {
    const [formCreateNew] = Form.useForm();
    const [formAddEclectric] = Form.useForm();
    const [isNewCustomer,setIsNewCustomer] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const [messageCreateNewAccount,setMessCreateNewAccount] = useState('')
    const [messageAddElectric,setMessageAddElectric] = useState('')
    const [loading, setLoading] = useState(false);
    const [user,setUser]= useState(null);
    const [listUser,setListUser]=useState([]);
    const [listUserDisplay,setListUserDisplay]=useState([]);

    const handleChangeCustomer=(e)=>{
        setIsNewCustomer(e.target.value)
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSearch=(e)=>{
        console.log(e.target.value)
        setListUserDisplay(listUser.filter(item =>
            `${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()}`.includes(e.target.value.toLowerCase())||
            `${item.email.toLowerCase()}`.includes(e.target.value.toLowerCase())

        ))
    }

    const openNotification = () => {
        notification.success({
            message: 'Thành công',
            description:
                'Thanh toán thành công',
        });
    };

    const handleLoadUser = ()=>{
        setLoading(true);
        requester.get("api/v1/user/get_all_user",{},(response)=>{
            setLoading(false);
            setListUser(response.users)
            setListUserDisplay(response.users)
        })

    }

    const handleClickUser=(user)=>{
        setUser(user)
    }

    const handleAddElectrict = (electric)=>{
        setMessageAddElectric("")
        if(user===null){
            setMessageAddElectric("Cần chọn khách hàng đăng ký !")
        }
        electric.userId=user.id
        messageApi
            .open({
                type: 'loading',
                content: 'loading..',
                duration: 2.5,
            })
        requester.post("api/v1/electric/add_ei",
            electric,
            (response)=>{
                if(response.err==0){
                    message.success('Thêm số công tơ thành công', 2.5)
                    formAddEclectric.resetFields()
                }
                else {
                    message.error('Thêm số công tơ thất bại', 2.5)
                    setMessageAddElectric("Số điện đã được đăng ký !")
                }
            })
    }

    const handleCreateNewUser=(user)=>{
        setMessCreateNewAccount("")
        user.role_code="R2"
        user.password="123456"
        messageApi
            .open({
                type: 'loading',
                content: 'Loading..',
                duration: 2.5,
            })
        requester.post("api/v1/auth/register",user,(response)=>{
            if(response.err==0){
                requester.post("api/v1/electric/add_ei",
                    {userId:response.user.id,
                        electricId:user.electricId,
                        address:user.electricAddress,
                        },
                    (response)=>{
                    if(response.err==0){
                        message.success('Đăng ký thành công', 2.5)
                        formCreateNew.resetFields()

                    }
                    else {
                        message.error('Đăng ký thất bại', 2.5)
                        setMessCreateNewAccount("Số điện đã được đăng ký !")
                    }
                })
            }
            else {
                message.error('Đăng ký thất bại', 2.5)
                setMessCreateNewAccount("Email đã được đăng ký !")
            }
        })
    }

    useEffect(handleLoadUser,[])

    return (
        <div className="Container grid grid-cols-6 grid-flow-col gap-2">
            <Sider className=' row-span-6 rm_max_width'>
                <Navigate location={"register"} />
            </Sider>
            <Header />
            <div className="w-full col-span-5 ">
                <div className="flex m-3">
                    <Radio.Group onChange={handleChangeCustomer} defaultValue={true} className="m-auto">
                        <Radio.Button value={true}>Khách hàng đăng kí lần đầu</Radio.Button>
                        <Radio.Button value={false}>Khách hàng đã có tài khoản</Radio.Button>
                    </Radio.Group>
                </div>

                <div className="flex justify-center ">
                    {isNewCustomer?
                        <div >
                            <Form
                                name={"formCreateNew"}
                                form={formCreateNew}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 24 }}
                                style={{ width: 600 }}
                                initialValues={{ remember: true }}
                                onFinish={handleCreateNewUser}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Họ và tên đệm"
                                    name="firstName"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ vè tên đệm!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Tên"
                                    name="lastName"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="gender"
                                    label="Giới tính"
                                    rules={[{ required: true, message: 'Vui lòng chọn giới tính !' }]}
                                >
                                    <Select >
                                        <Option value="Nam">Nam</Option>
                                        <Option value="Nữ">Nữ</Option>
                                        <Option value="Khác">Khác</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Địa chỉ"
                                    name="address"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item name="birthday" label="Ngày sinh"
                                           rules = {[{
                                               type: 'object',
                                               required: true,
                                               message: 'Vui lòng chọn ngày sinh!',
                                           }]}
                                >
                                    <DatePicker placeholder={""}/>
                                </Form.Item>

                                <Form.Item
                                    label="Số căn cước công dân"
                                    name="cccd"
                                    rules={[{ required: true, message: 'Vui lòng nhập số căn cước công dân!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Email không đúng định dạng !',
                                        },
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập email !',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    rules={[ {
                                        pattern: '(84|0[3|5|7|8|9])+([0-9]{8})\\b',
                                        message: 'Số điện thoại không đúng định dạng !',
                                    },{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Số công tơ điện"
                                    name="electricId"
                                    rules={[{ required: true, message: 'Vui lòng nhập số công tơ điện!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Địa chỉ công tơ điện"
                                    name="electricAddress"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ công tơ điện!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <div className={"text-center text-red-600"}>{messageCreateNewAccount}</div>

                                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                                    <Button type="primary" className="login-form-button w-full h-10 bg-blue-400"  htmlType="submit">
                                        Đăng ký
                                    </Button>
                                </Form.Item>


                            </Form>



                        </div>
                        :
                        <div className={'flex items-center flex-col' }>

                            <Input
                                placeholder="Tìm kiếm theo tên,CCCD,SĐT,..."
                                enterButton="Tìm kiếm"
                                size="large"
                                style={{ width: 500 }}
                                onChange={handleSearch}

                            />

                            <div
                                id="scrollableDiv"
                                style={{
                                    marginTop:10,
                                    height: 200,
                                    width:600,
                                    overflow: 'auto',
                                    padding: '0 16px',
                                    border: '1px solid rgba(140, 140, 140, 0.35)',
                                }}
                            >
                                <InfiniteScroll
                                    dataLength={listUserDisplay.length}
                                    loader={
                                        <Skeleton
                                            avatar
                                            paragraph={{
                                                rows: 1,
                                            }}
                                            active
                                        />
                                    }
                                    scrollableTarget="scrollableDiv"
                                >
                                    <List
                                        dataSource={listUserDisplay}
                                        renderItem={(item) => (
                                            <List.Item key={item.email} onClick={()=>handleClickUser(item)} className={"cursor-pointer hover:bg-gray-100"}>
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar src={item.avatar} size="large" >
                                                            {`${item.firstName} ${item.lastName}`.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}
                                                        </Avatar>}
                                                    title={<p>{`${item.firstName} ${item.lastName}`}</p>}
                                                    description= {<p>{`${item.email} | ${item.phoneNumber}`}</p>}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </InfiniteScroll>

                            </div>

                            <div style={{width:600,marginTop:10}}>
                                {user===null?
                                    <Skeleton
                                        style={{margin:10}}
                                        avatar
                                        size="large"
                                        paragraph={{
                                            rows: 1,
                                        }}
                                        active
                                    />
                                :
                                    <div>
                                        <List  style={{margin:10}}
                                            dataSource={[user]}
                                            renderItem={(item) => (
                                                <List.Item key={item.email} className={"cursor-pointer hover:bg-gray-100"}>
                                                    <List.Item.Meta
                                                        avatar={
                                                            <Avatar src={item.avatar} size="large" >
                                                                {`${item.firstName} ${item.lastName}`.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}
                                                            </Avatar>}
                                                        title={<p>{`${item.firstName} ${item.lastName}`}</p>}
                                                        description= {<p>{`${item.email} | ${item.phoneNumber}`}</p>}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                }
                                <Form
                                    form={formAddEclectric}
                                    name="basic"
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ maxWidth: 600 }}
                                    initialValues={{ remember: true }}
                                    onFinish={handleAddElectrict}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Số công tơ điện"
                                        name="electricId"
                                        rules={[{ required: true, message: 'Vui lòng nhập số công tơ điện !' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Địa chỉ công tơ điện"
                                        name="address"
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ công tơ điện !' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <div className={"text-center text-red-600 mb-2"}>{messageAddElectric}</div>
                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                        <Button type="primary" htmlType="submit" className={"w-1/2 h-10 bg-blue-400"}>
                                            Đăng ký
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    }

                </div>
            </div>

        </div>
    )
}
