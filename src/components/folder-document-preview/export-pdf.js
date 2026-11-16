import { PageWidth, PageHeight } from "./page-layout";
import { EncodeEditableCv } from "../folder-upload-cv/editable-cv-data";

const FontFaces = [
    {
        family: "MyPrimeCV Sans",
        weight: 400,
        style: "normal",
        src: [{ url: "/fonts/LiberationSans-Regular.ttf", format: "truetype" }],
    },
    {
        family: "MyPrimeCV Sans",
        weight: 700,
        style: "normal",
        src: [{ url: "/fonts/LiberationSans-Bold.ttf", format: "truetype" }],
    },
    {
        family: "MyPrimeCV Sans",
        weight: 400,
        style: "italic",
        src: [{ url: "/fonts/LiberationSans-Italic.ttf", format: "truetype" }],
    },
    {
        family: "MyPrimeCV Sans",
        weight: 700,
        style: "italic",
        src: [{ url: "/fonts/LiberationSans-BoldItalic.ttf", format: "truetype" }],
    },
    {
        family: "MyPrimeCV Serif",
        weight: 400,
        style: "normal",
        src: [{ url: "/fonts/LiberationSerif-Regular.ttf", format: "truetype" }],
    },
    {
        family: "MyPrimeCV Serif",
        weight: 700,
        style: "normal",
        src: [{ url: "/fonts/LiberationSerif-Bold.ttf", format: "truetype" }],
    },
    {
        family: "MyPrimeCV Serif",
        weight: 400,
        style: "italic",
        src: [{ url: "/fonts/LiberationSerif-Italic.ttf", format: "truetype" }],
    },
    {
        family: "MyPrimeCV Serif",
        weight: 700,
        style: "italic",
        src: [{ url: "/fonts/LiberationSerif-BoldItalic.ttf", format: "truetype" }],
    },
];

function GetTextParts(text) {
    const parts = [];
    let part = "";
    let previousWasSpace = false;
    for (let index = 0; index < text.length; index++) {
        const character = text[index];
        const isSpace = character.trim() === "";
        if (part !== "" && isSpace !== previousWasSpace) {
            parts.push(part);
            part = "";
        }
        part = part + character;
        previousWasSpace = isSpace;
    }
    if (part !== "") {
        parts.push(part);
    }
    return parts;
}

function HideTextOutsidePage(originalPage, copiedPage) {
    const clip = originalPage.querySelector(".document-preview-page-clip");
    const pageBounds = clip.getBoundingClientRect();
    const originalWalker = document.createTreeWalker(originalPage, NodeFilter.SHOW_TEXT);
    const copiedWalker = document.createTreeWalker(copiedPage, NodeFilter.SHOW_TEXT);
    const originalTexts = [];
    const copiedTexts = [];

    while (originalWalker.nextNode()) {
        originalTexts.push(originalWalker.currentNode);
    }
    while (copiedWalker.nextNode()) {
        copiedTexts.push(copiedWalker.currentNode);
    }

    const selection = document.createRange();

    for (let textIndex = 0; textIndex < originalTexts.length; textIndex++) {
        const originalText = originalTexts[textIndex];
        const copiedText = copiedTexts[textIndex];
        selection.selectNodeContents(originalText);
        const textLines = selection.getClientRects();
        let fullyVisible = true;

        for (let lineIndex = 0; lineIndex < textLines.length; lineIndex++) {
            const line = textLines[lineIndex];
            if (line.top < pageBounds.top || line.bottom > pageBounds.bottom) {
                fullyVisible = false;
                break;
            }
        }

        if (fullyVisible) {
            continue;
        }

        const words = GetTextParts(originalText.textContent);
        const fragment = document.createDocumentFragment();
        let textPosition = 0;
        let textGroup = null;
        let previousVisible = false;

        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            const word = words[wordIndex];
            selection.setStart(originalText, textPosition);
            textPosition = textPosition + word.length;
            selection.setEnd(originalText, textPosition);

            const wordLines = selection.getClientRects();
            let visible = false;

            for (let lineIndex = 0; lineIndex < wordLines.length; lineIndex++) {
                const line = wordLines[lineIndex];
                const middle = (line.top + line.bottom) / 2;
                if (middle >= pageBounds.top && middle <= pageBounds.bottom) {
                    visible = true;
                    break;
                }
            }

            if (textGroup === null || visible !== previousVisible) {
                textGroup = document.createElement("pdf-text");
                textGroup.style.letterSpacing = "inherit";
                if (!visible) {
                    textGroup.style.visibility = "hidden";
                }
                fragment.append(textGroup);
                previousVisible = visible;
            }

            textGroup.textContent = textGroup.textContent + word;
        }

        copiedText.replaceWith(fragment);
    }
}

function CopyFontWeight(original, copy) {
    const weight = Number(getComputedStyle(original).fontWeight);
    if (weight >= 600) {
        copy.style.fontWeight = "700";
    } else {
        copy.style.fontWeight = "400";
    }
}

