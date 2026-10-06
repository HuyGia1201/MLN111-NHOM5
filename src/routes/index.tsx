import { createFileRoute } from "@tanstack/react-router";
import { Book } from "@/components/book/Book";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tha hóa & Giải phóng con người — Sách số MLN111" },
      { name: "description", content: "Sách số infographic tương tác mục 3.5.2: Hiện tượng tha hóa con người và vấn đề giải phóng con người (MLN111)." },
      { property: "og:title", content: "Tha hóa & Giải phóng con người — Sách số MLN111" },
      { property: "og:description", content: "Lật trang, nghe thuyết minh và tải PDF cuốn sách số triết học MLN111 mục 3.5.2." },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Book,
});
