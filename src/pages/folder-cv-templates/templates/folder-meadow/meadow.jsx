import "./meadow.css";

function MayaPetrovaTemplate() {
    return (
        <article className="maya-template">
            <header className="maya-template-header">
                <div className="maya-template-person">
                    <span className="maya-template-photo">MP</span>

                    <div>
                        <h1>Maya Petrova</h1>
                        <p>Product Designer</p>
                    </div>
                </div>

                <div className="maya-template-contact">
                    <span>maya.petrova@email.com</span>
                    <span>+359 88 123 4567</span>
                    <span>Sofia, Bulgaria</span>
                </div>
            </header>

            <div className="maya-template-line"></div>

            <div className="maya-template-content">
                <main className="maya-template-main">
                    <section className="maya-template-section">
                        <p>
                            Product designer focused on clear, useful and human-centered digital experiences. I combine
                            research, visual design and close collaboration with development teams.
                        </p>
                    </section>

                    <section className="maya-template-section">
                        <h2>Employment history</h2>

                        <div className="maya-template-job">
                            <div className="maya-template-job-heading">
                                <div>
                                    <h3>Senior Product Designer</h3>
                                    <span>Northline Studio</span>
                                </div>

                                <small>2023 — Present</small>
                            </div>

                            <ul>
                                <li>Led the redesign of a SaaS onboarding experience.</li>
                                <li>Created a reusable design system for three products.</li>
                                <li>Worked closely with product, development and QA teams.</li>
                            </ul>
                        </div>

                        <div className="maya-template-job">
                            <div className="maya-template-job-heading">
                                <div>
                                    <h3>Product Designer</h3>
                                    <span>Bright Labs</span>
                                </div>

                                <small>2021 — 2023</small>
                            </div>

                            <ul>
                                <li>Designed responsive interfaces for web and mobile.</li>
                                <li>Prepared prototypes and usability testing sessions.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="maya-template-section">
                        <h2>Education</h2>

                        <div className="maya-template-education">
                            <div>
                                <h3>BA, Visual Communication</h3>
                                <span>National Academy of Art</span>
                            </div>

                            <small>2017 — 2021</small>
                        </div>
                    </section>

                    <section className="maya-template-section">
                        <h2>Selected project</h2>

                        <div className="maya-template-project">
                            <h3>Civic Path</h3>
                            <span>Service design and product research</span>
                            <p>
                                A digital service concept that helps citizens understand and complete municipal
                                processes with fewer steps.
                            </p>
                        </div>
                    </section>
                </main>

                <aside className="maya-template-sidebar">
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

                    <section>
                        <h2>Languages</h2>

                        <div className="maya-template-language">
                            <span className="maya-template-language-name">Bulgarian</span>
                            <small>Native</small>
                        </div>

                        <div className="maya-template-language">
                            <span className="maya-template-language-name">English</span>
                            <small>C1</small>
                        </div>
                    </section>

                    <section>
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
