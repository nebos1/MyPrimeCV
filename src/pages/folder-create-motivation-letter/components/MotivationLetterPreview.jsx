import "./MotivationLetterPreview.css";

import { FormatDate } from "../motivation-letter-date";
import { MakeTextStyle } from "../motivation-letter-style";

function StyledSpan({ value, style }) {
    if (!value?.trim()) {
        return null;
    }

    return <span style={MakeTextStyle(style)}>{value}</span>;
}

function PreviewBlock({ value, style }) {
    if (!value?.trim()) {
        return null;
    }

    const textStyle = MakeTextStyle(style);
    const listStyle = style.listStyle ?? "none";
    const lines = value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    if (listStyle !== "none") {
        let ListTag;
        if (listStyle === "decimal") {
            ListTag = "ol";
        } else {
            ListTag = "ul";
        }

        return (
            <ListTag className="letter-preview-list" style={Object.assign({}, textStyle, { listStyleType: listStyle })}>
                {lines.map((line, index) => (
                    <li key={`${line}-${index}`}>{line}</li>
                ))}
            </ListTag>
        );
    }

    return <p style={textStyle}>{value}</p>;
}

function MotivationLetterPreview({ data }) {
    const values = data.values;
    const styles = data.styles;
    const dateValue = FormatDate(values.RecipientBlock.date, values.RecipientBlock.date_format);
    const hasName = Boolean(values.SenderBlock.first_name || values.SenderBlock.last_name);
    const hasHeader = Object.values(values.SenderBlock)
        .concat([
            values.RecipientBlock.hiring_manager,
            values.RecipientBlock.company,
            values.RecipientBlock.company_address,
        ])
        .some((value) => value?.trim());
    const hasOpening = Boolean(dateValue || values.IntroductionBlock.subject || values.IntroductionBlock.greetings);
    const hasBody = values.BodyParagraphBlock.paragraphs.some((value) => value.trim());
    const hasClosing = Boolean(values.ClosingBlock.closing_remarks || values.ClosingBlock.signature);
    let nameSeparator = "";
    if (values.SenderBlock.first_name && values.SenderBlock.last_name) {
        nameSeparator = " ";
    }

    return (
        <article className="letter-preview-document">
            {hasHeader && (
                <header className="letter-preview-top">
                    <div className="letter-preview-recipient">
                        <PreviewBlock
                            value={values.RecipientBlock.hiring_manager}
                            style={styles.RecipientBlock.hiring_manager}
                        />
                        <PreviewBlock value={values.RecipientBlock.company} style={styles.RecipientBlock.company} />
                        <PreviewBlock
                            value={values.RecipientBlock.company_address}
                            style={styles.RecipientBlock.company_address}
                        />
                    </div>

                    <div className="letter-preview-sender">
                        {hasName && (
                            <p className="preview-inline-line">
                                <StyledSpan
                                    value={values.SenderBlock.first_name}
                                    style={styles.SenderBlock.first_name}
                                />
                                {nameSeparator}
                                <StyledSpan value={values.SenderBlock.last_name} style={styles.SenderBlock.last_name} />
                            </p>
                        )}
                        <PreviewBlock
                            value={values.SenderBlock.professional_title}
                            style={styles.SenderBlock.professional_title}
                        />
                        <PreviewBlock value={values.SenderBlock.phone} style={styles.SenderBlock.phone} />
                        <PreviewBlock value={values.SenderBlock.email} style={styles.SenderBlock.email} />
                        <PreviewBlock value={values.SenderBlock.city} style={styles.SenderBlock.city} />
                        <PreviewBlock value={values.SenderBlock.country} style={styles.SenderBlock.country} />
                    </div>
                </header>
            )}

            {hasOpening && (
                <div className="letter-preview-opening">
                    <PreviewBlock value={dateValue} style={styles.RecipientBlock.date} />
                    <PreviewBlock value={values.IntroductionBlock.subject} style={styles.IntroductionBlock.subject} />
                    <PreviewBlock
                        value={values.IntroductionBlock.greetings}
                        style={styles.IntroductionBlock.greetings}
                    />
                </div>
            )}

            {hasBody && (
                <div className="letter-preview-body">
                    {values.BodyParagraphBlock.paragraphs.map((paragraph, index) => (
                        <PreviewBlock
                            key={`preview-paragraph-${index}`}
                            value={paragraph}
                            style={styles.BodyParagraphBlock.paragraphs[index]}
                        />
                    ))}
                </div>
            )}

            {hasClosing && (
                <div className="letter-preview-closing">
                    <PreviewBlock
                        value={values.ClosingBlock.closing_remarks}
                        style={styles.ClosingBlock.closing_remarks}
                    />
                    <PreviewBlock value={values.ClosingBlock.signature} style={styles.ClosingBlock.signature} />
                </div>
            )}
        </article>
    );
}

export default MotivationLetterPreview;
