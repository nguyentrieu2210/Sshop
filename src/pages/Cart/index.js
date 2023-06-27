import { useDispatch, useSelector } from "react-redux";
import { getImgProduct } from "../../shared/ultils";
import { DELETE_ITEM_CART, UPDATE_CART } from "../../shared/contants/action-type";
import React from "react";
import { order } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const [changeInput, setOnChangeInput] = React.useState(null);
    const navigate = useNavigate();
    const carts = useSelector(({ Cart }) => {
        return Cart.items;
    });
    const moneyTotal = carts.reduce((total, item) => {
        return total + item.qty * item.price;
    }, 0);
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setOnChangeInput({ ...changeInput, [name]: value });
    }
    const orderNow = (e) => {
        e.preventDefault();
        const items = carts.map((item) => ({
            prd_id: item._id,
            qty: item.qty,
        }));
        order({
            ...changeInput,
            items,
        }, {}).then(({data})=> {
            if (data.status === "success") {
                setOnChangeInput(null);
                localStorage.clear();
                navigate("/Success");
                console.log({
                    ...changeInput,
                    items,
                });
            }
        });
    }
    const updateCart = (e, _id) => {
        const value = parseInt(e.target.value);
        if (value <= 0) {
            // eslint-disable-next-line no-restricted-globals
            const isConfirm = confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?");
            if (isConfirm) {
                dispatch({
                    type: DELETE_ITEM_CART,
                    payLoad: {
                        _id,
                    }
                })
            }
        }
        dispatch({
            type: UPDATE_CART,
            payLoad: {
                _id,
                qty: value,
            }
        })
    }
    const deleteItemCart = (e, _id) => {
        e.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        const isConfirm = confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?");
        if (isConfirm) {
            dispatch({
                type: DELETE_ITEM_CART,
                payLoad: {
                    _id,
                }
            })
        }
    }
    return (
        <>
            {/*	Cart*/}
            <div id="my-cart">
                <div className="row">
                    <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
                    <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div>
                    <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
                </div>
                <form method="post">
                    {
                        carts.map((item) =>
                            <div className="cart-item row">
                                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                    <img src={getImgProduct(item.image)} />
                                    <h4>{item.name}</h4>
                                </div>
                                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                                    <input
                                        onChange={(e) => updateCart(e, item._id)}
                                        type="number"
                                        id="quantity"
                                        className="form-control form-blue quantity"
                                        value={item.qty}
                                    />
                                </div>
                                <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{item.price * item.qty}đ</b>
                                    <a onClick={(e) => deleteItemCart(e, item._id)} href="">Xóa</a></div>
                            </div>
                        )
                    }
                    <div className="row">
                        <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div>
                        <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{moneyTotal}đ</b></div>
                    </div>
                </form>
            </div>
            {/*	End Cart	*/}
            {/*	Customer Info	*/}
            <div id="customer">
                <form method="post">
                    <div className="row">
                        <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                            <input
                                onChange={onChangeInput}
                                placeholder="Họ và tên (bắt buộc)"
                                type="text" name="name"
                                className="form-control" required
                                value={changeInput ? changeInput.name : ""}
                            />
                        </div>
                        <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                            <input
                                onChange={onChangeInput}
                                placeholder="Số điện thoại (bắt buộc)"
                                type="text" name="phone"
                                className="form-control" required
                                value={changeInput ? changeInput.phone : ""}
                            />
                        </div>
                        <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                            <input
                                onChange={onChangeInput}
                                placeholder="Email (bắt buộc)"
                                type="text" name="email"
                                className="form-control" required
                                value={changeInput ? changeInput.email : ""}
                            />
                        </div>
                        <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                            <input
                                onChange={onChangeInput}
                                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                                type="text" name="address"
                                className="form-control" required
                                value={changeInput ? changeInput.address : ""}
                            />
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <a onClick={orderNow} href="#">
                            <b>Mua ngay</b>
                            <span>Giao hàng tận nơi siêu tốc</span>
                        </a>
                    </div>
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <a href="#">
                            <b>Trả góp Online</b>
                            <span>Vui lòng call (+84) 0988 550 553</span>
                        </a>
                    </div>
                </div>
            </div>
            {/*	End Customer Info	*/}
        </>
    )
}
export default Cart;