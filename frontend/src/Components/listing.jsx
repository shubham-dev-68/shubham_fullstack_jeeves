import React from "react";
import Property from "./property";

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {"propertiesToList":[
      {"name":"Property1", "images":["https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg", "https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg"] , "description":"Good Property", "address":"Gujarat", "locality":"Gota", "price":"44 lakh", "bedroom":"4", "bath":"2", "carpetArea":"1600 sq ft."},
      {"name":"Property2", "images":["https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg", "https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg"] , "description":"Good Property", "address":"Gujarat", "locality":"Gota", "price":"44 lakh", "bedroom":"4", "bath":"2", "carpetArea":"1600 sq ft."},
      {"name":"Property3", "images":["https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg", "https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg"] , "description":"Good Property", "address":"Gujarat", "locality":"Gota", "price":"44 lakh", "bedroom":"4", "bath":"2", "carpetArea":"1600 sq ft."},
      {"name":"Property4", "images":["https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg", "https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg"] , "description":"Good Property", "address":"Gujarat", "locality":"Gota", "price":"44 lakh", "bedroom":"4", "bath":"2", "carpetArea":"1600 sq ft."},
      {"name":"Property5", "images":["https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg", "https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg"] , "description":"Good Property", "address":"Gujarat", "locality":"Gota", "price":"44 lakh", "bedroom":"4", "bath":"2", "carpetArea":"1600 sq ft."},
      {"name":"Property6", "images":["https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg", "https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg"] , "description":"Good Property", "address":"Gujarat", "locality":"Gota", "price":"44 lakh", "bedroom":"4", "bath":"2", "carpetArea":"1600 sq ft."},
      {"name":"Property7", "images":["https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg", "https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg"] , "description":"Good Property", "address":"Gujarat", "locality":"Gota", "price":"44 lakh", "bedroom":"4", "bath":"2", "carpetArea":"1600 sq ft."},
      {"name":"Property8", "images":["https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg", "https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg"] , "description":"Good Property", "address":"Gujarat", "locality":"Gota", "price":"44 lakh", "bedroom":"4", "bath":"2", "carpetArea":"1600 sq ft."},
      {"name":"Property9", "images":["https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg", "https://assets.architecturaldigest.in/photos/6008447e38f32f52a6d9a9a4/master/w_1600,c_limit/Bangalore-villa-interiors-Cane-Boutique-7.jpg"] , "description":"Good Property", "address":"Gujarat", "locality":"Gota", "price":"44 lakh", "bedroom":"4", "bath":"2", "carpetArea":"1600 sq ft."},
    ]};
  }

  render() {
    return (
      <React.Fragment>
        <div  className="column2">
        {this.state.propertiesToList.map(propertyDetails=>{
          return <Property {...propertyDetails}/>
        })}
        </div>
      </React.Fragment>
    );
  }
}

export default Listing;