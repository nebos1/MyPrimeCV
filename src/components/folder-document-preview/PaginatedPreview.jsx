import "./PaginatedPreview.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CreatePreview, InitialPreview, IsSamePreview, PageGap, PageHeight, PageWidth } from "./page-layout";

function PaginatedPreview({ TemplateComponent, data, onPageCountChange, zoom = 100 }) {
    const measurementRef = useRef(null);
    const [preview, setPreview] = useState(InitialPreview);
    const [browserZoom, setBrowserZoom] = useState(window.devicePixelRatio || 1);

    // Measure the hidden document when content, fonts, images, or browser size change.
    useLayoutEffect(() => {
        const measurement = measurementRef.current;
        const article = measurement?.firstElementChild;
        if (!article) return;

        function MeasurePreview() {
            // Keep text layout stable when browser zoom changes pixel rounding.
            setBrowserZoom(window.devicePixelRatio || 1);
            const next = CreatePreview(article);
            setPreview((current) => {
                if (IsSamePreview(current, next)) {
                    return current;
                } else {
                    return next;
                }
            });
        }

        MeasurePreview();
        let observer;
        if (typeof ResizeObserver === "undefined") {
            observer = null;
        } else {
            observer = new ResizeObserver(MeasurePreview);
        }
        observer?.observe(article);
        window.addEventListener("resize", MeasurePreview);
        document.fonts?.addEventListener("loadingdone", MeasurePreview);
        article.addEventListener("load", MeasurePreview, true);

        return () => {
            observer?.disconnect();
            window.removeEventListener("resize", MeasurePreview);
            document.fonts?.removeEventListener("loadingdone", MeasurePreview);
            article.removeEventListener("load", MeasurePreview, true);
        };
    }, [TemplateComponent, data, browserZoom]);

    const pageCount = preview.pages.length;
    useEffect(() => {
        onPageCountChange(pageCount);
    }, [onPageCountChange, pageCount]);

    // Zoom changes the displayed size, not where the pages break.
    const scale = zoom / 100;
    const totalHeight = PageHeight * pageCount + PageGap * (pageCount - 1);

    return (
        <>
            <div
                className="document-preview-measurement"
                ref={measurementRef}
                aria-hidden="true"
                style={{ zoom: 1 / browserZoom, transform: `scale(${browserZoom})` }}
            >
                <TemplateComponent data={data} />
            </div>

            <div
                className="document-preview-pages-frame"
                style={{
                    width: PageWidth * scale,
                    height: totalHeight * scale,
                }}
            >
                <div className="document-preview-pages" style={{ gap: PageGap, transform: `scale(${scale})` }}>
                    {preview.pages.map((page, index) => (
                        <div
                            className="document-preview-page"
                            key={index}
                            aria-label={`Document preview page ${index + 1} of ${pageCount}`}
                            style={{ backgroundColor: preview.background }}
                        >
                            <div className="document-preview-page-clip" style={{ top: page.top, height: page.height }}>
                                <div
                                    className="document-preview-page-content"
                                    style={{
                                        zoom: 1 / browserZoom,
                                        transform: `scale(${browserZoom}) translateY(-${page.start}px)`,
                                    }}
                                >
                                    <TemplateComponent data={data} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default PaginatedPreview;
