import * as Icons from "../../folder-lucide-icons/lucide-icons";
import { useState } from "react";

import CreateCvNav from "./components/CreateCvNav";
import PaginatedPreview from "../../components/folder-document-preview/PaginatedPreview";
import { useCreateCvDocument } from "./hooks/useCreateCvDocument";

import "./create-cv.css";

function CreateCV() {
    const [zoom, setZoom] = useState(84);
    const [pageCount, setPageCount] = useState(1);
    const { document, template, saveStatus, RetrySave, UpdateDocument, ImportWorkspaceBackup, actions } = useCreateCvDocument();
    const TemplateComponent = template.Component;
    const EditorComponent = template.EditorComponent;

    if (!template.isImplemented) {
        return (
            <main className="create-cv-unavailable-page">
                <p>{template.name} template does not have implemented logic yet. Coming soon.</p>
            </main>
        );
    }

    let pageLabel;
    if (pageCount === 1) {
        pageLabel = "page";
    } else {
        pageLabel = "pages";
    }

    return (
        <div className="create-cv-page">
            <CreateCvNav
                title={document.title}
                templateName={template.name}
                onTitleChange={(title) => UpdateDocument({ title })}
                onImport={ImportWorkspaceBackup}
                saveStatus={saveStatus}
                onRetrySave={RetrySave}
            />

            <main className="create-cv-layout">
                <EditorComponent cv={document.data} templateId={template.id} actions={actions} />

                <section className="create-cv-preview-pane">
                    <div className="create-cv-preview-toolbar">
                        <div className="create-cv-preview-heading">
                            <span>Live preview</span>
                            <small>
                                A4 / {template.name} / {pageCount} {pageLabel}
                            </small>
                        </div>
                        <div className="create-cv-zoom-options">
                            <button
                                type="button"
                                aria-label="Zoom out"
                                onClick={() => setZoom((value) => Math.max(54, value - 6))}
                            >
                                <Icons.ZoomOutLucideIcon className="create-cv-toolbar-icon" />
                            </button>
                            <span>{zoom}%</span>
                            <button
                                type="button"
                                aria-label="Zoom in"
                                onClick={() => setZoom((value) => Math.min(200, value + 6))}
                            >
                                <Icons.ZoomInLucideIcon className="create-cv-toolbar-icon" />
                            </button>
                        </div>
                    </div>

                    <div className="create-cv-preview-canvas">
                        <div className="create-cv-preview-sheet">
                            <PaginatedPreview
                                TemplateComponent={TemplateComponent}
                                data={document.data}
                                onPageCountChange={setPageCount}
                                zoom={zoom}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default CreateCV;
