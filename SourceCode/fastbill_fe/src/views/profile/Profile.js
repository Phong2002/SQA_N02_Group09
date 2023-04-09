import React, {useEffect, useState} from 'react'
import '../../assets/styles/dashboard.css'
import Header from '../../components/layout/Header'
import Navigate from '../../components/layout/Navigate'
import requester from "../../infrastructure/requester";

import { Layout, Avatar, Space } from 'antd'
import UserService from "../../infrastructure/UserService";
const { Sider } = Layout

export default function Profile() {
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [birthday,setBirthday] = useState();
  const [email,setEmail]=useState('');
  const [address,setAddress]=useState('');
  const [cccd,setCccd]=useState('');
  const [avatar,setAvatar]=useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [gender,setGender] = useState('')

  const getInfor = ()=>{
    requester.get("api/v1/user/get_user_by_token",{},(response)=>{
      const useResponse = response.user;
      setFirstName(useResponse.firstName);
      setLastName(useResponse.lastName);
      setEmail(useResponse.email);
      setBirthday(useResponse.birthDay);
      setAddress(useResponse.address);
      setCccd(useResponse.cccd);
      setAvatar(useResponse.avatar);
      setGender(useResponse.gender);
      setPhoneNumber(useResponse.phoneNumber);
    })
  }

  useEffect(getInfor,[])

  return (
    <div className="Container grid grid-rows-6 grid-cols-6 grid-flow-col gap-2">
      <Sider className='row-span-6 rm_max_width'>
        <Navigate  location={"profile"}/>
      </Sider>
      <Header />
      <div className='row-span-5 col-span-5'>
        <div className='w-[90%] h-[90%] flex bg-white m-auto border-t-8 border-sky-200'>
          <div className='w-80 h-1/2 m-6 border-r-2 border-gray-200'>
            <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} size={200} className='ml-[20%]'
                    src={avatar} >{`${firstName} ${lastName}`.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}</Avatar>
              <h2 className='ml-16 mt-10 font-medium text-3xl'>{`${firstName} ${lastName}`}</h2>
          </div>
          <div className='w-3/4 h-1/2 mt-6 py-6 pl-4 bg-cyan-50'>
            {/* setup form by table */}
            <table className='w-full h-full'>
              <tbody>
              <tr>
                <td className='w-36 font-medium'>Họ và tên</td>
                <td className=''>{`${firstName} ${lastName}`}</td>
              </tr>
              <tr>
                <td className='w-36 font-medium'>Ngày sinh</td>
                <td className=''>{birthday}</td>
              </tr>
              <tr>
                <td className='w-36 font-medium'>Giới tính</td>
                <td className=''>{gender}</td>
              </tr>
              <tr>
                <td className='w-36 font-medium'>CMND/CCCD</td>
                <td className=''>{cccd}</td>
              </tr>
              <tr>
                <td className='w-36 font-medium'>Số điện thoại</td>
                <td className=''>{phoneNumber}</td>
              </tr>
              <tr>
                <td className='w-36 font-medium'>Email</td>
                <td className=''>{email}</td>
              </tr>
              <tr>
                <td className='w-36 font-medium'>Địa chỉ</td>
                <td className=''>{address}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div> 

        <div>
          
        </div>
      </div>
    </div>
  )
}
