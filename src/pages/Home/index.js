import React, { useEffect } from "react";
import { getProducts } from "../../services/Api";
import { getImgProduct } from "../../shared/ultils";
import ProductItem from "../../shared/components/Product-item";

const Home = () => {
    const [featureProducts, setFeatureProducts] = React.useState([]);
    const [latestProducts, setLatestProducts] = React.useState([]);
    useEffect(() => {
        getProducts({
            params: {
                limit: 6,
                "filter[is_featured]": true,
            }
        }).then(({ data }) => setFeatureProducts(data.data.docs));
        getProducts({
            params: {
                limit: 6,
            }
        }).then(({ data }) => {
            setLatestProducts(data.data.docs)
        });
    }, []);
    return (
        <>
            <div className="products">
                <h3>Sản phẩm nổi bật</h3>
                <div className="product-list card-deck">
                    {
                        featureProducts.map((value) =>
                            <ProductItem item = {value}/>
                        )
                    }
                </div>
            </div>
            {/*	End Feature Product	*/}
            {/*	Latest Product	*/}
            <div className="products">
                <h3>Sản phẩm mới</h3>
                <div className="product-list card-deck">
                    {
                        latestProducts.map((value) =>
                        <ProductItem item = {value}/>
                        )
                    }
                </div>
            </div>
            {/*	End Latest Product	*/}
        </>
    )
}
export default Home;