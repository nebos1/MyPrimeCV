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

function FieldText({ as: Tag = "span", className, children }) {
    if (!HasText(children)) {
        return null;
    }

    return <Tag className={className}>{children}</Tag>;
}

function ItemText({ item, field, as: Tag = "span", className, children }) {
    return (
        <FieldText as={Tag} className={className}>
            {children ?? item[field]}
        </FieldText>
    );
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
            {hasFirstName && <FieldText>{view.firstName}</FieldText>}
            {nameSeparator}
            {hasLastName && <FieldText>{view.lastName}</FieldText>}
        </>
    );
}

function TitleText({ view, as = "span", className }) {
    return (
        <FieldText as={as} className={className}>
            {view.title}
        </FieldText>
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
            {hasCity && <FieldText>{view.basics.city}</FieldText>}
            {locationSeparator}
            {hasCountry && <FieldText>{view.basics.country}</FieldText>}
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
            {hasStart && <FieldText>{FormatCvDate(item.startDate, startFormat)}</FieldText>}
            {dateSeparator}
            {hasEnd && <FieldText>{FormatCvDate(item.endDate, endFormat)}</FieldText>}
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
        .map((link, index) => Object.assign({}, NormalizeLink(link), { styleIndex: index }))
        .filter((link) => HasText(link.label));
    const employment = (data.employment ?? [])
        .map((item, index) => Object.assign({}, item, { styleIndex: index }))
        .filter(HasEmployment);
    const education = (data.education ?? [])
        .map((item, index) => Object.assign({}, item, { styleIndex: index }))
        .filter(HasEducation);
    const skills = (data.skills ?? [])
        .map((skill, index) => Object.assign({}, NormalizeSkill(skill), { styleIndex: index }))
        .filter((skill) => HasText(skill.label));
    const languages = (data.languages ?? [])
        .map((item, index) => Object.assign({}, NormalizeLanguage(item), { styleIndex: index }))
        .filter((item) => HasText(item.name) || HasText(item.level));
    const projects = (data.projects ?? [])
        .map((item, index) => Object.assign({}, item, { styleIndex: index }))
        .filter(HasProject);
    const mainCustom = (data.mainCustom ?? [])
        .map((item, index) => Object.assign({}, NormalizeCustomItemData(item), { styleIndex: index }))
        .filter(HasCustomItem);
    const sideCustom = (data.sideCustom ?? [])
        .map((item, index) => Object.assign({}, NormalizeCustomItemData(item), { styleIndex: index }))
        .filter(HasCustomItem);
    const atlasMetrics = NormalizeAtlasMetrics(data.atlasMetrics).map((item, index) =>
        Object.assign({}, item, { styleIndex: index }),
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

function Section({ show, className, children }) {
    if (!show) {
        return null;
    }

    return <section className={className}>{children}</section>;
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
            style={{ listStyleType: listStyle }}
        >
            {lines.map((line, index) => (
                <li key={`${line}-${index}`}>{line}</li>
            ))}
        </ListTag>
    );
}

function MeadowEntrySideMeta({ item }) {
    if (!HasText(GetDateRange(item)) && !HasText(item.location)) {
        return null;
    }

    return (
        <div className="maya-template-entry-side-meta">
            {HasText(GetDateRange(item)) && (
                <small>
                    <DateRangeText item={item} useStoredFormat={false} />
                </small>
            )}
            <ItemText item={item} field="location" className="maya-template-entry-location" />
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
            <ItemText item={item} field="location" className="atlas-entry-location" />
        </div>
    );
}

function ProfileContent({ view }) {
    return (
        <p>
            <FieldText>{view.profile}</FieldText>
        </p>
    );
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
                        <FieldText as="strong">{metric.addition}</FieldText>
                        <FieldText>{metric.label}</FieldText>
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
            {Array.from({ length: 5 }, (_, index) => {
                let isFilledClassName;
                if (index < item.rating) {
                    isFilledClassName = "is-filled";
                } else {
                    isFilledClassName = "";
                }

                return <i key={index} className={isFilledClassName}></i>;
            })}
        </span>
    );
}

function CustomItems({ items, itemClassName = "" }) {
    return items.map((item, index) => (
        <div className={["cv-custom-item", itemClassName].filter(Boolean).join(" ")} key={index}>
            <div className="cv-custom-item-heading">
                <div>
                    <ItemText item={item} field="name" as="h3" />
                    <ItemText item={item} field="subtitle" />
                </div>
            </div>
            <DescriptionList item={item} />
        </div>
    ));
}

function SkillText({ item }) {
    return (
        <span className="cv-knowledge-row">
            <span className="cv-knowledge-label">
                <ItemText item={item} field="label" />
            </span>
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
            {hasName && (
                <span className="cv-knowledge-label">
                    <ItemText item={item} field="name" />
                </span>
            )}
            {(hasLevel || hasRating) && (
                <span className="cv-knowledge-meta">
                    {hasLevel && <ItemText item={item} field="level" />}
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
                <span>
                    <FieldText>{view.basics.email}</FieldText>
                </span>
            )}
            {HasText(view.basics.phone) && (
                <span>
                    <FieldText>{view.basics.phone}</FieldText>
                </span>
            )}
            {HasText(view.location) && (
                <span>
                    <LocationText view={view} />
                </span>
            )}
            {HasText(view.basics.birthDate) && (
                <span>
                    <FieldText>{FormatCvDate(view.basics.birthDate, "full")}</FieldText>
                </span>
            )}
            {HasText(view.basics.gender) && (
                <span>
                    <FieldText>{view.basics.gender}</FieldText>
                </span>
            )}
        </>
    );
}

function ContactLineText({ view, line }) {
    if (line === view.basics.email) {
        return <FieldText>{line}</FieldText>;
    }

    if (line === view.basics.phone) {
        return <FieldText>{line}</FieldText>;
    }

    if (line === view.location) {
        return <LocationText view={view} />;
    }

    if (line === view.basics.birthDate) {
        return (
            <>
                Date of birth: <FieldText>{FormatCvDate(line, view.basics.birthDateFormat)}</FieldText>
            </>
        );
    }

    if (line === view.basics.gender) {
        return <FieldText>{line}</FieldText>;
    }

    return line;
}

function BlankTemplate() {
    return <article className="create-cv-blank-template"></article>;
}

function UnavailableTemplate() {
    return (
        <article className="create-cv-unavailable-template">
            <p>This template does not have implemented logic yet. Coming soon.</p>
        </article>
    );
}

function MeadowTemplate({ view }) {
    if (view.isEmpty) {
        return <BlankTemplate />;
    }

    const hasHeader = view.hasPhoto || view.hasName || HasText(view.title) || view.contactLines.length > 0;

    let mayaTemplatePhotoClassName;
    if (hasHeader && (view.hasPhoto || view.hasName || HasText(view.title)) && view.hasPhoto) {
        if (HasText(view.photo)) {
            mayaTemplatePhotoClassName = "maya-template-photo maya-template-photo-image";
        } else {
            mayaTemplatePhotoClassName = "maya-template-photo";
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
        <article className="maya-template">
            {hasHeader && (
                <header className="maya-template-header">
                    {(view.hasPhoto || view.hasName || HasText(view.title)) && (
                        <div className="maya-template-person">
                            {view.hasPhoto && <span className={mayaTemplatePhotoClassName}>{photoContent}</span>}
                            <div>
                                {view.hasName && (
                                    <h1>
                                        <NameText view={view} />
                                    </h1>
                                )}
                                {HasText(view.title) && (
                                    <p>
                                        <TitleText view={view} />
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="maya-template-contact">
                        <MeadowContact view={view} />
                    </div>
                </header>
            )}

            {hasHeader && <div className="maya-template-line"></div>}

            <div className="maya-template-content">
                <main className="maya-template-main">
                    <Section show={HasText(view.profile)} className="maya-template-section">
                        <ProfileContent view={view} />
                    </Section>

                    <Section show={view.employment.length > 0} className="maya-template-section">
                        <h2>Employment history</h2>
                        {view.employment.map((item, index) => (
                            <div className="maya-template-job" key={index}>
                                <div className="maya-template-job-heading">
                                    <div>
                                        <ItemText item={item} field="role" as="h3" />
                                        <ItemText item={item} field="company" />
                                        <ItemText item={item} field="additions" className="maya-template-entry-extra" />
                                    </div>
                                    <MeadowEntrySideMeta item={item} />
                                </div>
                                <DescriptionList item={item} />
                            </div>
                        ))}
                    </Section>

                    <Section show={view.education.length > 0} className="maya-template-section">
                        <h2>Education</h2>
                        {view.education.map((item, index) => (
                            <div className="maya-template-education" key={index}>
                                <div>
                                    <ItemText item={item} field="degree" as="h3" />
                                    <ItemText item={item} field="school" />
                                    <ItemText item={item} field="additions" className="maya-template-entry-extra" />
                                </div>
                                <MeadowEntrySideMeta item={item} />
                            </div>
                        ))}
                    </Section>

                    <Section show={view.projects.length > 0} className="maya-template-section">
                        <h2>{view.projectTitle}</h2>
                        {view.projects.map((item, index) => (
                            <div className="maya-template-project" key={index}>
                                <ItemText item={item} field="name" as="h3" />
                                <ItemText item={item} field="subtitle" />
                                <DescriptionList item={item} />
                            </div>
                        ))}
                    </Section>

                    <Section show={view.mainCustom.length > 0} className="maya-template-section">
                        <h2>{view.mainCustomTitle}</h2>
                        <CustomItems items={view.mainCustom} itemClassName="maya-template-project" />
                    </Section>
                </main>

                {(view.skills.length > 0 ||
                    view.languages.length > 0 ||
                    view.links.length > 0 ||
                    view.sideCustom.length > 0) && (
                    <aside className="maya-template-sidebar">
                        <Section show={view.skills.length > 0}>
                            <h2>Skills</h2>
                            <ul>
                                {view.skills.map((item, index) => (
                                    <li key={index}>
                                        <SkillText item={item} />
                                    </li>
                                ))}
                            </ul>
                        </Section>

                        <Section show={view.languages.length > 0}>
                            <h2>Languages</h2>
                            {view.languages.map((item, index) => (
                                <div className="maya-template-language" key={index}>
                                    <ItemText item={item} field="name" className="maya-template-language-name" />
                                    {(HasText(item.level) || (item.ratingStyle !== "none" && item.rating > 0)) && (
                                        <span className="maya-template-language-meta">
                                            <ItemText item={item} field="level" as="small" />
                                            <Rating item={item} />
                                        </span>
                                    )}
                                </div>
                            ))}
                        </Section>

                        <Section show={view.links.length > 0}>
                            <h2>Links</h2>
                            {view.links.map((link, index) => (
                                <p key={index}>
                                    <LinkAnchor link={link} />
                                </p>
                            ))}
                        </Section>

                        <Section show={view.sideCustom.length > 0}>
                            <h2>{view.sideCustomTitle}</h2>
                            <CustomItems items={view.sideCustom} />
                        </Section>
                    </aside>
                )}
            </div>
        </article>
    );
}

function AtlasTemplate({ view }) {
    if (view.isEmpty) {
        return <BlankTemplate />;
    }

    return (
        <article className="atlas-template">
            {(view.hasName || HasText(view.title) || HasText(view.profile) || view.contactLines.length > 0) && (
                <header className="atlas-header">
                    <div>
                        {HasText(view.title) && <TitleText view={view} className="atlas-header-label" />}
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
                    <Section show={view.employment.length > 0} className="atlas-section">
                        <h2>Professional experience</h2>
                        {view.employment.map((item, index) => {
                            let atlasRoleClassName;
                            if (index === view.employment.length - 1) {
                                atlasRoleClassName = "atlas-role atlas-role-last";
                            } else {
                                atlasRoleClassName = "atlas-role";
                            }

                            return (
                                <article className={atlasRoleClassName} key={index}>
                                    <div className="atlas-role-line">
                                        <span></span>
                                    </div>
                                    <div className="atlas-role-content">
                                        <div className="atlas-role-heading">
                                            <div>
                                                <ItemText item={item} field="role" as="h3" />
                                                <ItemText item={item} field="company" as="p" />
                                                <ItemText item={item} field="additions" className="atlas-entry-extra" />
                                            </div>
                                            <AtlasEntrySideMeta item={item} />
                                        </div>
                                        <DescriptionList item={item} />
                                    </div>
                                </article>
                            );
                        })}
                    </Section>

                    <Section show={view.projects.length > 0} className="atlas-section">
                        <h2>{view.projectTitle}</h2>
                        {view.projects.map((item, index) => (
                            <div className="atlas-case" key={index}>
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <div>
                                    <ItemText item={item} field="name" as="h3" />
                                    <DescriptionList item={item} />
                                </div>
                            </div>
                        ))}
                    </Section>

                    <Section show={view.mainCustom.length > 0} className="atlas-section atlas-main-custom-section">
                        <h2>{view.mainCustomTitle}</h2>
                        <CustomItems items={view.mainCustom} />
                    </Section>
                </main>

                {(view.skills.length > 0 ||
                    view.education.length > 0 ||
                    view.languages.length > 0 ||
                    view.links.length > 0 ||
                    view.sideCustom.length > 0) && (
                    <aside className="atlas-sidebar">
                        <Section show={view.skills.length > 0}>
                            <h2>Core strengths</h2>
                            <ul>
                                {view.skills.map((item, index) => (
                                    <li key={index}>
                                        <SkillText item={item} />
                                    </li>
                                ))}
                            </ul>
                        </Section>
                        <Section show={view.education.length > 0}>
                            <h2>Education</h2>
                            {view.education.map((item, index) => (
                                <div className="atlas-education" key={index}>
                                    <div className="atlas-education-row">
                                        <ItemText item={item} field="degree" as="h3" />
                                        {HasText(GetDateRange(item)) && (
                                            <small>
                                                <DateRangeText item={item} />
                                            </small>
                                        )}
                                    </div>
                                    <div className="atlas-education-row">
                                        <ItemText item={item} field="school" as="p" />
                                        <ItemText item={item} field="location" className="atlas-entry-location" />
                                    </div>
                                    <ItemText item={item} field="additions" className="atlas-entry-extra" />
                                </div>
                            ))}
                        </Section>
                        <Section show={view.languages.length > 0}>
                            <h2>Languages</h2>
                            {view.languages.map((item, index) => (
                                <p key={index}>
                                    <LanguageText item={item} />
                                </p>
                            ))}
                        </Section>
                        <Section show={view.links.length > 0}>
                            <h2>Links</h2>
                            {view.links.map((link, index) => (
                                <p key={index}>
                                    <LinkAnchor link={link} />
                                </p>
                            ))}
                        </Section>
                        <Section show={view.sideCustom.length > 0} className="atlas-side-custom-section">
                            <h2>{view.sideCustomTitle}</h2>
                            <CustomItems items={view.sideCustom} />
                        </Section>
                    </aside>
                )}
            </div>
        </article>
    );
}

function NorthTemplate({ view }) {
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
                    {HasText(view.title) && (
                        <p>
                            <TitleText view={view} />
                        </p>
                    )}
                </div>
                <div className="north-contact">
                    {view.contactLines.map((line) => (
                        <span key={line}>
                            <ContactLineText view={view} line={line} />
                        </span>
                    ))}
                    {view.links.map((link, index) => (
                        <span key={index}>
                            <LinkAnchor link={link} />
                        </span>
                    ))}
                </div>
            </header>
            <Section show={HasText(view.profile)} className="north-summary">
                <h2>Profile</h2>
                <ProfileContent view={view} />
            </Section>
            <Section show={view.employment.length > 0} className="north-section">
                <h2>Experience</h2>
                {view.employment.map((item, index) => (
                    <div className="north-entry" key={index}>
                        {HasText(GetDateRange(item)) && (
                            <div className="north-entry-date">
                                <DateRangeText item={item} />
                            </div>
                        )}
                        <div className="north-entry-details">
                            <ItemText item={item} field="role" as="h3" />
                            <ItemText item={item} field="company" />
                            <DescriptionList item={item} />
                        </div>
                    </div>
                ))}
            </Section>
            <Section show={view.projects.length > 0} className="north-section">
                <h2>{view.projectTitle}</h2>
                {view.projects.map((item, index) => (
                    <div className="north-entry" key={index}>
                        <div></div>
                        <div>
                            <ItemText item={item} field="name" as="h3" />
                            <ItemText item={item} field="subtitle" />
                            <DescriptionList item={item} />
                        </div>
                    </div>
                ))}
            </Section>
            <Section show={view.mainCustom.length > 0} className="north-section">
                <h2>{view.mainCustomTitle}</h2>
                <CustomItems items={view.mainCustom} itemClassName="north-small-entry" />
            </Section>
            {(view.education.length > 0 || view.skills.length > 0 || view.sideCustom.length > 0) && (
                <div className="north-bottom-grid">
                    <Section show={view.education.length > 0} className="north-section">
                        <h2>Education</h2>
                        {view.education.map((item, index) => (
                            <div className="north-small-entry" key={index}>
                                {HasText(GetDateRange(item)) && (
                                    <small>
                                        <DateRangeText item={item} />
                                    </small>
                                )}
                                <ItemText item={item} field="degree" as="strong" />
                                <ItemText item={item} field="school" />
                            </div>
                        ))}
                    </Section>
                    <Section show={view.skills.length > 0} className="north-section">
                        <h2>Skills</h2>
                        <div className="north-skills">
                            {view.skills.map((item, index) => (
                                <span key={index}>
                                    <SkillText item={item} />
                                </span>
                            ))}
                        </div>
                    </Section>
                    <Section show={view.sideCustom.length > 0} className="north-section">
                        <h2>{view.sideCustomTitle}</h2>
                        <CustomItems items={view.sideCustom} />
                    </Section>
                </div>
            )}
        </article>
    );
}

function DynamicCvTemplate({ cv, templateId }) {
    if (templateId !== "meadow" && templateId !== "atlas" && templateId !== "north") {
        return <UnavailableTemplate />;
    }

    const view = BuildView(cv, templateId);

    if (templateId === "atlas") {
        return <AtlasTemplate view={view} />;
    }

    if (templateId === "north") {
        return <NorthTemplate view={view} />;
    }

    return <MeadowTemplate view={view} />;
}

export default DynamicCvTemplate;
