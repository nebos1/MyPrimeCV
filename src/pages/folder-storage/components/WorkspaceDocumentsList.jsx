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

    const month = date.toLocaleString("en-US", { month: "short" });
    return `${date.getDate()} ${month} ${date.getFullYear()}`;
}

function WorkspaceDocumentCard({ document, onRename, onMoveToTrash, onPermanentDelete, onRestore, onToggleFavorite }) {
    const DocumentIcon = GetDocumentIcon(document);

    function OpenDocument() {
        window.location.href = GetDocumentUrl(document);
    }
    let dateValue;
    if (document.trashed) {
        dateValue = document.trashedAt ?? document.updatedAt;
    } else {
        dateValue = document.updatedAt;
    }
    let actionLabel;
    if (document.trashed) {
        actionLabel = "Permanent deletion";
    } else {
        actionLabel = "Move to trash";
    }
    let showAction;
    if (document.trashed) {
        showAction = Boolean(onPermanentDelete);
    } else {
        showAction = Boolean(onMoveToTrash);
    }

    function HandleAction() {
        if (document.trashed) {
            onPermanentDelete(document.id);
            return;
        }

        onMoveToTrash(document.id);
    }

    let favoriteClassName = "workspace-document-favorite-toggle";
    let favoriteLabel = "Add to favorites";
    if (document.favorite) {
        favoriteClassName += " is-favorite";
        favoriteLabel = "Remove from favorites";
    }

    return (
        <article className="workspace-document-card">
            <div className="workspace-document-summary">
                <button type="button" className="workspace-document-icon" aria-label={`Open ${document.title}`} onClick={OpenDocument}>
                    <DocumentIcon />
                </button>
                <div className="workspace-document-main">
                    <InlineDocumentTitle
                        title={document.title}
                        onRename={(title) => onRename(document.id, title)}
                        onOpen={OpenDocument}
                    />
                    <small>{GetDocumentSubtitle(document)}</small>
                </div>
            </div>
            <span className="workspace-document-meta">
                {!document.trashed && onToggleFavorite && (
                    <button
                        type="button"
                        className={favoriteClassName}
                        aria-label={favoriteLabel}
                        aria-pressed={document.favorite}
                        title={favoriteLabel}
                        onClick={() => onToggleFavorite(document.id)}
                    >
                        <Icons.HeartLucideIcon />
                    </button>
                )}
                {document.trashed && onRestore && (
                    <button
                        type="button"
                        className="workspace-document-restore-btn"
                        aria-label="Restore document"
                        title="Restore document"
                        onClick={() => onRestore(document.id)}
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
            <div className="empty-documents">
                <span className="all-documents-icon">
                    <EmptyIcon className="icon" />
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
            {filteredDocuments.map((document) => (
                <WorkspaceDocumentCard
                    key={document.id}
                    document={document}
                    onRename={onRename}
                    onMoveToTrash={onMoveToTrash}
                    onPermanentDelete={onPermanentDelete}
                    onRestore={onRestore}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
}

export default WorkspaceDocumentsList;
