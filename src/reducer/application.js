export const ADD_ITEM = 'ADD_ITEM'
export const EDIT_ITEM = 'EDIT_ITEM'
export const EDIT_GENERAL_INFO = 'EDIT_GENERAL_INFO'
export const CHANGE_TYPE = 'CHANGE_TYPE'

export default function reducer (orderDetails, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...orderDetails,
        items: {
          ...orderDetails.items,
          [action.id]: {
            description: '',
            quantity: '',
            price: ''
          }
        }
      }
    case EDIT_GENERAL_INFO:
      return {
        ...orderDetails,
        [action.field]: action.value
      }
    case EDIT_ITEM:
      return {
        ...orderDetails,
        items: {
          ...orderDetails.items,
          [action.id]: {
            ...orderDetails.items[action.id],
            [action.field]: action.value
          }
        }
      }
    case CHANGE_TYPE:
      return {
        ...orderDetails,
        type: action.value
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}
