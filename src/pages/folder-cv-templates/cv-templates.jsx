import "./cv-templates.css";
import { useEffect, useRef } from "react";
import * as Icons from "../../folder-lucide-icons/lucide-icons";
import { CreateResumeDocument } from "../folder-local-storage/workspace-storage";
import { IsCvTemplateImplemented } from "./cv-template-metadata";
import { CvTemplatePreviewRegistry } from "./cv-template-preview-registry";
function StartResumeFromTemplate(templateId) {
    if (!IsCvTemplateImplemented(templateId)) {
        window.location.href = "/create-cv?template=" + templateId;
        return;
    }
    const document = CreateResumeDocument(templateId);
    window.location.href = "/create-cv?id=" + document.id;
}
function CVTemplates() {
    const templatesGridRef = useRef(null);
    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (let index = 0; index < entries.length; index++) {
                const entry = entries[index];
                const templatePreview = entry.target.querySelector("article");
                templatePreview.style.zoom = entry.contentRect.width / 544;
            }
        });
        const previews = templatesGridRef.current.querySelectorAll(".template-card-preview");
        for (let index = 0; index < previews.length; index++) {
            const preview = previews[index];
            const article = preview.querySelector("article");
            if (
                article.classList.contains("linen-template") ||
                article.classList.contains("studio-template") ||
                article.classList.contains("ribbon-template") ||
                article.classList.contains("cv-next-template")
            ) {
                observer.observe(preview);
            }
        }
        return () => observer.disconnect();
    }, []);
    const templateCards = [];
    for (let index = 0; index < CvTemplatePreviewRegistry.length; index++) {
        const template = CvTemplatePreviewRegistry[index];
        const PreviewComponent = template.PreviewComponent;
        templateCards.push(
            <button
                type="button"
                key={template.id}
                className="template-card"
                aria-label={"Create CV with " + template.name + " template"}
                onClick={() => StartResumeFromTemplate(template.id)}
            >
                <div className="template-card-preview">
                    <span className="template-card-name">{template.name}</span>
                    {template.hasPhoto && (
                        <span className="template-card-photo-layout">
                            <Icons.CircleUserLucideIcon className="template-card-photo-icon" />
                            photo layout
                        </span>
                    )}
                    <PreviewComponent />
                </div>
            </button>,
        );
    }
    return (
        <div className="cv-templates-page">
            <span className="site-intro-label">
                <Icons.CircleCheckLucideIcon className="site-intro-icon" />
                original layouts
            </span>
            <h1>Find the shape of your next chapter.</h1>
            <p>Designed for different industries and personalities, with clear structure at the center.</p>

            <section className="templates-grid" ref={templatesGridRef}>
                {templateCards}
            </section>
        </div>
    );
}
export default CVTemplates;
