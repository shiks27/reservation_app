import React from 'react'
import "./home.css";
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import Featured from '../../Components/Featured/Featured';
import PropertyList from '../../Components/PropertyList/PropertyList';
import FeaturedProperties from '../../Components/FeaturedProperties/FeaturedProperties';
import MailList from '../../Components/mailList/mailList';
import Footer from "../../Components/footer/Footer"
const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by Property Type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes Guests Love</h1>
        <FeaturedProperties/>
          <MailList/>
          <Footer/>
      </div>
      
    </div>
  )
}

export default Home
