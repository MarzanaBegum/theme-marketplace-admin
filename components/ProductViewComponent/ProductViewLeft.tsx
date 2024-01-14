import React from "react";
import ProductViewDetails from "./ProductViewDetails";

function ProductViewLeft({ data }: any) {
    const reverseImages = data?.files?.images;

    return (
        <div className=" lg:w-[calc(100%-404px)] xl:w-[calc(100%-474px)] 2xl:w-[calc(100%-624px)]">
            {/* left description  */}

            <div>
                <div className="mb-[16px] sm:mb-[24] 2xl:mb-[28px]">
                    <img
                        className="object-cover w-full rounded-[6px]"
                        src={data?.files?.thumbnail}
                        alt=""
                    />
                </div>
                <div className="flex flex-col gap-[16px] sm:gap-[24px] 2xl:gap-[28px]">
                    {reverseImages?.map((item: any, i: number) => (
                        <div key={i}>
                            <img
                                src={item}
                                alt="More images"
                                className="w-full rounded-[6px]"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4"></div>

            <div className="lg:hidden">
                <ProductViewDetails data={data} />
            </div>
        </div>
    );
}

export default ProductViewLeft;
