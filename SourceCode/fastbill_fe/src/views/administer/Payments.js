import React, { useState } from 'react'
import Navigate from '../../components/layout/Navigate'
import Header from '../../components/layout/Header'
import Bill from '../../components/layout/Bill'
import { Layout, Input, Button } from 'antd'
const { Sider } = Layout

export default function Payments() {
  const [showBill, setShowBill] = useState(true)
  const [customer, setCustomer] = useState('');
  const handelCustomerCode = () => {
    console.log('handelCustomerCode: ' + customer);
  }

  return (
    <div className="Container grid grid-rows-6 grid-cols-6 grid-flow-col gap-2">
      <Sider className='row-span-6 rm_max_width '>
        <Navigate location={"payment"} />
      </Sider>
      <Header />
      <div className='row-span-5 col-span-5 rm_max_height bg-white'>
        <div className='w-full h-44 pt-5 bg-slate-200'>
          <form className='flex flex-row ml-5'>
            <label className='mr-4'>Mã Khách Hàng:</label>
            <Input placeholder="Basic usage" className='w-80' onChange={(e) => setCustomer(e.target.value)} />
            <Button type="submit" className='w-28 text-sm font-medium
            text-slate-500 bg-violet-50
            hover:bg-violet-100 hover:text-violet-700
            active:bg-violet-500 active:text-violet-50'
              onClick={handelCustomerCode}>Submit</Button>
          </form>
        </div>
        {showBill ?
          <Bill /> :
          <div className='mt-[20%] flex justify-center items-center'>
            <h1 className='text-2xl font-medium text-slate-300'>Khách hàng không có hóa đơn (not found)*</h1>
          </div>}
      </div>
    </div>
  )
}
