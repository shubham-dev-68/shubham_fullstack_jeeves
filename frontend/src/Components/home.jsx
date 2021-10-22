import React from "react";
import Header from "./header";
import Listing from "./listing";
import Filters from "./filters";
import Recent from "./recent";
import Footer from "./footer"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "activeFilter":false,
      "locality":"ANY",
      "maxPrice":20,
      "date":new Date()
    };
  }

  localityHandler = (locality) => {
    let isFilterActive = locality.value!=="ANY";
    this.setState({
      "activeFilter":isFilterActive?"Locality":false,
      "locality":isFilterActive?locality.value:false,
      "maxPrice":20
    })
  }

  priceHandler = (price) => {
    // let isFilterActive = locality.value!=="ANY";
    console.log(price)
    this.setState({
      "maxPrice":price,
      "activeFilter":"Price",
      "locality":"ANY"
    })
  }

  dateHandler = (date) =>{
    console.log(date)
    this.setState({
      "maxPrice":20,
      "activeFilter":"Date",
      "locality":"ANY",
      "date": date
    })
  }

  render() {
    console.log("state", this.state)
    return (
      <React.Fragment>
          <Header/>
          <div className="mainContainer">
            <Filters {...this.state} onLocalitySelect={this.localityHandler} onPriceChange={this.priceHandler} onDateChange={this.dateHandler}/>
            <Listing {...this.state} />
            <Recent/>
          </div>
          <Footer/>
      </React.Fragment>
    );
  }
}

export default Home;