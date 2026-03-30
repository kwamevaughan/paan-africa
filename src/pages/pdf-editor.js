import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import SEO from "@/components/SEO";
import Header from "@/layouts/standard-header";
import Footer from "@/layouts/footer";
import ScrollToTop from "@/components/ScrollToTop";

const readAsArrayBuffer = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read file."));
    reader.readAsArrayBuffer(file);
  });

const readAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read image file."));
    reader.readAsDataURL(file);
  });

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const parsePageRange = (input, totalPages) => {
  if (!input || !input.trim()) {
    return [];
  }

  const pages = new Set();
  const parts = input.split(",").map((part) => part.trim());

  for (const part of parts) {
    if (!part) continue;

    if (part.includes("-")) {
      const [startRaw, endRaw] = part.split("-").map((s) => Number(s.trim()));
      if (!Number.isFinite(startRaw) || !Number.isFinite(endRaw)) {
        throw new Error(`Invalid page range: "${part}"`);
      }
      const start = clamp(startRaw, 1, totalPages);
      const end = clamp(endRaw, 1, totalPages);
      const from = Math.min(start, end);
      const to = Math.max(start, end);
      for (let i = from; i <= to; i += 1) pages.add(i);
    } else {
      const page = Number(part);
      if (!Number.isFinite(page)) {
        throw new Error(`Invalid page number: "${part}"`);
      }
      pages.add(clamp(page, 1, totalPages));
    }
  }

  return [...pages].sort((a, b) => a - b).map((page) => page - 1);
};

