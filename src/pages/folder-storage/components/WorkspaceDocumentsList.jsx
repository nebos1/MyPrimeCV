import "./WorkspaceDocumentsList.css";
import * as Icons from "../../../folder-lucide-icons/lucide-icons";
import InlineDocumentTitle from "../../../components/InlineDocumentTitle";
import { GetCvTemplateMetadata } from "../../folder-cv-templates/cv-template-metadata";
function GetDocumentUrl(document) {
    if (document.type === "resume") {
        return `/create-cv?id=${document.id}`;
    }
    if (document.type === "motivation-letter") {
        return `/create-motivation-letter?id=${document.id}`;
    }
    return "/workspace";
}
function GetDocumentIcon(document) {
    if (document.trashed) {
        return Icons.Trash2LucideIcon;
    }
    if (document.type === "resume") {
        return Icons.FileTextLucideIcon;
    } else {
        return Icons.MailLucideIcon;
    }
}
function GetDocumentSubtitle(document) {
    if (document.type === "resume") {
        return `${GetCvTemplateMetadata(document.templateId).name} template`;
    }
    return "Motivation letter";
}
function FormatUpdatedDate(value) {
    const date = new Date(value);
    if (!value || Number.isNaN(date.getTime())) {
        return "Not saved yet";
    }
    const month = date.toLocaleString("en-US", {
        month: "short",
    });
    return `${date.getDate()} ${month} ${date.getFullYear()}`;
}
function WorkspaceDocumentsList({
    documents,
    search = "",
    emptyIcon: EmptyIcon,
    emptyTitle,
    emptyText,
    emptyActionLabel,
    onEmptyAction,
    onRename,
    onMoveToTrash,
    onPermanentDelete,
    onRestore,
    onToggleFavorite,
}) {
    const query = search.trim().toLowerCase();
    const filteredDocuments = documents.filter((document) => document.title.toLowerCase().includes(query));
    if (filteredDocuments.length === 0) {
        return (
            <div className="workspace-empty-documents">
                <span className="workspace-all-documents-icon">
                    <EmptyIcon className="workspace-action-icon" />
                </span>
                <h3>{query ? "No documents found" : emptyTitle}</h3>
                <p>{query ? "Try a different title or clear the search." : emptyText}</p>
                {!query && emptyActionLabel && (
                    <button type="button" onClick={onEmptyAction}>
                        {emptyActionLabel}
                    </button>
                )}
            </div>
        );
    }
    return (
        <div className="workspace-documents-list">
            {filteredDocuments.map((workspaceDocument) => {
                const DocumentIcon = GetDocumentIcon(workspaceDocument);
                function OpenDocument() {
                    window.location.href = GetDocumentUrl(workspaceDocument);
                }
                let dateValue;
                if (workspaceDocument.trashed) {
                    dateValue = workspaceDocument.trashedAt ?? workspaceDocument.updatedAt;
                } else {
                    dateValue = workspaceDocument.updatedAt;
                }
                let actionLabel;
                if (workspaceDocument.trashed) {
                    actionLabel = "Permanent deletion";
                } else {
                    actionLabel = "Move to trash";
                }
                let showAction;
                if (workspaceDocument.trashed) {
                    showAction = Boolean(onPermanentDelete);
                } else {
                    showAction = Boolean(onMoveToTrash);
                }
                function HandleAction() {
                    if (workspaceDocument.trashed) {
                        onPermanentDelete(workspaceDocument.id);
                        return;
                    }
                    onMoveToTrash(workspaceDocument.id);
                }
                let favoriteClassName = "workspace-document-favorite-toggle";
                let favoriteLabel = "Add to favorites";
                if (workspaceDocument.favorite) {
                    favoriteClassName += " workspace-document-favorite";
                    favoriteLabel = "Remove from favorites";
                }
                return (
                    <article className="workspace-document-card" key={workspaceDocument.id}>
                        <div className="workspace-document-summary">
                            <button
                                type="button"
                                className="workspace-document-icon"
                                aria-label={`Open ${workspaceDocument.title}`}
                                onClick={OpenDocument}
                            >
                                <DocumentIcon />
                            </button>
                            <div className="workspace-document-main">
                                <InlineDocumentTitle
                                    title={workspaceDocument.title}
                                    onRename={(title) => onRename(workspaceDocument.id, title)}
                                    onOpen={OpenDocument}
                                />
                                <small>{GetDocumentSubtitle(workspaceDocument)}</small>
                            </div>
                        </div>
                        <span className="workspace-document-meta">
                            {!workspaceDocument.trashed && onToggleFavorite && (
                                <button
                                    type="button"
                                    className={favoriteClassName}
                                    aria-label={favoriteLabel}
                                    aria-pressed={workspaceDocument.favorite}
                                    title={favoriteLabel}
                                    onClick={() => onToggleFavorite(workspaceDocument.id)}
                                >
                                    <Icons.HeartLucideIcon />
                                </button>
                            )}
                            {workspaceDocument.trashed && onRestore && (
                                <button
                                    type="button"
                                    className="workspace-document-restore-btn"
                                    aria-label="Restore document"
                                    title="Restore document"
                                    onClick={() => onRestore(workspaceDocument.id)}
                                >
                                    <Icons.RotateCcwLucideIcon />
                                </button>
                            )}
                            <small>{FormatUpdatedDate(dateValue)}</small>
                        </span>
                        {showAction && (
                            <button type="button" className="workspace-document-danger-action" onClick={HandleAction}>
                                <Icons.Trash2LucideIcon />
                                {actionLabel}
                            </button>
                        )}
                    </article>
                );
            })}
        </div>
    );
}
export default WorkspaceDocumentsList;
