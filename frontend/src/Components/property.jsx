import React from "react";
import {API_URL, STATIC_URL} from '../config';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class Property extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     ...(JSON.parse(props))
    // }
  }
  handleAddToFavourite = ()=>{
    console.log("ADD TO FAVOURITE", this.props.name)
  }
  handleViewCount = ()=>{
    console.log("View COUNT", this.props.name)
  }
  render() {
    return (
      <React.Fragment>
        <div  className="property">
            {/* <img className="propertyImage" src={STATIC_URL+"/"+this.props.id+"/"+this.props.Images[0]["url"]} /> */}
            <Carousel className="propCarousel">
                {
                  this.props.Images.map(image=>{
                    return <div>
                        <img src={STATIC_URL+"/"+this.props.id+"/"+image["url"]} />
                    </div>
                  })
                }
            </Carousel>
            <div>
            <p>Name: {this.props.name}</p>
            <p>Price: {Math.ceil(this.props.price/100000)+" Lakh"}</p>
            <p>Address: {this.props.address}</p>
            <p>Locality: {this.props.locality}</p>
            <p>Bedrooms: {this.props.bedroom}</p>
            <p>Baths: {this.props.bath}</p>
            <p>Carpet Area: {this.props.carpet_area + " Sq. Ft."}</p>
            </div>
            <div>
                <button onClick={this.handleAddToFavourite}>Add to Favourites</button>
                <button onClick={this.handleViewCount}>View Count</button>
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Property;