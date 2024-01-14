import { UploadProductProvider } from "../../../context/UploadProductContext";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { api } from "../../../api";
import { ProductUploadConstant } from "../../../utils/data";

const UploadProductComponent = dynamic(
    () => import("../../../components/UploadProductPage"),
    { ssr: false }
);

function ProductUpload({ data, title, isUpdate, split, id }: any) {
    return (
        <UploadProductProvider product={data}>
            <UploadProductComponent
                split={split || (isUpdate ? 7 : 5)}
                title={title}
                isUpdate={isUpdate}
                id={id}
            />
        </UploadProductProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    try {
        if (!query) throw new Error("");
        if (query.id) {
            const { data } = await api.get(`/products/single/${query.id}`);
            const {
                _id,
                isVisible,
                views,
                downloads,
                createdAt,
                updatedAt,
                ratings,
                comments,
                buyout,
                __v,
                ...rest
            } = data;
            if (data) {
                return {
                    props: {
                        data: rest,
                        isUpdate: true,
                        title: data.type,
                        id: _id,
                    },
                };
            }
        }
        const find = ProductUploadConstant.find((v) => v.param === query.type);
        if (!find) throw new Error("");
        return {
            props: {
                data: find.default,
                isUpdate: false,
                title: find.title,
                split: find.split,
            },
        };
    } catch (err) {
        return {
            redirect: {
                permanent: true,
                destination: "/dashboard",
            },
        };
    }
};

export default ProductUpload;
