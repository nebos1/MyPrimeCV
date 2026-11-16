import { CvTemplateMetadata } from "../folder-cv-templates/cv-template-metadata";
import AtlasEditor from "./folder-create-atlas/components/CvEditorSidebar";
import MeadowEditor from "./folder-create-meadow/components/CvEditorSidebar";
import NorthEditor from "./folder-create-north/components/CvEditorSidebar";
import LinenEditor from "./folder-create-linen/components/CvEditorSidebar";
import StudioEditor from "./folder-create-studio/components/CvEditorSidebar";
import RibbonEditor from "./folder-create-ribbon/components/CvEditorSidebar";
import OrbitEditor from "./folder-create-orbit/components/CvEditorSidebar";
import MosaicEditor from "./folder-create-mosaic/components/CvEditorSidebar";
import LedgerEditor from "./folder-create-ledger/components/CvEditorSidebar";
import HaloEditor from "./folder-create-halo/components/CvEditorSidebar";
import BridgeEditor from "./folder-create-bridge/components/CvEditorSidebar";
import CoveEditor from "./folder-create-cove/components/CvEditorSidebar";
import LinenTemplate from "../folder-cv-templates/templates/folder-linen/linen";
import StudioTemplate from "../folder-cv-templates/templates/folder-studio/studio";
import RibbonTemplate from "../folder-cv-templates/templates/folder-ribbon/ribbon";
import OrbitTemplate from "../folder-cv-templates/templates/folder-orbit/orbit";
import MosaicTemplate from "../folder-cv-templates/templates/folder-mosaic/mosaic";
import LedgerTemplate from "../folder-cv-templates/templates/folder-ledger/ledger";
import HaloTemplate from "../folder-cv-templates/templates/folder-halo/halo";
import BridgeTemplate from "../folder-cv-templates/templates/folder-bridge/bridge";
import CoveTemplate from "../folder-cv-templates/templates/folder-cove/cove";
import { MeadowTemplate, AtlasTemplate, NorthTemplate } from "./components/CvTemplateLayouts";
const EditorComponents = {
    meadow: MeadowEditor,
    atlas: AtlasEditor,
    north: NorthEditor,
    linen: LinenEditor,
    studio: StudioEditor,
    ribbon: RibbonEditor,
    orbit: OrbitEditor,
    mosaic: MosaicEditor,
    ledger: LedgerEditor,
    halo: HaloEditor,
    bridge: BridgeEditor,
    cove: CoveEditor,
};
const TemplateComponents = {
    meadow: MeadowTemplate,
    atlas: AtlasTemplate,
    north: NorthTemplate,
    linen: LinenTemplate,
    studio: StudioTemplate,
    ribbon: RibbonTemplate,
    orbit: OrbitTemplate,
    mosaic: MosaicTemplate,
    ledger: LedgerTemplate,
    halo: HaloTemplate,
    bridge: BridgeTemplate,
    cove: CoveTemplate,
};
function UnavailableTemplate() {
    return (
        <article className="create-cv-unavailable-template">
            <p>This template is coming soon.</p>
        </article>
    );
}
const CreateCvTemplateRegistry = [];
for (let index = 0; index < CvTemplateMetadata.length; index++) {
    const template = CvTemplateMetadata[index];
    let editor = EditorComponents[template.id];
    if (!editor) {
        editor = null;
    }
    let layout = TemplateComponents[template.id];
    if (!layout) {
        layout = UnavailableTemplate;
    }
    CreateCvTemplateRegistry.push({
        id: template.id,
        name: template.name,
        hasPhoto: template.hasPhoto,
        isImplemented: template.isImplemented,
        EditorComponent: editor,
        Component: layout,
    });
}
export function GetCreateCvTemplate(templateId) {
    for (let index = 0; index < CreateCvTemplateRegistry.length; index++) {
        const template = CreateCvTemplateRegistry[index];
        if (template.id === templateId) {
            return template;
        }
    }
    return CreateCvTemplateRegistry[0];
}
