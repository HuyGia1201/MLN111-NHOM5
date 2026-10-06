import type { BookPage as Page } from "@/data/bookPages";
import { BlockRenderer, IllustrativeTag } from "./BlockRenderer";

export const PAGE_W = 540;
export const PAGE_H = 760;

export function BookCover({ page }: { page: Page }) {
  return (
    <div className="cover cover-spine pg relative flex h-full w-full flex-col justify-between overflow-hidden p-[3em]">
      <svg viewBox="0 0 400 400" className="pointer-events-none absolute -right-[20%] top-[18%] w-[95%] opacity-[0.22]" aria-hidden>
        <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 5" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <rect key={i} x={200 + Math.cos(a) * 160 - 6} y={200 + Math.sin(a) * 160 - 6} width="12" height="12" fill="currentColor" transform={`rotate(${(a * 180) / Math.PI} ${200 + Math.cos(a) * 160} ${200 + Math.sin(a) * 160})`} />
          );
        })}
        {/* abstract human figure split from itself */}
        <circle cx="185" cy="140" r="22" fill="currentColor" />
        <path d="M150 300 L165 185 Q185 170 205 185 L220 300" fill="currentColor" />
        <circle cx="240" cy="150" r="22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M205 310 L220 195 Q240 180 260 195 L275 310" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
      <div className="relative">
        <div className="pg-kicker" style={{ color: "var(--metal)" }}>MLN111 · Triết học</div>
        <div className="mt-[0.5em] h-[2px] w-[4em] bg-[var(--burgundy)]" />
      </div>
      <div className="relative">
        <div className="font-[family-name:var(--font-display)] text-[4.4em] font-bold leading-none text-[var(--metal)]">3.5.2.</div>
        <h1 className="mt-[0.4em] font-[family-name:var(--font-display)] text-[2.6em] font-bold uppercase leading-[1.05]">
          Hiện tượng <span className="italic text-[oklch(0.75_0.1_30)]">tha hóa</span> con người
        </h1>
        <p className="mt-[0.6em] font-[family-name:var(--font-display)] text-[1.5em] italic leading-tight opacity-90">
          và vấn đề giải phóng con người
        </p>
      </div>
      <div className="relative flex items-end justify-between">
        <div className="pg-kicker" style={{ color: "var(--metal)" }}>{page.subtitle}</div>
        <div className="pg-small opacity-60">Sách số tương tác</div>
      </div>
    </div>
  );
}

function BackCover({ page }: { page: Page }) {
  return (
    <div className="cover pg flex h-full w-full flex-col items-center justify-center gap-[1.2em] p-[3em] text-center">
      <div className="pg-kicker" style={{ color: "var(--metal)" }}>3.5.2. · MLN111</div>
      <h2 className="font-[family-name:var(--font-display)] text-[2.6em] font-bold italic leading-tight">{page.title}</h2>
      <div className="flex items-center gap-[0.6em] pg-label" style={{ color: "var(--metal)" }}>
        <span>Tha hóa</span><span>→</span><span>Giải phóng</span><span>→</span><span>Phát triển tự do</span>
      </div>
      <p className="max-w-[24em] font-[family-name:var(--font-display)] text-[1.15em] italic opacity-85">
        “Sự phát triển tự do của mỗi con người là điều kiện cho sự phát triển tự do của tất cả mọi người.”
      </p>
      <div className="mt-[2em] pg-small opacity-60">Học phần Triết học Mác – Lênin · Hiện tượng tha hóa con người và vấn đề giải phóng con người</div>
    </div>
  );
}

export function BookPageView({ page, side = "single" }: { page: Page; side?: "left" | "right" | "single" }) {
  if (page.visualType === "cover") return <BookCover page={page} />;
  if (page.visualType === "back") return <BackCover page={page} />;
  const sideCls = side === "left" ? "page-left" : side === "right" ? "page-right" : "page-single";
  return (
    <article className={`paper ${sideCls} flex h-full w-full flex-col px-[2.6em] pb-[1.6em] pt-[2.2em]`} aria-label={`Trang ${page.pageNumber}: ${page.title}`}>
      <header className="flex items-baseline justify-between">
        <span className="pg-kicker">{page.section}</span>
        <span className="pg-num">{String(page.pageNumber).padStart(2, "0")} / 12</span>
      </header>
      <div className="pg-rule mt-[0.5em]" />
      <h2 className="pg-title mt-[0.6em]">{page.title}</h2>
      {page.subtitle && <p className="pg-sub mt-[0.3em]">{page.subtitle}</p>}
      <div className="mt-[1em] flex flex-1 flex-col gap-[0.9em]">
        {page.sections.map((b, i) => (
          <BlockRenderer key={i} block={b} />
        ))}
      </div>
      <footer className="pg-hair mt-[0.8em] flex items-center justify-between border-t pt-[0.5em]">
        <div className="flex flex-wrap gap-[0.4em]">
          {page.keywords?.map((k) => (
            <span key={k} className="pg-small font-[family-name:var(--font-label)] uppercase tracking-wider text-[var(--ink-soft)]">#{k}</span>
          ))}
        </div>
        {page.hasIllustrativeExample && <IllustrativeTag />}
      </footer>
    </article>
  );
}
