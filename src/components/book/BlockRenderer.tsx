import type { SectionBlock, Tone } from "@/data/bookPages";

const toneCls: Record<Tone, string> = {
  ink: "chip-ink",
  burg: "chip-burg",
  paper: "chip-paper",
};



export function BlockRenderer({ block }: { block: SectionBlock }) {
  switch (block.type) {
    case "quote":
      return (
        <blockquote className="relative border-l-[3px] border-[var(--burgundy)] pl-[1em]">
          <span aria-hidden className="absolute -top-[0.35em] left-[0.4em] font-[family-name:var(--font-display)] text-[3em] leading-none text-[var(--burgundy)] opacity-20">“</span>
          <p className="pg-quote">“{block.text}”</p>
        </blockquote>
      );
    case "text":
      return <p className="pg-body text-[var(--ink-soft)]">{block.text}</p>;
    case "chain":
      return (
        <ol className="flex flex-col items-stretch">
          {block.items.map((it, i) => {
            const last = i === block.items.length - 1;
            const strong = last && block.highlightLast;
            return (
              <li key={i} className="flex flex-col items-center">
                <div
                  className={`flex w-full items-center gap-[0.7em] border-[1.5px] border-[var(--ink)] px-[0.8em] py-[0.45em] ${strong ? "chip-burg border-[var(--burgundy)]" : i === 0 ? "chip-ink" : ""}`}
                >
                  <span className="pg-num w-[1.6em] shrink-0 opacity-70" style={strong || i === 0 ? { color: "inherit" } : undefined}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pg-label">{it}</span>
                </div>
                {!last && (
                  <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden className="my-[0.1em] text-[var(--burgundy)]">
                    <path d="M7 0v12M2 8l5 6 5-6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      );
    case "contrast":
      return (
        <div>
          {block.label && <div className="pg-kicker mb-[0.4em] text-[0.85em]">{block.label}</div>}
          <div className="grid grid-cols-[1fr_auto_1fr] items-stretch">
            {[block.left, block.right].map((side, i) => (
              <div key={i} className={`${toneCls[side.tone]} p-[0.8em] ${i === 1 ? "col-start-3" : ""}`}>
                <div className="pg-label mb-[0.4em]">{side.title}</div>
                <ul className="space-y-[0.25em]">
                  {side.items.map((x, j) => (
                    <li key={j} className="pg-small flex gap-[0.4em]">
                      <span aria-hidden>▪</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )).reduce<React.ReactNode[]>((acc, el, i) => {
              if (i === 1)
                acc.push(
                  <div key="vs" className="flex items-center px-[0.5em]">
                    <span className="pg-label text-[var(--burgundy)]">vs</span>
                  </div>,
                );
              acc.push(el);
              return acc;
            }, [])}
          </div>
        </div>
      );
    case "grid":
      return (
        <div
          className="grid gap-[0.6em]"
          style={{ gridTemplateColumns: `repeat(${block.cols}, minmax(0, 1fr))` }}
        >
          {block.items.map((it, i) => (
            <div key={i} className="border-t-[3px] border-[var(--ink)] bg-[var(--paper-deep)] p-[0.7em]">
              {it.num && <div className="font-[family-name:var(--font-display)] text-[1.7em] font-bold leading-none text-[var(--burgundy)]">{it.num}</div>}
              <div className="pg-label mt-[0.25em]">{it.title}</div>
              <p className="pg-small mt-[0.3em] text-[var(--ink-soft)]">{it.text}</p>
            </div>
          ))}
        </div>
      );
    case "flowSplit":
      return (
        <div className="flex flex-col items-center">
          <div className="chip-ink pg-label px-[1em] py-[0.5em]">{block.from}</div>
          <svg viewBox="0 0 200 40" className="h-[2.6em] w-[60%]" aria-hidden>
            <path d="M100 0v14M100 14H30v24M100 14h70v24" stroke="var(--ink)" strokeWidth="1.6" fill="none" />
            <path d="M25 32l5 7 5-7M165 32l5 7 5-7" stroke="var(--ink)" strokeWidth="1.6" fill="none" />
          </svg>
          <div className="grid w-full grid-cols-2 gap-[0.6em]">
            <div className="chip-paper border-[1.5px] border-dashed border-[var(--ink)] p-[0.7em] pg-small">{block.to[0]}</div>
            <div className="chip-burg p-[0.7em] pg-small">{block.to[1]}</div>
          </div>
        </div>
      );
    case "callout":
      return (
        <div className={`relative border-[1.5px] p-[0.8em] ${block.illustrative ? "border-dashed border-[var(--burgundy)]" : "border-[var(--ink)]"}`}>
          <div className="mb-[0.3em] flex flex-wrap items-center gap-[0.5em]">
            <span className="pg-label text-[var(--burgundy)]">{block.title}</span>
          </div>
          <p className="pg-body">{block.text}</p>
        </div>
      );
    case "map":
      return <ConceptMap block={block} />;
    case "image": {
      const mw = block.maxWidth ?? "70%";
      return (
        <figure className="relative mx-auto overflow-hidden border-[1.5px] border-[var(--ink)]" style={{ maxWidth: mw }}>
          <img src={block.src} alt={block.caption || ""} className="w-full h-auto object-cover" />
          {block.caption && (
            <figcaption className="bg-[var(--paper-deep)] border-t-[1.5px] border-[var(--ink)] pg-small p-[0.5em] text-center text-[0.85em]">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    case "loop":
      return <Loop block={block} />;
  }
}

function ConceptMap({ block }: { block: Extract<SectionBlock, { type: "map" }> }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 300 120" className="w-full" aria-hidden>
        <circle cx="150" cy="60" r="52" fill="none" stroke="var(--ink)" strokeWidth="0.6" strokeDasharray="2 3" />
        <circle cx="150" cy="60" r="34" fill="var(--burgundy)" />
        <path d="M150 94 V120 M150 94 L40 120 M150 94 L260 120" stroke="var(--ink)" strokeWidth="1" fill="none" />
        <text x="150" y="56" textAnchor="middle" fill="var(--paper)" style={{ font: "700 9px var(--font-label)", letterSpacing: "1px" }}>THA HÓA</text>
        <text x="150" y="68" textAnchor="middle" fill="var(--paper)" style={{ font: "700 9px var(--font-label)", letterSpacing: "1px" }}>CON NGƯỜI</text>
      </svg>
      <div className="grid grid-cols-3 gap-[0.5em]">
        {block.branches.map((b) => (
          <div key={b.num} className="border-t-[3px] border-[var(--ink)] bg-[var(--paper-deep)] p-[0.6em]">
            <div className="font-[family-name:var(--font-display)] text-[1.6em] font-bold leading-none text-[var(--burgundy)]">{b.num}</div>
            <div className="pg-label mt-[0.2em] text-[0.95em]">{b.title}</div>
            <ul className="mt-[0.4em] space-y-[0.2em]">
              {b.subs.map((s) => (
                <li key={s} className="pg-small flex gap-[0.35em] text-[var(--ink-soft)]">
                  <span aria-hidden className="text-[var(--burgundy)]">—</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Loop({ block }: { block: Extract<SectionBlock, { type: "loop" }> }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-[80%]">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0L10 5L0 10z" fill="var(--burgundy)" />
            </marker>
          </defs>
          <circle cx="100" cy="100" r="70" fill="none" stroke="var(--ink)" strokeWidth="0.5" strokeDasharray="2 3" />
          <path d="M60 42 A70 70 0 0 1 158 60" fill="none" stroke="var(--burgundy)" strokeWidth="2.5" markerEnd="url(#arr)" />
          <path d="M140 158 A70 70 0 0 1 42 140" fill="none" stroke="var(--burgundy)" strokeWidth="2.5" markerEnd="url(#arr)" />
          <circle cx="100" cy="100" r="22" fill="var(--paper-deep)" stroke="var(--ink)" />
          <text x="100" y="98" textAnchor="middle" fill="var(--ink)" style={{ font: "700 7px var(--font-label)" }}>BIỆN</text>
          <text x="100" y="107" textAnchor="middle" fill="var(--ink)" style={{ font: "700 7px var(--font-label)" }}>CHỨNG</text>
        </svg>
        <div className="chip-ink pg-label absolute left-0 top-[34%] w-[38%] p-[0.5em] text-center text-[0.9em]">{block.a}</div>
        <div className="chip-burg pg-label absolute right-0 top-[34%] w-[38%] p-[0.5em] text-center text-[0.9em]">{block.b}</div>
        <span className="pg-kicker absolute left-1/2 top-[3%] -translate-x-1/2 whitespace-nowrap text-[0.85em]">→ {block.aToB}</span>
        <span className="pg-kicker absolute bottom-[3%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.85em]">← {block.bToA}</span>
      </div>
      <div className="mt-[0.6em] w-full border-y-2 border-[var(--ink)] py-[0.5em] text-center">
        {block.result.map((r, i) => (
          <div key={i} className={i === 0 ? "pg-title text-[1.4em]" : "pg-kicker mt-[0.2em]"}>{r}</div>
        ))}
      </div>
    </div>
  );
}
