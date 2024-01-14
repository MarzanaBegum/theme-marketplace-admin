import { ReactNode } from "react";

function UploadCard({
    children,
    error,
    id,
}: {
    id?: string;
    children?: ReactNode;
    error?: string;
}) {
    return (
        <div id={id} className="bg-white rounded-md p-4">
            {children}
            {error && <div className="text-xs mt-3 text-red-500">{error}</div>}
        </div>
    );
}

export function UploadCardHeader({ text }: { text: string }) {
    return (
        <div className="text-[#252C48] text-base lg:text-[22px] leading-[30px] font-medium">
            {text}
        </div>
    );
}

export default UploadCard;
