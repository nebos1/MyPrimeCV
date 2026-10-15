import "./UploadCvButton.css";
import { useRef, useState } from "react";
import * as Icons from "../../folder-lucide-icons/lucide-icons";
import { ValidateMyPrimeCvPdf } from "./upload-cv-pdf";
import {
    CreateWorkspaceDocumentDraft,
    SaveWorkspaceDocument,
} from "../../pages/folder-local-storage/workspace-storage";
import { GetStorageErrorMessage } from "../../pages/folder-local-storage/saving-data";
function UploadCvButton() {
    const inputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    async function HandleUpload(event) {
        const input = event.currentTarget;
        const file = input.files?.[0];
        if (!file) {
            return;
        }
        setUploading(true);
        try {
            const result = await ValidateMyPrimeCvPdf(file);
            if (!result.ok) {
                window.alert(result.reason);
                return;
            }
            const resume = result.resume;
            const importedDocument = CreateWorkspaceDocumentDraft({
                type: "resume",
                title: resume.title,
                templateId: resume.templateId,
                data: resume.data,
            });
            try {
                SaveWorkspaceDocument(importedDocument);
            } catch (error) {
                window.alert(GetStorageErrorMessage(error));
                return;
            }
            window.location.href = "/create-cv?id=" + encodeURIComponent(importedDocument.id);
        } catch (error) {
            window.alert("The selected PDF could not be read.");
        } finally {
            input.value = "";
            setUploading(false);
        }
    }
    let buttonText = "Upload CV";
    if (uploading) {
        buttonText = "Importing CV...";
    }
    return (
        <>
            <button type="button" className="upload-cv" disabled={uploading} onClick={() => inputRef.current?.click()}>
                <Icons.UploadLucideIcon className="workspace-action-icon" /> {buttonText}
            </button>
            <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={HandleUpload} hidden />
        </>
    );
}
export default UploadCvButton;
