import React from 'react'
import './Dashboard.css'
import moment from 'moment'

export default function Dashboard (props) {
  const vertical_line = {
    borderRight: '2px solid grey'
  }
  // console.log(props.data.items)
  let income = 0
  let spending = 0
  props.data.items.forEach(i => {
    if (i.sub_total > 0) income += i.sub_total

    if (i.sub_total < 0) spending += i.sub_total
  })
  let earning = income - spending
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
            <td>{income}</td>
            <td>{spending}</td>
            <td>{earning}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
