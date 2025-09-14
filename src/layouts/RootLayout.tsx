import { Outlet } from "react-router";
import { Toaster } from "sonner";

const RootLayout = () => {
    return (
        <div>
            <Outlet />
            <Toaster position = "top-right" richColors />
        </div>
    )
}

export default RootLayout;