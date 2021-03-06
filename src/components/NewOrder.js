import React, { useReducer, useState } from 'react'
import { useHistory } from 'react-router-dom'
import reducer, {
  ADD_ITEM,
  EDIT_ITEM,
  EDIT_GENERAL_INFO,
  CHANGE_TYPE
} from '../reducer/application'
import axios from 'axios'
import './NewOrder.css'
import DropdownList from './DropdownList'
import ButtonIcon from './ButtonIcon'
import Checkbox from '@material-ui/core/Checkbox'

export default function NewOrder (props) {
  const [newOrder, dispatch] = useReducer(reducer, {
    email: props.auth.email,
    customer_name: '',
    order_status: '',
    address: '',
    phone_number: '',
    note: '',
    items: {
      1: { description: '', price: '', quantity: '' },
      2: { description: '', price: '', quantity: '' },
      3: { description: '', price: '', quantity: '' }
    },
    type: 'earning'
  })
  let history = useHistory()

  const [errorCheck, setErrorCheck] = useState(false)

  function addItem () {
    let id = Object.keys(newOrder.items).length + 1
    dispatch({ type: ADD_ITEM, id: id })
  }

  function onGeneralInfoChange (event, current_field) {
    dispatch({
      type: EDIT_GENERAL_INFO,
      value: event.target.value,
      field: current_field
    })
  }

  function onChangeHandler (event, id, current_field) {
    dispatch({
      type: EDIT_ITEM,
      id: id,
      value: event.target.value,
      field: current_field
    })
  }

  function handleSubmit () {
    if (newOrder.customer_name && newOrder.order_status) {
      axios
        .post('/api/create', { newOrder: newOrder })
        .then(() => {
          props.setRefresh(prev => prev + 1)
          history.push('/lists')
        })
        .catch(err => console.log(err))
      setErrorCheck(false)
    } else {
      setErrorCheck(true)
    }
  }

  const [checked, setChecked] = useState({ earning: true, spending: false })

  const handleChange = () => {
    checked.earning
      ? switchBetweenEarningSpending('spending')
      : switchBetweenEarningSpending('earning')
  }

  const switchBetweenEarningSpending = type => {
    if (type === 'earning') setChecked({ earning: true, spending: false })
    if (type === 'spending') setChecked({ earning: false, spending: true })
    dispatch({
      type: CHANGE_TYPE,
      value: type
    })
  }

  return (
    <React.Fragment>
      {errorCheck && (
        <div id='errorEmpty'>Please enter Customer Name and Status.</div>
      )}

      <span>Earning</span>
      <Checkbox
        checked={checked.earning}
        onChange={handleChange}
        value='secondary'
        color='primary'
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <span>Spending</span>
      <Checkbox
        checked={checked.spending}
        onChange={handleChange}
        value='primary'
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <div id='newOrderTable'>
        <table className='box-table'>
          <thead id='tableHead'>
            <tr id='order_id'>
              <th>Order ID</th>
              <th></th>
              <th>Date Created</th>
              <th></th>
            </tr>
            <tr id='customer_status'>
              <th>Customer</th>
              <th>
                <input
                  onChange={event =>
                    onGeneralInfoChange(event, 'customer_name')
                  }
                  value={newOrder.customer_name}
                ></input>
              </th>
              <th>Order Status</th>
              <th>
                <span>{newOrder.order_status}</span>
                <DropdownList onGeneralInfoChange={onGeneralInfoChange} />
              </th>
            </tr>
            <tr>
              <th scope='col'>Product</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Price</th>
              <th scope='col'>Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(newOrder.items).map((id, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      onChange={event =>
                        onChangeHandler(event, id, 'description')
                      }
                      value={newOrder.items[id].description}
                    ></input>
                  </td>
                  <td>
                    <input
                      onChange={event => onChangeHandler(event, id, 'price')}
                      value={newOrder.items[id].price}
                    ></input>
                  </td>
                  <td>
                    <input
                      onChange={event => onChangeHandler(event, id, 'quantity')}
                      value={newOrder.items[id].quantity}
                    ></input>
                  </td>
                  <td>
                    {newOrder.items[id].price * newOrder.items[id].quantity}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <thead id='tableHead'>
            <tr id='order_id'>
              <th>Note:</th>
              <th colSpan='3'>
                <input
                  onChange={event => onGeneralInfoChange(event, 'note')}
                  value={newOrder.note}
                ></input>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div id='button_group'>
        <ButtonIcon icon_type='add' action={addItem} />
        <ButtonIcon icon_type='check' action={handleSubmit} />
      </div>
      <hr />
    </React.Fragment>
  )
}
