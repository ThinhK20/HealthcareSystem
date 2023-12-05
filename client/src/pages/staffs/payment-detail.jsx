import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { formatDate } from '../../helpers/dataHelper';


const StaffsPaymentDetail = () => {
    const [data, setData] = useState();
    const [reset,setReset] = useState();
    const handleReset = ()=>{
        setReset(!reset)
    }
    const { id } = useParams();
    useEffect(() => {
        axios.get(`https://localhost:44384/api/users/customerRequests/${id}`).then((result) => {
            setData(result.data)
            console.log(result.data)
        }
        )
    }, [])
    const handleAccept = () => {
        axios.post(`https://localhost:44384/api/users/customerRequests/${id}`).then(()=>handleReset)
    }
    const handRefused = () => {
        axios.post(`https://localhost:44384/api/users/RefusedRequest/${id}`).then(()=>handleReset)
    }
    const handComplete = () => {
        axios.post(`https://localhost:44384/api/users/CompleteRequest/${id}`).then(()=>handleReset)
    }
    return (
        <>
            <div className="bg-gray-50 dr:bg-slate-900 w-full">
                <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
                    <div className="sm:w-11/12 lg:w-3/4 mx-auto">
                        <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dr:bg-gray-800">
                            <div className="flex justify-between">
                                <div>
                                    <svg className="w-10 h-10" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 26V13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25H12" className="stroke-blue-600 dr:strokewhite" stroke="currentColor" strokeWidth="2" />
                                        <path d="M5 26V13.16C5 8.65336 8.58172 5 13 5C17.4183 5 21 8.65336 21 13.16C21 17.6666 17.4183 21.32 13 21.32H12" className="stroke-blue-600 dr:strokewhite" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="13" cy="13.0214" r="5" fill="currentColor" className="fill-blue-600 dr:fill-white" />
                                    </svg>
                                    <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dr:text-white">Preline Inc.</h1>
                                </div>
                                <div className="text-end">
                                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dr:text-gray-200">Customer Request #{data?.requestID}</h2>
                                    <span className="mt-1 block text-gray-500">Status: <span className='font-[600] text-[#274f66]'>{data?.status}</span></span>
                                    <div className="mt-4 not-italic text-gray-800 dr:text-gray-200">


                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid sm:grid-cols-2 gap-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dr:text-gray-200">Username request: {data?.account.username}</h3>
                                    <span className="text-lg font-semibold text-gray-800 dr:text-gray-200"></span>
                                    <div className="mt-2 not-italic text-gray-500">
                                        Confirmation staff : #{data?.staff.accountId}
                                    </div>
                                </div>
                                <div className="sm:text-end space-y-2">
                                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                                        <dl className="grid sm:grid-cols-5 gap-x-3">
                                            <dt className="col-span-3 font-semibold text-gray-800 dr:text-gray-200">Request Date :</dt>
                                            <dd className="col-span-2 text-gray-500">{formatDate(data?.dateRequest)}</dd>
                                        </dl>
                                        <dl className="grid sm:grid-cols-5 gap-x-3">
                                            <dt className="col-span-3 font-semibold text-gray-800 dr:text-gray-200">Accept Date :</dt>
                                            <dd className="col-span-2 text-gray-500">{formatDate(data?.dateAccept)}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            {data?.paymentId && (
                                <>
                                    <div className="mt-6">
                                        <div className="border border-gray-200 p-4 rounded-lg space-y-4 dr:border-gray-700">
                                            <div className="hidden sm:grid sm:grid-cols-5">
                                                <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Item</div>
                                                <div className="text-start text-xs font-medium text-gray-500 uppercase">Qty</div>
                                                <div className="text-start text-xs font-medium text-gray-500 uppercase">Rate</div>
                                                <div className="text-end text-xs font-medium text-gray-500 uppercase">Amount</div>
                                            </div>
                                            <div className="hidden sm:block border-b border-gray-200 dr:border-gray-700"></div>
                                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">

                                            </div>

                                        </div>
                                    </div>
                                </>
                            )}


                            <div className="mt-8 flex sm:justify-end">
                                <div className="w-full max-w-2xl sm:text-end space-y-2">
                                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">

                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 sm:mt-12">
                                <h4 className="text-lg font-semibold text-gray-800 dr:text-gray-200">Thank you!</h4>
                                <p className="text-gray-500">If you have any questions concerning this invoice, use the following contact information:</p>
                                <div className="mt-2">
                                    <p className="block text-sm font-medium text-gray-800 dr:text-gray-200">example@site.com</p>
                                    <p className="block text-sm font-medium text-gray-800 dr:text-gray-200">+1 (062) 109-9222</p>
                                </div>
                            </div>

                            <p className="mt-5 text-sm text-gray-500">© 2022 Preline.</p>
                        </div>

                        <div className="mt-6 flex justify-around gap-x-3">
                            {data?.status === 'Pending Confirmation' && (

                                <button onClick={handleAccept} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dr:focus:outline-none dr:focus:ring-1 dr:focus:ring-gray-600"  >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    Accept
                                </button>
                            )}
                            {data?.status === 'Pending Confirmation' && (

                                <button onClick={handRefused} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dr:focus:outline-none dr:focus:ring-1 dr:focus:ring-gray-600" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Refuse
                                </button>
                            )}
                            {data?.status === 'Pending Transfer' && (
                                <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dr:focus:outline-none dr:focus:ring-1 dr:focus:ring-gray-600" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Request Payment
                                </button>

                            )}
                            {data?.status === 'Pending Transfer' && (

                                <button onClick={handComplete} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dr:focus:outline-none dr:focus:ring-1 dr:focus:ring-gray-600" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Complete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
export default StaffsPaymentDetail
