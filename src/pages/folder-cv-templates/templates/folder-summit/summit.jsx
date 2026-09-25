import "./summit.css";

function SummitTemplate() {
    return (
        <article className="summit-template">
            <header className="summit-header">
                <div className="summit-photo"></div>

                <div className="summit-name">
                    <h1>Maya Petrova</h1>
                    <p>Product Designer</p>
                </div>

                <div className="summit-contact">
                    <span>Sofia, Bulgaria</span>
                    <span>maya.petrova@email.com</span>
                    <span>+359 88 123 4567</span>
                    <span>maya-petrova.design</span>
                </div>
            </header>

            <section className="summit-profile">
                <p>Product designer focused on clear, useful and human-centered digital experiences. I combine research, visual design and close collaboration with development teams.</p>
            </section>

            <div className="summit-layout">
                <main className="summit-main">
                    <section className="summit-section">
                        <h2>Employment history</h2>

                        <article className="summit-job">
                            <div className="summit-date">2023 — Present</div>

                            <div>
                                <h3>Senior Product Designer</h3>
                                <span>Northline Studio</span>
                                <p>Led product discovery, interaction design and design-system work across multiple SaaS products.</p>
                                <ul>
                                    <li>Improved onboarding completion by 28%.</li>
                                    <li>Built a shared component library for three products.</li>
                                    <li>Worked directly with product, development and QA.</li>
                                </ul>
                            </div>
                        </article>

                        <article className="summit-job">
                            <div className="summit-date">2021 — 2023</div>

                            <div>
                                <h3>Product Designer</h3>
                                <span>Bright Labs</span>
                                <p>Designed responsive web and mobile products from early research to final implementation.</p>
                                <ul>
                                    <li>Created interactive prototypes and user flows.</li>
                                    <li>Introduced lightweight usability testing.</li>
                                </ul>
                            </div>
                        </article>
                    </section>

                    <section className="summit-section">
                        <h2>Education</h2>

                        <div className="summit-row">
                            <div>
                                <h3>BA, Visual Communication</h3>
                                <span>National Academy of Art</span>
                            </div>

                            <small>2017 — 2021</small>
                        </div>
                    </section>

                    <section className="summit-section">
                        <h2>Selected project</h2>

                        <div className="summit-row">
                            <div>
                                <h3>Civic Path</h3>
                                <span>Service design and product research</span>
                            </div>

                            <small>2025</small>
                        </div>

                        <p>A service-design concept that simplifies municipal processes through clearer language and fewer steps.</p>
                    </section>
                </main>

                <aside className="summit-sidebar">
                    <section>
                        <h2>Skills</h2>
                        <p>Product strategy</p>
                        <p>UX research</p>
                        <p>UI design</p>
                        <p>Design systems</p>
                        <p>Prototyping</p>
                        <p>Figma</p>
                    </section>

                    <section>
                        <h2>Languages</h2>

                        <div className="summit-language">
                            <span>Bulgarian</span>
                            <small>Native</small>
                        </div>

                        <div className="summit-language">
                            <span>English</span>
                            <small>C1</small>
                        </div>
                    </section>

                    <section>
                        <h2>Links</h2>
                        <p>linkedin.com/in/mayapetrova</p>
                        <p>maya-petrova.design</p>
                    </section>
                </aside>
            </div>
        </article>
    );
}

export default SummitTemplate;
