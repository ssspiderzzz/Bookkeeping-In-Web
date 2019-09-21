export const ADD_ITEM = "ADD_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";

export default function reducer(orderDetails, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...orderDetails,
        items: {
          ...orderDetails.items,
          [action.id]: {
            product: "",
            unit: "",
            price: ""
          }
        }
      };
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
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
