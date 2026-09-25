import "./ParagraphEditor.css";
import * as Icons from "../../../folder-lucide-icons/lucide-icons";
function ParagraphItem({ paragraph, index, count, onChange, onRemove }) {
    const inputId = `BodyParagraphBlock-paragraph-${index}`;

    return (
        <div className="paragraph-row">
            <div className="editor-field editor-field-wide">
                <div className="field-label-row">
                    <label htmlFor={inputId}>Paragraph {index + 1}</label>
                </div>

                <div className="textarea-shell">
                    <textarea
                        id={inputId}
                        value={paragraph}
                        onChange={(event) => onChange(index, event.target.value)}
                    />
                </div>
            </div>

            <button
                type="button"
                className="delete-paragraph-btn"
                aria-label={`Delete paragraph ${index + 1}`}
                disabled={count === 1}
                onClick={() => onRemove(index)}
            >
                <Icons.Trash2LucideIcon />
            </button>
        </div>
    );
}

function ParagraphEditor({ values, onChange, onAdd, onRemove }) {
    return (
        <div className="paragraphs-editor">
            {values.paragraphs.map((paragraph, index) => (
                <ParagraphItem
                    key={`paragraph-${index}`}
                    paragraph={paragraph}
                    index={index}
                    count={values.paragraphs.length}
                    onChange={onChange}
                    onRemove={onRemove}
                />
            ))}

            <button type="button" className="add-paragraph-btn" onClick={onAdd}>
                <Icons.PlusLucideIcon />
                Add paragraph
            </button>
        </div>
    );
}

export default ParagraphEditor;
