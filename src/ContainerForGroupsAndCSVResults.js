import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import DisplayPeopleInGroup from './DisplayPeopleInGroup'
//import DisplayGroups from './DisplayGroups'

class ContainerForGroupsAndCSVResults extends Component {

    state = {
        dBGroups: [],
        dBPeople: [],
        panes: []
    }

    // get groups and people from DB and set to state
    componentDidMount() {
        this.getDBGroups()
        //getDBPeople
    }

    getDBGroups = () => {
        fetch("http://localhost:8000/api/groups")
        .then(response => response.json())
        .then(this.setDBGroupsToState)
        .then(this.displayGroups)
    }

    setDBGroupsToState = (data) => {
        this.setState({ dBGroups: data.data })
    }

    displayGroups = () =>{
        console.log("groups: ", this.state.dBGroups)

        let updatedPanes = []

        this.state.dBGroups.map(group => {
            updatedPanes.push({ 
                    menuItem: `${group.group_name}`, 
                    render: () => 
                        <Tab.Pane>
                            <DisplayPeopleInGroup group={group}/>
                        </Tab.Pane> })
                    })

        this.setState({panes: updatedPanes})

    }

    groupTabs = () => (
        <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={this.state.panes} />
    )

    render(){

        // const {dBGroups} = this.state

        return(
            <div>
                <p>Hi, I'm a container</p>
                {/* <DisplayGroups dBGroups={dBGroups}/> */}
                {this.groupTabs()}
            </div>
        )
    }

}

export default ContainerForGroupsAndCSVResults