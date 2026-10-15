import { useState } from "react";
import PaginatedPreview from "../../components/folder-document-preview/PaginatedPreview";
import * as Icons from "../../folder-lucide-icons/lucide-icons";
import { FormatDate, IsIsoDateValue } from "./motivation-letter-date";
import "./components/EditorSection.css";
import "./components/EditorField.css";
import "./components/ParagraphEditor.css";
import "./components/DateField.css";
import "./components/DateFormatSelect.css";
import MotivationLetterNav from "./components/MotivationLetterNav";
import MotivationLetterPreview from "./components/MotivationLetterPreview";
import { useMotivationLetterEditor } from "./hooks/useMotivationLetterEditor";
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
    function OpenCalendar(event) {
        const dateInput = event.currentTarget;
        if (dateInput.showPicker) dateInput.showPicker();
    }
    function HandleCalendarKey(event) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        OpenCalendar(event);
    }
    const previewData = {
        values: sectionValues,
        styles: fieldStyles,
    };
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
                <aside className="letter-editor-sidebar">
                    <section className="letter-editor-form">
                        <section
                            className={
                                openSections.SenderBlock
                                    ? "letter-editor-section"
                                    : "letter-editor-section letter-section-collapsed"
                            }
                        >
                            <header className="letter-editor-section-header">
                                <span className="letter-section-icon" aria-hidden="true">
                                    <Icons.UserRoundLucideIcon />
                                </span>
                                <span className="letter-section-heading">
                                    <h2>Sender block</h2>
                                    <small>Your details at the top</small>
                                </span>
                                <button
                                    type="button"
                                    className="letter-section-toggle"
                                    aria-label="Toggle Sender block"
                                    onClick={() => HandleSectionToggle("SenderBlock")}
                                >
                                    {openSections.SenderBlock && <Icons.ChevronUpLucideIcon />}
                                    {!openSections.SenderBlock && <Icons.ChevronDownLucideIcon />}
                                </button>
                            </header>
                            {openSections.SenderBlock && (
                                <div className="letter-editor-section-fields">
                                    <div className="letter-editor-field">
                                        <div className="document-field-label-row">
                                            <label htmlFor="SenderBlock-first_name">First name</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="SenderBlock-first_name"
                                            value={sectionValues.SenderBlock.first_name ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange("SenderBlock", "first_name", event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="letter-editor-field">
                                        <div className="document-field-label-row">
                                            <label htmlFor="SenderBlock-last_name">Last name</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="SenderBlock-last_name"
                                            value={sectionValues.SenderBlock.last_name ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange("SenderBlock", "last_name", event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="letter-editor-field letter-editor-field-wide">
                                        <div className="document-field-label-row">
                                            <label htmlFor="SenderBlock-professional_title">Professional title</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="SenderBlock-professional_title"
                                            value={sectionValues.SenderBlock.professional_title ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange(
                                                    "SenderBlock",
                                                    "professional_title",
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="letter-editor-field">
                                        <div className="document-field-label-row">
                                            <label htmlFor="SenderBlock-email">Email</label>
                                        </div>
                                        <input
                                            type="email"
                                            id="SenderBlock-email"
                                            value={sectionValues.SenderBlock.email ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange("SenderBlock", "email", event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="letter-editor-field">
                                        <div className="document-field-label-row">
                                            <label htmlFor="SenderBlock-phone">Phone</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="SenderBlock-phone"
                                            value={sectionValues.SenderBlock.phone ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange("SenderBlock", "phone", event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="letter-editor-field">
                                        <div className="document-field-label-row">
                                            <label htmlFor="SenderBlock-city">City</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="SenderBlock-city"
                                            value={sectionValues.SenderBlock.city ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange("SenderBlock", "city", event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="letter-editor-field">
                                        <div className="document-field-label-row">
                                            <label htmlFor="SenderBlock-country">Country</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="SenderBlock-country"
                                            value={sectionValues.SenderBlock.country ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange("SenderBlock", "country", event.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </section>
                        <section
                            className={
                                openSections.RecipientBlock
                                    ? "letter-editor-section"
                                    : "letter-editor-section letter-section-collapsed"
                            }
                        >
                            <header className="letter-editor-section-header">
                                <span className="letter-section-icon" aria-hidden="true">
                                    <Icons.BriefcaseBusinessLucideIcon />
                                </span>
                                <span className="letter-section-heading">
                                    <h2>Recipient block</h2>
                                    <small>Hiring manager, company and address</small>
                                </span>
                                <button
                                    type="button"
                                    className="letter-section-toggle"
                                    aria-label="Toggle Recipient block"
                                    onClick={() => HandleSectionToggle("RecipientBlock")}
                                >
                                    {openSections.RecipientBlock && <Icons.ChevronUpLucideIcon />}
                                    {!openSections.RecipientBlock && <Icons.ChevronDownLucideIcon />}
                                </button>
                            </header>
                            {openSections.RecipientBlock && (
                                <div className="letter-editor-section-fields">
                                    <div className="letter-editor-field">
                                        <div className="document-field-label-row">
                                            <label htmlFor="RecipientBlock-hiring_manager">Hiring manager</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="RecipientBlock-hiring_manager"
                                            value={sectionValues.RecipientBlock.hiring_manager ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange(
                                                    "RecipientBlock",
                                                    "hiring_manager",
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="letter-editor-field">
                                        <div className="document-field-label-row">
                                            <label htmlFor="RecipientBlock-company">Company</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="RecipientBlock-company"
                                            value={sectionValues.RecipientBlock.company ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange("RecipientBlock", "company", event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="letter-editor-field letter-editor-field-wide">
                                        <div className="document-field-label-row">
                                            <label htmlFor="RecipientBlock-company_address">Company address</label>
                                        </div>
                                        <div className="letter-textarea-shell">
                                            <textarea
                                                id="RecipientBlock-company_address"
                                                value={sectionValues.RecipientBlock.company_address ?? ""}
                                                onChange={(event) =>
                                                    HandleFieldChange(
                                                        "RecipientBlock",
                                                        "company_address",
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="letter-date-row">
                                        <div className="letter-date-field">
                                            <label htmlFor="RecipientBlock-date">Date</label>
                                            <div className="letter-date-box">
                                                <span aria-hidden="true">
                                                    {FormatDate(
                                                        sectionValues.RecipientBlock.date,
                                                        sectionValues.RecipientBlock.date_format,
                                                    )}
                                                </span>
                                                <Icons.ChevronsUpDownLucideIcon
                                                    className="letter-date-arrow"
                                                    aria-hidden="true"
                                                />
                                                <input
                                                    id="RecipientBlock-date"
                                                    className="letter-native-date-input"
                                                    type="date"
                                                    value={
                                                        IsIsoDateValue(sectionValues.RecipientBlock.date)
                                                            ? sectionValues.RecipientBlock.date
                                                            : ""
                                                    }
                                                    onClick={OpenCalendar}
                                                    onKeyDown={HandleCalendarKey}
                                                    onChange={(event) =>
                                                        HandleFieldChange("RecipientBlock", "date", event.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <label className="letter-date-format-select">
                                            <span>Date format</span>
                                            <select
                                                value={sectionValues.RecipientBlock.date_format}
                                                onChange={(event) =>
                                                    HandleDateFormatChange("RecipientBlock", "date", event.target.value)
                                                }
                                            >
                                                <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                                                <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                                                <option value="yyyy-mm-dd">yyyy-mm-dd</option>
                                                <option value="month yyyy">Month yyyy</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </section>
                        <section
                            className={
                                openSections.IntroductionBlock
                                    ? "letter-editor-section"
                                    : "letter-editor-section letter-section-collapsed"
                            }
                        >
                            <header className="letter-editor-section-header">
                                <span className="letter-section-icon" aria-hidden="true">
                                    <Icons.MailLucideIcon />
                                </span>
                                <span className="letter-section-heading">
                                    <h2>Subject and greeting</h2>
                                    <small>The opening lines</small>
                                </span>
                                <button
                                    type="button"
                                    className="letter-section-toggle"
                                    aria-label="Toggle Subject and greeting"
                                    onClick={() => HandleSectionToggle("IntroductionBlock")}
                                >
                                    {openSections.IntroductionBlock && <Icons.ChevronUpLucideIcon />}
                                    {!openSections.IntroductionBlock && <Icons.ChevronDownLucideIcon />}
                                </button>
                            </header>
                            {openSections.IntroductionBlock && (
                                <div className="letter-editor-section-fields">
                                    <div className="letter-editor-field letter-editor-field-wide">
                                        <div className="document-field-label-row">
                                            <label htmlFor="IntroductionBlock-subject">Subject / Re</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="IntroductionBlock-subject"
                                            value={sectionValues.IntroductionBlock.subject ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange("IntroductionBlock", "subject", event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="letter-editor-field letter-editor-field-wide">
                                        <div className="document-field-label-row">
                                            <label htmlFor="IntroductionBlock-greetings">Greeting</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="IntroductionBlock-greetings"
                                            value={sectionValues.IntroductionBlock.greetings ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange("IntroductionBlock", "greetings", event.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </section>
                        <section
                            className={
                                openSections.BodyParagraphBlock
                                    ? "letter-editor-section"
                                    : "letter-editor-section letter-section-collapsed"
                            }
                        >
                            <header className="letter-editor-section-header">
                                <span className="letter-section-icon" aria-hidden="true">
                                    <Icons.FileTextLucideIcon />
                                </span>
                                <span className="letter-section-heading">
                                    <h2>Body paragraphs</h2>
                                    <small>
                                        {sectionValues.BodyParagraphBlock.paragraphs.length}{" "}
                                        {sectionValues.BodyParagraphBlock.paragraphs.length === 1
                                            ? "paragraph"
                                            : "paragraphs"}
                                    </small>
                                </span>
                                <button
                                    type="button"
                                    className="letter-section-toggle"
                                    aria-label="Toggle Body paragraphs"
                                    onClick={() => HandleSectionToggle("BodyParagraphBlock")}
                                >
                                    {openSections.BodyParagraphBlock && <Icons.ChevronUpLucideIcon />}
                                    {!openSections.BodyParagraphBlock && <Icons.ChevronDownLucideIcon />}
                                </button>
                            </header>
                            {openSections.BodyParagraphBlock && (
                                <div className="letter-paragraphs-editor">
                                    {sectionValues.BodyParagraphBlock.paragraphs.map((paragraph, paragraphIndex) => (
                                        <div className="letter-paragraph-row" key={paragraphIndex}>
                                            <div className="letter-editor-field letter-editor-field-wide">
                                                <div className="document-field-label-row">
                                                    <label htmlFor={"BodyParagraphBlock-paragraph-" + paragraphIndex}>
                                                        Paragraph {paragraphIndex + 1}
                                                    </label>
                                                </div>
                                                <div className="letter-textarea-shell">
                                                    <textarea
                                                        id={"BodyParagraphBlock-paragraph-" + paragraphIndex}
                                                        value={paragraph}
                                                        onChange={(event) =>
                                                            HandleParagraphChange(paragraphIndex, event.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="letter-delete-paragraph-btn"
                                                aria-label={"Delete paragraph " + (paragraphIndex + 1)}
                                                disabled={sectionValues.BodyParagraphBlock.paragraphs.length === 1}
                                                onClick={() => HandleRemoveParagraph(paragraphIndex)}
                                            >
                                                <Icons.Trash2LucideIcon />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="letter-add-paragraph-btn"
                                        onClick={HandleAddParagraph}
                                    >
                                        <Icons.PlusLucideIcon />
                                        Add paragraph
                                    </button>
                                </div>
                            )}
                        </section>
                        <section
                            className={
                                openSections.ClosingBlock
                                    ? "letter-editor-section letter-editor-section-last"
                                    : "letter-editor-section letter-editor-section-last letter-section-collapsed"
                            }
                        >
                            <header className="letter-editor-section-header">
                                <span className="letter-section-icon" aria-hidden="true">
                                    <Icons.MailLucideIcon />
                                </span>
                                <span className="letter-section-heading">
                                    <h2>Closing</h2>
                                    <small>Sign off professionally</small>
                                </span>
                                <button
                                    type="button"
                                    className="letter-section-toggle"
                                    aria-label="Toggle Closing"
                                    onClick={() => HandleSectionToggle("ClosingBlock")}
                                >
                                    {openSections.ClosingBlock && <Icons.ChevronUpLucideIcon />}
                                    {!openSections.ClosingBlock && <Icons.ChevronDownLucideIcon />}
                                </button>
                            </header>
                            {openSections.ClosingBlock && (
                                <div className="letter-editor-section-fields">
                                    <div className="letter-editor-field letter-editor-field-wide">
                                        <div className="document-field-label-row">
                                            <label htmlFor="ClosingBlock-closing_remarks">Closing</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="ClosingBlock-closing_remarks"
                                            value={sectionValues.ClosingBlock.closing_remarks ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange("ClosingBlock", "closing_remarks", event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="letter-editor-field letter-editor-field-wide">
                                        <div className="document-field-label-row">
                                            <label htmlFor="ClosingBlock-signature">Signature name</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="ClosingBlock-signature"
                                            value={sectionValues.ClosingBlock.signature ?? ""}
                                            onChange={(event) =>
                                                HandleFieldChange("ClosingBlock", "signature", event.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </section>
                    </section>
                </aside>

                <section className="motivation-letter-preview-pane">
                    <div className="letter-preview-toolbar">
                        <div className="letter-preview-heading">
                            <span>Live preview</span>
                            <small>
                                A4 / {pageCount} {pageLabel}
                            </small>
                        </div>
                        <div className="letter-zoom-controls">
                            <button
                                type="button"
                                className="letter-zoom-out"
                                aria-label="Zoom out"
                                onClick={() => setZoom((value) => Math.max(54, value - 6))}
                            >
                                <Icons.ZoomOutLucideIcon className="letter-zoom-icon" />
                            </button>
                            <span>{zoom}%</span>
                            <button
                                type="button"
                                className="letter-zoom-in"
                                aria-label="Zoom in"
                                onClick={() => setZoom((value) => Math.min(200, value + 6))}
                            >
                                <Icons.ZoomInLucideIcon className="letter-zoom-icon" />
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
