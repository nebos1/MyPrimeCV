import "./mosaic.css";
import {
    Entries,
    GetTemplateContent,
    HasText,
    Knowledge,
    Link,
    NextTemplateSampleData,
} from "../../../folder-create-cv/components/template-content";
function MosaicTemplate({ data = NextTemplateSampleData }) {
    const view = GetTemplateContent(data);
    let projectsTitle = view.sectionTitles.projects.trim();
    if (projectsTitle === "") {
        projectsTitle = "Selected project";
    }
    const hasImpact =
        HasText(view.studioImpact.label) ||
        HasText(view.studioImpact.value) ||
        HasText(view.studioImpact.description);
    const contactItems = [];
    for (let index = 0; index < view.contact.length; index++) {
        const line = view.contact[index];
        contactItems.push(<p key={index}>{line}</p>);
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
    let visibleCards = 0;
    if (view.name || HasText(view.basics.professionalTitle)) {
        visibleCards++;
    }
    if (view.contact.length > 0 || view.links.length > 0) {
        visibleCards++;
    }
    if (HasText(view.profile)) {
        visibleCards++;
    }
    if (hasImpact) {
        visibleCards++;
    }
    if (view.employment.length > 0) {
        visibleCards++;
    }
    if (view.skills.length > 0) {
        visibleCards++;
    }
    if (view.education.length > 0) {
        visibleCards++;
    }
    if (view.projects.length > 0) {
        visibleCards++;
    }
    if (view.languages.length > 0) {
        visibleCards++;
    }
    if (view.mainCustom.length > 0) {
        visibleCards++;
    }
    if (view.sideCustom.length > 0) {
        visibleCards++;
    }
    let templateClassName = "mosaic-template cv-next-template";
    if (visibleCards === 1) {
        templateClassName += " mosaic-single-card";
    }
    return (
        <article className={templateClassName}>
            {(view.name || HasText(view.basics.professionalTitle)) && (
                <section className="mosaic-name-card mosaic-card">
                    {view.name && <h1>{view.name}</h1>}
                    {HasText(view.basics.professionalTitle) && <p>{view.basics.professionalTitle}</p>}
                </section>
            )}
            {(view.contact.length > 0 || view.links.length > 0) && (
                <section className="mosaic-contact-card mosaic-card">
                    <h2>Contact</h2>
                    {contactItems}
                    {linksItems}
                </section>
            )}
            {HasText(view.profile) && (
                <section className="mosaic-profile-card mosaic-card">
                    <h2>Profile</h2>
                    <p>{view.profile}</p>
                </section>
            )}
            {hasImpact && (
                <section className="mosaic-highlight-card mosaic-card">
                    {HasText(view.studioImpact.label) && <span>{view.studioImpact.label}</span>}
                    {HasText(view.studioImpact.value) && <strong>{view.studioImpact.value}</strong>}
                    {HasText(view.studioImpact.description) && <p>{view.studioImpact.description}</p>}
                </section>
            )}
            {view.employment.length > 0 && (
                <section className="mosaic-experience-card mosaic-card">
                    <h2>Experience</h2>
                    <Entries items={view.employment} />
                </section>
            )}
            {view.skills.length > 0 && (
                <section className="mosaic-skills-card mosaic-card">
                    <h2>Skills</h2>
                    {skillsItems}
                </section>
            )}
            {view.education.length > 0 && (
                <section className="mosaic-education-card mosaic-card">
                    <h2>Education</h2>
                    <Entries items={view.education} />
                </section>
            )}
            {view.projects.length > 0 && (
                <section className="mosaic-project-card mosaic-card">
                    <h2>{projectsTitle}</h2>
                    <Entries items={view.projects} />
                </section>
            )}
            {view.languages.length > 0 && (
                <section className="mosaic-language-card mosaic-card">
                    <h2>Languages</h2>
                    {languagesItems}
                </section>
            )}
            {view.mainCustom.length > 0 && (
                <section className="mosaic-main-custom-card mosaic-card">
                    <h2>{view.sectionTitles.mainCustom}</h2>
                    <Entries items={view.mainCustom} />
                </section>
            )}
            {view.sideCustom.length > 0 && (
                <section className="mosaic-side-custom-card mosaic-card">
                    <h2>{view.sectionTitles.sideCustom}</h2>
                    <Entries items={view.sideCustom} />
                </section>
            )}
        </article>
    );
}
export default MosaicTemplate;
