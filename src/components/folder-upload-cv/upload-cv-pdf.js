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

    const searchableText = new TextDecoder("latin1").decode(bytes);

    if (!searchableText.includes(MyPrimeCvPdfMarker)) {
        return {
            ok: false,
            reason: "This PDF was not recognized as a MyPrimeCV export.",
        };
    }

    return {
        ok: true,
    };
}
