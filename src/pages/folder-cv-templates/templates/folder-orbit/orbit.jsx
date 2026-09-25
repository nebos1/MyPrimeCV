import React from "react";
import "./orbit.css";

function OrbitTemplate() {
    return (
        <article className="orbit-template">
            <header className="orbit-header">
                <div className="orbit-mark">
                    <span>MP</span>
                </div>

                <div className="orbit-heading">
                    <h1>Maya Petrova</h1>
                    <p>Product Designer</p>
                </div>

                <div className="orbit-contact">
                    <span>Sofia, Bulgaria</span>
                    <span>maya.petrova@email.com</span>
                    <span>+359 88 123 4567</span>
                    <span>maya-petrova.design</span>
                </div>
            </header>

            <section className="orbit-profile">
                <span>Profile</span>
                <p>Product designer focused on clear, useful and human-centered digital experiences. I combine research, visual design and close collaboration with development teams.</p>
            </section>

            <div className="orbit-layout">
                <main className="orbit-main">
                    <section className="orbit-section">
                        <div className="orbit-section-title">
                            <span>01</span>
                            <h2>Employment history</h2>
                        </div>

                        <article className="orbit-job">
                            <div className="orbit-job-date">2023 — Present</div>

                            <div>
                                <h3>Senior Product Designer</h3>
                                <strong>Northline Studio</strong>
                                <p>
                                    Led product discovery, interaction design and
                                    design-system work across multiple SaaS products.
                                </p>
                                <ul>
                                    <li>Improved onboarding completion by 28%.</li>
                                    <li>Built a shared component library for three products.</li>
                                    <li>Worked directly with product, development and QA.</li>
                                </ul>
                            </div>
                        </article>

                        <article className="orbit-job">
                            <div className="orbit-job-date">2021 — 2023</div>

                            <div>
                                <h3>Product Designer</h3>
                                <strong>Bright Labs</strong>
                                <p>Designed responsive web and mobile products from early research to final implementation.</p>
                                <ul>
                                    <li>Created interactive prototypes and user flows.</li>
                                    <li>Introduced lightweight usability testing.</li>
                                </ul>
                            </div>
                        </article>
                    </section>

                    <section className="orbit-section">
                        <div className="orbit-section-title">
                            <span>02</span>
                            <h2>Education</h2>
                        </div>

                        <div className="orbit-education">
                            <div>
                                <h3>BA, Visual Communication</h3>
                                <strong>National Academy of Art</strong>
                            </div>
                            <small>2017 — 2021</small>
                        </div>
                    </section>
                </main>

                <aside className="orbit-sidebar">
                    <section>
                        <h2>Skills</h2>
                        <div className="orbit-pills">
                            <span>Product strategy</span>
                            <span>UX research</span>
                            <span>UI design</span>
                            <span>Design systems</span>
                            <span>Prototyping</span>
                            <span>Figma</span>
                        </div>
                    </section>

                    <section>
                        <h2>Languages</h2>
                        <p>Bulgarian Native</p>
                        <p>English C1</p>
                    </section>

                    <section>
                        <h2>Selected project</h2>
                        <h3>Civic Path</h3>
                        <p>A service-design concept that simplifies municipal processes through clearer language and fewer steps.</p>
                    </section>
                </aside>
            </div>
        </article>
    );
}

export default OrbitTemplate;
