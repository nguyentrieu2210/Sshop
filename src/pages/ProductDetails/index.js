import React, { useEffect } from "react";
import { createCommentProduct, getComments, getProductDetails } from "../../services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { getImgProduct } from "../../shared/ultils";
import moment from "moment";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../shared/contants/action-type";

const ProductDetails = () => {
    const [productDetails, setProductDetails] = React.useState({});
    const [comments, setCommnets] = React.useState([]);
    const [changeInput, setChangeInput] = React.useState({});
    const params = useParams();
    const id = params.id;
    const ditpatch = useDispatch();
    const navigation = useNavigate();
    useEffect(() => {
        getProductDetails({}, id).then(({ data }) => setProductDetails(data.data));
        getComment();
    }, [id]);

    const addToCart = (action) => {
        if (productDetails) {
            const { _id, name, image, price } = productDetails;
            ditpatch({
                type: ADD_TO_CART,
                payLoad: {
                    _id,
                    name,
                    image,
                    price,
                    qty: 1,
                }
            });
        }
        if (action === "buy-now") {
            return navigation("/Cart");
        }
    }

    const getComment = () => {
        getComments({}, id).then(({ data }) => setCommnets(data.data.docs));
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setChangeInput({ ...changeInput, [name]: value });
        console.log(changeInput);
    }
    const onClickButton = (e) => {
        e.preventDefault();
        createCommentProduct(id, changeInput, {}).then(({ data }) => {
            if (data.status === "success") {
                setChangeInput({});
            }
            getComment();
        })
    }
    return (
        <div>
            {/*	List Product	*/}
            <div id="product">
                <div id="product-head" className="row">
                    <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                        <img src={getImgProduct(productDetails.image)} />
                    </div>
                    <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                        <h1>{productDetails.name}</h1>
                        <ul>
                            <li><span>Bảo hành:</span> 12 Tháng</li>
                            <li><span>Đi kèm:</span> {productDetails.accessories}</li>
                            <li><span>Tình trạng:</span> {productDetails.status}</li>
                            <li><span>Khuyến Mại:</span> {productDetails.promotion}</li>
                            <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                            <li id="price-number">{productDetails.price}đ</li>
                            <li id="status">Còn hàng</li>
                        </ul>
                        <div id="add-cart">
                            <button onClick={() => addToCart("buy-now")} className="btn btn-warning mr-2">
                                Mua ngay
                            </button>

                            <button onClick={addToCart} className="btn btn-info">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
                <div id="product-body" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Đánh giá về {productDetails.name}</h3>
                        {productDetails.details}
                    </div>
                </div>
                {/*	Comment	*/}
                <div id="comment" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Bình luận sản phẩm</h3>
                        <form method="post">
                            <div className="form-group">
                                <label>Tên:</label>
                                <input
                                    onChange={onChangeInput}
                                    name="name" required
                                    type="text"
                                    className="form-control"
                                    value={changeInput.name ? changeInput.value : ""}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    onChange={onChangeInput}
                                    name="email"
                                    required type="email"
                                    className="form-control"
                                    id="pwd"
                                    value={changeInput.email ? changeInput.value : ""}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nội dung:</label>
                                <textarea
                                    onChange={onChangeInput}
                                    name="content"
                                    required rows={8}
                                    className="form-control"
                                    value={changeInput.content ? changeInput.value : ""}
                                />
                            </div>
                            <button
                                onClick={onClickButton}
                                type="submit"
                                name="sbm"
                                className="btn btn-primary"
                            >Gửi</button>
                        </form>
                    </div>
                </div>
                {/*	End Comment	*/}
                {/*	Comments List	*/}
                <div id="comments-list" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        {
                            comments.map((value) =>
                                <div className="comment-item">
                                    <ul>
                                        <li><b>{value.name}</b></li>
                                        <li>{moment(value.createdAt).fromNow()}</li>
                                        <li>
                                            {value.content}
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </div>
                {/*	End Comments List	*/}
            </div>
            {/*	End Product	*/}
            <div id="pagination">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
                </ul>
            </div>
        </div>
    )
}
export default ProductDetails;