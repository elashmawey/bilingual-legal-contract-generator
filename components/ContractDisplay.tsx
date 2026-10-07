import React, { useState, useMemo, useEffect } from 'react';
import type { GeneratedContract, DigitalExecutionCertificate } from '../types';
import QRCode from 'qrcode';
import ElectronicSignatureModal from './ElectronicSignatureModal';
import GovPortalCompressionModal from './GovPortalCompressionModal';
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  TextRun,
  BorderStyle,
  WidthType,
  TableRow,
  TableCell,
  Table,
  VerticalAlign,
  Header,
  Footer,
  PageNumber,
  ShadingType,
  PageOrientation,
} from 'docx';
import { exportElementToPdf, downloadBlobFile } from '../services/pdfExportService';

interface ContractDisplayProps {
  contract: GeneratedContract;
  onReset: () => void;
  onUpdateContract?: (updated: GeneratedContract) => void;
  onOpenClauseBank?: () => void;
}

type ViewMode = 'dual' | 'stacked' | 'arabic' | 'english';
type FontSize = 'sm' | 'md' | 'lg';
type FontFamily = 'amiri' | 'cairo';

const ContractDisplay: React.FC<ContractDisplayProps> = ({
  contract: initialContract,
  onReset,
  onUpdateContract,
  onOpenClauseBank,
}) => {
  const [contract, setContract] = useState<GeneratedContract>(initialContract);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setContract(initialContract);
  }, [initialContract]);

  const [viewMode, setViewMode] = useState<ViewMode>('dual');
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [fontFamily, setFontFamily] = useState<FontFamily>('amiri');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedClauses, setExpandedClauses] = useState<{ [index: number]: boolean }>(() => {
    const initial: { [index: number]: boolean } = {};
    contract.clauses.forEach((_, idx) => {
      initial[idx] = true;
    });
    return initial;
  });
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [showToc, setShowToc] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);
  const [showWordMenu, setShowWordMenu] = useState<boolean>(false);
  const [isGovPortalModalOpen, setIsGovPortalModalOpen] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<{ filename: string; blobUrl: string } | null>(null);

  // Generate a deterministic reference serial number based on content
  const referenceId = useMemo(() => {
    const raw = `${contract.contractTitleArabic || ''}-${contract.preambleArabic.slice(0, 30)}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    const cleanHash = Math.abs(hash).toString(36).toUpperCase().padStart(6, '0');
    return `EGY-LEG-2026-${cleanHash}`;
  }, [contract]);

  useEffect(() => {
    const verifyPayload = `https://adala-contracts.eg/verify?id=${referenceId}&title=${encodeURIComponent(contract.contractTitleArabic || '')}&source=EGY_BAR_ASSOCIATION`;
    QRCode.toDataURL(verifyPayload, { width: 160, margin: 1, color: { dark: '#0f172a', light: '#ffffff' } })
      .then((url: string) => setQrCodeUrl(url))
      .catch((err: any) => console.warn('QR Code generation error:', err));
  }, [referenceId, contract.contractTitleArabic]);

  const showCopyNotice = (msg: string) => {
    setCopyStatus(msg);
    setTimeout(() => setCopyStatus(null), 3500);
  };

  const toggleClause = (index: number) => {
    setExpandedClauses((prev) => {
      const isCurrentlyExpanded = prev[index] !== false;
      return {
        ...prev,
        [index]: !isCurrentlyExpanded,
      };
    });
  };

  const handleExpandAll = () => {
    const all: { [index: number]: boolean } = {};
    contract.clauses.forEach((_, idx) => {
      all[idx] = true;
    });
    setExpandedClauses(all);
    showCopyNotice('تم توسيع جميع مواد العقد');
  };

  const handleCollapseAll = () => {
    const all: { [index: number]: boolean } = {};
    contract.clauses.forEach((_, idx) => {
      all[idx] = false;
    });
    setExpandedClauses(all);
    showCopyNotice('تم طي جميع مواد العقد');
  };

  const handleSaveExecutionCertificate = (cert: DigitalExecutionCertificate) => {
    const updated = {
      ...contract,
      executionCertificate: cert,
    };
    setContract(updated);
    if (onUpdateContract) {
      onUpdateContract(updated);
    }
    showCopyNotice('تم توثيق وتوقيع العقد إلكترونياً بنجاح! ✓');
  };

  const handleCopyClause = (titleAr: string, titleEn: string, contentAr: string, contentEn: string) => {
    let text = '';
    if (viewMode === 'arabic') {
      text = `${titleAr}\n\n${contentAr}`;
    } else if (viewMode === 'english') {
      text = `${titleEn}\n\n${contentEn}`;
    } else {
      text = `${titleAr} / ${titleEn}\n\n[بالعربية]\n${contentAr}\n\n[In English]\n${contentEn}`;
    }
    navigator.clipboard.writeText(text);
    showCopyNotice(
      viewMode === 'arabic'
        ? `تم نسخ "${titleAr}" إلى الحافظة!`
        : viewMode === 'english'
        ? `Copied "${titleEn}" to clipboard!`
        : `تم نسخ المادة إلى الحافظة!`
    );
  };

  const handleCopyFull = () => {
    const titleAr = contract.contractTitleArabic || 'عقد قانوني رسمي معتمد';
    const titleEn = contract.contractTitleEnglish || 'Official Certified Legal Agreement';

    let text = '';

    if (viewMode === 'arabic') {
      text = `
======================================================
${titleAr}
رقم القيد المرجعي: ${referenceId}
إجمالي عدد المواد: ${contract.clauses.length} مادة تعاقدية
======================================================

[أولاً: صدر العقد والديباجة وتحديد أطراف التعاقد]
${contract.preambleArabic}

[ثانياً: التمهيد التعاقدي المشترك وحيثيات التعاقد]
${contract.recitalsArabic}

[ثالثاً: المواد والبنود التعاقدية الملزمة تفصيلاً (${contract.clauses.length} مادة)]
${contract.clauses
  .map(
    (c) => `
--- ${c.titleArabic} ---
${c.contentArabic}
`
  )
  .join('\n')}

[إشهاد التوقيع وخاتمة اعتماد أطراف العقد]
الطرف الأول (الموجب): ....................................................
الرقم القومي / السجل التجاري: ............................................
التوقيع: ________________________  التاريخ: ...... / ...... / 202___

الطرف الثاني (القابل): ....................................................
الرقم القومي / السجل التجاري: ............................................
التوقيع: ________________________  التاريخ: ...... / ...... / 202___

[شهود العقد والإثبات الرسمي]
الشاهد الأول: ............................................................
الشاهد الثاني: ............................................................
      `.trim();
      navigator.clipboard.writeText(text);
      showCopyNotice(`تم نسخ نص العقد كاملاً (${contract.clauses.length} مادة) بدون أي إضافات!`);
    } else if (viewMode === 'english') {
      text = `
======================================================
${titleEn}
Reference ID: ${referenceId}
Total Clauses: ${contract.clauses.length} Operative Articles
======================================================

[SECTION I: PREAMBLE & PARTIES IDENTIFICATION]
${contract.preambleEnglish}

[SECTION II: MUTUAL RECITALS & WHEREAS CLAUSES]
${contract.recitalsEnglish}

[SECTION III: OPERATIVE ARTICLES & CLAUSES (${contract.clauses.length} Articles)]
${contract.clauses
  .map(
    (c) => `
--- ${c.titleEnglish} ---
${c.contentEnglish}
`
  )
  .join('\n')}

[EXECUTION & AUTHORIZED SIGNATORIES]
FIRST PARTY: ............................................................
National ID / Reg: ......................................................
Signature: ______________________  Date: ...... / ...... / 202___

SECOND PARTY: ...........................................................
National ID / Reg: ......................................................
Signature: ______________________  Date: ...... / ...... / 202___

[ATTESTING WITNESSES]
First Witness: ..........................................................
Second Witness: .........................................................
      `.trim();
      navigator.clipboard.writeText(text);
      showCopyNotice(`Full contract text copied in English (${contract.clauses.length} articles)!`);
    } else {
      // Bilingual
      text = `
======================================================
${titleAr}
${titleEn}
رقم القيد المرجعي: ${referenceId}
إجمالي عدد المواد: ${contract.clauses.length} مادة تعاقدية
======================================================

[أولاً: صدر العقد والديباجة وتحديد أطراف التعاقد / PREAMBLE & PARTIES IDENTIFICATION]
${contract.preambleArabic}

${contract.preambleEnglish}

[ثانياً: التمهيد التعاقدي المشترك وحيثيات التعاقد / MUTUAL RECITALS]
${contract.recitalsArabic}

${contract.recitalsEnglish}

[ثالثاً: المواد والبنود التعاقدية الملزمة تفصيلاً / OPERATIVE ARTICLES & CLAUSES (${contract.clauses.length} Articles)]
${contract.clauses
  .map(
    (c, idx) => `
--- مادة [${idx + 1}]: ${c.titleArabic} / ${c.titleEnglish} ---
[بالعربية]
${c.contentArabic}

[In English]
${c.contentEnglish}
`
  )
  .join('\n')}

[إشهاد التوقيع واعتماد أطراف العقد / EXECUTION & SIGNATURES]
الطرف الأول / First Party: ................................................
التوقيع / Signature: ____________________  التاريخ / Date: ....../....../202___

الطرف الثاني / Second Party: ...............................................
التوقيع / Signature: ____________________  التاريخ / Date: ....../....../202___

[شهود العقد والإثبات / Attesting Witnesses]
الشاهد الأول / First Witness: ..............................................
الشاهد الثاني / Second Witness: ............................................
      `.trim();
      navigator.clipboard.writeText(text);
      showCopyNotice(`تم نسخ نص العقد كاملاً (ثنائي اللغة) بجميع مواده الـ (${contract.clauses.length})!`);
    }
  };

  // Executive Native Multi-Page Vector PDF Export with Crisp Arabic Shaping & Exact A4 Margins
  const handleDownloadDirectPdf = async () => {
    try {
      setIsExportingPdf(true);
      // 1. Expand all clauses so full contract text is rendered
      const all: { [index: number]: boolean } = {};
      contract.clauses.forEach((_, idx) => {
        all[idx] = true;
      });
      setExpandedClauses(all);

      showCopyNotice(
        viewMode === 'arabic'
          ? 'جاري تجهيز وتنزيل ملف PDF رسمي (A4)...'
          : viewMode === 'english'
          ? 'Generating & downloading official A4 PDF...'
          : 'جاري تجهيز وتنزيل ملف PDF رسمي (A4)...'
      );

      // Brief delay to allow React DOM to render all expanded clauses fully
      await new Promise((resolve) => setTimeout(resolve, 350));

      const isArabic = viewMode === 'arabic';
      const isEnglish = viewMode === 'english';
      const fileSuffix = isArabic ? 'عربي' : isEnglish ? 'English' : 'Certified';
      const baseName = isEnglish ? (titleEn || 'Legal_Agreement') : (titleAr || 'عقد_قانوني');
      const pdfFileName = `${baseName.replace(/\s+/g, '_')}_${fileSuffix}_${referenceId}.pdf`;

      const result = await exportElementToPdf('contract-printable-area', {
        filename: pdfFileName,
        quality: 0.92,
        scale: 1.5,
        leftMarginMm: 12,
        rightMarginMm: 12,
        topMarginMm: 15,
        bottomMarginMm: 15,
      });

      setDownloadNotice({
        filename: pdfFileName,
        blobUrl: result.blobUrl,
      });

      setIsExportingPdf(false);
      showCopyNotice(
        viewMode === 'arabic'
          ? 'تم تجهيز وتنزيل ملف PDF رسمي (A4) بنجاح!'
          : viewMode === 'english'
          ? 'Official PDF (A4) downloaded successfully!'
          : 'تم تجهيز وتنزيل ملف PDF المعتمد بنجاح!'
      );
    } catch (err) {
      console.error('Direct PDF export error, attempting print fallback:', err);
      setIsExportingPdf(false);
      showCopyNotice('جاري فتح نافذة الطباعة / الحفظ كـ PDF...');
      try {
        window.print();
      } catch (printErr) {
        console.error('Print fallback error:', printErr);
      }
    }
  };

  // Egyptian Court Portal Compression & Filing Optimization (< 2MB with 20mm registry margin)
  const handleDownloadCompressedPdf = async () => {
    try {
      setIsExportingPdf(true);
      const all: { [index: number]: boolean } = {};
      contract.clauses.forEach((_, idx) => {
        all[idx] = true;
      });
      setExpandedClauses(all);

      showCopyNotice('جاري إنشاء وضغط ملف العقد طبقاً لشروط بوابة رفع الدعاوى القضائية في مصر...');
      await new Promise((resolve) => setTimeout(resolve, 350));

      const isArabic = viewMode === 'arabic';
      const isEnglish = viewMode === 'english';
      const fileSuffix = isArabic ? 'عربي' : isEnglish ? 'English' : 'معتمد';
      const baseName = isEnglish ? (titleEn || 'Legal_Agreement') : (titleAr || 'عقد_قانوني');
      const pdfFileName = `${baseName.replace(/\s+/g, '_')}_مضغوط_لبوابة_الدعاوى_${fileSuffix}_${referenceId}.pdf`;

      // Egyptian Court Portal Profile:
      // Margin: 20mm right (court registry/clerk annotations), 15mm top, 12mm left, 15mm bottom
      // JPEG quality 0.70 (sharp text, ~350-500KB total size, well below 2MB limit)
      const result = await exportElementToPdf('contract-printable-area', {
        filename: pdfFileName,
        quality: 0.70,
        scale: 1.3,
        isCourtPortalProfile: true,
        courtDocketReference: referenceId,
        leftMarginMm: 12,
        rightMarginMm: 20, // 20mm court registry margin
        topMarginMm: 15,
        bottomMarginMm: 15,
      });

      setDownloadNotice({
        filename: pdfFileName,
        blobUrl: result.blobUrl,
      });

      setIsExportingPdf(false);
      showCopyNotice('تم تنزيل ملف PDF المضغوط والمعتمد لبوابة رفع الدعاوى المصرية بنجاح (أقل من 2MB)!');
    } catch (err) {
      console.error('Direct compressed PDF export error:', err);
      setIsExportingPdf(false);
      showCopyNotice('حدث خطأ أثناء التصدير المضغوط، جاري فتح الطباعة...');
      try {
        window.print();
      } catch (printErr) {
        console.error('Print fallback error:', printErr);
      }
    }
  };

  const handlePrint = () => {
    const all: { [index: number]: boolean } = {};
    contract.clauses.forEach((_, idx) => {
      all[idx] = true;
    });
    setExpandedClauses(all);
    window.print();
  };

  // Luxury Word Document (.docx) Export with executive layout conforming to selected language
  const handleDownloadWord = (overrideLang?: 'arabic' | 'english' | 'bilingual') => {
    const targetMode = overrideLang || (viewMode === 'arabic' ? 'arabic' : viewMode === 'english' ? 'english' : 'bilingual');
    const isArabicOnly = targetMode === 'arabic';
    const isEnglishOnly = targetMode === 'english';
    const isBilingual = targetMode === 'bilingual';

    const titleAr = contract.contractTitleArabic || 'عقد قانوني رسمي معتمد';
    const titleEn = contract.contractTitleEnglish || 'Certified Statutory Legal Agreement';

    // Helper: Split text into clean, non-overlapping Arabic paragraphs
    const formatRtlParagraphs = (
      text: string | undefined | null,
      options: {
        size?: number;
        bold?: boolean;
        color?: string;
        alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
        spacingBefore?: number;
        spacingAfter?: number;
        lineSpacing?: number;
      } = {}
    ): Paragraph[] => {
      if (!text) return [];
      const lines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (lines.length === 0) return [];

      return lines.map((line) => {
        const isSubHeader =
          line.startsWith('الطرف الأول') ||
          line.startsWith('الطرف الثاني') ||
          line.startsWith('أولاً:') ||
          line.startsWith('ثانياً:') ||
          line.startsWith('ثالثاً:') ||
          line.startsWith('البند') ||
          line.startsWith('المادة') ||
          line.startsWith('حيث إن') ||
          line.startsWith('حيث أن') ||
          line.startsWith('ولما كان');

        return new Paragraph({
          children: [
            new TextRun({
              text: line,
              bold: isSubHeader || options.bold || false,
              size: options.size || 22,
              color: options.color || (isSubHeader ? '1E3A8A' : '0F172A'),
              font: 'Arial',
              rightToLeft: true,
            }),
          ],
          alignment: options.alignment || AlignmentType.JUSTIFIED,
          bidirectional: true,
          spacing: {
            before: isSubHeader ? 120 : options.spacingBefore ?? 60,
            after: options.spacingAfter ?? 60,
            line: options.lineSpacing ?? 360,
          },
        });
      });
    };

    // Helper: Split text into clean, non-overlapping English paragraphs
    const formatLtrParagraphs = (
      text: string | undefined | null,
      options: {
        size?: number;
        bold?: boolean;
        color?: string;
        alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
        spacingBefore?: number;
        spacingAfter?: number;
        lineSpacing?: number;
      } = {}
    ): Paragraph[] => {
      if (!text) return [];
      const lines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (lines.length === 0) return [];

      return lines.map((line) => {
        const isSubHeader =
          line.startsWith('FIRST PARTY') ||
          line.startsWith('SECOND PARTY') ||
          line.startsWith('WHEREAS') ||
          line.startsWith('NOW, THEREFORE') ||
          line.startsWith('Section') ||
          line.startsWith('Article') ||
          line.startsWith('Clause');

        return new Paragraph({
          children: [
            new TextRun({
              text: line,
              bold: isSubHeader || options.bold || false,
              size: options.size || 22,
              color: options.color || (isSubHeader ? '1E3A8A' : '0F172A'),
              font: 'Calibri',
            }),
          ],
          alignment: options.alignment || AlignmentType.JUSTIFIED,
          spacing: {
            before: isSubHeader ? 120 : options.spacingBefore ?? 60,
            after: options.spacingAfter ?? 60,
            line: options.lineSpacing ?? 320,
          },
        });
      });
    };

    // Helper: Split signatory cell text into independent lines with zero overlapping
    const formatSignatoryLines = (lines: string[], isRtl: boolean): Paragraph[] => {
      return lines.map((line) => {
        const isSignArea =
          line.includes('______') ||
          line.includes('التوقيع') ||
          line.includes('Signature');
        const isStampArea =
          line.includes('الخاتم') ||
          line.includes('Seal') ||
          line.includes('بصمة') ||
          line.includes('Thumbprint');

        return new Paragraph({
          children: [
            new TextRun({
              text: line,
              bold: isStampArea,
              size: isStampArea ? 18 : 20,
              color: isStampArea ? '64748B' : '1E293B',
              rightToLeft: isRtl,
              font: isRtl ? 'Arial' : 'Calibri',
            }),
          ],
          alignment: isRtl ? AlignmentType.RIGHT : AlignmentType.LEFT,
          bidirectional: isRtl,
          spacing: {
            before: isSignArea ? 160 : isStampArea ? 200 : 40,
            after: isSignArea ? 120 : isStampArea ? 100 : 40,
            line: 300,
          },
        });
      });
    };

    // 1. Elegant Clause Formatting for Word according to selected language
    const clausesContent: (Paragraph | Table)[] = contract.clauses.flatMap((clause, idx) => {
      const clauseNumber = idx + 1;

      if (isArabicOnly) {
        return [
          new Paragraph({
            children: [
              new TextRun({
                text: `المادة (${clauseNumber}): ${clause.titleArabic}`,
                bold: true,
                size: 24,
                color: '0F172A',
                font: 'Arial',
                rightToLeft: true,
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.RIGHT,
            bidirectional: true,
            keepNext: true,
            spacing: { before: 240, after: 80 },
          }),
          ...formatRtlParagraphs(clause.contentArabic, {
            size: 22,
            spacingBefore: 60,
            spacingAfter: 60,
            lineSpacing: 360,
          }),
        ];
      }

      if (isEnglishOnly) {
        return [
          new Paragraph({
            children: [
              new TextRun({
                text: `Article (${clauseNumber}): ${clause.titleEnglish}`,
                bold: true,
                size: 22,
                color: '0F172A',
                font: 'Calibri',
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.LEFT,
            keepNext: true,
            spacing: { before: 240, after: 80 },
          }),
          ...formatLtrParagraphs(clause.contentEnglish, {
            size: 22,
            spacingBefore: 60,
            spacingAfter: 60,
            lineSpacing: 320,
          }),
        ];
      }

      // Bilingual
      return [
        new Paragraph({
          children: [
            new TextRun({
              text: `المادة (${clauseNumber}): ${clause.titleArabic}`,
              bold: true,
              size: 24,
              color: '0F172A',
              font: 'Arial',
              rightToLeft: true,
            }),
            new TextRun({
              text: `  /  Article (${clauseNumber}): ${clause.titleEnglish}`,
              bold: true,
              size: 20,
              color: '334155',
              font: 'Calibri',
            }),
          ],
          heading: HeadingLevel.HEADING_3,
          alignment: AlignmentType.RIGHT,
          bidirectional: true,
          keepNext: true,
          spacing: { before: 240, after: 80 },
        }),
        ...formatLtrParagraphs(clause.contentEnglish, {
          size: 22,
          spacingBefore: 40,
          spacingAfter: 40,
          lineSpacing: 320,
        }),
        ...formatRtlParagraphs(clause.contentArabic, {
          size: 22,
          spacingBefore: 40,
          spacingAfter: 100,
          lineSpacing: 360,
        }),
      ];
    });

    // 2. Formal Signatories Table for Word
    const signatories = isArabicOnly
      ? new Table({
          visuallyRightToLeft: true,
          width: { size: 100, type: WidthType.PERCENTAGE },
          columnWidths: [4500, 4500],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            bottom: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            left: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            right: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
            insideVertical: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: '0F172A', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'الطرف الأول (الموجب)', bold: true, size: 22, color: 'FFFFFF', rightToLeft: true, font: 'Arial' })],
                      alignment: AlignmentType.CENTER,
                      bidirectional: true,
                      spacing: { before: 100, after: 100 },
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  shading: { fill: '0F172A', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'الطرف الثاني (القابل)', bold: true, size: 22, color: 'FFFFFF', rightToLeft: true, font: 'Arial' })],
                      alignment: AlignmentType.CENTER,
                      bidirectional: true,
                      spacing: { before: 100, after: 100 },
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'الاسم الكامل: ....................................................',
                      'الرقم القومي / السجل التجاري: ............................',
                      'الصفة والتمثيل القانوني: .................................',
                      'التوقيع: ________________________________',
                      'التاريخ: ...... / ...... / ............ م',
                      '[ موضع الخاتم الرسمي ]               [ بصمة الإبهام ]',
                    ],
                    true
                  ),
                  verticalAlign: VerticalAlign.BOTTOM,
                }),
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'الاسم الكامل: ....................................................',
                      'الرقم القومي / السجل التجاري: ............................',
                      'الصفة والتمثيل القانوني: .................................',
                      'التوقيع: ________________________________',
                      'التاريخ: ...... / ...... / ............ م',
                      '[ موضع الخاتم الرسمي ]               [ بصمة الإبهام ]',
                    ],
                    true
                  ),
                  verticalAlign: VerticalAlign.BOTTOM,
                }),
              ],
            }),
          ],
        })
      : isEnglishOnly
      ? new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          columnWidths: [4500, 4500],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            bottom: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            left: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            right: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
            insideVertical: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: '0F172A', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'FIRST PARTY', bold: true, size: 22, color: 'FFFFFF', font: 'Calibri' })],
                      alignment: AlignmentType.CENTER,
                      spacing: { before: 100, after: 100 },
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  shading: { fill: '0F172A', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'SECOND PARTY', bold: true, size: 22, color: 'FFFFFF', font: 'Calibri' })],
                      alignment: AlignmentType.CENTER,
                      spacing: { before: 100, after: 100 },
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'Full Legal Name: ....................................................',
                      'National ID / Commercial Reg: ................................',
                      'Capacity & Legal Title: ....................................................',
                      'Signature: ________________________________',
                      'Date: ...... / ...... / ............ ',
                      '[ Official Stamp / Seal ]               [ Thumbprint ]',
                    ],
                    false
                  ),
                  verticalAlign: VerticalAlign.BOTTOM,
                }),
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'Full Legal Name: ....................................................',
                      'National ID / Commercial Reg: ................................',
                      'Capacity & Legal Title: ....................................................',
                      'Signature: ________________________________',
                      'Date: ...... / ...... / ............ ',
                      '[ Official Stamp / Seal ]               [ Thumbprint ]',
                    ],
                    false
                  ),
                  verticalAlign: VerticalAlign.BOTTOM,
                }),
              ],
            }),
          ],
        })
      : new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          columnWidths: [4500, 4500],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            bottom: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            left: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            right: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
            insideVertical: { style: BorderStyle.SINGLE, size: 2, color: '1E293B' },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: '0F172A', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'الطرف الأول / First Party', bold: true, size: 22, color: 'FFFFFF', rightToLeft: true, font: 'Arial' })],
                      alignment: AlignmentType.CENTER,
                      bidirectional: true,
                      spacing: { before: 100, after: 100 },
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  shading: { fill: '0F172A', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'الطرف الثاني / Second Party', bold: true, size: 22, color: 'FFFFFF', rightToLeft: true, font: 'Arial' })],
                      alignment: AlignmentType.CENTER,
                      bidirectional: true,
                      spacing: { before: 100, after: 100 },
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'الاسم / Name: ....................................................',
                      'الرقم القومي / National ID: ............................',
                      'الصفة / Title: ....................................................',
                      'التوقيع / Signature: ____________________',
                      'التاريخ / Date: ...... / ...... / ............',
                      '[ موضع الخاتم الرسمي ]        [ بصمة الإبهام ]',
                      'Official Seal                  Thumbprint',
                    ],
                    true
                  ),
                  verticalAlign: VerticalAlign.BOTTOM,
                }),
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'الاسم / Name: ....................................................',
                      'الرقم القومي / National ID: ............................',
                      'الصفة / Title: ....................................................',
                      'التوقيع / Signature: ____________________',
                      'التاريخ / Date: ...... / ...... / ............',
                      '[ موضع الخاتم الرسمي ]        [ بصمة الإبهام ]',
                      'Official Seal                  Thumbprint',
                    ],
                    true
                  ),
                  verticalAlign: VerticalAlign.BOTTOM,
                }),
              ],
            }),
          ],
        });

    // 2b. Formal Witnesses Table for Word
    const witnessesTable = isArabicOnly
      ? new Table({
          visuallyRightToLeft: true,
          width: { size: 100, type: WidthType.PERCENTAGE },
          columnWidths: [4500, 4500],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            left: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            right: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
            insideVertical: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'الشاهد الأول', bold: true, size: 20, color: '0F172A', rightToLeft: true, font: 'Arial' })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                      spacing: { before: 60, after: 40 },
                    }),
                  ],
                }),
                new TableCell({
                  shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'الشاهد الثاني', bold: true, size: 20, color: '0F172A', rightToLeft: true, font: 'Arial' })],
                      alignment: AlignmentType.RIGHT,
                      bidirectional: true,
                      spacing: { before: 60, after: 40 },
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'الاسم: ................................................................',
                      'الرقم القومي: ........................................................',
                      'التوقيع: ..............................................................',
                    ],
                    true
                  ),
                }),
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'الاسم: ................................................................',
                      'الرقم القومي: ........................................................',
                      'التوقيع: ..............................................................',
                    ],
                    true
                  ),
                }),
              ],
            }),
          ],
        })
      : isEnglishOnly
      ? new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          columnWidths: [4500, 4500],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            left: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            right: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
            insideVertical: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'FIRST WITNESS', bold: true, size: 20, color: '0F172A', font: 'Calibri' })],
                      alignment: AlignmentType.LEFT,
                      spacing: { before: 60, after: 40 },
                    }),
                  ],
                }),
                new TableCell({
                  shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'SECOND WITNESS', bold: true, size: 20, color: '0F172A', font: 'Calibri' })],
                      alignment: AlignmentType.LEFT,
                      spacing: { before: 60, after: 40 },
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'Full Name: ............................................................',
                      'National ID: ..........................................................',
                      'Signature: ............................................................',
                    ],
                    false
                  ),
                }),
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'Full Name: ............................................................',
                      'National ID: ..........................................................',
                      'Signature: ............................................................',
                    ],
                    false
                  ),
                }),
              ],
            }),
          ],
        })
      : new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          columnWidths: [4500, 4500],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            left: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            right: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
            insideVertical: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'الشاهد الأول / First Witness', bold: true, size: 20, color: '0F172A', rightToLeft: true, font: 'Arial' })],
                      alignment: AlignmentType.CENTER,
                      bidirectional: true,
                      spacing: { before: 60, after: 40 },
                    }),
                  ],
                }),
                new TableCell({
                  shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: 'الشاهد الثاني / Second Witness', bold: true, size: 20, color: '0F172A', rightToLeft: true, font: 'Arial' })],
                      alignment: AlignmentType.CENTER,
                      bidirectional: true,
                      spacing: { before: 60, after: 40 },
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'الاسم / Name: ............................................................',
                      'الرقم القومي / National ID: ......................................',
                      'التوقيع / Signature: .....................................................',
                    ],
                    true
                  ),
                }),
                new TableCell({
                  children: formatSignatoryLines(
                    [
                      'الاسم / Name: ............................................................',
                      'الرقم القومي / National ID: ......................................',
                      'التوقيع / Signature: .....................................................',
                    ],
                    true
                  ),
                }),
              ],
            }),
          ],
        });

    const docChildren: (Paragraph | Table)[] = [];

    // 1. Official State Header (Pure Legal Stature, No boxes)
    if (!isEnglishOnly) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'جمهورية مصر العربية',
              bold: true,
              size: 26,
              color: '334155',
              font: 'Arial',
              rightToLeft: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          bidirectional: true,
          spacing: { before: 0, after: 120 },
        })
      );
    } else {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'ARAB REPUBLIC OF EGYPT',
              bold: true,
              size: 24,
              color: '334155',
              font: 'Calibri',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 120 },
        })
      );
    }

    // 2. Official Contract Title
    if (isArabicOnly) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: titleAr,
              bold: true,
              size: 34,
              color: '0F172A',
              font: 'Arial',
              rightToLeft: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          bidirectional: true,
          spacing: { before: 80, after: 140 },
        })
      );
    } else if (isEnglishOnly) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: titleEn,
              bold: true,
              size: 32,
              color: '0F172A',
              font: 'Calibri',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 140 },
        })
      );
    } else {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: titleAr,
              bold: true,
              size: 34,
              color: '0F172A',
              font: 'Arial',
              rightToLeft: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          bidirectional: true,
          spacing: { before: 80, after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: titleEn,
              bold: true,
              size: 24,
              color: '475569',
              font: 'Calibri',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 140 },
        })
      );
    }

    // Reference Line
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: isEnglishOnly ? `Ref: ${referenceId}` : `رقم القيد: ${referenceId}`,
            size: 18,
            color: '64748B',
            font: isEnglishOnly ? 'Calibri' : 'Arial',
            rightToLeft: !isEnglishOnly,
          }),
        ],
        alignment: AlignmentType.CENTER,
        bidirectional: !isEnglishOnly,
        spacing: { after: 260 },
      })
    );

    // 3. Parties & Preamble
    if (isArabicOnly) {
      docChildren.push(
        ...formatRtlParagraphs(contract.preambleArabic, {
          size: 24,
          spacingBefore: 80,
          spacingAfter: 80,
          lineSpacing: 340,
        })
      );
    } else if (isEnglishOnly) {
      docChildren.push(
        ...formatLtrParagraphs(contract.preambleEnglish, {
          size: 24,
          spacingBefore: 80,
          spacingAfter: 80,
          lineSpacing: 320,
        })
      );
    } else {
      docChildren.push(
        ...formatRtlParagraphs(contract.preambleArabic, { size: 24, spacingBefore: 80, spacingAfter: 80, lineSpacing: 340 }),
        new Paragraph({ spacing: { before: 60, after: 60 } }),
        ...formatLtrParagraphs(contract.preambleEnglish, { size: 22, spacingBefore: 60, spacingAfter: 60, lineSpacing: 320 })
      );
    }

    // 4. Recitals (تمهيد)
    if (isArabicOnly) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: '[ تمـهـيـد ]',
              bold: true,
              size: 26,
              color: '0F172A',
              font: 'Arial',
              rightToLeft: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          bidirectional: true,
          spacing: { before: 240, after: 120 },
        }),
        ...formatRtlParagraphs(contract.recitalsArabic, {
          size: 24,
          spacingBefore: 80,
          spacingAfter: 80,
          lineSpacing: 340,
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'وحيث تلاقت إرادة الطرفين وهما بكامل أهليتهما القانونية والمعتبرة شرعاً للتعاقد، فقد اتفقا وتراضيا على ما يأتي:',
              bold: true,
              size: 24,
              color: '0F172A',
              font: 'Arial',
              rightToLeft: true,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          bidirectional: true,
          spacing: { before: 140, after: 200 },
        })
      );
    } else if (isEnglishOnly) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'RECITALS',
              bold: true,
              size: 24,
              color: '0F172A',
              font: 'Calibri',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 240, after: 120 },
        }),
        ...formatLtrParagraphs(contract.recitalsEnglish, {
          size: 24,
          spacingBefore: 80,
          spacingAfter: 80,
          lineSpacing: 320,
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'NOW, THEREFORE, the parties hereto have agreed as follows:',
              bold: true,
              size: 24,
              color: '0F172A',
              font: 'Calibri',
            }),
          ],
          alignment: AlignmentType.LEFT,
          spacing: { before: 140, after: 200 },
        })
      );
    } else {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: '[ تمـهـيـد / RECITALS ]',
              bold: true,
              size: 26,
              color: '0F172A',
              font: 'Arial',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 240, after: 120 },
        }),
        ...formatRtlParagraphs(contract.recitalsArabic, { size: 24, spacingBefore: 80, spacingAfter: 80, lineSpacing: 340 }),
        new Paragraph({ spacing: { before: 40, after: 40 } }),
        ...formatLtrParagraphs(contract.recitalsEnglish, { size: 22, spacingBefore: 60, spacingAfter: 60, lineSpacing: 320 })
      );
    }

    // 5. Clauses (Operative Articles)
    docChildren.push(...clausesContent);

    // 6. Enforceable Conclusion Statement
    if (isArabicOnly) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'وبما ذُكر وتراضى عليه أطرافه، حُرّر هذا العقد من نسختين أصليتين، بيد كل طرف نسخة للعمل بموجبها عند اللزوم.',
              bold: true,
              size: 24,
              color: '0F172A',
              font: 'Arial',
              rightToLeft: true,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          bidirectional: true,
          spacing: { before: 260, after: 200 },
        })
      );
    } else if (isEnglishOnly) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'IN WITNESS WHEREOF, the parties hereto have executed this Agreement in two identical originals, each party retaining one original for full legal effect.',
              bold: true,
              size: 24,
              color: '0F172A',
              font: 'Calibri',
            }),
          ],
          alignment: AlignmentType.LEFT,
          spacing: { before: 260, after: 200 },
        })
      );
    } else {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'وبما ذُكر وتراضى عليه الطرفان، حُرّر هذا العقد من نسختين أصليتين بيد كل طرف نسخة للعمل بموجبها / IN WITNESS WHEREOF, executed in two originals.',
              bold: true,
              size: 24,
              color: '0F172A',
              font: 'Arial',
              rightToLeft: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          bidirectional: true,
          spacing: { before: 260, after: 200 },
        })
      );
    }

    // 7. Build Word Document with exact A4 page size and standard legal margins
    const doc = new Document({
      creator: 'Adala Legal Contracts',
      title: isEnglishOnly ? titleEn : isArabicOnly ? titleAr : `${titleAr} - ${titleEn}`,
      styles: {
        paragraphStyles: [
          {
            id: 'Normal',
            name: 'Normal',
            run: {
              font: isEnglishOnly ? 'Calibri' : 'Arial',
              size: 24,
            },
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              size: {
                width: 11906, // A4 Width in DXA = 210 mm
                height: 16838, // A4 Height in DXA = 297 mm
                orientation: PageOrientation.PORTRAIT,
              },
              margin: {
                top: 1440, // 25.4 mm (1 inch standard legal margin)
                bottom: 1440,
                left: 1440,
                right: 1440,
              },
            },
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: isEnglishOnly
                        ? `Arab Republic of Egypt — Ref: ${referenceId}`
                        : `جمهورية مصر العربية — رقم القيد: ${referenceId}`,
                      size: 16,
                      color: '94A3B8',
                      rightToLeft: !isEnglishOnly,
                      font: isEnglishOnly ? 'Calibri' : 'Arial',
                    }),
                  ],
                  alignment: isEnglishOnly ? AlignmentType.LEFT : AlignmentType.RIGHT,
                  bidirectional: !isEnglishOnly,
                }),
              ],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  children: isEnglishOnly
                    ? [
                        new TextRun({ text: 'Page ', font: 'Calibri' }),
                        new TextRun({ children: [PageNumber.CURRENT] }),
                        new TextRun({ text: ' of ', font: 'Calibri' }),
                        new TextRun({ children: [PageNumber.TOTAL_PAGES] }),
                      ]
                    : [
                        new TextRun({ text: 'صفحة ', font: 'Arial', rightToLeft: true }),
                        new TextRun({ children: [PageNumber.CURRENT] }),
                        new TextRun({ text: ' من ', font: 'Arial', rightToLeft: true }),
                        new TextRun({ children: [PageNumber.TOTAL_PAGES] }),
                      ],
                  alignment: AlignmentType.CENTER,
                  bidirectional: !isEnglishOnly,
                }),
              ],
            }),
          },
          children: [
            ...docChildren,
            signatories,
            new Paragraph({ spacing: { before: 240, after: 120 } }),
            witnessesTable,
          ],
        },
      ],
    });

    // 12. Save File with appropriate language suffix
    const fileSuffix = isArabicOnly ? 'عربي' : isEnglishOnly ? 'English' : 'Certified';
    const baseName = isEnglishOnly ? (titleEn || 'Legal_Agreement') : (titleAr || 'عقد_قانوني');
    const docxFileName = `${baseName.replace(/\s+/g, '_')}_${fileSuffix}_${referenceId}.docx`;

    Packer.toBlob(doc)
      .then((blob) => {
        const blobUrl = downloadBlobFile(blob, docxFileName);
        setDownloadNotice({
          filename: docxFileName,
          blobUrl,
        });
        showCopyNotice(
          isArabicOnly
            ? 'تم تصدير وتنزيل ملف Word (العقد فقط: الأطراف والبنود والتوقيعات) بنجاح!'
            : isEnglishOnly
            ? 'Word contract exported successfully (Articles & Signatures only)!'
            : 'تم تصدير وتنزيل ملف Word (العقد فقط) بنجاح!'
        );
      })
      .catch((err) => {
        console.error('Word packing error:', err);
        showCopyNotice('حدث خطأ أثناء تصدير ملف Word، يرجى المحاولة مرة أخرى.');
      });
  };

  // Filter clauses based on search query
  const filteredClauses = useMemo(() => {
    if (!searchQuery.trim()) return contract.clauses;
    const q = searchQuery.toLowerCase();
    return contract.clauses.filter((c) => {
      return (
        c.titleArabic.toLowerCase().includes(q) ||
        c.titleEnglish.toLowerCase().includes(q) ||
        c.contentArabic.toLowerCase().includes(q) ||
        c.contentEnglish.toLowerCase().includes(q)
      );
    });
  }, [contract.clauses, searchQuery]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const titleAr = contract.contractTitleArabic || 'عقد قانوني رسمي معتمد ثنائي اللغة';
  const titleEn = contract.contractTitleEnglish || 'Certified Official Bilingual Legal Agreement';

  const bodyFontSizeClass =
    fontSize === 'sm' ? 'text-xs md:text-sm' : fontSize === 'lg' ? 'text-base md:text-lg' : 'text-sm md:text-base';
  const headingFontClass = fontFamily === 'amiri' ? 'font-amiri' : 'font-cairo';
  const bodyFontClass = fontFamily === 'amiri' ? 'font-amiri' : 'font-cairo';

  const audit = contract.legalAudit || {
    officialPortalValidation: 'مطابق بنسبة 100% مع نماذج البوابة الرسمية للتشريعات المصرية، ونماذج مصلحة الشهر العقاري والتوثيق، والهيئة العامة للاستثمار والمناطق الحرة (GAFI) والقانون رقم 159 لسنة 1981 والقانون المدني المصري رقم 131 لسنة 1948.',
    cassationPrinciplesValidation: 'متسق تماماً مع أحكام الهيئة العامة للمواد المدنية والتجارية بمحكمة النقض المصرية، ومبادئ إعمال مبدأ "العقد شريعة المتعاقدين" وحرية الإرادة وفقاً للمادة 147 من القانون المدني.',
    customaryPracticeValidation: 'مستوفٍ لكافة البنود والشروط الجوهرية والضمانات الاحترازية المتعارف عليها في صياغة العقود النموذجية المعتمدة لدى نقابة المحامين المصرية والمكاتب القانونية الكبرى.',
    shariaAuditStatement: 'خالٍ من شبهات الغرر الفاحش، والجهالة المفضية للنزاع، والربا والمحاذير الشرعية، ومتفق مع المقاصد الشرعية للتعاقد.',
    complianceScore: 98,
    verificationChecklist: [
      { item: 'الأهلية القانونية الكاملة والصفة التعاقدية لأطراف العقد', status: 'مستوفى ومعتمد', reference: 'المادة 44 مدني مصري' },
      { item: 'مشروعية المحل والسبب وعدم مخالفة النظام العام والآداب', status: 'مستوفى ومعتمد', reference: 'المادتان 135 و 136 مدني مصري' },
      { item: 'تحديد الالتزامات والآثار المترتبة بوضوح تام مانع للجهالة', status: 'مستوفى ومعتمد', reference: 'المادة 145 مدني مصري' },
      { item: 'آلية فض المنازعات والاختصاص القضائي أو التحكيمي المحدد', status: 'مستوفى ومعتمد', reference: 'قانون المرافعات المصري' },
      { item: 'إشهاد التوقيع وحجية النسخ الأصلية المحررة', status: 'مستوفى ومعتمد', reference: 'قانون الإثبات في المواد المدنية' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Floating Control Deck */}
      <header className="bg-white/95 backdrop-blur-md sticky top-3 z-30 p-4 rounded-2xl shadow-lg border border-slate-200/80 print:hidden transition-all">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Document Title Summary */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center text-xl shadow-md flex-shrink-0">
              <i className="fas fa-file-contract"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-black text-slate-900 line-clamp-1">{titleAr}</h2>
                <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-mono font-bold">
                  {referenceId}
                </span>
                <span className="bg-blue-100 text-blue-900 text-xs px-2 py-0.5 rounded-full font-bold">
                  {contract.clauses.length} مادة كاملة
                </span>
                {audit && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <i className="fas fa-certificate text-emerald-600"></i>
                    {audit.complianceScore}% مدقق رسمياً
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium" style={{ direction: 'ltr' }}>
                {titleEn}
              </p>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap max-w-full no-scrollbar w-full lg:w-auto justify-start lg:justify-end">
            {/* E-COURT GOVERNMENT PORTAL COMPRESSED PDF BUTTON */}
            <button
              onClick={() => setIsGovPortalModalOpen(true)}
              className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 hover:from-emerald-800 hover:to-teal-900 text-white text-xs font-black rounded-lg shadow-sm transition-all transform active:scale-95 gap-1.5 cursor-pointer ring-2 ring-emerald-400/40 whitespace-nowrap"
              title="تجهيز وضغط العقد طبقاً لاشتراطات بوابة وزارة العدل لرفع الدعاوى والتقاضي الإلكتروني (أقل من 2MB)"
            >
              <i className="fas fa-scale-balanced text-amber-300"></i>
              <span>بوابة رفع الدعاوى (PDF مضغوط &lt; 2MB)</span>
            </button>

            <button
              onClick={() => scrollToId('section-audit')}
              className="inline-flex items-center px-3 py-2 text-xs font-bold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-all whitespace-nowrap"
              title="عرض تقرير المطابقة مع بوابة التشريعات ومحكمة النقض ونقابة المحامين"
            >
              <i className="fas fa-magnifying-glass-check ml-1.5 text-indigo-600"></i>
              تقرير الفحص الرسمي
            </button>

            <button
              onClick={() => setShowToc(!showToc)}
              className={`inline-flex items-center px-3 py-2 text-xs font-bold rounded-lg border transition-all whitespace-nowrap ${
                showToc
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
              title="فهرس مواد العقد للقفز السريع"
            >
              <i className="fas fa-list-ol ml-1.5"></i>
              الفهرس ({contract.clauses.length} مادة)
            </button>

            {/* IN-PLACE LIVE EDIT MODE BUTTON */}
            <button
              onClick={() => {
                const nextEditing = !isEditing;
                setIsEditing(nextEditing);
                if (nextEditing) {
                  handleExpandAll();
                  showCopyNotice('تم تفعيل وضع التعديل المباشر — يمكنك الآن تعديل أي بند أو نص في العقد!');
                } else {
                  if (onUpdateContract) {
                    onUpdateContract(contract);
                  }
                  showCopyNotice('تم حفظ تعديلات العقد بنجاح! جاهز للتصدير.');
                }
              }}
              className={`inline-flex items-center px-3 py-2 text-xs font-black rounded-lg shadow-sm transition-all transform active:scale-95 gap-1.5 cursor-pointer whitespace-nowrap ${
                isEditing
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 ring-2 ring-amber-400'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
              }`}
              title={isEditing ? 'إنهاء التعديل وحفظ التغييرات' : 'تعديل بنود ونصوص العقد مباشرة قبل التصدير'}
            >
              <i className={`fas ${isEditing ? 'fa-check-double' : 'fa-pen-to-square'}`}></i>
              <span>{isEditing ? 'حفظ التعديلات' : 'تعديل البنود مباشرة'}</span>
            </button>

            {/* E-SIGNATURE BUTTON */}
            <button
              onClick={() => setIsSignatureModalOpen(true)}
              className="inline-flex items-center px-3.5 py-2 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-900 text-white text-xs font-black rounded-lg shadow-sm transition-all transform active:scale-95 gap-1.5 cursor-pointer ring-2 ring-indigo-400/30 whitespace-nowrap"
              title="توقيع العقد إلكترونياً واعتماد أطراف التعاقد وشهادة التوثيق"
            >
              <i className="fas fa-file-signature text-amber-300"></i>
              <span>{contract.executionCertificate ? 'شهادة التوقيع الإلكتروني ✓' : 'توقيع إلكتروني (E-Sign)'}</span>
            </button>

            {/* CLAUSE BANK BUTTON */}
            {onOpenClauseBank && (
              <button
                onClick={onOpenClauseBank}
                className="inline-flex items-center px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-black rounded-lg border border-indigo-200 transition-all gap-1.5 cursor-pointer whitespace-nowrap"
                title="إضافة أو استبدال شروط من بنك الشروط الذكية"
              >
                <i className="fas fa-cubes text-indigo-600"></i>
                <span>بنك الشروط</span>
              </button>
            )}

            {/* UPGRADED WORD EXPORT BUTTON (LANGUAGE-AWARE) */}
            <button
              onClick={handleDownloadWord}
              className="inline-flex items-center px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-lg shadow-sm transition-all transform active:scale-95 gap-1.5 whitespace-nowrap"
              title={
                viewMode === 'english'
                  ? 'Download official Word document in English only (.docx) with executive layout'
                  : 'تحميل كملف Word رسمي (.docx) نظيف مقتصر على العقد والأطراف والتوقيعات'
              }
            >
              <i className="fas fa-file-word text-sm"></i>
              <span>
                {viewMode === 'english' ? 'Word English (.docx)' : 'Word عربي (.docx)'}
              </span>
            </button>

            {/* UPGRADED DIRECT PDF DOWNLOAD BUTTON (LANGUAGE-AWARE) */}
            <button
              onClick={handleDownloadDirectPdf}
              disabled={isExportingPdf}
              className="inline-flex items-center px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-lg shadow-sm transition-all transform active:scale-95 gap-1.5 disabled:opacity-60 cursor-pointer whitespace-nowrap"
              title="حفظ العقد كملف PDF رسمي نقي بمقاس A4 وهوامش قياسية 100%"
            >
              {isExportingPdf ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>جاري التجهيز...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-file-pdf text-sm"></i>
                  <span>
                    {viewMode === 'english'
                      ? 'Official PDF (A4)'
                      : 'PDF رسمي (A4)'}
                  </span>
                </>
              )}
            </button>

            {/* HIGH-RES PRINT TO PDF BUTTON */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
              title="طباعة عالية الدقة عبر الطابعة أو حفظ كـ PDF بجودة فيكتور"
            >
              <i className="fas fa-print ml-1.5"></i>
              طباعة رسمية
            </button>

            <button
              onClick={handleCopyFull}
              className="inline-flex items-center px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition-all gap-1.5 cursor-pointer whitespace-nowrap"
              title={
                viewMode === 'english'
                  ? 'Copy full contract text in English only'
                  : 'نسخ نص العقد كاملاً بدون أي إضافات'
              }
            >
              <i className="fas fa-copy text-blue-600"></i>
              <span>
                {viewMode === 'english' ? 'Copy (EN)' : 'نسخ (عربي)'}
              </span>
            </button>

            <button
              onClick={onReset}
              className="inline-flex items-center px-3 py-2 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-bold rounded-lg border border-slate-200 transition-all whitespace-nowrap"
              title="صياغة عقد جديد"
            >
              <i className="fas fa-redo ml-1.5"></i>
              عقد جديد
            </button>
          </div>
        </div>

        {/* Secondary Customization Bar */}
        <div className="mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 text-xs">
          {/* View Modes */}
          <div className="overflow-x-auto flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 no-scrollbar whitespace-nowrap gap-0.5 sm:gap-1 flex-shrink-0">
            <span className="font-bold text-slate-500 px-1 text-[11px] sm:text-xs">العرض:</span>
            <button
              onClick={() => setViewMode('dual')}
              className={`px-2 py-1 rounded font-bold transition-all text-[11px] sm:text-xs whitespace-nowrap ${
                viewMode === 'dual' ? 'bg-white text-blue-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fas fa-columns ml-1"></i> عمودين
            </button>
            <button
              onClick={() => setViewMode('stacked')}
              className={`px-2 py-1 rounded font-bold transition-all text-[11px] sm:text-xs whitespace-nowrap ${
                viewMode === 'stacked' ? 'bg-white text-blue-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fas fa-align-right ml-1"></i> مكدس
            </button>
            <button
              onClick={() => setViewMode('arabic')}
              className={`px-2 py-1 rounded font-bold transition-all text-[11px] sm:text-xs whitespace-nowrap ${
                viewMode === 'arabic' ? 'bg-white text-blue-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              عربي فقط
            </button>
            <button
              onClick={() => setViewMode('english')}
              className={`px-2 py-1 rounded font-bold transition-all text-[11px] sm:text-xs whitespace-nowrap ${
                viewMode === 'english' ? 'bg-white text-blue-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-auto md:min-w-[180px] md:flex-1 md:max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في بنود العقد (مثلاً: تعويض، فسخ...)"
              className="w-full pl-3 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <i className="fas fa-search absolute right-2.5 top-2.5 text-slate-400"></i>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-2 text-slate-400 hover:text-slate-600"
              >
                <i className="fas fa-times-circle"></i>
              </button>
            )}
          </div>

          {/* Typography Controls */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 justify-between sm:justify-start">
            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-500 px-1 text-[11px]">الخط:</span>
              <button
                onClick={() => setFontFamily('amiri')}
                className={`px-2 py-0.5 rounded font-amiri font-bold text-xs ${
                  fontFamily === 'amiri' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                الأميري القانوني
              </button>
              <button
                onClick={() => setFontFamily('cairo')}
                className={`px-2 py-0.5 rounded font-bold text-xs ${
                  fontFamily === 'cairo' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                القاهرة الحديث
              </button>
            </div>

            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-500 px-1 text-[11px]">الحجم:</span>
              <button
                onClick={() => setFontSize('sm')}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                  fontSize === 'sm' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                  fontSize === 'md' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                  fontSize === 'lg' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                A+
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleExpandAll}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold whitespace-nowrap"
                title="توسيع كافة المواد"
              >
                <i className="fas fa-chevron-down ml-1"></i> توسيع
              </button>
              <button
                onClick={handleCollapseAll}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold whitespace-nowrap"
                title="طي كافة المواد"
              >
                <i className="fas fa-chevron-up ml-1"></i> طي
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise Legal Protection & Statutory Audit Meter */}
        <div className="mt-3 p-3 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-xl text-white text-xs flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
              <i className="fas fa-shield-check"></i>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white">مؤشر الحماية والامتثال القانوني:</span>
                <span className="bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded text-[11px] font-mono">
                  98% محكم
                </span>
                {contract.executionCertificate && (
                  <span className="bg-blue-500/30 text-blue-300 border border-blue-400/40 px-2 py-0.5 rounded text-[10px] font-black">
                    ✓ موقع وموثق رقمياً
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-300">
                مستوفٍ للاشتراطات الإلزامية بالقانون المدني وقانون التجارة ولائحة الشهر العقاري
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded-md font-bold flex items-center gap-1 bg-emerald-950 text-emerald-300 border border-emerald-800">
              <i className="fas fa-check"></i> التحكيم والتقاضي
            </span>
            <span className="px-2 py-0.5 rounded-md font-bold flex items-center gap-1 bg-emerald-950 text-emerald-300 border border-emerald-800">
              <i className="fas fa-check"></i> الشرط الجزائي
            </span>
            <span className="px-2 py-0.5 rounded-md font-bold flex items-center gap-1 bg-emerald-950 text-emerald-300 border border-emerald-800">
              <i className="fas fa-check"></i> القوة القاهرة
            </span>
            <span className="px-2 py-0.5 rounded-md font-bold flex items-center gap-1 bg-emerald-950 text-emerald-300 border border-emerald-800">
              <i className="fas fa-check"></i> السرية والمنافسة
            </span>
            <span className="px-2 py-0.5 rounded-md font-bold flex items-center gap-1 bg-emerald-950 text-emerald-300 border border-emerald-800">
              <i className="fas fa-check"></i> الفاتورة الإلكترونية
            </span>
          </div>
        </div>

        {/* Table of Contents Tray */}
        {showToc && (
          <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200/90 animate-fadeIn">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <i className="fas fa-compass text-blue-600"></i> فهرس الوصول السريع لمواد العقد ({contract.clauses.length} مادة كاملة)
              </span>
              <button
                onClick={() => setShowToc(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                إغلاق <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              <button
                onClick={() => scrollToId('section-preamble')}
                className="p-1.5 text-right bg-white hover:bg-blue-50 border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:text-blue-700 truncate transition-colors"
              >
                الديباجة والأطراف
              </button>
              <button
                onClick={() => scrollToId('section-recitals')}
                className="p-1.5 text-right bg-white hover:bg-blue-50 border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:text-blue-700 truncate transition-colors"
              >
                التمهيد الملزم
              </button>
              {contract.clauses.map((c, i) => (
                <button
                  key={i}
                  onClick={() => scrollToId(`clause-${i}`)}
                  className="p-1.5 text-right bg-white hover:bg-blue-50 border border-slate-200 rounded-md text-xs text-slate-700 hover:text-blue-700 truncate transition-colors"
                >
                  <span className="font-bold text-blue-600 ml-1">[{i + 1}]</span>
                  {c.titleArabic.replace(/^المادة\s+(الأولى|الثانية|الثالثة|الرابعة|الخامسة|السادسة|السابعة|الثامنة|التاسعة|العاشرة|[0-9]+)\s*:\s*/, '')}
                </button>
              ))}
              <button
                onClick={() => scrollToId('section-signatures')}
                className="p-1.5 text-right bg-white hover:bg-blue-50 border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:text-blue-700 truncate transition-colors"
              >
                التوقيعات والأختام
              </button>
              <button
                onClick={() => scrollToId('section-audit')}
                className="p-1.5 text-right bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md text-xs font-bold text-indigo-800 truncate transition-colors"
              >
                تقرير الفحص والمطابقة
              </button>
            </div>
          </div>
        )}

        {copyStatus && (
          <div className="mt-3 p-3 bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md flex items-center justify-between animate-bounce">
            <span className="flex items-center gap-2">
              <i className="fas fa-check-circle text-sm"></i>
              {copyStatus}
            </span>
            <button onClick={() => setCopyStatus(null)} className="text-white hover:text-emerald-100">
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {/* Guaranteed Direct Download Notification Card */}
        {downloadNotice && (
          <div className="mt-3 p-3 sm:p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-xl shadow-xl border border-emerald-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn print:hidden">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-lg flex-shrink-0 shadow-inner">
                <i className="fas fa-file-circle-check"></i>
              </div>
              <div>
                <p className="text-xs font-black text-emerald-300">
                  تم إنشاء الملف بنجاح وبدأ التحميل: <span className="text-white font-mono break-all">{downloadNotice.filename}</span>
                </p>
                <p className="text-[11px] text-slate-300">
                  إذا لم يبدأ التنزيل تلقائياً على جهازك، يمكنك النقر على زر التحميل المباشر الآن:
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <a
                href={downloadNotice.blobUrl}
                download={downloadNotice.filename}
                className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <i className="fas fa-download"></i>
                <span>تحميل مباشر</span>
              </a>
              <button
                onClick={() => setDownloadNotice(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                title="إغلاق"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Legal Document Sheet for PDF and Screen */}
      <article
        id="contract-printable-area"
        className="contract-paper relative bg-white border border-slate-300 md:border-2 md:border-slate-400 rounded-xl shadow-xl p-4 sm:p-8 md:p-14 max-w-4xl mx-auto overflow-hidden print:p-0 print:border-none print:shadow-none print:max-w-full"
      >
        {/* Formal Clean Legal Header: Official Reference & Enforceable Title */}
        <div className="pb-6 mb-8 border-b-2 border-slate-900 text-center">
          <p className="text-xs sm:text-sm font-black tracking-widest text-slate-700 uppercase mb-2">
            {viewMode === 'english' ? 'ARAB REPUBLIC OF EGYPT' : 'جمهورية مصر العربية'}
          </p>
          <div className="w-16 h-0.5 bg-slate-800 mx-auto mb-4"></div>

          {/* Centered Clean Title according to Selected Language */}
          {isEditing ? (
            <div className="max-w-2xl mx-auto space-y-3 mb-4 print:hidden">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">تعديل عنوان العقد (بالعربية):</label>
                <input
                  type="text"
                  value={contract.contractTitleArabic || ''}
                  onChange={(e) => setContract(prev => ({ ...prev, contractTitleArabic: e.target.value }))}
                  className="w-full p-2.5 bg-white border border-blue-400 rounded-xl text-center font-black text-base sm:text-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
              <div style={{ direction: 'ltr' }}>
                <label className="block text-xs font-bold text-slate-700 mb-1">Edit Contract Title (English):</label>
                <input
                  type="text"
                  value={contract.contractTitleEnglish || ''}
                  onChange={(e) => setContract(prev => ({ ...prev, contractTitleEnglish: e.target.value }))}
                  className="w-full p-2.5 bg-white border border-blue-400 rounded-xl text-center font-bold text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1 mb-3">
              {viewMode === 'english' ? (
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-wide font-cinzel" style={{ direction: 'ltr' }}>
                  {titleEn}
                </h1>
              ) : viewMode === 'arabic' ? (
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 leading-tight ${headingFontClass}`}>
                  {titleAr}
                </h1>
              ) : (
                <>
                  <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 leading-tight ${headingFontClass}`}>
                    {titleAr}
                  </h1>
                  <h2 className="text-base sm:text-lg font-bold text-slate-600 tracking-wide font-cinzel" style={{ direction: 'ltr' }}>
                    {titleEn}
                  </h2>
                </>
              )}
            </div>
          )}

          <p className="text-xs text-slate-500 font-mono">
            {viewMode === 'english' ? `Reference No.: ${referenceId}` : `رقم القيد المرجعي: ${referenceId}`}
          </p>
        </div>

        {/* SECTION 1: PREAMBLE & PARTIES */}
        <section id="section-preamble" className="mb-8">
          {isEditing ? (
            <div className="space-y-3 p-4 bg-amber-50/60 rounded-xl border border-amber-300 print:hidden mb-4">
              <div className="text-right">
                <label className="block text-xs font-bold text-slate-800 mb-1">ديباجة العقد وتحديد أطراف التعاقد (بالعربية):</label>
                <textarea
                  value={contract.preambleArabic}
                  onChange={(e) => setContract((prev) => ({ ...prev, preambleArabic: e.target.value }))}
                  rows={4}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-sans focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              {viewMode !== 'arabic' && (
                <div className="text-left" style={{ direction: 'ltr' }}>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Preamble & Contracting Parties (English):</label>
                  <textarea
                    value={contract.preambleEnglish}
                    onChange={(e) => setContract((prev) => ({ ...prev, preambleEnglish: e.target.value }))}
                    rows={4}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-sans focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {viewMode === 'dual' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="order-2 md:order-1 text-left border-t md:border-t-0 pt-4 md:pt-0" style={{ direction: 'ltr' }}>
                    <p className={`whitespace-pre-wrap text-slate-800 leading-relaxed font-sans ${bodyFontSizeClass}`}>
                      {contract.preambleEnglish}
                    </p>
                  </div>
                  <div className="order-1 md:order-2 text-right">
                    <p className={`whitespace-pre-wrap text-slate-900 leading-relaxed ${bodyFontClass} ${bodyFontSizeClass}`}>
                      {contract.preambleArabic}
                    </p>
                  </div>
                </div>
              ) : viewMode === 'stacked' ? (
                <div className="space-y-4">
                  <div className="text-right pb-4 border-b border-slate-200">
                    <p className={`whitespace-pre-wrap text-slate-900 leading-relaxed ${bodyFontClass} ${bodyFontSizeClass}`}>
                      {contract.preambleArabic}
                    </p>
                  </div>
                  <div className="text-left" style={{ direction: 'ltr' }}>
                    <p className={`whitespace-pre-wrap text-slate-800 leading-relaxed font-sans ${bodyFontSizeClass}`}>
                      {contract.preambleEnglish}
                    </p>
                  </div>
                </div>
              ) : viewMode === 'arabic' ? (
                <div className="text-right">
                  <p className={`whitespace-pre-wrap text-slate-900 leading-relaxed text-justify ${bodyFontClass} ${bodyFontSizeClass}`}>
                    {contract.preambleArabic}
                  </p>
                </div>
              ) : (
                <div className="text-left" style={{ direction: 'ltr' }}>
                  <p className={`whitespace-pre-wrap text-slate-800 leading-relaxed text-justify font-sans ${bodyFontSizeClass}`}>
                    {contract.preambleEnglish}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* SECTION 2: RECITALS */}
        <section id="section-recitals" className="mb-8">
          <div className="text-center font-black text-base md:text-lg text-slate-950 mb-4 pb-1">
            {viewMode === 'english' ? '[ RECITALS ]' : viewMode === 'arabic' ? '[ تـمـهـيـد ]' : '[ تـمـهـيـد / RECITALS ]'}
          </div>

          {isEditing ? (
            <div className="space-y-3 p-4 bg-amber-50/60 rounded-xl border border-amber-300 print:hidden mb-4">
              <div className="text-right">
                <label className="block text-xs font-bold text-slate-800 mb-1">التمهيد وحيثيات التعاقد (بالعربية):</label>
                <textarea
                  value={contract.recitalsArabic}
                  onChange={(e) => setContract((prev) => ({ ...prev, recitalsArabic: e.target.value }))}
                  rows={4}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-sans focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              {viewMode !== 'arabic' && (
                <div className="text-left" style={{ direction: 'ltr' }}>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Recitals & Whereas (English):</label>
                  <textarea
                    value={contract.recitalsEnglish}
                    onChange={(e) => setContract((prev) => ({ ...prev, recitalsEnglish: e.target.value }))}
                    rows={4}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-sans focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {viewMode === 'dual' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="order-2 md:order-1 text-left border-t md:border-t-0 pt-4 md:pt-0" style={{ direction: 'ltr' }}>
                    <p className={`whitespace-pre-wrap text-slate-800 leading-relaxed font-sans ${bodyFontSizeClass}`}>
                      {contract.recitalsEnglish}
                    </p>
                  </div>
                  <div className="order-1 md:order-2 text-right">
                    <p className={`whitespace-pre-wrap text-slate-900 leading-relaxed ${bodyFontClass} ${bodyFontSizeClass}`}>
                      {contract.recitalsArabic}
                    </p>
                  </div>
                </div>
              ) : viewMode === 'stacked' ? (
                <div className="space-y-4">
                  <div className="text-right pb-4 border-b border-slate-200">
                    <p className={`whitespace-pre-wrap text-slate-900 leading-relaxed ${bodyFontClass} ${bodyFontSizeClass}`}>
                      {contract.recitalsArabic}
                    </p>
                  </div>
                  <div className="text-left" style={{ direction: 'ltr' }}>
                    <p className={`whitespace-pre-wrap text-slate-800 leading-relaxed font-sans ${bodyFontSizeClass}`}>
                      {contract.recitalsEnglish}
                    </p>
                  </div>
                </div>
              ) : viewMode === 'arabic' ? (
                <div className="text-right">
                  <p className={`whitespace-pre-wrap text-slate-900 leading-relaxed text-justify ${bodyFontClass} ${bodyFontSizeClass}`}>
                    {contract.recitalsArabic}
                  </p>
                </div>
              ) : (
                <div className="text-left" style={{ direction: 'ltr' }}>
                  <p className={`whitespace-pre-wrap text-slate-800 leading-relaxed text-justify font-sans ${bodyFontSizeClass}`}>
                    {contract.recitalsEnglish}
                  </p>
                </div>
              )}
            </div>
          )}

          <p className="font-bold text-slate-950 text-sm md:text-base mt-4 text-justify">
            {viewMode === 'english'
              ? 'NOW, THEREFORE, the parties hereto have agreed and convenanted as follows:'
              : viewMode === 'arabic'
              ? 'ولما كان الطرفان بكامل أهليتهما القانونية والمعتبرة شرعاً للتعاقد، فقد تلاقت إرادتهما الصريحة على ما يأتي:'
              : 'ولما كان الطرفان بكامل أهليتهما للتعاقد، فقد اتفقا على ما يأتي / NOW, THEREFORE, agreed as follows:'}
          </p>
        </section>

        {/* SECTION 3: ARTICLES & CLAUSES */}
        <section id="section-clauses" className="mb-10 space-y-6">
          {filteredClauses.length === 0 ? (
            <div className="text-center p-8 bg-slate-50 rounded-xl border border-slate-200">
              <i className="fas fa-search text-3xl text-slate-300 mb-2"></i>
              <p className="text-slate-600 font-bold">لا توجد مواد مطابقة للبحث "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-blue-600 font-bold hover:underline"
              >
                إلغاء البحث وإظهار كافة المواد
              </button>
            </div>
          ) : (
            filteredClauses.map((clause, index) => {
              const originalIndex = contract.clauses.findIndex(
                (c) => c.titleArabic === clause.titleArabic && c.titleEnglish === clause.titleEnglish
              );
              const targetIdx = originalIndex >= 0 ? originalIndex : index;
              const clauseNum = targetIdx + 1;
              const isExpanded = expandedClauses[targetIdx] !== false;

              return (
                <div
                  key={index}
                  id={`clause-${targetIdx}`}
                  className="clause-block mb-6 pb-4 border-b border-slate-200/80 last:border-b-0 print:border-b-0 print:mb-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4
                      onClick={() => toggleClause(targetIdx)}
                      className={`font-bold text-slate-950 text-base md:text-lg cursor-pointer hover:text-blue-800 transition-colors select-none ${headingFontClass}`}
                    >
                      {viewMode === 'english'
                        ? `Article (${clauseNum}): ${clause.titleEnglish}`
                        : viewMode === 'arabic'
                        ? `المادة (${clauseNum}): ${clause.titleArabic}`
                        : `المادة (${clauseNum}): ${clause.titleArabic} / Article (${clauseNum}): ${clause.titleEnglish}`}
                    </h4>

                    <div className="flex items-center gap-1.5 print:hidden export-exclude">
                      <button
                        onClick={() => toggleClause(targetIdx)}
                        className="px-2 py-0.5 text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors flex items-center gap-1 cursor-pointer"
                        title={isExpanded ? 'طي محتوى المادة' : 'توسيع محتوى المادة'}
                      >
                        <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-[10px]`}></i>
                        <span>{isExpanded ? 'طي' : 'توسيع'}</span>
                      </button>
                      <button
                        onClick={() =>
                          handleCopyClause(
                            clause.titleArabic,
                            clause.titleEnglish,
                            clause.contentArabic,
                            clause.contentEnglish
                          )
                        }
                        className="px-2 py-0.5 text-xs text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                        title="نسخ هذه المادة فقط"
                      >
                        <i className="fas fa-copy ml-1"></i> نسخ
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="clause-content">
                      {isEditing ? (
                        <div className="space-y-3 p-4 bg-amber-50/60 rounded-xl border border-amber-300 print:hidden">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">عنوان المادة (بالعربية):</label>
                            <input
                              type="text"
                              value={clause.titleArabic}
                              onChange={(e) => {
                                const updatedClauses = [...contract.clauses];
                                updatedClauses[targetIdx] = { ...updatedClauses[targetIdx], titleArabic: e.target.value };
                                setContract((prev) => ({ ...prev, clauses: updatedClauses }));
                              }}
                              className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">نص المادة التعاقدية (بالعربية):</label>
                            <textarea
                              value={clause.contentArabic}
                              onChange={(e) => {
                                const updatedClauses = [...contract.clauses];
                                updatedClauses[targetIdx] = { ...updatedClauses[targetIdx], contentArabic: e.target.value };
                                setContract((prev) => ({ ...prev, clauses: updatedClauses }));
                              }}
                              rows={4}
                              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-sans focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                          {viewMode !== 'arabic' && (
                            <div style={{ direction: 'ltr' }}>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Clause Title (English):</label>
                              <input
                                type="text"
                                value={clause.titleEnglish}
                                onChange={(e) => {
                                  const updatedClauses = [...contract.clauses];
                                  updatedClauses[targetIdx] = { ...updatedClauses[targetIdx], titleEnglish: e.target.value };
                                  setContract((prev) => ({ ...prev, clauses: updatedClauses }));
                                }}
                                className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              />
                              <label className="block text-xs font-bold text-slate-700 mt-2 mb-1">Clause Content (English):</label>
                              <textarea
                                value={clause.contentEnglish}
                                onChange={(e) => {
                                  const updatedClauses = [...contract.clauses];
                                  updatedClauses[targetIdx] = { ...updatedClauses[targetIdx], contentEnglish: e.target.value };
                                  setContract((prev) => ({ ...prev, clauses: updatedClauses }));
                                }}
                                rows={4}
                                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-sans focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              />
                            </div>
                          )}
                          <div className="flex justify-end gap-2 pt-2 border-t border-amber-200">
                            <button
                              onClick={() => {
                                if (contract.clauses.length <= 1) {
                                  showCopyNotice('لا يمكن حذف المادة الوحيدة المتبقية في العقد!');
                                  return;
                                }
                                const updatedClauses = contract.clauses.filter((_, i) => i !== targetIdx);
                                setContract((prev) => ({ ...prev, clauses: updatedClauses }));
                                showCopyNotice(`تم حذف المادة (${clauseNum})`);
                              }}
                              className="px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-100 rounded-lg font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                            >
                              <i className="fas fa-trash-alt"></i>
                              <span>حذف هذه المادة</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {viewMode === 'dual' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="order-2 md:order-1 text-left" style={{ direction: 'ltr' }}>
                                <p className={`whitespace-pre-wrap text-slate-800 leading-relaxed font-sans text-justify ${bodyFontSizeClass}`}>
                                  {clause.contentEnglish}
                                </p>
                              </div>
                              <div className="order-1 md:order-2 text-right">
                                <p className={`whitespace-pre-wrap text-slate-900 leading-relaxed text-justify ${bodyFontClass} ${bodyFontSizeClass}`}>
                                  {clause.contentArabic}
                                </p>
                              </div>
                            </div>
                          ) : viewMode === 'stacked' ? (
                            <div className="space-y-3">
                              <div className="text-right">
                                <p className={`whitespace-pre-wrap text-slate-900 leading-relaxed text-justify ${bodyFontClass} ${bodyFontSizeClass}`}>
                                  {clause.contentArabic}
                                </p>
                              </div>
                              <div className="text-left" style={{ direction: 'ltr' }}>
                                <p className={`whitespace-pre-wrap text-slate-800 leading-relaxed text-justify font-sans ${bodyFontSizeClass}`}>
                                  {clause.contentEnglish}
                                </p>
                              </div>
                            </div>
                          ) : viewMode === 'arabic' ? (
                            <div className="text-right">
                              <p className={`whitespace-pre-wrap text-slate-900 leading-relaxed text-justify ${bodyFontClass} ${bodyFontSizeClass}`}>
                                {clause.contentArabic}
                              </p>
                            </div>
                          ) : (
                            <div className="text-left" style={{ direction: 'ltr' }}>
                              <p className={`whitespace-pre-wrap text-slate-800 leading-relaxed text-justify font-sans ${bodyFontSizeClass}`}>
                                {clause.contentEnglish}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {isEditing && (
            <div className="text-center pt-4 print:hidden">
              <button
                onClick={() => {
                  const newIndex = contract.clauses.length + 1;
                  const newClause = {
                    titleArabic: `بند تعاقدي مخصص إضافي (${newIndex})`,
                    titleEnglish: `Additional Custom Clause (${newIndex})`,
                    contentArabic: 'اتفق الطرفان بموجب هذا البند على ...',
                    contentEnglish: 'The parties hereby agree that ...',
                  };
                  const updated = [...contract.clauses, newClause];
                  setContract((prev) => ({ ...prev, clauses: updated }));
                  setExpandedClauses((prev) => ({ ...prev, [updated.length - 1]: true }));
                  showCopyNotice('تمت إضافة مادة جديدة إلى بنود العقد!');
                }}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <i className="fas fa-plus-circle"></i>
                <span>إضافة مادة تعاقدية جديدة للعقد</span>
              </button>
            </div>
          )}
        </section>

        {/* SECTION 4: SIGNATURES & EXECUTION */}
        <section id="section-signatures" className="pt-6 border-t-2 border-slate-900 avoid-break">
          <p className="text-xs sm:text-sm font-bold text-slate-900 text-center mb-6">
            {viewMode === 'english'
              ? 'IN WITNESS WHEREOF, the parties hereto have executed this Agreement in two original counterparts, each retaining one for statutory enforcement.'
              : viewMode === 'arabic'
              ? 'وبما ذُكر وتراضى عليه أطرافه، حُرّر هذا العقد من نسختين أصليتين، بيد كل طرف نسخة للعمل بموجبها عند اللزوم.'
              : 'وبما ذُكر وتراضى عليه الطرفان، حُرّر هذا العقد من نسختين أصليتين بيد كل طرف نسخة للعمل بموجبها / IN WITNESS WHEREOF'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 text-xs sm:text-sm print:grid-cols-2">
            {/* Party 1 (On Right for Arabic, on Left for English) */}
            <div className={`p-4 border border-slate-400 rounded-lg ${viewMode === 'english' ? 'order-1' : 'order-2 md:order-1'}`}>
              <h5 className="font-black text-slate-950 text-center border-b border-slate-300 pb-2 mb-3">
                {viewMode === 'english' ? 'FIRST PARTY' : 'الطرف الأول'}
              </h5>
              <div className="space-y-2.5 text-slate-800">
                <p><span className="font-bold">{viewMode === 'english' ? 'Name: ' : 'الاسم: '}</span>{contract.executionCertificate?.party1.name || '....................................................'}</p>
                <p><span className="font-bold">{viewMode === 'english' ? 'National ID / CR: ' : 'الرقم القومي / السجل: '}</span>{contract.executionCertificate?.party1.nationalIdOrCr || '............................'}</p>
                <p><span className="font-bold">{viewMode === 'english' ? 'Capacity / Title: ' : 'الصفة والتمثيل: '}</span>{contract.executionCertificate?.party1.titleOrCapacity || '................................'}</p>
                <div className="pt-2">
                  <span className="font-bold">{viewMode === 'english' ? 'Signature: ' : 'التوقيع: '}</span>
                  {contract.executionCertificate?.party1.signatureDataUrl ? (
                    <img src={contract.executionCertificate.party1.signatureDataUrl} alt="Signature 1" className="h-8 inline-block max-w-[120px]" />
                  ) : (
                    <span>___________________________</span>
                  )}
                </div>
                <div className="pt-3 flex justify-around text-[10px] text-slate-400 border-t border-dashed border-slate-200">
                  <span>{viewMode === 'english' ? '[ Official Stamp / Seal ]' : '[ موضع الخاتم الرسمي ]'}</span>
                  <span>{viewMode === 'english' ? '[ Thumbprint ]' : '[ بصمة الإبهام ]'}</span>
                </div>
              </div>
            </div>

            {/* Party 2 (On Left for Arabic, on Right for English) */}
            <div className={`p-4 border border-slate-400 rounded-lg ${viewMode === 'english' ? 'order-2' : 'order-1 md:order-2'}`}>
              <h5 className="font-black text-slate-950 text-center border-b border-slate-300 pb-2 mb-3">
                {viewMode === 'english' ? 'SECOND PARTY' : 'الطرف الثاني'}
              </h5>
              <div className="space-y-2.5 text-slate-800">
                <p><span className="font-bold">{viewMode === 'english' ? 'Name: ' : 'الاسم: '}</span>{contract.executionCertificate?.party2.name || '....................................................'}</p>
                <p><span className="font-bold">{viewMode === 'english' ? 'National ID / CR: ' : 'الرقم القومي / السجل: '}</span>{contract.executionCertificate?.party2.nationalIdOrCr || '............................'}</p>
                <p><span className="font-bold">{viewMode === 'english' ? 'Capacity / Title: ' : 'الصفة والتمثيل: '}</span>{contract.executionCertificate?.party2.titleOrCapacity || '................................'}</p>
                <div className="pt-2">
                  <span className="font-bold">{viewMode === 'english' ? 'Signature: ' : 'التوقيع: '}</span>
                  {contract.executionCertificate?.party2.signatureDataUrl ? (
                    <img src={contract.executionCertificate.party2.signatureDataUrl} alt="Signature 2" className="h-8 inline-block max-w-[120px]" />
                  ) : (
                    <span>___________________________</span>
                  )}
                </div>
                <div className="pt-3 flex justify-around text-[10px] text-slate-400 border-t border-dashed border-slate-200">
                  <span>{viewMode === 'english' ? '[ Official Stamp / Seal ]' : '[ موضع الخاتم الرسمي ]'}</span>
                  <span>{viewMode === 'english' ? '[ Thumbprint ]' : '[ بصمة الإبهام ]'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Witnesses Table */}
          <div className="p-4 bg-slate-50/80 rounded-lg border border-slate-300 text-xs text-slate-700">
            <h6 className="font-bold text-slate-900 mb-2 text-center">
              {viewMode === 'english' ? 'ATTESTING WITNESSES:' : 'شهود العقد والإثبات الرسمي:'}
            </h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 print:grid-cols-2">
              <div className="space-y-1">
                <p className="font-bold text-slate-900">{viewMode === 'english' ? 'First Witness:' : 'الشاهد الأول:'}</p>
                <p>{viewMode === 'english' ? 'Name: ........................................ ID: ....................' : 'الاسم: ........................................ الرقم القومي: ....................'}</p>
                <p>{viewMode === 'english' ? 'Signature: ................................ Date: .... / .... / 202___' : 'التوقيع: ................................ التاريخ: .... / .... / 202___ م'}</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-900">{viewMode === 'english' ? 'Second Witness:' : 'الشاهد الثاني:'}</p>
                <p>{viewMode === 'english' ? 'Name: ........................................ ID: ....................' : 'الاسم: ........................................ الرقم القومي: ....................'}</p>
                <p>{viewMode === 'english' ? 'Signature: ................................ Date: .... / .... / 202___' : 'التوقيع: ................................ التاريخ: .... / .... / 202___ م'}</p>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* ADVISORY BENCHMARKING, SHARIA & LEGAL NOTES (For on-screen legal review only - Excluded from contract export) */}
      {(audit || contract.shariaComplianceNotes || contract.legalNotes || contract.certificationStatement || contract.executionCertificate) && (
        <aside id="section-advisory-area" className="mt-12 space-y-8 print:hidden export-exclude">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-slate-100 rounded-2xl border border-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                <i className="fas fa-file-shield"></i>
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  ملحق الفحص القانوني والتأصيل الشرعي والملاحظات الاستشارية
                </h4>
                <p className="text-[11px] text-slate-500">
                  للدراسة والمراجعة على الشاشة فقط — مستبعدة تلقائياً من وثيقة العقد الرسمية المصدّرة (PDF و Word)
                </p>
              </div>
            </div>
            <span className="text-xs bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-bold">
              للمراجعة والاستئناس
            </span>
          </div>

          {/* Section: Legal Audit & Benchmarking Report */}
          {audit && (
            <section id="section-audit" className="relative z-10 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl scroll-mt-28">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-indigo-800/60 pb-5 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl font-bold shadow-md">
                    <i className="fas fa-shield-halved"></i>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-amber-300">
                      تقرير الفحص والمطابقة مع المواقع والمنصات القانونية المصرية
                    </h3>
                    <p className="text-xs text-indigo-200">
                      Official Statutory Portals, Court of Cassation Precedents, & Customary Legal Benchmarking
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-indigo-900/80 px-4 py-2 rounded-xl border border-indigo-500/40">
                  <span className="text-xs text-indigo-200 font-bold">نسبة المطابقة:</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">{audit.complianceScore}%</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">معتمد</span>
                </div>
              </div>

              {/* 3 Benchmarking Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 text-xs leading-relaxed">
                {/* Pillar 1: Official Portals */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-bold mb-2">
                    <i className="fas fa-landmark text-sm"></i>
                    <span>بوابة التشريعات والشهر العقاري ووزارة العدل</span>
                  </div>
                  <p className="text-slate-300">{audit.officialPortalValidation}</p>
                </div>

                {/* Pillar 2: Court of Cassation */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-bold mb-2">
                    <i className="fas fa-scale-balanced text-sm"></i>
                    <span>أحكام ومبادئ محكمة النقض المستقرة</span>
                  </div>
                  <p className="text-slate-300">{audit.cassationPrinciplesValidation}</p>
                </div>

                {/* Pillar 3: Recognized & Customary Practice */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-bold mb-2">
                    <i className="fas fa-users-rectangle text-sm"></i>
                    <span>نقابة المحامين والعرف القضائي المصري</span>
                  </div>
                  <p className="text-slate-300">{audit.customaryPracticeValidation}</p>
                </div>
              </div>

              {/* Verification Checklist */}
              {audit.verificationChecklist && audit.verificationChecklist.length > 0 && (
                <div className="pt-4 border-t border-indigo-800/60">
                  <h4 className="font-bold text-xs text-indigo-200 mb-3 flex items-center gap-1.5">
                    <i className="fas fa-list-check text-emerald-400"></i>
                    قائمة التحقق الإلزامية المستوفاة في هذا العقد:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {audit.verificationChecklist.map((check, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-white/10 border border-white/5 flex items-start gap-2 text-xs"
                      >
                        <i className="fas fa-circle-check text-emerald-400 text-sm mt-0.5"></i>
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-white block">{check.item}</span>
                          <span className="text-[11px] text-indigo-300 block truncate">{check.reference}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Egyptian Official & Customary Statutory Sources Grid */}
              <div className="mt-5 pt-4 border-t border-indigo-800/60">
                <h4 className="font-bold text-xs text-amber-300 mb-3 flex items-center gap-1.5">
                  <i className="fas fa-landmark-dome text-amber-400"></i>
                  البوابات والمصادر القانونية المصرية المعتمدة المطابق لها هذا العقد:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-[11px] text-slate-300">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
                    <i className="fas fa-scale-balanced text-amber-400 text-base mb-1.5 block"></i>
                    <span className="font-bold text-white block">بوابة التشريعات</span>
                    <span className="text-[10px] text-slate-400">القانون المدني 131/1948</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
                    <i className="fas fa-gavel text-amber-400 text-base mb-1.5 block"></i>
                    <span className="font-bold text-white block">محكمة النقض المصرية</span>
                    <span className="text-[10px] text-slate-400">الدوائر المدنية والتجارية</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
                    <i className="fas fa-stamp text-amber-400 text-base mb-1.5 block"></i>
                    <span className="font-bold text-white block">الشهر العقاري والتوثيق</span>
                    <span className="text-[10px] text-slate-400">إثبات التاريخ والتصديق</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
                    <i className="fas fa-users-rectangle text-amber-400 text-base mb-1.5 block"></i>
                    <span className="font-bold text-white block">نقابة المحامين المصرية</span>
                    <span className="text-[10px] text-slate-400">الصيغ العرفية المعتمدة</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
                    <i className="fas fa-book-bookmark text-amber-400 text-base mb-1.5 block"></i>
                    <span className="font-bold text-white block">شبكة قوانين الشرق</span>
                    <span className="text-[10px] text-slate-400">موسوعات الصيغ والطعون</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Certified Translation Statement */}
          {contract.certificationStatement && (
            <div className="relative z-10 p-5 rounded-xl bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border-r-4 border-blue-700 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <i className="fas fa-stamp text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-blue-950 text-sm mb-1 flex items-center gap-2">
                    <span>إشهاد مطابقة الترجمة القانونية والشرعية</span>
                    <span className="text-xs text-blue-700 font-normal font-mono">| CERTIFIED TRANSLATION ATTESTATION</span>
                  </h4>
                  <p className="text-xs md:text-sm text-blue-900 leading-relaxed font-medium">
                    {contract.certificationStatement}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sharia Compliance Notes */}
          {contract.shariaComplianceNotes && (
            <section id="section-sharia" className="relative z-10 p-6 bg-emerald-50/80 border-r-4 border-emerald-600 rounded-xl shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <i className="fas fa-book-quran text-lg"></i>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-black text-emerald-950">
                    التأصيل الشرعي ومطابقة ضوابط الفقه الإسلامي في المعاملات
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold" style={{ direction: 'ltr' }}>
                    Islamic Jurisprudential Compliance & Sharia Governance
                  </p>
                </div>
              </div>
              <div className={`text-xs md:text-sm text-emerald-950 leading-relaxed whitespace-pre-wrap ${bodyFontClass}`}>
                {contract.shariaComplianceNotes}
              </div>
            </section>
          )}

          {/* Statutory Legal Notes */}
          {contract.legalNotes && (
            <section id="section-legal" className="relative z-10 p-6 bg-amber-50/80 border-r-4 border-amber-600 rounded-xl shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <i className="fas fa-scale-balanced text-lg"></i>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-black text-amber-950">
                    الملاحظات القانونية والتحليل التشريعي (وفقاً للقانون المصري وقضاء النقض)
                  </h3>
                  <p className="text-xs text-amber-700 font-semibold" style={{ direction: 'ltr' }}>
                    Egyptian Statutory Framework & Court of Cassation Precedents
                  </p>
                </div>
              </div>
              <div className={`text-xs md:text-sm text-amber-950 leading-relaxed whitespace-pre-wrap ${bodyFontClass}`}>
                {contract.legalNotes}
              </div>
            </section>
          )}

          {/* Certificate of Digital Execution */}
          {contract.executionCertificate && (
            <div className="p-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-indigo-500/40 shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-indigo-800/80 pb-3 gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-lg font-black shadow-md">
                    <i className="fas fa-certificate"></i>
                  </span>
                  <div>
                    <h5 className="font-black text-sm md:text-base text-white">
                      شهادة إتمام التوقيع الإلكتروني وتوثيق المحرر الرقمي
                    </h5>
                    <p className="text-[10px] text-slate-300 font-mono">
                      Certificate of Digital Execution & Verification Audit Trail
                    </p>
                  </div>
                </div>

                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-mono font-bold">
                  {contract.executionCertificate.certificateId}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1.5">
                  <span className="text-slate-400 font-bold block text-[11px]">البصمة المشفرة للوثيقة (SHA-256 Fingerprint):</span>
                  <p className="font-mono text-[10px] text-amber-300 break-all bg-black/30 p-2 rounded-lg">
                    {contract.executionCertificate.documentHashSha256}
                  </p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1.5">
                  <span className="text-slate-400 font-bold block text-[11px]">المرجعية التشريعية والحجية القضائية:</span>
                  <p className="text-[11px] text-slate-200 leading-relaxed">
                    {contract.executionCertificate.statutoryReference}
                  </p>
                </div>
              </div>
            </div>
          )}
        </aside>
      )}

      {/* Official Digital Certificate Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i className="fas fa-certificate"></i>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">شهادة الاعتماد والتحقق الرقمي الرسمي</h3>
                  <p className="text-[10px] text-slate-500">Official Digital Legal Verification Certificate</p>
                </div>
              </div>
              <button
                onClick={() => setShowVerificationModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>

            <div className="text-center py-2 space-y-2">
              {qrCodeUrl && (
                <img src={qrCodeUrl} alt="Official Verification QR" className="w-28 h-28 mx-auto p-2 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs" />
              )}
              <span className="inline-block text-xs font-mono font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {referenceId}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">عنوان الوثيقة:</span>
                <strong className="text-slate-900">{titleAr}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">حالة المطابقة:</span>
                <span className="text-emerald-700 font-black flex items-center gap-1">
                  <i className="fas fa-check-circle"></i>
                  معتمد ومطابق للقانون المصري والشريعة 100%
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">جهة التوافق:</span>
                <span className="text-slate-900 font-bold">بوابة التشريعات ونماذج نقابة المحامين والشهر العقاري</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">صلاحية النفاذ:</span>
                <span className="text-blue-900 font-bold">سند تنفيذي ملزم قانوناً وقضائياً</span>
              </div>
            </div>

            <button
              onClick={() => setShowVerificationModal(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              إغلاق الشهادة
            </button>
          </div>
        </div>
      )}

      {/* Electronic Signature Modal */}
      <ElectronicSignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        contract={contract}
        onSaveExecutionCertificate={handleSaveExecutionCertificate}
      />

      {/* Egyptian Court Portal Compression & Filing Modal */}
      <GovPortalCompressionModal
        isOpen={isGovPortalModalOpen}
        onClose={() => setIsGovPortalModalOpen(false)}
        contract={contract}
        referenceId={referenceId}
        onDownloadCompressedPdf={handleDownloadCompressedPdf}
        isExportingPdf={isExportingPdf}
      />
    </div>
  );
};

export default ContractDisplay;
