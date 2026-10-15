import "../../../../components/folder-document-preview/document-fonts.css";
import "./linen.css";
import "../../../folder-create-cv/components/cv-content.css";
import { FormatCvDate, NormalizeCvData } from "../../../folder-create-cv/create-cv-data";

// The gallery and editor use the same markup. Only the data changes.
export const LinenSampleData = {
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
    skills: ["Product strategy", "UX research", "UI design", "Design systems"],
    tools: "Figma\nFigJam\nMaze\nNotion",
    profile:
        "I design calm, useful digital products with attention to language, visual rhythm and the people using them.",
    employment: [
        {
            role: "Senior Product Designer",
            company: "Northline Studio",
            startDate: "2023",
            endDate: "Present",
            summary: "Leading research, product design and visual-system work for a family of SaaS products.",
            description:
                "Redesigned onboarding and increased activation.\nCreated a shared component and pattern library.",
        },
        {
            role: "Product Designer",
            company: "Bright Labs",
            startDate: "2021",
            endDate: "2023",
            summary: "Designed responsive interfaces and translated research into clear product decisions.",
        },
    ],
    links: [
        {
            label: "maya-petrova.design",
            url: "maya-petrova.design",
        },
    ],
    footerNote: "Portfolio available on request",
};
function LinenTemplate({ data = LinenSampleData }) {
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
        if (data === LinenSampleData) return <span>{item.label || item.url}</span>;
        if (!item.url.trim()) return item.label;
        const url = /^https?:\/\//i.test(item.url) ? item.url : "https://" + item.url;
        return (
            <a href={url} target="_blank" rel="noreferrer">
                {item.label || item.url}
            </a>
        );
    }
    return (
        <article className="linen-template">
            {(name || basics.professionalTitle || contact.length > 0) && (
                <header className="linen-header">
                    {name && <h1>{name}</h1>}
                    {basics.professionalTitle && <p>{basics.professionalTitle}</p>}
                    {contact.length > 0 && (
                        <div className="linen-contact">
                            {contact.map((line, index) => (
                                <span key={index} className={index > 0 ? "linen-contact-span-spaced" : ""}>
                                    {line}
                                </span>
                            ))}
                        </div>
                    )}
                </header>
            )}
            {cv.profile.trim() && (
                <section className="linen-intro">
                    <p>{cv.profile}</p>
                </section>
            )}
            {employment.length > 0 && (
                <section className="linen-section">
                    <div className="linen-section-title">
                        <span>01</span>
                        <h2>Experience</h2>
                    </div>
                    {employment.map((item, index) => (
                        <article className="linen-job" key={index}>
                            <div className="linen-job-heading">
                                {item.role && <h3>{item.role}</h3>}
                                {item.company && <p>{item.company}</p>}
                                {item.location && <p>{item.location}</p>}
                                {item.additions && <p>{item.additions}</p>}
                            </div>
                            {Dates(item) && <small>{Dates(item)}</small>}
                            {(item.summary || item.description) && (
                                <div className="linen-job-copy">
                                    {item.summary && <p>{item.summary}</p>}
                                    {Description(item)}
                                </div>
                            )}
                        </article>
                    ))}
                </section>
            )}
            {education.length > 0 && (
                <section className={employment.length > 0 ? "linen-section linen-section-spaced" : "linen-section"}>
                    <div className="linen-section-title">
                        <span>02</span>
                        <h2>Education</h2>
                    </div>
                    {education.map((item, index) => (
                        <article className="linen-simple-row" key={index}>
                            <div>
                                {item.degree && <h3>{item.degree}</h3>}
                                {item.school && <p>{item.school}</p>}
                                {item.location && <p>{item.location}</p>}
                                {item.additions && <p>{item.additions}</p>}
                            </div>
                            {Dates(item) && <small>{Dates(item)}</small>}
                        </article>
                    ))}
                </section>
            )}
            {(skills.length > 0 || tools.length > 0 || languages.length > 0) && (
                <section
                    className={
                        education.length > 0 || employment.length > 0
                            ? "linen-section linen-section-spaced"
                            : "linen-section"
                    }
                >
                    <div className="linen-section-title">
                        <span>03</span>
                        <h2>Skills &amp; Languages</h2>
                    </div>
                    <div className="linen-columns">
                        {skills.length > 0 && (
                            <div>
                                <h3>{cv.sectionTitles.linenExpertise.trim() || "Expertise"}</h3>
                                {skills.map((item, index) => (
                                    <p key={index}>
                                        {item.label}
                                        {Rating(item)}
                                    </p>
                                ))}
                            </div>
                        )}
                        {tools.length > 0 && (
                            <div>
                                <h3>{cv.sectionTitles.linenTools.trim() || "Tools"}</h3>
                                {tools.map((tool, index) => (
                                    <p key={index}>{tool}</p>
                                ))}
                            </div>
                        )}
                        {languages.length > 0 && (
                            <div>
                                <h3>Languages</h3>
                                {languages.map((item, index) => (
                                    <p key={index}>
                                        {[item.name, item.level].filter(Boolean).join(" ")}
                                        {Rating(item)}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
            {projects.length > 0 && (
                <section
                    className={
                        skills.length > 0 ||
                        tools.length > 0 ||
                        languages.length > 0 ||
                        education.length > 0 ||
                        employment.length > 0
                            ? "linen-section linen-section-spaced"
                            : "linen-section"
                    }
                >
                    <div className="linen-section-title">
                        <h2>{cv.sectionTitles.projects || "Selected project"}</h2>
                    </div>
                    {projects.map((item, index) => (
                        <article className="linen-job" key={index}>
                            <div className="linen-job-heading">
                                {item.name && <h3>{item.name}</h3>}
                                {item.subtitle && <p>{item.subtitle}</p>}
                            </div>
                            <div className="linen-job-copy">{Description(item)}</div>
                        </article>
                    ))}
                </section>
            )}
            {mainCustom.length > 0 && (
                <section
                    className={
                        projects.length > 0 ||
                        skills.length > 0 ||
                        tools.length > 0 ||
                        languages.length > 0 ||
                        education.length > 0 ||
                        employment.length > 0
                            ? "linen-section linen-section-spaced"
                            : "linen-section"
                    }
                >
                    <div className="linen-section-title">
                        <h2>{cv.sectionTitles.mainCustom}</h2>
                    </div>
                    {mainCustom.map((item, index) => (
                        <article className="linen-job" key={index}>
                            <div className="linen-job-heading">
                                {item.name && <h3>{item.name}</h3>}
                                {item.subtitle && <p>{item.subtitle}</p>}
                            </div>
                            <div className="linen-job-copy">{Description(item)}</div>
                        </article>
                    ))}
                </section>
            )}
            {sideCustom.length > 0 && (
                <section
                    className={
                        mainCustom.length > 0 ||
                        projects.length > 0 ||
                        skills.length > 0 ||
                        tools.length > 0 ||
                        languages.length > 0 ||
                        education.length > 0 ||
                        employment.length > 0
                            ? "linen-section linen-section-spaced"
                            : "linen-section"
                    }
                >
                    <div className="linen-section-title">
                        <h2>{cv.sectionTitles.sideCustom}</h2>
                    </div>
                    {sideCustom.map((item, index) => (
                        <article className="linen-job" key={index}>
                            <div className="linen-job-heading">
                                {item.name && <h3>{item.name}</h3>}
                                {item.subtitle && <p>{item.subtitle}</p>}
                            </div>
                            <div className="linen-job-copy">{Description(item)}</div>
                        </article>
                    ))}
                </section>
            )}
            {(links.length > 0 || cv.footerNote.trim()) && (
                <footer className="linen-footer">
                    {links.map((item, index) => (
                        <span key={index}>{Link(item)}</span>
                    ))}
                    {cv.footerNote && <span>{cv.footerNote}</span>}
                </footer>
            )}
        </article>
    );
}
export default LinenTemplate;
