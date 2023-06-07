import React from 'react'

export default function PriceList() {
    return (
        <div className='w-[30%] p-5 m-5 bg-slate-100 shadow-lg shadow-indigo-500/40'>
            {/* Price List by table */}
            <h1 className='w-full mb-8 text-4xl text-center font-medium'>Biểu giá điện năng</h1>
            <table className='w-full'>
                <thead>
                    <tr >
                        <th className='border-2 px-4 py-2'>
                            Giá bán lẻ điện sinh hoạt</th>
                        <th className='border-2 px-4 py-2'>Giá bán</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td className='border px-4 py-2'>Gói 1:Cho kWh từ 0 đến 50</td>
                        <td className='border px-4 py-2'>1678</td>
                    </tr>
                    <tr >
                        <td className='border px-4 py-2'>Gói 2:Cho kWh từ 51 đến 100 </td>
                        <td className='border px-4 py-2'>1734</td>
                    </tr>
                    <tr >
                        <td className='border px-4 py-2'>Gói 3:Cho kWh từ 101 đến 200</td>
                        <td className='border px-4 py-2'>2014</td>
                    </tr>
                    <tr >
                        <td className='border px-4 py-2'>Bậc 4: Cho kWh từ 201 - 300</td>
                        <td className='border px-4 py-2'>2536</td>
                    </tr>
                    <tr >
                        <td className='border px-4 py-2'>Bậc 5: Cho kWh từ 301 - 400</td>
                        <td className='border px-4 py-2'>2834</td>
                    </tr>
                    <tr >
                        <td className='border px-4 py-2'>Bậc 6: Cho kWh từ 401 trở lên</td>
                        <td className='border px-4 py-2'>2.927</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
