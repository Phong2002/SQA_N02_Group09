import React from 'react'
import '../../assets/styles/dashboard.css'
import Header from '../../components/layout/Header'
import Navigate from '../../components/layout/Navigate'
// import RenderLineChart from '../../components/chart'
import PriceList from '../../components/layout/PriceList'
import TimeLine from '../../components/chart/TimeLine'
import { AliwangwangOutlined, DotChartOutlined, BulbOutlined, UngroupOutlined } from '@ant-design/icons'


import { Layout } from 'antd'
const { Sider } = Layout

export default function Home() {
  return (
    <div className="Container grid grid-rows-6 grid-cols-6 grid-flow-col gap-2">
      <Sider className=' row-span-6 rm_max_width'>
        <Navigate location={"home"}/>
      </Sider>
      <Header />
      <div className='row-span-5 col-span-5'>
        <div className='w-[96%] h-[30%] ml-5 mb-10 pt-4 flex justify-around bg-white shadow-lg shadow-gray-200'>
          <div className='w-64 h-24  bg-slate-200 rounded-md flex'>
            <AliwangwangOutlined style={{ fontSize: '55px', color: '#6666FF' }} className=' m-5 bg-gray-300 rounded-full' />
            <div className='flex flex-col items-end mt-3'>
              <p className='font-semibold'>Dịch vụ thông tin</p>
              <h1 className='text-4xl'>tin tức</h1>
            </div>
          </div>

          <div className='w-64 h-24  bg-slate-200 rounded-md flex'>
            <DotChartOutlined style={{ fontSize: '55px', color: '#6666FF' }} className='m-5 bg-gray-300 rounded-full' />
            <div className='flex flex-col items-end mt-3 ml-3'>
              <p className='font-semibold'>Đăng ký dịch vụ</p>
              <h1 className='text-4xl'>online</h1>
            </div>
          </div>

          <div className='w-72 h-24  bg-slate-200 rounded-md flex'>
            <UngroupOutlined style={{ fontSize: '55px', color: '#6666FF' }} className='m-5 bg-gray-300 rounded-full' />
            <div className='flex flex-col items-end mt-3 ml-2'>
              <p className='font-semibold'>Cơ sở hạ tầng</p>
              <h1 className='text-4xl'>khu vực</h1>
            </div>
          </div>

          <div className='w-64 h-24  bg-slate-200 rounded-md flex'>
            <BulbOutlined style={{ fontSize: '55px', color: '#6666FF' }} className='m-5 bg-gray-300 rounded-full' />
            <div className='flex flex-col items-end mt-3 '>
              <p className='font-semibold'>Tra cứu dịch vụ</p>
              <h1 className='text-4xl'>hỗ trợ</h1>
            </div>
          </div>
        </div>
        <div className='w-full flex'>
          {/* <RenderLineChart /> */}
          <PriceList />
          <TimeLine />
        </div>
      </div>
    </div>
  )
}

