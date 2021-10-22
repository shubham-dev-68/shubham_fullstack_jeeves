import React from "react";

class AddProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          "name": "",
          "price": "",
          "address": "",
          "locality": "",
          "bedrooms": "",
          "baths": "",
          "carpetArea": "",
          "selectedFiles" : []
        };
      }
      submitProperty = ()=>{
        var formdata = new FormData();
        formdata.append("name", this.state.name);
        formdata.append("address", this.state.address);
        formdata.append("locality", this.state.locality);
        formdata.append("price", this.state.price);
        formdata.append("bedroom", this.state.bedrooms);
        formdata.append("bath", this.state.baths);
        formdata.append("carpet_area", this.state.carpetArea);
        for(let i=0;i<this.state.selectedFiles.length;i++){
            formdata.append("images", this.state.selectedFiles[i], this.state.selectedFiles[i].name);
        }
        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        fetch("http://localhost:5000/api/property/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      }
      changeInput = (field,e)=>{
          this.setState({[field]: e.target.value});
      }
      // On file select (from the pop up) 
      onFileChange = event => { 
        // Update the state 
        this.setState({ selectedFiles: event.target.files }); 
      }; 
       
       
      // File content to be displayed after 
      // file upload is complete 
      fileData = () => { 
        if (this.state.selectedFile) { 
            
          return ( 
            <div> 
              <h2>File Details:</h2> 
              <p>File Name: {this.state.selectedFile.name}</p> 
              <p>File Type: {this.state.selectedFile.type}</p> 
              <p> 
                Last Modified:{" "} 
                {this.state.selectedFile.lastModifiedDate.toDateString()} 
              </p> 
            </div> 
          ); 
        } else { 
          return ( 
            <div> 
              <br /> 
              <h4>Choose before Pressing the Upload button</h4> 
            </div> 
          ); 
        } 
      }; 
      render() {
    return (
      <React.Fragment>
          <div>
                Add a Property
                <hr />
                <form>
                    <input onChange={(e)=>this.changeInput('name',e)} value={this.state.name} placeholder="Enter Name" /><br />
                    <input onChange={(e)=>this.changeInput('price',e)}  value={this.state.price} placeholder="Enter Price" type="number" /><br />
                    <input onChange={(e)=>this.changeInput('address',e)}  value={this.state.address} placeholder="Enter address" /><br />
                    <input onChange={(e)=>this.changeInput('locality',e)}  value={this.state.locality} placeholder="Enter locality" /><br />
                    <input onChange={(e)=>this.changeInput('bedrooms',e)}  value={this.state.bedrooms} placeholder="Enter bedrooms" type="number" /><br />
                    <input onChange={(e)=>this.changeInput('baths',e)}  value={this.state.baths} placeholder="Enter baths" type="number" /><br />
                    <input onChange={(e)=>this.changeInput('carpetArea',e)}  value={this.state.carpetArea} placeholder="Enter carpet area" type="number" />
                    <input type="file" onChange={this.onFileChange} multiple={true} /> 
                </form>
                <button onClick={this.submitProperty}>Add</button>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProperty;