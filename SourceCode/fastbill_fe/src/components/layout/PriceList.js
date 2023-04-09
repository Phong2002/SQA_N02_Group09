import React from 'react'

export default function PriceList() {
    return (
        <div className='w-[58%] p-5 m-5 bg-slate-100 shadow-lg shadow-indigo-500/40'>
            {/* Price List by table */}
            <h1 className='w-full mb-8 text-4xl text-center font-medium'>Biểu giá điện năng</h1>
            <table className='w-full'>
                <thead>
                    <tr className='text-center'>
                        <th className='border-2 px-4 py-2'>Tên gói</th>
                        <th className='border-2 px-4 py-2'>Nhóm đối tượng</th>
                        <th className='border-2 px-4 py-2'>Giá bán</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-center'>
                        <td className='border px-4 py-2'>Gói 1</td>
                        <td className='border px-4 py-2'>Cho kWh từ 0 đến 50</td>
                        <td className='border px-4 py-2'>1.676</td>
                    </tr>
                    <tr className='text-center'>
                        <td className='border px-4 py-2'>Gói 2</td>
                        <td className='border px-4 py-2'>Cho kWh từ 51 đến 100 </td>
                        <td className='border px-4 py-2'>1.734</td>
                    </tr>
                    <tr className='text-center'>
                        <td className='border px-4 py-2'>Gói 3</td>
                        <td className='border px-4 py-2'>Cho kWh từ 101 đến 200</td>
                        <td className='border px-4 py-2'>2.014</td>
                    </tr>
                    <tr className='text-center'>
                        <td className='border px-4 py-2'>Gói 4</td>
                        <td className='border px-4 py-2'>Cho kWh từ 201 đến 300</td>
                        <td className='border px-4 py-2'>2.536</td>
                    </tr>
                    <tr className='text-center'>
                        <td className='border px-4 py-2'>Gói 5</td>
                        <td className='border px-4 py-2'>Cho kWh từ 301 trở lên</td>
                        <td className='border px-4 py-2'>2.927</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
