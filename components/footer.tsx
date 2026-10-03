import { ArrowUp, ArrowUpRight, Sparkles } from "lucide-react";
import { copy, profile } from "@/data/projects";
import { ContactLink } from "./contact-link";
export function Footer() {
  return (
    <>
      <section
        id="contact"
        className="container contact-section"
        aria-labelledby="contact-title"
      >
        <div className="contact-panel glass">
          <div className="contact-glow" />
          <div className="contact-orbit" />
          <div className="contact-content">
            <span className="availability">
              <span className="status-dot" />
              {copy.status}
            </span>
            <p className="eyebrow">{copy.contactSection.eyebrow}</p>
            <h2 id="contact-title">
              {copy.contactSection.title}
              <br />
              <span className="gradient-text">
                {copy.contactSection.accent}
              </span>
            </h2>
            <p className="contact-description">
              {copy.contactSection.description}
            </p>
            <ContactLink source="footer" />
            <p className="contact-note">
              {profile.telegram
                ? copy.contactSection.note
                : copy.contactSection.unavailable}
            </p>
          </div>
          <Sparkles className="contact-spark" size={40} strokeWidth={1} />
        </div>
      </section>
      <footer className="container footer">
        <a className="footer-brand" href="#home">
          {profile.name}
          <span>© {new Date().getFullYear()}</span>
        </a>
        <p>{copy.footer.note}</p>
        <a href="#home">
          {copy.footer.toTop}
          <ArrowUp size={14} />
        </a>
      </footer>
      <a
        href={profile.telegram || "#contact"}
        target={profile.telegram ? "_blank" : undefined}
        rel={profile.telegram ? "noopener noreferrer" : undefined}
        className="quick-contact glass"
        aria-label={copy.contact}
      >
        <span className="status-dot" />
        <span>{copy.quickContact}</span>
        <ArrowUpRight size={15} />
      </a>
    </>
  );
}
