import React from "react";
import Header from "./header";
import Listing from "./listing";
import Filters from "./filters";
import Recent from "./recent";
import Footer from "./footer"

class Home extends React.Component {
  componentDidUpdate(prevProps) {
    
  }

  render() {
    
    return (
      <React.Fragment>
          <Header/>
          <div className="mainContainer">
            <Filters/>
            <Listing/>
            <Recent/>
          </div>
          <Footer/>
      </React.Fragment>
    );
  }
}

export default Home;