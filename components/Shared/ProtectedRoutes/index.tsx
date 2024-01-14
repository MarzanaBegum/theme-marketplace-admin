import { getCookie } from "cookies-next";
import { AppContext } from "next/app";
import { decryptData } from "../../../utils/hashdata";

const ProtectedRoutes = async ({ ctx: { req, res, pathname } }: AppContext) => {
    const serverClientRedirect = async (redirect?: string) => {
        if (res) {
            res.writeHead(302, {
                Location: redirect || "/auth",
                "Content-Type": "text/html; charset=utf-8",
            });
            res.end();
        } else {
            if (typeof window !== "undefined") {
                (window as Window).location = redirect || "/auth";
                await new Promise((resolve) => {});
            }
        }
    };

    try {
        const isValid = decryptData(
            `${getCookie("admin-auth", {
                req,
                res,
            })}`
        );
        if (!isValid) throw new Error();
        if (pathname === "/auth") await serverClientRedirect("/dashboard");
        if (isValid && pathname === "/")
            await serverClientRedirect("/dashboard");
        return {
            id: isValid.id,
        };
    } catch (err) {
        if (pathname !== "/auth") await serverClientRedirect("/auth");
        return {};
    }
};

export default ProtectedRoutes;
