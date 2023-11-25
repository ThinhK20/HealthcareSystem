import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

function TableInsuranceManagement() {
return (
<div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
<button onClick={event => { popuphandler(true); }} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                        <p className="text-sm font-medium leading-none text-white"><FontAwesomeIcon icon={faPlus} /> New</p>
                    </button>

<table className="w-full table-fixed">
    <thead>
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">InsureID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">001</td>
            <td className="px-6 py-4 whitespace-nowrap">Letan</td>
            <td className="px-6 py-4 whitespace-nowrap">P001</td>
            <td className="px-6 py-4 whitespace-nowrap">
            </td>
            <td className="px-0 py-4 bg-gray-50 text-center sm:px-6">
                <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"><FontAwesomeIcon icon= {faEdit} /></button>
                <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"><FontAwesomeIcon icon= {faTrash} /></button>
            </td>
        </tr>
    </tbody>
</table>
    
</div>
);
}
 
export default TableInsuranceManagement;