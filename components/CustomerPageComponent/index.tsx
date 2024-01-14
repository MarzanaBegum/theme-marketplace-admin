import DefaultLayout from "../../components/DefaultLayout";
import React from "react";
import CustomerTopSection from "./CustomerTopSection";
import CustomersTable from "../../components/Customers/CustomersTable";

function CustomerPageComponent() {
    return (
        <DefaultLayout>
            <div className="">
                <div className="px-[16px] pt-[8px] lg:px-[32px] pb-[85px] lg:pt-[24px] 3xl:px-[40px] 3xl:pt-[35px]">
                    <CustomerTopSection />
                    <CustomersTable />
                </div>
            </div>
        </DefaultLayout>
    );
}

export default CustomerPageComponent;
