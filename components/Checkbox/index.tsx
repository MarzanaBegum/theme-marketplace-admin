type LabelProps = {
    label: string;
    labelstyle: string;
    handleOnChange: any;
    value: any;
    checked?: any;
};

const Checkbox = ({
    label,
    labelstyle,
    handleOnChange,
    value,
    checked,
}: LabelProps) => {
    return (
        <div className="group ">
            <label className="flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    name="check"
                    className="group-hover:border-[#7266FC] transit"
                    onChange={(event) => handleOnChange(event)}
                    value={value}
                    checked={checked}
                />
                {/* <input type="checkbox" className="" checked={true} /> */}
                <span
                    className={`group-hover:text-[#7266FC] transit ${labelstyle}`}
                >
                    {label}
                </span>
            </label>
        </div>
    );
};
export default Checkbox;
