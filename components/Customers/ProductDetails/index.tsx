import React from "react";

const commonStyle = "text-[14px] leading-[22px] font-medium text-[#6B7280]";

const ProductDetails = () => {
  return (
    <div className="max-w-[420px] mt-[17px]">
      <h1 className="mb-[8px] text-[18px] leading-[30px] font-semibold text-[#4B5563]">
        Product Details
      </h1>
      <div className="flex justify-between">
        <div className={`${commonStyle}`}>Product Name</div>
        <div className={`${commonStyle}`}>Ghuri Learning Theme</div>
      </div>
      <div className="pt-4"></div>
      <div className="flex justify-between">
        <div className={`${commonStyle}`}>License</div>
        <div className={`${commonStyle}`}>Commercial</div>
      </div>
      <div className="pt-4"></div>
      <div className="flex justify-between">
        <div className={`${commonStyle}`}>Subscription type</div>
        <div className={`${commonStyle}`}>Professional</div>
      </div>
    </div>
  );
};

export default ProductDetails;
