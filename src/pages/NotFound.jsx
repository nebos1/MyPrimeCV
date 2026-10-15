import MainNavbar from "../components/folder-navbar/MainNavbar";
import "./NotFound.css";
function NotFound() {
    return (
        <div className="not-found-page">
            <MainNavbar />
            <main className="not-found-content">
                <p className="not-found-code">404</p>
                <h1>Page not found</h1>
                <p>This address does not match a page on MyPrimeCV.</p>
                <a href="/">Back to home</a>
                <a href="/workspace">Open workspace</a>
            </main>
        </div>
    );
}
export default NotFound;
