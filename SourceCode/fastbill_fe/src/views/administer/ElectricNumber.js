import React, {useState} from 'react'
import Navigate from "../../components/layout/Navigate";
import Header from "../../components/layout/Header";
import Sider from "antd/es/layout/Sider";
import {Button, DatePicker, Form, Input, InputNumber, Modal, Table} from "antd";
import {Typography } from 'antd';
import Search from "antd/es/input/Search";

export default function ElectricNumber() {
    const [formAddElectricNumber] = Form.useForm();

    const [lastElectricNumber,setlastElectricNumber]=useState(null)

    const { Text, Link } = Typography;

    const [year,setYear] = useState((new Date()).getFullYear())

    const [search,setSearch] = useState('')

    const [currentElectric,setCurrentElectric]=useState({})

    const [modalelectricNumber,setModalelectricNumber]=useState(false)

    const data1 = [
        {
            key: '1',
            electricId: 'John Brown',
            electric: [
                {electricNumber:12,
                    isPaid:true,
                    month:1}
            ],
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            electricId: 'PKA123',
            electric: [
                {electricNumber:8754,
                    isPaid:true,
                    month:1},
                {electricNumber:453,
                    isPaid:true,
                    month:2},
                {electricNumber:452,
                    isPaid:true,
                    month:3},
                {electricNumber:2456,
                    isPaid:true,
                    month:4},
                {electricNumber:3845,
                    isPaid:true,
                    month:5},
                {electricNumber:348,
                    isPaid:true,
                    month:6},
                {electricNumber:2456,
                    isPaid:true,
                    month:7},
                {electricNumber:7645,
                    isPaid:true,
                    month:8},
                {electricNumber:348,
                    isPaid:true,
                    month:9},
                {electricNumber:45348,
                    isPaid:false,
                    month:10},
                {electricNumber:453,
                    isPaid:false,
                    month:11},
                {electricNumber:453,
                    isPaid:false,
                    month:12},
            ],
            address: 'London No. 1 Lake Park',
        },

    ];

    const [data,setData] = useState(data1)

    const handleSearch=(e)=>{
        setData(data1.filter(item=>item.electricId.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    const onChangeYearPicker=(date, dateString) => {
        setYear(dateString)
    };

    const onChangeMonthPicker=(date, dateString)=>{

        const currentMonth = dateString.split('-')[0]
        setlastElectricNumber(currentElectric.electric.find(e=>e.month==currentMonth-1))

    }

    const handleAddElectricNumber=(e)=>{

    }

    const displayElectricNumber= (text,record,index) => {
        if(record.electric.length>=index){
            if(record.electric[index-1].isPaid===true){
                return <Text className={"cursor-pointer"} style={{fontSize:18}} code strong type="success">{record.electric[index-1].electricNumber}</Text>
            }
            return  <Text className={"cursor-pointer"} style={{fontSize:18}} code strong type="danger">{record.electric[index-1].electricNumber}</Text>
        }
        return <Text style={{fontSize:14}} disabled code strong >Chưa có dữ liệu</Text>
    }

    const columns = [
        {
            title: 'Số công tơ điện',
            dataIndex: 'electricId',
            fixed: 'left',
            sorter: (a, b) => a.electricId.toLowerCase()>b.electricId.toLowerCase(),
            width: '168px',
        },
        {

            title: 'Tháng 1',
            // sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,1),
        },
        {
            title: 'Tháng 2',
            sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,2),
        },
        {
            title: 'Tháng 3',
            sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,3),
        },
        {
            title: 'Tháng 4',
            sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,4),
        },
        {
            title: 'Tháng 5',
            sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,5),
        },
        {
            title: 'Tháng 6',
            sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,6),
        },
        {
            title: 'Tháng 7',
            sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,7),
        },
        {
            title: 'Tháng 8',
            sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,8),
        },
        {
            title: 'Tháng 9',
            sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,9),
        },
        {
            title: 'Tháng 10',
            sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,10),
        },
        {
            title: 'Tháng 11',
            sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,11),
        },
        {
            title: 'Tháng 12',
            sorter: (a, b) => a.age - b.age,
            render:(text, record)=>displayElectricNumber(text, record,12),
        },
        {
            title: 'Chức năng',
            dataIndex: 'operation',
            fixed: 'right',
            width: '168px',
            render: (_, record) =>
                (
                    <Button title="Cập nhật số điện"
                            onClick={()=>{setModalelectricNumber(true)
                                setCurrentElectric(record)
                    }}>
                        Cập nhật số điện
                    </Button>
                )
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
    };

    return (
        <div className="Container grid grid-rows-6 grid-cols-6 grid-flow-col gap-2">
            <Sider className='row-span-6 rm_max_width'>
                <Navigate  location={"electric-number"}/>
            </Sider>
            <Header />
            <div className='row-span-5 col-span-5'>
                <Search
                    placeholder="Tìm kiếm theo tên,CCCD,SĐT,..."
                    allowClear
                    enterButton="Tìm kiếm"
                    size="large"
                    style={{ width: 500 }}
                    className={"bg-blue-500"}
                    onChange={handleSearch}
                    onSearch={handleSearch}
                    // loading
                />
                <DatePicker className={"ml-5"} style={{width:300}}  placeholder={"Chọn năm theo dõi"}  onChange={onChangeYearPicker} picker="year" />
                <Table style={{width:1200,height:400}} columns={columns} scroll={{ x: 2200,y:400 }} dataSource={data} onChange={onChange} />
            </div>
            <Modal title={`Cập nhật số điện công tơ : ${currentElectric.electricId}`}  open={modalelectricNumber}
                   footer={[
                       <Button key="back"
                               onClick={()=>{setModalelectricNumber(false)
                                formAddElectricNumber.resetFields()
                               }}>
                           Thoát
                       </Button>
                   ]}
                   onCancel={()=>setModalelectricNumber(false)}>
                <Form
                    form={formAddElectricNumber}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={handleAddElectricNumber}
                    autoComplete="off"
                >
                    <Form.Item name="month-picker" label="Tháng"
                               rules={[{ type: 'object',required: true,message: 'Chọn tháng nhập số điện!', }]}
                    >
                        <DatePicker onChange={onChangeMonthPicker} format={"MM-YYYY"} style={{width:300}} picker="month" />
                    </Form.Item>
                    <Form.Item label="Số điện tháng trước"
                    >
                        {lastElectricNumber?
                            <Text type="secondary" style={{fontSize:16}} strong >{lastElectricNumber?.electricNumber}</Text>
                            :
                            <Text style={{fontSize:16}} disabled code strong >Chưa có dữ liệu</Text>
                            }

                    </Form.Item>

                    <Form.Item
                        label="Số điện"
                        name="electricNumber"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện hiện tại!' },{
                            required: async (_, endDatetime) => {
                                console.log("===electricNumber", electricNumber);
                                console.log("===lastElectricNumber.electricNumber", lastElectricNumber.electricNumber);
                                var electricNumber =
                                    formAddElectricNumber.getFieldValue("electricNumber");
                                if (electricNumber!=null)


                                    if (electricNumber <= lastElectricNumber.electricNumber) {

                                        return true;
                                    }
                            },
                            message:'Số điện hiện tại phải lớn hơn số điện tháng trước!',
                        },]}
                    >
                        <InputNumber  style={{width:300}} />
                    </Form.Item>
                    <Form.Item label="Số tiền (Tạm tính) "
                    >
                        <Text type="secondary" strong >456789</Text>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
                        <Button type="primary" className="login-form-button w-full h-10 bg-blue-400"  htmlType="submit">
                            Cập nhật số điện
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}
