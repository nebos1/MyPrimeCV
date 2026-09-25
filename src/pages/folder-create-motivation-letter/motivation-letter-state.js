import { CreateDefaultStyle } from "./motivation-letter-style";

export function CreateInitialValues(config) {
    const values = {};
    for (const section of config) {
        values[section.key] = {};
        if (section.type === "paragraphs") {
            values[section.key].paragraphs = [""];
        } else {
            for (const field of section.fields) {
                values[section.key][field.key] = field.defaultValue ?? "";
                if (field.type === "date") values[section.key][field.key + "_format"] = "dd/mm/yyyy";
            }
        }
    }
    return values;
}

export function CreateInitialStyles(config) {
    const styles = {};
    for (const section of config) {
        styles[section.key] = {};
        if (section.type === "paragraphs") {
            styles[section.key].paragraphs = [CreateDefaultStyle()];
        } else {
            for (const field of section.fields) styles[section.key][field.key] = CreateDefaultStyle();
        }
    }
    return styles;
}

function NormalizeStyle(style) {
    const defaults = CreateDefaultStyle();
    const result = Object.assign({}, defaults, style);
    result.color = Object.assign({}, defaults.color, style?.color);
    return result;
}

export function NormalizeMotivationLetterData(data, config) {
    const sectionValues = CreateInitialValues(config);
    const fieldStyles = CreateInitialStyles(config);

    for (const section of config) {
        const values = data?.sectionValues?.[section.key];
        const styles = data?.fieldStyles?.[section.key];

        if (section.type === "paragraphs") {
            if (Array.isArray(values?.paragraphs) && values.paragraphs.length > 0) {
                sectionValues[section.key].paragraphs = values.paragraphs.map((text) =>
                    typeof text === "string" ? text : "",
                );
            }
            fieldStyles[section.key].paragraphs = sectionValues[section.key].paragraphs.map((text, index) =>
                NormalizeStyle(styles?.paragraphs?.[index]),
            );
        } else {
            for (const key of Object.keys(sectionValues[section.key])) {
                if (typeof values?.[key] === "string") {
                    sectionValues[section.key][key] = values[key];
                }
            }
            for (const field of section.fields) {
                fieldStyles[section.key][field.key] = NormalizeStyle(styles?.[field.key]);
            }
        }
    }

    return { sectionValues, fieldStyles };
}
