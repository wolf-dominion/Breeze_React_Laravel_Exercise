import React, { Component } from 'react'

class FetchHandler extends Component {

    componentDidMount(){
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
        const peopleURL = 'http://127.0.0.1:8000/api/people/'
        fetch(peopleURL, {
            method: 'POST', 
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                first_name: personToSave["first_name"],
                last_name: personToSave["last_name"],
                email_address: personToSave["email_address"],
                status: personToSave["status"],
                group_id: personToSave["group_id"]
            })
        }).then(this.parseJSON)
        .then(result =>{
            console.log('result:', result);
            return result
        })
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

    putFetchPerson = (personToUpdate) => {
        console.log('ready to update', personToUpdate);
        const personURL = `http://127.0.0.1:8000/api/people/${personToUpdate.id}`
        fetch(personURL, {
            method: 'PUT', 
            headers: {
                'content-type': 'multipart/form-data',
                Accept: 'application/json'
            },body: JSON.stringify({
                id: personToUpdate.id,
                first_name: personToUpdate["first_name"],
                last_name: personToUpdate["last_name"],
                email_address: personToUpdate["email_address"],
                status: personToUpdate["status"],
                group_id: personToUpdate["group_id"]
            })
        })
        .then(result =>{
            console.log('result:', result);
            return result
        })
    }

    putFetchGroup = (groupToUpdate) => {
        
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
                if (allPeople){
                    checkPersonExists = allPeople.find(person => person.id === newPerson.id)
                }

            if(checkPersonExists){
                updatePeopleIds.push(checkPersonExists)
            }

            if(!checkPersonExists && !allPeople){

                const personToSave = {
                      id: newPerson.id,  
                      first_name: newPerson.first_name,
                      last_name: newPerson.last_name,
                      email_address: newPerson.email_address,
                      status: newPerson.status,
                      group_id: newPerson.group_id  
                  }
                  this.postFetchPerson(personToSave)
            }
        })
            
        if(updatePeopleIds.length > 0){
            {updatePeopleIds.map(person => { 
                this.putFetchPerson(person)
            })}
        }
        // alert("People save to website!")
    }

    createGroupObject = () => {

        let idsToUpdate = []
        
        this.props.data.map(newGroup => {
            // check if id already exists
            let checkGroupExists
            checkGroupExists = this.props.DBGroups.find(group => group.id === newGroup.id)

            if(checkGroupExists){
                idsToUpdate.push(checkGroupExists)
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