/** Renders every page from a hidden print container into an A4-ratio PDF (client-side only). */
export async function exportBookPdf(container: HTMLElement, onProgress?: (n: number, total: number) => void) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas-pro"), import("jspdf")]);
  await document.fonts?.ready;
  const pages = Array.from(container.querySelectorAll<HTMLElement>("[data-print-page]"));
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
  for (let i = 0; i < pages.length; i++) {
    onProgress?.(i + 1, pages.length);
    const canvas = await html2canvas(pages[i], { scale: 2, backgroundColor: null, useCORS: true });
    const img = canvas.toDataURL("image/jpeg", 0.92);
    if (i > 0) pdf.addPage();
    const ratio = canvas.width / canvas.height;
    let w = W, h = W / ratio;
    if (h > H) { h = H; w = H * ratio; }
    pdf.setFillColor(244, 238, 226);
    pdf.rect(0, 0, W, H, "F");
    pdf.addImage(img, "JPEG", (W - w) / 2, (H - h) / 2, w, h);
  }
  pdf.save("MLN111_Tha_Hoa_Con_Nguoi.pdf");
}
