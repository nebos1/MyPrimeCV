import CVTemplates from "./pages/folder-cv-templates/cv-templates";
import MainNavbarShell from "./components/folder-navbar/MainNavbarShell";
import CreateCV from "./pages/folder-create-cv/create-cv";
import HomePage from "./pages/home/HomePage";
import CreateMotivationLetter from "./pages/folder-create-motivation-letter/create-motivation-letter";
import AllDocuments from "./pages/folder-storage/folder-all-documents/all-documents";
import Favorites from "./pages/folder-storage/folder-favorites/favorites";
import MotivationLetters from "./pages/folder-storage/folder-motivation-letters/motivation-letters";
import Resumes from "./pages/folder-storage/folder-resumes/resumes";
import Trash from "./pages/folder-storage/trash/trash";

function App() {
    const currentPage = window.location.pathname;
    const currentHash = window.location.hash;

    if (
        currentPage === "/workspace" ||
        currentPage === "/workspace/" ||
        currentPage === "/dashboard" ||
        currentPage === "/dashboard/" ||
        currentHash === "#dashboard"
    ) {
        return <AllDocuments />;
    }

    if (currentPage === "/favorites" || currentPage === "/favorites/" || currentHash === "#favorites") {
        return <Favorites />;
    }

    if (currentPage === "/resumes" || currentPage === "/resumes/" || currentHash === "#resumes") {
        return <Resumes />;
    }

    if (
        currentPage === "/motivation-letters" ||
        currentPage === "/motivation-letters/" ||
        currentHash === "#motivation-letters"
    ) {
        return <MotivationLetters />;
    }

    if (currentPage === "/create-motivation-letter" || currentPage === "/create-motivation-letter/") {
        return <CreateMotivationLetter />;
    }

    if (currentPage === "/create-cv" || currentPage === "/create-cv/") {
        return <CreateCV />;
    }

    if (currentPage === "/trash" || currentPage === "/trash/" || currentHash === "#trash") {
        return <Trash />;
    }

    if (currentPage === "/cv-templates" || currentPage === "/cv-templates/") {
        return (
            <MainNavbarShell>
                <CVTemplates />
            </MainNavbarShell>
        );
    }

    return <HomePage />;
}

export default App;
