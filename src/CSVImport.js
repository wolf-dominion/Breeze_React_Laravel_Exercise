import React, { Component } from 'react'
import CSVReader from "react-csv-reader";
import CSVTable from './CSVTable'

import FetchHandler from './FetchHandler'

class CSVImport extends Component {

    state = {
        csvFile: false,
        csvFileGroups: false,
        csvFilePeople: false,
        dBGroups: "",
        dBPeople: ""
    }

    componentDidMount(){
        this.fetchPeopleAndGroups()
    }

    fetchPeopleAndGroups = () => {
        fetch("http://localhost:8000/api/people")
        .then(response => response.json())
        .then(data => this.setState({ dBPeople: data.data }));
    
        fetch("http://localhost:8000/api/groups")
        .then(response => response.json())
        .then(data => this.setState({ dBGroups: data.data }));
    }

    handleForce = (data) => {
        // check if file is empty or not people/group
        if(data.length > 0){
            if(data[0].first_name){
                this.setState({csvFileExist: true, csvFilePeople: data, csvFileGroups: false})
            }
            else if(data[0].group_name){
                this.setState({csvFileExist: true, csvFileGroups: data, csvFilePeople: false})
            }
        }else {
            window.alert("We did not detect a CSV file for people or groups. Please upload proper file.")
        }

    }

    papaparseOptions = () => {
        return {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
            }
        };

    reader = () => {
        return <div className="container">
                    <CSVReader
                        cssClass="react-csv-input"
                        onFileLoaded={this.handleForce}
                        parserOptions={this.papaparseOptions()}
                    />
                </div>
        }
    
    render(){
        return(
            <div>
                <div>
                    <p>Below, choose a CSV file for either a list of people or groups. </p>
                    {this.reader()}
                </div>
                <div>
                    {this.state.csvFilePeople ? 
                        <div>
                            {<FetchHandler data={this.state.csvFilePeople} checkcsvTypePeople={true} DBGroups={this.state.dBPeople}/>} 
                            {<CSVTable data={this.state.csvFilePeople} checkcsvTypePeople={true}/>}
                        </div> : null}
                        
                    {this.state.csvFileGroups ?
                        <div> 
                            {<FetchHandler data={this.state.csvFileGroups} checkcsvTypePeople={false} DBGroups={this.state.dBGroups}/>}
                            {<CSVTable data={this.state.csvFileGroups} checkcsvTypePeople={false}/>}
                        </div> : null
                    }
                </div>
            </div>
        )
    }

}

export default CSVImport