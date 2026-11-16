import "./halo.css";
import {
    Entries,
    GetTemplateContent,
    HasText,
    Knowledge,
    Link,
    NextTemplateSampleData,
} from "../../../folder-create-cv/components/template-content";
function HaloTemplate({ data = NextTemplateSampleData }) {
    const view = GetTemplateContent(data);
    let projectsTitle = view.sectionTitles.projects.trim();
    if (projectsTitle === "") {
        projectsTitle = "Selected project";
    }
    const hasMain = view.employment.length > 0 || view.mainCustom.length > 0;
    const hasSide =
        view.education.length > 0 ||
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
    let columnsClassName;
    if (hasMain && hasSide) {
        columnsClassName = "halo-columns";
    } else {
        columnsClassName = "halo-columns halo-single-column";
    }
    let mainCustomSectionClass = "halo-main-section";
    if (view.employment.length > 0) {
        mainCustomSectionClass += " halo-main-section-spaced";
    }
    let skillsSectionClass = "halo-right-section";
    if (view.education.length > 0) {
        skillsSectionClass += " halo-right-section-spaced";
    }
    let languagesSectionClass = "halo-right-section";
    if (view.education.length > 0 || view.skills.length > 0) {
        languagesSectionClass += " halo-right-section-spaced";
    }
    let projectsSectionClass = "halo-right-section";
    if (view.education.length > 0 || view.skills.length > 0 || view.languages.length > 0) {
        projectsSectionClass += " halo-right-section-spaced";
    }
    let sideCustomSectionClass = "halo-right-section";
    if (
        view.education.length > 0 ||
        view.skills.length > 0 ||
        view.languages.length > 0 ||
        view.projects.length > 0
    ) {
        sideCustomSectionClass += " halo-right-section-spaced";
    }
    return (
        <article className="halo-template cv-next-template">
            {(view.name ||
                HasText(view.basics.professionalTitle) ||
                view.contact.length > 0 ||
                view.links.length > 0) && (
                <header className="halo-header">
                    {(view.name || HasText(view.basics.professionalTitle)) && (
                        <div className="halo-ring">
                            <div className="halo-ring-outline" aria-hidden="true"></div>
                            {HasText(view.basics.firstName) && <span>{view.basics.firstName.trim()}</span>}
                            {HasText(view.basics.lastName) && <strong>{view.basics.lastName.trim()}</strong>}
                            {HasText(view.basics.professionalTitle) && (
                                <small>{view.basics.professionalTitle}</small>
                            )}
                        </div>
                    )}
                    {(view.contact.length > 0 || view.links.length > 0) && (
                        <div className="halo-contact">
                            {contactItems}
                            {linksItems}
                        </div>
                    )}
                </header>
            )}
            {HasText(view.profile) && (
                <section className="halo-profile">
                    <h2>Profile</h2>
                    <p>{view.profile}</p>
                </section>
            )}
            {(hasMain || hasSide) && (
                <div className={columnsClassName}>
                    {hasMain && (
                        <main className="halo-left">
                            {view.employment.length > 0 && (
                                <section className="halo-main-section">
                                    <h2>Experience</h2>
                                    <Entries items={view.employment} className="halo-job" />
                                </section>
                            )}
                            {view.mainCustom.length > 0 && (
                                <section className={mainCustomSectionClass}>
                                    <h2>{view.sectionTitles.mainCustom}</h2>
                                    <Entries items={view.mainCustom} className="halo-job" />
                                </section>
                            )}
                        </main>
                    )}
                    {hasMain && hasSide && (
                        <div className="halo-center" aria-hidden="true">
                            <div className="halo-center-line"></div>
                        </div>
                    )}
                    {hasSide && (
                        <aside className="halo-right">
                            {view.education.length > 0 && (
                                <section className="halo-right-section">
                                    <h2>Education</h2>
                                    <Entries items={view.education} />
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
                            {view.projects.length > 0 && (
                                <section className={projectsSectionClass}>
                                    <h2>{projectsTitle}</h2>
                                    <Entries items={view.projects} />
                                </section>
                            )}
                            {view.sideCustom.length > 0 && (
                                <section className={sideCustomSectionClass}>
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
export default HaloTemplate;
