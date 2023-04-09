import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Space } from 'antd';
import '../../assets/styles/dashboard.css'

export default function Bill() {
  const navigate = useNavigate();
  const handelBill = () => {
    navigate('/bank')
  }

  return (
    <div className=''>
      <div className='w-[70%] h-40 mt-4 m-auto grid grid-cols-6 grid-rows-4 gap-0'>
        <h1 className='col-span-6 text-base font-semibold'>Công ty điện lực Phenikaa</h1>
        <h1 className='col-span-1'>Dịa chỉ:</h1>
        <p className='col-span-5'>P. Nguyễn Trác, Yên Nghĩa, Hà Đông, Hà Nội</p>

        <h1 className='col-span-1'>Điện thoại:</h1>
        <p className='col-span-5'>0819053888</p>

        <h1 className='col-span-1 text-base font-semibold'>Khách Hàng:</h1>
        <p className='col-span-1'>Phạm Văn Hòa</p>

        <h1 className='col-span-1'>Địa chỉ:</h1>
        <p className='col-span-2'>Nhà gần svđ thanh trì</p>
        <h1>Số công tơ: 1713132868</h1>
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
            <td className='border border-gray-300 text-center'>751</td>
            <td className='border border-gray-300'></td>
            <td className='border border-gray-300'></td>
          </tr>
          <tr>
            <td className='border border-gray-300' rowspan="4"></td>
            <td className='border-y border-gray-300' rowspan="4"></td>
            <td className='border border-gray-300' rowspan="4"></td>
            <td className='border border-gray-300'>Bậc 1: 50</td>
            <td className='border border-gray-300'>2.000</td>
            <td className='border border-gray-300'>300.000</td>
          </tr>
          <tr>

            <td className='border border-gray-300'>Bậc 2: 50</td>
            <td className='border border-gray-300'>2.340</td>
            <td className='border border-gray-300'>300.000</td>
          </tr>
          <tr>
            <td className='border border-gray-300'>Bậc 3: 100</td>
            <td className='border border-gray-300'>2.615</td>
            <td className='border border-gray-300'>300.000</td>
          </tr>
          <tr>
            <td className='border border-gray-300'>Bậc 4: 100</td>
            <td className='border border-gray-300'>2.901</td>
            <td className='border border-gray-300'>300.000</td>
          </tr>
          <tr>
            <td className='border border-gray-300' colspan="3">Tổng</td>
            <td className='border border-gray-300 font-medium'>751</td>
            <td className='border border-gray-300'></td>
            <td className='border border-gray-300 font-medium'>1.786.801</td>
          </tr>
          <tr>
            <td className='border border-gray-300' colspan="3">Thuế suât GTGT: 10%</td>
            <td className='border border-gray-300' colspan="2">Thuế GTGT:</td>
            <td className='border border-gray-300'>178.680</td>
          </tr>
          <tr>
            <td className='border border-gray-300' colspan="5">Tổng cộng tiền Thanh toán:</td>
            <td className='border border-gray-300 font-medium'>1.995.481</td>
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
