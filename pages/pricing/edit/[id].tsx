import React from "react";
import { EditPricingProvider } from "../../../context/EditPricingContext";
import EditPricingPageComponent from "../../../components/EditPricingPage";
import { GetServerSideProps } from "next";
import { api } from "../../../api";
import Meta from "../../../components/Shared/Meta";

function EditPricingPage({ data }: any) {
    return (
        <EditPricingProvider pricingData={data}>
            <Meta title="Edit Pricing - Theme Gregg Admin" />
            <EditPricingPageComponent />
        </EditPricingProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const interval: any = query?.interval;
    const intervals = ["monthly", "annually"];
    const id: any = query.id;
    try {
        if (!id || !interval || !intervals.includes(interval))
            throw new Error();
        const { data } = await api.get(`/pricings/${id}`);
        const { createdAt, updatedAt, __v, _id, ...rest } = data;
        if (data?.isTrial && interval === "annually") throw new Error();
        console.log(data);
        return {
            props: {
                data: { ...rest },
            },
        };
    } catch (err) {
        return {
            redirect: {
                destination: "/pricing",
                permanent: false,
            },
        };
    }
};

export default EditPricingPage;
