/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import CusstomerDetailCustomModal from "./CustomerCustomModal";
import CustomerInfo from "../Customers/CustomerInfo/index";
import ProductDetails from "../Customers/ProductDetails/index";
import PaymentDetails from "../Customers/PaymentDetails/index";
import { api } from "../../api";
import { useQuery } from "react-query";
import { CustomerDataType } from "../../api-call/userCustomerQuery";
import usePaymentMethod from "../../api-call/usePaymentMethod";
import { CustomerType } from "../Shared/types/Customer";

type CustomerDetailModalType = {
    isOpen: boolean;
    handleModal: () => void;
    data: CustomerType;
};

function CustomerDetailsModal({
    isOpen,
    handleModal,
    data,
}: CustomerDetailModalType) {
    return (
        <CusstomerDetailCustomModal
            isOpen={isOpen}
            onRequestClose={handleModal}
            className="w-[calc(100vw-40px)] max-w-[479px] bg-white rounded-[6px] modal-scroll overflow-hidden"
        >
            <CustomerDetailsData
                data={data}
                isOpen={isOpen}
                handleModal={handleModal}
            />
        </CusstomerDetailCustomModal>
    );
}

function CustomerDetailsData({ data, handleModal }: CustomerDetailModalType) {
    const { data: billingData } = useQuery(
        ["billing_data", data?.userId?._id],
        () => api.get(`billing/user/${data?.userId?._id}`),
        {
            enabled: !!data?.userId?._id,
        }
    );

    const sortData =
        billingData &&
        billingData?.data?.sort((a: any, b: any) =>
            a.createdAt > b.createdAt ? -1 : 1
        );

    function getTotalAmount(data: any) {
        let totalview = 0;
        data &&
            data?.forEach((v: any) => {
                if (v?.amount) {
                    totalview += v.amount;
                }
            });
        return totalview;
    }

    const { data: paymentMethod } = usePaymentMethod(data.customerId);
    return (
        <div className="p-[24px]">
            <div className="flex items-center justify-between">
                <h1 className="text-[18px] lg:text-[22px] leading-[30px] font-medium text-[#252C48]">
                    Customer Details
                </h1>
                <img
                    src="/images/cross.svg"
                    alt="cross"
                    onClick={handleModal}
                    className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] cursor-pointer"
                />
            </div>
            {/* <ProductDetails/> */}
            <CustomerInfo customer={data} />
            {data?.currentPlan && (
                <PaymentDetails
                    sortData={sortData}
                    totalSpent={getTotalAmount(billingData?.data)}
                    paymentMethod={paymentMethod?.card?.brand}
                />
            )}
        </div>
    );
}

export default CustomerDetailsModal;
