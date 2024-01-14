/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useState } from "react";
import CustomModal from "./CustomModal";
import LoadingAnimation from "./../CustomSvg/LoadingAnimation1";

type BannedUserModalType = {
    isOpen: boolean;
    handleModal: () => void;
    data?: any;
    onYesClick?: (data?: any, setLoading?: any) => void;
};

function BannedUserModal({
    isOpen,
    handleModal,
    data,
    onYesClick,
}: BannedUserModalType) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            setLoading(false);
        };
    }, []);

    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={handleModal}
            className="w-[calc(100vw-40px)] sm:w-[343px] lg:w-[510px] bg-[#fff] rounded-[6px]"
        >
            <div className="p-[20px] sm:p-[32px]">
                <div className="flex justify-between gap-[17px] lg:items-center mb-[16px]">
                    <h2 className="text-[18px] leading-[23px] sm:leading-[30px] font-semibold text-[#252C48]">
                        Are you sure want to{" "}
                        {data?.userId?.status === "banned"
                            ? "Unbanned"
                            : "Banned"}{" "}
                        {data?.userId?.firstName} {data?.userId?.lastName}?
                    </h2>
                    <img
                        src="/images/cross.svg"
                        alt="cross"
                        onClick={handleModal}
                        className="w-[22px] h-[22px] mt-[2px] sm:mt-[5px] lg:mt-[0px] sm:w-[24px] sm:h-[24px] cursor-pointer"
                    />
                </div>
                <p className="text-[14px] max-w-[373px] leading-[22px] mb-[32px] font-normal text-[#6B7280]">
                    This customer is no longer active in the system. Please
                    contact their representative for further inquiries.
                </p>
                <div className="flex gap-[24px] justify-end">
                    <button
                        onClick={handleModal}
                        className="w-[110px] h-[44px] sm:w-[150px] sm:h-[48px] text-[14px] font-medium hover:border-[#FF1925] hover:text-[#FF1925] transit bg-[#FFFFFF] text-[#9AA5B5] border border-[#E5E7EB] rounded-[6px] transition-all duration-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() =>
                            onYesClick && onYesClick(data, setLoading)
                        }
                        className="w-[110px] h-[44px] sm:w-[150px] sm:h-[48px] text-[14px] font-medium hover:bg-[#b40d15] bg-[#FF1925] text-[#FFFFFF] rounded-[6px] transition-all duration-100"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <LoadingAnimation color="#FFFFFF" />
                            </div>
                        ) : (
                            "Yes"
                        )}
                    </button>
                </div>
            </div>
        </CustomModal>
    );
}

export default BannedUserModal;
