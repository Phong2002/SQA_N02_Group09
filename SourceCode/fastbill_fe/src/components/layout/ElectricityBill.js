import React, {useState} from 'react'
import {calculateElectricityBill} from "../../utils/ElectrictNumber/ElectrictNumberUltis";
import {Button, Checkbox, Form, Input, InputNumber} from 'antd';
export default function ElectricityBill() {
    const [electricNumber,setElectricNumber]=useState(0)
    const [formElectricNumber] = Form.useForm();
    const [currentElectricNumber,setCurrentElectricNumber]=useState(0)
    const [lastElectricNumber,setLastElectricNumber]=useState(0)

    const calElectric = (current,last)=>{
        setElectricNumber(current-last)
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })

    const handleOnChangeCurrentElectricNumber=(e)=>{
        setCurrentElectricNumber(e)
        if(e>=lastElectricNumber){
            calElectric(e,lastElectricNumber)
        }
    }

    const handleOnChangeLastElectricNumber=(e)=>{
        setLastElectricNumber(e)
        if(currentElectricNumber>=e){
            calElectric(currentElectricNumber,e)
        }
    }
    return (
        <div className='w-[68%] p-5 m-5 bg-slate-100 shadow-lg shadow-indigo-500/40'>
            <Form
                name="basic"
                form={formElectricNumber}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Chỉ số điện cũ"
                    name="lastElectricNumber"
                    rules={[({getFieldValue}) => ({
                        validator(_, value) {
                            if (value<0) {
                                return Promise.reject('Số điện cần lớn hơn 0 ');
                            }
                            return Promise.resolve();
                        },
                    })]}
                >
                    <InputNumber style={{ width: 300 }} defaultValue={0} onChange={e=>handleOnChangeLastElectricNumber(e)} />
                </Form.Item>

                <Form.Item
                    label="Chỉ số điện mới"
                    name="currentElectricNumber"
                    rules={[({getFieldValue}) => ({
                        validator(_, value) {
                            if (value<0) {
                                return Promise.reject('Số điện cần lớn hơn 0 ');
                            }
                            return Promise.resolve();
                        },
                    }),
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (value<formElectricNumber.getFieldValue('lastElectricNumber')) {
                                    return Promise.reject('Số điện hiện tại cần lớn hơn hoặc bằng số điện cũ');
                                }
                                return Promise.resolve();
                            },
                        })]}
                >
                    <InputNumber style={{ width: 300 }} defaultValue={0} onChange={e=>handleOnChangeCurrentElectricNumber(e)}  />
                </Form.Item >
            </Form>
            <table className='w-[95%] m-auto mt-4'>
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
                    <td className='border border-gray-300 text-center'>{currentElectricNumber}</td>
                    <td className='border border-gray-300 text-center'>{lastElectricNumber}</td>
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
        </div>
    )
}
