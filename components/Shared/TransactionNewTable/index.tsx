import React, { useEffect, useRef, useState } from "react";
import DataTable, {
    ConditionalStyles,
    TableColumn,
    TableStyles,
} from "react-data-table-component";
import { BillingType } from "../types/Billing";
import Moment from "react-moment";
import { AnimatePresence } from "framer-motion";
import RefundModal from "../../Modal/RefundModal";
import TransactionDetailsModal from "../../Modal/TransactionDetailModal";

const columns: TableColumn<BillingType>[] = [
    {
        name: "User Name",
        selector: (row) => `${row.userId.firstName} ${row.userId.lastName}`,
        sortable: true,
    },
    {
        name: "Product Name",
        selector: (row) => row.downloadProduct?.productId?.title || "None",
        sortable: true,
        style: {
            color: "#7266FC",
        },
    },
    {
        name: "Plan",
        selector: (row) => row.plan?.planName || "None",
        sortable: true,
        style: {
            color: "#7266FC",
        },
    },
    {
        name: "Purchased Date",
        selector: (row) => row.createdAt,
        sortable: true,
        cell: (row, rowIndex, column, id) => {
            return <Moment format="Do MMM YYYY">{row?.createdAt}</Moment>;
        },
    },
    {
        name: "Total Price",
        selector: (row) => `$${row.amount}`,
        cell: (row, rowIndex, column, id) => <LastCell row={row} />,

        sortable: true,
    },
];

function LastCell({ row }: { row: BillingType }) {
    const [isOpen, setIsOpen] = useState(false);

    const [openTransactionModal, setOpenTransactionModal] = useState(false);
    const [openRefundModal, setOpenRefundModal] = useState(false);

    const ref = useRef<any>();
    const anotherRef = useRef<any>();

    const handleRefund = () => {};

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                ref &&
                ref.current &&
                ref.current.contains &&
                !ref.current.contains(event.target)
            ) {
                if (
                    anotherRef &&
                    anotherRef.current &&
                    anotherRef.current.contains &&
                    !anotherRef.current.contains(event.target)
                ) {
                    setIsOpen(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    console.log(row);

    return (
        <div className="flex relative w-full items-center justify-between">
            <div className="text-[#7266FC] text-[14px] font-normal">
                ${row?.amount}
            </div>
            <div>
                <img
                    ref={anotherRef}
                    src="/images/three-dot.svg"
                    alt="edit"
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer  w-[16px] h-[16px]"
                />
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <div ref={ref}>
                            <div
                                className="bg-[#ffffff] w-[209px] right-[8px] top-[10px] rounded-[6px] absolute    z-[1] mt-[12px]"
                                style={{
                                    boxShadow:
                                        "2px 2px 16px rgba(0, 0, 0, 0.08)",
                                }}
                            >
                                <ul className="text-normal text-[14px] flex flex-col  leading-[22px] text-[#3B415A]">
                                    <li
                                        onClick={() => {
                                            setOpenTransactionModal(
                                                !openTransactionModal
                                            );
                                            setIsOpen(!isOpen);
                                        }}
                                        className="p-[16px] cursor-pointer transition-all duration-100 hover:bg-[#E3E0FE] hover:text-[#7266FC]"
                                    >
                                        Transactions Details
                                    </li>
                                    <li
                                        onClick={() => {
                                            setOpenRefundModal(
                                                !openRefundModal
                                            );
                                            setIsOpen(!isOpen);
                                        }}
                                        className="p-[16px] cursor-pointer transition-all duration-100 hover:bg-[#E3E0FE] hover:text-[#7266FC]"
                                    >
                                        Refund
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <RefundModal
                data={row}
                isOpen={openRefundModal}
                onRefundClick={handleRefund}
                handleModal={() => setOpenRefundModal(!openRefundModal)}
            />

            <TransactionDetailsModal
                data={row}
                isOpen={openTransactionModal}
                handleModal={() =>
                    setOpenTransactionModal(!openTransactionModal)
                }
            />
        </div>
    );
}

const tableStyles: TableStyles = {
    headCells: {
        style: {
            paddingLeft: "16px", // override the cell padding for head cells
            paddingRight: "16px",
            paddingTop: "16px",
            paddingBottom: "16px",
            fontSize: 14,
            fontWeight: 500,
            lineHeight: "22px",
        },
    },

    cells: {
        style: {
            paddingLeft: "16px", // override the cell padding for data cells
            paddingRight: "16px",
            paddingTop: "16px",
            paddingBottom: "16px",
            lineHeight: "22px",
            fontWeight: 400,
        },
    },
    rows: {
        style: {
            "border-bottom-style": "none !important",
            backgroundColor: "#F3F4F6",
        },
        stripedStyle: {
            backgroundColor: "#F9FAFB",
        },
    },
    headRow: {
        style: {
            "border-bottom-style": "none !important",
            backgroundColor: "#E3E0FE",
        },
    },
    pagination: {},
};

function TransactionNewTable({ data }: any) {
    return (
        <div className="bg-[#FFFFFF] relative p-[16px] lg:p-[24px] rounded-[6px]">
            <div className=" ">
                <DataTable
                    customStyles={tableStyles}
                    columns={columns}
                    data={data}
                    className="modal-scrollbar "
                    fixedHeader={true}
                    striped={true}
                    // pagination={true}
                    fixedHeaderScrollHeight="calc(100vh - 200px)"
                />
            </div>
        </div>
    );
}

export default TransactionNewTable;
