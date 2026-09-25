import "./linen.css";

function LinenTemplate() {
    return (
        <article className="linen-template">
            <header className="linen-header">
                <h1>Maya Petrova</h1>
                <p>Product Designer</p>

                <div className="linen-contact">
                    <span>Sofia, Bulgaria</span>
                    <i></i>
                    <span>maya.petrova@email.com</span>
                    <i></i>
                    <span>+359 88 123 4567</span>
                </div>
            </header>

            <section className="linen-intro">
                <p>
                    I design calm, useful digital products with attention to language, visual rhythm and the people
                    using them.
                </p>
            </section>

            <section className="linen-section">
                <div className="linen-section-title">
                    <span>01</span>
                    <h2>Experience</h2>
                </div>

                <article className="linen-job">
                    <div className="linen-job-heading">
                        <h3>Senior Product Designer</h3>
                        <p>Northline Studio</p>
                    </div>
                    <small>2023 — Present</small>

                    <div className="linen-job-copy">
                        <p>Leading research, product design and visual-system work for a family of SaaS products.</p>
                        <ul>
                            <li>Redesigned onboarding and increased activation.</li>
                            <li>Created a shared component and pattern library.</li>
                        </ul>
                    </div>
                </article>

                <article className="linen-job">
                    <div className="linen-job-heading">
                        <h3>Product Designer</h3>
                        <p>Bright Labs</p>
                    </div>
                    <small>2021 — 2023</small>

                    <div className="linen-job-copy">
                        <p>Designed responsive interfaces and translated research into clear product decisions.</p>
                    </div>
                </article>
            </section>

            <section className="linen-section">
                <div className="linen-section-title">
                    <span>02</span>
                    <h2>Education</h2>
                </div>

                <article className="linen-simple-row">
                    <div>
                        <h3>BA, Visual Communication</h3>
                        <p>National Academy of Art</p>
                    </div>
                    <small>2017 — 2021</small>
                </article>
            </section>

            <section className="linen-section">
                <div className="linen-section-title">
                    <span>03</span>
                    <h2>Skills & Languages</h2>
                </div>

                <div className="linen-columns">
                    <div>
                        <h3>Expertise</h3>
                        <p>Product strategy</p>
                        <p>UX research</p>
                        <p>UI design</p>
                        <p>Design systems</p>
                    </div>

                    <div>
                        <h3>Tools</h3>
                        <p>Figma</p>
                        <p>FigJam</p>
                        <p>Maze</p>
                        <p>Notion</p>
                    </div>

                    <div>
                        <h3>Languages</h3>
                        <p>Bulgarian Native</p>
                        <p>English C1</p>
                    </div>
                </div>
            </section>

            <footer className="linen-footer">
                <span>maya-petrova.design</span>
                <span>Portfolio available on request</span>
            </footer>
        </article>
    );
}

export default LinenTemplate;
