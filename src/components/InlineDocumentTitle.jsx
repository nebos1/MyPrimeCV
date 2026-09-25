import { useRef, useState } from "react";
import { PencilLucideIcon } from "../folder-lucide-icons/lucide-icons";
import { GetStorageErrorMessage } from "../pages/folder-local-storage/saving-data";
import "./InlineDocumentTitle.css";

export default function InlineDocumentTitle({ title, onRename, onOpen, label = "Document title" }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(title);
    const [error, setError] = useState("");
    const cancelled = useRef(false);

    function SaveTitle() {
        if (cancelled.current) return;
        try {
            const nextTitle = draft.trim();
            if (nextTitle && nextTitle !== title) onRename(nextTitle);
            setIsEditing(false);
            setError("");
        } catch (error) {
            setError(GetStorageErrorMessage(error));
        }
    }

    return (
        <div className="document-title-editor">
            <div className="document-title-row">
                {isEditing ? (
                    <input
                        className="document-title-input"
                        aria-label={label}
                        value={draft}
                        autoFocus
                        onFocus={(event) => event.target.select()}
                        onChange={(event) => setDraft(event.target.value)}
                        onBlur={SaveTitle}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") event.currentTarget.blur();
                            if (event.key === "Escape") {
                                cancelled.current = true;
                                setIsEditing(false);
                                setError("");
                            }
                        }}
                    />
                ) : (
                    <>
                        {onOpen ? (
                            <button type="button" className="workspace-document-open" onClick={onOpen}>
                                <strong>{title}</strong>
                            </button>
                        ) : <strong>{title}</strong>}
                        <button
                            type="button"
                            className="document-title-rename"
                            aria-label={`Rename ${title}`}
                            title="Rename"
                            onClick={() => {
                                cancelled.current = false;
                                setDraft(title);
                                setIsEditing(true);
                            }}
                        >
                            <PencilLucideIcon />
                        </button>
                    </>
                )}
            </div>
            {error && <small role="alert">{error}</small>}
        </div>
    );
}
