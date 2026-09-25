// A4 preview size, page spacing, and continuation-page margins.
export const PageWidth = 544;
export const PageHeight = (PageWidth * 297) / 210;
export const PageGap = 24;
const MaximumPreviewPages = 999;
const TopMargin = (PageWidth * 14) / 210;
const BottomMargin = (PageWidth * 6) / 210;

export const InitialPreview = {
    background: "#ffffff",
    pages: [{ start: 0, top: 0, height: PageHeight - BottomMargin }],
};

function GetContentRanges(article) {
    const bounds = article.getBoundingClientRect();
    const scale = bounds.width / PageWidth;
    const ranges = [];

    function AddRange(rect) {
        if (rect.width <= 0 || rect.height <= 0) return;
        ranges.push({
            top: (rect.top - bounds.top) / scale,
            bottom: (rect.bottom - bounds.top) / scale,
        });
    }

    // Measure every text line, including text in the sidebar.
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    const selection = document.createRange();
    while (walker.nextNode()) {
        if (!walker.currentNode.textContent.trim()) continue;
        selection.selectNodeContents(walker.currentNode);
        for (const rect of selection.getClientRects()) AddRange(rect);
    }

    for (const element of article.querySelectorAll("img, svg, .cv-rating")) {
        AddRange(element.getBoundingClientRect());
    }
    return ranges;
}

export function CreatePreview(article) {
    const ranges = GetContentRanges(article);
    const contentHeight = ranges.reduce((height, range) => Math.max(height, range.bottom), 0);
    const pages = [];
    let start = 0;

    do {
        let top;
        if (pages.length === 0) {
            top = 0;
        } else {
            top = TopMargin;
        }
        let end = start + PageHeight - top - BottomMargin;

        // Move the break above a crossing line/image, rechecking both columns.
        // An element taller than a page must continue across pages.
        let crossing = ranges.find((range) => range.top > start && range.top < end && range.bottom > end);
        while (crossing) {
            end = crossing.top;
            crossing = ranges.find((range) => range.top > start && range.top < end && range.bottom > end);
        }

        pages.push({ start, top, height: end - start });

        // Skip leftover section spacing so every next page starts at the same margin.
        start = contentHeight;
        for (const range of ranges) {
            if (range.bottom > end) start = Math.min(start, Math.max(end, range.top));
        }
    } while (start < contentHeight && pages.length < MaximumPreviewPages);

    return { background: getComputedStyle(article).backgroundColor, pages };
}

export function IsSamePreview(current, next) {
    return (
        current.background === next.background &&
        current.pages.length === next.pages.length &&
        current.pages.every(
            (page, index) => page.start === next.pages[index].start && page.height === next.pages[index].height,
        )
    );
}
