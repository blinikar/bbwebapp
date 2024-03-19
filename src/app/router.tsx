import { createBrowserRouter } from "react-router-dom";
import { Layout } from "/src/components/Layout";
import { PrintPage } from "/src/pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <PrintPage/>
            }
        ]
    },
]);