import { X } from "lucide-react";
import type { BookPage } from "@/data/bookPages";

export function InfoPanel({ pages, onClose }: { pages: BookPage[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[oklch(0_0_0/0.35)]" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Thông tin trang"
        className="paper anim-rise h-full w-full max-w-sm overflow-y-auto p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="pg-kicker text-sm">Thông tin trang</span>
          <button className="focus-ring rounded-full p-1.5 hover:bg-[var(--paper-deep)]" onClick={onClose} aria-label="Đóng" autoFocus>
            <X size={18} />
          </button>
        </div>
        {pages.map((p) => (
          <section key={p.id} className="mt-6 border-t-2 border-[var(--ink)] pt-3">
            <div className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
              {p.section} · Trang {p.pageNumber}/12
            </div>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold leading-tight">{p.title}</h3>
            <dl className="mt-3 space-y-3 text-sm leading-relaxed">
              <div>
                <dt className="font-[family-name:var(--font-label)] font-bold uppercase tracking-wider text-[var(--burgundy)]">Mục đích</dt>
                <dd>{p.purpose}</dd>
              </div>
              <div>
                <dt className="font-[family-name:var(--font-label)] font-bold uppercase tracking-wider text-[var(--burgundy)]">Nguồn ví dụ</dt>
                <dd>
                  {p.hasIllustrativeExample && <span className="pg-tag mb-1 mr-1">Ví dụ minh họa</span>}
                  {p.exampleNote}
                </dd>
              </div>
            </dl>
          </section>
        ))}
        <p className="mt-8 text-xs text-[var(--ink-soft)]">Phím tắt: ← → lật trang · Home/End · Space đọc/dừng · Esc đóng.</p>
      </aside>
    </div>
  );
}
