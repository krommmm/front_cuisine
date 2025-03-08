import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePagination(articles, itemsPerPage = 10, range = 2) {

    const location = useLocation();
    const [width, setWidth] = useState(document.body.clientWidth);
    const [currentPage, setCurrentPage] = useState(getCurrentPage());
    const [pagination, setPagination] = useState({
        pageName: "",
        totalItems: 0,
        itemsPerPage: itemsPerPage,
        range: range,
        currentPage: 1,
        rangeArr: [],
        filterArticleByPage: [],
        currentCategory: "",
        search: null
    });



    useEffect(() => {
        setCurrentPage(getCurrentPage());
        const currentPage = getCurrentPage();
        const pageName = getPageName();
        const bodyWidth = document.body.clientWidth;
        let nbItemsPerPage = itemsPerPage;
        if (bodyWidth <= 700) {
            setPagination((prevState) => ({ ...prevState, itemsPerPage: 4 }));
            nbItemsPerPage = 4;
        }
        const totalPages = Math.ceil(articles.length / nbItemsPerPage);
        const rangeArr = getPageRange(currentPage, totalPages, range);
        const filterArticleByPage = getFilterArticlesByPage();
        const searchedValue = getSearchParams();
        const urlParams = getUrlParams();

        setPagination({
            pageName: pageName,
            totalItems: articles.length,
            itemsPerPage,
            range,
            currentPage: currentPage,
            rangeArr,
            filterArticleByPage: filterArticleByPage,
            searchedValue: searchedValue,
            urlParams: urlParams
        });

    }, [articles, itemsPerPage, range, location.search]);



    function getSearchParams() {
        const str = window.location.href;
        const url = new URL(str);
        return url.searchParams.get("searchedArticles");
    }

    function getUrlParams() {
        const str = window.location.href;
        const url = new URL(str);
        return {
            category: url.searchParams.get("category") || "",
            tag: url.searchParams.get("tag") || ""
        }
    }

    function getCurrentPage() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get("page")) || 1;
    };

    function getPageName() {
        const prePathname = window.location.pathname;
        return prePathname.split("/")[1];
    };



    function getFilterArticlesByPage() {
        const page = getCurrentPage();
        const nbItemsPerPage = pagination.itemsPerPage;
        const bodyWidth = document.body.clientWidth;
        let myItemsPerPage = null;
        if (bodyWidth <= 700) {
            setPagination((prevState) => ({ ...prevState, itemsPerPage: 4 }));
            myItemsPerPage = 4;
        } else {
            myItemsPerPage = nbItemsPerPage;
        }
        const filteredArticlesByPage = [];
        for (let i = ((page - 1) * myItemsPerPage); i < (page * myItemsPerPage); i++) {
            if (i + 1 > articles.length) break;
            filteredArticlesByPage.push(articles[i]);
        }

        return filteredArticlesByPage;
    }

    function getPageRange(currentPage, totalPages, rangeSize = 4) {

        const half = Math.floor(rangeSize / 2);
        let start = Math.max(1, currentPage - Math.floor(half));
        let end = currentPage + half;

        if (currentPage + half > totalPages) {
            end = totalPages;
            const diff = currentPage + half - totalPages;
            start = Math.max(1, start - diff);
        } else if (currentPage - half < start) {
            const diff = half - currentPage;
            end = end + diff;
        }

        const rangeArr = [];

        for (let i = start; i < end + 1; i++) {
            rangeArr.push(i);
        }
        if (start !== 1) {
            // creation de : 1 ...
            rangeArr.unshift(1);
            if (start > 2) rangeArr.splice(1, 0, '...');
        }
        if (end !== totalPages) {
            // creation de : ... totalPages
            if (end < totalPages - 1) rangeArr.push('...');
            rangeArr.push(totalPages);
        }

        return rangeArr;

    }

    return pagination;

}