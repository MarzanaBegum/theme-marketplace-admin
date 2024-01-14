import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useRouter } from "next/router";
import NewCloseIcon from "../../components/CustomSvg/NewCloseIcon";
import Eye from "../../components/CustomSvg/Eye";
import EyeOff from "../../components/CustomSvg/EyeOff";
import { useQuery } from "react-query";
import { api } from "../../api";
import { Formik, Form } from "formik";
import InputField from "../../components/InputField";
import GlobalSelect from "../../components/GlobalSelect";
import { toast } from "react-toastify";

const PricingDetail = () => {
    const [status, setStatus] = useState<boolean>(true);
    const router = useRouter();
    const { id, isMonthly }: any = router.query;
    const [disable, setDisable] = useState<boolean>(false);
    // const [data, setData] = useState<any>({});
    const [time, setTime] = useState("");
    const [featureData, setFeatureData] = useState<any>({});
    const [existingFeature, setExistingFeature] = useState<any>([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<any>("");
    const [isFeatureField, setIsFeatureField] = useState(false);
    const durationType = isMonthly === "true" ? "monthly" : "annually";
    const [duration, setDuration] = useState(durationType);
    const [featureValue, setFeatureValue] = useState("");

    const option = [
        { value: "monthly", label: "monthly" },
        { value: "annually", label: "yearly" },
    ];

    const { data, refetch } = useQuery(
        ["pricing"],
        () => api.get(`/pricings/${id}`),
        {
            enabled: !!id,
            onSuccess: (data) => {
                setFeatureData(data?.data);
                // setExistingFeature(data?.data.features);
                setTitle(data?.data.title);
                // const price =
                //     duration === "monthly"
                //         ? data?.data.price.monthly
                //         : data?.data.price.annually;
                // setPrice(price);
            },
        }
    );

    const priceData = featureData;
    const priceObj: any = priceData?.price;

    useEffect(() => {
        if (priceData?.title === "Freebie") {
            setDisable(true);
        }
        // setData(priceData);
        setExistingFeature(data?.data?.features);
        const price =
            duration === "monthly"
                ? data?.data?.price?.monthly
                : data?.data?.price?.annually;
        setPrice(price);
    }, [priceData, existingFeature, duration]);

    const initialValues = {
        title: "",
        duration: "",
        amount: "",
        features: "",
    };

    const handleSubmit = (e: any) => {
        const feature =
            e.features === ""
                ? [...existingFeature]
                : [...existingFeature, { text: e.features }];
        const updateData = {
            title: e.title === "" ? title : e.title,
            price:
                duration === "monthly"
                    ? { monthly: price, annually: featureData?.price.annually }
                    : { annually: price, monthly: featureData?.price.monthly },
            isTrial: false,
            features: feature,
        };
        api.put(`/pricings/${id}`, updateData).then((res) => {
            if (res.status === 200) {
                toast.success("Update successfully");
            }
            console.log(res, "----update res....");
            refetch();
        });
    };
    const handleVisible = (index: any) => {
        const updateFeature = {
            text: existingFeature[index].text,
            isValid: false,
        };
        setExistingFeature((existingFeature[index] = updateFeature));
        // const data = {
        //     features: [...existingFeature],
        // };
        // api.put(`/pricings/${id}`, data).then((res) => {
        //     refetch();
        // });
    };
    const handleHide = (index: any) => {
        const updateFeature = {
            text: existingFeature[index].text,
            isValid: true,
        };
        setExistingFeature((existingFeature[index] = updateFeature));
        // const data = {
        //     features: [...existingFeature],
        // };
        // api.put(`/pricings/${id}`, data).then((res) => {
        //     refetch();
        // });
    };
    const handleAdd = () => {
        const feature =
            featureValue === ""
                ? [...existingFeature]
                : [...existingFeature, { text: featureValue }];

        api.put(`/pricings/${id}`, { features: feature }).then((res) => {
            if (res.status === 200) {
                setFeatureValue("");
                toast.success("Update successfully");
                refetch();
            }
            
        });
    };

    const handleClose = (index: any) => {
        if (index !== -1) {
            const deleteData = featureData?.features.splice(index, 1);
            const filterItem = featureData?.features.filter(
                (item: any) => item !== deleteData
            );

            setExistingFeature({ features: filterItem });
            // const updateData = {
            //     features: [...featureData?.features],
            // };
            // api.put(`/pricings/${id}`, updateData).then((res) => {
            //     refetch();
            // });
        }
    };

    const onFormChange = (value: any) => {
        console.log(value.target.value, "________________onChange");
    };
    console.log(existingFeature, "featureData______");
    return (
        <>
            <DefaultLayout>
                <div className="2xl:p-[32px] lg:p-[20px] xs:px-[16px] ">
                    <div className="container mx-auto">
                        <p className="2xl:text-[28px] lg:text-[28px] xs:text-[18px] font-[600] text-[#252C48] mb-[24px] xs:mt-[8px] lg:text-left 2xl:text-left xs:text-center lg:mt-[32px] 2xl:mt-[32px]">
                            Edit Subscription
                        </p>
                        <div className="flex items-start">
                            <div className="2xl:w-[780px] xs:w-full lg:w-[60%] 2xl:mr-[40px] lg:mr-[15px]">
                                {/* formik here.....  */}
                                <Formik
                                    initialValues={initialValues}
                                    // enableReinitialize
                                    onSubmit={(
                                        value: any,
                                        { resetForm }: any
                                    ) => {
                                        handleSubmit(value);
                                        resetForm({ value: "" });
                                    }}

                                    // validationSchema={validationSchema}
                                >
                                    {({ setFieldValue }) => (
                                        <Form
                                            onChange={(values) =>
                                                onFormChange(values)
                                            }
                                        >
                                            <div className="bg-white p-[24px] rounded-[6px] mb-6">
                                                <InputField
                                                    value={title}
                                                    onChange={(e: any) => {
                                                        setTitle(
                                                            e.target.value
                                                        );
                                                        setFieldValue(
                                                            "title",
                                                            e.target.value
                                                        );
                                                    }}
                                                    className="!w-[100%]"
                                                    placeholder="Subscription Name"
                                                    name="title"
                                                    type="text"
                                                    label="Subsciption Name"
                                                />
                                                {!featureData?.isTrial && (
                                                    <div>
                                                        <GlobalSelect
                                                            handleOnChange={(
                                                                e: any
                                                            ) =>
                                                                setDuration(
                                                                    e.value
                                                                )
                                                            }
                                                            name="duration"
                                                            options={option}
                                                            label="Subscription Duration"
                                                            placeholder={
                                                                isMonthly ===
                                                                "true"
                                                                    ? "Monthly"
                                                                    : "Yearly"
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                <div className="relative">
                                                    <InputField
                                                        value={price}
                                                        onChange={(e: any) => {
                                                            setPrice(
                                                                e.target.value
                                                            );
                                                            setFieldValue(
                                                                "amount",
                                                                e.target.value
                                                            );
                                                        }}
                                                        inputClass="!px-[28px]"
                                                        className="!w-[100%] mt-6"
                                                        placeholder={`${
                                                            duration === ""
                                                                ? isMonthly ===
                                                                  "true"
                                                                    ? "Monthly"
                                                                    : "Annually"
                                                                : duration ===
                                                                  "monthly"
                                                                ? "Monthly"
                                                                : "Yearly"
                                                        } Description Amount`}
                                                        name="amount"
                                                        type="number"
                                                        label={`${
                                                            duration === ""
                                                                ? isMonthly ===
                                                                  "true"
                                                                    ? "Monthly"
                                                                    : "Annually"
                                                                : duration ===
                                                                  "monthly"
                                                                ? "Monthly"
                                                                : "Yearly"
                                                        } Description Amount`}
                                                    />
                                                    <p className="absolute bottom-[37px] left-[15px] text-[14px] font-[400] text-[#252C48] mt-[1px]">
                                                        $
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-white p-6 rounded-[6px]">
                                                <div className="flex justify-between w-full mb-[21px]">
                                                    <p className="lg:text-[22px] xs:text-[16px] font-[500] text-[#252C48] mb-2">
                                                        Add offer
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={handleAdd}
                                                        className="px-3 py-2 rounded-[8px] bg-[#7266FC] hover:bg-[#473EAE] transition-all duration-200 flex justify-center items-center gap-[11.33px] text-[14px] text-white font-semibold"
                                                    >
                                                        Add more
                                                    </button>
                                                </div>

                                                <InputField
                                                    className="!w-[100%]"
                                                    value={featureValue}
                                                    placeholder="Type features name"
                                                    name="features"
                                                    type="text"
                                                    onChange={(e: any) => {
                                                        setFeatureValue(
                                                            e.target.value
                                                        );
                                                        setFieldValue(
                                                            "features",
                                                            e.target.value
                                                        );
                                                    }}
                                                />

                                                {featureData?.features?.map(
                                                    (item: any, index: any) => (
                                                        <div key={index}>
                                                            <div className="group justify-between items-center flex p-3 bg-[#F1F0FF] rounded-[6px] mb-4 text-[#252C48] text-[14px] font-[400]">
                                                                <div className="flex flex-row items-center">
                                                                    <div
                                                                        onClick={() => {}}
                                                                        className=""
                                                                    >
                                                                        {item.isValid ===
                                                                        true ? (
                                                                            <div
                                                                                onClick={() =>
                                                                                    handleVisible(
                                                                                        index
                                                                                    )
                                                                                }
                                                                                className="cursor-pointer"
                                                                            >
                                                                                <Eye groupClassName="fill-[#000000]"></Eye>
                                                                            </div>
                                                                        ) : (
                                                                            <div
                                                                                onClick={() =>
                                                                                    handleHide(
                                                                                        index
                                                                                    )
                                                                                }
                                                                                className="mt-1 cursor-pointer"
                                                                            >
                                                                                <EyeOff groupClassName="fill-[#000000] " />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-[14px] text-[#252C48] font-[400] inline mt-1 ml-4">
                                                                        {
                                                                            item.text
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div
                                                                    onClick={() =>
                                                                        handleClose(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <NewCloseIcon
                                                                        groupClassName="fill-[#6B7280] "
                                                                        className="cursor-pointer"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <div className="lg:flex lg:flex-row lg:justify-end 2xl:flex-row 2xl:flex 2xl:justify-end xs:flex xs:flex-col xs:justify-center xs:w-full">
                                                <button
                                                    onClick={() => refetch()}
                                                    type="button"
                                                    className="2xl:mr-8 lg:mr-8 xs:mr-0 px-[75px] py-3 rounded-[8px] bg-opacity-100 border-[#7266FC] border-[1px] hover:bg-[#E3E0FE] hover:border-[#E3E0FE] hover:text-[#7266FC] transition-all duration-200 flex justify-center items-center gap-[11.33px] 2xl:mt-[40px] lg:mt-[40px] xs:mt-[24px] text-[14px] text-[#312987] h-[48px] font-semibold"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    // onClick={handleUpdate}
                                                    className="2xl:mt-[40px] lg:mt-[40px] xs:mt-[24px] px-[75px] py-3 rounded-[8px] bg-[#7266FC] hover:bg-[#473EAE] transition-all duration-200 flex justify-center items-center gap-[11.33px] text-[14px] text-white font-semibold xs:mb-[24px]"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>

                            <div className=" xs:hidden lg:block 2xl:block lg:w-[40%] 2xl:max-w-[448px] bg-white  2xl:p-6 lg:px-3 lg:py-6 rounded-[6px] mb-6">
                                <div className="flex items-start">
                                    <svg
                                        className="mt-[3px]"
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
                                    <p className="text-[#252C48] ml-3 mb-[32px] 2xl:text-[28px] 2xl:leading-[40px] font-[600]">
                                        Here is live preview
                                    </p>
                                </div>
                                <div
                                    style={{
                                        boxShadow:
                                            "0px 10px 40px rgba(114, 102, 252, 0.25)",
                                    }}
                                    className="bg-[#7266FC] w-full rounded-[6px] 2xl:px-[24px] lg:px-[12px] py-[40px]"
                                >
                                    <p className="text-white text-[24px] leading-[29px] font-[600] ">
                                        {title}
                                    </p>
                                    <p className="text-white 2xl:text-[56px] lg:text-[33px] font-[600] mt-[20px] mb-[24px] 2xl:relative">
                                        $ {price}
                                        <span className="font-[300] 2xl:top-[29px] 2xl:ml-[9px] 2xl:absolute text-[14px]">
                                            /{" "}
                                            {duration === ""
                                                ? isMonthly === "true"
                                                    ? "monthly"
                                                    : "annually"
                                                : duration === "monthly"
                                                ? "monthly"
                                                : "annually"}
                                        </span>
                                    </p>
                                    <button className="bg-white border-[#7266FC] border-[1px] font-[700] text-[#7266FC] text-[16px] w-full mb-[40px] py-[18px] rounded-[4px]">
                                        Get Started Now
                                    </button>
                                    {featureData?.features?.map(
                                        (feature: any, i: any) => (
                                            <div key={i}>
                                                {feature.isValid === true ? (
                                                    <li className="flex items-center justify-start">
                                                        <img
                                                            style={{
                                                                width: "24x",
                                                                height: "24px",
                                                            }}
                                                            className="px-[5px] mb-[12px] py-[6.5px] svg bg-[#FAFAFF] rounded-full "
                                                            src="https://i.ibb.co/0sWm818/Shape-3.png"
                                                            alt=""
                                                        />
                                                        <span className="ml-5 text-[16px] leading-[19px] font-[500] mb-[18px] text-white">
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
                                                            className="p-[5px] mb-[12px] mr-5 svg bg-[#C7C2FE] rounded-full"
                                                            src="https://i.ibb.co/QJR5B5p/Shape-2.png"
                                                            alt=""
                                                        />
                                                        <span className="text-left text-[16px] leading-[19px] font-[500] mb-[18px] text-white">
                                                            {feature.text}
                                                        </span>
                                                    </li>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
};

export default PricingDetail;
