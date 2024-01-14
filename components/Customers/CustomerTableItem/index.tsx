/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { OutSideClick } from "../../Shared/OutSideCilck";
import BannedUserModal from "../../Modal/BannedUser";
import CustomerDetailsModal from "../../Modal/CustomerDetailsModal";
import { AnimatePresence } from "framer-motion";
import { api } from "../../../api";
import { useQuery } from "react-query";
import useCustomerQuery, {
    CustomerDataType,
} from "../../../api-call/userCustomerQuery";
import Moment from "react-moment";
import { Tooltip } from "react-tooltip";

type TableItemType = {
    item: CustomerDataType;
    index: number;
};

const TableItem = ({ item, index }: TableItemType) => {
    const [isOpen, setIsOpen] = useState(false);
    const { refetch } = useCustomerQuery();
    const [openBannedModal, setOpenBannedModal] = useState<boolean>(false);
    const [openCustomerDetailModal, setOpenCustomerDetailModal] =
        useState<boolean>(false);

    const handleMenu = (id: any) => {
        setIsOpen(!isOpen);
    };

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

    const ref = useRef<any>();
    const anotherRef = useRef<any>();

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
        <>
            <tr
                className={classNames(
                    "whitespace-nowrap ",
                    index % 2 === 0 ? "bg-[#F9FAFB]" : "bg-[#F3F4F6]"
                )}
            >
                <th
                    scope="row"
                    className="px-6 py-4  text-[#3B415A] text-[14px] font-normal"
                >
                    <p className="w-[100px] 3xl:w-[120px] truncate">{`${item?.userId?.firstName} ${item?.userId?.lastName}`}</p>
                </th>

                <td className="px-6 py-4 text-[#7266FC] text-[14px] font-normal">
                    <p
                        id={item?._id}
                        className="w-[160px] cursor-pointer 3xl:w-[200px] truncate"
                    >
                        {item?.userId?.email}
                    </p>
                    <Tooltip
                        content={item?.userId?.email}
                        anchorId={item?._id}
                        place="bottom"
                        className="text-xs text-center"
                    />
                </td>
                <td className="px-6 py-4 text-[#3B415A] text-[14px] font-normal">
                    <Moment format="DD MMM YYYY">{item.createdAt}</Moment>
                </td>
                <td className="relative px-6 py-4 text-[#7266FC] text-[14px] font-normal">
                    <div className="flex items-center justify-between ">
                        <h1>
                            {item?.currentPlan?.planName
                                ? item?.currentPlan?.planName
                                : "None"}
                        </h1>
                        <img
                            src="/images/three-dot.svg"
                            alt="edit"
                            ref={anotherRef}
                            onClick={() => handleMenu(item?._id)}
                            className="cursor-pointer w-[16px] h-[16px]"
                        />
                    </div>
                </td>
                <td>
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <div ref={ref}>
                                <div
                                    className="bg-[#ffffff] w-[209px] rounded-[6px] absolute mt-[12px] right-[70px] lg:right-[88px] z-[1]"
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
                                            {item?.userId?.status === "banned"
                                                ? "Unbanned User"
                                                : "Ban User"}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </td>
            </tr>
            <tr>
                <td>
                    <BannedUserModal
                        data={item}
                        isOpen={openBannedModal}
                        onYesClick={handleBannedUser}
                        handleModal={() => setOpenBannedModal(!openBannedModal)}
                    />
                </td>
                <td>
                    <CustomerDetailsModal
                        data={item as any}
                        isOpen={openCustomerDetailModal}
                        handleModal={() =>
                            setOpenCustomerDetailModal(!openCustomerDetailModal)
                        }
                    />
                </td>
            </tr>
        </>
    );
};

export default TableItem;
