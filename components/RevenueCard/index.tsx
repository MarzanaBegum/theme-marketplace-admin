import React, { useState } from "react";
import RevenueCardItem from "../../components/RevenueCardItem";
import moment from "moment";
import {
    BillingResponseType,
    UserStoreResponseType,
} from "../../api-call/useAnalyticsQuery";

const RevenueCard = ({ data, filterValue }: any) => {
    const current = moment(moment().format()).format("YY-MM");
    const date = new Date();
    const month = new Date().getMonth();
    const prevMonth = date.setMonth(month - 1);
    const formatePreviousMonth = moment(moment(prevMonth).format()).format(
        "YY-MM"
    );

    const billingData = data ? data?.allBilling : [];
    const productsData = data ? data?.products : [];
    const userStoreData = data ? data?.userStore : [];
    // ---------revenue data -------------
    const currentRevenue = filterSubscriptionByDate(billingData, current);
    const currentMontTotalRevenue = getTotalAmount(currentRevenue);
    const previousRevenue = filterSubscriptionByDate(
        billingData,
        formatePreviousMonth
    );
    const previousMonthTotalRevenue = getTotalAmount(previousRevenue);
    const revenuePercentage = getPercentage(
        currentMontTotalRevenue,
        previousMonthTotalRevenue
    );
    // total revenue ---------
    const currentTotalRevenue = filterByDate(billingData, current);
    const currentMontAllRevenue = getTotalAmount(currentTotalRevenue);
    const previoustotalRevenue = filterByDate(
        billingData,
        formatePreviousMonth
    );
    const previousMonthAllRevenue = getTotalAmount(previoustotalRevenue);
    const revenueTotalPercentage = getPercentage(
        currentMontAllRevenue,
        previousMonthAllRevenue
    );
    // total revenue end -----
    // ---------revenue data end  -------------
    // -----------total download ------------
    const currentMonthDownload = filterByDate(productsData, current);
    const currentTotalDownload = getTotalDownload(currentMonthDownload);
    const previousMonthDownload = filterByDate(
        productsData,
        formatePreviousMonth
    );
    const lastMonthTotalDownload = getTotalDownload(previousMonthDownload);
    const downloadPercentage = getPercentage(
        currentTotalDownload,
        lastMonthTotalDownload
    );
    // -----------total download end ------------

    // ---------- total subscriber--------------
    const currentMonthSubscriber = subscriberFilterByDate(
        userStoreData,
        current
    );
    const currentMonthTotalSubscriber = currentMonthSubscriber?.length;
    const lastMonthSubscriber = subscriberFilterByDate(
        userStoreData,
        formatePreviousMonth
    );
    const lastMonthTotalSubscriber = lastMonthSubscriber?.length;
    const subsCriberPercentage = getPercentage(
        currentMonthTotalSubscriber,
        lastMonthTotalSubscriber
    );
    // ---------- total subscriber end--------------
    // console.log(currentMonthDownload, "currentMonthDownload,______");
    return (
        <div className="mt-[19px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 3xl:gap-6 3xl:grid-cols-4 gap-[8px]">
            <RevenueCardItem
                indexNum="1"
                name="SUBCRIPTION REVENUE"
                isDoller="$"
                totalNum={getTotalSubscriptionRevenue(billingData, filterValue)}
                benefitPercent={revenuePercentage}
                isLess={
                    currentMontTotalRevenue < previousMonthTotalRevenue
                        ? true
                        : false
                }
            />
            <RevenueCardItem
                indexNum="2"
                name="REVENUE"
                isDoller="$"
                totalNum={getTotalRevenue(billingData, filterValue)}
                benefitPercent={revenueTotalPercentage}
                isLess={
                    currentMontTotalRevenue < previousMonthTotalRevenue
                        ? true
                        : false
                }
            />
            <RevenueCardItem
                indexNum="3"
                name="DOWNLOADS"
                isDoller=""
                totalNum={getTotalDownloads(productsData, filterValue)}
                benefitPercent={downloadPercentage}
                isLess={
                    currentTotalDownload < lastMonthTotalDownload ? true : false
                }
            />
            <RevenueCardItem
                indexNum="4"
                name="SUBSCRIBERS"
                isDoller=""
                totalNum={getTotalSubscriber(userStoreData, filterValue)}
                benefitPercent={subsCriberPercentage}
                isLess={
                    currentMonthTotalSubscriber < lastMonthTotalSubscriber
                        ? true
                        : false
                }
            />
        </div>
    );
};

