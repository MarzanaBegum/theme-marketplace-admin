import { deleteCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import React from "react";

function LogoutPage() {
    return <></>;
}

export default LogoutPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    deleteCookie("admin-auth", { req, res });

    return {
        redirect: {
            permanent: false,
            destination: "/auth",
        },
        props: {},
    };
};
