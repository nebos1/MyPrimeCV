import "./cv-templates.css";
import * as Icons from "../../folder-lucide-icons/lucide-icons";
import { CreateResumeDocument } from "../folder-local-storage/workspace-storage";
import { IsCvTemplateImplemented } from "./cv-template-metadata";
import { CvTemplatePreviewRegistry } from "./cv-template-preview-registry";

function StartResumeFromTemplate(templateId) {
    if (!IsCvTemplateImplemented(templateId)) {
        window.location.href = `/create-cv?template=${templateId}`;
        return;
    }

    const document = CreateResumeDocument(templateId);

    window.location.href = `/create-cv?id=${document.id}`;
}

function CVTemplates() {
    return (
        <div className="cv-templates-page">
            <span className="eyebrow">
                <Icons.CircleCheckLucideIcon className="eyebrow-icon" />
                original layouts
            </span>
            <h1>Find the shape of your next chapter.</h1>
            <p>Designed for different industries and personalities, with clear structure at the center.</p>

            <section className="templates-grid">
                {CvTemplatePreviewRegistry.map((template) => {
                    const PreviewComponent = template.PreviewComponent;

                    return (
                        <button
                            type="button"
                            key={template.id}
                            className="template-card"
                            aria-label={`Create CV with ${template.name} template`}
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
                        </button>
                    );
                })}
            </section>
        </div>
    );
}

export default CVTemplates;
