import React, { Component } from 'react'
import CSVReader from "react-csv-reader";
import { Table } from 'semantic-ui-react'

class CSVImport extends Component {

    state = {
        csvFile: false,
        csvFileGroups: false,
        csvFilePeople: false,
        dBGroups: "test"
    }

    // componentDidUpdate(){
    //     console.log('props? ', this.props)
    //     this.setState({dBGroups: "props detected"})
    // }

    componentDidMount(){
        this.fetchPeopleAndGroups()
    }

    fetchPeopleAndGroups = () => {
        fetch("http://localhost:8000/api/people")
        .then(response => response.json())
        .then(data => this.setState({ people: data.data }));
    
        fetch("http://localhost:8000/api/groups")
        .then(response => response.json())
        .then(data => this.setState({ groups: data.data }));
    }
    
    render(){
        return(
            <div>
                <p>Below, choose a CSV file for either a list of people or groups. </p>
            </div>
        )
    }

}

export default CSVImport