export const CvSchemaVersion = 3;
export const DefaultTemplateId = "meadow";
export const LanguageLevelOptions = ["", "A1", "A2", "B1", "B2", "C1", "C2", "Native"];
export const RatingStyleOptions = [
    { value: "none", label: "No rating" },
    { value: "circle", label: "Circles" },
    { value: "square", label: "Squares" },
];
const AtlasMetricSlotCount = 3;

const DefaultProjectTitles = {
    atlas: "Selected Case study",
    studio: "Selected work",
};

export function GetDefaultProjectTitle(templateId) {
    return DefaultProjectTitles[templateId] ?? "Selected project";
}

function NormalizeDateFormat(value) {
    if (value === "year") {
        return "year";
    } else {
        return "full";
    }
}

function NormalizeTextFields(defaults, source) {
    const result = Object.assign({}, defaults, source);
    for (const key of Object.keys(defaults)) {
        if (typeof defaults[key] === "string" && typeof result[key] !== "string") {
            result[key] = defaults[key];
        }
    }
    return result;
}

export function FormatCvDate(value, format = "full") {
    const text = String(value ?? "").trim();
    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);

    if (NormalizeDateFormat(format) === "year") {
        const fullDateMatch = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(text);

        return isoMatch?.[1] ?? fullDateMatch?.[3] ?? text;
    }

    if (isoMatch) {
        return `${isoMatch[3]}.${isoMatch[2]}.${isoMatch[1]}`;
    } else {
        return text;
    }
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
        atlasMetrics: CreateEmptyAtlasMetrics(),
        sectionTitles: {
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
    return Array.from({ length: AtlasMetricSlotCount }, () => CreateEmptyAtlasMetric());
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
        return Object.assign({}, CreateEmptySkill(), { label: skill });
    }

    return NormalizeTextFields(CreateEmptySkill(), Object.assign({}, skill, {
        label: skill?.label ?? skill?.name ?? "",
        rating: Math.max(0, Math.min(5, Number(skill?.rating ?? 0))),
        ratingStyle: skill?.ratingStyle ?? "none",
    }));
}

function NormalizeLanguageData(language) {
    return NormalizeTextFields(CreateEmptyLanguage(), Object.assign({}, language, {
        rating: Math.max(0, Math.min(5, Number(language?.rating ?? 0))),
        ratingStyle: language?.ratingStyle ?? "none",
    }));
}

function NormalizeAtlasMetricData(metric) {
    return NormalizeTextFields(CreateEmptyAtlasMetric(), {
        addition: metric?.addition ?? "",
        label: metric?.label ?? "",
    });
}

export function NormalizeAtlasMetrics(metrics) {
    let sourceMetrics;
    if (Array.isArray(metrics)) {
        sourceMetrics = metrics;
    } else {
        sourceMetrics = [];
    }

    return Array.from({ length: AtlasMetricSlotCount }, (_, index) => NormalizeAtlasMetricData(sourceMetrics[index]));
}

export function NormalizeCustomItemData(item) {
    return NormalizeTextFields(CreateEmptyCustomItem(), {
        name: item?.name ?? "",
        subtitle: item?.subtitle ?? "",
        description: item?.description ?? "",
        descriptionListStyle: item?.descriptionListStyle ?? "none",
    });
}

export function NormalizeCvData(data) {
    const defaults = CreateEmptyCvData();
    const source = data || {};
    const next = Object.assign({}, defaults, source);

    next.basics = NormalizeTextFields(defaults.basics, source.basics);
    next.profile = typeof source.profile === "string" ? source.profile : "";
    next.basics.birthDateFormat = NormalizeDateFormat(source.basics?.birthDateFormat);
    next.sectionTitles = NormalizeTextFields(defaults.sectionTitles, source.sectionTitles);
    next.atlasMetrics = NormalizeAtlasMetrics(source.atlasMetrics);

    for (const field of [
        "employment",
        "education",
        "skills",
        "languages",
        "links",
        "projects",
        "mainCustom",
        "sideCustom",
    ]) {
        if (!Array.isArray(next[field]) || next[field].length === 0) next[field] = defaults[field];
    }

    next.employment = next.employment.map((item) => {
        const employment = NormalizeTextFields(CreateEmptyEmployment(), item);
        employment.startDateFormat = NormalizeDateFormat(item?.startDateFormat);
        employment.endDateFormat = NormalizeDateFormat(item?.endDateFormat);
        return employment;
    });
    next.education = next.education.map((item) => {
        const education = NormalizeTextFields(CreateEmptyEducation(), item);
        education.startDateFormat = NormalizeDateFormat(item?.startDateFormat);
        education.endDateFormat = NormalizeDateFormat(item?.endDateFormat);
        return education;
    });
    next.skills = next.skills.map(NormalizeSkillData);
    next.languages = next.languages.map(NormalizeLanguageData);
    next.links = next.links.map((item) => NormalizeTextFields(CreateEmptyLink(), item));
    next.projects = next.projects.map((item) => {
        const project = NormalizeTextFields(CreateEmptyProject(), item);
        return project;
    });
    next.mainCustom = next.mainCustom.map(NormalizeCustomItemData);
    next.sideCustom = next.sideCustom.map(NormalizeCustomItemData);
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
        { addition: "6+", label: "Years experience" },
        { addition: "3", label: "Design systems" },
        { addition: "28%", label: "Activation growth" },
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
        { name: "Bulgarian", level: "Native" },
        { name: "English", level: "C1" },
    ],
    links: [
        { label: "Portfolio", url: "maya-petrova.design" },
        { label: "LinkedIn", url: "linkedin.com/in/mayapetrova" },
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
