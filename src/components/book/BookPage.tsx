import type { BookPage as Page } from "@/data/bookPages";
import { BlockRenderer } from "./BlockRenderer";

export const PAGE_W = 540;
export const PAGE_H = 760;

export function BookCover({ page }: { page: Page }) {
  return (
    <div className="cover cover-spine pg relative flex h-full w-full flex-col justify-between overflow-hidden p-[3em]">
      <img src="/book.jpg" alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
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
    <div className="cover pg flex h-full w-full flex-col justify-between p-[3em] text-center">
      <div className="flex items-center justify-between">
        <div className="pg-kicker" style={{ color: "var(--metal)" }}>BÌA SAU</div>
        <div className="pg-kicker" style={{ color: "var(--metal)" }}>MLN111 · TRIẾT HỌC</div>
      </div>
      <div className="flex flex-col items-center gap-[1.2em]">
        <h2 className="font-[family-name:var(--font-display)] text-[2.6em] font-bold italic leading-tight">{page.title}</h2>
        <div className="flex items-center gap-[0.6em] pg-label" style={{ color: "var(--metal)" }}>
          <span>Tha hóa</span><span>→</span><span>Giải phóng</span><span>→</span><span>Phát triển tự do</span>
        </div>
        <p className="max-w-[24em] font-[family-name:var(--font-display)] text-[1.15em] italic opacity-85">
          "Sự phát triển tự do của mỗi con người là điều kiện cho sự phát triển tự do của tất cả mọi người."
        </p>
      </div>
      <div className="pg-small opacity-60">Học phần Triết học Mác – Lênin · Hiện tượng tha hóa con người và vấn đề giải phóng con người</div>
    </div>
  );
}

export function BookPageView({ page, side = "single" }: { page: Page; side?: "left" | "right" | "single" }) {
  if (page.visualType === "cover") return <BookCover page={page} />;
  if (page.visualType === "back") return <BackCover page={page} />;
  const sideCls = side === "left" ? "page-left" : side === "right" ? "page-right" : "page-single";
  // pageNumber 2 = trang nội dung 1, ..., pageNumber 11 = trang nội dung 10
  const contentPageNum = page.pageNumber - 1;
  return (
    <article className={`paper ${sideCls} flex h-full w-full flex-col px-[2.6em] pb-[1.6em] pt-[2.2em] overflow-hidden`} aria-label={`Trang ${contentPageNum}: ${page.title}`}>
      <header className="flex shrink-0 items-baseline justify-between">
        <span className="pg-kicker">{page.section}</span>
        <span className="pg-num">{String(contentPageNum).padStart(2, "0")} / 10</span>
      </header>
      <div className="pg-rule shrink-0 mt-[0.5em]" />
      <h2 className="pg-title shrink-0 mt-[0.6em]">{page.title}</h2>
      {page.subtitle && <p className="pg-sub shrink-0 mt-[0.3em]">{page.subtitle}</p>}
      <div className="mt-[1em] flex flex-1 flex-col justify-evenly gap-[0.6em] overflow-y-auto pb-[0.5em]" style={{ scrollbarWidth: "none" }}>
        {page.sections.map((b, i) => (
          <BlockRenderer key={i} block={b} />
        ))}
      </div>
      <footer className="pg-hair shrink-0 mt-[0.8em] flex min-h-[2em] items-center justify-end border-t pt-[0.5em]">
      </footer>
    </article>
  );
}
