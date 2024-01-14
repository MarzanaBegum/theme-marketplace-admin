import React from "react";
import { FieldHookConfig, useField, ErrorMessage } from "formik";
import classNames from "classnames";
import Select, { StylesConfig } from "react-select";
type SelectOption = {
    value: string;
    label: string;
};
interface InputSelectType {
    label?: string;
    options: SelectOption[];
    labelClass?: string;
    styles?: StylesConfig;
    handleOnChange?: (e: any) => void;
}

const styles: StylesConfig = {
    control: (base: any, state: any) => ({
        ...base,
        border: "1px solid #E5E7EB",
        borderRadius: "6px",
        paddingLeft: "15px",
        paddingRight: "0px",
        cursor: "pointer",
        boxShadow: "none",
        ":focus": {
            borderColor: "#E5E7EB",
        },
        minWidth: 155,
        minHeight: 48,
        background: "#F1F0FF",
        ":hover": {
            borderColor: "#E5E7EB",
        },
    }),
    singleValue: (styles) => ({
        ...styles,
        lineHeight: 1,
        fontSize: 14,
        fontWeight: 400,
        color: "#3B415A",
    }),
    input: (styles) => ({
        ...styles,
        opacity: 0,
        padding: 0,
        margin: 0,
        fontSize: 14,
        ":focus": {
            outline: "none",
        },
        placeContent: "Filter",
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        fontSize: "14px",
        paddingLeft: "20px",
        backgroundColor: state.isSelected ? "#E3E0FE" : "transparent",
        fontWeight: 400,
        color: state.isSelected ? "#7266FC" : "#3B415A",
        width: "100%",
        lineHeight: 1,
        margin: "0 auto",
        cursor: "pointer",
        ":hover": {
            background: state.isSelected ? "#E3E0FE" : "#E3E0FE",
            color: state.isSelected ? "#7266FC" : "#7266FC",
        },
    }),
    indicatorSeparator: (provided: any) => ({
        display: "none",
    }),
    menu: (styles) => ({
        ...styles,
        marginTop: 2,
    }),
    dropdownIndicator: (base, state: any) => ({
        ...base,
        transform: state.selectProps.menuIsOpen && "rotate(180deg)",
        color: "#3B415A",
        fontWeight: 200,
        ":hover": {},
    }),
    placeholder: (base) => ({ ...base, fontSize: 14 }),
    valueContainer: (styles) => ({
        ...styles,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 0,
        paddingLeft: 0,
    }),
    container: (styles) => ({
        ...styles,

        ":focus": { outline: "none" },
    }),
};

function GlobalSelect(props: InputSelectType & FieldHookConfig<string>) {
    const [field, meta, helpers] = useField(props);

    return (
        <div className={props.className}>
            <label
                className={
                    "lg:leading-[30px] lg:text-[22px] xs:leading-[22px] xs:text-[14px] font-[500] text-[#252C48] mb-2" +
                    " " +
                    props.labelClass
                }
                htmlFor={props.label}
            >
                {props.label}
            </label>
            {props.label && <div className="pt-[10px]"></div>}
            <div
                className={`  rounded-[8px] bg-[#070328] ${
                    meta.touched && meta.error && ""
                } ${props.className} `}
            >
                <Select
                    styles={Object.assign({}, styles, props.styles)}
                    name={field.name}
                    options={props.options}
                    value={props.options.find(
                        (option) => option.value === field.value
                    )}
                    placeholder={props.placeholder}
                    defaultValue={props.options.find(
                        (option) => option.value === props.defaultValue
                    )}
                    onBlur={() => helpers.setTouched(true)}
                    onChange={props.handleOnChange}
                />
            </div>
            <ErrorMessage
                component="div"
                className=" error text-[red] text-[16px]"
                name={field.name}
            />
        </div>
    );
}

export default GlobalSelect;
