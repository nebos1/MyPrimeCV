import React from "react";
import "./ledger.css";

function LedgerTemplate() {
    return (
        <article className="ledger-template">
            <header className="ledger-header">
                <div>
                    <h1>Maya Petrova</h1>
                    <p>Product Designer</p>
                </div>

                <div className="ledger-contact">
                    <span>Sofia, Bulgaria</span>
                    <span>maya.petrova@email.com</span>
                    <span>+359 88 123 4567</span>
                </div>
            </header>

            <section className="ledger-row ledger-profile">
                <div className="ledger-number">00</div>
                <h2>Profile</h2>
                <p>Product designer focused on clear, useful and human-centered digital experiences. I combine research, visual design and close collaboration with development teams.</p>
            </section>

            <section className="ledger-row">
                <div className="ledger-number">01</div>
                <h2>Experience</h2>

                <div className="ledger-content">
                    <article className="ledger-job">
                        <div>
                            <h3>Senior Product Designer</h3>
                            <span>Northline Studio</span>
                        </div>

                        <small>2023 — Present</small>

                        <p>Led product discovery, interaction design and design-system work across multiple SaaS products.</p>

                        <ul>
                            <li>Improved onboarding completion by 28%.</li>
                            <li>Built a shared component library for three products.</li>
                            <li>Worked directly with product, development and QA.</li>
                        </ul>
                    </article>

                    <article className="ledger-job">
                        <div>
                            <h3>Product Designer</h3>
                            <span>Bright Labs</span>
                        </div>

                        <small>2021 — 2023</small>

                        <p>Designed responsive web and mobile products from early research to final implementation.</p>

                        <ul>
                            <li>Created interactive prototypes and user flows.</li>
                            <li>Introduced lightweight usability testing.</li>
                        </ul>
                    </article>
                </div>
            </section>

            <section className="ledger-row">
                <div className="ledger-number">02</div>
                <h2>Education</h2>

                <div className="ledger-content">
                    <div className="ledger-education">
                        <div>
                            <h3>BA, Visual Communication</h3>
                            <span>National Academy of Art</span>
                        </div>
                        <small>2017 — 2021</small>
                    </div>
                </div>
            </section>

            <section className="ledger-row">
                <div className="ledger-number">03</div>
                <h2>Skills</h2>

                <div className="ledger-content ledger-skill-grid">
                    <span>Product strategy</span>
                    <span>UX research</span>
                    <span>UI design</span>
                    <span>Design systems</span>
                    <span>Prototyping</span>
                    <span>Figma</span>
                </div>
            </section>

            <section className="ledger-row">
                <div className="ledger-number">04</div>
                <h2>Languages</h2>

                <div className="ledger-content ledger-language-row">
                    <span>Bulgarian Native</span>
                    <span>English C1</span>
                    <span>maya-petrova.design</span>
                </div>
            </section>
        </article>
    );
}

export default LedgerTemplate;
