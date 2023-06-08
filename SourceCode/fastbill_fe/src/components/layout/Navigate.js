import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Menu } from 'antd'
import PhenikaaE from '../../assets/images/phenikaa-e.png'
import UserService from "../../infrastructure/UserService";
import {
    UserOutlined,
    SettingOutlined,
    LinkOutlined,
    HomeOutlined,
    PlusCircleOutlined,
    CreditCardOutlined,
    AreaChartOutlined,
    RadiusSettingOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import GeneralManagement from "../../views/administer/GeneralManagement";

const getItem = (label, key, icon, children, type) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
} 

const itemsAdmin = [
    getItem('Trang chủ', 'home',<HomeOutlined />),
    getItem('Quản lý', 'menu1', <SettingOutlined />, [
        getItem('Quản lý chung', 'general-management',<AreaChartOutlined />),
        getItem('Thanh toán', 'payment',<CreditCardOutlined />),
        getItem('Đăng ký', 'register',<PlusCircleOutlined />),
        getItem('Số điện', 'electric-number',<ThunderboltOutlined />),
    ]),
    getItem(
        <a href="https://www.evn.com.vn/" target="_blank" rel="noopener noreferrer">
            Pages
        </a>,
        'link',
        <LinkOutlined />,
    ),
];

const itemsCustomer = [
    getItem('Trang chủ', 'home',<HomeOutlined />),
    getItem('Thông tin cá nhân', 'profile', <UserOutlined />),
    getItem('Quản lý chung', 'general',<AreaChartOutlined />),
    getItem('Số điện', 'electric-number-customer',<ThunderboltOutlined />),
    getItem(
        <a href="https://www.evn.com.vn/" target="_blank" rel="noopener noreferrer">
            Pages
        </a>,
        'link',
        <LinkOutlined />,
    ),
];

export default function Navigate(props) {
    const navigate = useNavigate();
    const [key, setKey] = useState('')
    useEffect(() => {
        if (key === 'profile') {
            navigate('/profile')
        }
        if (key === 'general-management') {
            navigate('/general-management')
        }
        if (key === 'home') {
            navigate('/home')
        }
        if (key === 'payment') {
            navigate('/payment')
        }
        if (key === 'register') {
            navigate('/register')
        }

        if (key === 'electric-number') {
            navigate('/electric-number')
        }
        if (key === 'general') {
            navigate('/general')
        }
        if (key === 'electric-number-customer') {
            navigate('/electric-number-customer')
        }
    }, [key, navigate])


    return (
        <div className={"bg-white"}
        >
            <img className={"pr-10 pl-10 pb-2 pt-2 bg-white"} src={PhenikaaE}/>
            <Menu
                theme="light"
                mode="inline"
                className="h-screen "
                onSelect={(e) => setKey(e.key)}
                selectedKeys={[props.location]}
                items={UserService.isAdmin()?itemsAdmin:itemsCustomer}

            />
        </div>
    )
}
