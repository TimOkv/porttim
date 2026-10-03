import { cn } from "@/lib/utils";

export interface SectionHeadingContent {
  eyebrow: string;
  title: string;
}

export interface SectionHeadingProps {
  content: SectionHeadingContent;
  /** `id` заголовка — для `aria-labelledby` у секции. */
  id?: string;
  className?: string;
}

export function SectionHeading({
  content,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 flex flex-col gap-3", className)}>
      <p className="font-mono text-sm uppercase tracking-widest text-blue-600">
        {content.eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-bold text-slate-900 sm:text-4xl">
        {content.title}
      </h2>
    </div>
  );
}
