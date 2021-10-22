import React from "react";
import {API_URL, STATIC_URL} from '../config';

class Recent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "propertiesToList":[],
    };
  }

  fetchRecentProperties = ()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${API_URL}/property/recent`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log("RECENT", JSON.parse(result)); 
        this.setState({"propertiesToList":JSON.parse(result).properties})
        console.log("RECENT state", this.state); 
      })
      .catch(error => console.log('error', error));
  }

  componentDidMount(){
    this.fetchRecentProperties()
  }

  render() {
    
    return (
      <React.Fragment>
        <div  className="column3">
          RECENT
          <hr />
        {this.state.propertiesToList.map(property=>{
          return <img width="300px" height="200px" src={STATIC_URL+"/"+property.id+"/"+property.Images[0]["url"]} />
        })}
        </div>
        
      </React.Fragment>
    );
  }
}

export default Recent;