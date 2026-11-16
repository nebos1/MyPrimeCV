import "./ledger.css";
import {
    Entries,
    GetTemplateContent,
    HasText,
    Knowledge,
    Link,
    NextTemplateSampleData,
} from "../../../folder-create-cv/components/template-content";
function LedgerTemplate({ data = NextTemplateSampleData }) {
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
    const rows = [];
    let sectionNumber = 0;
    if (HasText(view.profile)) {
        rows.push(
            <section className="ledger-row" key={sectionNumber}>
                <div className="ledger-number">{"0" + sectionNumber}</div>
                <h2>{"Profile"}</h2>
                <div className="ledger-content">
                    <p className="ledger-profile-text">{view.profile}</p>
                </div>
            </section>,
        );
        sectionNumber++;
    }
    if (view.employment.length > 0) {
        rows.push(
            <section className="ledger-row" key={sectionNumber}>
                <div className="ledger-number">{"0" + sectionNumber}</div>
                <h2>{"Experience"}</h2>
                <div className="ledger-content">
                    <Entries items={view.employment} className="ledger-job" />
                </div>
            </section>,
        );
        sectionNumber++;
    }
    if (view.education.length > 0) {
        rows.push(
            <section className="ledger-row" key={sectionNumber}>
                <div className="ledger-number">{"0" + sectionNumber}</div>
                <h2>{"Education"}</h2>
                <div className="ledger-content">
                    <Entries items={view.education} className="ledger-education" />
                </div>
            </section>,
        );
        sectionNumber++;
    }
    if (view.skills.length > 0) {
        rows.push(
            <section className="ledger-row" key={sectionNumber}>
                <div className="ledger-number">{"0" + sectionNumber}</div>
                <h2>{"Skills"}</h2>
                <div className="ledger-content">
                    <div className="ledger-skill-grid">{skillItems}</div>
                </div>
            </section>,
        );
        sectionNumber++;
    }
    if (view.languages.length > 0) {
        rows.push(
            <section className="ledger-row" key={sectionNumber}>
                <div className="ledger-number">{"0" + sectionNumber}</div>
                <h2>{"Languages"}</h2>
                <div className="ledger-content">
                    <div className="ledger-language-row">{languageItems}</div>
                </div>
            </section>,
        );
        sectionNumber++;
    }
    if (view.projects.length > 0) {
        rows.push(
            <section className="ledger-row" key={sectionNumber}>
                <div className="ledger-number">{"0" + sectionNumber}</div>
                <h2>{projectsTitle}</h2>
                <div className="ledger-content">
                    <Entries items={view.projects} className="ledger-job" />
                </div>
            </section>,
        );
        sectionNumber++;
    }
    if (view.mainCustom.length > 0) {
        rows.push(
            <section className="ledger-row" key={sectionNumber}>
                <div className="ledger-number">{"0" + sectionNumber}</div>
                <h2>{view.sectionTitles.mainCustom}</h2>
                <div className="ledger-content">
                    <Entries items={view.mainCustom} className="ledger-job" />
                </div>
            </section>,
        );
        sectionNumber++;
    }
    if (view.sideCustom.length > 0) {
        rows.push(
            <section className="ledger-row" key={sectionNumber}>
                <div className="ledger-number">{"0" + sectionNumber}</div>
                <h2>{view.sectionTitles.sideCustom}</h2>
                <div className="ledger-content">
                    <Entries items={view.sideCustom} className="ledger-job" />
                </div>
            </section>,
        );
        sectionNumber++;
    }
    return (
        <article className="ledger-template cv-next-template">
            {(view.name ||
                HasText(view.basics.professionalTitle) ||
                view.contact.length > 0 ||
                view.links.length > 0) && (
                <header className="ledger-header">
                    <div>
                        {view.name && <h1>{view.name}</h1>}
                        {HasText(view.basics.professionalTitle) && <p>{view.basics.professionalTitle}</p>}
                    </div>
                    {(view.contact.length > 0 || view.links.length > 0) && (
                        <div className="ledger-contact">
                            {contactItems}
                            {linkItems}
                        </div>
                    )}
                </header>
            )}
            {rows}
        </article>
    );
}
export default LedgerTemplate;
