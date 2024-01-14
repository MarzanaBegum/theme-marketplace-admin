import { GetEditPricingContext } from "../../context/EditPricingContext";
import { useRouter } from "next/router";
import React from "react";

type IType = "annually" | "monthly";

function PricingRightSection() {
    const router = useRouter();
    let { interval }: any = router.query;
    interval = interval || "monthly";

    const [state, dispatch] = GetEditPricingContext();
    const price = state?.price[interval as IType];
    return (
        <div className=" xs:hidden lg:block 2xl:block lg:w-[40%] 2xl:max-w-[448px] bg-white  2xl:p-6 lg:px-3 lg:py-6 rounded-[6px] mb-6">
            <div className="flex items-center gap-4">
                <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 1L15 10L1 19V1Z"
                        stroke="#252C48"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <p className="text-[#252C48] 2xl:text-[28px] 2xl:leading-[40px] font-[600]">
                    Here is live preview
                </p>
            </div>
            <div className=" ml-3 mb-[32px]"></div>
            <div
                style={{
                    boxShadow: "0px 10px 40px rgba(114, 102, 252, 0.25)",
                }}
                className="bg-[#7266FC] w-full rounded-[6px] 2xl:px-[24px] lg:px-[12px] py-[40px]"
            >
                <p className="text-white text-[24px] leading-[29px] font-[600] ">
                    {state?.title}
                </p>
                <p className="text-white 2xl:text-[56px] lg:text-[33px] font-[600] mt-[20px] mb-[24px] 2xl:relative">
                    $ {price}
                    <span className="font-[300] 2xl:top-[29px] capitalize 2xl:ml-[9px] 2xl:absolute text-[14px]">
                        / {state.isTrial ? "For Week" : interval}
                    </span>
                </p>
                <button className="bg-white border-[#7266FC] border-[1px] font-[700] text-[#7266FC] text-[16px] w-full mb-[40px] py-[18px] rounded-[4px]">
                    Get Started Now
                </button>
                <div className="flex flex-col gap-[14px]">
                    {state?.features?.map((feature: any, i: any) => (
                        <div key={i}>
                            {feature.isValid === true ? (
                                <li className="flex items-center justify-start">
                                    <img
                                        style={{
                                            width: "24x",
                                            height: "24px",
                                        }}
                                        className="px-[5px]  py-[6.5px] svg bg-[#FAFAFF] rounded-full "
                                        src="https://i.ibb.co/0sWm818/Shape-3.png"
                                        alt=""
                                    />
                                    <span className="ml-5 text-[16px] leading-[19px] font-[500]  text-white">
                                        {feature.text}
                                    </span>
                                </li>
                            ) : (
                                <li className="flex items-center justify-start">
                                    <img
                                        style={{
                                            width: "24x",
                                            height: "24px",
                                        }}
                                        className="p-[5px]  mr-5 svg bg-[#C7C2FE] rounded-full"
                                        src="https://i.ibb.co/QJR5B5p/Shape-2.png"
                                        alt=""
                                    />
                                    <span className="text-left text-[16px] leading-[19px] font-[500]  text-white">
                                        {feature.text}
                                    </span>
                                </li>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PricingRightSection;
