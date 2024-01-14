/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useState } from "react";
import CustomModal from "./CustomModal";
import CusstomerDetailCustomModal from "./CustomerCustomModal";

type RefundModalType = {
    isOpen: boolean;
    handleModal: () => void;
    data?: any;
    onRefundClick?: (data?: any, setLoading?: any) => void;
};

function RefundModal({
    isOpen,
    handleModal,
    data,
    onRefundClick,
}: RefundModalType) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            setLoading(false);
        };
    }, []);

    return (
        <CusstomerDetailCustomModal
            isOpen={isOpen}
            onRequestClose={handleModal}
            className="w-[calc(100vw-40px)] sm:w-[343px] lg:w-[510px] bg-[#fff] rounded-[6px]"
        >
            <div className="p-[20px] sm:p-[32px]">
                <div className="flex justify-between gap-[17px] lg:items-center mb-[16px]">
                    <h2 className="text-[18px] leading-[23px] sm:leading-[30px] font-semibold text-[#252C48]">
                        Replace me with your headline
                    </h2>
                    <img
                        src="/images/cross.svg"
                        alt="cross"
                        onClick={handleModal}
                        className="w-[22px] h-[22px] mt-[2px] sm:mt-[5px] lg:mt-[0px] sm:w-[24px] sm:h-[24px] cursor-pointer"
                    />
                </div>
                <p className="text-[14px] max-w-[373px] leading-[22px] mb-[32px] font-normal text-[#6B7280]">
                    Replace me with a description of the message you are trying
                    to promote, maximum 2 lines for refund.
                </p>
                <div className="flex gap-[24px] justify-end">
                    <button
                        onClick={handleModal}
                        className="w-[110px] h-[44px] sm:w-[150px] sm:h-[48px] text-[14px] font-medium hover:bg-[#c0baf7] hover:text-[#7266FC] bg-[#E3E0FE] text-[#7266FC] border border-[#E3E0FE] rounded-[6px] transition-all duration-100"
                    >
                        Cancel
                    </button>
                    <button className="w-[110px] h-[44px] sm:w-[150px] sm:h-[48px] text-[14px] font-medium hover:bg-[#8076f5] bg-[#7266FC] text-[#FFFFFF] rounded-[6px] transition-all duration-100">
                        {loading ? "loading..." : "Refund"}
                    </button>
                </div>
            </div>
        </CusstomerDetailCustomModal>
    );
}

export default RefundModal;
