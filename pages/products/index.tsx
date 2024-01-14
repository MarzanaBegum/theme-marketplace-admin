import LoadingAnimation from "../../components/CustomSvg/LoadingAnimation2";
import ProductItemView from "../../components/ProductPage/ProductItemView";
import ProductTopNav from "../../components/ProductPage/ProductTopNav";
import React from "react";
import useProductQuery, {
    ProductResponseType,
} from "../../api-call/useProductQuery";
import DefaultLayout from "../../components/DefaultLayout";
import Meta from "../../components/Shared/Meta";

const Products = () => {
    const { data, isLoading } = useProductQuery();

    return (
        <div className="">
            <Meta title="Products - Theme Gregg Admin" />

            <DefaultLayout>
                <div className="lg:px-[31px] h-full lg:py-[32px] px-[16px] py-[16px]">
                    {data ? (
                        <>
                            <ProductTopNav />
                            <ProductItemView
                                filterTab={CreateFilterTab(data)}
                            />
                        </>
                    ) : isLoading ? (
                        <div className="w-full h-[85vh] flex items-center justify-center">
                            <LoadingAnimation
                                color="#7266FC"
                                width={50}
                                height={50}
                            />
                        </div>
                    ) : (
                        <div className=" flex flex-col h-[80vh]  justify-center items-center">
                            <div>No product found</div>
                        </div>
                    )}
                </div>
            </DefaultLayout>
        </div>
    );
};

function CreateFilterTab(data: ProductResponseType[]): string[] {
    const filterType = data.map((v) => v.type);
    const hiddenProduct = data.filter((v) => !v.isVisible);

    const filterTab = ["all products", ...filterType];

    if (hiddenProduct.length) {
        filterTab.push("hidden products");
    }

    return filterTab;
}

export default Products;
