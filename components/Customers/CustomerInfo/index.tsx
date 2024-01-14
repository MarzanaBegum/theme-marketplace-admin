import React from "react";
import Moment from "react-moment";

const commonStyle = "text-[14px] leading-[22px] font-medium text-[#6B7280]";

const CustomerInfo = ({ customer }: any) => {
    return (
        <div className="max-w-[420px] mt-[16px]">
            <h1 className="mb-[8px] text-[18px] leading-[30px] font-semibold text-[#4B5563]">
                Customer Info
            </h1>
            <div className="flex flex-row justify-between">
                <div className={`${commonStyle} flex flex-col gap-4`}>
                    <div>Name</div>
                    <div>Join Date</div>
                    <div>Subscription type</div>
                    <div>Status</div>
                </div>
                <div>
                    <div
                        className={`${commonStyle} flex flex-col gap-4 text-right`}
                    >
                        <div>
                            {customer?.userId?.firstName}{" "}
                            {customer?.userId?.lastName}
                        </div>

                        <div>
                            <Moment
                                date={customer?.createdAt}
                                format="MMM DD, YYYY"
                            />
                        </div>
                        <div>
                            {customer?.currentPlan
                                ? customer?.currentPlan?.planName
                                : "none"}
                        </div>
                        <div>{customer?.userId?.status}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;
