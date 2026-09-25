import React from "react";
import "./halo.css";

function HaloTemplate() {
    return (
        <article className="halo-template">
            <header className="halo-header">
                <div className="halo-ring">
                    <span>Maya</span>
                    <strong>Petrova</strong>
                    <small>Product Designer</small>
                </div>

                <div className="halo-contact">
                    <span>Sofia, Bulgaria</span>
                    <span>maya.petrova@email.com</span>
                    <span>+359 88 123 4567</span>
                    <span>maya-petrova.design</span>
                </div>
            </header>

            <section className="halo-profile">
                <h2>Profile</h2>
                <p>Product designer focused on clear, useful and human-centered digital experiences. I combine research, visual design and close collaboration with development teams.</p>
            </section>

            <div className="halo-columns">
                <section className="halo-left">
                    <h2>Experience</h2>

                    <article className="halo-job">
                        <span>2023 — Present</span>
                        <h3>Senior Product Designer</h3>
                        <strong>Northline Studio</strong>
                        <p>Led product discovery, interaction design and design-system work across multiple SaaS products.</p>
                        <ul>
                            <li>Improved onboarding completion by 28%.</li>
                            <li>Built a shared component library for three products.</li>
                        </ul>
                    </article>

                    <article className="halo-job">
                        <span>2021 — 2023</span>
                        <h3>Product Designer</h3>
                        <strong>Bright Labs</strong>
                        <p>Designed responsive web and mobile products from early research to final implementation.</p>
                    </article>
                </section>

                <section className="halo-center">
                    <div className="halo-center-line"></div>
                    <span className="halo-dot halo-dot-one"></span>
                    <span className="halo-dot halo-dot-two"></span>
                    <span className="halo-dot halo-dot-three"></span>
                </section>

                <aside className="halo-right">
                    <section>
                        <h2>Education</h2>
                        <h3>BA, Visual Communication</h3>
                        <p>National Academy of Art</p>
                        <small>2017 — 2021</small>
                    </section>

                    <section>
                        <h2>Skills</h2>
                        <p>Product strategy</p>
                        <p>UX research</p>
                        <p>UI design</p>
                        <p>Design systems</p>
                        <p>Prototyping</p>
                        <p>Figma</p>
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

export default HaloTemplate;
