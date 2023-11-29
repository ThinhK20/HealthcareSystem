export default function RegisterInsurance(){
    return(
      
    <div className="relative z-0 w-full mb-5 group">
      <form action="#" method="POST">
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="date-request" className="block text-sm font-medium text-gray-700">Date Request</label>
                <input type="text" name="date-request" id="" autoComplete="given-date-request" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <input type="text" name="status" id="status" autoComplete="status" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="periodic" className="block text-sm font-medium text-gray-700">Periodic</label>
                <input type="text" name="periodic" id="periodic" autoComplete="periodic" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="periodic" className="block text-sm font-medium text-gray-700">Date Accept</label>
                <input type="text" name="date-accept" id="date-accept" autoComplete="date-accept" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Package</label>
                <select id="country" name="country" autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option>1-Bảo hiểm y tế</option>
                  <option>2-Bảo hiểm sức khoẻ</option>
                  <option>3-Bảo hiểm nhân thọ</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="periodic" className="block text-sm font-medium text-gray-700">Price</label>
                <input type="text" name="price" id="price" autoComplete="price" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
          <div className="px-0 py-4 text-center sm:px-6">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              REGISTER
            </button>
          </div>
        </div>
      </form>
    </div>
    );
}