function getTotalDownloads(data: any, filterValue: any) {
    const nowMilis = Date.now();
    const prevMilis = getFilterMilis(filterValue);
    const filterMilis = nowMilis - prevMilis;
    let totalSubscriptionRevenues = 0;
    const filterData =
        data &&
        data?.filter((v: any) => {
            const dataMilis = new Date(v.createdAt).getTime();
            if (dataMilis > filterMilis) {
                return v;
            }
        });
    let totalDownloads = 0;
    filterData &&
        filterData?.forEach((v: any) => {
            if (v?.downloads) {
                totalDownloads += v.downloads;
            }
        });
    return totalDownloads;
}

function getTotalSubscriber(data: any, filterValue: any) {
    const nowMilis = Date.now();
    const prevMilis = getFilterMilis(filterValue);
    const filterMilis = nowMilis - prevMilis;

    let totalSubscriptionRevenues = 0;
    const filterData =
        data &&
        data?.filter((v: any) => {
            const dataMilis = new Date(v.createdAt).getTime();
            if (dataMilis > filterMilis) {
                return v;
            }
        });
    const filterSubscriber =
        filterData && filterData?.filter((v: any) => v.currentPlan);
    return filterSubscriber?.length ? filterSubscriber?.length : 0;
}

function getTotalSubscriptionRevenue(data: any, filterValue: any) {
    const nowMilis = Date.now();
    const prevMilis = getFilterMilis(filterValue);
    const filterMilis = nowMilis - prevMilis;
    let totalSubscriptionRevenues = 0;
    const filterData =
        data &&
        data?.filter((v: any) => {
            const dataMilis = new Date(v.createdAt).getTime();
            if (dataMilis > filterMilis) {
                return v;
            }
        });
    filterData &&
        filterData?.forEach((v: any) => {
            if (v?.plan) {
                totalSubscriptionRevenues += v.amount;
            }
        });
    return totalSubscriptionRevenues;
}

function getTotalRevenue(data: any, filterValue: any) {
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
    let totalRevenues = 0;
    filterData &&
        filterData?.forEach((v: any) => {
            totalRevenues += v.amount;
        });
    return totalRevenues;
}

export default RevenueCard;

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
    let totalSubscriptionRevenues = 0;
    data &&
        data?.forEach((v: any) => {
            if (v?.plan) {
                totalSubscriptionRevenues += v.amount;
            }
        });
    return totalSubscriptionRevenues;
};

const getTotalDownload = (data: any) => {
    let totalSubscriptionRevenues = 0;
    data &&
        data?.forEach((v: any) => {
            totalSubscriptionRevenues += v.downloads;
        });
    return totalSubscriptionRevenues;
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
const filterSubscriptionByDate = (data: BillingResponseType[], month: any) => {
    const currentRevenue =
        data &&
        data?.filter(
            (v: any) =>
                moment(moment(v.createdAt).format()).format("YY-MM") ===
                    month && v.plan
        );
    return currentRevenue;
};
const subscriberFilterByDate = (data: UserStoreResponseType[], month: any) => {
    const currentRevenue =
        data &&
        data?.filter(
            (v: any) =>
                moment(moment(v.createdAt).format()).format("YY-MM") ===
                    month && v.currentPlan
        );
    return currentRevenue;
};
