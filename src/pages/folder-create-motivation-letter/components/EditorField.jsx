import "./EditorField.css";
import DateField from "./DateField";

function EditorField({ sectionKey, field, value, dateFormat, onChange, onDateFormatChange }) {
    const inputId = `${sectionKey}-${field.key}`;
    if (field.type === "date") {
        return (
            <DateField
                inputId={inputId}
                label={field.label}
                value={value}
                dateFormat={dateFormat}
                onChange={(nextValue) => onChange(sectionKey, field.key, nextValue)}
                onDateFormatChange={(nextFormat) => onDateFormatChange(sectionKey, field.key, nextFormat)}
            />
        );
    }

    let fieldClassName;
    if (field.wide) {
        fieldClassName = "editor-field editor-field-wide";
    } else {
        fieldClassName = "editor-field";
    }

    let fieldControl;
    if (field.type === "textarea") {
        fieldControl = (
            <div className="textarea-shell">
                <textarea
                    id={inputId}
                    value={value ?? ""}
                    onChange={(event) => onChange(sectionKey, field.key, event.target.value)}
                />
            </div>
        );
    } else {
        fieldControl = (
            <input
                id={inputId}
                type={field.type}
                value={value ?? ""}
                onChange={(event) => onChange(sectionKey, field.key, event.target.value)}
            />
        );
    }

    return (
        <div className={fieldClassName}>
            <div className="field-label-row">
                <label htmlFor={inputId}>{field.label}</label>
            </div>

            {fieldControl}
        </div>
    );
}

export default EditorField;
