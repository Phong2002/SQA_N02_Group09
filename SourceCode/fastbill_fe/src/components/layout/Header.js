import React, {useState} from 'react'
import {Avatar, Space, Button, Dropdown, Modal} from 'antd';
import {useNavigate} from "react-router-dom";
import Marquee from "react-fast-marquee";
import logo_header from '../../assets/images/phenikaa-e.png';
import {InfoCircleOutlined, LogoutOutlined} from "@ant-design/icons";
import {logoutAction} from '../../utils/API/AuthAPI'
import UserService from "../../infrastructure/UserService";
export default function Header() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    const items = [
        {
            label: 'Thông tin cá nhân',
            key: '1',
            icon: <InfoCircleOutlined/>,
            onClick:()=>{
                navigate("/profile")}
        },
        {
            label: 'Đăng xuất',
            key: '2',
            icon: <LogoutOutlined/>,
            onClick:()=>{
                showModal();
            }
        },
    ];


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        logoutAction();
        setIsModalOpen(false);
        navigate('/')
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='col-span-5'>
            <div className='h-20 w-full bg-white shadow-sm shadow-neutral-300'>
                {/* <div className='pl-10 w-[65%]'>
          
        </div> */}

            </div>
            <div className='h-full pt-2'>
                <Marquee className='' gradient={false} speed={10}>
                    <p> Giá điện có xu hướng tăng trong năm này </p>
                </Marquee>
            </div>

            <Space className='absolute top-3 right-4' direction="col" size={16}>
                {!isLogin ?
                    <Space wrap>
                        <Button className='mt-3 h-10' size={16} onClick={() => {
                            navigate('/')
                        }}>
                            Sign In
                        </Button>
                        <Button className='mt-3 h-10' type="dashed" size={16} onClick={() => {
                            navigate('/signup')
                        }}>
                            Sign Up
                        </Button>
                    </Space>
                    :
                    <Space wrap className='bg-slate-100 cursor-pointer px-4 rounded-md '>
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <Space>
                                <Avatar size={60}
                                        style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} src={UserService.getAvtURL()}>{UserService.getFullName().match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}</Avatar>
                                <h1 className='text-lg font-medium'>Xin chào {UserService.getFullName()}</h1>
                            </Space>
                        </Dropdown>
                    </Space>
                }
            </Space>

            <Modal title="Đăng xuất" open={isModalOpen} onCancel={handleCancel}
                   footer={[
                           <Button key="Cancel" onClick={handleCancel}>
                               Cancel
                           </Button>,
                           <Button key="submit" type="primary" style={{background:'#469aff'}}  onClick={handleOk}>
                               OK
                           </Button>,]}>
                <p>Bạn có chắc muốn đăng xuất khỏi hệ thống Phenikaa Electric!</p>
            </Modal>

        </div>
    )
}
