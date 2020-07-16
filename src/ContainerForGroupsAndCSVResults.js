import React, { Component } from 'react'

import DisplayGroups from './DisplayGroups'

class ContainerForGroupsAndCSVResults extends Component {

    state = {
        dBGroups: [],
        dBPeople: []
    }

    // get groups and people from DB and set to state
    componentDidMount() {
        this.getDBGroups()
        //getDBPeople
    }

    getDBGroups = () => {
        fetch("http://localhost:8000/api/groups")
        .then(response => response.json())
        .then(data => this.setState({ dBGroups: data.data }));
    }

    render(){

        const {dBGroups} = this.state

        return(
            <div>
                <p>Hi, I'm a container</p>
                <DisplayGroups dBGroups={dBGroups}/>
            </div>
        )
    }

}

export default ContainerForGroupsAndCSVResults