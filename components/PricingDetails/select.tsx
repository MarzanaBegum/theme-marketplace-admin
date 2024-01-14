import React from "react";
import Select, { ActionMeta, StylesConfig } from "react-select";

type SelectProps = {
    options?: SelectOption[];
    placeholder?: string;
    defaultValue?: SelectOption;
    value?: SelectOption;
    selectClassName?: string;
    disable?: boolean;
    name?: string;
    onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
};
export type SelectOption = {
    value: string;
    label: string;
};

function FilterByType(props: SelectProps) {
    const styles: StylesConfig = {
        control: (base: any, state: any) => ({
            ...base,
            border: "1px solid #E3E0FE",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "none",
            ":focus": {
                borderColor: "#9E9E9E",
            },
            minWidth: 163.5,
            minHeight: 48,
            background: "#F1F0FF",
        }),
        singleValue: (styles) => ({
            ...styles,
            lineHeight: 1,
            fontSize: 14,
            fontWeight: 400,
            color: "#252C48",
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
            backgroundColor: state.isSelected ? "#E3E0FE" : "transparent",
            fontWeight: state.isSelected ? 500 : 400,
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
            marginTop: -1,
        }),
        dropdownIndicator: (base, state: any) => ({
            ...base,
            transform: state.selectProps.menuIsOpen && "rotate(180deg)",
            color: "#3B415A",
            fontWeight: 200,
        }),

        valueContainer: (styles) => ({
            ...styles,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 16,
        }),
        container: (styles) => ({
            ...styles,

            ":focus": { outline: "none" },
        }),
    };
    return (
        <Select
            instanceId={"2a9ab63359466724"}
            name={props.name}
            options={props.options}
            styles={styles}
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
            isDisabled={props.disable}
            className={`${props.selectClassName} placeholder:text-black`}
        />
    );
}

export default FilterByType;
