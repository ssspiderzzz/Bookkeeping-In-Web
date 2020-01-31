import React from 'react'
import './Dashboard.css'
import moment from 'moment'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import history from '../history'
import arrow_right from './images/arrow-right.png'

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
      <div className='dates'>{moment().format('MMM, YYYY')}</div>
      <br />
      <table id='dashboardTable'>
        <thead>
          <tr>
            <th scope='col' style={vertical_line}>
              Earning
            </th>
            <th scope='col' style={vertical_line}>
              Spending
            </th>
            <th scope='col'>Profit</th>
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
      <div id='AddCircleIconFamily'>
        <span style={{ marginRight: '3vw' }}>Create New</span>
        <span id='ArrowRightFamily'>
          <img id='ArrowRight1' src={arrow_right} alt='' />
          <img id='ArrowRight2' src={arrow_right} alt='' />
          <img id='ArrowRight3' src={arrow_right} alt='' />
        </span>
        <span>
          <AddCircleIcon
            id='AddCircleIcon'
            onClick={() => history.push('/new')}
            color='primary'
            fontSize='inherit'
          />
        </span>
      </div>
    </div>
  )
}
