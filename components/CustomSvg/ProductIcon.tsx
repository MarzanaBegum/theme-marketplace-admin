import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const ProductIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M17.9204 0.52002H14.9604C14.5604 0.52002 14.1604 0.68002 13.8404 0.92002L12.4004 2.20002C12.0804 2.44002 11.6804 2.60002 11.2804 2.60002H2.08039C1.20039 2.60002 0.400391 3.32002 0.400391 5.08002V5.56002H6.32039C6.64039 5.56002 6.88039 5.72002 7.04039 5.96002L7.92039 7.40002H19.6804V3.00002C19.6004 1.24002 18.8804 0.52002 17.9204 0.52002Z"
                        fill={stroke}
                    />
                    <path
                        d="M6.72039 8.60003L5.92039 7.16003H0.400391V16.6C0.400391 16.76 1.12039 17.48 2.08039 17.48H17.9204C18.8804 17.48 19.6004 16.76 19.6004 16.6V8.92003H7.44039C7.12039 9.00003 6.88039 8.84003 6.72039 8.60003Z"
                        fill={stroke}
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default ProductIcon;
