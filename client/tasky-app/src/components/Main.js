import { useState } from "react";

import Header from "./Header";
import NavBar from "./Navbar";
// import BookItem from "./Bookitem";
import Loading from "./Loading";
import Footer from "./Footer";

function Main({booksData, loading}) {


    return (
      <>
        <Header/>
  <br/>
  <br/>
  <div className="main-page-content">
        <h1>A application for reminding pending Tasks. </h1>
          {/* {loading && <Loading />} */}
          </div>
        <NavBar/>

        <Footer/>
      </>
    )
}

export default Main;