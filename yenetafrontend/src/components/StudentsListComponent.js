import React, {Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

export default class Studentlist extends Component{

    render(){
        return (
            <div>
                <h4 className="text-center">Student List</h4>
                <table className="table table-striped table-bordered table-hover tablestyle">
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Country</th>
                    <th>Level</th>
                    <tr>
                       <td>Helina taye</td> 
                       <td>Helu</td> 
                       <td>Helu@gmail.com</td> 
                       <td>12</td> 
                       <td>Canada</td> 
                       <td>Beginner</td> 
                    </tr>
                    <tr>
                       <td>Kalkidan Urga</td> 
                       <td>Kali</td> 
                       <td>Kali@gmail.com</td> 
                       <td>13</td> 
                       <td>England</td> 
                       <td>Beginner</td> 
                    </tr>
                    <tr>
                       <td>Hiwot Tadesse</td> 
                       <td>Hiwi</td> 
                       <td>Hiwi@gmail.com</td> 
                       <td>12</td> 
                       <td>Russia</td> 
                       <td>Intermediate</td> 
                    </tr>
                    <tr>
                       <td>Hanna Dereje</td> 
                       <td>Hanna</td> 
                       <td>Hanna@gmail.com</td> 
                       <td>17</td> 
                       <td>America</td> 
                       <td>Intermediate</td> 
                    </tr>
                </table>
            </div>
        )

    }
}