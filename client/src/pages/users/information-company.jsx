import {
   Card,
   CardHeader,
   CardContent,
   Avatar,
   Typography,
   CardMedia,
   CardActions,
} from "@mui/material";

function InformationCompany() {
   return (
      <div className="flex-col w-full">
         <div className="w-full justify-center items-center">
            <img
               src="https://www.libertyinsurance.com.vn/sites/libertyvn/files/styles/insurance_product_top_image/public/2019-11/Banner_Contact-Us.jpg?itok=POvL9Z3H"
               alt=""
               className="max-w-full max-h-full w-full"
            />
         </div>

         <div className="bg-white w-full">
            <section
               id="features"
               className="relative block px-6 py-10 md:py-20 md:px-10   bg-white-900/30"
            >
               <div className="relative mx-auto max-w-5xl text-center">
                  <div className="w-full flex justify-center">
                     <Typography
                        fontSize={30}
                        fontWeight={600}
                        className="text-[#1A1446]  w-fit py-[20px] border-b-4 border-b-yellow-400"
                     >
                        <h2 className="block w-full bg-gradient-to-b from-black to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
                           We are ready to support you.
                        </h2>
                     </Typography>
                  </div>

                  {/* <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-black-400">
                      Our templates allow for maximum customization. No technical
                      skills required – our intuitive design tools let you get
                      the job done easily.
                   </p> */}
               </div>

               <div
                  className=" flex flex-row w-full pt-10"
                  style={{ justifyContent: "space-between" }}
               >
                  <div>
                     <p className=" my-4 w-full max-w-xl bg-transparent font-medium leading-relaxed tracking-wide text-black-600 text-2xl">
                        Contact Through Our Phone
                     </p>
                     <div className="w-full">
                        <p className=" my-4 w-full max-w-xl bg-transparent font-medium leading-relaxed tracking-wide text-black-400 text-2xl text-red-700">
                           Hotline 1800 599998 (free, 24/7)
                        </p>
                     </div>
                     <p className=" my-4 w-full max-w-xl bg-transparent font-medium leading-relaxed tracking-wide text-black-600 text-2xl">
                        Contact Through Our Email
                     </p>
                     <div className="w-full">
                        <p className=" my-4 w-full max-w-xl bg-transparent font-medium leading-relaxed tracking-wide text-black-400 text-2xl text-red-700">
                           Customercare@Healthsolution.vn
                        </p>
                     </div>
                  </div>

                  <div>
                     <p className=" my-4 w-full max-w-xl bg-transparent font-medium leading-relaxed tracking-wide text-black-600 text-2xl">
                        Our Offices
                     </p>
                     <div className="w-full">
                        <p className=" my-4 w-full max-w-xl bg-transparent font-small leading-relaxed tracking-wide text-black-400 text-lg">
                           <span className="font-medium">Trụ sở chính</span>
                           <br />
                           Tầng 18, Tòa nhà Vincom, 45A Lý Tự Trọng, Phường Bến
                           Nghé, Quận 1, Thành phố Hồ Chí Minh
                           <br />
                           Tel: (84-28) 38 125 125
                           <br />
                           Fax: (84-28) 38 125 018
                           <br />
                           <br />
                           <span className="font-medium">Chi nhánh Hà Nội</span>
                           <br />
                           Tầng 10, Tháp Đông, Tòa nhà Lotte Center Hà Nội, số
                           54, Đường Liễu Giai, Quận Ba Đình, Thành phố Hà Nội
                           <br />
                           Tel: (84-24) 3 7557 111
                           <br />
                           Fax: (84-24) 3 7557 066
                           <br />
                           <br />
                           <span className="font-medium">
                              Chi nhánh Hải Phòng
                           </span>
                           <br />
                           Tầng 3, Tòa nhà Seabank, Số 17, Khu B1, Lô 7B, Đường
                           Lê Hồng Phong, Quận Ngô Quyền, Thành phố Hải Phòng
                           <br />
                           Tel: (84-225) 3 999 366 225
                           <br />
                           Fax: (84-225) 3 999 368 225
                           <br />
                           <br />
                           <span className="font-medium">
                              Văn phòng giao dịch Thái Nguyên
                           </span>
                           <br />
                           Tầng 3, Tòa nhà Đông Á Plaza, Số 668 Đường Phan Đình
                           Phùng, Thành phố Thái Nguyên
                           <br />
                           Tel: (84-28) 38 125 125
                           <br />
                           Fax: (84-225) 3 999 368 543
                           <br />
                           <br />
                           <span className="font-medium">
                              Chi nhánh Hải Phòng
                           </span>
                           <br />
                           Tầng 3, Tòa nhà Seabank, Số 17, Khu B1, Lô 7B, Đường
                           Lê Hồng Phong, Quận Ngô Quyền, Thành phố Hải Phòng
                           <br />
                           Tel: (84-225) 3 999 366 225
                           <br />
                           Fax: (84-225) 3 999 368 225
                           <br />
                           <br />
                           <span className="font-medium">
                              Văn phòng giao dịch Nghệ An
                           </span>
                           <br />
                           Tầng 3, Tòa nhà Nhà Việt, số 8 Đại lộ V.I Lê Nin
                           Thành phố Vinh, Tỉnh Nghệ An
                           <br />
                           Tel: (84-28) 38 125 125
                           <br />
                           Fax: (84-225) 3 999 354 125
                           <br />
                           <br />
                           <span className="font-medium">
                              Văn phòng giao dịch Biên Hòa
                           </span>
                           <br />
                           101 Vũ Hồng Phô, Khu phố 2, Phường Bình Đa, Thành phố
                           Biên Hòa, Tỉnh Đồng Nai
                           <br />
                           Tel: (84-28) 38 125 125
                           <br />
                           Fax: (84-225) 3 222 678 124
                           <br />
                           <br />
                        </p>
                     </div>
                  </div>
               </div>

               <div className="absolute bottom-0 right-0 z-0 h-1/3 w-full"></div>
            </section>
         </div>
      </div>
   );
}

export default InformationCompany;
