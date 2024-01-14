import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

function NewUploadIcon(props: IconType) {
    return (
        <CustomIcon
            {...props}
            svg={({ height, width, className, groupClassName, color }) => (
                <svg
                    width={width}
                    height={height}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={className}
                >
                    <path
                        d="M12 3C8.91 3 6.48 5.348 6.14 8.344a3.671 3.671 0 0 0-2.882 2.415C1.413 11.29 0 12.936 0 15a4.49 4.49 0 0 0 4.5 4.5h15A4.49 4.49 0 0 0 24 15c0-1.32-.641-2.502-1.57-3.329-.174-2.635-2.277-4.738-4.922-4.874C16.605 4.6 14.534 3 12 3Zm0 1.5c2.072 0 3.727 1.327 4.313 3.21l.165.54h.772A3.756 3.756 0 0 1 21 12v.375l.305.235A3.053 3.053 0 0 1 22.5 15c0 1.707-1.293 3-3 3h-15c-1.707 0-3-1.293-3-3a2.956 2.956 0 0 1 2.46-2.93l.493-.093.093-.494c.225-1.01 1.121-1.733 2.204-1.733h.75V9c0-2.527 1.973-4.5 4.5-4.5Zm0 4.195-.54.516-3 3 1.08 1.08 1.71-1.713V16.5h1.5v-4.922l1.71 1.711 1.08-1.08-3-3-.54-.514Z"
                        fill={color}
                        className={(groupClassName = "")}
                    />
                </svg>
            )}
        />
    );
}

export default NewUploadIcon;
