import React, {useEffect, useState} from 'react'
import Navigate from "../../components/layout/Navigate";
import Header from "../../components/layout/Header";
import Sider from "antd/es/layout/Sider";
import {Area, ComposedChart, Bar, CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis} from "recharts";
import {Avatar, Button, DatePicker, Empty, Form, Input, List, notification, Radio, Select, Skeleton} from "antd";
import {Space, Typography} from 'antd';
import Search from "antd/es/input/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import requester from "../../infrastructure/requester";
import dayjs from "dayjs";

export default function GeneralManagement() {
    const {Text, Link} = Typography;

    const [listElectricId, setListElectrictId] = useState([])

    const [currentElectricId, setCurrentElectricId] = useState()

    const [stateView, setStateView] = useState(true)

    const [year, setYear] = useState((new Date()).getFullYear())

    const [user, setUser] = useState(null);
    const [listUser, setListUser] = useState([]);

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);

    const [dataElectricNumber, setDataElectricNumber] = useState([]);


    const handleSearch = () => {

    }

    const onChangeYearPicker = (date, dateString) => {
        setYear(dateString)
    };

    const handleLoadUser = () => {
        setLoading(true);
        requester.get("api/v1/user/get_all_user", {}, (response) => {
            setLoading(false);
            setListUser(response.users)
            openNotification()
        })
    }




    const handleLoadData = (id) => {
        const body = {
            electricId: id,
            dateFirst: `1-1-${year}`,
            dateSecond: `12-31-${year}`
        }

        requester.post("api/v1/electric/get_all_ei_data",
            body,
            (response) => {
                if (response.err == 0) {
                    setDataElectricNumber(transformedData(response.data))
                    console.log("===transformedData(response.data)", transformedData(response.data));
                    console.log(response.data)
                } else {
                }
            })
    }

    const transformedData = (jsonData) => {
        const months = [];
        for (let month = 1; month <= 12; month++) {
            const monthlyData = jsonData.filter(data => new Date(data.date).getMonth() + 1 === month);
            const totalKW = monthlyData.reduce((sum, data) => sum + data.electricNumber, 0);
            const totalVND = monthlyData.reduce((sum, data) => sum + data.moneyPay, 0);

            const monthObject = {
                KW: totalKW,
                VND: totalVND,
                name: `Tháng ${month}`
            };

            if (monthlyData.length === 0) {
                monthObject.KW = 0;
                monthObject.VND = 0;
            }

            months.push(monthObject);
        }
        return months
    }

    const handleChangeElectricId = (value) => {
        console.log(`selected ${value}`);
        setCurrentElectricId(value)
    };

    const handleClickUser = (user) => {
        setUser(user)
        requester.post("api/v1/electric/get_electric", {userId: user.id}, (response) => {
            setListElectrictId(response.electricData)
            response.electricData.length == 0 ? setCurrentElectricId(null) : setCurrentElectricId(response.electricData[0].electricId)
        })
    }


    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            return (
                <div className=" bg-white border-0 border-white text-red-700">
                    <p>{`${label} : ${payload[0].value} ${payload[0].dataKey === "KW" ? "KW" : "VNĐ"}`}</p>
                </div>
            );
        }

        return null;
    };

    const handleChangeStateView = (e) => {
        setStateView(e.target.value)
        if(e.target.value){
            handleLoadData("ALL")
        }
        else{
            handleLoadData(currentElectricId)
        }
    }

    useEffect(handleLoadUser, [])
    useEffect(()=>{  if(stateView){
        handleLoadData("ALL")
    }
    else {
        handleLoadData(currentElectricId)
    }},[year])
    useEffect(()=>handleLoadData("ALL"), [])
    useEffect(()=>handleLoadData(currentElectricId), [currentElectricId])

    return (
        <div className="Container grid grid-rows-6 grid-cols-6 grid-flow-col gap-2">
            <Sider className=' row-span-6 rm_max_width'>
                <Navigate location={"general-management"}/>
            </Sider>
            <Header/>
            <div className='row-span-5 col-span-5'>

                <div className="flex m-3">
                    <Radio.Group onChange={handleChangeStateView} defaultValue={true} className="m-auto">
                        <Radio.Button value={true}>Biểu đồ chung</Radio.Button>
                        <Radio.Button value={false}>Biểu đồ cá nhân</Radio.Button>
                    </Radio.Group>
                </div>

                {stateView ? <></> :

                    <div className={'flex items-center flex-col'}>

                        <Search
                            placeholder="Tìm kiếm theo tên,CCCD,SĐT,..."
                            allowClear
                            enterButton="Tìm kiếm"
                            size="large"
                            style={{width: 500}}
                            className={"bg-blue-500"}
                            onSearch={handleSearch}
                            // loading
                        />

                        <div
                            id="scrollableDiv"
                            style={{
                                marginTop: 10,
                                height: 200,
                                width: 600,
                                overflow: 'auto',
                                padding: '0 16px',
                                border: '1px solid rgba(140, 140, 140, 0.35)',
                            }}
                        >
                            <InfiniteScroll
                                dataLength={listUser.length}
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
                                    dataSource={listUser}
                                    renderItem={(item) => (
                                        <List.Item key={item.email} onClick={() => handleClickUser(item)}
                                                   className={"cursor-pointer hover:bg-gray-100"}>
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar src={item.avatar} size="large">
                                                        {`${item.firstName} ${item.lastName}`.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}
                                                    </Avatar>}
                                                title={<p>{`${item.firstName} ${item.lastName}`}</p>}
                                                description={<p>{`${item.email} | ${item.phoneNumber}`}</p>}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </InfiniteScroll>

                        </div>

                        <div style={{width: 600, marginTop: 10}}>
                            {user === null ?
                                <Skeleton
                                    style={{margin: 10}}
                                    avatar
                                    size="large"
                                    paragraph={{
                                        rows: 1,
                                    }}
                                    active
                                />
                                :
                                <Space align="center">
                                    <List style={{width: 400}}
                                          dataSource={[user]}
                                          renderItem={(item) => (
                                              <List.Item key={item.email}
                                                         className={"cursor-pointer hover:bg-gray-100"}>
                                                  <List.Item.Meta
                                                      avatar={
                                                          <Avatar src={item.avatar} size="large">
                                                              {`${item.firstName} ${item.lastName}`.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}
                                                          </Avatar>}
                                                      title={<p>{`${item.firstName} ${item.lastName}`}</p>}
                                                      description={<p>{`${item.email} | ${item.phoneNumber}`}</p>}
                                                  />
                                              </List.Item>
                                          )}
                                    />
                                    <Select
                                        placeholder={"Chọn số công tơ điện"}
                                        style={{width: 200}}
                                        onChange={handleChangeElectricId}
                                        value={currentElectricId}
                                        options={
                                            listElectricId.map(item => {
                                                return {value: item.electricId, label: item.electricId}
                                            })
                                        }
                                    />
                                </Space>
                            }
                        </div>
                    </div>}

                <DatePicker className={"ml-5"} style={{width: 300}} defaultValue={dayjs(new Date())}
                            placeholder={"Chọn năm theo dõi"} onChange={onChangeYearPicker} picker="year"/>
                <Text strong className={"ml-5"}>Biểu đồ năm {year}</Text>
                <div className={"flex justify-around flex-wrap"}>
                    <div>
                        <Text keyboard strong>Biểu đồ tiền điện</Text>
                        <ComposedChart width={600} height={300} data={dataElectricNumber}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip content={CustomTooltip}/>
                            <CartesianGrid stroke="#f5f5f5"/>
                            <Bar dataKey="VND" barSize={20} fill="#413ea0"/>
                            <Line type="monotone" dataKey="VND" stroke="#ff7300" activeDot={{r: 6}}/>
                        </ComposedChart>
                    </div>

                    <div>
                        <Text keyboard strong>Biểu đồ lượng điện tiêu thụ</Text>
                        <ComposedChart width={600} height={300} data={dataElectricNumber}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip content={CustomTooltip}/>
                            <CartesianGrid stroke="#f5f5f5"/>
                            <Bar dataKey="KW" barSize={20} stackId="name" fill="#fff200"/>
                            <Line type="monotone" dataKey="KW" stroke="#ff0000" activeDot={{r: 6}}/>
                        </ComposedChart>
                    </div>
                </div>
            </div>

        </div>

    )
}
