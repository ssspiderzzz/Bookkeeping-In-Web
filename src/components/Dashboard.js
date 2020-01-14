import React from 'react'
import './Dashboard.css'

export default function Dashboard (props) {
  return (
    <div id='dashboardContainer'>
      <div>Log in as {props.auth.user}</div>
    </div>
  )
}
