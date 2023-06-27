import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getCategory, getProductsCategory } from "../../services/Api";
import ProductItem from "../../shared/components/Product-item";
import Pagination from "../../shared/components/Pagination";

const Category = () => {
    const [category, setCategory] = React.useState({});
    const [productsCategory, setProductsCategory] = React.useState([]);
    const [totalProduct, setTotalProduct] = React.useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pages, setPages] = useState({
        limit: 12,
    })
    const page = searchParams.get("page") || 1;
    const params = useParams();
    const id = params.id;
    useEffect(()=> {
        getCategory({}, id).then(({data})=> setCategory(data.data));
        getProductsCategory({
            params: {
                limit: 9,
                page: page,
            }
        }, id).then(({data}) => {
            setProductsCategory(data.data.docs);
            setTotalProduct(data.data.items.total);
            setPages({...pages, ...data.data.pages});
        });
    }, [id, page]);
    return (
        <>
            <div>
                <div className="products">
                    <h3>{category.name} (hiện có {totalProduct} sản phẩm)</h3>
                    <div className="product-list card-deck">
                        {
                            productsCategory.map((value) => 
                                <ProductItem item = {value}/>
                            )
                        }
                    </div>
                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                    <Pagination pages = {pages}/>
                </div>
            </div>
        </>
    )
}
export default Category;