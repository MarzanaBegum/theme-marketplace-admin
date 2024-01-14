import React from "react";
import PricingInput from "./PricingInput";
import PricingSelect from "./PricingSelect";
import { useRouter } from "next/router";
import { GetEditPricingContext } from "../../context/EditPricingContext";

const durationOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "annually", label: "Annually" },
];

type IType = "annually" | "monthly";

function PricingFirstSection() {
    const router = useRouter();
    let { interval }: any = router.query;
    interval = interval || "monthly";

    const [state, dispatch] = GetEditPricingContext();
    const price = state?.price[interval as IType];

    return (
        <div className="bg-white p-[24px] rounded-[6px] mb-6">
            <PricingInput
                label="Subscription Name"
                placeholder="subscription name"
                value={state.title}
                onChange={(e) => {
                    dispatch({
                        type: "title",
                        value: e.target.value,
                    });
                }}
            />

            <div className="mb-[24px]"></div>
            {!state?.isTrial && (
                <>
                    <PricingSelect
                        label="Subscription Duration"
                        options={durationOptions}
                        placeholder="subscription duration"
                        defaultValue={durationOptions.find(
                            (v) => v.value === interval
                        )}
                        onChange={(v: any) => {
                            router.push(
                                `/pricing/edit/${router?.query?.id}?interval=${v.value}`
                            );
                        }}
                    />
                    <div className="mb-[24px]"></div>
                </>
            )}

            <div className="relative">
                <PricingInput
                    label="Subscription Amount"
                    type="number"
                    className="!pl-[28px]"
                    placeholder="subscription amount"
                    value={price}
                    onKeyDown={(e) =>
                        ["e", "E", "+", "-", "."].includes(e.key) &&
                        e.preventDefault()
                    }
                    onChange={(e) => {
                        console.log(e.target.value);
                        dispatch({
                            type: `price.${interval}`,
                            value: e.target.value,
                        });
                    }}
                />
                <p className="absolute bottom-[13px] left-[15px] text-[14px] font-[400] text-[#252C48] mt-[1px]">
                    $
                </p>
            </div>
        </div>
    );
}

export default PricingFirstSection;
