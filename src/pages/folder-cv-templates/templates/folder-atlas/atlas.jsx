import "./atlas.css";

function AtlasTemplate() {
    return (
        <article className="atlas-template">
            <header className="atlas-header">
                <div>
                    <span className="atlas-header-label">Product Design / Leadership</span>
                    <h1>Maya Petrova</h1>
                    <p>Senior product designer creating scalable systems and clearer customer journeys.</p>
                </div>

                <div className="atlas-contact">
                    <strong>Contact</strong>
                    <span>Sofia, Bulgaria</span>
                    <span>maya.petrova@email.com</span>
                    <span>+359 88 123 4567</span>
                </div>
            </header>

            <section className="atlas-metrics">
                <div>
                    <strong>6+</strong>
                    <span>Years experience</span>
                </div>
                <div>
                    <strong>3</strong>
                    <span>Design systems</span>
                </div>
                <div className="atlas-metric-last">
                    <strong>28%</strong>
                    <span>Activation growth</span>
                </div>
            </section>

            <div className="atlas-layout">
                <main className="atlas-main">
                    <section className="atlas-section">
                        <h2>Professional experience</h2>

                        <article className="atlas-role">
                            <div className="atlas-role-line">
                                <span></span>
                            </div>

                            <div className="atlas-role-content">
                                <div className="atlas-role-heading">
                                    <div>
                                        <h3>Senior Product Designer</h3>
                                        <p>Northline Studio</p>
                                    </div>
                                    <small>2023 — Present</small>
                                </div>

                                <ul>
                                    <li>Owned end-to-end design for core SaaS workflows.</li>
                                    <li>Created a scalable product design system.</li>
                                    <li>Facilitated discovery workshops with stakeholders.</li>
                                </ul>
                            </div>
                        </article>

                        <article className="atlas-role atlas-role-last">
                            <div className="atlas-role-line">
                                <span></span>
                            </div>

                            <div className="atlas-role-content">
                                <div className="atlas-role-heading">
                                    <div>
                                        <h3>Product Designer</h3>
                                        <p>Bright Labs</p>
                                    </div>
                                    <small>2021 — 2023</small>
                                </div>

                                <ul>
                                    <li>Designed responsive products for web and mobile.</li>
                                    <li>Ran usability tests and improved handoff quality.</li>
                                </ul>
                            </div>
                        </article>
                    </section>

                    <section className="atlas-section">
                        <h2>Selected case study</h2>

                        <div className="atlas-case">
                            <span>01</span>
                            <div>
                                <h3>Civic Path</h3>
                                <p>Simplified a complex municipal service into a clear, guided digital flow.</p>
                            </div>
                        </div>
                    </section>
                </main>

                <aside className="atlas-sidebar">
                    <section>
                        <h2>Core strengths</h2>
                        <ul>
                            <li>Product strategy</li>
                            <li>Research planning</li>
                            <li>Interaction design</li>
                            <li>Design systems</li>
                            <li>Workshop facilitation</li>
                            <li>Stakeholder alignment</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Education</h2>
                        <div className="atlas-education">
                            <div className="atlas-education-row">
                                <h3>Visual Communication</h3>
                                <small>2017 - 2021</small>
                            </div>
                            <p>National Academy of Art</p>
                        </div>
                    </section>

                    <section>
                        <h2>Languages</h2>
                        <div className="atlas-language-row">
                            <span>Bulgarian</span>
                            <small>Native</small>
                        </div>
                        <div className="atlas-language-row">
                            <span>English</span>
                            <small>C1</small>
                        </div>
                    </section>
                </aside>
            </div>
        </article>
    );
}

export default AtlasTemplate;
