
import { Link, useLocation, useSearchParams,useParams } from "react-router-dom";
const Pagination = ({ pages }) => {
    const { total, currentPage,limit,  hasNext, hasPrev, next, prev } = pages;
    const totalPages = Math.ceil(total/limit);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const formatURL = (page) => {
        return `${location.pathname}?name=${searchParams.get("name")}&page=${page}`;
    }
    const renderPagesHTML = (delta = 2) => {
        const pages =[];
        const left = currentPage - delta;
        const right = currentPage + delta;
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === currentPage ||
                i === 1 || i === totalPages ||
                (i >= left) && (i <= right)
            ) {
                pages.push(i);
            }
        }
        return pages;
    }
    return (

        <ul className="pagination">
            {
                hasPrev?<li className="page-item"><Link className="page-link" to={formatURL(prev)}>Trang trước</Link></li>:null
            }
            {
                renderPagesHTML().map((value) =>
                    <li className={`page-item ${value===currentPage?"active":""}`}><Link className="page-link" to={formatURL(value)}>{value}</Link></li>
                )
            }
            {
                hasNext?<li className="page-item"><Link className="page-link" to={formatURL(next)}>Trang sau</Link></li>:null
            }
        </ul>
    )
}
export default Pagination;

