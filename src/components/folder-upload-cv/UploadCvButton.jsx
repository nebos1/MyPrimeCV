import "./UploadCvButton.css";
import { useRef } from "react";

import * as Icons from "../../folder-lucide-icons/lucide-icons";
import { ValidateMyPrimeCvPdf } from "./upload-cv-pdf";

function UploadCvButton() {
    const inputRef = useRef(null);

    async function HandleUpload(event) {
        const input = event.currentTarget;
        const file = input.files?.[0];

        if (!file) {
            return;
        }

        try {
            const result = await ValidateMyPrimeCvPdf(file);

            if (!result.ok) {
                window.alert(result.reason);
                return;
            }

            window.alert("MyPrimeCV PDF recognized. Editable import logic is coming soon.");
        } catch (error) {
            console.error(error);
            window.alert("The selected PDF could not be read.");
        } finally {
            input.value = "";
        }
    }

    return (
        <>
            <button type="button" className="upload-cv" onClick={() => inputRef.current?.click()}>
                <Icons.UploadLucideIcon className="icon" /> Upload CV
            </button>
            <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={HandleUpload} hidden />
        </>
    );
}

export default UploadCvButton;
