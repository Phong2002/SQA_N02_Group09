import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Space } from 'antd';
import '../../assets/styles/dashboard.css'
import {calculateElectricityBill,calculateElectricityFromAmount} from "../../utils/ElectrictNumber/ElectrictNumberUltis";
import requester from "../../infrastructure/requester";

export default function Bill(props) {
  console.log("--------------------props",props)
  const navigate = useNavigate();
  const handelBill = () => {
    requester.put("api/v1/electric/pay_electric",{"electricId":props.electric.id},(response)=>{
      if (response.err == 0) {
        props.handlePay()
      }
    })
  }

  const electricNumber = calculateElectricityFromAmount(props.electric.moneyPay)
  console.log("===props.electric.moneyPay", props.electric.moneyPay);
  console.log("===calculateElectricityFromAmount(props.electric.electricNumber)", calculateElectricityFromAmount(props.electric.electricNumber));
  
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
  return (
    <div className=''>
      <div className='w-[70%] h-40 mt-4 m-auto grid grid-cols-6 grid-rows-4 gap-0'>
        <h1 className='col-span-6 text-base font-semibold'>Công ty điện lực Phenikaa</h1>
        <h1 className='col-span-1'>Địa chỉ:</h1>
        <p className='col-span-5'>P. Nguyễn Trác, Yên Nghĩa, Hà Đông, Hà Nội</p>

        <h1 className='col-span-1 text-base font-semibold'>Khách Hàng:</h1>
        <p className='col-span-1'>{props.user ? props.user.firstName+props.user.lastName:''}</p>

        <h1 className='col-span-1'>Địa chỉ:</h1>
        <p className='col-span-2'>{props.user ? props.user.address:''}</p>
        <h1 className='col-span-1'>Số điện thoại:</h1>
        <p className='col-span-2'>{props.user ? props.user.phoneNumber:''}</p>
        <h1>Số công tơ: { props.electric.electricId}</h1>
      </div>

      <table className='w-[70%] m-auto mt-4'>
        <thead>
          <tr className='h-11'>
            <th className='border border-gray-300 bg-slate-50'>Bộ CS</th>
            <th className='border border-gray-300 bg-slate-50'>Chỉ số mới</th>
            <th className='border border-gray-300 bg-slate-50'>Chỉ số cũ</th>
            <th className='border border-gray-300 bg-slate-50'>Số điện tiêu thụ</th>
            <th className='border border-gray-300 bg-slate-50'>Đơn giá</th>
            <th className='border border-gray-300 bg-slate-50'>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-gray-300 text-center'>KT</td>
            <td className='border border-gray-300 text-center'>4.565</td>
            <td className='border border-gray-300 text-center'>3.814</td>
            <td className='border border-gray-300 text-center'>{electricNumber}</td>
            <td className='border border-gray-300'></td>
            <td className='border border-gray-300'></td>
          </tr>
          <tr>
            <td className='border border-gray-300' rowSpan="6"></td>
            <td className='border-y border-gray-300' rowSpan="6"></td>
            <td className='border border-gray-300' rowSpan="6"></td>
            <td className='border border-gray-300'>Bậc 1: {electricNumber>50?50:electricNumber}</td>
            <td className='border border-gray-300'>1678</td>
            <td className='border border-gray-300'>{1678*electricNumber>50?50:electricNumber}</td>
          </tr>
          <tr>
            <td className='border border-gray-300'>Bậc 2: {electricNumber>=100?50:electricNumber-50>0?electricNumber-50:0}</td>
            <td className='border border-gray-300'>1734</td>
            <td className='border border-gray-300'>{formatter.format(1734*(electricNumber>=100?50:electricNumber-50>0?electricNumber-50:0))}</td>
          </tr>
          <tr>
            <td className='border border-gray-300'>Bậc 3: {electricNumber>=200?100:electricNumber-100>0?electricNumber-100:0}</td>
            <td className='border border-gray-300'>2014</td>
            <td className='border border-gray-300'>{formatter.format(2014*(electricNumber>=200?100:electricNumber-100>0?electricNumber-100:0))}</td>
          </tr>
          <tr>
            <td className='border border-gray-300'>Bậc 4: {electricNumber>=300?100:electricNumber-200>0?electricNumber-200:0}</td>
            <td className='border border-gray-300'>2536</td>
            <td className='border border-gray-300'>{formatter.format(2536*(electricNumber>=300?100:electricNumber-200>0?electricNumber-200:0))}</td>
          </tr>
          <tr>
            <td className='border border-gray-300'>Bậc 5: {electricNumber>=400?100:electricNumber-300>0?electricNumber-300:0}</td>
            <td className='border border-gray-300'>2834</td>
            <td className='border border-gray-300'>{formatter.format(2834*(electricNumber>=400?100:electricNumber-300>0?electricNumber-300:0))}</td>
          </tr>
          <tr>
            <td className='border border-gray-300'>Bậc 6: {electricNumber>400?electricNumber-400:0}</td>
            <td className='border border-gray-300'>2927</td>
            <td className='border border-gray-300'>{formatter.format(2834*(electricNumber>400?electricNumber-400:0))}</td>
          </tr>
          <tr>
            <td className='border border-gray-300' colSpan="3">Tổng</td>
            <td className='border border-gray-300 font-medium'>{electricNumber}</td>
            <td className='border border-gray-300'></td>
            <td className='border border-gray-300 font-medium'>{calculateElectricityBill(electricNumber)}</td>
          </tr>
          <tr>
            <td className='border border-gray-300' colSpan="3">Thuế suât GTGT: 10%</td>
            <td className='border border-gray-300' colSpan="2">Thuế GTGT:</td>
            <td className='border border-gray-300'>{formatter.format(calculateElectricityBill(electricNumber)*0.1)}</td>
          </tr>
          <tr>
            <td className='border border-gray-300' colSpan="5">Tổng cộng tiền Thanh toán:</td>
            <td className='border border-gray-300 font-medium'>{formatter.format((calculateElectricityBill(electricNumber)*1+calculateElectricityBill(electricNumber)*0.1))}</td>
          </tr>
        </tbody>
      </table>
      <Space wrap>
        <Button type="primary" 
        className='w-40 h-14 mt-9 absolute right-[10%] bg-blue-500'
        onClick={handelBill}>Thanh toán hóa đơn</Button>
      </Space>
    </div>
  )
}
