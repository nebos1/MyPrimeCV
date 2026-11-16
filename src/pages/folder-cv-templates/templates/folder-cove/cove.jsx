import "./cove.css";
import {
    Entries,
    GetTemplateContent,
    HasText,
    Knowledge,
    Link,
    NextTemplateSampleData,
    Photo,
} from "../../../folder-create-cv/components/template-content";
function CoveTemplate({ data = NextTemplateSampleData }) {
    const view = GetTemplateContent(data);
    let projectsTitle = view.sectionTitles.projects.trim();
    if (projectsTitle === "") {
        projectsTitle = "Selected project";
    }
    const hasSide =
        HasText(view.basics.photo) ||
        view.initials ||
        view.contact.length > 0 ||
        view.skills.length > 0 ||
        view.languages.length > 0 ||
        view.links.length > 0 ||
        view.sideCustom.length > 0;
    const contactItems = [];
    for (let index = 0; index < view.contact.length; index++) {
        const line = view.contact[index];
        contactItems.push(<p key={index}>{line}</p>);
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
    const linksItems = [];
    for (let index = 0; index < view.links.length; index++) {
        const item = view.links[index];
        linksItems.push(
            <p key={index}>
                <Link item={item} sample={data === NextTemplateSampleData} />
            </p>,
        );
    }
    let templateClassName;
    if (hasSide) {
        templateClassName = "cove-template cv-next-template";
    } else {
        templateClassName = "cove-template cv-next-template cove-single-column";
    }
    let skillsSectionClass = "cove-sidebar-section";
    if (view.contact.length > 0) {
        skillsSectionClass += " cove-sidebar-section-spaced";
    }
    let languagesSectionClass = "cove-sidebar-section";
    if (view.contact.length > 0 || view.skills.length > 0) {
        languagesSectionClass += " cove-sidebar-section-spaced";
    }
    let linksSectionClass = "cove-sidebar-section";
    if (view.contact.length > 0 || view.skills.length > 0 || view.languages.length > 0) {
        linksSectionClass += " cove-sidebar-section-spaced";
    }
    let customSectionClass = "cove-sidebar-section";
    if (
        view.contact.length > 0 ||
        view.skills.length > 0 ||
        view.languages.length > 0 ||
        view.links.length > 0
    ) {
        customSectionClass += " cove-sidebar-section-spaced";
    }
    return (
        <article className={templateClassName}>
            {hasSide && (
                <aside className="cove-sidebar">
                    {(view.initials || HasText(view.basics.photo)) && (
                        <div className="cove-avatar">
                            <Photo view={view} />
                        </div>
                    )}
                    {view.contact.length > 0 && (
                        <section className="cove-sidebar-section">
                            <h2>Personal details</h2>
                            {contactItems}
                        </section>
                    )}
                    {view.skills.length > 0 && (
                        <section className={skillsSectionClass}>
                            <h2>Skills</h2>
                            {skillsItems}
                        </section>
                    )}
                    {view.languages.length > 0 && (
                        <section className={languagesSectionClass}>
                            <h2>Languages</h2>
                            {languagesItems}
                        </section>
                    )}
                    {view.links.length > 0 && (
                        <section className={linksSectionClass}>
                            <h2>Links</h2>
                            {linksItems}
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
            <main className="cove-main">
                {(view.name || HasText(view.basics.professionalTitle)) && (
                    <header className="cove-header">
                        {view.name && <h1>{view.name}</h1>}
                        {HasText(view.basics.professionalTitle) && <p>{view.basics.professionalTitle}</p>}
                    </header>
                )}
                {HasText(view.profile) && (
                    <section className="cove-section">
                        <h2>
                            Professional summary<span className="cove-section-line" aria-hidden="true"></span>
                        </h2>
                        <p className="cove-profile-text">{view.profile}</p>
                    </section>
                )}
                {view.employment.length > 0 && (
                    <section className="cove-section">
                        <h2>
                            Employment history<span className="cove-section-line" aria-hidden="true"></span>
                        </h2>
                        <Entries
                            items={view.employment}
                            className="cove-job"
                            headingClassName="cove-job-heading"
                        />
                    </section>
                )}
                {view.education.length > 0 && (
                    <section className="cove-section">
                        <h2>
                            Education<span className="cove-section-line" aria-hidden="true"></span>
                        </h2>
                        <Entries items={view.education} className="cove-job" />
                    </section>
                )}
                {view.projects.length > 0 && (
                    <section className="cove-section">
                        <h2>
                            {projectsTitle}
                            <span className="cove-section-line" aria-hidden="true"></span>
                        </h2>
                        <Entries items={view.projects} className="cove-job" />
                    </section>
                )}
                {view.mainCustom.length > 0 && (
                    <section className="cove-section">
                        <h2>
                            {view.sectionTitles.mainCustom}
                            <span className="cove-section-line" aria-hidden="true"></span>
                        </h2>
                        <Entries items={view.mainCustom} className="cove-job" />
                    </section>
                )}
            </main>
        </article>
    );
}
export default CoveTemplate;
