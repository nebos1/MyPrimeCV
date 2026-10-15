import "../../folder-cv-templates/templates/folder-atlas/atlas.css";
import "../../folder-cv-templates/templates/folder-meadow/meadow.css";
import "../../folder-cv-templates/templates/folder-north/north.css";
import "./cv-content.css";
import {
    FormatCvDate,
    GetDefaultProjectTitle,
    NormalizeAtlasMetrics,
    NormalizeCustomItemData,
    SampleCvData,
} from "../create-cv-data";
function HasText(value) {
    return String(value ?? "").trim().length > 0;
}
function HasAnyText(values) {
    return values.some(HasText);
}
function NameText({ view }) {
    const hasFirstName = HasText(view.firstName);
    const hasLastName = HasText(view.lastName);
    let nameSeparator;
    if (hasFirstName && hasLastName) {
        nameSeparator = " ";
    } else {
        nameSeparator = "";
    }
    return (
        <>
            {hasFirstName && HasText(view.firstName) && <span>{view.firstName}</span>}
            {nameSeparator}
            {hasLastName && HasText(view.lastName) && <span>{view.lastName}</span>}
        </>
    );
}
function LocationText({ view }) {
    const hasCity = HasText(view.basics.city);
    const hasCountry = HasText(view.basics.country);
    let locationSeparator;
    if (hasCity && hasCountry) {
        locationSeparator = ", ";
    } else {
        locationSeparator = "";
    }
    return (
        <>
            {hasCity && HasText(view.basics.city) && <span>{view.basics.city}</span>}
            {locationSeparator}
            {hasCountry && HasText(view.basics.country) && <span>{view.basics.country}</span>}
        </>
    );
}
function DateRangeText({ item, useStoredFormat = true }) {
    const hasStart = HasText(item.startDate);
    const hasEnd = HasText(item.endDate);
    let startFormat;
    if (useStoredFormat) {
        startFormat = item.startDateFormat;
    } else {
        startFormat = "full";
    }
    let endFormat;
    if (useStoredFormat) {
        endFormat = item.endDateFormat;
    } else {
        endFormat = "full";
    }
    let dateSeparator;
    if (hasStart && hasEnd) {
        dateSeparator = " - ";
    } else {
        dateSeparator = "";
    }
    return (
        <>
            {hasStart && HasText(FormatCvDate(item.startDate, startFormat)) && (
                <span>{FormatCvDate(item.startDate, startFormat)}</span>
            )}
            {dateSeparator}
            {hasEnd && HasText(FormatCvDate(item.endDate, endFormat)) && (
                <span>{FormatCvDate(item.endDate, endFormat)}</span>
            )}
        </>
    );
}
function SplitDescription(description) {
    return String(description ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
}
function NormalizeSkill(skill) {
    if (typeof skill === "string") {
        return {
            label: skill,
            rating: 0,
            ratingStyle: "none",
        };
    }
    return {
        label: skill?.label ?? skill?.name ?? "",
        rating: Number(skill?.rating ?? 0),
        ratingStyle: skill?.ratingStyle ?? "none",
    };
}
function NormalizeLink(link) {
    if (typeof link === "string") {
        return {
            label: link,
            url: link,
        };
    }
    return {
        label: link?.label ?? "",
        url: link?.url ?? "",
    };
}
function NormalizeLanguage(language) {
    return Object.assign({}, language, {
        name: language?.name ?? "",
        level: language?.level ?? "",
        rating: Number(language?.rating ?? 0),
        ratingStyle: language?.ratingStyle ?? "none",
    });
}
function GetFullName(basics) {
    return [basics.firstName, basics.lastName].filter(HasText).join(" ");
}
function GetInitials(basics) {
    const initials = [basics.firstName, basics.lastName]
        .filter(HasText)
        .map((value) => value.trim()[0])
        .join("");
    return initials || "";
}
function GetLocation(basics) {
    return [basics.city, basics.country].filter(HasText).join(", ");
}
function GetDateRange(item) {
    return [item.startDate, item.endDate].filter(HasText).join(" - ");
}
function GetProjectTitle(data, templateId) {
    const title = String(data.sectionTitles?.projects ?? "").trim();
    if (templateId === "atlas" && title.toLowerCase() === "projects") {
        return GetDefaultProjectTitle(templateId);
    }
    return title || GetDefaultProjectTitle(templateId);
}
function HasEmployment(item) {
    return HasAnyText([
        item.role,
        item.company,
        item.location,
        item.additions,
        item.startDate,
        item.endDate,
        item.description,
    ]);
}
function HasEducation(item) {
    return HasAnyText([item.degree, item.school, item.location, item.additions, item.startDate, item.endDate]);
}
function HasProject(item) {
    return HasAnyText([item.name, item.subtitle, item.description]);
}
function HasCustomItem(item) {
    return HasAnyText([item.name, item.subtitle, item.description]);
}
function HasAtlasMetric(item) {
    return HasAnyText([item.addition, item.label]);
}
function BuildView(cv, templateId) {
    const data = cv ?? SampleCvData;
    const basics = data.basics ?? {};
    const fullName = GetFullName(basics);
    const firstName = basics.firstName ?? "";
    const lastName = basics.lastName ?? "";
    const initials = GetInitials(basics);
    const photo = basics.photo ?? "";
    const location = GetLocation(basics);
    const contactLines = [location, basics.email, basics.phone, basics.birthDate, basics.gender].filter(HasText);
    const links = (data.links ?? [])
        .map((link, index) =>
            Object.assign({}, NormalizeLink(link), {
                styleIndex: index,
            }),
        )
        .filter((link) => HasText(link.label));
    const employment = (data.employment ?? [])
        .map((item, index) =>
            Object.assign({}, item, {
                styleIndex: index,
            }),
        )
        .filter(HasEmployment);
    const education = (data.education ?? [])
        .map((item, index) =>
            Object.assign({}, item, {
                styleIndex: index,
            }),
        )
        .filter(HasEducation);
    const skills = (data.skills ?? [])
        .map((skill, index) =>
            Object.assign({}, NormalizeSkill(skill), {
                styleIndex: index,
            }),
        )
        .filter((skill) => HasText(skill.label));
    const languages = (data.languages ?? [])
        .map((item, index) =>
            Object.assign({}, NormalizeLanguage(item), {
                styleIndex: index,
            }),
        )
        .filter((item) => HasText(item.name) || HasText(item.level));
    const projects = (data.projects ?? [])
        .map((item, index) =>
            Object.assign({}, item, {
                styleIndex: index,
            }),
        )
        .filter(HasProject);
    const mainCustom = (data.mainCustom ?? [])
        .map((item, index) =>
            Object.assign({}, NormalizeCustomItemData(item), {
                styleIndex: index,
            }),
        )
        .filter(HasCustomItem);
    const sideCustom = (data.sideCustom ?? [])
        .map((item, index) =>
            Object.assign({}, NormalizeCustomItemData(item), {
                styleIndex: index,
            }),
        )
        .filter(HasCustomItem);
    const atlasMetrics = NormalizeAtlasMetrics(data.atlasMetrics).map((item, index) =>
        Object.assign({}, item, {
            styleIndex: index,
        }),
    );
    const hasAtlasMetrics = atlasMetrics.some(HasAtlasMetric);
    const projectTitle = GetProjectTitle(data, templateId);
    const mainCustomTitle = data.sectionTitles?.mainCustom || "Custom section";
    const sideCustomTitle = data.sectionTitles?.sideCustom || "Custom section";
    const hasName = HasText(fullName);
    const hasPhoto = templateId === "meadow" && (HasText(photo) || hasName);
    const isEmpty =
        !HasAnyText([
            fullName,
            basics.professionalTitle,
            basics.email,
            basics.phone,
            photo,
            basics.city,
            basics.country,
            basics.birthDate,
            basics.gender,
            data.profile,
        ]) &&
        !hasAtlasMetrics &&
        employment.length === 0 &&
        education.length === 0 &&
        skills.length === 0 &&
        languages.length === 0 &&
        links.length === 0 &&
        projects.length === 0 &&
        mainCustom.length === 0 &&
        sideCustom.length === 0;
    return {
        basics,
        atlasMetrics,
        contactLines,
        education,
        employment,
        firstName,
        fullName,
        hasName,
        hasAtlasMetrics,
        hasPhoto,
        initials,
        isEmpty,
        languages,
        lastName,
        links,
        location,
        mainCustom,
        mainCustomTitle,
        photo,
        profile: data.profile ?? "",
        projectTitle,
        projects,
        sideCustom,
        sideCustomTitle,
        skills,
        title: basics.professionalTitle ?? "",
    };
}
function DescriptionList({ item, className }) {
    const lines = SplitDescription(item.description);
    const listStyle = item.descriptionListStyle ?? "disc";
    if (lines.length === 0) {
        return null;
    }
    if (listStyle === "none") {
        return lines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>);
    }
    let ListTag;
    if (listStyle === "decimal") {
        ListTag = "ol";
    } else {
        ListTag = "ul";
    }
    return (
        <ListTag
            className={["cv-description-list", className].filter(Boolean).join(" ")}
            style={{
                listStyleType: listStyle,
            }}
        >
            {lines.map((line, index) => (
                <li key={`${line}-${index}`} className={index > 0 ? "cv-description-list-li-spaced" : ""}>
                    {line}
                </li>
            ))}
        </ListTag>
    );
}
function MeadowEntrySideMeta({ item }) {
    if (!HasText(GetDateRange(item)) && !HasText(item.location)) {
        return null;
    }
    return (
        <div className="meadow-template-entry-side-meta">
            {HasText(GetDateRange(item)) && (
                <small>
                    <DateRangeText item={item} useStoredFormat={false} />
                </small>
            )}
            {HasText(item.location) && <span className="meadow-template-entry-location">{item.location}</span>}
        </div>
    );
}
function AtlasEntrySideMeta({ item }) {
    if (!HasText(GetDateRange(item)) && !HasText(item.location)) {
        return null;
    }
    return (
        <div className="atlas-entry-side-meta">
            {HasText(GetDateRange(item)) && (
                <small>
                    <DateRangeText item={item} />
                </small>
            )}
            {HasText(item.location) && <span className="atlas-entry-location">{item.location}</span>}
        </div>
    );
}
function ProfileContent({ view }) {
    return <p>{HasText(view.profile) && <span>{view.profile}</span>}</p>;
}
function AtlasMetrics({ metrics, show }) {
    if (!show) {
        return null;
    }
    return (
        <section className="atlas-metrics">
            {metrics.map((metric, index) => {
                let atlasMetricLastClassName;
                if (index === metrics.length - 1) {
                    atlasMetricLastClassName = "atlas-metric-last";
                } else {
                    atlasMetricLastClassName = "";
                }
                return (
                    <div className={atlasMetricLastClassName} key={metric.styleIndex}>
                        {HasText(metric.addition) && <strong>{metric.addition}</strong>}
                        {HasText(metric.label) && <span>{metric.label}</span>}
                    </div>
                );
            })}
        </section>
    );
}
function LinkAnchor({ link }) {
    let href;
    if (/^https?:\/\//i.test(link.url)) {
        href = link.url;
    } else {
        href = `https://${link.url}`;
    }
    if (!HasText(link.url)) {
        return <span>{link.label}</span>;
    }
    return (
        <a href={href} target="_blank" rel="noreferrer">
            {link.label}
        </a>
    );
}
function Rating({ item }) {
    if (item.ratingStyle === "none" || !item.rating) {
        return null;
    }
    return (
        <span className={`cv-rating cv-rating-${item.ratingStyle}`} aria-label={`${item.rating} out of 5`}>
            {Array.from(
                {
                    length: 5,
                },
                (_, index) => {
                    let isFilledClassName;
                    if (index < item.rating) {
                        isFilledClassName = "cv-rating-filled";
                    } else {
                        isFilledClassName = "";
                    }
                    return <i key={index} className={isFilledClassName}></i>;
                },
            )}
        </span>
    );
}
function CustomItems({ items, itemClassName = "" }) {
    return items.map((item, index) => (
        <div
            className={
                ["cv-custom-item", itemClassName].filter(Boolean).join(" ") +
                (index > 0 ? " cv-custom-item-spaced" : "")
            }
            key={index}
        >
            <div className="cv-custom-item-heading">
                <div>
                    {HasText(item.name) && <h3>{item.name}</h3>}
                    {HasText(item.subtitle) && <span>{item.subtitle}</span>}
                </div>
            </div>
            <DescriptionList item={item} />
        </div>
    ));
}
function SkillText({ item }) {
    return (
        <span className="cv-knowledge-row">
            <span className="cv-knowledge-label">{HasText(item.label) && <span>{item.label}</span>}</span>
            <Rating item={item} />
        </span>
    );
}
function LanguageText({ item }) {
    const hasName = HasText(item.name);
    const hasLevel = HasText(item.level);
    const hasRating = item.ratingStyle !== "none" && item.rating > 0;
    return (
        <span className="cv-knowledge-row">
            {hasName && <span className="cv-knowledge-label">{HasText(item.name) && <span>{item.name}</span>}</span>}
            {(hasLevel || hasRating) && (
                <span className="cv-knowledge-meta">
                    {hasLevel && HasText(item.level) && <span>{item.level}</span>}
                    <Rating item={item} />
                </span>
            )}
        </span>
    );
}
function MeadowContact({ view }) {
    return (
        <>
            {HasText(view.basics.email) && (
                <span>{HasText(view.basics.email) && <span>{view.basics.email}</span>}</span>
            )}
            {HasText(view.basics.phone) && (
                <span>{HasText(view.basics.phone) && <span>{view.basics.phone}</span>}</span>
            )}
            {HasText(view.location) && (
                <span>
                    <LocationText view={view} />
                </span>
            )}
            {HasText(view.basics.birthDate) && (
                <span>
                    {HasText(FormatCvDate(view.basics.birthDate, "full")) && (
                        <span>{FormatCvDate(view.basics.birthDate, "full")}</span>
                    )}
                </span>
            )}
            {HasText(view.basics.gender) && (
                <span>{HasText(view.basics.gender) && <span>{view.basics.gender}</span>}</span>
            )}
        </>
    );
}
function ContactLineText({ view, line }) {
    if (line === view.basics.email) {
        return HasText(line) && <span>{line}</span>;
    }
    if (line === view.basics.phone) {
        return HasText(line) && <span>{line}</span>;
    }
    if (line === view.location) {
        return <LocationText view={view} />;
    }
    if (line === view.basics.birthDate) {
        return (
            <>
                Date of birth:{" "}
                {HasText(FormatCvDate(line, view.basics.birthDateFormat)) && (
                    <span>{FormatCvDate(line, view.basics.birthDateFormat)}</span>
                )}
            </>
        );
    }
    if (line === view.basics.gender) {
        return HasText(line) && <span>{line}</span>;
    }
    return line;
}
function BlankTemplate() {
    return <article className="create-cv-blank-template"></article>;
}
function MeadowTemplate({ data }) {
    const view = BuildView(data, "meadow");
    if (view.isEmpty) {
        return <BlankTemplate />;
    }
    const hasHeader = view.hasPhoto || view.hasName || HasText(view.title) || view.contactLines.length > 0;
    let meadowPhotoClassName;
    if (hasHeader && (view.hasPhoto || view.hasName || HasText(view.title)) && view.hasPhoto) {
        if (HasText(view.photo)) {
            meadowPhotoClassName = "meadow-template-photo meadow-template-photo-image";
        } else {
            meadowPhotoClassName = "meadow-template-photo";
        }
    }
    let photoContent;
    if (hasHeader && (view.hasPhoto || view.hasName || HasText(view.title)) && view.hasPhoto) {
        if (HasText(view.photo)) {
            photoContent = <img src={view.photo} alt="" />;
        } else {
            photoContent = view.initials;
        }
    }
    return (
        <article className="meadow-template">
            {hasHeader && (
                <header className="meadow-template-header">
                    {(view.hasPhoto || view.hasName || HasText(view.title)) && (
                        <div className="meadow-template-person">
                            {view.hasPhoto && <span className={meadowPhotoClassName}>{photoContent}</span>}
                            <div>
                                {view.hasName && (
                                    <h1>
                                        <NameText view={view} />
                                    </h1>
                                )}
                                {HasText(view.title) && <p>{HasText(view.title) && <span>{view.title}</span>}</p>}
                            </div>
                        </div>
                    )}

                    <div className="meadow-template-contact">
                        <MeadowContact view={view} />
                    </div>
                </header>
            )}

            {hasHeader && <div className="meadow-template-line"></div>}

            <div className="meadow-template-content">
                <main className="meadow-template-main">
                    {HasText(view.profile) && (
                        <section className="meadow-template-section">
                            <ProfileContent view={view} />
                        </section>
                    )}

                    {view.employment.length > 0 && (
                        <section
                            className={
                                HasText(view.profile)
                                    ? "meadow-template-section meadow-template-section-spaced"
                                    : "meadow-template-section"
                            }
                        >
                            <h2>Employment history</h2>
                            {view.employment.map((employmentEntry, employmentEntryIndex) => (
                                <div className="meadow-template-job" key={employmentEntryIndex}>
                                    <div className="meadow-template-job-heading">
                                        <div>
                                            {HasText(employmentEntry.role) && <h3>{employmentEntry.role}</h3>}
                                            {HasText(employmentEntry.company) && <span>{employmentEntry.company}</span>}
                                            {HasText(employmentEntry.additions) && (
                                                <span className="meadow-template-entry-extra">
                                                    {employmentEntry.additions}
                                                </span>
                                            )}
                                        </div>
                                        <MeadowEntrySideMeta item={employmentEntry} />
                                    </div>
                                    <DescriptionList item={employmentEntry} />
                                </div>
                            ))}
                        </section>
                    )}

                    {view.education.length > 0 && (
                        <section
                            className={
                                view.employment.length > 0 || HasText(view.profile)
                                    ? "meadow-template-section meadow-template-section-spaced"
                                    : "meadow-template-section"
                            }
                        >
                            <h2>Education</h2>
                            {view.education.map((educationEntry, educationEntryIndex) => (
                                <div className="meadow-template-education" key={educationEntryIndex}>
                                    <div>
                                        {HasText(educationEntry.degree) && <h3>{educationEntry.degree}</h3>}
                                        {HasText(educationEntry.school) && <span>{educationEntry.school}</span>}
                                        {HasText(educationEntry.additions) && (
                                            <span className="meadow-template-entry-extra">
                                                {educationEntry.additions}
                                            </span>
                                        )}
                                    </div>
                                    <MeadowEntrySideMeta item={educationEntry} />
                                </div>
                            ))}
                        </section>
                    )}

                    {view.projects.length > 0 && (
                        <section
                            className={
                                view.education.length > 0 || view.employment.length > 0 || HasText(view.profile)
                                    ? "meadow-template-section meadow-template-section-spaced"
                                    : "meadow-template-section"
                            }
                        >
                            <h2>{view.projectTitle}</h2>
                            {view.projects.map((project, projectIndex) => (
                                <div className="meadow-template-project" key={projectIndex}>
                                    {HasText(project.name) && <h3>{project.name}</h3>}
                                    {HasText(project.subtitle) && <span>{project.subtitle}</span>}
                                    <DescriptionList item={project} />
                                </div>
                            ))}
                        </section>
                    )}

                    {view.mainCustom.length > 0 && (
                        <section
                            className={
                                view.projects.length > 0 ||
                                view.education.length > 0 ||
                                view.employment.length > 0 ||
                                HasText(view.profile)
                                    ? "meadow-template-section meadow-template-section-spaced"
                                    : "meadow-template-section"
                            }
                        >
                            <h2>{view.mainCustomTitle}</h2>
                            <CustomItems items={view.mainCustom} itemClassName="meadow-template-project" />
                        </section>
                    )}
                </main>

                {(view.skills.length > 0 ||
                    view.languages.length > 0 ||
                    view.links.length > 0 ||
                    view.sideCustom.length > 0) && (
                    <aside className="meadow-template-sidebar">
                        {view.skills.length > 0 && (
                            <section>
                                <h2>Skills</h2>
                                <ul>
                                    {view.skills.map((skill, skillIndex) => (
                                        <li key={skillIndex}>
                                            <SkillText item={skill} />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {view.languages.length > 0 && (
                            <section className={view.skills.length > 0 ? "meadow-template-sidebar-section-spaced" : ""}>
                                <h2>Languages</h2>
                                {view.languages.map((language, languageIndex) => (
                                    <div className="meadow-template-language" key={languageIndex}>
                                        {HasText(language.name) && (
                                            <span className="meadow-template-language-name">{language.name}</span>
                                        )}
                                        {(HasText(language.level) ||
                                            (language.ratingStyle !== "none" && language.rating > 0)) && (
                                            <span className="meadow-template-language-meta">
                                                {HasText(language.level) && <small>{language.level}</small>}
                                                <Rating item={language} />
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </section>
                        )}

                        {view.links.length > 0 && (
                            <section
                                className={
                                    view.languages.length > 0 || view.skills.length > 0
                                        ? "meadow-template-sidebar-section-spaced"
                                        : ""
                                }
                            >
                                <h2>Links</h2>
                                {view.links.map((link, linkIndex) => (
                                    <p key={linkIndex}>
                                        <LinkAnchor link={link} />
                                    </p>
                                ))}
                            </section>
                        )}

                        {view.sideCustom.length > 0 && (
                            <section
                                className={
                                    view.links.length > 0 || view.languages.length > 0 || view.skills.length > 0
                                        ? "meadow-template-sidebar-section-spaced"
                                        : ""
                                }
                            >
                                <h2>{view.sideCustomTitle}</h2>
                                <CustomItems items={view.sideCustom} />
                            </section>
                        )}
                    </aside>
                )}
            </div>
        </article>
    );
}
function AtlasTemplate({ data }) {
    const view = BuildView(data, "atlas");
    if (view.isEmpty) {
        return <BlankTemplate />;
    }
    return (
        <article className="atlas-template">
            {(view.hasName || HasText(view.title) || HasText(view.profile) || view.contactLines.length > 0) && (
                <header className="atlas-header">
                    <div>
                        {HasText(view.title) && HasText(view.title) && (
                            <span className="atlas-header-label">{view.title}</span>
                        )}
                        {view.hasName && (
                            <h1>
                                <NameText view={view} />
                            </h1>
                        )}
                        {HasText(view.profile) && (
                            <div className="atlas-summary">
                                <ProfileContent view={view} />
                            </div>
                        )}
                    </div>
                    {view.contactLines.length > 0 && (
                        <div className="atlas-contact">
                            <strong>Contact</strong>
                            {view.contactLines.map((line) => (
                                <span key={line}>
                                    <ContactLineText view={view} line={line} />
                                </span>
                            ))}
                        </div>
                    )}
                </header>
            )}

            <AtlasMetrics metrics={view.atlasMetrics} show={view.hasAtlasMetrics} />

            <div className="atlas-layout">
                <main className="atlas-main">
                    {view.employment.length > 0 && (
                        <section className="atlas-section">
                            <h2>Professional experience</h2>
                            {view.employment.map((employmentEntry, employmentEntryIndex) => {
                                let atlasRoleClassName;
                                if (employmentEntryIndex === view.employment.length - 1) {
                                    atlasRoleClassName = "atlas-role atlas-role-last";
                                } else {
                                    atlasRoleClassName = "atlas-role";
                                }
                                return (
                                    <article className={atlasRoleClassName} key={employmentEntryIndex}>
                                        <div className="atlas-role-line">
                                            <span></span>
                                        </div>
                                        <div className="atlas-role-content">
                                            <div className="atlas-role-heading">
                                                <div>
                                                    {HasText(employmentEntry.role) && <h3>{employmentEntry.role}</h3>}
                                                    {HasText(employmentEntry.company) && (
                                                        <p>{employmentEntry.company}</p>
                                                    )}
                                                    {HasText(employmentEntry.additions) && (
                                                        <span className="atlas-entry-extra">
                                                            {employmentEntry.additions}
                                                        </span>
                                                    )}
                                                </div>
                                                <AtlasEntrySideMeta item={employmentEntry} />
                                            </div>
                                            <DescriptionList item={employmentEntry} />
                                        </div>
                                    </article>
                                );
                            })}
                        </section>
                    )}

                    {view.projects.length > 0 && (
                        <section
                            className={
                                view.employment.length > 0 ? "atlas-section atlas-section-spaced" : "atlas-section"
                            }
                        >
                            <h2>{view.projectTitle}</h2>
                            {view.projects.map((project, projectIndex) => (
                                <div className="atlas-case" key={projectIndex}>
                                    <span>{String(projectIndex + 1).padStart(2, "0")}</span>
                                    <div>
                                        {HasText(project.name) && <h3>{project.name}</h3>}
                                        <DescriptionList item={project} />
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {view.mainCustom.length > 0 && (
                        <section
                            className={
                                view.projects.length > 0 || view.employment.length > 0
                                    ? "atlas-section atlas-main-custom-section atlas-section-spaced"
                                    : "atlas-section atlas-main-custom-section"
                            }
                        >
                            <h2>{view.mainCustomTitle}</h2>
                            <CustomItems items={view.mainCustom} />
                        </section>
                    )}
                </main>

                {(view.skills.length > 0 ||
                    view.education.length > 0 ||
                    view.languages.length > 0 ||
                    view.links.length > 0 ||
                    view.sideCustom.length > 0) && (
                    <aside className="atlas-sidebar">
                        {view.skills.length > 0 && (
                            <section>
                                <h2>Core strengths</h2>
                                <ul>
                                    {view.skills.map((skill, skillIndex) => (
                                        <li key={skillIndex}>
                                            <SkillText item={skill} />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                        {view.education.length > 0 && (
                            <section className={view.skills.length > 0 ? "atlas-sidebar-section-spaced" : ""}>
                                <h2>Education</h2>
                                {view.education.map((educationEntry, educationEntryIndex) => (
                                    <div className="atlas-education" key={educationEntryIndex}>
                                        <div className="atlas-education-row">
                                            {HasText(educationEntry.degree) && <h3>{educationEntry.degree}</h3>}
                                            {HasText(GetDateRange(educationEntry)) && (
                                                <small>
                                                    <DateRangeText item={educationEntry} />
                                                </small>
                                            )}
                                        </div>
                                        <div className="atlas-education-row">
                                            {HasText(educationEntry.school) && <p>{educationEntry.school}</p>}
                                            {HasText(educationEntry.location) && (
                                                <span className="atlas-entry-location">{educationEntry.location}</span>
                                            )}
                                        </div>
                                        {HasText(educationEntry.additions) && (
                                            <span className="atlas-entry-extra">{educationEntry.additions}</span>
                                        )}
                                    </div>
                                ))}
                            </section>
                        )}
                        {view.languages.length > 0 && (
                            <section
                                className={
                                    view.education.length > 0 || view.skills.length > 0
                                        ? "atlas-sidebar-section-spaced"
                                        : ""
                                }
                            >
                                <h2>Languages</h2>
                                {view.languages.map((language, languageIndex) => (
                                    <p key={languageIndex}>
                                        <LanguageText item={language} />
                                    </p>
                                ))}
                            </section>
                        )}
                        {view.links.length > 0 && (
                            <section
                                className={
                                    view.languages.length > 0 || view.education.length > 0 || view.skills.length > 0
                                        ? "atlas-sidebar-section-spaced"
                                        : ""
                                }
                            >
                                <h2>Links</h2>
                                {view.links.map((link, linkIndex) => (
                                    <p key={linkIndex}>
                                        <LinkAnchor link={link} />
                                    </p>
                                ))}
                            </section>
                        )}
                        {view.sideCustom.length > 0 && (
                            <section
                                className={
                                    view.links.length > 0 ||
                                    view.languages.length > 0 ||
                                    view.education.length > 0 ||
                                    view.skills.length > 0
                                        ? "atlas-side-custom-section atlas-sidebar-section-spaced"
                                        : "atlas-side-custom-section"
                                }
                            >
                                <h2>{view.sideCustomTitle}</h2>
                                <CustomItems items={view.sideCustom} />
                            </section>
                        )}
                    </aside>
                )}
            </div>
        </article>
    );
}
function NorthTemplate({ data }) {
    const view = BuildView(data, "north");
    if (view.isEmpty) {
        return <BlankTemplate />;
    }
    return (
        <article className="north-template">
            <header className="north-header">
                <div>
                    {view.hasName && (
                        <h1>
                            <NameText view={view} />
                        </h1>
                    )}
                    {HasText(view.title) && <p>{HasText(view.title) && <span>{view.title}</span>}</p>}
                </div>
                <div className="north-contact">
                    {view.contactLines.map((line) => (
                        <span key={line}>
                            <ContactLineText view={view} line={line} />
                        </span>
                    ))}
                    {view.links.map((link, linkIndex) => (
                        <span key={linkIndex}>
                            <LinkAnchor link={link} />
                        </span>
                    ))}
                </div>
            </header>
            {HasText(view.profile) && (
                <section className="north-summary">
                    <h2>Profile</h2>
                    <ProfileContent view={view} />
                </section>
            )}
            {view.employment.length > 0 && (
                <section className="north-section">
                    <h2>Experience</h2>
                    {view.employment.map((employmentEntry, employmentEntryIndex) => (
                        <div className="north-entry" key={employmentEntryIndex}>
                            {HasText(GetDateRange(employmentEntry)) && (
                                <div className="north-entry-date">
                                    <DateRangeText item={employmentEntry} />
                                </div>
                            )}
                            <div className="north-entry-details">
                                {HasText(employmentEntry.role) && <h3>{employmentEntry.role}</h3>}
                                {HasText(employmentEntry.company) && <span>{employmentEntry.company}</span>}
                                <DescriptionList item={employmentEntry} />
                            </div>
                        </div>
                    ))}
                </section>
            )}
            {view.projects.length > 0 && (
                <section className="north-section">
                    <h2>{view.projectTitle}</h2>
                    {view.projects.map((project, projectIndex) => (
                        <div className="north-entry" key={projectIndex}>
                            <div></div>
                            <div>
                                {HasText(project.name) && <h3>{project.name}</h3>}
                                {HasText(project.subtitle) && <span>{project.subtitle}</span>}
                                <DescriptionList item={project} />
                            </div>
                        </div>
                    ))}
                </section>
            )}
            {view.mainCustom.length > 0 && (
                <section className="north-section">
                    <h2>{view.mainCustomTitle}</h2>
                    <CustomItems items={view.mainCustom} itemClassName="north-small-entry" />
                </section>
            )}
            {(view.education.length > 0 || view.skills.length > 0 || view.sideCustom.length > 0) && (
                <div className="north-bottom-grid">
                    {view.education.length > 0 && (
                        <section className="north-section">
                            <h2>Education</h2>
                            {view.education.map((educationEntry, educationEntryIndex) => (
                                <div className="north-small-entry" key={educationEntryIndex}>
                                    {HasText(GetDateRange(educationEntry)) && (
                                        <small>
                                            <DateRangeText item={educationEntry} />
                                        </small>
                                    )}
                                    {HasText(educationEntry.degree) && <strong>{educationEntry.degree}</strong>}
                                    {HasText(educationEntry.school) && <span>{educationEntry.school}</span>}
                                </div>
                            ))}
                        </section>
                    )}
                    {view.skills.length > 0 && (
                        <section className="north-section">
                            <h2>Skills</h2>
                            <div className="north-skills">
                                {view.skills.map((skill, skillIndex) => (
                                    <span key={skillIndex}>
                                        <SkillText item={skill} />
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                    {view.sideCustom.length > 0 && (
                        <section className="north-section">
                            <h2>{view.sideCustomTitle}</h2>
                            <CustomItems items={view.sideCustom} />
                        </section>
                    )}
                </div>
            )}
        </article>
    );
}
export { MeadowTemplate, AtlasTemplate, NorthTemplate };
