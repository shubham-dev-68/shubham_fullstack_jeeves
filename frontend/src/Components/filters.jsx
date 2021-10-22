import React, { Component } from "react";
import {API_URL} from '../config';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddProperty from "./add_property";


class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "locality":false,
      "localities" : ["ANY", "UP", "MP", "Gujarat"],
      "currentLocality":this.props.locality,
      "minPrice":0,
      "maxPrice":100,
      "selectedPrice": this.props.maxPrice,
      "startDate": new Date(),

    };
  }

  fetchLocalities = ()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${API_URL}/property/get-distinct-localities`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result)); 
        // this.setState({"propertiesToList":JSON.parse(result).properties.rows})
      })
      .catch(error => console.log('error', error));
  }

  componentDidMount(){
    this.fetchLocalities();
  }

  componentDidUpdate(prevProps){
    if(prevProps.locality !== this.props.locality || 
      prevProps.maxPrice !== this.props.maxPrice
      )
    {
      this.setState({
        "currentLocality":this.props.locality,
        "selectedPrice":this.props.maxPrice,
      })
    }
  }

  handlePriceChange = (e)=>{
    this.setState({"selectedPrice":e})
  }

  submitPrice = ()=>{
    this.props.onPriceChange(this.state.selectedPrice)
  }

  setStartDate = (date)=>{
    this.setState({startDate:date});
    this.props.onDateChange(date);
  }

  render() {
    return (
      <React.Fragment>
        <div  className="column1">
        <AddProperty />
        <hr />
        Filters
        <hr />
          Select Locality
          <Dropdown options={this.state.localities} onChange={this.props.onLocalitySelect} value={this.state.currentLocality} placeholder="Filter by locality" />

        <hr />
        

            Select Price Range
            <Slider
              value={this.state.selectedPrice}
              orientation="horizontal"
              onChange={this.handlePriceChange}
              onChangeComplete={this.submitPrice}
            />
            <p>Min Price : 0 Lakhs</p>
            <p>Max Price : {this.state.selectedPrice} Lakhs</p>

        <hr />
            Select Single Date
            <DatePicker dateFormat='dd/MM/yyyy' selected={this.state.startDate} onChange={(date) => this.setStartDate(date)} />

        <hr />

        </div>
      </React.Fragment>
    );
  }
}

export default Filters;