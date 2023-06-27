import { Link, useLocation } from "react-router-dom";
import { getImgProduct } from "../ultils";

const ProductItem = ({item}) => {
    const loaction = useLocation();
    return (
        <div className="product-item card text-center">
            <Link to={`/ProductDetails-${item._id}`}><img src={getImgProduct(item.image)} /></Link>
            <h4><Link to={`/ProductDetails-${item._id}`}>{item.name}</Link></h4>
            <p>Giá Bán: <span>{item.price}đ</span></p>
        </div>
    )
}
export default ProductItem;