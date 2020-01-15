import React from 'react'
import './Dashboard.css'
import moment from 'moment'

export default function Dashboard (props) {
  const vertical_line = {
    borderRight: '2px solid grey'
  }
  return (
    <div id='dashboardContainer'>
      <div>{moment().format('MMM, YYYY')}</div>
      <br />

      <table id='dashboardTable'>
        <thead>
          <tr>
            <th scope='col' style={vertical_line}>
              Income
            </th>
            <th scope='col' style={vertical_line}>
              Spending
            </th>
            <th scope='col'>Earning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0.2</td>
            <td>13.44</td>
            <td>322.22</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
