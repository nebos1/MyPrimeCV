export const CvSchemaVersion = 3;
export const DefaultTemplateId = "meadow";
export const LanguageLevelOptions = ["", "A1", "A2", "B1", "B2", "C1", "C2", "Native"];
export const RatingStyleOptions = [
    {
        value: "none",
        label: "No rating",
    },
    {
        value: "circle",
        label: "Circles",
    },
    {
        value: "square",
        label: "Squares",
    },
];
const AtlasMetricSlotCount = 3;
export function GetDefaultProjectTitle(templateId) {
    if (templateId === "atlas") {
        return "Selected Case study";
    }
    if (templateId === "studio") {
        return "Selected work";
    }
    return "Selected project";
}
function NormalizeDateFormat(value) {
    if (value === "year") {
        return "year";
    } else {
        return "full";
    }
}
function NormalizeTextFields(defaults, source) {
    const result = {};
    const defaultKeys = Object.keys(defaults);
    for (let index = 0; index < defaultKeys.length; index++) {
        const key = defaultKeys[index];
        result[key] = defaults[key];
    }
    if (source) {
        const sourceKeys = Object.keys(source);
        for (let index = 0; index < sourceKeys.length; index++) {
            const key = sourceKeys[index];
            result[key] = source[key];
        }
    }
    for (let index = 0; index < defaultKeys.length; index++) {
        const key = defaultKeys[index];
        if (typeof defaults[key] === "string" && typeof result[key] !== "string") {
            result[key] = defaults[key];
        }
    }
    return result;
}
export function FormatCvDate(value, format = "full") {
    let text = "";
    if (value !== null && value !== undefined) {
        text = String(value).trim();
    }
    const isoParts = text.split("-");
    let isIsoDate = false;
    if (
        isoParts.length === 3 &&
        IsDateDigits(isoParts[0], 4) &&
        IsDateDigits(isoParts[1], 2) &&
        IsDateDigits(isoParts[2], 2)
    ) {
        isIsoDate = true;
    }
    if (format === "year") {
        if (isIsoDate) {
            return isoParts[0];
        }
        const fullParts = text.split(".");
        if (
            fullParts.length === 3 &&
            IsDateDigits(fullParts[0], 2) &&
            IsDateDigits(fullParts[1], 2) &&
            IsDateDigits(fullParts[2], 4)
        ) {
            return fullParts[2];
        }
        return text;
    }
    if (isIsoDate) {
        return isoParts[2] + "." + isoParts[1] + "." + isoParts[0];
    }
    return text;
}
export function CreateEmptyCvData() {
    const data = {
        basics: {
            firstName: "",
            lastName: "",
            professionalTitle: "",
            photo: "",
            email: "",
            phone: "",
            city: "",
            country: "",
            birthDate: "",
            birthDateFormat: "full",
            gender: "",
        },
        profile: "",
        tools: "",
        footerNote: "",
        studioImpact: {
            label: "",
            value: "",
            description: "",
        },
        atlasMetrics: CreateEmptyAtlasMetrics(),
        sectionTitles: {
            linenExpertise: "Expertise",
            linenTools: "Tools",
            projects: "",
            mainCustom: "Custom section",
            sideCustom: "Custom section",
        },
        employment: [CreateEmptyEmployment()],
        education: [CreateEmptyEducation()],
        skills: [CreateEmptySkill()],
        languages: [CreateEmptyLanguage()],
        links: [CreateEmptyLink()],
        projects: [CreateEmptyProject()],
        mainCustom: [CreateEmptyCustomItem()],
        sideCustom: [CreateEmptyCustomItem()],
    };
    return data;
}
function CreateEmptyAtlasMetric() {
    return {
        addition: "",
        label: "",
    };
}
function CreateEmptyAtlasMetrics() {
    const metrics = [];
    for (let index = 0; index < AtlasMetricSlotCount; index++) {
        metrics.push(CreateEmptyAtlasMetric());
    }
    return metrics;
}
export function CreateEmptyEmployment() {
    return {
        role: "",
        company: "",
        location: "",
        additions: "",
        startDate: "",
        startDateFormat: "full",
        endDate: "",
        endDateFormat: "full",
        description: "",
        descriptionListStyle: "disc",
        summary: "",
    };
}
export function CreateEmptyEducation() {
    return {
        degree: "",
        school: "",
        location: "",
        additions: "",
        startDate: "",
        startDateFormat: "full",
        endDate: "",
        endDateFormat: "full",
    };
}
export function CreateEmptySkill() {
    return {
        label: "",
        rating: 0,
        ratingStyle: "none",
    };
}
export function CreateEmptyLanguage() {
    return {
        name: "",
        level: "",
        rating: 0,
        ratingStyle: "none",
    };
}
export function CreateEmptyLink() {
    return {
        label: "",
        url: "",
    };
}
export function CreateEmptyProject() {
    return {
        name: "",
        subtitle: "",
        description: "",
        descriptionListStyle: "disc",
    };
}
export function CreateEmptyCustomItem() {
    return {
        name: "",
        subtitle: "",
        description: "",
        descriptionListStyle: "none",
    };
}
export function NormalizeSkillData(skill) {
    if (typeof skill === "string") {
        const result = CreateEmptySkill();
        result.label = skill;
        return result;
    }
    let source = skill;
    if (!source) {
        source = {};
    }
    const result = NormalizeTextFields(CreateEmptySkill(), source);
    let label = source.label;
    if (label === null || label === undefined) {
        label = source.name;
    }
    result.label = "";
    if (typeof label === "string") {
        result.label = label;
    }
    result.rating = NormalizeRating(source.rating);
    return result;
}
function NormalizeLanguageData(language) {
    let source = language;
    if (!source) {
        source = {};
    }
    const result = NormalizeTextFields(CreateEmptyLanguage(), source);
    result.rating = NormalizeRating(source.rating);
    return result;
}
function NormalizeAtlasMetricData(metric) {
    const result = CreateEmptyAtlasMetric();
    if (metric) {
        if (typeof metric.addition === "string") {
            result.addition = metric.addition;
        }
        if (typeof metric.label === "string") {
            result.label = metric.label;
        }
    }
    return result;
}
export function NormalizeAtlasMetrics(metrics) {
    let source = [];
    if (Array.isArray(metrics)) {
        source = metrics;
    }
    const result = [];
    for (let index = 0; index < AtlasMetricSlotCount; index++) {
        result.push(NormalizeAtlasMetricData(source[index]));
    }
    return result;
}
export function NormalizeCustomItemData(item) {
    const result = CreateEmptyCustomItem();
    if (item) {
        if (typeof item.name === "string") {
            result.name = item.name;
        }
        if (typeof item.subtitle === "string") {
            result.subtitle = item.subtitle;
        }
        if (typeof item.description === "string") {
            result.description = item.description;
        }
        if (typeof item.descriptionListStyle === "string") {
            result.descriptionListStyle = item.descriptionListStyle;
        }
    }
    return result;
}
export function NormalizeCvData(data) {
    const defaults = CreateEmptyCvData();
    let source = data;
    if (!source) {
        source = {};
    }
    const next = NormalizeTextFields(defaults, source);
    next.basics = NormalizeTextFields(defaults.basics, source.basics);
    next.studioImpact = NormalizeTextFields(defaults.studioImpact, source.studioImpact);
    next.sectionTitles = NormalizeTextFields(defaults.sectionTitles, source.sectionTitles);
    next.basics.birthDateFormat = NormalizeDateFormat(next.basics.birthDateFormat);
    next.atlasMetrics = NormalizeAtlasMetrics(source.atlasMetrics);
    const fields = [
        "employment",
        "education",
        "skills",
        "languages",
        "links",
        "projects",
        "mainCustom",
        "sideCustom",
    ];
    for (let index = 0; index < fields.length; index++) {
        const field = fields[index];
        if (!Array.isArray(next[field]) || next[field].length === 0) {
            next[field] = defaults[field];
        }
    }
    const employment = [];
    for (let index = 0; index < next.employment.length; index++) {
        const item = NormalizeTextFields(CreateEmptyEmployment(), next.employment[index]);
        item.startDateFormat = NormalizeDateFormat(item.startDateFormat);
        item.endDateFormat = NormalizeDateFormat(item.endDateFormat);
        employment.push(item);
    }
    next.employment = employment;
    const education = [];
    for (let index = 0; index < next.education.length; index++) {
        const item = NormalizeTextFields(CreateEmptyEducation(), next.education[index]);
        item.startDateFormat = NormalizeDateFormat(item.startDateFormat);
        item.endDateFormat = NormalizeDateFormat(item.endDateFormat);
        education.push(item);
    }
    next.education = education;
    const skills = [];
    for (let index = 0; index < next.skills.length; index++) {
        skills.push(NormalizeSkillData(next.skills[index]));
    }
    next.skills = skills;
    const languages = [];
    for (let index = 0; index < next.languages.length; index++) {
        languages.push(NormalizeLanguageData(next.languages[index]));
    }
    next.languages = languages;
    const links = [];
    for (let index = 0; index < next.links.length; index++) {
        links.push(NormalizeTextFields(CreateEmptyLink(), next.links[index]));
    }
    next.links = links;
    const projects = [];
    for (let index = 0; index < next.projects.length; index++) {
        projects.push(NormalizeTextFields(CreateEmptyProject(), next.projects[index]));
    }
    next.projects = projects;
    const mainCustom = [];
    for (let index = 0; index < next.mainCustom.length; index++) {
        mainCustom.push(NormalizeCustomItemData(next.mainCustom[index]));
    }
    next.mainCustom = mainCustom;
    const sideCustom = [];
    for (let index = 0; index < next.sideCustom.length; index++) {
        sideCustom.push(NormalizeCustomItemData(next.sideCustom[index]));
    }
    next.sideCustom = sideCustom;
    return next;
}
export const SampleCvData = {
    basics: {
        firstName: "Maya",
        lastName: "Petrova",
        professionalTitle: "Product Designer",
        email: "maya.petrova@email.com",
        phone: "+359 88 123 4567",
        city: "Sofia",
        country: "Bulgaria",
    },
    profile:
        "Product designer focused on clear, useful and human-centered digital experiences. I combine research, visual design and close collaboration with development teams.",
    atlasMetrics: [
        {
            addition: "6+",
            label: "Years experience",
        },
        {
            addition: "3",
            label: "Design systems",
        },
        {
            addition: "28%",
            label: "Activation growth",
        },
    ],
    employment: [
        {
            role: "Senior Product Designer",
            company: "Northline Studio",
            location: "Sofia",
            startDate: "2023",
            endDate: "Present",
            description:
                "Led the redesign of a SaaS onboarding experience.\nCreated a reusable design system for three products.\nWorked closely with product, development and QA teams.",
        },
        {
            role: "Product Designer",
            company: "Bright Labs",
            location: "Remote",
            startDate: "2021",
            endDate: "2023",
            description:
                "Designed responsive interfaces for web and mobile.\nPrepared prototypes and usability testing sessions.",
        },
    ],
    education: [
        {
            degree: "BA, Visual Communication",
            school: "National Academy of Art",
            location: "Sofia",
            startDate: "2017",
            endDate: "2021",
        },
    ],
    skills: ["Product strategy", "UX research", "UI design", "Design systems", "Prototyping", "Figma"],
    languages: [
        {
            name: "Bulgarian",
            level: "Native",
        },
        {
            name: "English",
            level: "C1",
        },
    ],
    links: [
        {
            label: "Portfolio",
            url: "maya-petrova.design",
        },
        {
            label: "LinkedIn",
            url: "linkedin.com/in/mayapetrova",
        },
    ],
    projects: [
        {
            name: "Civic Path",
            subtitle: "Service design and product research",
            description:
                "A digital service concept that helps citizens understand and complete municipal processes with fewer steps.",
        },
    ],
};
export function CloneCvData(data) {
    return JSON.parse(JSON.stringify(data));
}
function IsDateDigits(text, length) {
    if (text.length !== length) {
        return false;
    }
    for (let index = 0; index < text.length; index++) {
        if (text[index] < "0" || text[index] > "9") {
            return false;
        }
    }
    return true;
}
function NormalizeRating(value) {
    let rating = Number(value);
    if (value === undefined || value === null) {
        rating = 0;
    }
    if (rating < 0) {
        rating = 0;
    }
    if (rating > 5) {
        rating = 5;
    }
    return rating;
}
