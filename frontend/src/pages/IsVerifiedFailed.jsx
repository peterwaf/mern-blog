// eslint-disable-next-line no-unused-vars
import React from "react";
import Nav from "../componets/Nav";
import { FaRegSadTear } from "react-icons/fa";

function IsVerifiedFailed() {
  return (
    //style home page with tailwindcss
    <div className="container min-h-[100vh]">
      <Nav />
      <div id="pageHolder">
        <div className="pl-12 pr-12 pt-12 w-screen h-screen">
            <h1 className="text-3xl font-bold mx-auto text-center">Sorry, something went wrong </h1>
            <FaRegSadTear className="mx-auto text-9xl p-5 font-bold" />
           
        </div>
        </div>
    </div>
  );
}

export default IsVerifiedFailed;
