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
import viVN from 'antd/locale/vi_VN';
import {calculateElectricityBill} from "../../utils/ElectrictNumber/ElectrictNumberUltis";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ElectricNumber() {
    const [formAddElectricNumber] = Form.useForm();

    const [formAddNewElectricNumber] = Form.useForm();

    const [lastElectricNumber, setlastElectricNumber] = useState(null)

    const {Text, Link} = Typography;

    const [listElectricNumber,setListElectricNumber]=useState([])
    const [displayListElectricNumber,setDisplayListElectricNumber]=useState([])

    const [year, setYear] = useState((new Date()))

    const [month, setMonth] = useState((new Date()))

    const [search, setSearch] = useState('')

    const [currentElectric, setCurrentElectric] = useState({})

    const [modalelectricNumber, setModalelectricNumber] = useState(false)

    const [modalAddNewElectricNumber, setModalAddNewElectricNumber] = useState(false)

    const [electricIdSelected,setElectricIdSelected]=useState()

    const [electrictNumber, setElectrictNumber] = useState(0)

    const [newElectricNumber, setNewElectricNumber] = useState(0)

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
                    console.log(response)
                    setData(transformedData(response.data))
                    setDisplayData(transformedData(response.data))
                    console.log(transformedData(response.data))
                } else {
                }
            })
    }

    const openNotification = () => {
        notification.success({
            message: 'Thành công',
            description:
                'Cập nhật số điện thành công',
        });
    };

    const handleCloseModalAddElectric = () => {
        formAddElectricNumber.resetFields()
        setModalelectricNumber(false)
    }

    const handleCloseModalAddNewElectric = () => {
        formAddNewElectricNumber.resetFields()
        setModalAddNewElectricNumber(false)
    }

    const handleLoadAllElectricId = () => {
        const body = {
            userId: "ALL"
        }

        requester.post("api/v1/electric/get_electric",
            body,
            (response) => {
                if (response.err == 0) {
                    setListElectricNumber(response.electricData)
                    setDisplayListElectricNumber(response.electricData)
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
    const handleSearchModalAddNewElectricNumber = (e) => {
        setDisplayListElectricNumber(
            listElectricNumber.filter(item =>
                item.electricId.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    const onChangeYearPicker = (date, dateString) => {
        setYear(date.$d)
        formAddElectricNumber.setFieldsValue({"month-picker": dayjs(date.$d)}
        )
    };

    const onChangeMonthPicker = (date, dateString) => {
        setMonth(date.$d)
        const currentMonth = dateString.split('-')[0]
        setlastElectricNumber(currentElectric.electric.find(e => e.month == currentMonth - 1))
    }

    const handleAddElectricNumber = (e) => {
        const body = {
            electricId: currentElectric.electricId,
            electricNumber: e.electricNumber,
            date: `${year.getFullYear()}-${month.getMonth() + 1}-01`,
            isPaid: "false"
        }

        requester.post("api/v1/electric/add_electric_number",
            body,
            (response) => {
                if (response.err == 0) {
                    handleLoadData()
                    formAddElectricNumber.resetFields()
                    setModalelectricNumber(false)
                    openNotification()
                } else {
                }
            })
    }

    const handleAddNewElectricNumber = (e) => {

        const body = {
            electricId: e.electricId,
            electricNumber: e.electricNumber,
            date: `${e.time.year()}-${e.time.month()+ 1}-01`,
            isPaid: "false"
        }

        requester.post("api/v1/electric/add_electric_number",
            body,
            (response) => {
                if (response.err == 0) {
                    handleLoadData()
                    formAddNewElectricNumber.resetFields()
                    setModalAddNewElectricNumber(false)
                    openNotification()
                } else {
                }
            })
    }


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
                <Text>Trạng thái : Đã trả</Text> :
                <Text>Trạng thái : Chưa trả</Text>}
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
        {
            title: 'Chức năng',
            dataIndex: 'operation',
            fixed: 'right',
            width: '168px',
            render: (_, record) =>
                (
                    <Button title="Cập nhật số điện"
                            onClick={() => {
                                setModalelectricNumber(true)
                                setCurrentElectric(record)
                            }}>
                        Cập nhật số điện
                    </Button>
                )
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
    };

    useEffect(handleLoadData, [])
    useEffect(handleLoadAllElectricId, [])
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
                <Button className="ml-5 " onClick={()=>setModalAddNewElectricNumber(true)}>Cập nhật số điện mới</Button>
                <Table style={{width: 1200, height: 400}} columns={columns} scroll={{x: 2200, y: 400}}
                       dataSource={displayData} onChange={onChange}/>
            </div>
            <Modal title={`Cập nhật số điện công tơ : ${currentElectric.electricId}`} open={modalelectricNumber}
                   footer={[
                       <Button key="back"
                               onClick={handleCloseModalAddElectric}>
                           Thoát
                       </Button>
                   ]}
                   onCancel={handleCloseModalAddElectric}>
                <Form
                    form={formAddElectricNumber}
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    onFinish={handleAddElectricNumber}
                    autoComplete="off"
                >
                    <Form.Item name="month-picker" label="Tháng"
                               rules={[{type: 'object', required: true, message: 'Chọn tháng nhập số điện!',}]}
                    >
                        <DatePicker onChange={onChangeMonthPicker}
                                    format={"MM-YYYY"}
                                    style={{width: 300}}
                                    locale={viVN}
                                    picker="month"/>
                    </Form.Item>
                    <Form.Item label="Số điện tháng trước"
                    >
                        {lastElectricNumber ?
                            <Text type="secondary" style={{fontSize: 16}}
                                  strong>{lastElectricNumber?.electricNumber}</Text>
                            :
                            <Text style={{fontSize: 16}} disabled code strong>Chưa có dữ liệu</Text>
                        }

                    </Form.Item>

                    <Form.Item
                        label="Số điện"
                        name="electricNumber"
                        rules={[{required: true, message: 'Vui lòng nhập số điện hiện tại!'}, ({getFieldValue}) => ({
                            validator(_, value) {
                                if (value && value < lastElectricNumber?.electricNumber) {
                                    return Promise.reject(new Error(`Số điện cần lớn hơn hoặc bằng số điện tháng trước (${lastElectricNumber?.electricNumber})`));
                                }
                                return Promise.resolve();
                            },
                        }),]}
                    >
                        <InputNumber onChange={(value) => setElectrictNumber(value)} style={{width: 300}}/>
                    </Form.Item>
                    <Form.Item label="Số điện tiêu thụ"
                    >
                        <Text type="secondary"
                              strong>{electrictNumber - lastElectricNumber?.electricNumber > 0 ? electrictNumber - lastElectricNumber?.electricNumber : "Chưa xác định"}</Text>
                    </Form.Item>
                    <Form.Item label="Số tiền (Tạm tính) "
                    >
                        <Text type="secondary"
                              strong>{formatVND.format(calculateElectricityBill(electrictNumber - lastElectricNumber?.electricNumber))}</Text>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 12}}>
                        <Button type="primary" className="login-form-button w-full h-10 bg-blue-400" htmlType="submit">
                            Cập nhật số điện
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

{/*==============================================================================================*/}

            <Modal title={'Cập nhật số điện mới'} open={modalAddNewElectricNumber} width={600} centered
                   footer={[
                       <Button key="back"
                               onClick={handleCloseModalAddNewElectric}>
                           Thoát
                       </Button>
                   ]}
                   onCancel={handleCloseModalAddNewElectric}>
                <Form
                    form={formAddNewElectricNumber}
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 1000}}
                    onFinish={handleAddNewElectricNumber}
                    autoComplete="off"
                >
                    <Input placeholder="Tìm kiếm..."  onChange={e=>handleSearchModalAddNewElectricNumber(e)}  />
                    <Form.Item className='items-center'>
                    <div
                        id="scrollableDiv"
                        style={{
                            marginTop: 10,
                            height: 200,
                            width: 550,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}>
                    <InfiniteScroll
                        dataLength={displayListElectricNumber.length}
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
                            dataSource={displayListElectricNumber}
                            renderItem={(item) => (
                                <List.Item key={item.email}
                                           className={"cursor-pointer hover:bg-gray-200"}
                                           onClick={()=>{
                                    formAddNewElectricNumber.setFieldsValue({['electricId']:item.electricId})}}>

                                    <List.Item.Meta
                                        title={<p>{`Công tơ số ${item.electricId}`}</p>}
                                        description={
                                        <>
                                            <p>Mã người người dùng :{item.userId}</p>
                                            <p>Địa chỉ :{item.address}</p>
                                        </>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                    </div>
                    </Form.Item>

                    <Form.Item
                        label="Số công tơ"
                        name="electricId"
                        rules={[{required: true, message: 'Vui lòng chọn số công tơ'}]}
                    >
                        <Input type="secondary" disabled style={{width: 300}}
                              />
                    </Form.Item>
                    <Form.Item name="time" label="Tháng"
                               rules={[{type: 'object', required: true, message: 'Chọn tháng nhập số điện!',}]}
                    >
                        <DatePicker
                                    format={"MM-YYYY"}
                                    style={{width: 300}}
                                    locale={viVN}
                                    picker="month"/>
                    </Form.Item>
                    <Form.Item
                        label="Số điện"
                        name="electricNumber"
                        rules={[{required: true, message: 'Vui lòng nhập số điện hiện tại!'}, ({getFieldValue}) => ({
                            validator(_, value) {
                                if (value<0) {
                                    return Promise.reject('Số điện cần lớn hơn ');
                                }
                                return Promise.resolve();
                            },
                        }),]}
                    >
                        <InputNumber onChange={value=>setNewElectricNumber(value)} style={{width: 300}}/>
                    </Form.Item>
                    <Form.Item label="Số tiền (Tạm tính) "
                    >
                        <Text type="secondary"
                              strong>{formatVND.format(calculateElectricityBill(newElectricNumber))}</Text>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 12}}>
                        <Button type="primary" className="login-form-button w-full h-10 bg-blue-400" htmlType="submit">
                            Cập nhật số điện
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}
