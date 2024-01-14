import _ from "lodash";
import React, { ReactNode, useEffect } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import useSinglePricingQuery from "../api-call/useSinglePricingQuery";
import { useRouter } from "next/router";

export type EditPricingType = {
    title: string;
    price: {
        monthly: number;
        annually?: number;
    };
    isTrial: boolean;
    features: {
        text: string;
        isValid: boolean;
    }[];
};

type DispatchType = { type: string; value: any };

type ContextType = [
    state: EditPricingType,
    dispatch: React.Dispatch<DispatchType>
];

const EditPricingContext = createContext<ContextType | null>(null);

const GetEditPricingContext = () =>
    useContext(EditPricingContext) as ContextType;

const DEFAULT_PRICING_CONTEXT: EditPricingType = {
    title: "",
    price: {
        monthly: 0,
        annually: 0,
    },
    isTrial: false,
    features: [],
};

const EditPricingAction = (state: EditPricingType, action: DispatchType) => {
    const { type, value } = action;
    const newState = _.set({ ...state }, type, value);
    return newState;
};

function EditPricingProvider({
    children,
    pricingData,
}: {
    children?: ReactNode;
    pricingData?: EditPricingType;
}) {
    const router = useRouter();
    let { id }: any = router.query;

    const { data } = useSinglePricingQuery(id);

    useEffect(() => {
        if (data) {
            reducer[1]({ type: "title", value: data.title });
            reducer[1]({ type: "price", value: data.price });
            reducer[1]({ type: "features", value: data.features });
            reducer[1]({ type: "isTrial", value: data.isTrial });
        }
    }, [data]);

    const reducer = useReducer(
        EditPricingAction,
        pricingData || DEFAULT_PRICING_CONTEXT
    );

    return (
        <EditPricingContext.Provider value={reducer}>
            {children}
        </EditPricingContext.Provider>
    );
}

export { EditPricingProvider, GetEditPricingContext };
