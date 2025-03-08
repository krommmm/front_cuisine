import { NavLink } from "react-router-dom";

export function Page({ pageInfo, category }) {

    return (

        <div className="pageContainer">

            {pageInfo.rangeArr.map((cell, i) =>
                cell === "..." ? (
                    <span key={i} className="dots">...</span>
                ) : (
                    <NavLink key={i} className={pageInfo.currentPage === i + 1 ?
                        "pageCube currentPage" : "pageCube"}
                        to={pageInfo.pageName === "searchedProducts" ?
                            `/${pageInfo.pageName}?page=${cell}&searchedArticles=${pageInfo.searchedValue}`
                            :
                            `/${pageInfo.pageName}?page=${cell}&category=${pageInfo.urlParams.category}&tag=${pageInfo.urlParams.tag}`}>
                        {cell}
                    </NavLink>
                )
            )}

        </div>
    );
}



