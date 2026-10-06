import { useCallback, useEffect, useRef, useState } from "react";

export function useSpeechNarration() {
  const [supported, setSupported] = useState(true);
  const [rate, setRate] = useState(1);
  const session = useRef(0);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const rateRef = useRef(1);
  rateRef.current = rate;

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const pick = () => {
      const vs = window.speechSynthesis.getVoices();
      voiceRef.current = vs.find((v) => v.lang?.toLowerCase().startsWith("vi")) ?? null;
    };
    pick();
    window.speechSynthesis.addEventListener("voiceschanged", pick);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pick);
      window.speechSynthesis.cancel();
    };
  }, []);

  const cancel = useCallback(() => {
    session.current++;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  /** Speaks text in sentence chunks (avoids Chrome's long-utterance cutoff). */
  const speak = useCallback(
    (text: string, onEnd: () => void) => {
      if (!("speechSynthesis" in window)) return;
      cancel();
      const id = session.current;
      const parts = text.split(/(?<=[.!?…:])\s+/).filter(Boolean);
      let i = 0;
      const next = () => {
        if (id !== session.current) return;
        if (i >= parts.length) return onEnd();
        const u = new SpeechSynthesisUtterance(parts[i++]);
        u.lang = "vi-VN";
        if (voiceRef.current) u.voice = voiceRef.current;
        u.rate = rateRef.current;
        u.onend = next;
        u.onerror = (e) => {
          if (e.error === "interrupted" || e.error === "canceled") return;
          next();
        };
        window.speechSynthesis.speak(u);
      };
      next();
    },
    [cancel],
  );

  const pause = useCallback(() => window.speechSynthesis?.pause(), []);
  const resume = useCallback(() => window.speechSynthesis?.resume(), []);

  return { supported, speak, cancel, pause, resume, rate, setRate, hasViVoice: () => !!voiceRef.current };
}
