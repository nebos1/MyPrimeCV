import "./MotivationLetterNav.css";
import * as Icons from "../../../folder-lucide-icons/lucide-icons";
import InlineDocumentTitle from "../../../components/InlineDocumentTitle";
function MotivationLetterNav({ title, setTitle, saveStatus, onRetrySave }) {
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
            <button className="download-btn">
                <Icons.DownloadLucideIcon className="download-icon" />
                Download PDF
            </button>
        </div>
    );
}

export default MotivationLetterNav;
