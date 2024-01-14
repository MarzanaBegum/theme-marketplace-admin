import EditProductModal from "../../../components/EditProductModal";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../../api";
import {
    ProductResponseType,
    PRODUCT_QUERY_KEY,
} from "../../../api-call/useProductQuery";

const ProductDetail = ({ data }: { data: ProductResponseType }) => {
    const router = useRouter();
    const [editModal, setEditModal] = useState(false);
    const { refetch } = useQuery({ queryKey: PRODUCT_QUERY_KEY });

    const handleConfirm = async (
        data: any,
        radioValue: any,
        setLoading: any
    ) => {
        setLoading(true);

        if (radioValue === "edit-product") {
            await router.push({
                pathname: "/products/upload",
                query: { id: data?._id },
            });
        }

        if (radioValue === "hide-product" && data?.isVisible === true) {
            await api.put(`/products/${data?._id}`, { isVisible: false });
        }

        if (radioValue === "hide-product" && data?.isVisible === false) {
            await api.put(`/products/${data?._id}`, { isVisible: true });
        }

        setLoading(false);
        refetch();
        setEditModal(false);
    };

    return (
        <>
            <div
                className={` ${
                    data.isVisible ? "bg-white" : "bg-[#d6d6d669]"
                } rounded-[6px] text-[#252C48] relative cursor-pointer !h-auto px-[12px] py-[12px] w-[100%]`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex gap-[16px] w-[calc(100%-24px)] 3xl:w-[calc(100%-24px)]">
                        <img
                            src={data.files.thumbnail}
                            alt="product"
                            className="w-[48px] h-[48px] rounded-[6px]"
                        />
                        <div className="flex flex-col gap-[4px]">
                            <p className="font-medium line-clamp-2 text-[14px] 3xl:font-semibold 3xl:text-[18px] leading-[20px]">
                                {data.title}
                            </p>
                            <p className="font-medium capitalize text-[12px] leading-[18px]">
                                {data.type}
                            </p>
                        </div>
                    </div>
                    <div>
                        <img
                            onClick={() => setEditModal(true)}
                            src="/icon/editicon.svg"
                            alt=""
                            className="mt-[-15px] 3xl:w-[24px] 3xl:h-[24px] w-[17.5px] h-[17.5px]"
                        />
                    </div>
                </div>
            </div>
            <EditProductModal
                isOpen={editModal}
                data={data}
                confirmClick={handleConfirm}
                // type={"edit"}
                onClose={() => setEditModal(false)}
            />
        </>
    );
};

export default ProductDetail;
