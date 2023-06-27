import { ADD_TO_CART, DELETE_ITEM_CART, UPDATE_CART } from "../../shared/contants/action-type";
const initState = {
    items: [],
}

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART: return addItem(state, action.payLoad);
        case UPDATE_CART: return updateCart(state, action.payLoad);
        case DELETE_ITEM_CART: return deleteItemCart(state, action.payLoad);
        default: return state;
    }
}

const addItem = (state, payLoad) => {
    const items = state.items;
    let isProductExits = false;
    items.map((item) => {
        if (item._id === payLoad._id) {
            item.qty += payLoad.qty;
            isProductExits = true;
        }
        return item;
    });
    const newItems = isProductExits ? items : [...items, payLoad];
    localStorage.setItem("cart_items", JSON.stringify(newItems));
    return { ...state, items: newItems };
}
const updateCart = (state, payLoad) => {
    const items = state.items;
    const newItems = items.map((item)=> {
        if(item._id===payLoad._id) {
            item.qty = payLoad.qty;
        }
        return item;
    });
    return {...state, items: newItems}
}
const deleteItemCart = (state, payLoad) => {
    const items = state.items;
    const newItems = items.filter((item) => {
        return item._id != payLoad._id;
    });
    return { ...state, items: newItems };

}
