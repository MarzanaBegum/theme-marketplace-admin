import React, { useState } from "react";
import ProductDetailCardItem from "../../../components/ProductDetailCardItem";
import moment from "moment";

const ProductDetailCard = ({ data, filterValue }: any) => {
    const current = moment(moment().format()).format("YY-MM");
    const date = new Date();
    const month = new Date().getMonth();
    const prevMonth = date.setMonth(month - 1);
    const formatePreviousMonth = moment(moment(prevMonth).format()).format(
        "YY-MM"
    );
    const productsData = data ? data?.products : [];

    const currentMonthProduct = filterByDate(productsData, current);
    const preMonthProduct = filterByDate(productsData, formatePreviousMonth);
    const productPercent = getPercentage(
        currentMonthProduct?.length,
        preMonthProduct?.length
    );

    const currentMonthView = getTotalAmount(currentMonthProduct);
    const preMonthView = getTotalAmount(preMonthProduct);
    const productViewPercent = getPercentage(currentMonthView, preMonthView);

    const currentMonthTopDown = getTopDownProduct(currentMonthProduct);
    const preMonthTopDown = getTopDownProduct(preMonthProduct);
    const productTopDownPercent = getPercentage(
        currentMonthTopDown,
        preMonthTopDown
    );

    const currentMonthTrendProduct = getTrendingProducts(
        currentMonthProduct,
        filterValue
    );
    const preMonthTrendProduct = getTrendingProducts(
        preMonthProduct,
        filterValue
    );
    const trendProductPercent = getPercentage(
        currentMonthTrendProduct,
        preMonthTrendProduct
    );

    return (
        <div className="grid grid-cols-1 gap-[8px] py-[16px] lg:grid-cols-2 xl:grid-cols-3 lg:gap-[16px] 3xl:grid-cols-4 3xl:gap-[24px] 3xl:py-[24px] place-content-center">
            <ProductDetailCardItem
                title="Total products"
                image="/images/total-product.svg"
                totalProducts={getTotalProduct(productsData, filterValue)}
                benefitPercent={productPercent}
                isViewed={false}
                isLess={
                    currentMonthProduct?.length < preMonthProduct?.length
                        ? true
                        : false
                }
            />
            <ProductDetailCardItem
                title="Total Viewed Products"
                image="/images/view-product.svg"
                totalProducts={getTotalViewedProducts(
                    productsData,
                    filterValue
                )}
                benefitPercent={productViewPercent}
                isViewed={true}
                isLess={
                    currentMonthProduct?.length < preMonthProduct?.length
                        ? true
                        : false
                }
            />
            <ProductDetailCardItem
                title="Top Downloaded"
                image="/images/total-product.svg"
                totalProducts={getTopDownloadedProducts(
                    productsData,
                    filterValue
                )}
                benefitPercent={productTopDownPercent}
                isViewed={false}
                isLess={currentMonthTopDown < preMonthTopDown ? true : false}
            />
            <ProductDetailCardItem
                title="Trending Product"
                image="images/total-product.svg"
                totalProducts={getTrendingProducts(productsData, filterValue)}
                benefitPercent={trendProductPercent}
                isViewed={false}
                isLess={
                    currentMonthTrendProduct < preMonthTrendProduct
                        ? true
                        : false
                }
            />
        </div>
    );
};

function getTotalProduct(data: any, filterValue: any) {
    const nowMilis = Date.now();
    const prevMilis = getFilterMilis(filterValue);
    const filterMilis = nowMilis - prevMilis;
    const filterData =
        data &&
        data?.filter((v: any) => {
            const dataMilis = new Date(v.createdAt).getTime();
            if (dataMilis > filterMilis) {
                return v;
            }
        });
    return filterData?.length;
}

function getTotalViewedProducts(data: any, filterValue: any) {
    const nowMilis = Date.now();
    const prevMilis = getFilterMilis(filterValue);
    const filterMilis = nowMilis - prevMilis;
    const filterData =
        data &&
        data?.filter((v: any) => {
            const dataMilis = new Date(v.createdAt).getTime();
            if (dataMilis > filterMilis) {
                return v;
            }
        });
    let totalview = 0;
    filterData &&
        filterData?.forEach((v: any) => {
            if (v?.views) {
                totalview += v.views;
            }
        });
    return totalview;
}

function getTopDownloadedProducts(data: any, filterValue: any) {
    const nowMilis = Date.now();
    const prevMilis = getFilterMilis(filterValue);
    const filterMilis = nowMilis - prevMilis;
    const filterData =
        data &&
        data?.filter((v: any) => {
            const dataMilis = new Date(v.createdAt).getTime();
            if (dataMilis > filterMilis) {
                return v;
            }
        });

    const sortData =
        filterData &&
        filterData?.sort((a: any, b: any) =>
            a.downloads > b.downloads ? -1 : 1
        );
    // console.log("sortData",sortData)
    if (sortData?.length === 0) {
        return 0;
    } else {
        return sortData && sortData[0]?.downloads;
    }
}

function getTopDownProduct(data: any) {
    const sortData =
        data &&
        data?.sort((a: any, b: any) => (a.downloads > b.downloads ? -1 : 1));
    return sortData?.length ? sortData[0]?.downloads : 0;
}
function getTrendingProducts(data: any, filterValue: any) {
    const nowMilis = Date.now();
    const prevMilis = getFilterMilis(filterValue);
    const filterMilis = nowMilis - prevMilis;
    const allProduct =
        data &&
        data?.filter((v: any) => {
            const dataMilis = new Date(v.createdAt).getTime();
            if (dataMilis > filterMilis) {
                return v;
            }
        });
    // const nowMilis = Date.now();
    // const filterMilis = nowMilis - 6.048e8;

    const filterData =
        allProduct &&
        allProduct?.filter(
            (v: any) => new Date(v.createdAt).getTime() > Date.now() - 6.048e8
        );
    const sortData =
        filterData &&
        filterData?.sort((a: any, b: any) => (a.views > b.views ? -1 : 1));

    return sortData?.length ? sortData[0].views : 0;
}

const getPercentage = (thisMonthValue: any, previousMonthValue: any) => {
    const today = thisMonthValue;
    const prevDay = previousMonthValue;
    if (!today && !prevDay) {
        return 0;
    } else if (!today) {
        return -100;
    } else if (!prevDay) {
        return 100;
    } else {
        const bigValue = today > prevDay ? today : prevDay;
        return ((today - prevDay) * 100) / bigValue;
    }
};

const getTotalAmount = (data: any) => {
    let totalview = 0;
    data &&
        data?.forEach((v: any) => {
            if (v?.views) {
                totalview += v.views;
            }
        });
    return totalview;
};

const filterByDate = (data: any, month: any) => {
    const currentRevenue =
        data &&
        data?.filter(
            (v: any) =>
                moment(moment(v.createdAt).format()).format("YY-MM") === month
        );
    return currentRevenue;
};
export default ProductDetailCard;

const getFilterMilis = (filter: string): number => {
    switch (filter) {
        case "month":
            return 2.628e9;
        case "hour":
            return 3.6e6;
        case "week":
            return 6.048e8;
        case "year":
            return 3.154e10;
        default:
            return 0;
    }
};
