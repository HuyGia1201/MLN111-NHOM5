import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { bookPages, type BookPage } from "@/data/bookPages";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSpeechNarration } from "@/hooks/useSpeechNarration";
import { BookPageView, PAGE_H, PAGE_W } from "./BookPage";
import { BookControls } from "./BookControls";
import { InfoPanel } from "@/components/info/InfoPanel";
import { exportBookPdf } from "@/components/pdf/PdfExporter";

const N = bookPages.length;
const OPEN_MS = 900;

type Turning = { dir: "next" | "prev"; from: number; to: number };
type Reading = "idle" | "playing" | "paused";

function startOf(p: number, desktop: boolean) {
  if (p <= 0) return 0;
  const c = Math.min(p, N - 1);
  return desktop ? 1 + 2 * Math.floor((c - 1) / 2) : c;
}

export function Book() {
  const isMobile = useIsMobile();
  const desktop = !isMobile;
  const speech = useSpeechNarration();

  const [page, setPage] = useState(0);
  const [opening, setOpening] = useState<number | null>(null);
  const [turning, setTurning] = useState<Turning | null>(null);
  const [reading, setReading] = useState<Reading>("idle");
  const [readingPage, setReadingPage] = useState<number | null>(null);
  const [info, setInfo] = useState(false);
  const [pdfBusy, setPdfBusy] = useState<string | null>(null);
  const [printing, setPrinting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [box, setBox] = useState({ w: 1000, h: 700 });

  const stageRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(0);
  const busyRef = useRef(false);
  const readingRef = useRef<Reading>("idle");
  const tokenRef = useRef(0);
  const desktopRef = useRef(desktop);
  pageRef.current = page;
  readingRef.current = reading;
  desktopRef.current = desktop;

  const turnMs = useRef(800);
  const flipAudioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    turnMs.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 30 : 800;
    flipAudioRef.current = new Audio("/page-flip.mp3");
    flipAudioRef.current.volume = 0.35;
  }, []);

  const playFlip = useCallback(() => {
    if (flipAudioRef.current) {
      flipAudioRef.current.currentTime = 0;
      flipAudioRef.current.play().catch(() => {});
    }
  }, []);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => e && setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // keep page aligned to spreads when switching layout
  useEffect(() => {
    setPage((p) => startOf(p, desktop));
  }, [desktop]);

  const flash = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 3500);
  };

  /* ---------- navigation engine ---------- */
  const navigate = useCallback((target: number): Promise<boolean> => {
    return new Promise((resolve) => {
      if (busyRef.current) return resolve(false);
      const cur = pageRef.current;
      const t = startOf(Math.max(0, Math.min(N - 1, target)), desktopRef.current);
      if (t === cur) return resolve(true);
      
      playFlip();
      
      if (t === 0) {
        setPage(0);
        return resolve(true);
      }
      busyRef.current = true;
      if (cur === 0) {
        setOpening(t);
        window.setTimeout(() => {
          setPage(t);
          setOpening(null);
          busyRef.current = false;
          resolve(true);
        }, turnMs.current < 100 ? 30 : OPEN_MS);
        return;
      }
      setTurning({ dir: t > cur ? "next" : "prev", from: cur, to: t });
      window.setTimeout(() => {
        setPage(t);
        setTurning(null);
        busyRef.current = false;
        resolve(true);
      }, turnMs.current);
    });
  }, [playFlip]);

  const visible = (p: number) => {
    const s = pageRef.current;
    if (s === 0) return p === 0;
    return desktopRef.current ? p === s || p === s + 1 : p === s;
  };

  const stopReading = useCallback(() => {
    tokenRef.current++;
    speech.cancel();
    setReading("idle");
    setReadingPage(null);
  }, [speech]);

  const readPage = useCallback(
    (p: number) => {
      const tok = tokenRef.current;
      setReading("playing");
      setReadingPage(p);
      speech.speak(bookPages[p]!.narration, () => {
        if (tok !== tokenRef.current) return;
        const n = p + 1;
        if (n >= N) return stopReading();
        if (visible(n)) return readPage(n);
        window.setTimeout(() => {
          if (tok !== tokenRef.current || readingRef.current !== "playing") return;
          navigate(n).then(() => {
            if (tok === tokenRef.current) readPage(n);
          });
        }, 650);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [speech, navigate, stopReading],
  );

  const userNav = useCallback(
    (target: number) => {
      if (busyRef.current) return;
      const wasReading = readingRef.current !== "idle";
      if (wasReading) {
        tokenRef.current++;
        speech.cancel();
      }
      navigate(target).then((ok) => {
        if (ok && wasReading) readPage(pageRef.current);
      });
    },
    [navigate, readPage, speech],
  );

  const step = desktop ? 2 : 1;
  const next = () => userNav(page === 0 ? 1 : page + step);
  const prev = () => userNav(page <= 1 ? 0 : page - step);
  const first = () => userNav(0);
  const last = () => userNav(N - 1);
  const lastStart = startOf(N - 1, desktop);
  const canPrev = page > 0;
  const canNext = page < lastStart;

  const playPause = () => {
    if (!speech.supported) return flash("Trình duyệt của bạn không hỗ trợ đọc thuyết minh. Hãy thử Chrome hoặc Edge.");
    if (reading === "playing") {
      speech.pause();
      setReading("paused");
    } else if (reading === "paused") {
      speech.resume();
      setReading("playing");
    } else {
      if (!speech.hasViVoice()) flash("Không tìm thấy giọng tiếng Việt trên thiết bị — sẽ dùng giọng mặc định.");
      tokenRef.current++;
      readPage(pageRef.current);
    }
  };

  const downloadPdf = async () => {
    if (pdfBusy) return;
    setPdfBusy("Đang chuẩn bị…");
    setPrinting(true);
    try {
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (!printRef.current) throw new Error("no container");
      await exportBookPdf(printRef.current, (n, t) => setPdfBusy(`Trang ${n}/${t}`));
    } catch (e) {
      console.error(e);
      flash("Không tạo được file PDF. Vui lòng thử lại.");
    } finally {
      setPrinting(false);
      setPdfBusy(null);
    }
  };

  /* ---------- keyboard & swipe ---------- */
  const handlers = useRef({ next, prev, first, last, playPause });
  handlers.current = { next, prev, first, last, playPause };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setInfo(false);
      if (info) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.repeat && (e.key === "ArrowLeft" || e.key === "ArrowRight")) return;
      const h = handlers.current;
      if (e.key === "ArrowRight") h.next();
      else if (e.key === "ArrowLeft") h.prev();
      else if (e.key === "Home") h.first();
      else if (e.key === "End") h.last();
      else if (e.key === " " && tag !== "BUTTON") {
        e.preventDefault();
        h.playPause();
      } else return;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [info]);

  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t0 = e.touches[0]; if (t0) touch.current = { x: t0.clientX, y: t0.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const t1 = e.changedTouches[0];
    if (!touch.current || !t1) return;
    const dx = t1.clientX - touch.current.x;
    const dy = t1.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev)();
  };

  /* ---------- sizing ---------- */
  const pw = desktop ? Math.max(200, Math.min(box.w / 2, (box.h * PAGE_W) / PAGE_H)) : box.w;
  const ph = desktop ? (pw * PAGE_H) / PAGE_W : box.h;
  const scale = pw / PAGE_W;

  const Slot = ({ p, side }: { p?: BookPage | undefined; side: "left" | "right" | "single" }) => {
    if (!p) return null;
    if (desktop)
      return (
        <div className="h-full w-full overflow-hidden">
          <div className="pg origin-top-left" style={{ width: PAGE_W, height: PAGE_H, transform: `scale(${scale})` }}>
            <BookPageView page={p} side={side} />
          </div>
        </div>
      );
    return (
      <div className="pg pg-mobile h-full w-full overflow-y-auto overscroll-contain">
        <div className="min-h-full [&>*]:min-h-full">
          <BookPageView page={p} side="single" />
        </div>
      </div>
    );
  };

  const half = (left: boolean, children: ReactNode, extra = "") => (
    <div className={`absolute top-0 h-full ${extra}`} style={{ width: pw, left: left ? 0 : pw }}>{children}</div>
  );

  let content: ReactNode;
  if (desktop) {
    const closed = page === 0 && opening === null;
    const closedBack = page === N - 1 && turning === null;
    const isTurningToEnd = turning?.to === N - 1;

    let layers: ReactNode;
    if (closed) {
      layers = half(false, <Slot p={bookPages[0]} side="right" />, "book-shadow cursor-pointer");
    } else if (closedBack) {
      layers = half(true, <Slot p={bookPages[N - 1]} side="left" />, "book-shadow cursor-pointer");
    } else if (opening !== null) {
      layers = (
        <>
          {half(true, <Slot p={bookPages[opening]} side="left" />)}
          {half(false, <Slot p={bookPages[opening + 1]} side="right" />)}
          <div className="leaf anim-cover-open" style={{ left: pw, width: pw }}>
            <div className="leaf-face"><Slot p={bookPages[0]} side="right" /></div>
          </div>
        </>
      );
    } else if (turning) {
      const { dir, from, to } = turning;
      if (dir === "next") {
        layers = (
          <>
            {half(true, <Slot p={bookPages[from]} side="left" />)}
            {half(false, <Slot p={bookPages[to + 1]} side="right" />)}
            <div className="leaf anim-turn-next" style={{ left: pw, width: pw }}>
              <div className="leaf-face"><Slot p={bookPages[from + 1]} side="right" /><div className="leaf-shade" /></div>
              <div className="leaf-face leaf-back"><Slot p={bookPages[to]} side="left" /><div className="leaf-shade" /></div>
            </div>
          </>
        );
      } else {
        layers = (
          <>
            {half(true, <Slot p={bookPages[to]} side="left" />)}
            {half(false, <Slot p={bookPages[from + 1]} side="right" />)}
            <div className="leaf anim-turn-prev" style={{ left: 0, width: pw }}>
              <div className="leaf-face"><Slot p={bookPages[from]} side="left" /><div className="leaf-shade" /></div>
              <div className="leaf-face leaf-back"><Slot p={bookPages[to + 1]} side="right" /><div className="leaf-shade" /></div>
            </div>
          </>
        );
      }
    } else {
      layers = (
        <>
          {half(true, <Slot p={bookPages[page]} side="left" />)}
          {half(false, <Slot p={bookPages[page + 1]} side="right" />)}
        </>
      );
    }

    const transformX = closed
      ? `translateX(-${pw / 2}px)`
      : closedBack || isTurningToEnd
      ? `translateX(${pw / 2}px)`
      : "translateX(0)";

    content = (
      <div
        className={`book-stage relative ${closed || closedBack ? "" : "book-shadow"}`}
        style={{
          width: pw * 2,
          height: ph,
          transform: transformX,
          transition: "transform 900ms cubic-bezier(0.645,0.045,0.355,1)",
        }}
        onClick={closed ? () => userNav(1) : closedBack ? () => userNav(N - 3) : undefined}
      >
        {layers}
        {!(closed || closedBack) && <div aria-hidden className="pointer-events-none absolute top-0 h-full w-[2px] bg-[oklch(0_0_0/0.25)]" style={{ left: pw - 1 }} />}
      </div>
    );
  } else {
    let layers: ReactNode;
    if (opening !== null) {
      layers = (
        <>
          <Slot p={bookPages[opening]} side="single" />
          <div className="leaf anim-cover-open left-0 w-full"><div className="leaf-face"><Slot p={bookPages[0]} side="single" /></div></div>
        </>
      );
    } else if (turning) {
      const { dir, from, to } = turning;
      layers =
        dir === "next" ? (
          <>
            <Slot p={bookPages[to]} side="single" />
            <div className="leaf anim-single-next left-0 w-full"><div className="leaf-face"><Slot p={bookPages[from]} side="single" /></div></div>
          </>
        ) : (
          <>
            <Slot p={bookPages[from]} side="single" />
            <div className="leaf anim-single-prev left-0 w-full"><div className="leaf-face"><Slot p={bookPages[to]} side="single" /></div></div>
          </>
        );
    } else {
      layers = <Slot p={bookPages[page]} side="single" />;
    }
    content = (
      <div
        className="book-stage book-shadow relative overflow-hidden rounded-r-sm"
        style={{ width: pw, height: ph }}
        onClick={page === 0 && opening === null ? () => userNav(1) : undefined}
      >
        {layers}
      </div>
    );
  }

  const infoPages =
    page === 0 ? [bookPages[0]!] : desktop ? [bookPages[page], bookPages[page + 1]].filter((x): x is BookPage => !!x) : [bookPages[page]].filter((x): x is BookPage => !!x);
  const label =
    page === 0
      ? "Bìa trước"
      : page === N - 1
      ? "Bìa sau"
      : desktop && page + 1 < N - 1
      ? `${page}–${page + 1} / ${N - 2}`
      : `${page} / ${N - 2}`;

  return (
    <div className="flex h-[100dvh] flex-col">
      <header className="flex items-center justify-between px-4 pt-3 sm:px-6">
        <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)]">MLN111 · 3.5.2.</span>
        <span className="text-xs text-[var(--muted-foreground)]" aria-live="polite">
          {reading !== "idle" && readingPage !== null
            ? `${reading === "playing" ? "Đang đọc…" : "Tạm dừng"} · trang ${readingPage + 1}`
            : page === 0
              ? "Nhấn vào bìa để mở sách"
              : ""}
        </span>
      </header>

      <main
        ref={stageRef}
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-3 sm:px-8 sm:py-5"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute inset-0 flex items-center justify-center">{content}</div>
      </main>

      <div className="px-2 pb-3 sm:pb-5">
        <BookControls
          label={label}
          canPrev={canPrev}
          canNext={canNext}
          onFirst={first}
          onPrev={prev}
          onNext={next}
          onLast={last}
          reading={reading}
          onPlayPause={playPause}
          onStop={stopReading}
          rate={speech.rate}
          onRate={speech.setRate}
          onInfo={() => setInfo(true)}
          onPdf={downloadPdf}
          pdfBusy={pdfBusy}
        />
      </div>

      {toast && (
        <div role="status" className="paper anim-rise fixed left-1/2 top-12 z-50 -translate-x-1/2 rounded px-4 py-2 text-sm shadow-xl">
          {toast}
        </div>
      )}
      {info && <InfoPanel pages={infoPages} onClose={() => setInfo(false)} />}

      {printing && (
        <div ref={printRef} aria-hidden className="fixed left-[-20000px] top-0">
          {bookPages.map((p) => (
            <div key={p.id} data-print-page className="pg" style={{ width: PAGE_W, height: PAGE_H }}>
              <BookPageView page={p} side="single" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
