import React from "react";

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
            <img className="propertyImage" src={this.props.images[0]} />
            <div>
            <p>Name: {this.props.name}</p>
            <p>Address: {this.props.address}</p>
            <p>Locality: {this.props.locality}</p>
            <p>Bedrooms: {this.props.bedroom}</p>
            <p>Baths: {this.props.bath}</p>
            <p>Carpet Area: {this.props.carpetArea}</p>
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