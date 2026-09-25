import "./bridge.css";

function BridgeTemplate() {
    return (
        <article className="bridge-template">
            <div className="bridge-band"></div>

            <header className="bridge-header">
                <div className="bridge-name">
                    <h1>Maya Petrova</h1>
                    <p>Product Designer</p>
                </div>

                <div className="bridge-contact">
                    <span>Sofia, Bulgaria</span>
                    <span>maya.petrova@email.com</span>
                    <span>+359 88 123 4567</span>
                    <span>maya-petrova.design</span>
                </div>
            </header>

            <section className="bridge-profile">
                <span>Profile</span>
                <p>Product designer focused on clear, useful and human-centered digital experiences. I combine research, visual design and close collaboration with development teams.</p>
            </section>

            <section className="bridge-experience">
                <div className="bridge-title">
                    <span>01</span>
                    <h2>Employment history</h2>
                </div>

                <div className="bridge-jobs">
                    <article className="bridge-job">
                        <div className="bridge-job-top">
                            <div>
                                <h3>Senior Product Designer</h3>
                                <strong>Northline Studio</strong>
                            </div>
                            <small>2023 — Present</small>
                        </div>

                        <p>Led product discovery, interaction design and design-system work across multiple SaaS products.</p>

                        <ul>
                            <li>Improved onboarding completion by 28%.</li>
                            <li>Built a shared component library for three products.</li>
                            <li>Worked directly with product, development and QA.</li>
                        </ul>
                    </article>

                    <article className="bridge-job">
                        <div className="bridge-job-top">
                            <div>
                                <h3>Product Designer</h3>
                                <strong>Bright Labs</strong>
                            </div>
                            <small>2021 — 2023</small>
                        </div>

                        <p>Designed responsive web and mobile products from early research to final implementation.</p>

                        <ul>
                            <li>Created interactive prototypes and user flows.</li>
                            <li>Introduced lightweight usability testing.</li>
                        </ul>
                    </article>
                </div>
            </section>

            <section className="bridge-bottom">
                <div className="bridge-panel bridge-panel-light">
                    <span>02</span>
                    <h2>Education</h2>
                    <h3>BA, Visual Communication</h3>
                    <p>National Academy of Art</p>
                    <small>2017 — 2021</small>
                </div>

                <div className="bridge-panel bridge-panel-dark">
                    <span>03</span>
                    <h2>Skills</h2>
                    <p>Product strategy</p>
                    <p>UX research</p>
                    <p>UI design</p>
                    <p>Design systems</p>
                    <p>Prototyping</p>
                    <p>Figma</p>
                </div>

                <div className="bridge-panel bridge-panel-accent">
                    <span>04</span>
                    <h2>Selected project</h2>
                    <h3>Civic Path</h3>
                    <p>A service-design concept that simplifies municipal processes through clearer language and fewer steps.</p>

                    <h2 className="bridge-languages-title">Languages</h2>
                    <p>Bulgarian Native</p>
                    <p>English C1</p>
                </div>
            </section>
        </article>
    );
}

export default BridgeTemplate;
