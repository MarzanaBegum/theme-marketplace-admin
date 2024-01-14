import CloseIcon from "../../components/CustomSvg/CloseIcon";
import PlusIcon from "../../components/CustomSvg/PlusIcon";
import UploadInput from "../Shared/UploadInput";
import { GetUploadProduct } from "../../context/UploadProductContext";
import React, { useState } from "react";
import { UploadCardHeader } from "./UploadCard";

function FeaturesNameSection() {
    const [state, dispatch] = GetUploadProduct();
    const features = state.features;

    const lastFeatures = features[features.length - 1];

    const handleAddMore = () => {
        const newFeatures = features;
        newFeatures.push({ heading: "", list: [] });
        dispatch({ type: `features`, value: newFeatures });
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <UploadCardHeader text="Type Features name" />
                <button
                    onClick={handleAddMore}
                    disabled={!lastFeatures.heading || !lastFeatures.list[0]}
                    className="p-[6px] hover:bg-[#473EAE] lg:p-[9px_12px] disabled:bg-[#9AA5B5] disabled:hover:bg-[#9AA5B5] cursor-pointer text-sm text-white leading-[22px] text-center bg-[#7266FC] rounded-md"
                >
                    Add more
                </button>
            </div>

            {features.map((val, index) => (
                <div key={index} className="mt-4">
                    <UploadInput
                        placeholder="Type features headline"
                        value={val.heading}
                        className="font-semibold "
                        onChange={(e) =>
                            dispatch({
                                type: `features[${index}].heading`,
                                value: e.target.value,
                            })
                        }
                    />
                    {val.heading && (
                        <FeaturesItem list={val.list} index={index} />
                    )}
                </div>
            ))}
        </div>
    );
}

function FeaturesItem({ list, index }: { list: string[]; index: number }) {
    const [state, dispatch] = GetUploadProduct();
    const [newItem, setNewItem] = useState("");

    const addItem = () => {
        const newList = [...list];
        newList.push(newItem.trim());
        dispatch({ type: `features[${index}].list`, value: newList });
        setNewItem("");
    };

    const removeItem = (i: number) => {
        let newList = list;
        newList.splice(i, 1);
        dispatch({ type: `features[${index}].list`, value: newList });
    };

    return (
        <div>
            <div>
                {list.map((v, i) => (
                    <div key={i} className="relative mt-4">
                        <UploadInput
                            className="lg:!p-[8px_16px] pr-10"
                            value={v}
                            onChange={(e) =>
                                dispatch({
                                    type: `features[${index}].list[${i}]`,
                                    value: e.target.value,
                                })
                            }
                        />
                        <span onClick={() => removeItem(i)}>
                            <CloseIcon
                                className="absolute top-0 bottom-0 my-auto right-3 cursor-pointer"
                                groupClassName="fill-[#6B7280]"
                            />
                        </span>
                    </div>
                ))}
            </div>

            <div className="pt-4"></div>

            <div className="flex gap-4">
                <div className="w-[calc(100%-56px)] lg:w-[calc(100%-64px)]">
                    <UploadInput
                        className="lg:!p-[8px_16px]"
                        placeholder="type features"
                        value={newItem}
                        onChange={
                            (e) => {
                                setNewItem(e.target.value);
                            }
                            // dispatch({
                            //     type: `features[${index}].list[${
                            //         list.length - 1
                            //     }]`,
                            //     value: e.target.value,
                            // })
                        }
                    />
                </div>
                <button
                    onClick={addItem}
                    disabled={!newItem}
                    className="hover:bg-[#473EAE] flex items-center justify-center disabled:bg-[#9AA5B5] disabled:hover:bg-[#9AA5B5]  bg-[#7266FC]  rounded-md h-[40px] w-[40px] lg:w-[48px] p-2"
                >
                    <PlusIcon stroke="#fff" />
                </button>
            </div>
        </div>
    );
}

export default FeaturesNameSection;
