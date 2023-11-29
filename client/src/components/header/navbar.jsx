import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Typography,
  Button,
  IconButton,
  Collapse, // Thêm import cho Collapse
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, HomeIcon } from "@heroicons/react/24/outline";

const routes = [
  {
    name: 'Home',
    path: '/',
    icon: HomeIcon,
  },
  {
    name: 'Login',
    path: '/login',
    icon: HomeIcon,
  },
  {
    name: 'About Us',
    path: '/about',
    icon: HomeIcon,
  },
  // Add more route objects as needed
];

export function Navbar({ brandName, action }) {
  const [openNav, setOpenNav] = React.useState(false);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 p-[5px]">
      {routes.map(({ name, path, icon }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize hover:bg-[#545455] p-[2px] rounded-md"
        >
          <Link
            to={path}

            className="flex items-center gap-1 p-1 font-bold"
          >
            {icon &&
              React.createElement(icon, {
                className: "w-[18px] h-[18px] opacity-75 mr-1",
              })}
            {name}
          </Link>

        </Typography>
      ))}
    </ul>
  );

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <MTNavbar color="transparent" className="p-5 w-[100%]">
      <div className="container mx-auto flex items-center justify-between text-white bg-[#000000] p-[10px] rounded-lg">
        <Link to="/">
          <Typography className="ml-2 cursor-pointer font-bold">
            {brandName}
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden gap-2 lg:flex">
          <a
            href="https://www.material-tailwind.com/blocks?ref=mtkr"
            target="_blank"
          >
            <Button variant="text" size="sm" color="white" fullWidth className="hover:bg-[#545455]">
              pro version
            </Button>
          </a>
          {React.cloneElement(action, {
            className: "hidden lg:inline-block",
          })}
        </div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav} className=" rounded-lg ">
        <div className="container mx-auto bg-[black] rounded-xl">
          {navList}
          <a
            href="https://www.material-tailwind.com/blocks/react?ref=mtkr"
            target="_blank"
            className="mb-2 block"
          >
            <Button variant="text" size="sm" fullWidth>
              pro version
            </Button>
          </a>
          {React.cloneElement(action, {
            className: "w-full block",
          })}
        </div>
      </Collapse>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "Healthcare System",
  action: (
    <a
      href=""
      target="_blank"
    >
      <Button variant="gradient" size="sm" fullWidth className="hover:bg-[#545455]">
        free download
      </Button>
    </a>
  ),
};



export default Navbar;
