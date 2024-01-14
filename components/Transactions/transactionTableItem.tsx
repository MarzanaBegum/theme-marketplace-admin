/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import { AnimatePresence } from "framer-motion";
import { OutSideClick } from "../Shared/OutSideCilck";
import RefundModal from "../Modal/RefundModal";
import TransactionDetailsModal from "../Modal/TransactionDetailModal";
import Moment from "react-moment";
import Link from "next/link";

const TransactionTableItem = ({ item, index, isDashboard }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const [openRefundModal, setOpenRefundModal] = useState<boolean>(false);

    const [openTransactionModal, setOpenTransactionModal] =
        useState<boolean>(false);

    const handleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleRefund = async (setLoading: any) => {
        setLoading(false);
        setOpenRefundModal(false);
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
                    "whitespace-nowrap",
                    index % 2 === 0 ? "bg-[#F9FAFB]" : "bg-[#F3F4F6]"
                )}
            >
                <th
                    scope="row"
                    className="px-6 py-4  text-[#3B415A] text-[14px] font-normal"
                >
                    <p className="w-[100px] truncate">
                        {item?.userId?.firstName} {item?.userId?.lastName}
                    </p>
                </th>
                <td className="px-6 py-4  text-[14px] font-normal">
                    <div className="w-[120px] truncate">
                        {item?.downloadProduct ? (
                            <Link
                                id={item?._id}
                                href={`/products/upload?id=${item?.downloadProduct?.productId?._id}`}
                            >
                                <span className="text-[#7266FC] ">
                                    {item?.downloadProduct?.productId?.title}
                                </span>
                                <Tooltip
                                    content={
                                        item?.downloadProduct?.productId?.title
                                    }
                                    anchorId={item?._id}
                                    place="bottom"
                                    className="text-xs text-center"
                                />
                            </Link>
                        ) : (
                            <span>None</span>
                        )}
                    </div>
                </td>
                <td className="px-6 py-4 text-[#3B415A] text-[14px] font-normal">
                    {item?.plan ? (
                        <Link
                            href={`/pricing/edit/${item?.plan?.priceId}?interval=${item?.plan?.interval}`}
                        >
                            <span className="text-[#7266FC] ">
                                {item?.plan?.planName}
                            </span>
                        </Link>
                    ) : (
                        <span>None</span>
                    )}
                </td>
                <td className="px-6 py-4 text-[#3B415A] text-[14px] font-normal">
                    <Moment format="Do MMM YYYY">{item?.createdAt}</Moment>{" "}
                </td>
                <td className="relative px-6 py-4 text-[#7266FC] text-[14px] font-normal">
                    <div className="flex items-center justify-between ">
                        <h1>${item?.amount}</h1>
                        <img
                            src="/images/three-dot.svg"
                            alt="edit"
                            ref={anotherRef}
                            onClick={() => handleMenu()}
                            className="cursor-pointer  w-[16px] h-[16px]"
                        />
                    </div>
                </td>
                <td>
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <div ref={ref}>
                                <div
                                    className="bg-[#ffffff] w-[209px] rounded-[6px] absolute    z-[1] mt-[12px]"
                                    style={{
                                        boxShadow:
                                            "2px 2px 16px rgba(0, 0, 0, 0.08)",
                                        right: isDashboard ? "40px" : "62px",
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
                </td>
            </tr>
            <tr>
                <td>
                    <RefundModal
                        data={item}
                        isOpen={openRefundModal}
                        onRefundClick={handleRefund}
                        handleModal={() => setOpenRefundModal(!openRefundModal)}
                    />
                </td>
                <td>
                    <TransactionDetailsModal
                        data={item}
                        isOpen={openTransactionModal}
                        handleModal={() =>
                            setOpenTransactionModal(!openTransactionModal)
                        }
                    />
                </td>
            </tr>
        </>
    );
};

export default TransactionTableItem;
