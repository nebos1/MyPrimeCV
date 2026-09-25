import React from "react";
import "./ribbon.css";

function RibbonTemplate() {
    return (
        <article className="ribbon-template">
            <div className="ribbon-band">
                <span>Product Designer</span>
            </div>

            <header className="ribbon-header">
                <div>
                    <h1>Maya Petrova</h1>
                </div>

                <div className="ribbon-contact">
                    <span>Sofia, Bulgaria</span>
                    <span>maya.petrova@email.com</span>
                    <span>+359 88 123 4567</span>
                    <span>maya-petrova.design</span>
                </div>
            </header>

            <section className="ribbon-profile">
                <p>
                    Product designer focused on clear, useful and human-centered digital experiences. I combine
                    research, visual design and close collaboration with development teams.
                </p>
            </section>

            <section className="ribbon-experience">
                <div className="ribbon-side-title">
                    <span>01</span>
                    <h2>Experience</h2>
                </div>

                <div className="ribbon-experience-content">
                    <article className="ribbon-job">
                        <div className="ribbon-job-heading">
                            <div>
                                <h3>Senior Product Designer</h3>
                                <strong>Northline Studio</strong>
                            </div>
                            <small>2023 — Present</small>
                        </div>

                        <p>
                            Led product discovery, interaction design and design-system work across multiple SaaS
                            products.
                        </p>

                        <ul>
                            <li>Improved onboarding completion by 28%.</li>
                            <li>Built a shared component library for three products.</li>
                            <li>Worked directly with product, development and QA.</li>
                        </ul>
                    </article>

                    <article className="ribbon-job">
                        <div className="ribbon-job-heading">
                            <div>
                                <h3>Product Designer</h3>
                                <strong>Bright Labs</strong>
                            </div>
                            <small>2021 — 2023</small>
                        </div>

                        <p>Designed responsive web and mobile products from early research to final implementation.</p>
                    </article>
                </div>
            </section>

            <section className="ribbon-bottom">
                <div className="ribbon-bottom-block">
                    <span>02</span>
                    <h2>Education</h2>
                    <h3>BA, Visual Communication</h3>
                    <p>National Academy of Art</p>
                    <small>2017 — 2021</small>
                </div>

                <div className="ribbon-bottom-block ribbon-dark-block">
                    <span>03</span>
                    <h2>Skills</h2>
                    <p>Product strategy</p>
                    <p>UX research</p>
                    <p>UI design</p>
                    <p>Design systems</p>
                    <p>Prototyping</p>
                    <p>Figma</p>
                </div>

                <div className="ribbon-bottom-block ribbon-bottom-block-last">
                    <span>04</span>
                    <h2>Languages</h2>
                    <p>Bulgarian Native</p>
                    <p>English C1</p>

                    <h2 className="ribbon-project-title">Selected project</h2>
                    <h3>Civic Path</h3>
                    <p>A service-design concept that simplifies municipal processes.</p>
                </div>
            </section>
        </article>
    );
}

export default RibbonTemplate;
