import App from "./pages/LandingPage";
import {createBrowserRouter} from "react-router-dom"
import TeamDetails from "./pages/TeamDetails";
import FaqPage from "./pages/FaqPage.js";

const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <App/>
    },
    {
        path: "/faq",
        exact: true,
        element: <FaqPage/>
    },
    {
        path: "/team",
        exact: true,
        element: <TeamDetails/>
    }
]

export default createBrowserRouter(routes)