import React from "react";
import { transactionsTableHead } from "./../../utils/constant";
import TransactionTableItem from "../Transactions/transactionTableItem";
import { useQuery } from "react-query";
import useTransactionsQuery from "../../api-call/useTransactionsQuery";
import LoadingAnimation from "../../components/CustomSvg/LoadingAnimation2";

export const BILLING_KEY = "BillingHistory";
const TransactionTable = ({ filterValue }: any) => {
    const { data, isLoading } = useQuery(
        [BILLING_KEY],
        useTransactionsQuery(filterValue)
    );

    return (
        <div className="modal-scroll rounded-[6px]">
            <table className="w-full text-[14px] text-left text-[#252C48]">
                <thead className="text-[14px] text-[#252C48] font-semibold capitalize bg-[#E3E0FE]">
                    <tr>
                        {transactionsTableHead.map((item, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="whitespace-nowrap px-6 py-[18px] text-[14px] font-semibold text-[#252C48]"
                            >
                                {item}
                            </th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data?.length !== 0 ? (
                        data
                            ?.sort((a: any, b: any) =>
                                a.createdAt > b.createdAt ? -1 : 1
                            )
                            .slice(0, 10)
                            .map((item: any, index: any) => (
                                <TransactionTableItem
                                    item={item}
                                    index={index}
                                    key={index}
                                    isDashboard={true}
                                />
                            ))
                    ) : isLoading ? (
                        <tr>
                            <td>
                                <div className="flex gap-3 item-center">
                                    <LoadingAnimation color="#333" />
                                    <div>Loading...</div>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td>
                                <div>No data found</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
