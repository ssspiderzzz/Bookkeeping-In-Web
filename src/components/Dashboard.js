import React from 'react'
import './Dashboard.css'

export default function Dashboard (props) {
  const vertical_line = {
    borderLeft: '1px solid grey',
    height: '10px',
    margin: '5px'
  }
  return (
    <div id='dashboardContainer'>
      <div>Log in as {props.auth.user}</div>
      <br />
      <span>Income</span>
      <span style={vertical_line}></span>
      <span>Spending</span>
      <span style={vertical_line}></span>
      <span>Earning</span>
      <br />
      <span>0</span>
      <span style={vertical_line}></span>
      <span>2</span>
      <span style={vertical_line}></span>
      <span>13.31</span>
    </div>
  )
}
