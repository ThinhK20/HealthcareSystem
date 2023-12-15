// LayoutRoute.jsx
import React from "react";
import Navbar from "../../components/header/navbar";
import Footer from "../footer/footer";

const LayoutRoute = ({ element }) => {
    return (
        <div className="w-[100%]">
            <header className="flex justify-center">
                <Navbar></Navbar>
            </header>
            <div className="min-h-[90vh] w-[100%] container mx-auto flex">
                <div className="container mx-auto flex">
                    {element}
                </div>  
            </div>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default LayoutRoute;
