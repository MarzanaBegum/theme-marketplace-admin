import React from "react";
import Moment from "react-moment";

const commonStyle = "text-[14px] leading-[22px] font-medium text-[#6B7280]";

const PaymentDetails = ({ sortData, totalSpent, paymentMethod }: any) => {
    const LastPurchased = sortData && sortData?.[0]?.createdAt;
    return (
        <div className="max-w-[420px] mt-[16px]">
            <h1 className="mb-[8px] text-[18px] leading-[30px] font-semibold text-[#4B5563]">
                Payment Info
            </h1>
            <div className="flex flex-row justify-between">
                <div className={`${commonStyle} flex flex-col gap-4`}>
                    <div>Method</div>
                    <div>Last Purchased</div>
                    <div>Total Spent</div>
                </div>
                <div>
                    <div
                        className={`${commonStyle} flex flex-col gap-4 text-right`}
                    >
                        <div className="flex justify-end capitalize">
                            {paymentMethod || "NaN"}
                        </div>
                        <div>
                            {LastPurchased ? (
                                <Moment
                                    date={LastPurchased}
                                    format="MMM DD, YYYY"
                                />
                            ) : (
                                "NaN"
                            )}
                        </div>
                        <div>${totalSpent ? totalSpent : 0}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
