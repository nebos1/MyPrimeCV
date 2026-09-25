import * as Icons from "../../folder-lucide-icons/lucide-icons";
export const SectionConfig = [
    {
        key: "SenderBlock",
        title: "Sender block",
        subtitle: "Your details at the top",
        icon: Icons.UserRoundLucideIcon,
        fields: [
            { key: "first_name", label: "First name", type: "text" },
            { key: "last_name", label: "Last name", type: "text" },
            { key: "professional_title", label: "Professional title", type: "text", wide: true },
            { key: "email", label: "Email", type: "email" },
            { key: "phone", label: "Phone", type: "text" },
            { key: "city", label: "City", type: "text" },
            { key: "country", label: "Country", type: "text" },
        ],
    },
    {
        key: "RecipientBlock",
        title: "Recipient block",
        subtitle: "Hiring manager, company and address",
        icon: Icons.BriefcaseBusinessLucideIcon,
        fields: [
            { key: "hiring_manager", label: "Hiring manager", type: "text" },
            { key: "company", label: "Company", type: "text" },
            { key: "company_address", label: "Company address", type: "textarea", wide: true },
            { key: "date", label: "Date", type: "date", wide: true },
        ],
    },
    {
        key: "IntroductionBlock",
        title: "Subject and greeting",
        subtitle: "The opening lines",
        icon: Icons.MailLucideIcon,
        fields: [
            { key: "subject", label: "Subject / Re", type: "text", wide: true },
            { key: "greetings", label: "Greeting", type: "text", wide: true },
        ],
    },
    {
        key: "BodyParagraphBlock",
        title: "Body paragraphs",
        icon: Icons.FileTextLucideIcon,
        type: "paragraphs",
    },
    {
        key: "ClosingBlock",
        title: "Closing",
        subtitle: "Sign off professionally",
        icon: Icons.MailLucideIcon,
        fields: [
            { key: "closing_remarks", label: "Closing", type: "text", wide: true },
            { key: "signature", label: "Signature name", type: "text", wide: true },
        ],
    },
];
