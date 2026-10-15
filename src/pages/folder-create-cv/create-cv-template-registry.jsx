import { CvTemplateMetadata } from "../folder-cv-templates/cv-template-metadata";
import AtlasEditor from "./folder-create-atlas/components/CvEditorSidebar";
import MeadowEditor from "./folder-create-meadow/components/CvEditorSidebar";
import NorthEditor from "./folder-create-north/components/CvEditorSidebar";
import LinenEditor from "./folder-create-linen/components/CvEditorSidebar";
import StudioEditor from "./folder-create-studio/components/CvEditorSidebar";
import RibbonEditor from "./folder-create-ribbon/components/CvEditorSidebar";
import LinenTemplate from "../folder-cv-templates/templates/folder-linen/linen";
import StudioTemplate from "../folder-cv-templates/templates/folder-studio/studio";
import RibbonTemplate from "../folder-cv-templates/templates/folder-ribbon/ribbon";
import { MeadowTemplate, AtlasTemplate, NorthTemplate } from "./components/CvTemplateLayouts";
const EditorComponents = {
    meadow: MeadowEditor,
    atlas: AtlasEditor,
    north: NorthEditor,
    linen: LinenEditor,
    studio: StudioEditor,
    ribbon: RibbonEditor,
};
const TemplateComponents = {
    meadow: MeadowTemplate,
    atlas: AtlasTemplate,
    north: NorthTemplate,
    linen: LinenTemplate,
    studio: StudioTemplate,
    ribbon: RibbonTemplate,
};
function UnavailableTemplate() {
    return (
        <article className="create-cv-unavailable-template">
            <p>This template is coming soon.</p>
        </article>
    );
}
const CreateCvTemplateRegistry = CvTemplateMetadata.map((template) => ({
    ...template,
    EditorComponent: EditorComponents[template.id] || null,
    Component: TemplateComponents[template.id] || UnavailableTemplate,
}));
export function GetCreateCvTemplate(templateId) {
    return CreateCvTemplateRegistry.find((template) => template.id === templateId) ?? CreateCvTemplateRegistry[0];
}
