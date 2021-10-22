import React from "react";
import Property from "./property";
import {API_URL} from '../config';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "propertiesToList":[],
    };
  }

  fetchPropertiesPaginated = ()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    var requestOptionsPost = {
      method: 'POST'
    };
    
    if(this.props.activeFilter === false){
      fetch(`${API_URL}/property/list-properties?page=1&limit=30`, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(JSON.parse(result).properties.rows); 
          this.setState({"propertiesToList":JSON.parse(result).properties.rows})
        })
        .catch(error => console.log('error', error));
    }
    else{
      console.log(this.props.activeFilter)
      switch(this.props.activeFilter){
        case "Locality" : 
          fetch(`${API_URL}/property/list-properties-locality?page=1&limit=10&locality=${this.props.locality}`, requestOptions)
            .then(response => response.text())
            .then(result => {
              console.log(JSON.parse(result).properties.rows); 
              this.setState({"propertiesToList":JSON.parse(result).properties.rows})
            })
            .catch(error => console.log('error', error));
          break;

        case "Price" : 
          let data = {
            "minPrice":0, 
            "maxPrice":this.props.maxPrice*100000,
            "page":1,
            "limit":10
          }
          fetch(`${API_URL}/property/get-range-price`, {
            headers: {
              'Content-Type': 'application/json',
            },
            "method":"POST", 
            "body":JSON.stringify(data)
          })
            .then(response => response.json())
            .then(result => {
              console.log(result);
              if(result && result.properties)
                this.setState({"propertiesToList":result.properties.rows})
            })
            .catch(error => console.log('error', error));
          break;

          case "Date" : 
            let DateData = {
              "date":this.props.date,
              "page":1,
              "limit":10
            }
            fetch(`${API_URL}/property/get-selected-date`, {
              headers: {
                'Content-Type': 'application/json',
              },
              "method":"POST", 
              "body":JSON.stringify(DateData)
            })
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if(result && result.properties && result.properties.rows)
                  this.setState({"propertiesToList":result.properties.rows})
                else
                this.setState({"propertiesToList":[]})
              })
              .catch(error => console.log('error', error));
          break;
          
      }
    }
  }

  componentDidMount(){
    this.fetchPropertiesPaginated();
  }

  componentDidUpdate(prevProps){
    if(
      (this.props.activeFilter!==prevProps.activeFilter ||
      this.props.locality!==prevProps.locality ||
      this.props.maxPrice!==prevProps.maxPrice) ||
      this.props.date!==prevProps.date
      )
      this.fetchPropertiesPaginated();
  }

  render() {
    return (
      <React.Fragment>
        <div  className="column2">
          <div>
          {this.state.propertiesToList.map((propertyDetails, idx)=>{
            return <Property key={idx} {...propertyDetails}/>
          })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Listing;