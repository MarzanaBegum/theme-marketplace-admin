import React, { useEffect, useRef, useState } from "react";
import DataTable, {
    TableColumn,
    TableStyles,
} from "react-data-table-component";
import Moment from "react-moment";
import { AnimatePresence } from "framer-motion";
import { CustomerType } from "../types/Customer";
import BannedUserModal from "../../Modal/BannedUser";
import CustomerDetailsModal from "../../Modal/CustomerDetailsModal";
import { api } from "../../../api";
import useCustomerQuery from "../../../api-call/userCustomerQuery";

const columns: TableColumn<CustomerType>[] = [
    {
        name: "Name",
        selector: (row) => `${row?.userId?.firstName} ${row?.userId?.lastName}`,
        sortable: true,
    },
    {
        name: "Email",
        selector: (row) => row.userId?.email,
        sortable: true,
        style: {
            color: "#7266FC",
        },
    },
    {
        name: "Join Date",
        selector: (row) => row.createdAt,
        sortable: true,
        cell: (row, rowIndex, column, id) => {
            return <Moment format="Do MMM YYYY">{row?.createdAt}</Moment>;
        },
    },
    {
        name: "Subscription Type",
        cell: (row, rowIndex, column, id) => <LastCell row={row} />,
        sortable: true,
        style: {
            color: "#7266FC",
        },
    },
];

function LastCell({ row }: { row: CustomerType }) {
    const [isOpen, setIsOpen] = useState(false);

    const [openCustomerDetailModal, setOpenCustomerDetailModal] =
        useState(false);
    const [openBannedModal, setOpenBannedModal] = useState(false);

    const ref = useRef<any>();
    const anotherRef = useRef<any>();

    const { refetch } = useCustomerQuery();

    const handleBannedUser = async (data: any, setLoading: any) => {
        const status = data?.userId?.status;
        const plan = data?.currentPlan;
        setLoading(true);
        try {
            if (status === "active" || "inactive") {
                await api.put(`/users/${data?.userId?._id}`, {
                    status: "banned",
                });
            }
            if (!plan && status === "banned") {
                await api.put(`/users/${data?.userId?._id}`, {
                    status: "inactive",
                });
            }
            if (plan && status === "banned") {
                await api.put(`/users/${data?.userId?._id}`, {
                    status: "active",
                });
            }
            refetch();
            setLoading(false);
            setOpenBannedModal(false);
        } catch (error) {
            setLoading(false);
            console.log("Failed to banned user");
        }
    };

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

    return (
        <div className="flex relative w-full items-center justify-between">
            <div>{row?.currentPlan?.planName || "None"}</div>
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
                                            setOpenCustomerDetailModal(
                                                !openCustomerDetailModal
                                            );
                                            setIsOpen(!isOpen);
                                        }}
                                        className="p-[16px] cursor-pointer transition-all duration-100 hover:bg-[#E3E0FE] hover:text-[#7266FC]"
                                    >
                                        Customer Details
                                    </li>
                                    <li
                                        onClick={() => {
                                            setOpenBannedModal(
                                                !openBannedModal
                                            );
                                            setIsOpen(!isOpen);
                                        }}
                                        className="p-[16px] cursor-pointer transition-all duration-100 hover:bg-[#E3E0FE] hover:text-[#7266FC]"
                                    >
                                        {row?.userId?.status === "banned"
                                            ? "Unbanned User"
                                            : "Ban User"}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
            <BannedUserModal
                data={row}
                isOpen={openBannedModal}
                onYesClick={handleBannedUser}
                handleModal={() => setOpenBannedModal(!openBannedModal)}
            />

            <CustomerDetailsModal
                data={row}
                isOpen={openCustomerDetailModal}
                handleModal={() =>
                    setOpenCustomerDetailModal(!openCustomerDetailModal)
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
};

function CustomerNewTable({ data, isLoading }: any) {
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
                    fixedHeaderScrollHeight="calc(100vh - 270px)"
                />
            </div>
        </div>
    );
}

export default CustomerNewTable;
