import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  children,
  className
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8", className)}>
      {(eyebrow || title) && (
        <div className="mb-6">
          {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">{eyebrow}</p>}
          {title && <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>}
        </div>
      )}
      {children}
    </section>
  );
}
