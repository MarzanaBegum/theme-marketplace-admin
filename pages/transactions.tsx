import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import useTransactionsQuery from "../api-call/useTransactionsQuery";
import { useQuery } from "react-query";
import ReactSelectGlobal from "../components/TopNav/ReactSelectGlobal";
import Meta from "../components/Shared/Meta";
import TransactionNewTable from "../components/Shared/TransactionNewTable";
import TransactionPageTable from "../components/TransactionsPage/TransactionPageTable";

const transOptions = [
    { value: "month", label: "This month" },
    { value: "hour", label: "Last hour" },
    { value: "week", label: "Last week" },
    { value: "year", label: "Last year" },
];

export const BILLING_KEY = "BillingHistory";

const Transactions = () => {
    const [filter, setFilter] = useState(transOptions[0].value);

    const handleFilterChange = (newValue: any) => {
        setFilter(newValue.value);
    };

    const { data, isLoading } = useQuery(
        [BILLING_KEY],
        useTransactionsQuery(filter)
    );

    return (
        <DefaultLayout>
            <Meta title="Transactions - Theme Gregg Admin" />

            <div className="px-[16px] lg:px-[24px] 3xl:px-[32px] pb-[16px] ">
                <div className="lg:pt-[36px]">
                    <div className="flex flex-col lg:flex-row mb-[16px] lg:mb-[24px] 3xl:mb-[19px] justify-between">
                        <p className="text-[#252C48] lg:pt-[10px] text-[22px] leading-[30px] font-medium lg:text-[28px] lg:font-semibold capitalize 3xl:text-[32px] mb-[16px] lg:mb-0 mt-[16px]  lg:mt-0">
                            Transactions
                        </p>

                        <div className="flex flex-col lg:flex-row justify-end gap-[16px]">
                            <ReactSelectGlobal
                                options={transOptions}
                                onChange={handleFilterChange}
                                defaultValue={transOptions[0]}
                                className="w-[150px] 3xl:w-[180px] rounded-[8px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="relative">
                    {/* <TransactionNewTable data={data} isLoading={isLoading} /> */}
                    <TransactionPageTable data={data} isLoading={isLoading} />
                </div>
                <div className="pt-10"></div>
            </div>
        </DefaultLayout>
    );
};

export default Transactions;
