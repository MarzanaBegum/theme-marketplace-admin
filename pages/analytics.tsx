import React, { useState } from "react";
import { useQuery } from "react-query";
import useAnalyticsQuery, {
    AnalyticsDataType,
} from "../api-call/useAnalyticsQuery";
import ProductDetailCard from "../components/Analytics/ProductDetailCard";
import RecentTransactions from "../components/Analytics/RecentTransactions";
import DefaultLayout from "../components/DefaultLayout";
import RevenueCard from "../components/RevenueCard";
import SalesRevenue from "../components/SalesRevenueChart";
import ReactSelectGlobal from "../components/TopNav/ReactSelectGlobal";
import { options } from "../utils/constant";
import Meta from "../components/Shared/Meta";

export const BILLING_KEY = "BillingHistory";

const Analytics = () => {
    const defaultValue = { value: "month", label: "This month" };
    const [filterValue, setFilterValue] = useState("month");

    const handleOnChange = (e: any) => {
        // console.log(e, "e ");
        setFilterValue(e.value);
    };

    const { data } = useQuery<AnalyticsDataType>(
        ["GET ANALYTICS DATA"],
        useAnalyticsQuery(filterValue)
    );

    // console.log(data);

    return (
        <DefaultLayout>
            <Meta title="Analytics - Theme Gregg Admin" />

            <div className="w-[100%] bg-[#eff3fb] px-[24px] pb-[65px] 3xl:px-[40px] 3xl:pb-[35px] py-[16px] lg:pt-[35px] lg:pb-[88px]">
                <div className="flex items-center justify-between">
                    <p className="text-[#252C48] lg:pt-[10px] text-[22px] leading-[30px] font-medium lg:text-[28px] lg:font-semibold capitalize 3xl:text-[32px] mb-[16px] lg:mb-0 mt-[16px]  lg:mt-0">
                        Analytics
                    </p>
                    <ReactSelectGlobal
                        options={options}
                        onChange={handleOnChange}
                        defaultValue={defaultValue}
                        className="w-[150px] 3xl:w-[180px]"
                    />
                </div>
                <RevenueCard data={data} filterValue={filterValue} />
                <ProductDetailCard data={data} filterValue={filterValue} />
                <SalesRevenue />
                <div className="relative">
                    <RecentTransactions filterValue={filterValue} />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Analytics;
