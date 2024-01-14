import UploadInput from "../Shared/UploadInput";
import { GetUploadProduct } from "../../context/UploadProductContext";
import React from "react";
import FixedTextInput from "./FixedTextInput";
import UploadCard, { UploadCardHeader } from "./UploadCard";

function PopularServiceSection() {
    const [state, dispatch] = GetUploadProduct();

    const services = state.services;
    const lastService = services[services.length - 1];

    const handleAddMore = () => {
        const newServices = services;
        newServices.push({ text: "", price: "" });
        dispatch({ type: "services", value: newServices });
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <UploadCardHeader text="Add popular service" />
                <button
                    onClick={handleAddMore}
                    disabled={!lastService.text || !lastService.price}
                    className="p-[6px] hover:bg-[#473EAE] lg:p-[9px_12px] disabled:bg-[#9AA5B5] disabled:hover:bg-[#9AA5B5] cursor-pointer text-sm text-white leading-[22px] text-center bg-[#7266FC] rounded-md"
                >
                    Add more
                </button>
            </div>
            <div className="pt-4"></div>
            <div className="flex flex-col gap-4">
                {state.services.map((v, i) => (
                    <PopularServiceItem
                        key={i}
                        textValue={v.text}
                        textOnchange={(e) =>
                            dispatch({
                                type: `services[${i}].text`,
                                value: e,
                            })
                        }
                        priceValue={v.price}
                        priceOnchange={(e) =>
                            dispatch({
                                type: `services[${i}].price`,
                                value: e,
                            })
                        }
                    />
                ))}
            </div>
        </div>
    );
}

type PSItemType = {
    textValue: string;
    textOnchange: (v: any) => any;
    priceValue: string;
    priceOnchange: (v: any) => any;
};

function PopularServiceItem({
    textValue,
    textOnchange,
    priceValue,
    priceOnchange,
}: PSItemType) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row">
            <div className="lg:w-[calc(100%-116px)]">
                <UploadInput
                    value={textValue}
                    onChange={(e) => textOnchange(e.target.value)}
                    placeholder="Write title here"
                />
            </div>
            <div className="lg:w-[100px]">
                <FixedTextInput
                    fixedText="$"
                    type="number"
                    value={priceValue}
                    placeholder="$00.00"
                    onChange={priceOnchange}
                />
            </div>
        </div>
    );
}

export default PopularServiceSection;
