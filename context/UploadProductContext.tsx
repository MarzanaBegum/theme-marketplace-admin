import _ from "lodash";
import React, { ReactNode, useEffect, useMemo } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

export type DefaultErrorType = {
    title: string;
    categories: string;
    upload: string;
    softwares: string;
    description: string;
    licenses: string;
    services: string;
    features: string;
    tags: string;
    liveLink: string;
};

export const DefaultError: DefaultErrorType = {
    title: "",
    categories: "",
    upload: "",
    softwares: "",
    description: "",
    licenses: "",
    services: "",
    features: "",
    tags: "",
    liveLink: "",
};

export type UploadProductType = {
    title: string;
    categories: string[];
    softwares: string[];
    description: string;
    type: string;
    files: {
        thumbnail: File | string;
        images: (string | File)[];
        sourceFile: File | string;
    };
    licenses: {
        personal: {
            pdf: string | File;
            price: string;
        };
        commercial: {
            pdf: string | File;
            price: string;
        };
        buyout: {
            pdf: string | File;
            price: string;
        };
    };
    services: {
        text: string;
        price: string;
    }[];
    features: {
        heading: string;
        list: string[];
    }[];
    liveLink: string;
    tags: string[];
};

type UploadProductDispatchType = { type: string; value: any };

type UploadProductContextType = [
    state: UploadProductType,
    dispatch: React.Dispatch<UploadProductDispatchType>
];

const UploadProductContext = createContext<UploadProductContextType | null>(
    null
);

const GetUploadProduct = () =>
    useContext(UploadProductContext) as UploadProductContextType;

const DEFAULT_PRODUCT_CONTEXT: UploadProductType = {
    title: "",
    type: "",
    licenses: {
        personal: {
            pdf: "",
            price: "",
        },
        commercial: {
            pdf: "",
            price: "",
        },
        buyout: {
            pdf: "",
            price: "",
        },
    },
    services: [
        {
            price: "",
            text: "",
        },
    ],
    features: [
        {
            heading: "",
            list: [""],
        },
    ],
    files: {
        thumbnail: "",
        images: [],
        sourceFile: "",
    },

    categories: [],
    tags: [],
    softwares: [],
    liveLink: "",
    description: "",
};

const UploadProductAction = (
    state: UploadProductType,
    action: UploadProductDispatchType
) => {
    const { type, value } = action;
    if (type === "REPLACE_STATE") return value;
    const newState = _.set({ ...state }, type, value);
    return newState;
};

function UploadProductProvider({
    children,
    product,
}: {
    children?: ReactNode;
    product?: any;
}) {
    const reducer = useReducer(
        UploadProductAction,
        product || DEFAULT_PRODUCT_CONTEXT
    );

    useEffect(() => {
        reducer[1]({ type: "REPLACE_STATE", value: product });
    }, [product]);

    return (
        <UploadProductContext.Provider value={reducer}>
            {children}
        </UploadProductContext.Provider>
    );
}

export { UploadProductProvider, GetUploadProduct };
