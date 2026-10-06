import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Download, Info, Pause, Play, Square, Loader2 } from "lucide-react";

type Props = {
  label: string;
  canPrev: boolean;
  canNext: boolean;
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLast: () => void;
  reading: "idle" | "playing" | "paused";
  onPlayPause: () => void;
  onStop: () => void;
  rate: number;
  onRate: (r: number) => void;
  onInfo: () => void;
  onPdf: () => void;
  pdfBusy: string | null;
};

const RATES = [0.75, 1, 1.25, 1.5];

export function BookControls(p: Props) {
  return (
    <nav aria-label="Điều khiển sách" className="control-bar mx-auto flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full px-2 py-1.5">
      <button className="ctrl-btn hidden sm:inline-flex" onClick={p.onFirst} disabled={!p.canPrev} aria-label="Trang đầu"><ChevronFirst size={18} /></button>
      <button className="ctrl-btn" onClick={p.onPrev} disabled={!p.canPrev} aria-label="Trang trước"><ChevronLeft size={20} /></button>
      <span className="min-w-[4.5rem] text-center font-[family-name:var(--font-label)] text-sm tracking-[0.15em]" aria-live="polite">{p.label}</span>
      <button className="ctrl-btn" onClick={p.onNext} disabled={!p.canNext} aria-label="Trang sau"><ChevronRight size={20} /></button>
      <button className="ctrl-btn hidden sm:inline-flex" onClick={p.onLast} disabled={!p.canNext} aria-label="Trang cuối"><ChevronLast size={18} /></button>
      <span className="mx-1 h-6 w-px bg-[var(--border)]" aria-hidden />
      <button className="ctrl-btn ctrl-primary" onClick={p.onPlayPause} aria-label={p.reading === "playing" ? "Tạm dừng đọc" : "Đọc thuyết minh"}>
        {p.reading === "playing" ? <Pause size={16} /> : <Play size={16} />}
        <span className="hidden sm:inline">{p.reading === "playing" ? "Dừng" : p.reading === "paused" ? "Tiếp" : "Đọc"}</span>
      </button>
      <button className="ctrl-btn" onClick={p.onStop} disabled={p.reading === "idle"} aria-label="Dừng hẳn"><Square size={15} /></button>
      <button
        className="ctrl-btn text-xs"
        onClick={() => p.onRate(RATES[(RATES.indexOf(p.rate) + 1) % RATES.length])}
        aria-label={`Tốc độ đọc ${p.rate}x`}
      >{p.rate}x</button>
      <span className="mx-1 h-6 w-px bg-[var(--border)]" aria-hidden />
      <button className="ctrl-btn" onClick={p.onInfo} aria-label="Thông tin trang"><Info size={17} /></button>
      <button className="ctrl-btn" onClick={p.onPdf} disabled={!!p.pdfBusy} aria-label="Tải sách PDF">
        {p.pdfBusy ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
        <span className="hidden md:inline">{p.pdfBusy ?? "Tải sách PDF"}</span>
      </button>
    </nav>
  );
}
