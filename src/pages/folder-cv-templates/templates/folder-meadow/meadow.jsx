import "./meadow.css";
function MayaPetrovaTemplate() {
    return (
        <article className="meadow-template">
            <header className="meadow-template-header">
                <div className="meadow-template-person">
                    <span className="meadow-template-photo">MP</span>

                    <div>
                        <h1>Maya Petrova</h1>
                        <p>Product Designer</p>
                    </div>
                </div>

                <div className="meadow-template-contact">
                    <span>maya.petrova@email.com</span>
                    <span>+359 88 123 4567</span>
                    <span>Sofia, Bulgaria</span>
                </div>
            </header>

            <div className="meadow-template-line"></div>

            <div className="meadow-template-content">
                <main className="meadow-template-main">
                    <section className="meadow-template-section">
                        <p>
                            Product designer focused on clear, useful and human-centered digital experiences. I combine
                            research, visual design and close collaboration with development teams.
                        </p>
                    </section>

                    <section className="meadow-template-section meadow-template-section-spaced">
                        <h2>Employment history</h2>

                        <div className="meadow-template-job">
                            <div className="meadow-template-job-heading">
                                <div>
                                    <h3>Senior Product Designer</h3>
                                    <span>Northline Studio</span>
                                </div>

                                <small>2023 — Present</small>
                            </div>

                            <ul>
                                <li>Led the redesign of a SaaS onboarding experience.</li>
                                <li className="meadow-template-job-li-spaced">
                                    Created a reusable design system for three products.
                                </li>
                                <li className="meadow-template-job-li-spaced">
                                    Worked closely with product, development and QA teams.
                                </li>
                            </ul>
                        </div>

                        <div className="meadow-template-job">
                            <div className="meadow-template-job-heading">
                                <div>
                                    <h3>Product Designer</h3>
                                    <span>Bright Labs</span>
                                </div>

                                <small>2021 — 2023</small>
                            </div>

                            <ul>
                                <li>Designed responsive interfaces for web and mobile.</li>
                                <li className="meadow-template-job-li-spaced">
                                    Prepared prototypes and usability testing sessions.
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="meadow-template-section meadow-template-section-spaced">
                        <h2>Education</h2>

                        <div className="meadow-template-education">
                            <div>
                                <h3>BA, Visual Communication</h3>
                                <span>National Academy of Art</span>
                            </div>

                            <small>2017 — 2021</small>
                        </div>
                    </section>

                    <section className="meadow-template-section meadow-template-section-spaced">
                        <h2>Selected project</h2>

                        <div className="meadow-template-project">
                            <h3>Civic Path</h3>
                            <span>Service design and product research</span>
                            <p>
                                A digital service concept that helps citizens understand and complete municipal
                                processes with fewer steps.
                            </p>
                        </div>
                    </section>
                </main>

                <aside className="meadow-template-sidebar">
                    <section>
                        <h2>Skills</h2>
                        <ul>
                            <li>Product strategy</li>
                            <li>UX research</li>
                            <li>UI design</li>
                            <li>Design systems</li>
                            <li>Prototyping</li>
                            <li>Figma</li>
                        </ul>
                    </section>

                    <section className="meadow-template-sidebar-section-spaced">
                        <h2>Languages</h2>

                        <div className="meadow-template-language">
                            <span className="meadow-template-language-name">Bulgarian</span>
                            <small>Native</small>
                        </div>

                        <div className="meadow-template-language">
                            <span className="meadow-template-language-name">English</span>
                            <small>C1</small>
                        </div>
                    </section>

                    <section className="meadow-template-sidebar-section-spaced">
                        <h2>Links</h2>
                        <p>maya-petrova.design</p>
                        <p>linkedin.com/in/mayapetrova</p>
                    </section>
                </aside>
            </div>
        </article>
    );
}
export default MayaPetrovaTemplate;
