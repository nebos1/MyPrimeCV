import "./bridge.css";
import {
    Entries,
    GetTemplateContent,
    HasText,
    Knowledge,
    Link,
    NextTemplateSampleData,
} from "../../../folder-create-cv/components/template-content";
function BridgeTemplate({ data = NextTemplateSampleData }) {
    const view = GetTemplateContent(data);
    const contactItems = [];
    for (let index = 0; index < view.contact.length; index++) {
        const line = view.contact[index];
        contactItems.push(<span key={index}>{line}</span>);
    }
    const linkItems = [];
    for (let index = 0; index < view.links.length; index++) {
        const item = view.links[index];
        linkItems.push(
            <span key={index}>
                <Link item={item} sample={data === NextTemplateSampleData} />
            </span>,
        );
    }
    const skillItems = [];
    for (let index = 0; index < view.skills.length; index++) {
        const item = view.skills[index];
        skillItems.push(<Knowledge item={item} key={index} />);
    }
    const languageItems = [];
    for (let index = 0; index < view.languages.length; index++) {
        const item = view.languages[index];
        languageItems.push(<Knowledge item={item} key={index} />);
    }
    let projectsTitle = view.sectionTitles.projects.trim();
    if (projectsTitle === "") {
        projectsTitle = "Selected project";
    }
    let headerClassName = "bridge-header";
    if (view.name.length > 80 || view.basics.professionalTitle.length > 100) {
        headerClassName = headerClassName + " bridge-header-stacked";
    } else {
        let longContact = false;
        for (let index = 0; index < view.contact.length; index++) {
            if (view.contact[index].length > 100) {
                longContact = true;
            }
        }
        for (let index = 0; index < view.links.length; index++) {
            const item = view.links[index];
            if (item.label.length > 100 || item.url.length > 100) {
                longContact = true;
            }
        }
        if (longContact) {
            headerClassName = headerClassName + " bridge-header-stacked";
        }
    }
    let panelCount = 0;
    if (view.education.length > 0) {
        panelCount++;
    }
    if (view.skills.length > 0) {
        panelCount++;
    }
    if (view.projects.length > 0 || view.languages.length > 0) {
        panelCount++;
    }
    let bottomClassName = "bridge-bottom bridge-bottom-one";
    if (panelCount === 2) {
        bottomClassName = "bridge-bottom bridge-bottom-two";
    }
    if (panelCount === 3) {
        bottomClassName = "bridge-bottom bridge-bottom-three";
    }
    let panelNumber = 1;
    if (view.employment.length > 0) {
        panelNumber = 2;
    }
    const educationNumber = "0" + panelNumber;
    if (view.education.length > 0) {
        panelNumber++;
    }
    const skillsNumber = "0" + panelNumber;
    if (view.skills.length > 0) {
        panelNumber++;
    }
    const projectNumber = "0" + panelNumber;
    let skillPanelClass = "bridge-panel bridge-panel-dark";
    if (view.education.length > 0) {
        skillPanelClass = skillPanelClass + " bridge-panel-spaced";
    }
    let projectPanelClass = "bridge-panel bridge-panel-accent";
    if (view.education.length > 0 || view.skills.length > 0) {
        projectPanelClass = projectPanelClass + " bridge-panel-spaced";
    }
    if (view.projects.length === 0) {
        projectsTitle = "Languages";
    }
    return (
        <article className="bridge-template cv-next-template">
            {(view.name ||
                HasText(view.basics.professionalTitle) ||
                view.contact.length > 0 ||
                view.links.length > 0) && (
                <header className={headerClassName}>
                    <div className="bridge-name">
                        {view.name && <h1>{view.name}</h1>}
                        {HasText(view.basics.professionalTitle) && <p>{view.basics.professionalTitle}</p>}
                    </div>
                    {(view.contact.length > 0 || view.links.length > 0) && (
                        <div className="bridge-contact">
                            {contactItems}
                            {linkItems}
                        </div>
                    )}
                </header>
            )}
            {HasText(view.profile) && (
                <section className="bridge-profile">
                    <span>Profile</span>
                    <p>{view.profile}</p>
                </section>
            )}
            {view.employment.length > 0 && (
                <section className="bridge-experience">
                    <div className="bridge-title">
                        <span>01</span>
                        <h2>Employment history</h2>
                    </div>
                    <div className="bridge-jobs">
                        <Entries
                            items={view.employment}
                            className="bridge-job"
                            headingClassName="bridge-job-top"
                        />
                    </div>
                </section>
            )}
            {panelCount > 0 && (
                <section className={bottomClassName}>
                    {view.education.length > 0 && (
                        <section className="bridge-panel bridge-panel-light">
                            <span className="bridge-panel-number">{educationNumber}</span>
                            <h2>Education</h2>
                            <Entries items={view.education} />
                        </section>
                    )}
                    {view.skills.length > 0 && (
                        <section className={skillPanelClass}>
                            <span className="bridge-panel-number">{skillsNumber}</span>
                            <h2>Skills</h2>
                            {skillItems}
                        </section>
                    )}
                    {(view.projects.length > 0 || view.languages.length > 0) && (
                        <section className={projectPanelClass}>
                            <span className="bridge-panel-number">{projectNumber}</span>
                            <h2>{projectsTitle}</h2>
                            <Entries items={view.projects} />
                            {view.projects.length > 0 && view.languages.length > 0 && (
                                <h2 className="bridge-languages-title">Languages</h2>
                            )}
                            {languageItems}
                        </section>
                    )}
                </section>
            )}
            {view.mainCustom.length > 0 && (
                <section className="bridge-experience">
                    <div className="bridge-title">
                        <h2>{view.sectionTitles.mainCustom}</h2>
                    </div>
                    <div className="bridge-jobs">
                        <Entries items={view.mainCustom} className="bridge-job" />
                    </div>
                </section>
            )}
            {view.sideCustom.length > 0 && (
                <section className="bridge-experience">
                    <div className="bridge-title">
                        <h2>{view.sectionTitles.sideCustom}</h2>
                    </div>
                    <div className="bridge-jobs">
                        <Entries items={view.sideCustom} className="bridge-job" />
                    </div>
                </section>
            )}
        </article>
    );
}
export default BridgeTemplate;
