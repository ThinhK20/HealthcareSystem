import { Carousel } from "@material-tailwind/react";
import {
   Card,
   CardHeader,
   CardContent,
   Avatar,
   Typography,
   CardMedia,
   CardActions,
} from "@mui/material";

import "react-slideshow-image/dist/styles.css";
import DropeCard from "../../components/card/drope-card";
import ContainerResponsive from "../../components/card/type-card";
import ContactUs from "../../components/contact-us/contact-us";
import {
   imagesHeader,
   contentCompany,
   // contentPolicy,
} from "../../shared/img/link";
import { useEffect, useState } from "react";
import LoadingData from "../../components/loading/loadingData";
import { getAllPackage } from "../../apis/policyPackageApis";
import { useNavigate } from "react-router-dom";

export default function Home() {
   const [contentPolicy, setContentPolicy] = useState(null);
   const [load, setLoad] = useState(true);
   const navigateTo = useNavigate();
   const getData = async () => {
      const policypackage = await getAllPackage();
      const routerContent = policypackage
         .filter((x) => x.status === "Active")
         .map((x) => ({
            img: "https://www.libertyinsurance.com.vn/sites/libertyvn/files/styles/webp/public/2019-11/Category_Medical.png.webp?itok=LbbLowV7",
            path: `/users/package?packageId=${x.packageid}`,
            content: x.name,
         }));
      setContentPolicy(routerContent);
   };

   useEffect(() => {
      getData();
   }, []);

   useEffect(() => {
      if (contentPolicy != null) setLoad(false);
   }, [contentPolicy]);

   return (
      <>
         {load === false ? (
            <div className=" min-h-screen overflow-hidden text-center w-full">
               <Carousel className=" h-[500px]" autoplay loop>
                  {imagesHeader.map((item, key) => (
                     <div key={key} className="relative h-full w-full">
                        <img
                           src={item}
                           alt="image 1"
                           className="h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
                           <div className="w-3/4 text-center md:w-2/4">
                              <Typography
                                 variant="h1"
                                 color="white"
                                 fontSize={50}
                                 marginBottom={6}
                              >
                                 Stay Ahead with Health Insurance
                              </Typography>
                              <Typography
                                 variant="lead"
                                 color="white"
                                 marginBottom={12}
                                 className="mb-12 opacity-80"
                              >
                                 Your health is your greatest asset. Make a wise
                                 investment by getting health insurance
                                 coverage. It's a commitment to your long-term
                                 well-being, ensuring that you have access to
                                 quality healthcare when you need it most. Don't
                                 compromise – prioritize your health and build a
                                 foundation for a healthier, happier life.
                              </Typography>
                           </div>{" "}
                        </div>
                     </div>
                  ))}
               </Carousel>
               <div className="w-full flex justify-center">
                  <Typography
                     fontSize={30}
                     fontWeight={600}
                     className="text-[#1A1446]  w-fit py-[20px] border-b-4 border-b-yellow-400"
                  >
                     View information of insurance packages
                  </Typography>
               </div>
               <div className="w-full flex justify-center items-end py-[50px]">
                  <div className="w-[80%]  lg:grid-cols-3 md:grid-cols-1 grid gap-[50px]">
                     {contentPolicy?.map((item, key) => (
                        <div className="flex justify-center ">
                           <ContainerResponsive
                              img={item.img}
                              content={item.content}
                              key={key}
                              onClick={() => {
                                 navigateTo(item.path);
                              }}
                           ></ContainerResponsive>
                        </div>
                     ))}
                     {/* <div className="flex justify-center">
                     <ContainerResponsive img={}></ContainerResponsive>
                     </div>
                     
                     <div className="flex justify-center">
                     <ContainerResponsive></ContainerResponsive>
                     </div>
                     
                     <div className="flex justify-center">
                     <ContainerResponsive></ContainerResponsive>
                    </div> */}
                  </div>
               </div>
               <div className="bg-gray-200 w-full py-[40px] mt-[50px]">
                  <ContactUs />
               </div>
               <CardMedia
                  component="video"
                  image={"home-video.mp4"}
                  autoPlay
                  loop
                  muted
                  sx={{ objectFit: "cover", objectPosition: "center" }}
                  className="h-[600px] my-8 w-full"
               />
               <div className="w-full flex justify-center">
                  <Typography
                     fontSize={30}
                     fontWeight={600}
                     className="text-[#1A1446]  w-fit py-[20px] border-b-4 border-b-yellow-400"
                  >
                     Overview of HEALTIH Solutions Corporate Insurance Group
                  </Typography>
               </div>
               <div className="flex justify-around flex-wrap pt-20">
                  {contentCompany.map((item, index) => (
                     <DropeCard
                        key={index}
                        img={item.img}
                        name={item.name}
                        description={item.description}
                     />
                  ))}
               </div>
            </div>
         ) : (
            <LoadingData></LoadingData>
         )}
      </>
   );
}
