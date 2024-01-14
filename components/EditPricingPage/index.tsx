import DefaultLayout from "../../components/DefaultLayout";
import React from "react";
import PricingSecondSection from "./PricingSecondSection";
import PricingRightSection from "./PricingRightSection";
import PricingButtonSection from "./PricingButtonSection";
import PricingFirstSection from "./PricingFirstSection";

function EditPricingPageComponent() {
    return (
        <DefaultLayout>
            <div className="2xl:p-[32px] lg:p-[20px] xs:px-[16px] ">
                <div className="container mx-auto">
                    <p className="2xl:text-[28px] lg:text-[28px] xs:text-[18px] font-[600] text-[#252C48] mb-[24px] xs:mt-[24px] lg:text-left 2xl:text-left xs:text-center lg:mt-[32px] 2xl:mt-[32px]">
                        Edit Subscription
                    </p>
                    <div className="flex items-start">
                        <div className="2xl:w-[780px] xs:w-full lg:w-[60%] 2xl:mr-[40px] lg:mr-[15px]">
                            {/* subscription first section  */}
                            <PricingFirstSection />

                            {/* subscription second section  */}
                            <PricingSecondSection />

                            {/* subscription button section  */}
                            <PricingButtonSection />
                        </div>

                        <PricingRightSection />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default EditPricingPageComponent;
