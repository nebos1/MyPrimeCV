import "./MotivationLetterNav.css";
import * as Icons from "../../../folder-lucide-icons/lucide-icons";
import { useState } from "react";
import InlineDocumentTitle from "../../../components/InlineDocumentTitle";
import { ExportPreviewPdf } from "../../../components/folder-document-preview/export-pdf";

function MotivationLetterNav({ title, setTitle, saveStatus, onRetrySave }) {
    const [exporting, setExporting] = useState(false);

    async function DownloadPdf() {
        setExporting(true);
        try {
            await ExportPreviewPdf(title);
        } catch (error) {
            window.alert(error.message || "The PDF could not be prepared. Please try again.");
        } finally {
            setExporting(false);
        }
    }

    let downloadText = "Download PDF";
    if (exporting) {
        downloadText = "Preparing PDF...";
    }

    function GoBack() {
        window.history.back();
    }

    return (
        <div className="motivation-letter-nav">
            <div className="motivation-letter-nav-left">
                <button type="button" className="back-button" aria-label="Go back" onClick={GoBack}>
                    <Icons.ArrowLeftLucideIcon className="back-icon" />
                </button>
                <div className="title-wrap">
                    <InlineDocumentTitle title={title} onRename={setTitle} label="Motivation letter title" />
                    <span>
                        <i></i>
                        <span role="status">{saveStatus}</span>
                    </span>
                </div>
            </div>
            {saveStatus.startsWith("Not saved:") && (
                <button type="button" onClick={onRetrySave}>Retry saving</button>
            )}
            <button type="button" className="download-btn" onClick={DownloadPdf} disabled={exporting}
                title="Download your document as an A4 PDF">
                <Icons.DownloadLucideIcon className="download-icon" />
                {downloadText}
            </button>
        </div>
    );
}

export default MotivationLetterNav;
