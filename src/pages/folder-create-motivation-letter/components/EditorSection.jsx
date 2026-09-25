import "./EditorSection.css";
import * as Icons from "../../../folder-lucide-icons/lucide-icons";
import EditorField from "./EditorField";
import ParagraphEditor from "./ParagraphEditor";

function EditorSection({
    section,
    isLast,
    values,
    isOpen,
    onToggle,
    onFieldChange,
    onDateFormatChange,
    onParagraphChange,
    onAddParagraph,
    onRemoveParagraph,
}) {
    const SectionIcon = section.icon;
    let subtitle;
    if (section.type === "paragraphs") {
        let paragraphLabel;
        if (values.paragraphs.length === 1) {
            paragraphLabel = "paragraph";
        } else {
            paragraphLabel = "paragraphs";
        }

        subtitle = `${values.paragraphs.length} ${paragraphLabel}`;
    } else {
        subtitle = section.subtitle;
    }

    let sectionClassName = "editor-section";
    if (isLast) sectionClassName += " editor-section-last";
    if (!isOpen) sectionClassName += " is-collapsed";

    let toggleIcon;
    if (isOpen) {
        toggleIcon = <Icons.ChevronUpLucideIcon />;
    } else {
        toggleIcon = <Icons.ChevronDownLucideIcon />;
    }

    let sectionContent = null;
    if (isOpen) {
        if (section.type === "paragraphs") {
            sectionContent = (
                <ParagraphEditor
                    values={values}
                    onChange={onParagraphChange}
                    onAdd={onAddParagraph}
                    onRemove={onRemoveParagraph}
                />
            );
        } else {
            sectionContent = (
                <div className="editor-section-fields">
                    {section.fields.map((field) => (
                        <EditorField
                            key={field.key}
                            sectionKey={section.key}
                            field={field}
                            value={values[field.key]}
                            dateFormat={values[`${field.key}_format`]}
                            onChange={onFieldChange}
                            onDateFormatChange={onDateFormatChange}
                        />
                    ))}
                </div>
            );
        }
    }

    return (
        <section className={sectionClassName}>
            <header className="editor-section-header">
                <span className="section-icon" aria-hidden="true">
                    <SectionIcon />
                </span>
                <span className="section-heading">
                    <h2>{section.title}</h2>
                    <small>{subtitle}</small>
                </span>
                <button
                    type="button"
                    className="section-toggle"
                    aria-label={`Toggle ${section.title}`}
                    onClick={onToggle}
                >
                    {toggleIcon}
                </button>
            </header>

            {sectionContent}
        </section>
    );
}

export default EditorSection;
