import React, { Component } from 'react'

class FetchHandler extends Component {

    componentDidMount(){
        console.log("props? ", this.props)
        if (this.props.checkcsvTypePeople){
            this.postFetchPerson()
        }
        if (!this.props.checkcsvTypePeople){
            this.createGroupObject()
        }
    }

    parseJSON = (response) => {
        return response.json()
    }
    
    postFetchPerson = () => {
        let allPeople = this.getAllPeople()
        
    }

    postFetchGroup = (groupToSave) => {
        console.log('ready to do fetch call!', groupToSave);
        
    }

    getAllPeople = () => {
        let peopleArray = []
        if (this.props.DBGroups.length > 0){
            this.props.DBGroups.map(person => {
                peopleArray.push(person)
            })
        }
        else {
            return null
        }
        return peopleArray
    }

    createGroupObject = () => {

        let idsToUpdate = []
        
        this.props.data.map(newGroup => {
            // check if id already exists
            let checkGroupExists
            checkGroupExists = this.props.DBGroups.find(group => group.id === newGroup.id)

            if(checkGroupExists){
                idsToUpdate.push(checkGroupExists.id)
            }

            if(!checkGroupExists){

                const groupToSave = {
                      group_name: newGroup.group_name
                  }

                  this.postFetchGroup(groupToSave)
            }
        })
            
        if(idsToUpdate.length > 0){
            // need to update these ids: {problemIds.map(id => { id})}
        }
    }

    render(){
        return (
            <p>Fetch Handler</p>
        )
    }
}

export default FetchHandler