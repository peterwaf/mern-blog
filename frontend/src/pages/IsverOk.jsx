// eslint-disable-next-line no-unused-vars
import React from "react";
import Nav from "../componets/Nav";
import { CiFaceSmile } from "react-icons/ci";

function IsverOk() {
  return (
    //style home page with tailwindcss
    <div className="container min-h-[100vh]">
      <Nav />
      <div id="pageHolder">
        <div className="pl-12 pr-12 pt-12 w-screen h-screen">
            <h1 className="text-3xl font-bold mx-auto text-center">You have successfully verified your account</h1>
            <CiFaceSmile className="mx-auto text-9xl p-5 font-bold" />
            <p className="mx-auto text-center font-bold">You can now <a className="text-white underline" href="/login">Log In</a></p>
            
        </div>
        </div>
    </div>
  );
}

export default IsverOk;
