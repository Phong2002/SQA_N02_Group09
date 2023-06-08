import React, {useEffect, useState} from 'react'
import Navigate from "../../components/layout/Navigate";
import Header from "../../components/layout/Header";
import Sider from "antd/es/layout/Sider";
import {
    Button,
    DatePicker,
    Form,
    InputNumber,
    List,
    Modal, notification,
    Popover,
    Skeleton,
    Table
} from "antd";
import { Input } from 'antd';
import {Typography} from 'antd';
import Search from "antd/es/input/Search";
import requester from "../../infrastructure/requester";
import dayjs from "dayjs";
import viVN from 'antd/es/date-picker/locale/vi_VN';

import {calculateElectricityBill} from "../../utils/ElectrictNumber/ElectrictNumberUltis";
import InfiniteScroll from "react-infinite-scroll-component";
import UserService from "../../infrastructure/UserService";

export default function ElectricNumberCustomer() {
    const [formAddElectricNumber] = Form.useForm();

    const [formAddNewElectricNumber] = Form.useForm();

    const [lastElectricNumber, setlastElectricNumber] = useState(null)

    const [listElectricId,setListElectricId]=useState([])

    const {Text, Link} = Typography;

    const [listElectricNumber,setListElectricNumber]=useState([])
    const [displayListElectricNumber,setDisplayListElectricNumber]=useState([])

    const [year, setYear] = useState((new Date()))

    const [month, setMonth] = useState((new Date()))

    const [search, setSearch] = useState('')

    const [currentElectric, setCurrentElectric] = useState({})

    const [data, setData] = useState([]);

    const [displayData, setDisplayData] = useState([]);

    const handleLoadData = () => {
        const body = {
            electricId: "ALL",
            dateFirst: `12-1-${year.getFullYear() - 1}`,
            dateSecond: `12-31-${year.getFullYear()}`
        }

        requester.post("api/v1/electric/get_all_ei_data",
            body,
            (response) => {
                if (response.err == 0) {
                    setData(transformedData(response.data.filter(e=>listElectricId.includes(e.electricId))))
                    setDisplayData(transformedData(response.data.filter(e=>listElectricId.includes(e.electricId))))
                } else {
                }
            })
    }

    const handleLoadElectricId =()=>{
        const body = {
            userId: UserService.getUserId(),
        }

        requester.post("api/v1/electric/get_electric",
            body,
            (response) => {
                if (response.err == 0) {
                        setListElectricId(response.electricData.map(value=>value.electricId))
                    console.log("===response.electricData", response.electricData.map(value=>value.electricId));

                } else {
                }
            })
    }



    function transformedData(data) {
        return data.reduce((result, item) => {
            const foundItem = result.find(i => i.electricId === item.electricId);
            const month = new Date(item.date).getFullYear() === year.getFullYear() ? new Date(item.date).getMonth() + 1 : 0;
            const electricData = {
                electricNumber: item.electricNumber,
                isPaid: item.isPaid === 1,
                month: month,
                moneyPay: item.moneyPay
            };

            if (foundItem) {
                foundItem.electric.push(electricData);
            } else {
                result.push({
                    electricId: item.electricId,
                    electric: [electricData]
                });
            }

            return result;
        }, []);
    }


    const handleSearch = (e) => {
        setDisplayData(data.filter(item => item.electricId.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    const onChangeYearPicker = (date, dateString) => {
        setYear(date.$d)
        formAddElectricNumber.setFieldsValue({"month-picker": dayjs(`${year.getFullYear()}-01-01`)})
        setMonth( new Date(`${year.getFullYear()}-01-01`))
        if(currentElectric.electric){
            setlastElectricNumber(currentElectric.electric.find(e => e.month == 0))
        }
    };


    const returnNumber = (record, month) => {
        return record.electric.find(value => value.month == month).electricNumber
    }

    const displayPopover = (record, month, lastEN) => {
        return <div>
            <Text>Số công tơ điện : {record.electricId}</Text>
            <br/>
            <Text>Tháng : {month}</Text>
            <br/>
            <Text>Số điện : {record.electric.find(value => value.month == month).electricNumber}</Text>
            <br/>
            <Text>Số điện dùng trong tháng:
                {record.electric.find(value => value.month == month - 1)
                    ?
                    record.electric.find(value => value.month == month).electricNumber
                    -
                    record.electric.find(value => value.month == month - 1).electricNumber
                    :
                    record.electric.find(value => value.month == month).electricNumber}
            </Text>
            <br/>
            <Text>Số tiền : {formatVND.format(record.electric.find(value => value.month == month).moneyPay)}</Text>
            <br/>
            {record.electric.find(value => value.month == month).isPaid === true ?
                <Text>Trạng thái : Đã thanh toán</Text> :
                <Text>Trạng thái : Chưa thanh toán</Text>}
        </div>
    }

    const displayElectricNumber = (text, record, month) => {
        if (record.electric.find(value => value.month == month)) {
            if (record.electric.find(value => value.month == month).isPaid === true) {
                return <Popover content={() => displayPopover(record, month)} title="Title">
                    <Text className={"cursor-pointer"} style={{fontSize: 18}} code strong
                          type="success">{record.electric.find(value => value.month == month).electricNumber}</Text>
                </Popover>
            }
            return <Popover content={() => displayPopover(record, month)} title="Title">
                <Text className={"cursor-pointer"} style={{fontSize: 18}} code strong
                      type="danger">{record.electric.find(value => value.month == month).electricNumber}</Text>
            </Popover>
        }
        return <Text style={{fontSize: 14}} disabled code strong>Chưa có dữ liệu</Text>
    }

    let formatVND = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'VND',
    });

    const columns = [
        {
            title: 'Số công tơ điện',
            dataIndex: 'electricId',
            fixed: 'left',
            sorter: (a, b) => a.electricId.toLowerCase() > b.electricId.toLowerCase(),
            width: '168px',
        },
        {
            title: 'Tháng 1',
            sorter: (a, b) => returnNumber(a, 1) > returnNumber(b, 1),
            render: (text, record) => displayElectricNumber(text, record, 1),
        },
        {
            title: 'Tháng 2',
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => displayElectricNumber(text, record, 2),
        },
        {
            title: 'Tháng 3',
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => displayElectricNumber(text, record, 3),
        },
        {
            title: 'Tháng 4',
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => displayElectricNumber(text, record, 4),
        },
        {
            title: 'Tháng 5',
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => displayElectricNumber(text, record, 5),
        },
        {
            title: 'Tháng 6',
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => displayElectricNumber(text, record, 6),
        },
        {
            title: 'Tháng 7',
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => displayElectricNumber(text, record, 7),
        },
        {
            title: 'Tháng 8',
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => displayElectricNumber(text, record, 8),
        },
        {
            title: 'Tháng 9',
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => displayElectricNumber(text, record, 9),
        },
        {
            title: 'Tháng 10',
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => displayElectricNumber(text, record, 10),
        },
        {
            title: 'Tháng 11',
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => displayElectricNumber(text, record, 11),
        },
        {
            title: 'Tháng 12',
            sorter: (a, b) => a.age - b.age,
            render: (text, record) => displayElectricNumber(text, record, 12),
        },
    ];

    useEffect(handleLoadElectricId,[])
    useEffect(handleLoadData, [listElectricId])
    useEffect(handleLoadData, [year])

    return (
        <div className="Container grid grid-rows-6 grid-cols-6 grid-flow-col gap-2">
            <Sider className='row-span-6 rm_max_width'>
                <Navigate location={"electric-number"}/>
            </Sider>
            <Header/>
            <div className='row-span-5 col-span-5'>
                <Search
                    placeholder="Tìm kiếm theo tên,CCCD,SĐT,..."
                    allowClear
                    enterButton="Tìm kiếm"
                    size="10"
                    style={{width: 500,borderRadius:5}}
                    className={"bg-blue-500"}
                    onChange={handleSearch}
                    onSearch={handleSearch}
                    // loading
                />
                <DatePicker className={"ml-5"} style={{width: 300}}
                            defaultValue={dayjs()}
                            placeholder={"Chọn năm theo dõi"}
                            onChange={onChangeYearPicker} picker="year"/>
                <Table style={{width: 1200, height: 400}} columns={columns} scroll={{x: 2200, y: 400}}
                       dataSource={displayData} />
            </div>
        </div>

    )
}
