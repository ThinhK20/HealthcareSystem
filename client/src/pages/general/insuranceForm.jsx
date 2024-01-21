import React, { useEffect, useState } from "react";
import {
  getAccountsInformation,
  getInsurancedetails,
} from "../../apis/accountApis";
import { formatDate, padNumberToEightDigits } from "../../helpers/dataHelper";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
const SocialInsuranceForm = () => {
  const [insuranceId, setInsuranceId] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState();
  const [Exp, setExp] = useState();
  const [cccd, setCccd] = useState("");
  const [address, setAddress] = useState("");
  const [packagePolicy, setPackagePolicy] = useState();
  const [qr, setQr] = useState();

  useEffect(() => {
    getAccountsInformation(localStorage.getItem("accountId")).then((result) => {
      setFullname(result.fullname);
      setCccd(result.cccd);
      setBirthday(result.birthdate);
      setAddress(result.address);
      setGender(result.gender);
    });
    getInsurancedetails(localStorage.getItem("accountId")).then((result) => {
      setPackagePolicy(result.listPackage[0].policyPackage);
      setExp(result.listPackage[0].dateEnd);
      setInsuranceId(result.listPackage[0].insureID);
    });
  }, []);
  useEffect(() => {
    // Tạo đối tượng dữ liệu từ các state
    const userData = {
      insuranceId,
      fullname,
      gender,
      birthday,
      Exp,
      cccd,
      address,
      packagePolicy,
    };

    // Chuyển đối tượng dữ liệu thành chuỗi JSON
    const jsonData = JSON.stringify(userData);

    // Sử dụng jsonData để tạo QR code
    // (Bạn có thể thay thế 'yourQRCodeData' bằng state mà bạn muốn sử dụng để hiển thị QR code)
    setQr(jsonData);
  }, [
    insuranceId,
    fullname,
    gender,
    birthday,
    Exp,
    cccd,
    address,
    packagePolicy,
  ]);
  const qrData = `Insurance ID: ${insuranceId}\nFull Name: ${fullname}\nGender: ${gender}\nBirthday: ${birthday}\nCCCD: ${cccd}\nAddress: ${address}\nPolicy: ${packagePolicy?.name}`;

  return (
    <section className="py-16 bg-gray-100 da:bg-gray-800 w-full">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="p-6 bg-white border border-gray-100 rounded-lg shadow da:bg-gray-900 da:border-gray-900">
          <div className="pb-6 border-b border-gray-100 da:border-gray-700 flex justify-between">
            <div className="flex">
               <div>
               <img
                    className=""
                    width={90}
                    src="https://cdn.discordapp.com/attachments/1160172654825840763/1182624713445474314/5fa7ceca-d37d-46c7-9095-412d10fdfdcb-removebg-preview.png?ex=65856017&is=6572eb17&hm=611614dd184c7058387e271965d269332dc9cb820e560f4a4d515bea8bbe787a&"
                    alt=""
                  />
               </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 md:text-3xl da:text-gray-300 mt-[20px]">
                HEALTIH Solutions
                </h2>
                <p className="text-xs font-medium text-gray-500">
                Health Insurance Certificate
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 64,
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                  }}
                  value={qrData}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>
          {
            packagePolicy ? (
              <>
          <div className="py-6 border-b border-gray-100 da:border-gray-800">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full p-3 md:w-1/3">
                  <p className="text-base font-semibold text-gray-700 da:text-gray-400">
                    Insurance ID
                  </p>
                </div>
                <div className="w-full p-3 md:flex-1">
                  <input
                    className="w-full px-4 py-2.5 da:bg-gray-800 da:border-gray-800 da:placeholder-gray-500 da:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                    type="text"
                    placeholder="adam@gmail.com"
                    value={padNumberToEightDigits(insuranceId)}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-gray-100 da:border-gray-800">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full p-3 md:w-1/3">
                  <p className="text-base font-semibold text-gray-700 da:text-gray-400">
                    Fullname
                  </p>
                </div>
                <div className="w-full p-3 md:flex-1">
                  <input
                    className="w-full px-4 py-2.5 da:bg-gray-800 da:border-gray-800 da:placeholder-gray-500 da:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                    type="email"
                    placeholder="adam@gmail.com"
                    value={fullname}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-gray-100 da:border-gray-800">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full p-3 md:w-1/3">
                  <p className="text-base font-semibold text-gray-700 da:text-gray-400">
                    Citizen Card
                  </p>
                </div>
                <div className="w-full p-3 md:w-1/3">
                  <input
                    className="w-full da:bg-gray-800 da:border-gray-800 px-4 da:placeholder-gray-500 da:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                    type="text"
                    placeholder="Adam"
                    value={cccd}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-gray-100 da:border-gray-800">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full p-3 md:w-1/3">
                  <p className="text-base font-semibold text-gray-700 da:text-gray-400">
                    Gender
                  </p>
                </div>
                <div className="w-full p-3 md:w-1/3">
                  <input
                    className="w-full da:bg-gray-800 da:border-gray-800 px-4 da:placeholder-gray-500 da:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                    type="text"
                    placeholder="Adam"
                    value={gender}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-gray-100 da:border-gray-800">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full p-3 md:w-1/3">
                  <p className="text-base font-semibold text-gray-700 da:text-gray-400">
                    Expiration Date
                  </p>
                </div>
                <div className="w-full p-3 md:w-1/3">
                  <input
                    className="w-full da:bg-gray-800 da:border-gray-800 px-4 da:placeholder-gray-500 da:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                    type="text"
                    placeholder="Adam"
                    disabled
                    value={formatDate(Exp)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-gray-100 da:border-gray-800">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full p-3 md:w-1/3">
                  <p className="text-sm font-semibold text-gray-800 da:text-gray-400">
                    Birthday
                  </p>
                </div>
                <div className="w-full p-3 md:flex-1">
                  <div className="flex items-center overflow-hidden border border-gray-200 rounded-lg da:bg-gray-800 da:border-gray-800 focus-within:border-blue-500 shadow-input">
                    <input
                      className="w-full px-4 da:bg-gray-800 da:placeholder-gray-500 da:text-gray-400  da:border-gray-700 py-2.5 text-base text-gray-900 font-normal outline-none border-l"
                      type="text"
                      placeholder="www.google.com"
                      value={formatDate(birthday)}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-gray-100 da:border-gray-800">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full p-3 md:w-1/3">
                  <p className="text-sm font-semibold text-gray-800 da:text-gray-400">
                    Address
                  </p>
                </div>
                <div className="w-full p-3 md:flex-1">
                  <input
                    rows="4"
                    type="text"
                    placeholder="your text here.."
                    required
                    value={address}
                    disabled
                    className="block w-full px-4 py-4 leading-tight placeholder-gray-400 border rounded da:placeholder-gray-500 da:text-gray-400 da:border-gray-800 da:bg-gray-800 "
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-gray-100 da:border-gray-800">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full p-3 md:w-1/3">
                  <p className="text-sm font-semibold text-gray-800 da:text-gray-400">
                    Type
                  </p>
                </div>
                <div className="w-full p-3 md:flex-1">
                  <input
                    className="w-full px-4 da:bg-gray-800 da:placeholder-gray-500 da:text-gray-400  da:border-gray-700 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                    type="text"
                    disabled
                    placeholder="Web Designer"
                    value={packagePolicy?.name}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-gray-100 da:border-gray-800">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full p-3 md:w-1/3">
                  <p className="text-sm font-semibold text-gray-800 da:text-gray-400">
                    QR
                  </p>
                </div>
                <div className="w-full p-3 md:w-auto">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    alt=""
                    className="object-cover w-24 h-24 rounded-full"
                  />
                </div>
                <div className="w-full p-3 md:flex-1"></div>
              </div>
            </div>
          </div>
</>
            ):(
              <p>
              You have not yet signed up for our insurance, please sign up for an insurance plan and come back later
              </p>
            )
          }

        </div>
      </div>
    </section>
  );
};

export default SocialInsuranceForm;
