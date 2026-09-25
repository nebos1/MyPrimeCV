import "../../folder-logo/logo.css";
import "./MainNavbar.css";
import * as Icons from "../../folder-lucide-icons/lucide-icons";
import UploadCvButton from "../folder-upload-cv/UploadCvButton";

function GoToCVTemplates() {
    window.location.href = "/cv-templates";
}

function GoToHome() {
    window.location.href = "/";
}

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
                <button type="button" className="logo" aria-label="MyPrimeCV" onClick={GoToHome}>
                    <span className="logo-icon"></span>
                    <span className="logo-name">
                        MyPrime<span>CV</span>
                    </span>
                </button>
                <button type="button" className="cv-templates" onClick={GoToCVTemplates}>
                    CV templates
                </button>
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
                <button type="button" className="create-cv" onClick={GoToCVTemplates}>
                    Create CV <Icons.ArrowRightLucideIcon className="icon" />
                </button>
            </ul>
        </nav>
    );
}

export default MainNavbar;
