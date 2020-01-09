import React, { useState } from 'react'
import EachOrder from './EachOrder'
import EditOrder from './EditOrder'
import './Table.css'
import Loading from './Loading'

export default function Table (props) {
  const [editID, setEditID] = useState('')

  return (
    <React.Fragment>
      {props.orders ? (
        props.orders.map((order, order_index) => {
          // changing the format of items from array to object
          // keeping codes consistancy between NewOrder and EditOrder pages
          const order_items = {}
          props.items
            .filter(item => item.order_id === order.id)
            .map((item, item_index) => (order_items[item_index] = item))
          return (
            <React.Fragment key={order_index}>
              {order.id !== editID && (
                <EachOrder
                  order={order}
                  items={order_items}
                  setEditID={setEditID}
                  setRefresh={props.setRefresh}
                />
              )}
              {order.id === editID && (
                <EditOrder
                  order={order}
                  items={order_items}
                  setEditID={setEditID}
                  setRefresh={props.setRefresh}
                />
              )}
            </React.Fragment>
          )
        })
      ) : (
        <Loading />
      )}
    </React.Fragment>
  )
}
