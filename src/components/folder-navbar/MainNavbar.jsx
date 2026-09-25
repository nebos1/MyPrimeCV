import "../../folder-logo/logo.css";
import "./MainNavbar.css";
import * as Icons from "../../folder-lucide-icons/lucide-icons";
import UploadCvButton from "../folder-upload-cv/UploadCvButton";

function GoToWorkspace() {
    window.location.href = "/workspace";
}

function GoToCreateMotivationLetter() {
    window.location.href = "/create-motivation-letter";
}

function MainNavbar() {
    function GoToFreeSection(event) {
        event.preventDefault();
        const freeSection = document.getElementById("why-free");

        if (freeSection) {
            freeSection.scrollIntoView({ behavior: "smooth" });
            return;
        }

        window.location.href = "/#why-free";
    }

    return (
        <nav className="main-navbar">
            <ul>
                <a href="/" className="logo" aria-label="MyPrimeCV">
                    <span className="logo-icon"></span>
                    <span className="logo-name">
                        MyPrime<span>CV</span>
                    </span>
                </a>
                <a href="/cv-templates" className="cv-templates">
                    CV templates
                </a>
                <button type="button" className="motivation-letters" onClick={GoToCreateMotivationLetter}>
                    Motivation letters
                </button>
                <a href="/#why-free" className="why-free" onClick={GoToFreeSection}>
                    Why free?
                </a>
                <button type="button" className="my-workspace" onClick={GoToWorkspace}>
                    <Icons.FolderOpenLucideIcon className="icon" /> My workspace
                </button>
                <UploadCvButton />
                <a href="/cv-templates" className="create-cv">
                    Create CV <Icons.ArrowRightLucideIcon className="icon" />
                </a>
            </ul>
        </nav>
    );
}

export default MainNavbar;
