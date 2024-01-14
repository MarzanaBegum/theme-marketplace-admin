import _ from "lodash";
import React, { ReactNode } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { dateFilterOptions } from "../utils/constant";

export type CustomerFilterType = {
    date: string;
    sort: string;
    status: string;
};

type DispatchType = { type: string; value: any };

type ContextType = [
    state: CustomerFilterType,
    dispatch: React.Dispatch<DispatchType>
];

const CustomerFilterContext = createContext<ContextType | null>(null);

const GetCustomerFilter = () =>
    useContext(CustomerFilterContext) as ContextType;

const DEFAULT_CUSTOMER_FILTER: CustomerFilterType = {
    date: dateFilterOptions[0].value,
    sort: "all",
    status: "all",
};

const CustomerFilterAction = (
    state: CustomerFilterType,
    action: DispatchType
) => {
    const { type, value } = action;
    const newState = _.set({ ...state }, type, value);
    return newState;
};

function CustomerFilterProvider({ children }: { children?: ReactNode }) {
    const reducer = useReducer(CustomerFilterAction, DEFAULT_CUSTOMER_FILTER);

    return (
        <CustomerFilterContext.Provider value={reducer}>
            {children}
        </CustomerFilterContext.Provider>
    );
}

export { CustomerFilterProvider, GetCustomerFilter };
