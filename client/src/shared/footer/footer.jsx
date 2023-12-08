import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
   return (
      <footer className="relative px-4 pt-8 pb-6 text-[black] ">
         
         <div className="container mx-auto">
            <div className="flex flex-wrap pt-6 text-center lg:text-left border-t-2 border-gray-300">
               <div className="w-full px-4 lg:w-6/12">
                  <img width={150} src="https://cdn.discordapp.com/attachments/1160172654825840763/1182624713445474314/5fa7ceca-d37d-46c7-9095-412d10fdfdcb-removebg-preview.png?ex=65856017&is=6572eb17&hm=611614dd184c7058387e271965d269332dc9cb820e560f4a4d515bea8bbe787a&" alt="" />
                  <Typography variant="h4" className="mb-4" color="blue-gray">
                     {title}
                  </Typography>
                  <div className="mx-auto flex justify-center gap-2 md:mb-0 lg:justify-start">
                     {socials.map(({ color, name, path }) => (
                        <a
                           key={name}
                           href={path}
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <IconButton
                              color="white"
                              className="rounded-full shadow-none bg-transparent"
                           >
                              <Typography color={color}>
                                 <i className={`fa-brands fa-${name}`} />
                              </Typography>
                           </IconButton>
                        </a>
                     ))}
                  </div>
               </div>
               <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-[20px]">
                  {menus.map(({ name, items }) => (
                     <div key={name}>
                        <Typography
                           variant="small"
                           color="blue-gray"
                           className="mb-2 block font-medium uppercase"
                        >
                           {name}
                        </Typography>
                        <ul className="mt-3">
                           {items.map((item) => (
                              <li key={item.name}>
                                 <Typography
                                    as="a"
                                    href={item.path}
                                    target="_blank"
                                    rel="noreferrer"
                                    variant="small"
                                    className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"
                                 >
                                    {item.name}
                                 </Typography>
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
            </div>
            <hr className="my-6 border-gray-300" />
            <div className="flex flex-wrap items-center justify-center md:justify-between">
               <div className="mx-auto w-full text-center">
                  <Typography
                     variant="small"
                     className="font-normal text-blue-gray-500"
                  >
                     {copyright}
                  </Typography>
               </div>
            </div>
         </div>
      </footer>
   );
}

Footer.defaultProps = {
   title: "Healthcare System",
   description:
      "Easy to use React components for Tailwind CSS and Material Design.",
   socials: [
      {
         color: "gray",
         name: "twitter",
         path: "https://www.twitter.com/creativetim",
      },
      {
         color: "gray",
         name: "youtube",
         path: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
      },
      {
         color: "gray",
         name: "instagram",
         path: "https://www.instagram.com/creativetimofficial/",
      },
      {
         color: "black",
         name: "github",
         path: "https://github.com/creativetimofficial/material-tailwind",
      },
   ],
   menus: [
      {
         name: "useful links",
         items: [
            {
               name: "About Us",
               path: "https://www.creative-tim.com/presentation",
            },
            { name: "Blog", path: "https://www.creative-tim.com/blog" },
            {
               name: "Github",
               path: "https://www.github.com/creativetimofficial/material-tailwind?ref=mtk",
            },
            {
               name: "Free Products",
               path: "https://www.creative-tim.com/templates/free?ref=mtk",
            },
         ],
      },
      {
         name: "other resources",
         items: [
            {
               name: "MIT License",
               path: "https://github.com/creativetimofficial/material-tailwind/blob/main/LICENSE.md?ref=mtk",
            },
            {
               name: "Contribute",
               path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CONTRIBUTING.md?ref=mtk",
            },
            {
               name: "Change Log",
               path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CHANGELOG.md?ref=mtk",
            },
            {
               name: "Contact Us",
               path: "https://creative-tim.com/contact-us?ref=mtk",
            },
         ],
      },
   ],
   copyright: (
      <>
         Copyright © {year} Healthcare System by{" "}
         <a
            href="https://www.creative-tim.com?ref=mtk"
            target="_blank"
            className="text-blue-gray-500 transition-colors hover:text-blue-500"
         >
            Creative Tim
         </a>
         .
      </>
   ),
};

Footer.propTypes = {
   title: PropTypes.string,
   description: PropTypes.string,
   socials: PropTypes.arrayOf(PropTypes.object),
   menus: PropTypes.arrayOf(PropTypes.object),
   copyright: PropTypes.node,
};



export default Footer;
