/* eslint-disable react/jsx-no-undef */

import React from "react";
import { modalRadio } from "../../utils/constant";
import CustomModal from "../CustomModal";
import CrossIcon from "../CustomSvg/CrossIcon";
import RadioButton from "../RadioButton";
import { useState } from "react";
import LoadingAnimation from "../../components/CustomSvg/LoadingAnimation1";

type ModalProps = {
    isOpen: boolean;
    data?: any;
    confirmClick?: (data?: any, radioValue?: any, setLoading?: any) => void;
    onClose: () => void;
};

function EditProductModal({ isOpen, onClose, data, confirmClick }: ModalProps) {
    const [loading, setLoading] = useState(false);
    const [radioValue, setRadioValue] = useState("");

    const handleOnChange = (e: any) => {
        setRadioValue(e.target.value);
    };

    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="w-[calc(100vw-40px)]  max-w-[510px] bg-white px-[16px] py-[16px] lg:px-[32px] lg:py-[32px] rounded-[4px] modal-scroll overflow-hidden relative"
        >
            <div
                onClick={onClose}
                className="absolute top-[19px] right-[20px] lg:top-[35px] lg:right-[32px] onClick={onClose} cursor-pointer"
            >
                <CrossIcon width="12" height="12" />
            </div>
            <h1 className="text-[#252C48] font-medium lg:font-semibold text-[14px] lg:text-[18px] leading-[22px] lg:leading-[30px] ">
                Replace me with your headline
            </h1>
            <p className="text-[#3B415A] text-[12px] lg:text-[14px] font-normal leading-[22px] mt-[8px] lg:mt-[16px]">
                Replace me with a description of the message you are trying to
                promote, maximum 2 lines for product.
            </p>
            <ul className="mt-[16px] lg:mt-[32px] flex flex-col gap-[8px]">
                {modalRadio.map((item, index) => (
                    <li key={index} className=" group">
                        <RadioButton
                            value={item.value}
                            handleOnChange={(e: any) => handleOnChange(e)}
                            labelstyle="ml-[12px] text-[#3B415A] group-hover:text-[#7266FC] text-[14px] font-normal"
                            label={item.label}
                            data={data}
                            labelWrapper="flex py-[8px] lg:py-[16px] px-[16px] hover:bg-[#E3E0FE] rounded-[6px] cursor-pointer"
                        />
                    </li>
                ))}
            </ul>
            <div className="mt-[32px]">
                <div className="flex justify-end">
                    <div className="flex gap-[8px] lg:gap-[24px]">
                        <button
                            onClick={onClose}
                            className="w-[96px] h-[40px] lg:w-[150px] lg:h-[48px] rounded-[6px] text-[14px] text-[#7266FC] font-medium leading-[22px] bg-[#E3E0FE] "
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() =>
                                confirmClick &&
                                confirmClick(data, radioValue, setLoading)
                            }
                            className="w-[96px] h-[40px] lg:w-[150px] lg:h-[48px] rounded-[6px] text-[14px] text-white font-medium leading-[22px] bg-[#7266FC] hover:bg-[#473EAE] transition-all duration-200"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <LoadingAnimation color="#FFFFFF" />
                                </div>
                            ) : (
                                "Confirm"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </CustomModal>
    );
}

export function toCapitalized(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

EditProductModal.defaultProps = {
    type: "invite",
};

export default EditProductModal;
