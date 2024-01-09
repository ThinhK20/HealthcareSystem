// LayoutRoute.jsx
import React from "react";
import Navbar from "../../components/header/navbar";
import Footer from "../footer/footer";

const LayoutIndexRoute = ({ element }) => {
    return (
        <div className="w-[100%]">
            <header className="flex justify-center">
                <Navbar></Navbar>
            </header>
            <div className="min-h-[90vh] w-[100%]  mx-auto flex">
                <div className=" mx-auto flex w-full">
                    {element}
                </div>  
            </div>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default LayoutIndexRoute;
