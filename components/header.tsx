import { copy, profile } from "@/data/projects";
import { ContactLink } from "./contact-link";
export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#home"
          className="brand"
          aria-label={`${profile.name} — ${copy.footer.toTop}`}
        >
          <span className="brand-icon">
            {copy.brandMark}
            <span>.</span>
          </span>
          <span>
            {profile.name}
            <small>{profile.role}</small>
          </span>
        </a>
        <nav aria-label={copy.navigation}>
          {copy.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <ContactLink compact />
      </div>
    </header>
  );
}
