type LabelProps = {
    label: string;
    labelstyle: string;
    handleOnChange: any;
    value: any;
    labelWrapper?: string;
    data?: any;
};

const RadioButton = ({
    label,
    labelstyle,
    handleOnChange,
    value,
    labelWrapper,
    data,
}: LabelProps) => {
    return (
        <>
            <label
                style={{ display: "flex", alignItems: "center" }}
                className={`${labelWrapper}`}
            >
                <input
                    type="radio"
                    name="radio check"
                    onChange={(event) => handleOnChange(event)}
                    value={value}
                />
                {/* <input type="checkbox" className="" checked={true} /> */}
                {label === "Hidden this product from site" &&
                data?.isVisible === false ? (
                    <span className={labelstyle}>Show this product</span>
                ) : (
                    <span className={labelstyle}>{label}</span>
                )}
            </label>
        </>
    );
};
export default RadioButton;
