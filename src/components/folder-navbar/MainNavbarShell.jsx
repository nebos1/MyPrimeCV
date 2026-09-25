import "./MainNavbarShell.css";
import MainNavbar from "./MainNavbar";

function MainNavbarShell({ children }) {
    return (
        <div className="site-layout">
            <MainNavbar />
            {children}
        </div>
    );
}

export default MainNavbarShell;
