import React from "react";
import Select, { ActionMeta, StylesConfig } from "react-select";

type SelectProps = {
  options?: SelectOption[];
  placeholder?: string;
  defaultValue?: SelectOption;
  value?: SelectOption;
  className?:string;
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
      border: "1px solid #E5E7EB",
      borderRadius: "6px",
      paddingLeft:"20px",
      paddingRight: "20px",
      cursor:"pointer",
      boxShadow: "none",
      ":focus": {
        borderColor: "#E5E7EB",
    },
      minWidth: 155,
      minHeight: 48,
      background: "white",
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
      paddingLeft:"20px",
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
  return (
    <Select
      instanceId={"2a9ab63359466724"}
      options={props.options}
      styles={styles}
      onChange={props.onChange}
      value={props.value}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      className={`${props.className}`}
    />
  );
}


export default FilterByType;


