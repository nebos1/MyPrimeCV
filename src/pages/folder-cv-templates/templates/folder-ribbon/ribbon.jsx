import "../../../../components/folder-document-preview/document-fonts.css";
import "./ribbon.css";
import "../../../folder-create-cv/components/cv-content.css";
import { FormatCvDate, NormalizeCvData } from "../../../folder-create-cv/create-cv-data";

// The gallery and editor use the same markup. Only the data changes.
export const RibbonSampleData = {
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
    skills: ["Product strategy", "UX research", "UI design", "Design systems", "Prototyping", "Figma"],
    profile:
        "Product designer focused on clear, useful and human-centered digital experiences. I combine research, visual design and close collaboration with development teams.",
    employment: [
        {
            role: "Senior Product Designer",
            company: "Northline Studio",
            startDate: "2023",
            endDate: "Present",
            summary: "Led product discovery, interaction design and design-system work across multiple SaaS products.",
            description:
                "Improved onboarding completion by 28%.\nBuilt a shared component library for three products.\nWorked directly with product, development and QA.",
        },
        {
            role: "Product Designer",
            company: "Bright Labs",
            startDate: "2021",
            endDate: "2023",
            summary: "Designed responsive web and mobile products from early research to final implementation.",
        },
    ],
    links: [
        {
            label: "maya-petrova.design",
            url: "maya-petrova.design",
        },
    ],
    projects: [
        {
            name: "Civic Path",
            description: "A service-design concept that simplifies municipal processes.",
            descriptionListStyle: "none",
        },
    ],
};
function RibbonTemplate({ data = RibbonSampleData }) {
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
        if (data === RibbonSampleData) return <span>{item.label || item.url}</span>;
        if (!item.url.trim()) return item.label;
        const url = /^https?:\/\//i.test(item.url) ? item.url : "https://" + item.url;
        return (
            <a href={url} target="_blank" rel="noreferrer">
                {item.label || item.url}
            </a>
        );
    }
    return (
        <article className="ribbon-template">
            <header className="ribbon-header">
                <div>
                    {name && <h1>{name}</h1>}
                    {basics.professionalTitle && (
                        <div className="ribbon-band">
                            <span>{basics.professionalTitle}</span>
                        </div>
                    )}
                </div>
                {(contact.length > 0 || links.length > 0) && (
                    <div className="ribbon-contact">
                        {contact.map((line, index) => (
                            <span key={index}>{line}</span>
                        ))}
                        {links.map((item, index) => (
                            <span key={index}>{Link(item)}</span>
                        ))}
                    </div>
                )}
            </header>
            {cv.profile.trim() && (
                <section className="ribbon-profile">
                    <p>{cv.profile}</p>
                </section>
            )}
            {employment.length > 0 && (
                <section className="ribbon-experience">
                    <div className="ribbon-side-title">
                        <span>01</span>
                        <h2>Experience</h2>
                    </div>
                    <div className="ribbon-experience-content">
                        {employment.map((item, index) => (
                            <article className={index > 0 ? "ribbon-job ribbon-job-spaced" : "ribbon-job"} key={index}>
                                <div className="ribbon-job-heading">
                                    <div>
                                        {item.role && <h3>{item.role}</h3>}
                                        {item.company && <strong>{item.company}</strong>}
                                        {item.location && <strong>{item.location}</strong>}
                                        {item.additions && <strong>{item.additions}</strong>}
                                    </div>
                                    {Dates(item) && <small>{Dates(item)}</small>}
                                </div>
                                {item.summary && <p>{item.summary}</p>}
                                {Description(item)}
                            </article>
                        ))}
                    </div>
                </section>
            )}
            {(education.length > 0 || skills.length > 0 || languages.length > 0 || projects.length > 0) && (
                <section className="ribbon-bottom">
                    {education.length > 0 && (
                        <div className="ribbon-bottom-block">
                            <span>02</span>
                            <h2>Education</h2>
                            {education.map((item, index) => (
                                <div key={index}>
                                    {item.degree && <h3>{item.degree}</h3>}
                                    {item.school && <p>{item.school}</p>}
                                    {Dates(item) && <small>{Dates(item)}</small>}
                                    {item.location && <p>{item.location}</p>}
                                    {item.additions && <p>{item.additions}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                    {skills.length > 0 && (
                        <div className="ribbon-bottom-block ribbon-dark-block">
                            <span>03</span>
                            <h2>Skills</h2>
                            {skills.map((item, index) => (
                                <p key={index}>
                                    {item.label}
                                    {Rating(item)}
                                </p>
                            ))}
                        </div>
                    )}
                    {(languages.length > 0 || projects.length > 0) && (
                        <div className="ribbon-bottom-block ribbon-bottom-block-last">
                            {languages.length > 0 && (
                                <>
                                    <span>04</span>
                                    <h2>Languages</h2>
                                    {languages.map((item, index) => (
                                        <p key={index}>
                                            {[item.name, item.level].filter(Boolean).join(" ")}
                                            {Rating(item)}
                                        </p>
                                    ))}
                                </>
                            )}
                            {projects.length > 0 && (
                                <>
                                    <h2 className="ribbon-project-title">
                                        {cv.sectionTitles.projects || "Selected project"}
                                    </h2>
                                    {projects.map((item, index) => (
                                        <div key={index}>
                                            {item.name && <h3>{item.name}</h3>}
                                            {item.subtitle && <p>{item.subtitle}</p>}
                                            {Description(item)}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </section>
            )}
            {mainCustom.length > 0 && (
                <section className="ribbon-experience">
                    <div className="ribbon-side-title">
                        <h2>{cv.sectionTitles.mainCustom}</h2>
                    </div>
                    <div className="ribbon-experience-content">
                        {mainCustom.map((item, index) => (
                            <article className={index > 0 ? "ribbon-job ribbon-job-spaced" : "ribbon-job"} key={index}>
                                <div className="ribbon-job-heading">
                                    <div>
                                        {item.name && <h3>{item.name}</h3>}
                                        {item.subtitle && <strong>{item.subtitle}</strong>}
                                    </div>
                                </div>
                                {Description(item)}
                            </article>
                        ))}
                    </div>
                </section>
            )}
            {sideCustom.length > 0 && (
                <section className="ribbon-experience">
                    <div className="ribbon-side-title">
                        <h2>{cv.sectionTitles.sideCustom}</h2>
                    </div>
                    <div className="ribbon-experience-content">
                        {sideCustom.map((item, index) => (
                            <article className={index > 0 ? "ribbon-job ribbon-job-spaced" : "ribbon-job"} key={index}>
                                <div className="ribbon-job-heading">
                                    <div>
                                        {item.name && <h3>{item.name}</h3>}
                                        {item.subtitle && <strong>{item.subtitle}</strong>}
                                    </div>
                                </div>
                                {Description(item)}
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
}
export default RibbonTemplate;
