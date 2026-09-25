import { useState } from "react";
import PaginatedPreview from "../../components/folder-document-preview/PaginatedPreview";
import * as Icons from "../../folder-lucide-icons/lucide-icons";
import EditorSection from "./components/EditorSection";
import MotivationLetterNav from "./components/MotivationLetterNav";
import MotivationLetterPreview from "./components/MotivationLetterPreview";
import { useMotivationLetterEditor } from "./hooks/useMotivationLetterEditor";
import { SectionConfig } from "./motivation-letter.config";

import "./create-motivation-letter.css";

function CreateMotivationLetter() {
    const [pageCount, setPageCount] = useState(1);
    const {
        title,
        saveStatus,
        RetrySave,
        setTitle,
        zoom,
        setZoom,
        sectionValues,
        fieldStyles,
        openSections,
        HandleSectionToggle,
        HandleFieldChange,
        HandleDateFormatChange,
        HandleParagraphChange,
        HandleAddParagraph,
        HandleRemoveParagraph,
    } = useMotivationLetterEditor();

    const previewData = { values: sectionValues, styles: fieldStyles };

    let pageLabel;
    if (pageCount === 1) {
        pageLabel = "page";
    } else {
        pageLabel = "pages";
    }

    return (
        <div className="create-motivation-letter-page">
            <MotivationLetterNav title={title} setTitle={setTitle} saveStatus={saveStatus} onRetrySave={RetrySave} />

            <main className="motivation-letter-editor">
                <aside className="options-sidebar">
                    <section className="editor-form">
                        {SectionConfig.map((section, index) => (
                            <EditorSection
                                key={section.key}
                                section={section}
                                isLast={index === SectionConfig.length - 1}
                                values={sectionValues[section.key]}
                                isOpen={openSections[section.key]}
                                onToggle={() => HandleSectionToggle(section.key)}
                                onFieldChange={HandleFieldChange}
                                onDateFormatChange={HandleDateFormatChange}
                                onParagraphChange={HandleParagraphChange}
                                onAddParagraph={HandleAddParagraph}
                                onRemoveParagraph={HandleRemoveParagraph}
                            />
                        ))}
                    </section>
                </aside>

                <section className="motivation-letter-preview-pane">
                    <div className="preview-toolbar">
                        <div className="letter-preview-heading">
                            <span>Live preview</span>
                            <small>
                                A4 / {pageCount} {pageLabel}
                            </small>
                        </div>
                        <div className="zoom-options">
                            <button
                                type="button"
                                className="zoom-out"
                                aria-label="Zoom out"
                                onClick={() => setZoom((value) => Math.max(54, value - 6))}
                            >
                                <Icons.ZoomOutLucideIcon className="zoom-icon" />
                            </button>
                            <span>{zoom}%</span>
                            <button
                                type="button"
                                className="zoom-in"
                                aria-label="Zoom in"
                                onClick={() => setZoom((value) => Math.min(200, value + 6))}
                            >
                                <Icons.ZoomInLucideIcon className="zoom-icon" />
                            </button>
                        </div>
                    </div>

                    <div className="letter-preview-canvas">
                        <div className="letter-preview-sheet">
                            <PaginatedPreview
                                TemplateComponent={MotivationLetterPreview}
                                data={previewData}
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

export default CreateMotivationLetter;
