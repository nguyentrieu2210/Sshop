import React from "react";
import { useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
const Header = () => {
    const [search, setSearch] = React.useState("");
    const nagative = useNavigate();
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const onClickSearch = (e) => {
        e.preventDefault();
        nagative(`/Search?name=${search}`);
        setSearch("");
    }
    const totalCart = useSelector(({Cart})=> {
        return Cart.items.reduce((total, item)=> total+item.qty,0);
    })
    return (
        <div id="header">
            <div className="container">
                <div className="row">
                    <div id="logo" className="col-lg-3 col-md-3 col-sm-12">
                        <h1><Link to="/"><img className="img-fluid" src="images/logo.png" /></Link></h1>
                    </div>
                    <div id="search" className="col-lg-6 col-md-6 col-sm-12">
                        <form className="form-inline">
                            <input onChange={onChangeSearch} className="form-control mt-3" type="search" placeholder="Tìm kiếm" value={search} aria-label="Search" />
                            <button onClick={onClickSearch} className="btn btn-danger mt-3" type="submit">Tìm kiếm</button>
                        </form>
                    </div>
                    <div id="cart" className="col-lg-3 col-md-3 col-sm-12">
                        <Link className="mt-4 mr-2" to="/Cart">giỏ hàng</Link><span className="mt-3">{totalCart}</span>
                    </div>
                </div>
            </div>
            {/* Toggler/collapsibe Button */}
            <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#menu">
                <span className="navbar-toggler-icon" />
            </button>
        </div>
    )
}
export default Header;