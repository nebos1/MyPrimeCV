export const CvTemplateMetadata = [
    { id: "meadow", name: "Meadow", hasPhoto: true, isImplemented: true },
    { id: "atlas", name: "Atlas", hasPhoto: false, isImplemented: true },
    { id: "north", name: "North", hasPhoto: false, isImplemented: true },
    { id: "linen", name: "Linen", hasPhoto: false, isImplemented: false },
    { id: "studio", name: "Studio", hasPhoto: true, isImplemented: false },
    { id: "ribbon", name: "Ribbon", hasPhoto: false, isImplemented: false },
    { id: "orbit", name: "Orbit", hasPhoto: true, isImplemented: false },
    { id: "mosaic", name: "Mosaic", hasPhoto: false, isImplemented: false },
    { id: "ledger", name: "Ledger", hasPhoto: false, isImplemented: false },
    { id: "halo", name: "Halo", hasPhoto: false, isImplemented: false },
    { id: "bridge", name: "Bridge", hasPhoto: false, isImplemented: false },
    { id: "cove", name: "Cove", hasPhoto: true, isImplemented: false },
    { id: "facet", name: "Facet", hasPhoto: true, isImplemented: false },
    { id: "terrace", name: "Terrace", hasPhoto: true, isImplemented: false },
    { id: "violet", name: "Violet", hasPhoto: true, isImplemented: false },
    { id: "sienna", name: "Sienna", hasPhoto: true, isImplemented: false },
    { id: "summit", name: "Summit", hasPhoto: true, isImplemented: false },
];

export function GetCvTemplateMetadata(templateId) {
    return CvTemplateMetadata.find((template) => template.id === templateId) ?? CvTemplateMetadata[0];
}

export function IsCvTemplateImplemented(templateId) {
    return Boolean(GetCvTemplateMetadata(templateId).isImplemented);
}
