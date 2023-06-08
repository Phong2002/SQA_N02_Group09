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
import {calculateElectricityFromAmount} from "../../utils/ElectrictNumber/ElectrictNumberUltis";
import UserService from "../../infrastructure/UserService";

export default function General() {
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


    const handleLoadData = (id) => {
        const body = {
            electricId: id,
            dateFirst: `12-1-${year-1}`,
            dateSecond: `12-31-${year}`
        }

        requester.post("api/v1/electric/get_all_ei_data",
            body,
            (response) => {
                if (response.err == 0) {
                    setDataElectricNumber(transformedData(response.data))
                } else {
                }
            })
    }


    const transformedData = (jsonData) => {
        const months = [];
        for (let month = 1; month <= 12; month++) {
            const monthlyData = jsonData.filter(data => new Date(data.date).getMonth() + 1 === month);
            const totalKW = monthlyData.reduce((sum, data) => sum +calculateElectricityFromAmount(data.moneyPay), 0);
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
        setCurrentElectricId(value)
    };

    const handleLoadElectricId = () => {
        requester.post("api/v1/electric/get_electric", {userId: UserService.getUserId()}, (response) => {
            setListElectrictId(response.electricData)
            response.electricData.length == 0 ? setCurrentElectricId(null) : setCurrentElectricId(response.electricData[0].electricId)
        })
    }


    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            return (
                <div className=" bg-white border-0 border-white text-red-700">
                    <p>{`${label} : ${new Intl.NumberFormat().format(payload[0].value)} ${payload[0].dataKey === "KW" ? "KW" : "VNĐ"}`}</p>
                </div>
            );
        }

        return null;
    };

    useEffect(handleLoadElectricId,[])
    useEffect(()=>{
        handleLoadData(currentElectricId)
    },[year])
    useEffect(()=>handleLoadData(currentElectricId), [currentElectricId])
    useEffect(()=>handleLoadData("ALL"), [])


    return (
        <div className="Container grid grid-rows-6 grid-cols-6 grid-flow-col gap-2">
            <Sider className=' row-span-6 rm_max_width'>
                <Navigate location={"general"}/>
            </Sider>
            <Header/>
            <div className='row-span-5 col-span-5'>
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
