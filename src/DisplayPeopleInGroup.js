import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class DisplayPeopleInGroup extends Component {

    componentDidMount() {
        this.getActivePeople()
    }
    
    getActivePeople = () => {
        if (this.props.group.people.length > 0){
            return this.props.group.people.filter((p) => {return p.status === "active"})
        }
        else {
            return []
        }
    }

    render(){
        let activePeopleArray = this.getActivePeople()
        return(
            <div>
                <div>
                    {activePeopleArray.length > 0 ? 
                        
                    <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {
                            activePeopleArray.map((person, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                                        <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                                        <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                                        <Table.Cell singleLine>{ person.status }</Table.Cell>
                                    </Table.Row>
                                );
                            })
                        }
                        </Table.Body>
                    </Table>
                        : <p>No one is in this group</p>}
          </div>
            </div>
        )
    }

}

export default DisplayPeopleInGroup