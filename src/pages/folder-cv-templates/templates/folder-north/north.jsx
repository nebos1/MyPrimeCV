import "./north.css";

function NorthTemplate() {
    return (
        <article className="north-template">
            <header className="north-header">
                <div>
                    <h1>Maya Petrova</h1>
                    <p>Product Designer</p>
                </div>

                <div className="north-contact">
                    <span>Sofia, Bulgaria</span>
                    <span>maya.petrova@email.com</span>
                    <span>+359 88 123 4567</span>
                    <span>maya-petrova.design</span>
                </div>
            </header>

            <section className="north-summary">
                <h2>Profile</h2>
                <p>
                    Product designer focused on useful digital experiences, clear systems and close collaboration with
                    product and engineering teams.
                </p>
            </section>

            <section className="north-section">
                <h2>Experience</h2>

                <div className="north-entry">
                    <div className="north-entry-date">2023 — Present</div>
                    <div className="north-entry-details">
                        <h3>Senior Product Designer</h3>
                        <span>Northline Studio</span>
                        <p>
                            Led product discovery, interaction design and design-system work across multiple SaaS
                            products.
                        </p>
                        <ul>
                            <li>Improved onboarding completion by 28%.</li>
                            <li>Built a shared component library for three products.</li>
                            <li>Worked directly with product, development and QA.</li>
                        </ul>
                    </div>
                </div>

                <div className="north-entry">
                    <div className="north-entry-date">2021 — 2023</div>
                    <div className="north-entry-details">
                        <h3>Product Designer</h3>
                        <span>Bright Labs</span>
                        <p>Designed responsive web and mobile products from early research to final implementation.</p>
                        <ul>
                            <li>Created interactive prototypes and user flows.</li>
                            <li>Introduced lightweight usability testing.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <div className="north-bottom-grid">
                <section className="north-section">
                    <h2>Education</h2>
                    <div className="north-small-entry">
                        <small>2017 - 2021</small>
                        <strong>BA, Visual Communication</strong>
                        <span>National Academy of Art</span>
                    </div>
                </section>

                <section className="north-section">
                    <h2>Skills</h2>
                    <div className="north-skills">
                        <span>Product strategy</span>
                        <span>UX research</span>
                        <span>UI design</span>
                        <span>Design systems</span>
                        <span>Prototyping</span>
                        <span>Figma</span>
                    </div>
                </section>
            </div>
        </article>
    );
}

export default NorthTemplate;
