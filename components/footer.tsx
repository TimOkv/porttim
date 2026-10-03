import { ArrowUp, Send } from "lucide-react";
import { copy, profile } from "@/data/projects";
import { delay } from "@/lib/utils";
import { ContactLink } from "./contact-link";
export function Footer() {
  return (
    <>
      <section
        id="contact"
        className="contact-section"
        aria-labelledby="contact-title"
      >
        <div className="container">
          <p className="eyebrow reveal">{copy.contactSection.eyebrow}</p>
          <h2 id="contact-title" className="display reveal" style={delay(1)}>
            {copy.contactSection.title}{" "}
            <span className="stroke-text">{copy.contactSection.accent}</span>
          </h2>
          <p className="contact-description reveal" style={delay(2)}>
            {profile.telegram || profile.max
              ? copy.contactSection.description
              : copy.contactSection.unavailable}
          </p>
          <div className="contact-actions reveal" style={delay(3)}>
            {profile.telegram && <ContactLink source="footer" />}
            {profile.max && (
              <a
                className="button-ghost"
                href={profile.max}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.contactMax}
              </a>
            )}
          </div>
        </div>
      </section>
      <footer className="container footer">
        <a className="footer-brand" href="#home">
          {profile.name}
          <span>© {new Date().getFullYear()}</span>
        </a>
        <p>{copy.footer.rights}</p>
        <a href="#home">
          {copy.footer.toTop}
          <ArrowUp size={14} aria-hidden="true" />
        </a>
      </footer>
      <div className="quick-links">
        {profile.max && (
          <a
            href={profile.max}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-max"
            aria-label={copy.contactMax}
          >
            {copy.quickMax}
          </a>
        )}
        <a
          href={profile.telegram || "#contact"}
          target={profile.telegram ? "_blank" : undefined}
          rel={profile.telegram ? "noopener noreferrer" : undefined}
          className="quick-contact"
          aria-label={copy.contact}
        >
          <span>{copy.quickContact}</span>
          <Send size={22} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
