import { CreateEmptyCvData, CvSchemaVersion } from "../folder-create-cv/create-cv-data";
import { CvTemplateMetadata } from "../folder-cv-templates/cv-template-metadata";
import { CreateDefaultStyle } from "../folder-create-motivation-letter/motivation-letter-style";

export const WorkspaceBackupFormat = "MyPrimeCV::workspace-backup::v1";
export const BackupSchemaVersion = 1;

function IsObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function HasExpectedFields(value, example) {
    if (Array.isArray(example)) {
        return Array.isArray(value) && value.every((item) => HasExpectedFields(item, example[0]));
    }
    if (IsObject(example)) {
        return IsObject(value) && Object.keys(example).every((key) => HasExpectedFields(value[key], example[key]));
    }
    return typeof value === typeof example && (typeof value !== "number" || Number.isFinite(value));
}

function IsValidLetterData(data) {
    const sections = {
        SenderBlock: ["first_name", "last_name", "professional_title", "email", "phone", "city", "country"],
        RecipientBlock: ["hiring_manager", "company", "company_address", "date"],
        IntroductionBlock: ["subject", "greetings"],
        ClosingBlock: ["closing_remarks", "signature"],
    };
    for (const [section, fields] of Object.entries(sections)) {
        for (const field of fields) {
            if (typeof data.sectionValues?.[section]?.[field] !== "string") return false;
            if (!HasExpectedFields(data.fieldStyles?.[section]?.[field], CreateDefaultStyle())) return false;
        }
    }
    if (typeof data.sectionValues?.RecipientBlock?.date_format !== "string") return false;
    const paragraphs = data.sectionValues?.BodyParagraphBlock?.paragraphs;
    const styles = data.fieldStyles?.BodyParagraphBlock?.paragraphs;
    return HasExpectedFields(paragraphs, [""]) &&
        HasExpectedFields(styles, [CreateDefaultStyle()]) && paragraphs.length === styles.length;
}

export function ValidateWorkspaceBackup(backup) {
    if (!IsObject(backup) || backup.format !== WorkspaceBackupFormat || backup.product !== "MyPrimeCV" ||
        backup.backupSchemaVersion !== BackupSchemaVersion || !Array.isArray(backup.documents)) {
        throw new Error("This file is not a supported MyPrimeCV backup. Export a new backup from MyPrimeCV.");
    }

    const ids = new Set();
    for (const document of backup.documents) {
        if (!IsObject(document) || typeof document.id !== "string" || !document.id.trim() ||
            ids.has(document.id) || typeof document.title !== "string" || !IsObject(document.data)) {
            throw new Error("This backup contains an invalid document or duplicate document IDs.");
        }
        ids.add(document.id);
        if (document.schemaVersion !== undefined && document.schemaVersion !== CvSchemaVersion) {
            throw new Error("This backup uses an unsupported document version.");
        }
        for (const date of [document.createdAt, document.updatedAt]) {
            if (typeof date !== "string" || Number.isNaN(Date.parse(date))) {
                throw new Error("This backup contains an invalid document date.");
            }
        }
        if (document.type === "resume") {
            if (!CvTemplateMetadata.some((template) => template.id === document.templateId) ||
                !HasExpectedFields(document.data, CreateEmptyCvData())) {
                throw new Error("This backup contains an invalid CV or an unknown CV template.");
            }
        } else if (document.type === "motivation-letter") {
            if (!IsValidLetterData(document.data)) {
                throw new Error("This backup contains an invalid motivation letter.");
            }
        } else {
            throw new Error("This backup contains an unsupported document type.");
        }
    }
}
