import React from "react";
import ProductViewDetails from "./ProductViewDetails";
import ProductViewPaid from "./ProductViewPaid";
import { ProductType } from "../../pages/products/upload/preview/[id]";

function ProductViewRight({ data }: { data: ProductType }) {
    return (
        <div className="max-w-[480px] mx-auto lg:mx-0 lg:max-w-[380px] xl:max-w-[450px] 2xl:max-w-[600px] w-full">
            <ProductViewPaid data={data} />
            {/* Want this item? */}

            <div className="pt-5"></div>
            <div className="max-lg:hidden">
                <ProductViewDetails data={data} />
            </div>
        </div>
    );
}

export default ProductViewRight;
