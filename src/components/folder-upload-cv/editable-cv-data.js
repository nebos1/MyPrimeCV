import {
    BackupSchemaVersion,
    ValidateWorkspaceBackup,
    WorkspaceBackupFormat,
} from "../../pages/folder-local-storage/workspace-backup";
import { CvTemplateMetadata } from "../../pages/folder-cv-templates/cv-template-metadata";

const EditableCvMarker = "MyPrimeCV::editable-cv::v1:";

export function EncodeEditableCv(document) {
    const backup = {
        format: WorkspaceBackupFormat,
        product: "MyPrimeCV",
        backupSchemaVersion: BackupSchemaVersion,
        documents: [document],
    };
    ValidateWorkspaceBackup(backup);
    return EditableCvMarker + encodeURIComponent(JSON.stringify(backup));
}

export function DecodeEditableCv(keywords) {
    if (typeof keywords !== "string" || !keywords.startsWith(EditableCvMarker)) {
        throw new Error(
            "This PDF has no editable CV data. Open the original CV in MyPrimeCV and download a new PDF, or restore its JSON backup.",
        );
    }

    let backup;
    try {
        const json = decodeURIComponent(keywords.slice(EditableCvMarker.length));
        backup = JSON.parse(json);
    } catch {
        throw new Error("The editable CV data in this PDF is damaged.");
    }

    ValidateWorkspaceBackup(backup);
    if (backup.documents.length !== 1 || backup.documents[0].type !== "resume") {
        throw new Error("Upload CV requires a PDF containing one CV, not a motivation letter or workspace backup.");
    }

    const resume = backup.documents[0];
    let available = false;
    for (let index = 0; index < CvTemplateMetadata.length; index++) {
        const template = CvTemplateMetadata[index];
        if (template.id === resume.templateId && template.isImplemented) {
            available = true;
        }
    }
    if (!available) {
        throw new Error("This CV template is not available for editing yet.");
    }

    return resume;
}
