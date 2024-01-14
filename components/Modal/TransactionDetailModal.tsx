/* eslint-disable @next/next/no-img-element */
import React from "react";
import CusstomerDetailCustomModal from "./CustomerCustomModal";
import Moment from "react-moment";

type TransactionDetailsModalType = {
    isOpen: boolean;
    handleModal: () => void;
    data?: any;
};

function TransactionDetailsModal({
    isOpen,
    handleModal,
    data,
}: TransactionDetailsModalType) {
    const commonStyle =
        "text-[14px] leading-[22px]  font-normal text-[#252C48]";

    const licensePrice =
        data?.downloadProduct?.productId?.licenses[
            data?.downloadProduct?.license
        ].price;

    const totalServicesPrice = data?.downloadProduct?.services
        .map((v: any) => v.price)
        .reduce((a: any, b: any) => a + b, 0);

    return (
        <CusstomerDetailCustomModal
            isOpen={isOpen}
            onRequestClose={handleModal}
            className="w-[calc(100vw-40px)] max-w-[510px] bg-white rounded-[6px] modal-scroll overflow-hidden"
        >
            <div className="p-[24px]">
                <div className="mb-[33px] flex items-center justify-between">
                    <h1 className="text-[18px] lg:text-[22px] leading-[30px] font-medium text-[#252C48]">
                        Transactions details
                    </h1>
                    <img
                        src="/images/cross.svg"
                        alt="cross"
                        onClick={handleModal}
                        className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] cursor-pointer"
                    />
                </div>
                {/* Download Product details  */}
                {data?.downloadProduct ? (
                    <div className="mb-[32px]  flex gap-[16px] items-center">
                        <img
                            src="/images/transaction-img.svg"
                            alt="transaction"
                            className="max-w-[120px] max-h-[96px]"
                        />
                        <div className="w-[320px]">
                            {/* // license price  */}
                            <div className="flex justify-between gap-[16px]">
                                <div
                                    className={`${commonStyle} mb-[8px] !font-semibold first-letter:uppercase`}
                                >
                                    {data?.downloadProduct?.license} License
                                </div>
                                <div className="text-[14px] leading-[22px] font-bold text-[#252C48] ">
                                    ${licensePrice}
                                </div>
                            </div>
                            {/* // service price  */}
                            {data?.downloadProduct?.services?.map(
                                (v: any, i: number) => (
                                    <div
                                        key={i}
                                        className="flex justify-between gap-[16px]"
                                    >
                                        <div
                                            className={`${commonStyle} mb-[8px]`}
                                        >
                                            {v?.text}
                                        </div>
                                        <div className="text-[14px] leading-[22px] text-[#252C48] font-medium">
                                            ${v?.price}
                                        </div>
                                    </div>
                                )
                            )}

                            {data?.downloadProduct?.support && (
                                <div className="flex justify-between gap-[16px]">
                                    <div className={`${commonStyle} mb-[8px]`}>
                                        {data?.downloadProduct?.support?.text}
                                    </div>
                                    <div className="text-[14px] leading-[22px] text-[#252C48] font-medium">
                                        ${data?.downloadProduct?.support?.price}
                                    </div>
                                </div>
                            )}

                            <hr className="bg-[#E5E7EB] opacity-60" />
                            {/* // total price  */}
                            <div className="flex justify-between pt-[8px]">
                                <div className="text-[14px] leading-[22px] text-[#252C48] font-medium">
                                    Total
                                </div>
                                <div className="text-[14px] leading-[22px] text-[#252C48] font-medium">
                                    $
                                    {Number(totalServicesPrice) +
                                        Number(licensePrice)}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <div className="font-bold pb-5 leading-[22px] lg:text-[22px] md:text-[18px] text-[16px]">
                                {data?.plan?.planName}
                            </div>
                            <h1 className=" pb-[16px] lg:text-[56px] md:text-[40px] text-[32px] font-semibold flex items-center gap-[8px]">
                                ${data?.plan?.planPrice}
                                <span className="font-medium capitalize md:text-[16px] text-[14px]">
                                    /{" "}
                                    {data?.plan?.isTrial
                                        ? "Week Only"
                                        : data?.plan?.interval}
                                </span>
                            </h1>
                        </div>
                    </>
                )}

                {/* Plan Pricing details  */}

                <div className="hidden">
                    <div>
                        <p className="font-bold lg:text-[22px] md:text-[18px] text-[16px]">
                            {data?.plan?.planName}
                        </p>
                        <h1 className=" lg:text-[56px] md:text-[40px] text-[32px] font-semibold flex items-center gap-[8px]">
                            ${data?.plan?.planPrice}
                            <span className="font-medium capitalize md:text-[16px] text-[14px]">
                                /{" "}
                                {data?.plan?.isTrial
                                    ? "Week Only"
                                    : data?.plan?.interval}
                            </span>
                        </h1>
                    </div>
                </div>

                <div className="max-w-[460px] mt-[16px]">
                    <div className="flex justify-between">
                        <div className={`${commonStyle} w-1/2`}>Name</div>
                        <div className={`${commonStyle} text-right`}>
                            {data?.userId?.firstName} {data?.userId?.lastName}
                        </div>
                    </div>
                    {data?.downloadProduct && (
                        <>
                            <div className="pt-4"></div>

                            <div className="flex justify-between">
                                <div className={`${commonStyle} w-1/2`}>
                                    Product name
                                </div>
                                <div className={`${commonStyle} text-right`}>
                                    {data?.downloadProduct?.productId?.title}
                                </div>
                            </div>
                        </>
                    )}
                    {data?.plan && (
                        <>
                            {" "}
                            <div className="pt-4"></div>
                            <div className="flex justify-between">
                                <div className={`${commonStyle}`}>
                                    Subscription Name
                                </div>
                                <div className={`${commonStyle} text-right`}>
                                    {data?.plan ? data?.plan.planName : "None"}
                                </div>
                            </div>
                        </>
                    )}

                    <div className="pt-4"></div>
                    <div className="flex justify-between">
                        <div className={`${commonStyle}`}>Purchase date</div>
                        <div className={`${commonStyle} text-right`}>
                            <Moment format="Do MMM YYYY">
                                {data?.createdAt}
                            </Moment>
                        </div>
                    </div>
                </div>
            </div>
        </CusstomerDetailCustomModal>
    );
}

export default TransactionDetailsModal;
