import "./HomePage.css";
import { useEffect, useState } from "react";
import MainNavbarShell from "../../components/folder-navbar/MainNavbarShell";
import * as Icons from "../../folder-lucide-icons/lucide-icons";
function GoToCVTemplates() {
    window.location.href = "/cv-templates";
}
function HomePage() {
    const [openQuestion, setOpenQuestion] = useState(0);
    useEffect(() => {
        if (window.location.hash === "#why-free") {
            window.requestAnimationFrame(() => {
                document.getElementById("why-free")?.scrollIntoView({
                    behavior: "smooth",
                });
            });
        }
    }, []);
    function ToggleQuestion(index) {
        if (openQuestion === index) {
            setOpenQuestion(-1);
        } else {
            setOpenQuestion(index);
        }
    }
    let pdfQuestionClassName;
    if (openQuestion === 0) {
        pdfQuestionClassName = "home-faq-questions workspace-menu-open";
    } else {
        pdfQuestionClassName = "home-faq-questions";
    }
    let storageQuestionClassName;
    if (openQuestion === 1) {
        storageQuestionClassName = "home-faq-questions workspace-menu-open";
    } else {
        storageQuestionClassName = "home-faq-questions";
    }
    let accountQuestionClassName;
    if (openQuestion === 2) {
        accountQuestionClassName = "home-faq-questions workspace-menu-open";
    } else {
        accountQuestionClassName = "home-faq-questions";
    }
    let atsQuestionClassName;
    if (openQuestion === 3) {
        atsQuestionClassName = "home-faq-questions workspace-menu-open";
    } else {
        atsQuestionClassName = "home-faq-questions";
    }
    return (
        <MainNavbarShell>
            <section className="home-hero">
                <span className="site-intro-label">
                    <Icons.CircleCheckLucideIcon className="site-intro-icon" /> Free from first edit to final PDF
                </span>

                <h1>
                    A CV that feels like <span className="home-hero-highlight">you.</span>
                    <br />A builder that stays out of your way.
                </h1>
                <br />
                <p>
                    Create a polished CV, motivation letter and application documents without accounts, watermarks or
                    last-minute payments.
                </p>

                <button type="button" onClick={GoToCVTemplates}>
                    <Icons.LayoutTemplateLucideIcon className="workspace-action-icon" /> Explore templates
                </button>

                <span className="home-hero-benefit home-hero-benefit-registration">
                    <Icons.CheckLucideIcon className="workspace-action-icon" /> No registration
                </span>
                <span className="home-hero-benefit home-hero-benefit-pdfs">
                    <Icons.CheckLucideIcon className="workspace-action-icon" /> Unlimited PDFs
                </span>
                <span className="home-hero-benefit home-hero-benefit-local">
                    <Icons.CheckLucideIcon className="workspace-action-icon" /> Saved locally
                </span>
            </section>

            <section className="home-showcase">
                <div className="home-showcase-up">
                    <span>1</span>Write naturally
                </div>
                <div className="home-showcase-middle">
                    <header>
                        <div className="home-showcase-logo"></div>
                        <i className="showcase-header-line"></i>
                        <i className="showcase-header-line"></i>
                        <div className="home-showcase-button">Download</div>
                    </header>
                    <main>
                        <span className="home-showcase-eyebrow">Your details</span>
                        <p className="home-showcase-paragraph">Nice to meet you, Maya</p>
                        <label>
                            Professional title
                            <span className="showcase-input-short">Product Designer</span>
                        </label>
                        <label>
                            About you
                            <span className="home-showcase-input-long">
                                I design useful digital products with care for people and details.
                            </span>
                        </label>
                    </main>
                    <aside>
                        <div className="home-showcase-vizualization">
                            <i className="home-visualization-intro-line"></i>

                            <span className="home-visualization-name">Maya Petrova</span>
                            <span className="home-visualization-role">Product Designer</span>

                            <i className="home-visualization-section-line"></i>
                            <i className="home-visualization-full-line"></i>
                            <i className="home-visualization-wide-line"></i>

                            <i className="home-visualization-section-line home-visualization-section-line-last"></i>
                            <i className="home-visualization-full-line home-visualization-full-line-last"></i>
                            <i className="home-visualization-short-line"></i>
                            <i className="home-visualization-final-line"></i>
                        </div>
                    </aside>
                </div>
                <div className="home-showcase-down">
                    <span>2</span>See every change live
                </div>
            </section>

            <section className="home-product-promises">
                <div className="home-product-promise home-product-promise-first">
                    <Icons.LockKeyholeLucideIcon className="workspace-action-icon" />
                    <span>
                        <strong>Private by default</strong>
                        <small>Your CV stays on your device</small>
                    </span>
                </div>
                <div className="home-product-promise home-product-promise-second">
                    <Icons.DownloadLucideIcon className="workspace-action-icon" />
                    <span>
                        <strong>Actually free PDF</strong>
                        <small>No watermark, no checkout</small>
                    </span>
                </div>
                <div className="home-product-promise product-promise-third">
                    <Icons.RotateCcwLucideIcon className="workspace-action-icon" />
                    <span>
                        <strong>Always recoverable</strong>
                        <small>Autosave and editable backup</small>
                    </span>
                </div>
                <div className="home-product-promise home-product-promise-last">
                    <Icons.FileCheck2LucideIcon className="workspace-action-icon" />
                    <span>
                        <strong>Ready for recruiters</strong>
                        <small>Clean, consistent layout</small>
                    </span>
                </div>
            </section>

            <section className="home-templates-showcase">
                <span className="site-intro-label">
                    <Icons.CircleCheckLucideIcon className="site-intro-icon" />
                    Made for real applications
                </span>
                <h2>Start with a style that fits your story.</h2>
                <p>Every template is fully editable. Change it later without losing a single word.</p>
                <button type="button" className="cv-templates home-text-link" onClick={GoToCVTemplates}>
                    See all original templates <Icons.ArrowRightLucideIcon className="workspace-action-icon" />
                </button>
            </section>

            <section className="home-process-section">
                <div className="home-process-copy">
                    <span className="site-intro-label">
                        <Icons.CircleCheckLucideIcon className="site-intro-icon" />A calmer way to apply
                    </span>
                    <h3>From blank page to ready-to-send in four clear steps.</h3>
                    <p>You always know where you are, what is missing and what the final document will look like.</p>
                </div>
                <aside>
                    <ol className="home-process-list">
                        <li>
                            <span>01</span>
                            <div>
                                <strong>Choose your direction</strong>
                                <p>Pick a template by profession or visual style.</p>
                                <hr></hr>
                            </div>
                        </li>
                        <li>
                            <span>02</span>
                            <div>
                                <strong>Tell your story</strong>
                                <p>Add only the sections that help your application.</p>
                                <hr></hr>
                            </div>
                        </li>
                        <li>
                            <span>03</span>
                            <div>
                                <strong>Make it yours</strong>
                                <p>Adjust typography, spacing and color while previewing live.</p>
                                <hr></hr>
                            </div>
                        </li>
                        <li>
                            <span>04</span>
                            <div>
                                <strong>Download and apply</strong>
                                <p>Get a clean PDF immediately. No surprise screen.</p>
                                <hr></hr>
                            </div>
                        </li>
                    </ol>
                </aside>
            </section>

            <section id="why-free" className="why-free home-freedom-section">
                <div className="home-freedom-mark">
                    <strong>Free</strong>
                    <small>means free</small>
                </div>
                <div className="freedom-context home-freedom-copy">
                    <p className="site-intro-label home-freedom-kicker">
                        <Icons.CheckCircleLucideIcon className="site-intro-icon" /> Your work belongs to you
                    </p>
                    <h3>The download button should not be a trap!</h3>
                    <p>
                        MyPrimeCV is built around a simple promise: you can finish the job you came here to do. Your
                        documents stay local, every core tool is available, and the exported file is yours.
                    </p>
                    <div className="home-freedom-points">
                        <span>
                            <Icons.CheckLucideIcon className="workspace-action-icon" />
                            Unlimited resumes
                        </span>
                        <span>
                            <Icons.CheckLucideIcon className="workspace-action-icon" />
                            Unlimited motivation letters
                        </span>
                        <span>
                            <Icons.CheckLucideIcon className="workspace-action-icon" />
                            Variety of templates
                        </span>
                        <span>
                            <Icons.CheckLucideIcon className="workspace-action-icon" />
                            Editable backups
                        </span>
                    </div>
                </div>
            </section>

            <section className="home-faq-section">
                <div className="home-faq-section-intro">
                    <span className="site-intro-label">
                        <Icons.CheckCircleLucideIcon className="site-intro-icon" /> Good to know
                    </span>
                    <h4>Clear answers, before you begin.</h4>
                </div>
                <aside className="home-faq-list">
                    <hr></hr>
                    <button
                        type="button"
                        className={pdfQuestionClassName}
                        aria-expanded={openQuestion === 0}
                        onClick={() => ToggleQuestion(0)}
                    >
                        <span>Is PDF download really free?</span>
                        <Icons.ChevronDownLucideIcon className="workspace-action-icon" />
                        <p>
                            Yes. PDF export, templates, colors and unlimited local documents stay free. There is no
                            checkout hidden behind the download button.
                        </p>
                    </button>
                    <hr></hr>
                    <button
                        type="button"
                        className={storageQuestionClassName}
                        aria-expanded={openQuestion === 1}
                        onClick={() => ToggleQuestion(1)}
                    >
                        <span>Where is my CV saved?</span>
                        <Icons.ChevronDownLucideIcon className="workspace-action-icon" />
                        <p>
                            Your documents are saved in this browser on this device. You can export an editable backup
                            whenever you want.
                        </p>
                    </button>
                    <hr></hr>
                    <button
                        type="button"
                        className={accountQuestionClassName}
                        aria-expanded={openQuestion === 2}
                        onClick={() => ToggleQuestion(2)}
                    >
                        <span>Do I need an account?</span>
                        <Icons.ChevronDownLucideIcon className="workspace-action-icon" />
                        <p>
                            No. You can create, reopen and download your documents without an email, password or
                            registration.
                        </p>
                    </button>
                    <hr></hr>
                    <button
                        type="button"
                        className={atsQuestionClassName}
                        aria-expanded={openQuestion === 3}
                        onClick={() => ToggleQuestion(3)}
                    >
                        <span>Will it work with ATS systems?</span>
                        <Icons.ChevronDownLucideIcon className="workspace-action-icon" />
                        <p>
                            The ATS template family uses standard headings, restrained layouts and a clear reading
                            order. Always test the final PDF with the employer's application portal.
                        </p>
                    </button>
                </aside>
            </section>

            <footer className="home-footer-section">
                <div>
                    <span className="site-intro-label">
                        <Icons.CheckCircleLucideIcon className="site-intro-icon" />
                        Ready when you are
                    </span>
                    <h5>Make something you are proud to send!</h5>
                </div>
            </footer>
        </MainNavbarShell>
    );
}
export default HomePage;