const triggerDownload = (bytes, filename) => {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const CANVAS_W = 560;
const CANVAS_H = 200;

const TEXT_FONT_OPTIONS = [
  { value: "Helvetica", label: "Helvetica" },
  { value: "HelveticaBold", label: "Helvetica bold" },
  { value: "TimesRoman", label: "Times" },
  { value: "Courier", label: "Courier" },
];

const PDFEditorPage = () => {
  const [baseFile, setBaseFile] = useState(null);
  const [baseBuffer, setBaseBuffer] = useState(null);
  const [extraFiles, setExtraFiles] = useState([]);
  const [basePageCount, setBasePageCount] = useState(0);
  const [loadingBase, setLoadingBase] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewerUrl, setViewerUrl] = useState(null);

  const signatureCanvasRef = useRef(null);
  const signatureLastPointRef = useRef({ x: 0, y: 0 });
  const [isDrawingSig, setIsDrawingSig] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.2);

  const [pageNumberEnabled, setPageNumberEnabled] = useState(true);
  const [pageNumberStart, setPageNumberStart] = useState(1);
  const [pageNumberPosition, setPageNumberPosition] = useState("bottom-right");

  const [textPage, setTextPage] = useState(1);
  const [textX, setTextX] = useState(50);
  const [textY, setTextY] = useState(50);
  const [textSize, setTextSize] = useState(14);
  const [textColorHex, setTextColorHex] = useState("#172840");
  const [textContent, setTextContent] = useState("");
  const [textAnnotations, setTextAnnotations] = useState([]);
  const [textFontFamily, setTextFontFamily] = useState("Helvetica");
  const [applyTextToAllPages, setApplyTextToAllPages] = useState(false);
  const [firstPageSize, setFirstPageSize] = useState(null);

  const [signatureImage, setSignatureImage] = useState(null);
  const [signaturePage, setSignaturePage] = useState(1);
  const [signatureX, setSignatureX] = useState(50);
  const [signatureY, setSignatureY] = useState(50);
  const [signatureWidth, setSignatureWidth] = useState(160);
  const [signatureHeight, setSignatureHeight] = useState(60);
  const [signatureOpacity, setSignatureOpacity] = useState(1);

  const [splitRange, setSplitRange] = useState("");
  const [extractRange, setExtractRange] = useState("");

  const canEdit = useMemo(() => !!baseBuffer && basePageCount > 0, [baseBuffer, basePageCount]);

  useEffect(() => {
    if (!baseBuffer) {
      setViewerUrl(null);
      return;
    }
    const blob = new Blob([baseBuffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setViewerUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [baseBuffer]);

  const initSignatureCanvas = useCallback(() => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.strokeStyle = "#172840";
    ctx.fillStyle = "#172840";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  useEffect(() => {
    initSignatureCanvas();
  }, [initSignatureCanvas]);

  const getCanvasCoords = (e) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX;
    let clientY;
    if ("touches" in e && e.touches?.length) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("changedTouches" in e && e.changedTouches?.length) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawSignature = (e) => {
    e.preventDefault();
    const { x, y } = getCanvasCoords(e);
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    signatureLastPointRef.current = { x, y };
    setIsDrawingSig(true);
  };

  const moveDrawSignature = (e) => {
    if (!isDrawingSig) return;
    e.preventDefault();
    const { x, y } = getCanvasCoords(e);
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { x: lx, y: ly } = signatureLastPointRef.current;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(x, y);
    ctx.stroke();
    signatureLastPointRef.current = { x, y };
  };

  const endDrawSignature = (e) => {
    e.preventDefault();
    setIsDrawingSig(false);
  };

  const clearSignatureCanvas = () => {
    initSignatureCanvas();
    toast.success("Signature canvas cleared.");
  };

  const applyDrawnSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    setSignatureImage(dataUrl);
    toast.success("Drawn signature applied. Adjust page and position below.");
  };

  const handlePdfFilesUpload = async (event) => {
    const files = Array.from(event.target.files || []).filter((f) => f.type === "application/pdf");
    if (!files.length) {
      toast.error("Select at least one PDF.");
      return;
    }

    setLoadingBase(true);
    try {
      const main = files[0];
      const bytes = await readAsArrayBuffer(main);
      const doc = await PDFDocument.load(bytes);
      const { width, height } = doc.getPage(0).getSize();
      setFirstPageSize({ width, height });
      setBaseFile(main);
      setBaseBuffer(bytes);
      setBasePageCount(doc.getPageCount());
      setExtraFiles(files.slice(1));
      setTextPage(1);
      setSignaturePage(1);
      setTextX(50);
      setTextY(50);
      const extraMsg = files.length > 1 ? ` ${files.length - 1} extra PDF(s) will merge when you use Merge.` : "";
      toast.success(`Loaded ${main.name} (${doc.getPageCount()} pages).${extraMsg}`);
    } catch (error) {
      toast.error(error.message || "Could not load this PDF.");
    } finally {
      setLoadingBase(false);
      event.target.value = "";
    }
  };

  const hexToRgb = (hex) => {
    const clean = hex.replace("#", "");
    const bigint = Number.parseInt(clean, 16);
    return rgb(((bigint >> 16) & 255) / 255, ((bigint >> 8) & 255) / 255, (bigint & 255) / 255);
  };

  const applyCommonEdits = async (sourceBuffer) => {
    const doc = await PDFDocument.load(sourceBuffer);
    const pages = doc.getPages();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const watermarkFont = await doc.embedFont(StandardFonts.HelveticaBold);

    const embeddedTextFonts = {};
    const getAnnotationFont = async (name) => {
      const key = name && StandardFonts[name] ? name : "Helvetica";
      if (!embeddedTextFonts[key]) {
        embeddedTextFonts[key] = await doc.embedFont(StandardFonts[key]);
      }
      return embeddedTextFonts[key];
    };

    pages.forEach((page, index) => {
      const { width, height } = page.getSize();

      if (rotation !== 0) {
        const normalized = ((rotation % 360) + 360) % 360;
        page.setRotation(degrees(normalized));
      }

      if (watermarkText.trim()) {
        page.drawText(watermarkText.trim(), {
          x: width / 2 - watermarkText.length * 4,
          y: height / 2,
          size: 42,
          font: watermarkFont,
          color: rgb(0.95, 0.2, 0.2),
          opacity: clamp(Number(watermarkOpacity), 0.05, 0.9),
          rotate: degrees(30),
        });
      }

      if (pageNumberEnabled) {
        const label = `${pageNumberStart + index}`;
        let x = 30;
        let y = 20;

        if (pageNumberPosition === "bottom-right") {
          x = width - 70;
          y = 20;
        } else if (pageNumberPosition === "top-left") {
          x = 30;
          y = height - 30;
        } else if (pageNumberPosition === "top-right") {
          x = width - 70;
          y = height - 30;
        }

        page.drawText(label, {
          x,
          y,
          size: 11,
          font,
          color: rgb(0.1, 0.1, 0.1),
          opacity: 0.85,
        });
      }
    });

    const allAnnotations = [...textAnnotations];
    if (textContent.trim() && !applyTextToAllPages) {
      allAnnotations.push({
        page: textPage,
        x: textX,
        y: textY,
        size: textSize,
        color: textColorHex,
        content: textContent.trim(),
        fontFamily: textFontFamily,
      });
    }

    for (const annotation of allAnnotations) {
      if (!annotation.content?.trim()) continue;
      const index = clamp(Number(annotation.page) || 1, 1, pages.length) - 1;
      const target = pages[index];
      const { width, height } = target.getSize();
      const annotationFont = await getAnnotationFont(annotation.fontFamily);
      target.drawText(annotation.content.trim(), {
        x: clamp(Number(annotation.x) || 0, 0, width - 40),
        y: clamp(Number(annotation.y) || 0, 0, height - 20),
        size: clamp(Number(annotation.size) || 12, 8, 96),
        font: annotationFont,
        color: hexToRgb(annotation.color || "#172840"),
      });
    }

    if (textContent.trim() && applyTextToAllPages) {
      const bodyFont = await getAnnotationFont(textFontFamily);
      const txt = textContent.trim();
      const sz = clamp(Number(textSize) || 12, 8, 96);
      const col = hexToRgb(textColorHex);
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.drawText(txt, {
          x: clamp(Number(textX) || 0, 0, width - 40),
          y: clamp(Number(textY) || 0, 0, height - 20),
          size: sz,
          font: bodyFont,
          color: col,
        });
      });
    }

    if (signatureImage) {
      const index = clamp(Number(signaturePage) || 1, 1, pages.length) - 1;
      const page = pages[index];
      const { width, height } = page.getSize();
      const image = signatureImage.includes("image/png")
        ? await doc.embedPng(signatureImage)
        : await doc.embedJpg(signatureImage);

      const drawWidth = clamp(Number(signatureWidth) || 120, 20, width);
      const drawHeight = clamp(Number(signatureHeight) || 40, 20, height);
      page.drawImage(image, {
        x: clamp(Number(signatureX) || 0, 0, width - drawWidth),
        y: clamp(Number(signatureY) || 0, 0, height - drawHeight),
        width: drawWidth,
        height: drawHeight,
        opacity: clamp(Number(signatureOpacity) || 1, 0.1, 1),
      });
    }

    return doc.save();
  };

  const addTextAnnotation = () => {
    if (!textContent.trim()) {
      toast.error("Enter text before adding an annotation.");
      return;
    }
    if (applyTextToAllPages) {
      toast.error('Turn off "Same text on every page" to queue separate lines, or download to apply.');
      return;
    }

    setTextAnnotations((prev) => [
      ...prev,
      {
        page: textPage,
        x: textX,
        y: textY,
        size: textSize,
        color: textColorHex,
        content: textContent.trim(),
        fontFamily: textFontFamily,
      },
    ]);
    setTextContent("");
    toast.success("Text annotation added to queue.");
  };

  const presetTextPosition = (preset) => {
    if (!firstPageSize) return;
    const { width, height } = firstPageSize;
    if (preset === "bottom-right") {
      setTextX(Math.max(36, width - 220));
      setTextY(48);
    } else if (preset === "center") {
      setTextX(Math.max(36, width / 2 - 120));
      setTextY(Math.max(36, height / 2 - 10));
    } else if (preset === "top-left") {
      setTextX(48);
      setTextY(Math.max(36, height - 72));
    }
  };

  const removeTextAnnotation = (index) => {
    setTextAnnotations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSignatureUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const isPngOrJpg = ["image/png", "image/jpeg"].includes(file.type);
    if (!isPngOrJpg) {
      toast.error("Use a PNG or JPG image for signature.");
      return;
    }

    try {
      const dataUrl = await readAsDataURL(file);
      setSignatureImage(dataUrl);
      toast.success("Signature image loaded.");
    } catch (error) {
      toast.error(error.message || "Could not load signature image.");
    } finally {
      event.target.value = "";
    }
  };

  const downloadEditedPdf = async () => {
    if (!canEdit) {
      toast.error("Upload a PDF first.");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("Applying edits to your PDF...");
    try {
      const editedBytes = await applyCommonEdits(baseBuffer);
      const filename = `PAAN_Edited_${baseFile?.name || "document.pdf"}`;
      triggerDownload(editedBytes, filename);
      toast.success("Edited PDF downloaded.", { id: toastId });
    } catch (error) {
      toast.error(error.message || "Failed to edit PDF.", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  const mergePdfs = async () => {
    if (!canEdit) {
      toast.error("Upload a main PDF first.");
      return;
    }
    if (!extraFiles.length) {
      toast.error("Select multiple PDFs in one upload: first file is the main document; others are merged.");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("Merging PDFs...");
    try {
      const baseEditedBytes = await applyCommonEdits(baseBuffer);
      const mergedDoc = await PDFDocument.create();

      const mainDoc = await PDFDocument.load(baseEditedBytes);
      const mainPages = await mergedDoc.copyPages(mainDoc, mainDoc.getPageIndices());
      mainPages.forEach((page) => mergedDoc.addPage(page));

      for (const file of extraFiles) {
        const bytes = await readAsArrayBuffer(file);
        const doc = await PDFDocument.load(bytes);
        const pages = await mergedDoc.copyPages(doc, doc.getPageIndices());
        pages.forEach((page) => mergedDoc.addPage(page));
      }

      const mergedBytes = await mergedDoc.save();
      triggerDownload(mergedBytes, "PAAN_Merged_Document.pdf");
      toast.success("Merged PDF downloaded.", { id: toastId });
    } catch (error) {
      toast.error(error.message || "Merge failed.", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  const splitPdfByRange = async () => {
    if (!canEdit) {
      toast.error("Upload a PDF first.");
      return;
    }
    if (!splitRange.trim()) {
      toast.error("Enter split page range.");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("Creating split PDF...");
    try {
      const editedBytes = await applyCommonEdits(baseBuffer);
      const source = await PDFDocument.load(editedBytes);
      const indices = parsePageRange(splitRange, source.getPageCount());
      if (!indices.length) throw new Error("No pages matched your range.");

      const out = await PDFDocument.create();
      const pages = await out.copyPages(source, indices);
      pages.forEach((page) => out.addPage(page));
      const bytes = await out.save();
      triggerDownload(bytes, "PAAN_Split_Selection.pdf");
      toast.success("Split PDF downloaded.", { id: toastId });
    } catch (error) {
      toast.error(error.message || "Split failed.", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  const extractWithoutRange = async () => {
    if (!canEdit) {
      toast.error("Upload a PDF first.");
      return;
    }
    if (!extractRange.trim()) {
      toast.error("Enter pages to remove (e.g. 2,4-6).");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("Extracting cleaned PDF...");
    try {
      const editedBytes = await applyCommonEdits(baseBuffer);
      const source = await PDFDocument.load(editedBytes);
      const all = source.getPageIndices();
      const removeSet = new Set(parsePageRange(extractRange, source.getPageCount()));
      const keep = all.filter((index) => !removeSet.has(index));
      if (!keep.length) throw new Error("This operation removed all pages.");

      const out = await PDFDocument.create();
      const pages = await out.copyPages(source, keep);
      pages.forEach((page) => out.addPage(page));
      const bytes = await out.save();
      triggerDownload(bytes, "PAAN_Extracted_Document.pdf");
      toast.success("Extracted PDF downloaded.", { id: toastId });
    } catch (error) {
      toast.error(error.message || "Extraction failed.", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SEO
        title="Free PDF Editor | Edit, Merge, Sign & Split PDFs Online | PAAN Africa"
        description="Free PDF editor in your browser: preview PDFs, add text and signatures, watermark, page numbers, merge or split files, then download. Private client-side editing by PAAN Africa."
        keywords="free PDF editor, online PDF editor, edit PDF free, merge PDF, split PDF, sign PDF online, PDF signature, watermark PDF, PDF tools, PAAN Africa, paan.africa"
        canonicalUrl="https://paan.africa/pdf-editor"
        ogTitle="Free PDF Editor — Edit, merge & sign PDFs online | PAAN"
        ogDescription="Merge, split, sign, and annotate PDFs in your browser. Free PDF editor with preview, text, signatures, and watermarks. No server upload of your files."
        twitterTitle="Free PDF Editor | PAAN Africa"
        twitterDescription="Edit, merge, split, and sign PDFs free in your browser. Preview, text, watermarks, and more."
      />

      <Header navLinkColor="text-white" />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
        <div className="relative bg-paan-dark-blue text-white pt-24 pb-14 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative mx-auto max-w-6xl px-4 py-14">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Icon icon="mdi:file-pdf-box" className="w-16 h-16 text-paan-yellow" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Comprehensive <span className="text-paan-red">PDF Editor</span>
              </h1>
              <p className="text-md md:text-xl text-white/90 max-w-4xl mx-auto font-light">
                Upload once, preview in the viewer, then edit, sign, merge, split, and export in your browser.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 -mt-8 mb-14 relative z-20">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 md:p-8 space-y-6">
            <section className="rounded-2xl border-2 border-dashed border-[#84C1D9]/60 bg-gradient-to-br from-gray-50 to-white p-5 md:p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Icon icon="mdi:upload" className="w-6 h-6 text-paan-dark-blue" />
                Upload PDF (single or multiple)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                The <strong>first file</strong> is the document you edit and preview. <strong>Additional PDFs</strong> are queued to append when you tap Merge and Download.
              </p>
              <label className="flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer">
                <span className="inline-flex items-center justify-center rounded-full bg-paan-red text-white px-5 py-2.5 text-sm font-semibold hover:bg-red-600 transition-colors">
                  Choose PDF file(s)
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={handlePdfFilesUpload}
                  className="hidden"
                />
                <span className="text-sm text-gray-500">
                  {loadingBase ? "Reading…" : "PDF only - hold Ctrl/Cmd to select several files."}
                </span>
              </label>
              <p className="text-sm text-gray-700 mt-3">
                {baseFile ? (
                  <>
                    <span className="font-medium">{baseFile.name}</span>
                    <span className="text-gray-500"> — {basePageCount} page(s)</span>
                    {extraFiles.length > 0 && (
                      <span className="block mt-1 text-paan-dark-blue">
                        + {extraFiles.length} extra PDF(s) for merge: {extraFiles.map((f) => f.name).join(", ")}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-gray-500">No document loaded yet.</span>
                )}
              </p>
            </section>

            {canEdit && viewerUrl && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                <div className="xl:col-span-7 space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Icon icon="mdi:eye-outline" className="w-6 h-6 text-paan-dark-blue" />
                      Preview
                    </h3>
                    <span className="text-xs text-gray-500">Scroll inside the frame to read pages</span>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-[#525659] overflow-hidden shadow-inner min-h-[420px]">
                    <iframe
                      title="PDF preview"
                      src={`${viewerUrl}#toolbar=1&navpanes=0`}
                      className="w-full h-[min(70vh,640px)] bg-white"
                    />
                  </div>
                </div>

                <div className="xl:col-span-5 space-y-6 max-h-[min(75vh,720px)] overflow-y-auto pr-1">
                  <div className="p-4 rounded-2xl border border-gray-200 bg-white">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Icon icon="mdi:tune" className="w-5 h-5" />
                      General
                    </h4>
                    <label className="block text-sm font-medium mb-2">Rotate every page</label>
                    <select
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full mb-3 rounded-lg border border-gray-300 p-2.5 text-sm"
                    >
                      <option value={0}>0°</option>
                      <option value={90}>90°</option>
                      <option value={180}>180°</option>
                      <option value={270}>270°</option>
                    </select>
                    <label className="block text-sm font-medium mb-2">Watermark</label>
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      placeholder="CONFIDENTIAL"
                      className="w-full mb-2 rounded-lg border border-gray-300 p-2.5 text-sm"
                    />
                    <label className="text-xs text-gray-600">Opacity ({watermarkOpacity})</label>
                    <input
                      type="range"
                      min="0.05"
                      max="0.9"
                      step="0.05"
                      value={watermarkOpacity}
                      onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="p-4 rounded-2xl border border-gray-200 bg-white">
                    <h4 className="font-semibold text-gray-800 mb-3">Page numbers</h4>
                    <label className="flex items-center gap-2 mb-2 text-sm">
                      <input type="checkbox" checked={pageNumberEnabled} onChange={(e) => setPageNumberEnabled(e.target.checked)} />
                      Show page numbers
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        min="1"
                        value={pageNumberStart}
                        onChange={(e) => setPageNumberStart(Number(e.target.value) || 1)}
                        className="rounded-lg border border-gray-300 p-2 text-sm"
                        placeholder="Start at"
                      />
                      <select
                        value={pageNumberPosition}
                        onChange={(e) => setPageNumberPosition(e.target.value)}
                        className="rounded-lg border border-gray-300 p-2 text-sm"
                      >
                        <option value="bottom-right">Bottom right</option>
                        <option value="bottom-left">Bottom left</option>
                        <option value="top-right">Top right</option>
                        <option value="top-left">Top left</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-gray-200 bg-white">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Icon icon="mdi:format-text" className="w-5 h-5 text-paan-dark-blue" />
                      Add text to PDF
                    </h4>
                    <p className="text-xs text-gray-500 mb-3">
                      Type your text, set page and position (PDF points, bottom-left origin), then download or queue multiple lines.
                    </p>
                    <label className="block text-sm font-medium mb-1">Font</label>
                    <select
                      value={textFontFamily}
                      onChange={(e) => setTextFontFamily(e.target.value)}
                      className="w-full mb-3 rounded-lg border border-gray-300 p-2 text-sm"
                    >
                      {TEXT_FONT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <textarea
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder="Type the text to add to the PDF…"
                      className="w-full mb-2 rounded-lg border border-gray-300 p-2 text-sm min-h-[80px]"
                    />
                    <label className="flex items-center gap-2 mb-2 text-sm">
                      <input
                        type="checkbox"
                        checked={applyTextToAllPages}
                        onChange={(e) => setApplyTextToAllPages(e.target.checked)}
                      />
                      Same text on every page
                    </label>
                    <p className="text-xs text-gray-500 mb-2">Quick position (from first page size)</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => presetTextPosition("bottom-right")}
                        disabled={!firstPageSize}
                        className="rounded-full border border-gray-300 px-3 py-1 text-xs disabled:opacity-50"
                      >
                        Bottom right
                      </button>
                      <button
                        type="button"
                        onClick={() => presetTextPosition("center")}
                        disabled={!firstPageSize}
                        className="rounded-full border border-gray-300 px-3 py-1 text-xs disabled:opacity-50"
                      >
                        Center
                      </button>
                      <button
                        type="button"
                        onClick={() => presetTextPosition("top-left")}
                        disabled={!firstPageSize}
                        className="rounded-full border border-gray-300 px-3 py-1 text-xs disabled:opacity-50"
                      >
                        Top left
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="number"
                        value={textPage}
                        min="1"
                        max={basePageCount || 1}
                        disabled={applyTextToAllPages}
                        onChange={(e) => setTextPage(Number(e.target.value) || 1)}
                        className="rounded-lg border border-gray-300 p-2 text-sm disabled:bg-gray-100"
                        placeholder="Page #"
                      />
                      <input type="color" value={textColorHex} onChange={(e) => setTextColorHex(e.target.value)} className="h-10 w-full rounded border border-gray-300" title="Text color" />
                      <input type="number" value={textX} onChange={(e) => setTextX(Number(e.target.value) || 0)} className="rounded-lg border border-gray-300 p-2 text-sm" placeholder="X" />
                      <input type="number" value={textY} onChange={(e) => setTextY(Number(e.target.value) || 0)} className="rounded-lg border border-gray-300 p-2 text-sm" placeholder="Y" />
                      <input
                        type="number"
                        value={textSize}
                        min="8"
                        max="96"
                        onChange={(e) => setTextSize(Number(e.target.value) || 12)}
                        className="rounded-lg border border-gray-300 p-2 text-sm col-span-2"
                        placeholder="Font size"
                      />
                    </div>
                    <button type="button" onClick={addTextAnnotation} className="w-full rounded-full bg-paan-dark-blue text-white py-2 text-sm font-medium">
                      Queue this line (single page)
                    </button>
                    {!!textAnnotations.length && (
                      <ul className="mt-2 max-h-24 overflow-y-auto text-xs space-y-1 border-t border-gray-100 pt-2">
                        {textAnnotations.map((item, idx) => (
                          <li key={`${item.page}-${idx}`} className="flex justify-between gap-2">
                            <span className="truncate">P{item.page}: {item.content}</span>
                            <button type="button" className="text-red-600 shrink-0" onClick={() => removeTextAnnotation(idx)}>
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl border border-gray-200 bg-white">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Icon icon="mdi:draw" className="w-5 h-5" />
                      Draw signature
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">Draw with mouse or finger, then apply.</p>
                    <div className="rounded-lg border border-gray-300 bg-white overflow-hidden touch-none">
                      <canvas
                        ref={signatureCanvasRef}
                        width={CANVAS_W}
                        height={CANVAS_H}
                        className="w-full max-w-full h-[140px] cursor-crosshair"
                        onMouseDown={startDrawSignature}
                        onMouseMove={moveDrawSignature}
                        onMouseUp={endDrawSignature}
                        onMouseLeave={endDrawSignature}
                        onTouchStart={startDrawSignature}
                        onTouchMove={moveDrawSignature}
                        onTouchEnd={endDrawSignature}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button type="button" onClick={clearSignatureCanvas} className="rounded-full border border-gray-300 px-3 py-1.5 text-sm">
                        Clear
                      </button>
                      <button type="button" onClick={applyDrawnSignature} className="rounded-full bg-paan-yellow text-paan-dark-blue px-3 py-1.5 text-sm font-semibold">
                        Use drawn signature
                      </button>
                    </div>
                    <label className="block text-sm font-medium mt-3 mb-1">Or upload image (PNG/JPG)</label>
                    <input type="file" accept="image/png,image/jpeg" onChange={handleSignatureUpload} className="w-full text-sm" />
                    <p className="text-xs text-gray-500 mt-2">Placement (PDF points, bottom-left origin)</p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <input type="number" min="1" max={basePageCount || 1} value={signaturePage} onChange={(e) => setSignaturePage(Number(e.target.value) || 1)} className="rounded-lg border border-gray-300 p-2 text-sm" placeholder="Page" />
                      <input type="number" value={signatureOpacity} min="0.1" max="1" step="0.1" onChange={(e) => setSignatureOpacity(Number(e.target.value) || 1)} className="rounded-lg border border-gray-300 p-2 text-sm" placeholder="Opacity" />
                      <input type="number" value={signatureX} onChange={(e) => setSignatureX(Number(e.target.value) || 0)} className="rounded-lg border border-gray-300 p-2 text-sm" placeholder="X" />
                      <input type="number" value={signatureY} onChange={(e) => setSignatureY(Number(e.target.value) || 0)} className="rounded-lg border border-gray-300 p-2 text-sm" placeholder="Y" />
                      <input type="number" value={signatureWidth} onChange={(e) => setSignatureWidth(Number(e.target.value) || 120)} className="rounded-lg border border-gray-300 p-2 text-sm" placeholder="W" />
                      <input type="number" value={signatureHeight} onChange={(e) => setSignatureHeight(Number(e.target.value) || 40)} className="rounded-lg border border-gray-300 p-2 text-sm" placeholder="H" />
                    </div>
                    {signatureImage && (
                      <img src={signatureImage} alt="Active signature" className="mt-2 max-h-14 rounded border border-gray-200 bg-white p-1" />
                    )}
                  </div>

                  <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50">
                    <h4 className="font-semibold text-gray-800 mb-2">Split / remove pages</h4>
                    <input
                      type="text"
                      value={splitRange}
                      onChange={(e) => setSplitRange(e.target.value)}
                      placeholder="Split range: 1-3,7"
                      className="w-full rounded-lg border border-gray-300 p-2 text-sm mb-2"
                    />
                    <button type="button" onClick={splitPdfByRange} disabled={isProcessing} className="w-full bg-paan-dark-blue text-white rounded-full py-2 text-sm mb-3 disabled:opacity-60">
                      Download split selection
                    </button>
                    <input
                      type="text"
                      value={extractRange}
                      onChange={(e) => setExtractRange(e.target.value)}
                      placeholder="Remove pages: 2,4-6"
                      className="w-full rounded-lg border border-gray-300 p-2 text-sm mb-2"
                    />
                    <button type="button" onClick={extractWithoutRange} disabled={isProcessing} className="w-full bg-paan-yellow text-paan-dark-blue rounded-full py-2 text-sm font-semibold disabled:opacity-60">
                      Download without those pages
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 pb-2">
                    <button
                      type="button"
                      onClick={downloadEditedPdf}
                      disabled={!canEdit || isProcessing}
                      className="w-full bg-paan-red text-white rounded-full py-3 font-semibold disabled:opacity-60"
                    >
                      Download edited PDF
                    </button>
                    <button
                      type="button"
                      onClick={mergePdfs}
                      disabled={!canEdit || isProcessing || !extraFiles.length}
                      className="w-full bg-paan-dark-blue text-white rounded-full py-3 font-semibold disabled:opacity-60"
                      title={!extraFiles.length ? "Upload multiple PDFs in one go to enable merge" : ""}
                    >
                      Merge & download {extraFiles.length ? `(${extraFiles.length} extra)` : ""}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!canEdit && (
              <p className="text-center text-gray-500 text-sm py-8">
                Upload a PDF above to open the viewer and editing tools.
              </p>
            )}
          </div>
        </div>
        <Footer />
      </main>
      <ScrollToTop />
    </>
  );
};

export default PDFEditorPage;
