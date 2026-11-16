import "./orbit.css";
import {
    Dates,
    Entries,
    EntryCopy,
    EntryHeading,
    GetTemplateContent,
    HasText,
    Knowledge,
    Link,
    NextTemplateSampleData,
    Photo,
} from "../../../folder-create-cv/components/template-content";
function OrbitTemplate({ data = NextTemplateSampleData }) {
    const view = GetTemplateContent(data);
    let educationNumber = "01";
    if (view.employment.length > 0) {
        educationNumber = "02";
    }
    let projectsTitle = view.sectionTitles.projects.trim();
    if (projectsTitle === "") {
        projectsTitle = "Selected project";
    }
    const hasMain = view.employment.length > 0 || view.education.length > 0 || view.mainCustom.length > 0;
    const hasSide =
        view.skills.length > 0 ||
        view.languages.length > 0 ||
        view.projects.length > 0 ||
        view.sideCustom.length > 0;
    const contactItems = [];
    for (let index = 0; index < view.contact.length; index++) {
        const line = view.contact[index];
        contactItems.push(<span key={index}>{line}</span>);
    }
    const linksItems = [];
    for (let index = 0; index < view.links.length; index++) {
        const item = view.links[index];
        linksItems.push(
            <span key={index}>
                <Link item={item} sample={data === NextTemplateSampleData} />
            </span>,
        );
    }
    const employmentItems = [];
    for (let index = 0; index < view.employment.length; index++) {
        const item = view.employment[index];
        employmentItems.push(
            <article className="orbit-job" key={index}>
                <div className="orbit-job-date">
                    <Dates item={item} />
                </div>
                <div>
                    <EntryHeading item={item} />
                    <EntryCopy item={item} />
                </div>
            </article>,
        );
    }
    const skillsItems = [];
    for (let index = 0; index < view.skills.length; index++) {
        const item = view.skills[index];
        skillsItems.push(<Knowledge item={item} key={index} />);
    }
    const languagesItems = [];
    for (let index = 0; index < view.languages.length; index++) {
        const item = view.languages[index];
        languagesItems.push(<Knowledge item={item} key={index} />);
    }
    let headerClassName;
    if (view.initials || view.basics.photo) {
        headerClassName = "orbit-header";
    } else {
        headerClassName = "orbit-header orbit-no-mark";
    }
    let layoutClassName;
    if (hasMain && hasSide) {
        layoutClassName = "orbit-layout";
    } else {
        layoutClassName = "orbit-layout orbit-single-column";
    }
    let languagesSectionClass = "orbit-sidebar-section";
    if (view.skills.length > 0) {
        languagesSectionClass += " orbit-sidebar-section-spaced";
    }
    let projectsSectionClass = "orbit-sidebar-section";
    if (view.skills.length > 0 || view.languages.length > 0) {
        projectsSectionClass += " orbit-sidebar-section-spaced";
    }
    let customSectionClass = "orbit-sidebar-section";
    if (view.skills.length > 0 || view.languages.length > 0 || view.projects.length > 0) {
        customSectionClass += " orbit-sidebar-section-spaced";
    }
    return (
        <article className="orbit-template cv-next-template">
            {(view.name ||
                HasText(view.basics.photo) ||
                HasText(view.basics.professionalTitle) ||
                view.contact.length > 0 ||
                view.links.length > 0) && (
                <header className={headerClassName}>
                    {(view.initials || HasText(view.basics.photo)) && (
                        <div className="orbit-mark">
                            <span className="orbit-ring-outer" aria-hidden="true"></span>
                            <Photo view={view} />
                            {!view.hasPhoto && <span className="orbit-ring-inner" aria-hidden="true"></span>}
                        </div>
                    )}
                    <div className="orbit-heading">
                        {view.name && <h1>{view.name}</h1>}
                        {HasText(view.basics.professionalTitle) && <p>{view.basics.professionalTitle}</p>}
                    </div>
                    {(view.contact.length > 0 || view.links.length > 0) && (
                        <div className="orbit-contact">
                            {contactItems}
                            {linksItems}
                        </div>
                    )}
                </header>
            )}
            {HasText(view.profile) && (
                <section className="orbit-profile">
                    <span>Profile</span>
                    <p>{view.profile}</p>
                </section>
            )}
            {(hasMain || hasSide) && (
                <div className={layoutClassName}>
                    {hasMain && (
                        <main className="orbit-main">
                            {view.employment.length > 0 && (
                                <section className="orbit-section">
                                    <div className="orbit-section-title">
                                        <span>01</span>
                                        <h2>Employment history</h2>
                                    </div>
                                    {employmentItems}
                                </section>
                            )}
                            {view.education.length > 0 && (
                                <section className="orbit-section orbit-section-spaced">
                                    <div className="orbit-section-title">
                                        <span>{educationNumber}</span>
                                        <h2>Education</h2>
                                    </div>
                                    <Entries items={view.education} className="orbit-education" />
                                </section>
                            )}
                            {view.mainCustom.length > 0 && (
                                <section className="orbit-section orbit-section-spaced">
                                    <div className="orbit-section-title">
                                        <h2>{view.sectionTitles.mainCustom}</h2>
                                    </div>
                                    <Entries items={view.mainCustom} className="orbit-education" />
                                </section>
                            )}
                        </main>
                    )}
                    {hasSide && (
                        <aside className="orbit-sidebar">
                            {view.skills.length > 0 && (
                                <section className="orbit-sidebar-section">
                                    <h2>Skills</h2>
                                    <div className="orbit-pills">{skillsItems}</div>
                                </section>
                            )}
                            {view.languages.length > 0 && (
                                <section className={languagesSectionClass}>
                                    <h2>Languages</h2>
                                    {languagesItems}
                                </section>
                            )}
                            {view.projects.length > 0 && (
                                <section className={projectsSectionClass}>
                                    <h2>{projectsTitle}</h2>
                                    <Entries items={view.projects} />
                                </section>
                            )}
                            {view.sideCustom.length > 0 && (
                                <section className={customSectionClass}>
                                    <h2>{view.sectionTitles.sideCustom}</h2>
                                    <Entries items={view.sideCustom} />
                                </section>
                            )}
                        </aside>
                    )}
                </div>
            )}
        </article>
    );
}
export default OrbitTemplate;
