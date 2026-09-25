import "../../../folder-logo/logo.css";
import "../workspace.css";
import * as Icons from "../../../folder-lucide-icons/lucide-icons";
import { useRef, useState } from "react";

import WorkspaceBackupActions from "../components/WorkspaceBackupActions";
import WorkspaceDocumentsList from "../components/WorkspaceDocumentsList";
import {
    GetWorkspaceCountsFromDocuments,
    GetWorkspaceDocuments,
    RenameWorkspaceDocument,
    PermanentlyDeleteWorkspaceDocument,
    RestoreWorkspaceDocument,
} from "../../folder-local-storage/workspace-storage";
import "./trash.css";

function goToHome() {
    window.location.href = "/";
}

function goToCVTemplates() {
    window.location.href = "/cv-templates";
}

function goToWorkspace() {
    window.location.href = "/workspace";
}

function goToFavorites() {
    window.location.href = "/favorites";
}

function goToResumes() {
    window.location.href = "/resumes";
}

function goToMotivationLetters() {
    window.location.href = "/motivation-letters";
}

function goToCreateMotivationLetter() {
    window.location.href = "/create-motivation-letter";
}

function goToTrash() {
    window.location.href = "/trash";
}

function Trash() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const backupInputRef = useRef(null);
    const [documents, setDocuments] = useState(() => GetWorkspaceDocuments());
    const counts = GetWorkspaceCountsFromDocuments(documents);
    const visibleDocuments = documents.filter((document) => document.trashed);
    const count = visibleDocuments.length;
    const favoriteCount = counts.favorites;
    const resumeCount = counts.resumes;
    const motivationCount = counts.motivationLetters;
    const trashCount = counts.trash;

    function HandlePermanentDelete(documentId) {
        setDocuments(PermanentlyDeleteWorkspaceDocument(documentId));
    }

    function HandleRestore(documentId) {
        setDocuments(RestoreWorkspaceDocument(documentId));
    }

    function HandleRename(documentId, title) {
        setDocuments(RenameWorkspaceDocument(documentId, title));
    }

    let createDocIconClassName;
    if (isOpen) {
        createDocIconClassName = "create-doc-icon active";
    } else {
        createDocIconClassName = "create-doc-icon";
    }

    let documentDropdownMenuClassName;
    if (isOpen) {
        documentDropdownMenuClassName = "document-dropdown-menu open";
    } else {
        documentDropdownMenuClassName = "document-dropdown-menu";
    }

    let documentSuffix;
    if (count === 1) {
        documentSuffix = "";
    } else {
        documentSuffix = "s";
    }

    return (
        <div className="workspace-page trash-page">
            <section className="workspace-content">
                <div className="workspace-header">
                    <div className="workspace-title">
                        <span className="eyebrow">my workspace</span>
                        <h1>Welcome back</h1>
                    </div>

                    <div className="workspace-actions">
                        <div className="workspace-search">
                            <Icons.SearchLucideIcon className="search-icon" />
                            <input
                                placeholder="Search documents"
                                aria-label="Search documents"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                        </div>
                        <button
                            className="create-resume"
                            type="button"
                            onClick={() => setIsOpen((previous) => !previous)}
                        >
                            <Icons.PlusLucideIcon className="create-doc-icon" />
                            New document
                            <Icons.ChevronDownLucideIcon className={createDocIconClassName} />
                        </button>

                        <div className={documentDropdownMenuClassName}>
                            <button type="button" onClick={goToCVTemplates}>
                                <Icons.FilePlusCornerLucideIcon className="new-doc-icon" />
                                <span className="new-doc-title">Resume</span>
                                <span className="new-doc-description">Start with a professional template</span>
                            </button>
                            <button type="button" onClick={goToCreateMotivationLetter}>
                                <Icons.MailLucideIcon className="new-doc-icon" />
                                <span className="new-doc-title">Motivation letter</span>
                                <span className="new-doc-description">Start with a professional template</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    backupInputRef.current?.click();
                                    setIsOpen(false);
                                }}
                            >
                                <Icons.UploadLucideIcon className="new-doc-icon" />
                                <span className="new-doc-title">Import backup</span>
                                <span className="new-doc-description">Import an editable backup</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="recently-edited">
                    <h2>Trash:</h2>
                    <span>
                        {count} document{documentSuffix}
                    </span>
                </div>

                <WorkspaceDocumentsList
                    documents={visibleDocuments}
                    search={search}
                    onRename={HandleRename}
                    emptyIcon={Icons.Trash2LucideIcon}
                    emptyTitle="Trash is empty"
                    emptyText="Deleted documents will appear here before permanent removal."
                    onPermanentDelete={HandlePermanentDelete}
                    onRestore={HandleRestore}
                />
            </section>

            <section className="sidebar">
                <button type="button" className="workspace-logo" onClick={goToHome} aria-label="MyPrimeCV">
                    <span className="logo-icon"></span>
                    <span className="logo-name">
                        MyPrime<span>CV</span>
                    </span>
                </button>
                <div className="sidebar-options">
                    <button type="button" className="all-documents" onClick={goToWorkspace}>
                        <Icons.HouseLucideIcon className="workspace-icons" />
                        All documents <small>{counts.all}</small>
                    </button>
                    <button type="button" className="favourite" onClick={goToFavorites}>
                        <Icons.HeartLucideIcon className="workspace-icons" />
                        Favorites <small>{favoriteCount}</small>
                    </button>
                    <button type="button" className="resumes" onClick={goToResumes}>
                        <Icons.FileTextLucideIcon className="workspace-icons" />
                        Resumes <small>{resumeCount}</small>
                    </button>
                    <button type="button" className="motivation-letters" onClick={goToMotivationLetters}>
                        <Icons.MailLucideIcon className="workspace-icons" />
                        Motivation letters <small>{motivationCount}</small>
                    </button>
                    <button type="button" className="trash" onClick={goToTrash}>
                        <Icons.Trash2LucideIcon className="workspace-icons" />
                        Trash <small>{trashCount}</small>
                    </button>
                </div>

                <div className="sidebar-footer">
                    <span className="sidebar-icons">
                        <Icons.ShieldCheckLucideIcon className="workspace-icons" />
                        Saved in this browser
                    </span>
                    <span className="sidebar-footer-description">
                        Your documents stay here. JSON backup moves the editable workspace. PDFs are downloaded from
                        each document.
                    </span>
                </div>
                <WorkspaceBackupActions onRestore={setDocuments} inputRef={backupInputRef} />
            </section>
        </div>
    );
}

export default Trash;
