import React, { Component } from 'react'

class FetchHandler extends Component {

    componentDidMount(){
        console.log("props? ", this.props)
        if (this.props.checkcsvTypePeople){
            this.postFetchPerson()
        }
        if (!this.props.checkcsvTypePeople){
            this.postFetchGroup()
        }
    }
    
    postFetchPerson = () => {
        let allPeople = this.getAllPeople()
        console.log('all ppl', allPeople);
        
    }

    postFetchGroup = () => {

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

    render(){
        return (
            <p>Fetch Handler</p>
        )
    }
}

export default FetchHandler