import React from "react";
import "./mosaic.css";

function MosaicTemplate() {
    return (
        <article className="mosaic-template">
            <section className="mosaic-name-card">
                <h1>Maya Petrova</h1>
                <p>Product Designer</p>
            </section>

            <section className="mosaic-contact-card">
                <h2>Contact</h2>
                <p>Sofia, Bulgaria</p>
                <p>maya.petrova@email.com</p>
                <p>+359 88 123 4567</p>
                <p>maya-petrova.design</p>
            </section>

            <section className="mosaic-profile-card">
                <h2>Profile</h2>
                <p>Product designer focused on clear, useful and human-centered digital experiences. I combine research, visual design and close collaboration with development teams.</p>
            </section>

            <section className="mosaic-highlight-card">
                <span>Selected impact</span>
                <strong>28%</strong>
                <p>increase in onboarding completion.</p>
            </section>

            <section className="mosaic-experience-card">
                <h2>Experience</h2>

                <article>
                    <div>
                        <h3>Senior Product Designer</h3>
                        <span>Northline Studio</span>
                    </div>
                    <small>2023 — Present</small>
                    <p>Led product discovery, interaction design and design-system work across multiple SaaS products.</p>
                    <ul>
                        <li>Built a shared component library for three products.</li>
                        <li>Worked directly with product, development and QA.</li>
                    </ul>
                </article>

                <article>
                    <div>
                        <h3>Product Designer</h3>
                        <span>Bright Labs</span>
                    </div>
                    <small>2021 — 2023</small>
                    <p>Designed responsive web and mobile products from early research to final implementation.</p>
                </article>
            </section>

            <section className="mosaic-skills-card">
                <h2>Skills</h2>
                <span>Product strategy</span>
                <span>UX research</span>
                <span>UI design</span>
                <span>Design systems</span>
                <span>Prototyping</span>
                <span>Figma</span>
            </section>

            <section className="mosaic-education-card">
                <h2>Education</h2>
                <h3>BA, Visual Communication</h3>
                <p>National Academy of Art</p>
                <small>2017 — 2021</small>
            </section>

            <section className="mosaic-project-card">
                <h2>Selected project</h2>
                <h3>Civic Path</h3>
                <p>A service-design concept that simplifies municipal processes through clearer language and fewer steps.</p>
            </section>

            <section className="mosaic-language-card">
                <h2>Languages</h2>
                <p>Bulgarian Native</p>
                <p>English C1</p>
            </section>
        </article>
    );
}

export default MosaicTemplate;
