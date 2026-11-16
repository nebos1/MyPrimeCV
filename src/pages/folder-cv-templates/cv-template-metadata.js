export const CvTemplateMetadata = [
    { id: "meadow", name: "Meadow", hasPhoto: true, isImplemented: true },
    { id: "atlas", name: "Atlas", hasPhoto: false, isImplemented: true },
    { id: "north", name: "North", hasPhoto: false, isImplemented: true },
    { id: "linen", name: "Linen", hasPhoto: false, isImplemented: true },
    { id: "studio", name: "Studio", hasPhoto: true, isImplemented: true },
    { id: "ribbon", name: "Ribbon", hasPhoto: false, isImplemented: true },
    { id: "orbit", name: "Orbit", hasPhoto: true, isImplemented: true },
    { id: "mosaic", name: "Mosaic", hasPhoto: false, isImplemented: true },
    { id: "ledger", name: "Ledger", hasPhoto: false, isImplemented: true },
    { id: "halo", name: "Halo", hasPhoto: false, isImplemented: true },
    { id: "bridge", name: "Bridge", hasPhoto: false, isImplemented: true },
    { id: "cove", name: "Cove", hasPhoto: true, isImplemented: true },
    { id: "facet", name: "Facet", hasPhoto: true, isImplemented: false },
    { id: "terrace", name: "Terrace", hasPhoto: true, isImplemented: false },
    { id: "violet", name: "Violet", hasPhoto: true, isImplemented: false },
    { id: "sienna", name: "Sienna", hasPhoto: true, isImplemented: false },
    { id: "summit", name: "Summit", hasPhoto: true, isImplemented: false },
];

export function GetCvTemplateMetadata(templateId) {
    for (let index = 0; index < CvTemplateMetadata.length; index++) {
        const template = CvTemplateMetadata[index];
        if (template.id === templateId) {
            return template;
        }
    }
    return CvTemplateMetadata[0];
}

export function IsCvTemplateImplemented(templateId) {
    return GetCvTemplateMetadata(templateId).isImplemented;
}
