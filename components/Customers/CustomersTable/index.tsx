import Pagination from "../../../components/Pagination";
import React from "react";
import { customerTableHead } from "../../../utils/constant";
import TableItem from "../CustomerTableItem";
import LoadingAnimation from "./../../CustomSvg/LoadingAnimation2";
import useCustomerQuery from "../../../api-call/userCustomerQuery";
import { GetCustomerFilter } from "../../../context/CustomerFilterContext";
import CustomerNewTable from "../../Shared/CustomerNewTable";

const CustomersTable = () => {
    const [state] = GetCustomerFilter();
    const { isLoading, data } = useCustomerQuery(state);

    return <>{data && <CustomerNewTable data={data} />}</>;
};

function Test() {
    const [state] = GetCustomerFilter();
    const { isLoading, data } = useCustomerQuery(state);

    return (
        <Pagination
            dataArr={data || []}
            itemsPerPage={10}
            className="!justify-end pt-5 lg:pt-[40px]"
        >
            {(data) => (
                <div className="bg-[#FFFFFF] p-[16px] lg:p-[24px] rounded-[6px]">
                    <div className="modal-scroll rounded-[6px]">
                        <table className="w-full text-[14px] text-left text-[#252C48]">
                            <thead className="text-[14px] text-[#252C48] font-semibold capitalize bg-[#E3E0FE]">
                                <tr>
                                    {customerTableHead.map((item, index) => (
                                        <th
                                            key={index}
                                            scope="col"
                                            className="whitespace-nowrap px-[20px] py-[18px] text-[14px] font-semibold text-[#252C48]"
                                        >
                                            {item}
                                        </th>
                                    ))}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data?.length > 0 ? (
                                    data?.map((item, i) => (
                                        <TableItem
                                            item={item}
                                            index={i}
                                            key={i}
                                        />
                                    ))
                                ) : isLoading ? (
                                    <tr>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-3 item-center">
                                                <LoadingAnimation color="#333" />
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

export default Test;
