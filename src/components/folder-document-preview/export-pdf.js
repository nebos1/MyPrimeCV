import { PageWidth, PageHeight } from "./page-layout";

// Local fonts keep Bulgarian text readable in the downloaded PDF.
const FontFaces = [
    { family: "Inter", weight: 400, style: "normal", src: [{ url: "/fonts/LiberationSans-Regular.ttf", format: "truetype" }] },
    { family: "Inter", weight: 700, style: "normal", src: [{ url: "/fonts/LiberationSans-Bold.ttf", format: "truetype" }] },
    { family: "Inter", weight: 400, style: "italic", src: [{ url: "/fonts/LiberationSans-Italic.ttf", format: "truetype" }] },
    { family: "Inter", weight: 700, style: "italic", src: [{ url: "/fonts/LiberationSans-BoldItalic.ttf", format: "truetype" }] },
    { family: "Arial", weight: 400, style: "normal", src: [{ url: "/fonts/LiberationSans-Regular.ttf", format: "truetype" }] },
    { family: "Arial", weight: 700, style: "normal", src: [{ url: "/fonts/LiberationSans-Bold.ttf", format: "truetype" }] },
    { family: "Arial", weight: 400, style: "italic", src: [{ url: "/fonts/LiberationSans-Italic.ttf", format: "truetype" }] },
    { family: "Arial", weight: 700, style: "italic", src: [{ url: "/fonts/LiberationSans-BoldItalic.ttf", format: "truetype" }] },
    { family: "Georgia", weight: 400, style: "normal", src: [{ url: "/fonts/LiberationSerif-Regular.ttf", format: "truetype" }] },
    { family: "Georgia", weight: 700, style: "normal", src: [{ url: "/fonts/LiberationSerif-Bold.ttf", format: "truetype" }] },
    { family: "Georgia", weight: 400, style: "italic", src: [{ url: "/fonts/LiberationSerif-Italic.ttf", format: "truetype" }] },
    { family: "Georgia", weight: 700, style: "italic", src: [{ url: "/fonts/LiberationSerif-BoldItalic.ttf", format: "truetype" }] },
];

function HideTextOutsidePage(originalPage, copiedPage) {
    const clip = originalPage.querySelector(".document-preview-page-clip");
    const pageBounds = clip.getBoundingClientRect();
    const originalWalker = document.createTreeWalker(originalPage, NodeFilter.SHOW_TEXT);
    const copiedWalker = document.createTreeWalker(copiedPage, NodeFilter.SHOW_TEXT);
    const originalTexts = [];
    const copiedTexts = [];

    // Collect the text before changing the copied page.
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

        // Keep words and spaces in place, but hide text belonging to another page.
        const words = originalText.textContent.match(/\s+|\S+/g);
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

export async function ExportPreviewPdf(title) {
    await document.fonts.ready;

    const pages = document.querySelectorAll(".document-preview-pages > .document-preview-page");
    if (pages.length === 0) {
        throw new Error("The document preview is not ready. Please try again.");
    }

    // Load the PDF library only when Download PDF is clicked.
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
        filename = title.replace(/[\\/:*?"<>|]/g, "-").trim();
    }
    if (filename === "") {
        filename = "MyPrimeCV document";
    }

    pdf.setProperties({
        title: filename,
        creator: "MyPrimeCV",
        subject: "MyPrimeCV::platform-pdf::v1",
    });

    for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        if (pageIndex > 0) {
            pdf.addPage();
        }

        const originalPage = pages[pageIndex];
        const copiedPage = originalPage.cloneNode(true);
        copiedPage.style.width = PageWidth + "px";
        copiedPage.style.height = PageHeight + "px";
        copiedPage.style.boxShadow = "none";
        copiedPage.style.fontFamily = getComputedStyle(originalPage).fontFamily;

        // PDF fonts have regular and bold weights instead of CSS weights such as 850.
        CopyFontWeight(originalPage, copiedPage);
        const originalElements = originalPage.querySelectorAll("*");
        const copiedElements = copiedPage.querySelectorAll("*");
        for (let elementIndex = 0; elementIndex < originalElements.length; elementIndex++) {
            CopyFontWeight(originalElements[elementIndex], copiedElements[elementIndex]);
        }

        HideTextOutsidePage(originalPage, copiedPage);

        // Preview zoom must not change the size of the downloaded A4 page.
        const content = copiedPage.querySelector(".document-preview-page-content");
        content.style.zoom = "1";
        content.style.transform = content.style.transform.replace(/scale\([^)]*\)\s*/, "");

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
    }

    pdf.save(filename + ".pdf");
}