function GetPageLinks(page) {
    const pageBounds = page.getBoundingClientRect();
    const clipBounds = page.querySelector(".document-preview-page-clip").getBoundingClientRect();
    const links = [];

    const anchors = page.querySelectorAll("a[href]");
    for (let anchorIndex = 0; anchorIndex < anchors.length; anchorIndex++) {
        const anchor = anchors[anchorIndex];
        const url = anchor.href;
        const lowerUrl = url.toLowerCase();
        if (
            !lowerUrl.startsWith("http:") &&
            !lowerUrl.startsWith("https:") &&
            !lowerUrl.startsWith("mailto:") &&
            !lowerUrl.startsWith("tel:")
        ) {
            continue;
        }

        const style = getComputedStyle(anchor);
        if (style.visibility !== "visible" || style.display === "none") {
            continue;
        }

        const lines = anchor.getClientRects();
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const left = Math.max(line.left, clipBounds.left, pageBounds.left);
            const top = Math.max(line.top, clipBounds.top, pageBounds.top);
            const right = Math.min(line.right, clipBounds.right, pageBounds.right);
            const bottom = Math.min(line.bottom, clipBounds.bottom, pageBounds.bottom);
            if (right <= left || bottom <= top) {
                continue;
            }

            links.push({
                x: (left - pageBounds.left) / pageBounds.width,
                y: (top - pageBounds.top) / pageBounds.height,
                width: (right - left) / pageBounds.width,
                height: (bottom - top) / pageBounds.height,
                url,
            });
        }
    }

    return links;
}

export async function ExportPreviewPdf(title, cvDocument) {
    await document.fonts.ready;

    const pages = document.querySelectorAll(".document-preview-pages > .document-preview-page");
    if (pages.length === 0) {
        throw new Error("The document preview is not ready. Please try again.");
    }

    const pdfLibrary = await import("jspdf");
    const pdf = new pdfLibrary.jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        putOnlyUsedFonts: true,
        compress: true,
    });

    let filename = "MyPrimeCV document";
    if (title) {
        filename = "";
        const invalidCharacters = '\\/:*?"<>|';
        for (let index = 0; index < title.length; index++) {
            const character = title[index];
            if (invalidCharacters.includes(character)) {
                filename = filename + "-";
            } else {
                filename = filename + character;
            }
        }
        filename = filename.trim();
    }
    if (filename === "") {
        filename = "MyPrimeCV document";
    }

    pdf.setProperties({
        title: filename,
        creator: "MyPrimeCV",
        subject: "MyPrimeCV::platform-pdf::v1",
    });

    if (cvDocument) {
        pdf.setProperties({ keywords: EncodeEditableCv(cvDocument) });
    }

    for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        if (pageIndex > 0) {
            pdf.addPage();
        }

        const originalPage = pages[pageIndex];
        const links = GetPageLinks(originalPage);
        const copiedPage = originalPage.cloneNode(true);
        const photos = copiedPage.querySelectorAll("img");
        for (let photoIndex = 0; photoIndex < photos.length; photoIndex++) {
            const photo = photos[photoIndex];
            if (!photo.src.startsWith("data:image/svg+xml")) {
                continue;
            }
            const image = new Image();
            image.src = photo.src;
            await image.decode();
            const canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            canvas.getContext("2d").drawImage(image, 0, 0);
            photo.src = canvas.toDataURL("image/png");
        }
        copiedPage.style.width = PageWidth + "px";
        copiedPage.style.height = PageHeight + "px";
        copiedPage.style.boxShadow = "none";
        copiedPage.style.fontFamily = getComputedStyle(originalPage).fontFamily;

        CopyFontWeight(originalPage, copiedPage);
        const originalElements = originalPage.querySelectorAll("*");
        const copiedElements = copiedPage.querySelectorAll("*");
        for (let elementIndex = 0; elementIndex < originalElements.length; elementIndex++) {
            CopyFontWeight(originalElements[elementIndex], copiedElements[elementIndex]);
        }

        HideTextOutsidePage(originalPage, copiedPage);

        const content = copiedPage.querySelector(".document-preview-page-content");
        content.style.zoom = "1";
        const translationStart = content.style.transform.indexOf("translateY(");
        if (translationStart >= 0) {
            content.style.transform = content.style.transform.slice(translationStart);
        }

        await pdf.html(copiedPage, {
            x: 0,
            y: 0,
            width: 210,
            windowWidth: PageWidth,
            margin: 0,
            autoPaging: false,
            fontFaces: FontFaces,
            html2canvas: {
                logging: false,
                backgroundColor: null,
                windowWidth: 1200,
            },
        });

        pdf.setPage(pageIndex + 1);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        for (let linkIndex = 0; linkIndex < links.length; linkIndex++) {
            const link = links[linkIndex];
            pdf.link(
                link.x * pageWidth,
                link.y * pageHeight,
                link.width * pageWidth,
                link.height * pageHeight,
                {
                    url: link.url,
                },
            );
        }
    }

    pdf.save(filename + ".pdf");
}
