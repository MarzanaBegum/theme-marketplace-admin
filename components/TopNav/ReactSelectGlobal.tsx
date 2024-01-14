import React from "react";
import Select, { ActionMeta, StylesConfig } from "react-select";
import classNames from "classnames";

type SelectType = {
    options: SelectOption[];
    defaultValue: SelectOption;
    value?: SelectOption;
    onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
    className?: string;
};

export type SelectOption = {
    value: string;
    label: string;
};

function ReactSelectGlobal(props: SelectType) {
    const styles: StylesConfig = {
        control: (base: any, state: any) => ({
            ...base,
            border: "1px solid #E5E7EB",
            paddingRight: 10,
            paddingLeft: 10,
            borderRadius: 8,
            boxShadow: "none",
            zIndex: 10,
            ":focus": {
                borderColor: "#E5E7EB",
            },

            minHeight: 48,
            background: "white",
            ":hover": {
                borderColor: "#E5E7EB",
            },
            cursor: "pointer",
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
            paddingLeft: 20,
            backgroundColor: state.isSelected ? "#E3E0FE" : "transparent",
            fontWeight: state.isSelected ? 400 : 400,
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
            zIndex: 10,
        }),
        dropdownIndicator: (base, state: any) => ({
            ...base,
            transform: state.selectProps.menuIsOpen && "rotate(180deg)",
            color: "#3B415A",
            fontWeight: 0,
            ":hover": {},
        }),
        menuList: (base, props) => ({ marginTop: 0, padding: 0, zIndex: 100 }),
        indicatorsContainer: (base) => ({
            ...base,
            height: 30,
            width: 30,
            padding: 0,
            marginTop: 8,
        }),
        container: (styles) => ({
            ...styles,

            ":focus": { outline: "none" },
        }),
    };

    return (
        <Select
            instanceId={"2a9ab63359466724"}
            options={props.options}
            styles={styles}
            onChange={props.onChange}
            value={props.value}
            className={props.className}
            defaultValue={props.defaultValue}
        />
    );
}

export default ReactSelectGlobal;
