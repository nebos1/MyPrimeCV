import "./studio.css";

function StudioTemplate() {
    return (
        <article className="studio-template">
            <aside className="studio-sidebar">
                <div className="studio-monogram">MP</div>

                <div className="studio-vertical-name">
                    <span>Maya</span>
                    <strong>Petrova</strong>
                </div>

                <div className="studio-sidebar-content">
                    <section>
                        <h2>Contact</h2>
                        <p>Sofia, Bulgaria</p>
                        <p>maya.petrova@email.com</p>
                        <p>+359 88 123 4567</p>
                    </section>

                    <section>
                        <h2>Tools</h2>
                        <p>Figma</p>
                        <p>FigJam</p>
                        <p>Maze</p>
                        <p>Notion</p>
                    </section>

                    <section>
                        <h2>Languages</h2>
                        <p>Bulgarian Native</p>
                        <p>English C1</p>
                    </section>
                </div>
            </aside>

            <main className="studio-main">
                <header className="studio-header">
                    <h1>Product Designer</h1>
                    <p>I shape digital products through research, visual systems and close collaboration with engineering teams.</p>
                </header>

                <section className="studio-feature">
                    <span>Selected impact</span>
                    <strong>28%</strong>
                    <p>increase in onboarding completion after a full UX redesign.</p>
                </section>

                <section className="studio-section">
                    <div className="studio-section-number">01</div>
                    <div>
                        <h2>Experience</h2>

                        <article className="studio-job">
                            <div>
                                <h3>Senior Product Designer</h3>
                                <span>Northline Studio</span>
                            </div>
                            <small>2023 — Present</small>
                            <p>Product discovery, prototyping, interface design and design-system leadership for SaaS products.</p>
                        </article>

                        <article className="studio-job">
                            <div>
                                <h3>Product Designer</h3>
                                <span>Bright Labs</span>
                            </div>
                            <small>2021 — 2023</small>
                            <p>Responsive web and mobile design, usability testing and developer handoff.</p>
                        </article>
                    </div>
                </section>

                <section className="studio-section">
                    <div className="studio-section-number">02</div>
                    <div>
                        <h2>Selected work</h2>

                        <article className="studio-project">
                            <h3>Civic Path</h3>
                            <p>A service-design concept that simplifies municipal processes through clearer language and fewer steps.</p>
                            <span>Research / UX / Prototype</span>
                        </article>
                    </div>
                </section>

                <section className="studio-section studio-section-last">
                    <div className="studio-section-number">03</div>
                    <div>
                        <h2>Education</h2>
                        <h3>BA, Visual Communication</h3>
                        <p>National Academy of Art, 2017 — 2021</p>
                    </div>
                </section>
            </main>
        </article>
    );
}

export default StudioTemplate;
