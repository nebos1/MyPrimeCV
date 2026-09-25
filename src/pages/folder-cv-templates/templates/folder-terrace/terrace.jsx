import "./terrace.css";

function TerraceTemplate() {
    return (
        <article className="terrace-template">
            <header className="terrace-header">
                <div className="terrace-initials">MP</div>

                <div>
                    <h1>Maya Petrova</h1>
                    <p>Product Designer</p>
                </div>

                <div className="terrace-contact">
                    <span>Sofia, Bulgaria</span>
                    <span>maya.petrova@email.com</span>
                    <span>+359 88 123 4567</span>
                </div>
            </header>

            <section className="terrace-step terrace-step-profile">
                <div className="terrace-number">00</div>
                <div>
                    <h2>Professional summary</h2>
                    <p>Product designer focused on clear, useful and human-centered digital experiences. I combine research, visual design and close collaboration with development teams.</p>
                </div>
            </section>

            <section className="terrace-step terrace-step-experience">
                <div className="terrace-number">01</div>

                <div>
                    <h2>Employment history</h2>

                    <article className="terrace-job">
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

                    <article className="terrace-job">
                        <div>
                            <h3>Product Designer</h3>
                            <span>Bright Labs</span>
                        </div>
                        <small>2021 — 2023</small>
                        <p>Designed responsive web and mobile products from early research to final implementation.</p>
                    </article>
                </div>
            </section>

            <section className="terrace-step terrace-step-education">
                <div className="terrace-number">02</div>

                <div>
                    <h2>Education</h2>

                    <div className="terrace-row">
                        <div>
                            <h3>BA, Visual Communication</h3>
                            <span>National Academy of Art</span>
                        </div>
                        <small>2017 — 2021</small>
                    </div>
                </div>
            </section>

            <section className="terrace-step terrace-step-skills">
                <div className="terrace-number">03</div>

                <div>
                    <h2>Skills</h2>

                    <div className="terrace-skills">
                        <span>Product strategy</span>
                        <span>UX research</span>
                        <span>UI design</span>
                        <span>Design systems</span>
                        <span>Prototyping</span>
                        <span>Figma</span>
                    </div>
                </div>
            </section>

            <section className="terrace-step terrace-step-project">
                <div className="terrace-number">04</div>

                <div>
                    <h2>Selected project</h2>
                    <h3>Civic Path</h3>
                    <p>A service-design concept that simplifies municipal processes through clearer language and fewer steps.</p>

                    <div className="terrace-meta">
                        <span>Bulgarian Native</span>
                        <span>English C1</span>
                        <span>maya-petrova.design</span>
                    </div>
                </div>
            </section>
        </article>
    );
}

export default TerraceTemplate;
