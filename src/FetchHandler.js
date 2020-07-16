import React, { Component } from 'react'

class FetchHandler extends Component {

    componentDidMount(){
        console.log("props? ", this.props)
        if (this.props.checkcsvTypePeople){
            this.createPersonObject()
        }
        if (!this.props.checkcsvTypePeople){
            this.createGroupObject()
        }
    }

    parseJSON = (response) => {
        return response.json()
    }
    
    postFetchPerson = (personToSave) => {
        console.log('person ready for fetch call', personToSave);
    }

    postFetchGroup = (groupToSave) => {
            const groupsURL = 'http://127.0.0.1:8000/api/groups/'
            fetch(groupsURL, {
                method: 'POST', 
                headers: {
                    'content-type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({group_name: groupToSave["group_name"]})
            }).then(this.parseJSON)
            .then(result =>{
                console.log('result:', result);
                return result
            })
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

    createPersonObject = () => {
        let allPeople = this.getAllPeople()
        let updatePeopleIds = []
        
        this.props.data.map(newPerson => {
            // check if id already exists
            let checkPersonExists
            checkPersonExists = allPeople.find(person => person.id === newPerson.id)

            if(checkPersonExists){
                updatePeopleIds.push(checkPersonExists.id)
            }

            if(!checkPersonExists){

                const personToSave = {
                      first_name: newPerson.first_name,
                      last_name: newPerson.last_name,
                      email_address: newPerson.email_address,
                      status: newPerson.status,
                      group_id: newPerson.group_id  
                  }
                  this.postFetchPerson(personToSave)
            }
        })
            
        // if(updatePeopleIds.length > 0){
        //     // need to update these ids: {updatePeopleIds.map(id => { id})}
        // }
        // alert("People save to website!")
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
        // alert("Groups save to website!")
    }

    render(){
        return (
            <p>Fetch Handler</p>
        )
    }
}

export default FetchHandler