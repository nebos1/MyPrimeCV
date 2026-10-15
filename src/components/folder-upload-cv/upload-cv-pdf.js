import { DecodeEditableCv } from "./editable-cv-data";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

const MyPrimeCvPdfMarker = "MyPrimeCV::platform-pdf::v1";

export async function ValidateMyPrimeCvPdf(file) {
    if (!file || !file.name.toLowerCase().endsWith(".pdf")) {
        return {
            ok: false,
            reason: "Only PDF files exported from MyPrimeCV can be uploaded.",
        };
    }

    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const header = new TextDecoder().decode(bytes.slice(0, 5));

    if (header !== "%PDF-") {
        return {
            ok: false,
            reason: "This file is not a valid PDF.",
        };
    }

    const pdfLibrary = await import("pdfjs-dist");
    pdfLibrary.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
    const loading = pdfLibrary.getDocument({ data: bytes, isEvalSupported: false });

    try {
        const pdf = await loading.promise;
        const metadata = await pdf.getMetadata();
        if (metadata.info.Subject !== MyPrimeCvPdfMarker) {
            return { ok: false, reason: "This PDF was not recognized as a MyPrimeCV export." };
        }
        const resume = DecodeEditableCv(metadata.info.Keywords);
        return { ok: true, resume: resume };
    } catch (error) {
        if (error.name === "InvalidPDFException") {
            return { ok: false, reason: "This file is not a valid PDF." };
        }
        return { ok: false, reason: error.message || "This PDF could not be read." };
    } finally {
        await loading.destroy();
    }
}
