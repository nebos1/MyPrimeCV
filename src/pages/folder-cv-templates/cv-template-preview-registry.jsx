import AtlasTemplate from "./templates/folder-atlas/atlas";
import BridgeTemplate from "./templates/folder-bridge/bridge";
import CoveTemplate from "./templates/folder-cove/cove";
import FacetTemplate from "./templates/folder-facet/facet";
import HaloTemplate from "./templates/folder-halo/halo";
import LedgerTemplate from "./templates/folder-ledger/ledger";
import LinenTemplate from "./templates/folder-linen/linen";
import MeadowTemplate from "./templates/folder-meadow/meadow";
import MosaicTemplate from "./templates/folder-mosaic/mosaic";
import NorthTemplate from "./templates/folder-north/north";
import OrbitTemplate from "./templates/folder-orbit/orbit";
import RibbonTemplate from "./templates/folder-ribbon/ribbon";
import SiennaTemplate from "./templates/folder-sienna/sienna";
import StudioTemplate from "./templates/folder-studio/studio";
import SummitTemplate from "./templates/folder-summit/summit";
import TerraceTemplate from "./templates/folder-terrace/terrace";
import VioletTemplate from "./templates/folder-violet/violet";
import { CvTemplateMetadata } from "./cv-template-metadata";

const PreviewComponents = {
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
    facet: FacetTemplate,
    terrace: TerraceTemplate,
    violet: VioletTemplate,
    sienna: SiennaTemplate,
    summit: SummitTemplate,
};

export const CvTemplatePreviewRegistry = CvTemplateMetadata.map((template) =>
    Object.assign({}, template, { PreviewComponent: PreviewComponents[template.id] }),
);
