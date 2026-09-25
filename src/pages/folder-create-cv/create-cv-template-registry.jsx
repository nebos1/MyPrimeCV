import { CvTemplateMetadata } from "../folder-cv-templates/cv-template-metadata";
import AtlasEditor from "./folder-create-atlas/components/CvEditorSidebar";
import MeadowEditor from "./folder-create-meadow/components/CvEditorSidebar";
import NorthEditor from "./folder-create-north/components/CvEditorSidebar";
import DynamicCvTemplate from "./components/CvTemplateLayouts";

const EditorComponents = {
    meadow: MeadowEditor,
    atlas: AtlasEditor,
    north: NorthEditor,
};

function CreateTemplateComponent(templateId) {
    return function CreateTemplate({ data }) {
        return <DynamicCvTemplate cv={data} templateId={templateId} />;
    };
}

function CreateUnavailableTemplate(templateName) {
    return function UnavailableTemplate() {
        return (
            <article className="create-cv-unavailable-template">
                <p>{templateName} template does not have implemented logic yet. Coming soon.</p>
            </article>
        );
    };
}

const CreateCvTemplateRegistry = CvTemplateMetadata.map((template) => {
    let EditorComponent;
    let Component;
    if (template.isImplemented) {
        EditorComponent = EditorComponents[template.id];
        Component = CreateTemplateComponent(template.id);
    } else {
        EditorComponent = null;
        Component = CreateUnavailableTemplate(template.name);
    }

    return Object.assign({}, template, { EditorComponent, Component });
});

export function GetCreateCvTemplate(templateId) {
    return CreateCvTemplateRegistry.find((template) => template.id === templateId) ?? CreateCvTemplateRegistry[0];
}
