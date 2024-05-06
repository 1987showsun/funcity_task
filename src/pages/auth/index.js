import { Outlet } from "react-router-dom";

// Stylesheets
import './public/index.scss';

const Index = () => {
    return(
        <div
            className = "auth-wrap"
        >
            <Outlet />
        </div>
    );
}

export default Index;