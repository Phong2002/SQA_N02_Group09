import React, {useEffect, useState} from 'react'
import Navigate from '../../components/layout/Navigate'
import Header from '../../components/layout/Header'
import Bill from '../../components/layout/Bill'
import {Layout, Input, Button, Skeleton, List, notification} from 'antd'
import requester from "../../infrastructure/requester";
import InfiniteScroll from "react-infinite-scroll-component";
import {current} from "@reduxjs/toolkit";
const { Sider } = Layout

export default function Payments() {
  const [showBill, setShowBill] = useState(true)
  const [customer, setCustomer] = useState('');
  const [currentBill,setCurrentBill] = useState();
  const [currentUser,setCurrentUser]=useState();
  const [data,setData] = useState([]);
  const [displayData,setDisplayData] = useState([]);

  const [bill,setBill] = useState({});
  const handelCustomerCode = () => {
    console.log('handelCustomerCode: ' + customer);
  }

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })

    const handleSearch = (e)=>{
        console.log("=========data",data)
        setDisplayData(
            data.filter(item =>
                item.electricId.toLowerCase().includes(e.target.value.toLowerCase())))
        console.log("===setDisplayData", displayData);
    }

    const handleClickBill=(bill)=>{
      setCurrentBill(bill)
        getInforUserById(bill.electricId,bill)
    }

    const getInforUserById = (electricId,electric)=>{
        requester.post("api/v1/electric/get_user_by_electric_id",{"electricId":electricId},(response)=>{
            setCurrentUser(response.user)
            setBill({
                "electric":electric,
                "user":response.user
            })
        })
    }

    const handleLoadData = () => {
        const body = {
            electricId: "ALL",
            dateFirst: `12-1-1970`,
            dateSecond: `12-31-2050`
        }

        requester.post("api/v1/electric/get_all_ei_data",
            body,
            (response) => {
                if (response.err == 0) {
                    console.log(response)
                    setData((response.data.filter(eletric=>!eletric.isPaid)))
                    setDisplayData((response.data.filter(eletric=>!eletric.isPaid)))
                } else {
                }
            })
    }

    const openNotification = () => {
        notification.success({
            message: 'Thành công',
            description:
                'Thanh toán thành công',
        });
    };

    const handlePay=()=>{
        handleLoadData()
        openNotification()
        setCurrentBill(null)
        setCurrentBill(null)
    }

  useEffect(handleLoadData,[])

  return (
    <div className="Container grid grid-rows-6 grid-cols-6 grid-flow-col gap-2">
      <Sider className='row-span-6 rm_max_width '>
        <Navigate location={"payment"} />
      </Sider>
      <Header />
      <div className='row-span-5 col-span-5 rm_max_height bg-white'>
          <Input placeholder={"Tìm kiếm theo số công tơ, . . ."} onChange={(e)=>handleSearch(e)} ></Input>

          <div
              id="scrollableDiv"
              style={{
                  marginTop: 10,
                  height: 350,
                  width: '100%',
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
              }}>
              <InfiniteScroll
                  dataLength={displayData.length}
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
                      dataSource={displayData}
                      renderItem={(item) => (
                          <List.Item key={item.email}
                                     className={"cursor-pointer hover:bg-gray-200"}
                                     onClick={()=>handleClickBill(item)}
                                     >
                              <List.Item.Meta
                                  title={<p>{`Hóa đơn số ${item.id}`}</p>}
                                  description={
                                      <>
                                          <p>Số công tơ : {item.electricId}</p>
                                          <p>Thời gian : {item.date.split('-')[1]} - {item.date.split('-')[0]}</p>
                                          <p>Số tiền : {formatter.format(item.moneyPay)} </p>
                                      </>
                                  }
                              />
                          </List.Item>
                      )}
                  />
              </InfiniteScroll>
          </div>
        {currentBill&&currentUser ?
          <Bill electric={bill.electric} user={bill.user} handlePay={handlePay}/> :
          <div className='mt-[20%] flex justify-center items-center'>
            <h1 className='text-2xl font-medium text-slate-300'>Chưa chọn hóa đơn</h1>
          </div>}
      </div>
    </div>
  )
}
