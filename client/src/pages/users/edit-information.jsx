import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import {
  editAccountsInformation,
  getAccountByUserID,
  getAccountsInformation,
} from "../../apis/accountApis";
const EditInformation = () => {
  const [message, setMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [formDataAccount, setFormDataAccount] = useState({
    userId: "",
    fullname: "",
    email: "",
    cccd: "",
    phone: "",
    birthdate: "",
    address: "",
    gender: "Male",
  });
  const handleInputChangeAccount = (e) => {
    const { name, value } = e.target;
    setFormDataAccount((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Sending the first POST request
    try {
      await editAccountsInformation(formDataAccount);
      setMessageSuccess("Information changed successfully");
      setMessage("");
    } catch {
      setMessage("Change information failed");
    }
  };
  useEffect(() => {
    const fetchUserStaffData = async () => {
      const accountId = localStorage.getItem("accountId");
      try {
        const userStaffData = await getAccountsInformation(accountId);
        setFormDataAccount({
          userId: userStaffData.userId || "",
          fullname: userStaffData.fullname || "",
          email: userStaffData.email || "",
          cccd: userStaffData.cccd || "",
          phone: userStaffData.phone || "",
          birthdate: userStaffData.birthdate || "",
          address: userStaffData.address || "",
          gender: userStaffData.gender || "Male",
        });
      } catch (error) {
        console.error("Error fetching user staff data:", error);
      }
    };
    fetchUserStaffData();
  }, [messageSuccess, message]);
  return (
    <form
      className="w-full mt-[50px]"
      onSubmit={handleFormSubmit}
      method="post"
    >
      <div className="w-[60%] m-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
             Contact <strong> 1800 599998 </strong> to edit your personal information
            </p>
            {message != "" && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>{message}</strong>
              </Alert>
            )}
            {messageSuccess != "" && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>{messageSuccess}</strong>
              </Alert>
            )}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Fullname
                </label>
                <div className="mt-2">
                  <input
                    disabled
                    required
                    type="text"
                    name="fullname"
                    id="fullname"
                    autoComplete="given-name"
                    className="p-[10px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formDataAccount.fullname}
                    onChange={handleInputChangeAccount}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="cccd"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  National Identification Card
                </label>
                <div className="mt-2">
                  <input
                    disabled
                    required
                    type="text"
                    name="cccd"
                    id="cccd"
                    autoComplete="family-name"
                    className="p-[10px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formDataAccount.cccd}
                    onChange={handleInputChangeAccount}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    disabled
                    required
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="p-[10px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formDataAccount.email}
                    onChange={handleInputChangeAccount}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    pattern="[0-9]{10}"
                    required
                    autoComplete="address-level1"
                    className="p-[10px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formDataAccount.phone}
                    onChange={handleInputChangeAccount}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="birthdate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Birthdate
                </label>
                <div className="mt-2">
                  <input
                    disabled
                    required
                    type="date"
                    name="birthdate"
                    id="birthdate   "
                    autoComplete="address-level2"
                    className="p-[10px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formDataAccount.birthdate}
                    onChange={handleInputChangeAccount}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    disabled
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    className="p-[10px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={formDataAccount.gender}
                    onChange={handleInputChangeAccount}
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    name="address"
                    id="address"
                    autoComplete="address"
                    className="p-[10px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formDataAccount.address}
                    onChange={handleInputChangeAccount}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We will always let you know about important changes, but you pick
              what else you want to hear about.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => console.log(formDataAccount)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
export default EditInformation;
