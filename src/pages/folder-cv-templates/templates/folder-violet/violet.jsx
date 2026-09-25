import "./violet.css";

function VioletTemplate() {
    return (
        <article className="violet-template">
            <header className="violet-header">
                <div className="violet-person">
                    <span>MP</span>

                    <div>
                        <h1>Maya Petrova</h1>
                        <p>Product Designer</p>
                    </div>
                </div>
            </header>

            <div className="violet-line"></div>

            <div className="violet-layout">
                <main className="violet-main-card">
                    <section>
                        <h2>Professional summary</h2>
                        <p>Product designer focused on clear, useful and human-centered digital experiences. I combine research, visual design and close collaboration with development teams.</p>
                    </section>

                    <section>
                        <h2>Employment history</h2>

                        <article className="violet-job">
                            <div className="violet-job-heading">
                                <div>
                                    <h3>Senior Product Designer</h3>
                                    <span>Northline Studio</span>
                                </div>
                                <small>2023 — Present</small>
                            </div>

                            <ul>
                                <li>Improved onboarding completion by 28%.</li>
                                <li>Built a shared component library for three products.</li>
                                <li>Worked directly with product, development and QA.</li>
                            </ul>
                        </article>

                        <article className="violet-job">
                            <div className="violet-job-heading">
                                <div>
                                    <h3>Product Designer</h3>
                                    <span>Bright Labs</span>
                                </div>
                                <small>2021 — 2023</small>
                            </div>

                            <ul>
                                <li>Created interactive prototypes and user flows.</li>
                                <li>Introduced lightweight usability testing.</li>
                            </ul>
                        </article>
                    </section>

                    <section>
                        <h2>Education</h2>

                        <div className="violet-row">
                            <div>
                                <h3>BA, Visual Communication</h3>
                                <span>National Academy of Art</span>
                            </div>
                            <small>2017 — 2021</small>
                        </div>
                    </section>

                    <section>
                        <h2>Selected project</h2>

                        <div className="violet-row">
                            <div>
                                <h3>Civic Path</h3>
                                <span>Service design and product research</span>
                            </div>
                            <small>2025</small>
                        </div>

                        <p>A service-design concept that simplifies municipal processes through clearer language and fewer steps.</p>
                    </section>
                </main>

                <aside className="violet-sidebar-card">
                    <section>
                        <h2>Personal details</h2>
                        <p>maya.petrova@email.com</p>
                        <p>+359 88 123 4567</p>
                        <p>Sofia, Bulgaria</p>
                    </section>

                    <section>
                        <h2>Skills</h2>
                        <strong>Product strategy</strong>
                        <strong>UX research</strong>
                        <strong>UI design</strong>
                        <strong>Design systems</strong>
                        <strong>Prototyping</strong>
                        <strong>Figma</strong>
                    </section>

                    <section>
                        <h2>Languages</h2>
                        <div className="violet-pair">
                            <span>Bulgarian</span>
                            <small>Native</small>
                        </div>
                        <div className="violet-pair">
                            <span>English</span>
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

export default VioletTemplate;
