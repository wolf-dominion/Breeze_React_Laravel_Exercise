import React, { Component } from 'react'
import { Table, TableRow } from 'semantic-ui-react'

class CSVTable extends Component {

    render(){

        if(this.props.checkcsvTypePeople){
            return (    
                <div>
                    {this.props.data.length > 0 ? 
                    <Table celled padded>
                    <Table.Header>
                        <TableRow>
                            <Table.HeaderCell>People from CSV file:</Table.HeaderCell>
                        </TableRow>
                      <Table.Row>
                        <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
    
                    <Table.Body>
    
                    {
                        this.props.data.map((person, index) => {
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
                  </Table> : <p>There was a problem importing the CSV file.</p>}
                </div>
            )
        }
        if(this.props.checkcsvTypePeople === false){
            return (
                <div>
                    {this.props.data.length > 0 ? 
                        <Table celled padded>
                        <Table.Header>
                            <Table.Row>
                            <Table.HeaderCell singleLine>Groups</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {
                            this.props.data.map((group, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell singleLine>{ group.group_name }</Table.Cell>
                                    </Table.Row>
                                );
                                })
                        }
                        </Table.Body>
                    </Table> : <p>There was a problem importing the CSV file.</p>
                }
            </div>

            )
        }
        else {
            return <p>There was a problem importing the CSV file.</p>
        }
    }
}

export default CSVTable