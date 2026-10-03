import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronRight,
  Database,
  Globe2,
  Send,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import type { Project } from "@/data/projects";
export function ProjectPreview({ project }: { project: Project }) {
  const { visual, preview } = project;
  return (
    <div className={`project-preview preview-${visual}`} aria-hidden="true">
      {visual === "website" && (
        <div className="mini-browser">
          <div className="browser-bar">
            <span />
            <span />
            <span />
            <i>{preview.brand.toLowerCase()}</i>
          </div>
          <div className="mini-site">
            <header>
              <b>{preview.brand}</b>
              <div />
              <span>
                <ArrowUpRight size={11} />
              </span>
            </header>
            <div className="mini-site-copy">
              <small>{preview.detail}</small>
              <h4>{preview.heading}</h4>
              <span className="mini-cta">
                <ArrowUpRight size={13} />
              </span>
            </div>
            <div className="architecture">
              <div />
              <div />
              <div />
              <div />
            </div>
            <footer>
              <span>01 — 03</span>
              <span>↗</span>
            </footer>
          </div>
        </div>
      )}
      {visual === "agent" && (
        <>
          <div className="agent-orbit" />
          <div className="agent-spark">
            <Sparkles size={27} />
          </div>
          <div className="agent-window">
            <div className="agent-heading">
              <span>
                <Bot size={17} />
              </span>
              <b>{preview.brand}</b>
              <i />
            </div>
            <div className="chat-line user-line">
              <span />
              <span />
            </div>
            <div className="chat-line agent-line">
              <span />
              <span />
              <span />
            </div>
            <div className="agent-answer">
              <Sparkles size={12} />
              {preview.heading}
            </div>
            <div className="agent-footer">
              <span className="status-dot" />
              {preview.detail}
              <Check size={12} />
            </div>
          </div>
        </>
      )}
      {visual === "workflow" && (
        <>
          <div className="workflow-grid" />
          <div className="workflow-label">
            {preview.brand}
            <span>
              <i /> LIVE
            </span>
          </div>
          <div className="workflow-nodes">
            <span>
              <Globe2 />
            </span>
            <i />
            <span className="workflow-central">
              <Workflow />
            </span>
            <i />
            <span>
              <Database />
            </span>
          </div>
          <div className="workflow-branch">
            <div />
            <span>
              <Send size={15} />
            </span>
          </div>
          <div className="workflow-caption">
            <span className="status-dot" />
            {preview.heading}
          </div>
        </>
      )}
      {visual === "landing" && (
        <div className="landing-window">
          <header>
            <strong>{preview.brand}</strong>
            <ArrowUpRight size={14} />
          </header>
          <div className="landing-orb" />
          <h4>{preview.heading}</h4>
          <p>{preview.detail}</p>
          <span className="landing-pill">
            <ArrowUpRight size={15} />
          </span>
        </div>
      )}
      {visual === "bot" && (
        <>
          <div className="bot-halo" />
          <div className="phone">
            <div className="phone-notch" />
            <header>
              <span>
                <Send size={14} />
              </span>
              <strong>{preview.brand}</strong>
            </header>
            <div className="phone-message">
              <strong>{preview.heading}</strong>
              <p>{preview.detail}</p>
            </div>
            <div className="phone-options">
              <span>
                <Zap size={12} />
                <ChevronRight size={12} />
              </span>
              <span>
                <Database size={12} />
                <ChevronRight size={12} />
              </span>
              <span>
                <Bot size={12} />
                <ChevronRight size={12} />
              </span>
            </div>
            <div className="phone-input">
              <i />
              <Send size={12} />
            </div>
          </div>
          <div className="bot-floating">
            <Check size={15} />
          </div>
        </>
      )}
      {visual === "quest" && (
        <>
          <div className="quest-grid" />
          <div className="quest-label">{preview.brand}</div>
          <div className="quest-island">
            <div className="quest-cube cube-one" />
            <div className="quest-cube cube-two" />
            <div className="quest-cube cube-three" />
            <div className="quest-coin">
              <Sparkles size={22} />
            </div>
            <div className="quest-path" />
          </div>
          <div className="quest-caption">
            {preview.detail}
            <ArrowUpRight size={14} />
          </div>
        </>
      )}
    </div>
  );
}
