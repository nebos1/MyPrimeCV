import "./CreateCvNav.css";
import * as Icons from "../../../folder-lucide-icons/lucide-icons";
import { useRef } from "react";
import InlineDocumentTitle from "../../../components/InlineDocumentTitle";

function CreateCvNav({ title, templateName, onTitleChange, onImport, saveStatus, onRetrySave }) {
    const importInputRef = useRef(null);

    function GoBack() {
        window.history.back();
    }

    function ImportFromFile(event) {
        const input = event.currentTarget;
        const file = input.files?.[0];

        if (!file) {
            return;
        }

        if (!file.name.toLowerCase().endsWith(".json")) {
            window.alert("Only MyPrimeCV JSON backups can be imported.");
            input.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            try {
                onImport(JSON.parse(reader.result));
            } catch (error) {
                console.error(error);
                window.alert("This file is not a valid MyPrimeCV CV backup.");
            } finally {
                input.value = "";
            }
        };
        reader.onerror = () => {
            window.alert("The selected JSON file could not be read.");
            input.value = "";
        };
        reader.readAsText(file);
    }

    return (
        <div className="create-cv-nav">
            <div className="create-cv-nav-left">
                <button type="button" className="create-cv-back-button" aria-label="Go back" onClick={GoBack}>
                    <Icons.ArrowLeftLucideIcon className="create-cv-nav-icon" />
                </button>
                <div className="create-cv-title-wrap">
                    <InlineDocumentTitle title={title} onRename={onTitleChange} label="CV title" />
                    <span>
                        <i></i>
                        <span role="status">{templateName} template / {saveStatus}</span>
                    </span>
                </div>
            </div>

            <div className="create-cv-nav-actions">
                {saveStatus.startsWith("Not saved:") && (
                    <button type="button" className="create-cv-import-btn" onClick={onRetrySave}>Retry saving</button>
                )}
                <button type="button" className="create-cv-import-btn" onClick={() => importInputRef.current?.click()}>
                    <Icons.UploadLucideIcon className="create-cv-nav-icon" />
                    Import
                </button>
                <input
                    ref={importInputRef}
                    type="file"
                    accept="application/json,.json"
                    onChange={ImportFromFile}
                    hidden
                />
                <button type="button" className="create-cv-download-btn">
                    <Icons.DownloadLucideIcon className="create-cv-nav-icon" />
                    Download PDF
                </button>
            </div>
        </div>
    );
}

export default CreateCvNav;
