import {
   Card,
   CardHeader,
   CardContent,
   Avatar,
   Typography,
   CardMedia,
   CardActions,
} from "@mui/material";

function AboutUs() {
   return (
      <>
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
                           Get To Know HEALTH SOLUTIONS
                        </h2>
                     </Typography>
                  </div>

                  {/* <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-black-400">
                     Our templates allow for maximum customization. No technical
                     skills required – our intuitive design tools let you get
                     the job done easily.
                  </p> */}
               </div>

               <div className=" bottom-0 left-0 z-0 h-1/3 w-full">
                  <p className=" my-4 w-full max-w-xl bg-transparent font-medium leading-relaxed tracking-wide text-black-600 text-2xl">
                     Health Solutions Group
                  </p>
                  <div className="w-full">
                     <p className=" my-4 w-full max-w-xlbg-transparent font-small leading-relaxed tracking-wide text-black-400 text-lg">
                        In business since 1912, and headquartered in Boston,
                        Health Solutions Insurance has over 100-year history in
                        the general insurance industry in the United States and
                        worldwide.
                        <br />
                        <br />
                        Health Solutions Insurance is the world-acclaimed group
                        with over 50,000 people in 29 countries and economies
                        worldwide. The group is the 5th largest global property
                        and casualty insurer based on the 2022 gross written
                        premium and rank 86th on the Fortune 100 list of largest
                        corporations in the US based on 2022 revenue.
                     </p>
                  </div>
                  <p className=" my-4 w-full max-w-xl bg-transparent font-medium leading-relaxed tracking-wide text-black-600 text-2xl">
                     About Health Solutions in Vietnam
                  </p>
                  <div className="w-full">
                     <p className=" my-4 w-full max-w-xlbg-transparent font-small leading-relaxed tracking-wide text-black-400 text-lg">
                        Health Solutions Vietnam (LIV), a leading non-life
                        insurance company, was one of the first insurers to come
                        to Vietnam in 2003. Inheriting from the group’s
                        expertise, LIV brings international standard products,
                        contributing to improving life quality and better
                        protection for the Vietnamese.
                        <br />
                        <br />
                        In Vietnam, Health Solutions positions with a unique
                        proposition in the non-life insurance market with
                        advanced technology, an easy and safe online insurance
                        purchasing platform, and a fast and efficient claim
                        process. At every Liberty Insurance office, anywhere in
                        the world, customers are always served by a qualified,
                        experienced and dedicated team.
                        <br />
                        <br />
                        Every Health Solutions’s insurance product has been
                        developed from thorough studies and diligently designed
                        for the Vietnamese people. Health Solutions insurance
                        products help ensure better life, serving all lifestyle
                        needs with a wide range of products such as
                        comprehensive auto, home, medical, travel, property and
                        liability insurance products via traditional, direct and
                        online channels at a reasonable premium. Liberty
                        Insurance is highly recognised for our service quality.
                        It is the first choice for customers to seek practical
                        insurance solutions to protect against unexpected risks
                        and the joy of life.
                        <br />
                        <br />
                        In 2023, Health Solutions is headquartered in Ho Chi
                        Minh City, with 9 branches and offices in Ha Noi, Hai
                        Phong, Thai Nguyen, Nghe An, Danang, Dong Nai, Can Tho,
                        Binh Duong, and Hai Duong.
                        <br />
                        <br />
                        Health Solutions is honored to be awarded the “Top 10
                        Most Reputable Non-Life Insurance Companies in Vietnam”
                        accolade in 2018, 2019, 2020.
                        <br />
                        <br />
                        Health Solutions became the first non-life insurer in
                        Vietnam to achieve 4 Financial Services Awards by IDG
                        Vietnam in 3 consecutive years in 2021 - 2023, an annual
                        award hosted by IDG International Data Group in the
                        Vietnam Financial Services Forum framework. The awards
                        aim to identify and honor financial and insurance
                        services providers with outstanding performance and
                        contributions to the finance and insurance industry
                        development.
                     </p>
                  </div>
                  <div className="w-full text-center">
                     <img
                        class="inline-block max-w-full h-auto"
                        src="https://www.libertyinsurance.com.vn/sites/libertyvn/files/inline-images/BH%20Liberty_Giai%20Dich%20vu%20TC%20tieu%20bieu%20IDG%202021%2023_EN.png"
                        alt=""
                     />
                  </div>
                  <div className="w-full">
                     <p className=" my-4 w-full max-w-xlbg-transparent font-small leading-relaxed tracking-wide text-black-400 text-lg">
                        In 2023, Liberty Insurance becomes the first Vietnamese
                        non-life insurer to receive ‘Best Companies to Work for
                        in Asia’ award.
                     </p>
                  </div>
                  <div className="w-full text-center">
                     <img
                        class="inline-block max-w-full h-auto"
                        src="https://www.libertyinsurance.com.vn/sites/libertyvn/files/inline-images/EN_1.jpg"
                        alt=""
                     />
                  </div>
               </div>

               <div className="absolute bottom-0 right-0 z-0 h-1/3 w-full"></div>
            </section>
         </div>
      </>
   );
}

export default AboutUs;
