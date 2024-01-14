import React from "react";
import CustomerPageComponent from "../components/CustomerPageComponent";
import { CustomerFilterProvider } from "../context/CustomerFilterContext";
import Meta from "../components/Shared/Meta";

const Customers = () => {
    return (
        <CustomerFilterProvider>
            <Meta title="Customers - Theme Gregg Admin" />

            <CustomerPageComponent />
        </CustomerFilterProvider>
    );
};

export default Customers;
