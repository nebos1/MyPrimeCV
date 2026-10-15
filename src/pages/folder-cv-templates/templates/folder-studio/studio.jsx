import "../../../../components/folder-document-preview/document-fonts.css";
import "./studio.css";
import "../../../folder-create-cv/components/cv-content.css";
import { FormatCvDate, NormalizeCvData } from "../../../folder-create-cv/create-cv-data";

// The gallery and editor use the same markup. Only the data changes.
export const StudioSampleData = {
    basics: {
        firstName: "Maya",
        lastName: "Petrova",
        professionalTitle: "Product Designer",
        city: "Sofia",
        country: "Bulgaria",
        email: "maya.petrova@email.com",
        phone: "+359 88 123 4567",
    },
    education: [
        {
            degree: "BA, Visual Communication",
            school: "National Academy of Art",
            startDate: "2017",
            endDate: "2021",
        },
    ],
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
    tools: "Figma\nFigJam\nMaze\nNotion",
    profile:
        "I shape digital products through research, visual systems and close collaboration with engineering teams.",
    studioImpact: {
        label: "Selected impact",
        value: "28%",
        description: "increase in onboarding completion after a full UX redesign.",
    },
    employment: [
        {
            role: "Senior Product Designer",
            company: "Northline Studio",
            startDate: "2023",
            endDate: "Present",
            summary: "Product discovery, prototyping, interface design and design-system leadership for SaaS products.",
        },
        {
            role: "Product Designer",
            company: "Bright Labs",
            startDate: "2021",
            endDate: "2023",
            summary: "Responsive web and mobile design, usability testing and developer handoff.",
        },
    ],
    projects: [
        {
            name: "Civic Path",
            description:
                "A service-design concept that simplifies municipal processes through clearer language and fewer steps.",
            subtitle: "Research / UX / Prototype",
            descriptionListStyle: "none",
        },
    ],
};
function StudioTemplate({ data = StudioSampleData }) {
    const cv = NormalizeCvData(data);
    const basics = cv.basics;
    const name = [basics.firstName, basics.lastName].filter(Boolean).join(" ");
    const contact = [
        [basics.city, basics.country].filter(Boolean).join(", "),
        basics.email,
        basics.phone,
        FormatCvDate(basics.birthDate, basics.birthDateFormat),
        basics.gender,
    ].filter(Boolean);
    const employment = cv.employment.filter((item) =>
        [
            item.role,
            item.company,
            item.location,
            item.additions,
            item.startDate,
            item.endDate,
            item.summary,
            item.description,
        ].some((value) => value.trim()),
    );
    const education = cv.education.filter((item) =>
        [item.degree, item.school, item.location, item.additions, item.startDate, item.endDate].some((value) =>
            value.trim(),
        ),
    );
    const skills = cv.skills.filter((item) => item.label.trim());
    const languages = cv.languages.filter((item) => item.name.trim() || item.level.trim());
    const links = cv.links.filter((item) => item.label.trim() || item.url.trim());
    const projects = cv.projects.filter((item) => item.name.trim() || item.subtitle.trim() || item.description.trim());
    const mainCustom = cv.mainCustom.filter(
        (item) => item.name.trim() || item.subtitle.trim() || item.description.trim(),
    );
    const sideCustom = cv.sideCustom.filter(
        (item) => item.name.trim() || item.subtitle.trim() || item.description.trim(),
    );
    const tools = cv.tools
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    function Dates(item) {
        return [FormatCvDate(item.startDate, item.startDateFormat), FormatCvDate(item.endDate, item.endDateFormat)]
            .filter(Boolean)
            .join(" — ");
    }
    function Description(item) {
        const lines = item.description.split("\n").filter((line) => line.trim());
        if (!lines.length) return null;
        if (item.descriptionListStyle === "none") return lines.map((line, index) => <p key={index}>{line}</p>);
        if (item.descriptionListStyle === "decimal")
            return (
                <ol>
                    {lines.map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ol>
            );
        return (
            <ul>
                {lines.map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
            </ul>
        );
    }
    function Rating(item) {
        if (item.ratingStyle === "none" || !item.rating) return null;
        return (
            <span className={"cv-rating cv-rating-" + item.ratingStyle} aria-label={item.rating + " out of 5"}>
                {[1, 2, 3, 4, 5].map((level) => (
                    <i key={level} className={level <= item.rating ? "cv-rating-filled" : ""}></i>
                ))}
            </span>
        );
    }
    function Link(item) {
        if (data === StudioSampleData) return <span>{item.label || item.url}</span>;
        if (!item.url.trim()) return item.label;
        const url = /^https?:\/\//i.test(item.url) ? item.url : "https://" + item.url;
        return (
            <a href={url} target="_blank" rel="noreferrer">
                {item.label || item.url}
            </a>
        );
    }
    const sectionNumber = (() => {
        let nextNumber = 0;
        return () => String(++nextNumber).padStart(2, "0");
    })();
    return (
        <article className="studio-template">
            <aside className="studio-sidebar">
                {(name || basics.photo) && (
                    <div className="studio-monogram">
                        {basics.photo ? (
                            <img src={basics.photo} alt="Portrait" />
                        ) : (
                            [basics.firstName, basics.lastName]
                                .filter(Boolean)
                                .map((part) => part.trim()[0])
                                .join("")
                        )}
                    </div>
                )}
                {name && (
                    <div className="studio-name-frame">
                        <div className="studio-vertical-name">
                            {basics.firstName && <span>{basics.firstName}</span>}
                            {basics.lastName && <strong>{basics.lastName}</strong>}
                        </div>
                    </div>
                )}
                <div className="studio-sidebar-content">
                    {contact.length > 0 && (
                        <section>
                            <h2>Contact</h2>
                            {contact.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </section>
                    )}
                    {tools.length > 0 && (
                        <section className={contact.length > 0 ? "studio-sidebar-content-section-spaced" : ""}>
                            <h2>Tools</h2>
                            {tools.map((tool, index) => (
                                <p key={index}>{tool}</p>
                            ))}
                        </section>
                    )}
                    {skills.length > 0 && (
                        <section
                            className={
                                tools.length > 0 || contact.length > 0 ? "studio-sidebar-content-section-spaced" : ""
                            }
                        >
                            <h2>Skills</h2>
                            {skills.map((item, index) => (
                                <p key={index}>
                                    {item.label}
                                    {Rating(item)}
                                </p>
                            ))}
                        </section>
                    )}
                    {languages.length > 0 && (
                        <section
                            className={
                                skills.length > 0 || tools.length > 0 || contact.length > 0
                                    ? "studio-sidebar-content-section-spaced"
                                    : ""
                            }
                        >
                            <h2>Languages</h2>
                            {languages.map((item, index) => (
                                <p key={index}>
                                    {[item.name, item.level].filter(Boolean).join(" ")}
                                    {Rating(item)}
                                </p>
                            ))}
                        </section>
                    )}
                    {links.length > 0 && (
                        <section
                            className={
                                languages.length > 0 || skills.length > 0 || tools.length > 0 || contact.length > 0
                                    ? "studio-sidebar-content-section-spaced"
                                    : ""
                            }
                        >
                            <h2>Links</h2>
                            {links.map((item, index) => (
                                <p key={index}>{Link(item)}</p>
                            ))}
                        </section>
                    )}
                    {sideCustom.length > 0 && (
                        <section
                            className={
                                links.length > 0 ||
                                languages.length > 0 ||
                                skills.length > 0 ||
                                tools.length > 0 ||
                                contact.length > 0
                                    ? "studio-sidebar-content-section-spaced"
                                    : ""
                            }
                        >
                            <h2>{cv.sectionTitles.sideCustom}</h2>
                            {sideCustom.map((item, index) => (
                                <div
                                    className={
                                        index > 0
                                            ? "studio-custom-item studio-custom-item-spaced"
                                            : "studio-custom-item"
                                    }
                                    key={index}
                                >
                                    {item.name && <h3>{item.name}</h3>}
                                    {item.subtitle && <p>{item.subtitle}</p>}
                                    {Description(item)}
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </aside>
            <main className="studio-main">
                {(basics.professionalTitle || cv.profile) && (
                    <header className="studio-header">
                        {basics.professionalTitle && <h1>{basics.professionalTitle}</h1>}
                        {cv.profile && <p>{cv.profile}</p>}
                    </header>
                )}
                {(cv.studioImpact.label || cv.studioImpact.value || cv.studioImpact.description) && (
                    <section className="studio-feature">
                        {cv.studioImpact.label && <span>{cv.studioImpact.label}</span>}
                        {cv.studioImpact.value && <strong>{cv.studioImpact.value}</strong>}
                        {cv.studioImpact.description && <p>{cv.studioImpact.description}</p>}
                    </section>
                )}
                {employment.length > 0 && (
                    <section className="studio-section">
                        <div className="studio-section-number">{sectionNumber()}</div>
                        <div>
                            <h2>Experience</h2>
                            {employment.map((item, index) => (
                                <article className="studio-job" key={index}>
                                    <div>
                                        {item.role && <h3>{item.role}</h3>}
                                        {item.company && <span>{item.company}</span>}
                                        {item.location && <span>{item.location}</span>}
                                        {item.additions && <span>{item.additions}</span>}
                                    </div>
                                    {Dates(item) && <small>{Dates(item)}</small>}
                                    {item.summary && <p>{item.summary}</p>}
                                    {Description(item)}
                                </article>
                            ))}
                        </div>
                    </section>
                )}
                {projects.length > 0 && (
                    <section className="studio-section">
                        <div className="studio-section-number">{sectionNumber()}</div>
                        <div>
                            <h2>{cv.sectionTitles.projects || "Selected work"}</h2>
                            {projects.map((item, index) => (
                                <article className="studio-project" key={index}>
                                    {item.name && <h3>{item.name}</h3>}
                                    {Description(item)}
                                    {item.subtitle && <span>{item.subtitle}</span>}
                                </article>
                            ))}
                        </div>
                    </section>
                )}
                {education.length > 0 && (
                    <section className="studio-section studio-section-last">
                        <div className="studio-section-number">{sectionNumber()}</div>
                        <div>
                            <h2>Education</h2>
                            {education.map((item, index) => (
                                <div
                                    className={
                                        index > 0 ? "studio-education studio-education-spaced" : "studio-education"
                                    }
                                    key={index}
                                >
                                    {item.degree && <h3>{item.degree}</h3>}
                                    {(item.school || Dates(item)) && (
                                        <p>{[item.school, Dates(item)].filter(Boolean).join(", ")}</p>
                                    )}
                                    {item.location && <p>{item.location}</p>}
                                    {item.additions && <p>{item.additions}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {mainCustom.length > 0 && (
                    <section className="studio-section">
                        <div></div>
                        <div>
                            <h2>{cv.sectionTitles.mainCustom}</h2>
                            {mainCustom.map((item, index) => (
                                <article className="studio-project" key={index}>
                                    {item.name && <h3>{item.name}</h3>}
                                    {Description(item)}
                                    {item.subtitle && <span>{item.subtitle}</span>}
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </article>
    );
}
export default StudioTemplate;
