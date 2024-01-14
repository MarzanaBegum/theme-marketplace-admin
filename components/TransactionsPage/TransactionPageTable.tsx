import LoadingAnimation from "../../components/CustomSvg/LoadingAnimation2";
import Pagination from "../../components/Pagination";
import TransactionTableItem from "../../components/Transactions/transactionTableItem";
import { transactionsTableHead } from "../../utils/constant";
import React from "react";

function TransactionPageTable({ data, isLoading }: any) {
    return (
        <Pagination
            className="pt-[40px] pb-[52px] lg:!justify-end "
            dataArr={data || []}
            itemsPerPage={10}
        >
            {(currentItems) => (
                <div className="bg-[#FFFFFF] relative p-[16px] lg:p-[24px] rounded-[6px]">
                    <div className="modal-scroll rounded-[6px]">
                        <table className="w-full text-[14px] text-left text-[#252C48]">
                            <thead className="text-[14px] text-[#252C48] font-semibold capitalize w-full bg-[#E3E0FE]">
                                <tr>
                                    {transactionsTableHead.map(
                                        (item, index) => (
                                            <th
                                                key={index}
                                                scope="col"
                                                className="whitespace-nowrap px-[20px] py-[18px] text-[14px] font-semibold text-[#252C48]"
                                            >
                                                {item}
                                            </th>
                                        )
                                    )}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length ? (
                                    currentItems.map((item, index) => (
                                        <TransactionTableItem
                                            item={item}
                                            index={index}
                                            key={index}
                                        />
                                    ))
                                ) : isLoading ? (
                                    <tr>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-3 item-center">
                                                <LoadingAnimation color="#7266FC" />
                                                <div>Loading...</div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td className="px-6 py-4">
                                            <div>No Data Found</div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Pagination>
    );
}

export default TransactionPageTable;
