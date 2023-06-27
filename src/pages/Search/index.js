import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getSearch } from "../../services/Api";
import ProductItem from "../../shared/components/Product-item";
import Pagination from "../../shared/components/Pagination";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = React.useState([]);
    const [pages, setPages] = React.useState({
        limit:9,
    });
    const searchInput = searchParams.get("name");
    const page = searchParams.get("page")||1;
    useEffect(() => {
        getProducts({
            params: {
                name: searchInput,
                page: page,
                limit:9
            }
        }).then(({ data }) => {
            setSearch(data.data.docs);
            setPages({...pages, ...data.data.pages});
        });
    }, [searchInput, page])
    return (
        <div>
            <div className="products">
                <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{searchInput}</span></div>
                <div className="product-list card-deck">
                    {
                        search?.map((value) =>
                            <ProductItem item={value} />
                        )
                    }
                </div>
            </div>
            {/*	End List Product	*/}
            <div id="pagination">
            <Pagination pages = {pages}/>
            </div>
        </div>

    )
}
export default Search;