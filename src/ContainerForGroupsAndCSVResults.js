import React, { Component } from 'react'

class ContainerForGroupsAndCSVResults extends Component {

    state = {
        DBGroups: [],
        DBPeople: []
    }

    // get groups and people from DB and set to state
    componentDidMount() {
        this.getDBGroups()
        //getDBPeople
    }

    getDBGroups = () => {
        fetch("http://localhost:8000/api/groups")
        .then(response => response.json())
        .then(data => this.setState({ DBGroups: data.data }));
    }

    render(){
        return(
            <div>
                <p>Hi, I'm a container</p>
            </div>
        )
    }

}

export default ContainerForGroupsAndCSVResults