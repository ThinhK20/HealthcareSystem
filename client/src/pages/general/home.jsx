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

export default function Home() {
   const imagesHeader = [
      "https://images.unsplash.com/photo-1629019621373-e5087c90067b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1673958772178-8fb1ca12cdec?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1666887360680-9dc27a1d2753?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1445384763658-0400939829cd?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   ];
   const contentCompany = [
      {
         img: "https://www.libertyinsurance.com.vn/sites/libertyvn/files/styles/webp/public/2023-02/FortuneRanking_12022023_0.png.webp?itok=jn542MVu",
         name: "Rank 86",
         description: "Based on 2023 revenue",
      },
      {
         img: "https://www.libertyinsurance.com.vn/sites/libertyvn/files/styles/webp/public/2019-11/P%26C_0.png.webp?itok=hSFnVolh",
         name: "5th largest Property and Casualty insurance company globally",
         description: "Total insurance premiums recorded in 2022",
      },
      {
         img: "https://www.libertyinsurance.com.vn/sites/libertyvn/files/styles/webp/public/2019-11/financial_strength.png.webp?itok=kB14WznJ",
         name: "Financial ratings",
         description: "A.M. Best Co. - 'A' (Excellent)",
      },
   ];
   const contentPolicy = [
      {
         img: "https://www.libertyinsurance.com.vn/sites/libertyvn/files/styles/webp/public/2020-02/Category_Family%26Home.png.webp?itok=6ze2V-aJ",
         content: "Gói bảo hiểm VIP",
      },
      {
         img: "https://www.libertyinsurance.com.vn/sites/libertyvn/files/styles/webp/public/2019-11/Category_Medical.png.webp?itok=LbbLowV7",
         content: "Gói bảo hiểm cho vật",
      },
      {
         img: "https://www.libertyinsurance.com.vn/sites/libertyvn/files/styles/webp/public/2019-11/Category_Travel%26Leisure.png.webp?itok=e-H6HbcP",
         content: "Gói bảo hiểm thường",
      },
   ];
   return (
      <>
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
                              The beauty of Nature
                           </Typography>
                           <Typography
                              variant="lead"
                              color="white"
                              marginBottom={12}
                              className="mb-12 opacity-80"
                           >
                              It is not so much for its beauty that the forest
                              makes a claim upon men&apos;s hearts, as for that
                              subtle something, that quality of air that
                              emanation from old trees, that so wonderfully
                              changes and renews a weary spirit.
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
            <div className="w-full flex justify-center items-end h-[350px]  ">
               <div className="w-[80%]  grid-cols-3 grid gap-[50px]">
                  {contentPolicy.map((item, key) => (
                     <div className="flex justify-center">
                        <ContainerResponsive
                           img={item.img}
                           content={item.content}
                           key={key}
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
      </>
   );
}
