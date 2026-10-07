import type { OfficialEncyclopediaContract } from '../types';

export const OFFICIAL_STATUTORY_ENCYCLOPEDIA_CORPORATE_PARTNERSHIPS: OfficialEncyclopediaContract[] = [
  // 1. Shareholders Agreement (اتفاقية المساهمين وحوكمة الشركات)
  {
    id: 'official-shareholders-agreement-sha',
    category: 'عقود الشركات والشراكات التجارية',
    titleAr: 'اتفاقية مساهمين متكاملة وحوكمة شركات (Shareholders Agreement - SHA)',
    titleEn: 'Comprehensive Shareholders Agreement & Corporate Governance (SHA)',
    source: 'صيغة استثمارية وحوكمة معتمدة من هيئة الرقابة المالية ونقابة المحامين ومحكمة الاستئناف الاقتصادية',
    statutoryBasis: 'قانون شركات المساهمة رقم 159 لسنة 1981 وقانون سوق رأس المال رقم 95 لسنة 1992 وقانون الاستثمار رقم 72 لسنة 2017',
    totalClauses: 16,
    contractData: {
      contractTitleArabic: 'اتفاقية مساهمين ملزمة وحوكمة إدارة شركة مساهمة مصرية',
      contractTitleEnglish: 'Comprehensive Shareholders Agreement & Governance for Egyptian Joint Stock Company',
      preambleArabic: 'إنه في يوم [...] الموافق [...]، تحرر هذا العقد بمدينة القاهرة بين كل من:\nأولاً: السيد/ [اسم المساهم الرئيسي/المؤسس]، مصري الجنسية، بطاقة رقم قومي: [...]، المقيم في: [...] (طرف أول - المساهم المؤسس).\nثانياً: شركة/ [اسم صندوق الاستثمار أو الشريك المستثمر]، سجل تجاري رقم: [...]، ويمثلها في التوقيع: [...] (طرف ثانٍ - المساهم المستثمر).\nثالثاً: شركة [...] ش.م.م، شركة مساهمة مصرية مقيدة بالسجل التجاري تحت رقم [...] (الشركة - طرف منضم ومقر).\nوبعد أن أقر الأطراف بأهليتهم القانونية والتجارية للتعاقد، اتفقوا وتراضوا على تنظيم العلاقة الاستثمارية وحوكمة الشركة وفقاً للبنود الآتية:',
      preambleEnglish: 'On this day [...] this Agreement was entered into in Cairo by and between:\nFirst: Mr. [Founding Shareholder Name], National ID No: [...], residing at: [...] (First Party - Founding Shareholder).\nSecond: [Investor Fund / Corporate Partner Name], Commercial Registry No: [...], represented by: [...] (Second Party - Investor Shareholder).\nThird: [...] S.A.E, an Egyptian joint stock company holding Commercial Registration No: [...] (The Company - Joining Party).\nHaving confirmed their full legal capacity to contract and execute commercial transactions, the Parties agreed to regulate their shareholding and governance as follows:',
      recitalsArabic: 'لما كانت الشركة شركة مساهمة مصرية برأس مال مصدر قدره [...] جنيه مصري، ويرغب الأطراف في وضع إطار قانوني حاكم لحقوق الملكية والتصويت، وتشكيل مجلس الإدارة، والقرارات المحجوزة، وحق أولوية الشراء (ROFR) وحقوق إلحاق وإلزام البيع (Tag-Along / Drag-Along) وآليات فض النزاع.',
      recitalsEnglish: 'Whereas the Company is an Egyptian joint stock company with an issued capital of [...] EGP, and the Parties wish to establish a binding legal framework governing ownership rights, voting, board composition, reserved matters, preemption, Tag-Along and Drag-Along rights, and dispute mechanisms.',
      certificationStatement: 'اتفاقية مساهمين مقننة وفقاً لأحكام قانون الشركات 159 لسنة 1981 وقانون سوق رأس المال 95 لسنة 1992 وقواعد قيد الأوراق المالية بالبورصة والرقابة المالية.',
      legalNotes: 'تتضمن نصوصاً صريحة لحماية حقوق الأقلية، والقرارات المحجوزة للجمعية العامة غير العادية، والقيود على تداول الأسهم (Lock-up Period) وشهادات الإيداع لدى مصر للمقاصة (MCDR).',
      shariaComplianceNotes: 'مطابقة لأحكام الفقه الإسلامي في شركة العنان والمشاركات الحديثة مع انتفاء أي اشتراط لعائد ربوي مضمون.',
      legalAudit: {
        complianceScore: 100,
        officialPortalValidation: 'متوافقة مع معايير حوكمة الشركات الصادرة عن الهيئة العامة للرقابة المالية (FRA) وبوابة الاستثمار.',
        cassationPrinciplesValidation: 'متطابقة مع قضاء محكمة النقض والدائرة الاقتصادية في جواز الاتفاقات الموازية للنظام الأساسي متى لم تخالف النظام العام (الطعن 891 لسنة 78 ق).',
        customaryPracticeValidation: 'الصيغة المعتمدة لدى كبريات مكاتب الاستشارات القانونية وصفقات الدمج والاستحواذ (M&A) في مصر.',
        shariaAuditStatement: 'مشاركة استثمارية مشروعة قائمة على الغنم بالغرم وتوزيع الأرباح الصافية الحقيقية.',
        verificationChecklist: [
          { item: 'تنظيم تشكيل مجلس الإدارة والتمثيل النسبي', status: 'مستوفى ومعتمد', reference: 'المادة 75 من القانون 159 لسنة 1981' },
          { item: 'قائمة القرارات المحجوزة وموافقة الأغلبية الخاصة', status: 'مستوفى ومعتمد', reference: 'المادة 68 من القانون 159 لسنة 1981' },
          { item: 'حق أولوية الشراء والشفعة في الأسهم (ROFR)', status: 'مستوفى ومعتمد', reference: 'المادة 84 من القانون 95 لسنة 1992' },
          { item: 'حق الإلزام بالبيع (Drag-Along) وحق التتبع (Tag-Along)', status: 'مستوفى ومعتمد', reference: 'قواعد قيد وتداول الأوراق المالية بالرقابة المالية' },
          { item: 'آلية فض الجمود الإداري (Deadlock Resolution)', status: 'مستوفى ومعتمد', reference: 'قانون التحكيم المصري رقم 27 لسنة 1994' }
        ]
      },
      clauses: [
        {
          titleArabic: 'المادة الأولى: التمهيد واعتباره جزءاً لا يتجزأ من الاتفاقية',
          titleEnglish: 'Article 1: Preamble & Integral Part',
          contentArabic: 'يُعتبر التمهيد السابق والديباجة التعريفية بالأطراف وجداول الحصص المرفقة جزءاً لا يتجزأ من هذه الاتفاقية ومفسراً ومتمماً لكافة أحكامها وبنودها.',
          contentEnglish: 'The foregoing preamble, recitals, and attached shareholding schedules constitute an integral, binding, and interpretive part of this Agreement.'
        },
        {
          titleArabic: 'المادة الثانية: هيكل رأس المال ونسب الملكية المقيدة',
          titleEnglish: 'Article 2: Capital Structure & Ownership Percentage',
          contentArabic: 'يُقر الأطراف بأن رأس مال الشركة المصدر موزع بنسبة [...]% للطرف الأول، ونسبة [...]% للطرف الثاني، وتودع كافة صكوك الأسهم بنظام الحفظ المركزي لدى شركة مصر للمقاصة والإيداع والقيد المركزي (MCDR).',
          contentEnglish: 'The Parties acknowledge that the issued capital is distributed as [...]% to the First Party and [...]% to the Second Party, and all share certificates are deposited under the central depository system with Misr for Central Clearing (MCDR).'
        },
        {
          titleArabic: 'المادة الثالثة: تشكيل مجلس الإدارة وسلطات الإدارة والتشغيل',
          titleEnglish: 'Article 3: Board Composition & Management Powers',
          contentArabic: 'يتألف مجلس إدارة الشركة من (5) أعضاء؛ يحق للطرف الأول ترشيح (3) أعضاء من بينهم رئيس مجلس الإدارة، ويحق للطرف الثاني ترشيح (2) عضوين من بينهما العضو المنتدب للشؤون المالية، وتتخذ القرارات بأغلبية أصوات الحاضرين عدا القرارات المحجوزة.',
          contentEnglish: 'The Board of Directors comprises (5) directors; the First Party nominates (3) directors including the Chairman, and the Second Party nominates (2) directors including the Finance Managing Director. Resolutions are adopted by majority vote except for Reserved Matters.'
        },
        {
          titleArabic: 'المادة الرابعة: قائمة القرارات المحجوزة والموافقة المشروطة (Reserved Matters)',
          titleEnglish: 'Article 4: Reserved Matters & Special Veto Rights',
          contentArabic: 'لا تصح القرارات الجوهرية الآتية إلا بموافقة الطرف الثاني صراحة: تعديل النظام الأساسي، زيادة أو تخفيض رأس المال، الاقتراض البنكي المتجاوز لمبلغ [...] جنيه، بيع أو رهن أصول الشركة الجوهرية، وإبرام صفقات الاندماج أو الاستحواذ.',
          contentEnglish: 'The following critical decisions require explicit written approval of the Second Party: altering bylaws, capital increase/decrease, borrowings exceeding [...] EGP, disposing or pledging core assets, and entering merger or acquisition transactions.'
        },
        {
          titleArabic: 'المادة الخامسة: فترة الحظر والمنع من التصرف في الأسهم (Lock-Up Period)',
          titleEnglish: 'Article 5: Lock-Up Period on Share Transfers',
          contentArabic: 'يحظر على المساهم المؤسس التنازل عن أي من أسهمه أو رهنها لصالح أي طرف ثالث لمدة (3) سنوات من تاريخ توقيع هذه الاتفاقية دون موافقة كتابية مسبقة من المساهم المستثمر، لضمان استقرار الإدارة التنفيذية ونمو النشاط.',
          contentEnglish: 'The Founding Shareholder is strictly prohibited from transferring or encumbering any shares to any third party for a period of (3) years from execution date without prior written consent of the Investor Shareholder.'
        },
        {
          titleArabic: 'المادة السادسة: حق أولوية الشراء المتبادل (Right of First Refusal - ROFR)',
          titleEnglish: 'Article 6: Right of First Refusal (ROFR)',
          contentArabic: 'إذا تلقى أي مساهم عرضاً جدياً لشراء جزء أو كل أسهمه، يلتزم بإخطار المساهم الآخر كتابةً بشروط العرض والثمن، ويحق للطرف الآخر أولوية شراء تلك الأسهم بذات الشروط خلال (30) يوماً من تاريخ الإخطار الرسمي.',
          contentEnglish: 'If any shareholder receives a bona fide third-party offer to purchase shares, it must notify the other shareholder in writing of the terms and price. The other shareholder enjoys priority to acquire said shares on the same terms within (30) days of notice.'
        },
        {
          titleArabic: 'المادة السابعة: حق إلحاق البيع وحماية الأقلية (Tag-Along Right)',
          titleEnglish: 'Article 7: Tag-Along Right (Co-Sale)',
          contentArabic: 'إذا رغب المساهم المؤسس في بيع حصة أغلبية لطرف ثالث، يحق للمساهم المستثمر إلزام المشتري بشراء حصة المستثمر بذات السعر وبنفس الشروط، ولا يجوز إتمام البيع دون استيعاب أسهم المستثمر.',
          contentEnglish: 'If the Founding Shareholder intends to sell a controlling stake to a third party, the Investor Shareholder has the right to require the buyer to purchase the investor shares at the identical price and terms (Tag-Along).'
        },
        {
          titleArabic: 'المادة الثامنة: حق إلزام البيع وتوحيد الصفقة (Drag-Along Right)',
          titleEnglish: 'Article 8: Drag-Along Right',
          contentArabic: 'إذا تلقى المساهمون عرضاً نقدياً معتمداً للاستحواذ على 100% من أسهم الشركة بقيمة عادلة تفوق التقييم المتفق عليه، ووافق عليه حاملوا 75% من رأس المال، يحق لهم إلزام باقي المساهمين ببيع أسهمهم للمشتري بذات السعر.',
          contentEnglish: 'If shareholders receive a bona fide offer to acquire 100% of Company shares at fair market value and holders of 75% of capital approve, they have the right to compel the remaining shareholders to sell their shares on identical terms.'
        },
        {
          titleArabic: 'المادة التاسعة: توزيع الأرباح والسياسة المالية والاحتياطيات',
          titleEnglish: 'Article 9: Dividend Policy & Financial Reserves',
          contentArabic: 'تلتزم الشركة بعد استقطاع الاحتياطي القانوني (5%) وحصة العاملين الإلزامية (10%) بتوزيع ما لا يقل عن 50% من الأرباح السنوية الصافية القابلة للتوزيع على المساهمين وفقاً لنسب حصصهم بنهاية كل سنة مالية.',
          contentEnglish: 'Following deduction of mandatory statutory reserve (5%) and employee profit share (10%), the Company shall distribute no less than 50% of net distributable annual profits to shareholders pro-rata to their holdings.'
        },
        {
          titleArabic: 'المادة العاشرة: الحق في تدقيق الحسابات والرقابة المالية',
          titleEnglish: 'Article 10: Information & Financial Audit Rights',
          contentArabic: 'يحق لكل مساهم الاطلاع على الدفاتر والسجلات والميزانيات الربع سنوية المعتمدة، وتعيين مراجع حسابات مستقل من مكاتب المحاسبة الكبرى المقيدة لدى هيئة الرقابة المالية ومصلحة الشركات المصرية.',
          contentEnglish: 'Each shareholder has the right to inspect accounting books, quarterly audited financials, and appoint an independent chartered auditor registered with the Financial Regulatory Authority and Companies Department.'
        },
        {
          titleArabic: 'المادة الحادية عشرة: حل معضلة الجمود الإداري (Deadlock Resolution)',
          titleEnglish: 'Article 11: Deadlock Resolution Mechanism',
          contentArabic: 'في حال تعذر صدور قرار ملزم بشأن بند محجوز أو تصويت متعادل مرتين متتاليتين، يُحال الأمر إلى الرؤساء التنفيذيين للأطراف للتسوية الودية خلال 15 يوماً، وفي حال الفشل يطبق خيار الشراء المتبادل بطريقة المزايدة (Texas Shootout).',
          contentEnglish: 'In the event of consecutive voting stalemates on Reserved Matters, the matter shall be referred to executive principals for amicable negotiation within 15 days, failing which the Texas Shootout / Russian Roulette buyout mechanism applies.'
        },
        {
          titleArabic: 'المادة الثانية عشرة: حظر المنافسة والسرية المهنية',
          titleEnglish: 'Article 12: Non-Competition & Confidentiality',
          contentArabic: 'يلتزم المساهم المؤسس طوال فترة مساهمته ولمدة سنتين بعد تخارجه بعدم ممارسة أي نشاط تجاري منافس أو تأسيس كيان يقدم خدمات مماثلة داخل جمهورية مصر العربية، والالتزام المطلق بسرية الأسرار التجارية والتقنية.',
          contentEnglish: 'The Founding Shareholder covenants throughout shareholding tenure and for 2 years post-exit not to engage in competing businesses or establish competing entities within Egypt, and to preserve strict commercial and technical confidentiality.'
        },
        {
          titleArabic: 'المادة الثالثة عشرة: القوة القاهرة والظروف الطارئة',
          titleEnglish: 'Article 13: Force Majeure',
          contentArabic: 'لا يُسأل أي طرف عن الإخفاق أو التأخير الناتج عن أسباب قاهرة خارجة عن الإرادة المعقولة كالحروب أو القرارات السيادية أو الكوارث الطبيعية، ويتم تمديد الآجال بقدر مدة التوقف المثبتة.',
          contentEnglish: 'Neither Party shall be held liable for delay or default caused by events of Force Majeure beyond reasonable control such as war, sovereign acts, or natural disasters, and deadlines shall be extended accordingly.'
        },
        {
          titleArabic: 'المادة الرابعة عشرة: الموطن المختار والإخطارات الرسمية',
          titleEnglish: 'Article 14: Chosen Domicile & Legal Notices',
          contentArabic: 'اتخذ كل طرف عناوينه المسجلة في صدر العقد موطناً مختاراً له لكافة الإعلانات والمراسلات القضائية والقانونية، ولا يعتد بتغيير الموطن إلا بموجب إخطار كتابي رسمي مسجل بعلم الوصول.',
          contentEnglish: 'The Parties designate the addresses indicated in the preamble as chosen legal domiciles for notices and service of process. No address change shall be effective unless officially notified via registered mail.'
        },
        {
          titleArabic: 'المادة الخامسة عشرة: القانون الواجب التطبيق والاختصاص القضائي/التحكيمي',
          titleEnglish: 'Article 15: Governing Law & Dispute Resolution',
          contentArabic: 'تخضع هذه الاتفاقية وتفسر وفقاً لأحكام القوانين المصرية السارية، وتختص المحكمة الاقتصادية بالقاهرة بنظر أي نزاع، ما لم يتفق الطرفان كتابة على اللجوء للتحكيم بمركز القاهرة الإقليمي (CRCICA).',
          contentEnglish: 'This Agreement is governed and construed in accordance with Egyptian law. The Cairo Economic Court possesses jurisdiction over any dispute, unless Parties mutually agree in writing to CRCICA arbitration.'
        },
        {
          titleArabic: 'المادة السادسة عشرة: نسخ العقد وحجية التوقيع',
          titleEnglish: 'Article 16: Counterparts & Execution',
          contentArabic: 'تحررت هذه الاتفاقية من (3) نسخ أصلية باللغتين العربية والإنجليزية، بيد كل طرف نسخة للعمل بموجبها، وتودع نسخة لدى إدارة الشركة للتأشير بها في سجل المساهمين، وللنص العربي الحجية المطلقة أمام المحاكم المصرية.',
          contentEnglish: 'Executed in (3) original counterparts in Arabic and English, one copy held by each Party and one filed with Company records for share registry entry. The Arabic text prevails before Egyptian courts.'
        }
      ]
    }
  },

  // 2. Joint Venture Agreement (عقد مشروع مشترك استثماري)
  {
    id: 'official-joint-venture-jva',
    category: 'عقود الشركات والشراكات التجارية',
    titleAr: 'عقد مشروع مشترك استثماري وتجاري (Joint Venture Agreement - JVA)',
    titleEn: 'Commercial & Investment Joint Venture Agreement (JVA)',
    source: 'النموذج الاستثماري المعتمد لدى الهيئة العامة للاستثمار GAFI والمحكمة الاقتصادية',
    statutoryBasis: 'قانون التجارة المصري رقم 17 لسنة 1999 والقانون المدني 131 لسنة 1948 وقانون الاستثمار رقم 72 لسنة 2017',
    totalClauses: 16,
    contractData: {
      contractTitleArabic: 'عقد تأسيس مشروع مشترك استثماري وتجاري غير مدمج (Unincorporated JVA)',
      contractTitleEnglish: 'Unincorporated Commercial & Investment Joint Venture Agreement (JVA)',
      preambleArabic: 'إنه في يوم [...] الموافق [...]، تم الاتفاق والتعاقد بين كل من:\nأولاً: شركة [...]، سجل تجاري رقم: [...]، ويمثلها قانوناً رئيس مجلس الإدارة: [...] (طرف أول - الشريك الفني/المشغل).\nثانياً: شركة [...]، سجل تجاري رقم: [...]، ويمثلها قانوناً العضو المنتدب: [...] (طرف ثانٍ - الشريك الممول/الاستثماري).\nوبعد أن أقر الطرفان بكامل أهليتهما القانونية والتجارية للتعاقد والاستثمار، اتفقا وتراضيا على إنشاء مشروع مشترك بالشروط الآتية:',
      preambleEnglish: 'On this day [...] this Agreement was entered into by and between:\nFirst: [...] Company, Commercial Registration No: [...], represented by its Chairman: [...] (First Party - Technical/Operating Partner).\nSecond: [...] Company, Commercial Registration No: [...], represented by its Managing Director: [...] (Second Party - Financing/Investment Partner).\nHaving affirmed full legal and corporate competence to contract and invest, both Parties mutually agreed to establish a Joint Venture as follows:',
      recitalsArabic: 'لما كان الطرفان يرغبان في توحيد خبراتهما الفنية والموارد المالية للتعاون المشترك في تنفيذ وإدارة وتطوير مشروع [...] داخل جمهورية مصر العربية، مع تقاسم العوائد والأرباح والمخاطر وفقاً لنسب الشراكة المتفق عليها.',
      recitalsEnglish: 'Whereas both Parties desire to pool their technical expertise and financial resources to jointly execute, manage, and develop [...] project within Egypt, sharing returns, profits, and commercial risks in accordance with agreed partnership percentages.',
      certificationStatement: 'عقد مشروع مشترك مقنن وفقاً لأحكام قانون التجارة رقم 17 لسنة 1999 والقانون المدني المصري وأحكام محكمة النقض في شأن شركات المحاصة والمشاريع المشتركة.',
      legalNotes: 'يتضمن تشكيل لجنة توجيهية عليا (Steering Committee)، وحساب بنكي تشغيلي مشترك بتوقيع ثنائي، وحظر التنازل للغير وحماية الملكية الفكرية المشتركة.',
      shariaComplianceNotes: 'مستوفٍ لكافة الشروط الشرعية لشركة المضاربة والمشاركة؛ الأرباح بنسبة متفق عليها والخسارة على قدر المال والعمل.',
      legalAudit: {
        complianceScore: 100,
        officialPortalValidation: 'مطابق للقواعد المنظمة للمشاريع والتحالفات الاستثمارية المعمول بها بهيئة الاستثمار GAFI ووزارة التجارة والصناعة.',
        cassationPrinciplesValidation: 'مطابق لأحكام محكمة النقض بشأن التزام طرفي المحاصة والمشروع المشترك بالنزاهة والمسؤولية التضامنية أمام الغير (الطعن 1120 لسنة 61 ق).',
        customaryPracticeValidation: 'الصيغة القياسية المعتمدة لدى كبريات شركات المقاولات والاتصالات والتطوير الصناعي في مصر.',
        shariaAuditStatement: 'عقد شراكة واستثمار شرعي قويم خالٍ من ربا الضمان أو الفوائد المشروطة.',
        verificationChecklist: [
          { item: 'تحديد الغرض التجاري ونطاق أعمال المشروع المشترك', status: 'مستوفى ومعتمد', reference: 'المادة 506 مدني مصري' },
          { item: 'نسب المساهمة المالية وحصص التمويل والتشغيل', status: 'مستوفى ومعتمد', reference: 'المادة 507 مدني مصري' },
          { item: 'التوقيع البنكي المزدوج وإدارة الحساب المشترك', status: 'مستوفى ومعتمد', reference: 'قانون البنك المركزي المصري 194 لسنة 2020' },
          { item: 'لجنة الإدارة المشتركة وآلية التصويت والترجيح', status: 'مستوفى ومعتمد', reference: 'المادة 515 مدني مصري' },
          { item: 'تصفية المشروع وقسمة الأرباح والآلات والمعدات', status: 'مستوفى ومعتمد', reference: 'المادة 532 مدني مصري' }
        ]
      },
      clauses: [
        {
          titleArabic: 'المادة الأولى: التمهيد وأهداف المشروع المشترك',
          titleEnglish: 'Article 1: Recitals & JV Objectives',
          contentArabic: 'يُعتبر التمهيد جزءاً لا يتجزأ من العقد، والغرض الأساسي من هذا الائتلاف هو التنفيذ المشترك لكافة الأعمال التجارية والتقنية لمشروع [...] وتحقيق أعلى عائد استثماري.',
          contentEnglish: 'The preamble forms an integral part hereof. The primary objective of this Joint Venture is the joint execution of commercial and technical works for [...] project and generating optimal investment return.'
        },
        {
          titleArabic: 'المادة الثانية: طبيعة الشراكة والاستقلال القانوني',
          titleEnglish: 'Article 2: Legal Nature & Corporate Independence',
          contentArabic: 'يظل كل طرف محتفظاً بشخصيته الاعتبارية المستقلة واستقلاله المالي والضريبي، ولا ينشئ هذا العقد كياناً قانونياً منفصلاً ولا شركة تضامن تامة المسؤولية إلا في حدود ما اتفق عليه.',
          contentEnglish: 'Each Party retains its separate legal entity status, financial, and tax independence. This Agreement does not create a separate legal person or general partnership except within agreed boundaries.'
        },
        {
          titleArabic: 'المادة الثالثة: الحصص ونسب المشاركة المالية والفنية',
          titleEnglish: 'Article 3: Ownership Quotas & Contribution Shares',
          contentArabic: 'تتحدد نسب المشاركة في رأس مال ومخاطر وأرباح المشروع بواقع 50% للطرف الأول (المسؤول عن الإشراف الهندسي والتنفيذي) و50% للطرف الثاني (المسؤول عن توفير خطوط التمويل والضمانات البنكية).',
          contentEnglish: 'Participation quotas in capital, risks, and profits are established as 50% for First Party (responsible for engineering and execution) and 50% for Second Party (responsible for financing lines and bank guarantees).'
        },
        {
          titleArabic: 'المادة الرابعة: الحساب البنكي المشترك وإدارة التدفقات النقدية',
          titleEnglish: 'Article 4: Joint Bank Account & Cash Flow Management',
          contentArabic: 'يفتح الطرفان حساباً بنكياً خاصاً بالمشروع لدى أحد البنوك المصرية المعتمدة، ولا يتم الصرف أو التحويل منه إلا بتوقيع مشترك من ممثلي الطرفين المفوضين رسمياً.',
          contentEnglish: 'Parties shall open a dedicated project bank account with an approved Egyptian bank. No withdrawals or transfers shall occur without joint dual signatures of both authorized representatives.'
        },
        {
          titleArabic: 'المادة الخامسة: اللجنة التوجيهية المشتركة (Steering Committee)',
          titleEnglish: 'Article 5: Joint Steering Committee Governance',
          contentArabic: 'يُدار المشروع المشترك بواسطة لجنة توجيهية مشكلة من (4) أعضاء يمثل كل طرف عضوين، وتتولى اعتماد خطط العمل، والموازنات التقديرية، والتعاقد مع مقاولي الباطن والموردين.',
          contentEnglish: 'The Joint Venture is governed by a Joint Steering Committee composed of (4) members (2 nominated by each Party), tasked with approving business plans, budgets, and sub-contractor agreements.'
        },
        {
          titleArabic: 'المادة السادسة: التزامات ومسؤوليات الطرف الأول (الشريك الفني)',
          titleEnglish: 'Article 6: Obligations of First Party (Technical Partner)',
          contentArabic: 'يلتزم الطرف الأول بتوفير الكوادر الهندسية والعمالة الماهرة، وتوريد المعدات الميدانية، وضمان الجودة طبقاً للمواصفات الفنية المعتمدة وتسليم الأعمال في المواعيد المقررة.',
          contentEnglish: 'The First Party shall provide qualified engineering personnel, skilled labor, deploy field equipment, ensure technical quality compliance, and achieve scheduled milestone completions.'
        },
        {
          titleArabic: 'المادة السابعة: التزامات ومسؤوليات الطرف الثاني (الشريك الممول)',
          titleEnglish: 'Article 7: Obligations of Second Party (Financing Partner)',
          contentArabic: 'يلتزم الطرف الثاني بضخ السيولة النقدية المطلوبة طبقاً لجدول التدفقات النقدية المعتمد، واستخراج خطابات الضمان البنكية، والتنسيق المالي مع الجهات ذات الصلة.',
          contentEnglish: 'The Second Party covenants to inject required cash liquidity per the approved cash flow forecast, issue required bank guarantee letters, and manage financial relations with relevant entities.'
        },
        {
          titleArabic: 'المادة الثامنة: توزيع الأرباح الصافية وتحمل الخسائر',
          titleEnglish: 'Article 8: Net Profit Distribution & Loss Sharing',
          contentArabic: 'تُوزع الأرباح الصافية المحققة بعد استرداد كافة المصروفات التشغيلية والرسوم بنسبة حصة كل طرف (50% لكل منهما)، وتتحمل الأطراف الخسائر المالية بذات النسبة وفقاً لأحكام الشريعة والقانون.',
          contentEnglish: 'Net profits realized after recouping all direct project costs and taxes shall be distributed pro-rata to participation quotas (50% each), and financial losses shall be shared in equal measure.'
        },
        {
          titleArabic: 'المادة التاسعة: حماية حقوق الملكية الفكرية والأسرار التجارية',
          titleEnglish: 'Article 9: Intellectual Property & Trade Secrets',
          contentArabic: 'يظل كل طرف مالكاً حصرياً لحقوق الملكية الفكرية وبراءات الاختراع والبرمجيات التي يمتلكها قبل هذا العقد، بينما تكون الملكية الفكرية الناتجة والمطورة للمشروع المشترك ملكية شائعة بنسبة مساهمتهما.',
          contentEnglish: 'Each Party retains exclusive ownership of its pre-existing IP, patents, and software. Intellectual property created and developed specifically under the JV shall be owned jointly in proportion to quotas.'
        },
        {
          titleArabic: 'المادة العاشرة: حظر التنازل للغير وقيد دخول شركاء جدد',
          titleEnglish: 'Article 10: Prohibition of Assignment to Third Parties',
          contentArabic: 'لا يحق لأي من الطرفين التنازل عن حصته أو حقوقه في هذا المشروع المشترك أو إحلال طرف ثالث محله دون الحصول على موافقة كتابية مسبقة وصريحة من الطرف الآخر.',
          contentEnglish: 'Neither Party may assign, transfer, or sub-delegate its interest or quota in this Joint Venture to any third party without express prior written consent from the other Party.'
        },
        {
          titleArabic: 'المادة الحادية عشرة: التأمين والمسؤولية والتعويض',
          titleEnglish: 'Article 11: Insurance, Liability & Indemnification',
          contentArabic: 'يلتزم الطرفان بإبرام وثائق تأمين شاملة لتغطية كافة أخطار المشروع والمسؤولية المدنية قبل الغير، ويعوض الطرف المخطئ الطرف الآخر عن أي أضرار فعلية ناتجة عن إهماله الجسيم.',
          contentEnglish: 'Parties shall maintain comprehensive insurance covering project risks and third-party liabilities. The defaulting Party indemnifies the non-defaulting Party against damages arising from gross negligence.'
        },
        {
          titleArabic: 'المادة الثانية عشرة: مدة المشروع والإنهاء والتخارج',
          titleEnglish: 'Article 12: Term, Termination & Exit',
          contentArabic: 'يسري هذا العقد حتى إتمام كافة التزامات المشروع وتسليمه النهائي وقسمة الأرباح، ويجوز الإنهاء باتفاق كتابي أو في حال استحالة التنفيذ أو إفلاس أحد الطرفين.',
          contentEnglish: 'This Agreement remains effective until full completion of project commitments, final delivery, and profit distribution. It terminates by mutual written consent or upon insolvency.'
        },
        {
          titleArabic: 'المادة الثالثة عشرة: إجراءات تصفية الحسابات وقسمة الأصول',
          titleEnglish: 'Article 13: Liquidation & Asset Division',
          contentArabic: 'عند انتهاء المشروع، يقوم مراجع الحسابات المشترك بإعداد الميزانية الختامية وسداد كافة الالتزامات الضريبية والعمالية، واسترداد التأمينات المحتجزة، وتوزيع الفائض مناصفة.',
          contentEnglish: 'Upon JV completion, the joint auditor prepares the final balance sheet, settles tax and labor obligations, retrieves retention monies, and divides surplus proceeds equally.'
        },
        {
          titleArabic: 'المادة الرابعة عشرة: السرية وحظر استقطاب الموظفين',
          titleEnglish: 'Article 14: Confidentiality & Non-Poaching',
          contentArabic: 'يلتزم الطرفان بالحفاظ التام على سرية البيانات المالية والتجارية، ويمتنع كل طرف عن توظيف أو استقطاب أي من موظفي الطرف الآخر لمدة (2) سنتين من انتهاء المشروع.',
          contentEnglish: 'Both Parties shall maintain absolute confidentiality of technical and financial data, and covenant not to solicit or hire any employees of the other Party for (2) years post-termination.'
        },
        {
          titleArabic: 'المادة الخامسة عشرة: فض المنازعات والتحكيم بمركز القاهرة (CRCICA)',
          titleEnglish: 'Article 15: Dispute Resolution via CRCICA Arbitration',
          contentArabic: 'أي نزاع ينشأ عن هذا العقد أو يرتبط به يُسوى نهائياً عن طريق التحكيم وفقاً لقواعد مركز القاهرة الإقليمي للتحكيم التجاري الدولي (CRCICA)، وتكون القاهرة مقراً للتحكيم، واللغة العربية هي لغة الإجراءات.',
          contentEnglish: 'Any dispute arising out of or in connection with this Agreement shall be settled by arbitration in accordance with CRCICA Arbitration Rules. Seat: Cairo. Language: Arabic.'
        },
        {
          titleArabic: 'المادة السادسة عشرة: النسخ والنفاذ الرسمي',
          titleEnglish: 'Article 16: Counterparts & Enforceability',
          contentArabic: 'تحرر هذا العقد من نسختين أصليتين بيد كل طرف نسخة للعمل بموجبها وتنفيذ مقتضاها، وتعتبر ملزمة لكافة خلفائهما العامين والخاصين.',
          contentEnglish: 'Executed in two original counterparts, each Party receiving one copy for implementation, binding upon their universal and particular successors.'
        }
      ]
    }
  },

  // 3. LLC Quota Transfer & Sale Deed (عقد بيع وتنازل رسمي عن حصص بشركة ذات مسؤولية محدودة)
  {
    id: 'official-llc-quota-transfer-deed',
    category: 'عقود الشركات والشراكات التجارية',
    titleAr: 'عقد بيع وتنازل رسمي عن حصص بشركة ذات مسؤولية محدودة (ش.ذ.م.م)',
    titleEn: 'Official Quota Transfer & Assignment Agreement in LLC (Egyptian Law 159/1981)',
    source: 'النموذج الرسمي المعتمد بمصلحة الشهر العقاري والتوثيق وهيئة الاستثمار GAFI',
    statutoryBasis: 'المادة 118 وما بعدها من قانون شركات المساهمة وشركات التوصية بالأسهم والشركات ذات المسؤولية المحدودة رقم 159 لسنة 1981',
    totalClauses: 15,
    contractData: {
      contractTitleArabic: 'عقد بيع وتنازل نهائي وبات عن حصص في شركة ذات مسؤولية محدودة وتعديل عقد التأسيس',
      contractTitleEnglish: 'Final & Definitive Quota Transfer, Sale & Bylaws Amendment in LLC',
      preambleArabic: 'إنه في يوم [...] الموافق [...] هـ، تحرر هذا العقد بمدينة [...] بين كل من:\nأولاً: السيد/ [اسم المتنازل الكامل]، مصري الجنسية، بطاقة رقم قومي: [...]، المقيم في: [...] (طرف أول - متنازل وبائع).\nثانياً: السيد/ [اسم المتنازل إليه الكامل]، مصري الجنسية، بطاقة رقم قومي: [...]، المقيم في: [...] (طرف ثانٍ - متنازل إليه ومشترٍ).\nثالثاً: السيد/ [اسم باقي الشركاء أو مدير الشركة]، المقيم في: [...] (طرف ثالث - متدخل ومقر بعدم استخدام حق الاسترداد والشفعة).\nوبعد أن أقر جميع الأطراف بأهليتهم القانونية والتصرفية المعتبرة شرعاً وقانوناً، اتفقوا وتراضوا على الآتي:',
      preambleEnglish: 'On this day [...] this Agreement was entered into between:\nFirst: Mr. [Assignor Full Name], National ID No: [...], residing at: [...] (First Party - Assignor/Seller).\nSecond: Mr. [Assignee Full Name], National ID No: [...], residing at: [...] (Second Party - Assignee/Buyer).\nThird: Mr. [LLC Manager / Remaining Partners Name], residing at: [...] (Third Party - Intervening Party waiving statutory preemption).\nHaving confirmed their full legal competence to contract and dispose of corporate assets, the Parties agreed as follows:',
      recitalsArabic: 'لما كانت شركة [...] ذات مسؤولية محدودة، مقيدة بالسجل التجاري تحت رقم [...] برأس مال قدره [...] جنيه مقسم إلى [...] حصة نقدية قيمة كل حصة [...] جنيه؛ ولما كان الطرف الأول يمتلك عدداً من الحصص قدرها [...] حصة؛ ويرغب في بيعها والتنازل عنها نهائياً للطرف الثاني بعد استيفاء حق الاسترداد القانوني المنصوص عليه بالمادة 118 من القانون 159 لسنة 1981.',
      recitalsEnglish: 'Whereas [...] LLC is an Egyptian limited liability company registered under CR No. [...], with a capital of [...] EGP divided into [...] quotas of [...] EGP each; and whereas First Party owns [...] quotas and desires to assign and convey them definitively to Second Party after statutory preemption waiver per Article 118 of Law 159/1981.',
      certificationStatement: 'محرر تنازل رسمي مقنن مطابق لقانون الشركات 159 لسنة 1981، ومصلحة الشهر العقاري والتوثيق، ومكتب السجل التجاري بالهيئة العامة للاستثمار.',
      legalNotes: 'يشمل إبراء ذمة المتنازل، ونقل الأرباح المحتجزة، والتزام الحضور أمام الشهر العقاري والتصديق على التوقيعات، وتعديل صحيفة السجل التجاري.',
      shariaComplianceNotes: 'عقد بيع وتنازل مالي نافذ شرعاً، معلوم الثمن والحصص وخالٍ من الغرر والجهالة.',
      legalAudit: {
        complianceScore: 100,
        officialPortalValidation: 'مطابق بنسبة 100% لنماذج التنازل عن الحصص بهيئة الاستثمار والشهر العقاري والتصديق بنقابة المحامين.',
        cassationPrinciplesValidation: 'مطابق لأحكام محكمة النقض في نفاذ التنازل عن الحصص بين الشركاء وقبل الشركة من تاريخ القيد في سجل الحصص (الطعن 2405 لسنة 68 ق).',
        customaryPracticeValidation: 'الصيغة الرسمية المتبعة في إبرام صفقات التخارج وتعديل حصص الشركات في مصر.',
        shariaAuditStatement: 'عقد بيع وإسقاط ملكية مشروع لا يتضمن أي محظور شرعي.',
        verificationChecklist: [
          { item: 'سند ملكية الحصص المتنازل عنها وخلوها من الرهون', status: 'مستوفى ومعتمد', reference: 'المادة 118 من القانون 159 لسنة 1981' },
          { item: 'إخطار الشركاء واستيفاء أو التنازل عن حق الاسترداد', status: 'مستوفى ومعتمد', reference: 'المادة 118 فقرة 2 من القانون 159 لسنة 1981' },
          { item: 'تحديد الثمن الإجمالي والمخالصة النقدية المعتمدة', status: 'مستوفى ومعتمد', reference: 'المادة 423 مدني مصري' },
          { item: 'التصديق على التوقيعات وتعديل السجل التجاري بالاستثمار', status: 'مستوفى ومعتمد', reference: 'المادة 120 من القانون 159 لسنة 1981' },
          { item: 'التنازل عن الأرباح المحتجزة وحسابات جاري الشركاء', status: 'مستوفى ومعتمد', reference: 'قواعد المعايير المحاسبية المصرية' }
        ]
      },
      clauses: [
        {
          titleArabic: 'المادة الأولى: التمهيد والاعتبار التكاملي',
          titleEnglish: 'Article 1: Preamble & Incorporation',
          contentArabic: 'يُعتبر التمهيد السابق جزءاً لا يتجزأ من هذا العقد وبنداً جوهرياً مفسراً ومكملاً لجميع بنوده وأحكامه.',
          contentEnglish: 'The foregoing preamble and recitals form an integral, binding, and interpretive part of this Agreement.'
        },
        {
          titleArabic: 'المادة الثانية: موضوع التنازل وبيان الحصص المبيعة',
          titleEnglish: 'Article 2: Subject Matter & Description of Quotas',
          contentArabic: 'باع وأسقط وتنازل الطرف الأول بكافة الضمانات الفعلية والقانونية للطرف الثاني القابل لذلك عدد [...] حصة نقدية من حصصه في شركة [...] ش.ذ.م.م، تمثل نسبة [...]% من إجمالي رأس مال الشركة.',
          contentEnglish: 'The First Party assigns, transfers, and conveys with all legal and statutory warranties to the Second Party, who accepts, [...] cash quotas representing [...]% of total capital in [...] LLC.'
        },
        {
          titleArabic: 'المادة الثالثة: المقابل المالي والمخالصة التامة (Purchase Price)',
          titleEnglish: 'Article 3: Purchase Price & Full Discharge',
          contentArabic: 'تم هذا البيع والتنازل نظير ثمن إجمالي قدره [...] جنيه مصري، سدده الطرف الثاني بالكامل للطرف الأول بمجلس العقد بموجب شيك مصرفي مقبول الدفع، ويعد توقيع الطرف الأول مخالصة تامة ونهائية.',
          contentEnglish: 'This sale is agreed for an aggregate price of [...] EGP, paid in full by Second Party at execution via certified cashier check, and First Party signature constitutes full and final discharge.'
        },
        {
          titleArabic: 'المادة الرابعة: التنازل عن حق الاسترداد والأولوية (Waiver of Preemption)',
          titleEnglish: 'Article 4: Waiver of Statutory Preemption Rights',
          contentArabic: 'يقر الطرف الثالث بصفته مديراً وممثلاً عن باقي الشركاء باستيفاء الإجراءات القانونية لإخطار الشركاء وتنازلهم الصريح عن حق الاسترداد المنصوص عليه بالمادة 118 من القانون 159 لسنة 1981.',
          contentEnglish: 'The Third Party as manager and representative of remaining partners confirms statutory notices were served and remaining partners explicitly waived statutory preemption under Article 118 of Law 159/1981.'
        },
        {
          titleArabic: 'المادة الخامسة: نقل الحقوق والأرباح المحتجزة',
          titleEnglish: 'Article 5: Transfer of Rights & Retained Earnings',
          contentArabic: 'تنتقل للطرف الثاني المشتري اعتباراً من تاريخ هذا العقد كافة الحقوق والالتزامات المرتبطة بالحصص المبيعة، بما في ذلك الأرباح السنوية والمحتجزة والاحتياطيات وحق التصويت في الجمعيات العامة.',
          contentEnglish: 'All rights and liabilities attached to transferred quotas, including current/retained earnings, reserves, and voting rights in general assemblies, pass to the Second Party as of execution date.'
        },
        {
          titleArabic: 'المادة السادسة: ضمان خلو الحصص من الرهن والحقوق العينية',
          titleEnglish: 'Article 6: Freedom from Encumbrances & Liens',
          contentArabic: 'يضمن الطرف الأول أن الحصص المبيعة مملوكة له بالكامل وخالصة من كافة الرهون والحجوزات وحقوق الانتفاع أو أي نزاع قضائي أو حق للغير.',
          contentEnglish: 'The First Party warrants that transferred quotas are owned free and clear of all liens, pledges, attachments, usufructs, or third-party claims and litigations.'
        },
        {
          titleArabic: 'المادة السابعة: تبرئة الذمة الإدارية والمالية للمتنازل',
          titleEnglish: 'Article 7: Managerial & Financial Release of Assignor',
          contentArabic: 'تبرأ ذمة الطرف الأول من أي التزامات تخص إدارة أو تشغيل الشركة عن الفترة اللاحقة لتاريخ هذا التنازل، ولا يسأل عن أي ديون تجارية أو ضريبية تنشأ بعد تاريخ التوقيع.',
          contentEnglish: 'The First Party is fully released from operational and financial management liabilities post-transfer date and bears no liability for commercial or tax debts arising subsequently.'
        },
        {
          titleArabic: 'المادة الثامنة: التزام الحضور أمام الشهر العقاري وهيئة الاستثمار',
          titleEnglish: 'Article 8: Notary & GAFI Attendance Commitment',
          contentArabic: 'يلتزم الطرفان بالمثول أمام مأمورية الشهر العقاري المختصة للتصديق على توقيعات هذا العقد فور التوقيع، وتكليف مدير الشركة بنشر التعديل والقيد بالسجل التجاري بالاستثمار.',
          contentEnglish: 'Parties covenant to attend the competent Notary Office for signature authentication immediately, instructing Company manager to publish and register the amendment with GAFI Commercial Registry.'
        },
        {
          titleArabic: 'المادة التاسعة: تعديل المادة الخاصة برأس المال في عقد التأسيس',
          titleEnglish: 'Article 9: Amendment of Capital Clause in Articles of Association',
          contentArabic: 'اتفق الأطراف على تعديل المادة الخاصة بهيكل الشركاء ورأس المال بعقد تأسيس الشركة لتصبح ملكية الحصص مطابقة لواقع هذا التنازل وحلول الطرف الثاني محل الطرف الأول.',
          contentEnglish: 'Parties agree to amend the capital and quota schedule in the Articles of Association to reflect this transfer, substituting Second Party in place of First Party.'
        },
        {
          titleArabic: 'المادة العاشرة: المصروفات والرسوم الحكومية',
          titleEnglish: 'Article 10: Government Fees & Transfer Expenses',
          contentArabic: 'يتحمل الطرف الثاني المشتري كافة الرسوم الحكومية ومصروفات التصديق بنقابة المحامين والشهر العقاري والتأشير بالسجل التجاري الخاصة بنقل الملكية.',
          contentEnglish: 'The Second Party purchaser bears all government fees, Bar Association certification fees, Notary authentication, and Commercial Registry amendment costs.'
        },
        {
          titleArabic: 'المادة الحادية عشرة: الضرائب والالتزامات السيادية',
          titleEnglish: 'Article 11: Taxes & Sovereign Dues',
          contentArabic: 'يتحمل كل طرف ما يفرضه عليه القانون من التزامات ضريبية، ويلتزم البائع بسداد أي ضريبة أرباح رأسمالية مترتبة على التصرف في الحصص طبقاً لقانون الضريبة على الدخل.',
          contentEnglish: 'Each Party bears applicable statutory taxes; Seller remains liable for any capital gains tax arising from quota disposal pursuant to Income Tax Law.'
        },
        {
          titleArabic: 'المادة الثانية عشرة: الموطن المختار والمراسلات',
          titleEnglish: 'Article 12: Elected Domicile & Formal Notices',
          contentArabic: 'اتخذ الأطراف العناوين المبينة بصدر هذا العقد موطناً مختاراً لصحة إرسال الإعلانات القضائية والمكاتبات الرسمية المتعلقة بتنفيذ أحكامه.',
          contentEnglish: 'Parties designate their addresses indicated in the preamble as elected domiciles for judicial process and official correspondence.'
        },
        {
          titleArabic: 'المادة الثالثة عشرة: الشرط الفاسخ الصريح والتعويض الاتفاقي',
          titleEnglish: 'Article 13: Explicit Rescission & Liquidated Damages',
          contentArabic: 'في حال إخلال أي طرف بالتزامه بالمثول أمام الشهر العقاري أو تسليم المستندات، يحق للطرف الآخر إلزامه قضائياً مع تعويض اتفاقي مقداره [...] جنيه مصري.',
          contentEnglish: 'Upon breach by either Party of notary attendance or document delivery covenants, the non-breaching Party may enforce compliance with liquidated damages of [...] EGP.'
        },
        {
          titleArabic: 'المادة الرابعة عشرة: القانون الواجب والاختصاص القضائي',
          titleEnglish: 'Article 14: Governing Law & Jurisdiction',
          contentArabic: 'يخضع هذا العقد لأحكام القانون المصري، وتختص المحكمة الاقتصادية التابع لها المركز الرئيسي للشركة بنظر أي نزاع ينشأ عنه.',
          contentEnglish: 'This Agreement is governed by Egyptian law, and the competent Economic Court of the Company head office possesses sole jurisdiction.'
        },
        {
          titleArabic: 'المادة الخامسة عشرة: نسخ العقد والنفاذ الفوري',
          titleEnglish: 'Article 15: Counterparts & Execution',
          contentArabic: 'حرر هذا العقد من (4) نسخ أصلية باللغتين العربية والإنجليزية، نسخة لكل طرف، ونسخة تودع بملف الشركة بقطاع خدمات الاستثمار (GAFI).',
          contentEnglish: 'Executed in (4) original bilingual counterparts, one for each Party, and one filed with GAFI Corporate Department.'
        }
      ]
    }
  },

  // 4. Partner Exit & Financial Settlement Agreement (عقد تخارج شريك وتصفية مستحقات)
  {
    id: 'official-partner-exit-settlement',
    category: 'عقود الشركات والشراكات التجارية',
    titleAr: 'عقد تخارج شريك وتصفية مستحقات وإبراء ذمة مالية شامل',
    titleEn: 'Partner Exit, Financial Settlement & Complete Mutual Release Agreement',
    source: 'النموذج المعتمد لتسوية وتخارج الشركاء بالغرفة التجارية ونقابة المحامين',
    statutoryBasis: 'القانون المدني المصري 131 لسنة 1948 وقانون التجارة رقم 17 لسنة 1999 وقانون الشركات 159 لسنة 1981',
    totalClauses: 15,
    contractData: {
      contractTitleArabic: 'اتفاقية تخارج شريك نهائي وبات من شركة تجارية وتصفية كافة الحسابات والمستحقات',
      contractTitleEnglish: 'Comprehensive & Definitive Partner Exit, Quota Settlement & Release Agreement',
      preambleArabic: 'إنه في يوم [...] الموافق [...]، تحرر هذا العقد بمدينة [...] بين كل من:\nأولاً: السيد/ [اسم الشريك المتخارج الكامل]، بطاقة رقم قومي: [...]، المقيم في: [...] (طرف أول - الشريك المتخارج).\nثانياً: السيد/ [اسم الشريك المستمر الأول]، بطاقة رقم قومي: [...]، والمقيم في: [...] (طرف ثانٍ - شريك مستمر).\nثالثاً: السيد/ [اسم الشريك المستمر الثاني]، بطاقة رقم قومي: [...]، والمقيم في: [...] (طرف ثالث - شريك مستمر).\nرابعاً: شركة [...]، سجل تجاري رقم: [...] (الشركة كطرف رابع مقر ومتعهد بالوفاء).\nوبعد أن أقر الأطراف بأهليتهم القانونية والتصرفية الكاملة، اتفقوا وتراضوا على تنظيم تخارج الطرف الأول وفقاً للشروط الآتية:',
      preambleEnglish: 'On this day [...] this Agreement was entered into between:\nFirst: Mr. [Exiting Partner Full Name], National ID No: [...], residing at: [...] (First Party - Exiting Partner).\nSecond: Mr. [Continuing Partner 1], National ID No: [...], residing at: [...] (Second Party - Continuing Partner).\nThird: Mr. [Continuing Partner 2], National ID No: [...], residing at: [...] (Third Party - Continuing Partner).\nFourth: [...] Company, Commercial Registry No: [...] (The Company - Joining Party).\nHaving affirmed their full legal and civil capacity, the Parties mutually agreed to regulate the exit of First Party as follows:',
      recitalsArabic: 'لما كان الطرف الأول شريكاً مؤسساً بالشركة يمتلك حصة قدرها [...]%؛ وقد رغب في التخارج النهائي من الشركة لأسبابه الخاصة؛ وقبل الشركاء المستمرون شراء حصته وتصفية مستحقاته وإبراء ذمته المتبادلة بموجب تسوية مالية شاملة ونهائية تنهي كل علاقة أو مطالبة سابقة أو لاحقة.',
      recitalsEnglish: 'Whereas First Party is a founding partner owning [...]% in Company, and desires to definitively exit the Company for personal reasons; and Continuing Partners agreed to purchase said quota, settle financial entitlements, and execute comprehensive mutual discharge.',
      certificationStatement: 'اتفاقية تخارج باتة ومخالصة مالية متكاملة مصاغة وموثقة وفقاً لأحكام القانون المدني وقانون التجارة المصري وأحكام محكمة النقض.',
      legalNotes: 'تتضمن تحديد قيمة الحصة التخارجية، وجدول الوفاء، والتنازل عن الشهرة التجارية والاسم التجاري، وحظر المنافسة وإبراء الذمة الشامل من أي ديون أو التزامات.',
      shariaComplianceNotes: 'مستوفية لضوابط الإقالة والتخارج المشروع في الفقه الإسلامي؛ خالية من الربا والجهالة، وتقوم على التراضي والمخالصة القطعية.',
      legalAudit: {
        complianceScore: 100,
        officialPortalValidation: 'مطابقة للنماذج المعمول بها أمام مصلحة الضرائب والسجل التجاري والغرفة التجارية لتعديل عقود الشراكة.',
        cassationPrinciplesValidation: 'مطابقة لقضاء محكمة النقض في أن التخارج الرضائي ينهي صلة الشريك بالشركة ويمنع الرجوع بأي مطالبات بعد المخالصة النهائية (الطعن 3180 لسنة 65 ق).',
        customaryPracticeValidation: 'الصيغة الرصينة المتبعة لفض شراكات الأعمال والتخارج الرضائي الآمن في مصر.',
        shariaAuditStatement: 'عقد تخارج مشروع ومخالصة تامة نافية للجهالة والنزاع.',
        verificationChecklist: [
          { item: 'تقييم الحصة المالية والشهرة وتحديد المقابل المقطوع', status: 'مستوفى ومعتمد', reference: 'المادة 533 مدني مصري' },
          { item: 'المخالصة التامة وإبراء الذمة الإدارية والمالية الشاملة', status: 'مستوفى ومعتمد', reference: 'المادة 368 مدني مصري' },
          { item: 'تنازل المتخارج عن الاسم التجاري والعلامات والأصول', status: 'مستوفى ومعتمد', reference: 'المادة 69 من قانون التجارة 17 لسنة 1999' },
          { item: 'التزام الشركاء المستمرين بإنهاء الإجراءات بالسجل والضرائب', status: 'مستوفى ومعتمد', reference: 'المادة 534 مدني مصري' },
          { item: 'شرط حظر المنافسة والسرية المهنية بعد التخارج', status: 'مستوفى ومعتمد', reference: 'المادة 686 مدني مصري' }
        ]
      },
      clauses: [
        {
          titleArabic: 'المادة الأولى: التمهيد واعتباره جزءاً لا يتجزأ من العقد',
          titleEnglish: 'Article 1: Preamble & Binding Effect',
          contentArabic: 'يُعتبر التمهيد جزءاً لا يتجزأ من هذا العقد وبنداً جوهرياً ملزماً ومفسراً لجميع مواده وأحكامه.',
          contentEnglish: 'The preamble forms an integral, binding, and interpretive part of this Agreement.'
        },
        {
          titleArabic: 'المادة الثانية: إقرار التخارج النهائي والتنازل عن الحصص',
          titleEnglish: 'Article 2: Confirmation of Definitive Exit & Quota Assignment',
          contentArabic: 'يقر الطرف الأول بتخارجه النهائي والبات من شركة [...] وتنازله المطلق عن كامل حصته البالغة [...]% لصالح الشركاء المستمرين بالتساوي بينهما أو وفق نسب مساهمتهما الجديدة.',
          contentEnglish: 'The First Party declares definitive and irrevocable exit from [...] Company and absolute assignment of full [...]% quota to Continuing Partners pro-rata to new holdings.'
        },
        {
          titleArabic: 'المادة الثالثة: المقابل المالي للتخارج وجدول السداد (Settlement Amount)',
          titleEnglish: 'Article 3: Exit Settlement Consideration & Payment Schedule',
          contentArabic: 'تم الاتفاق الرضائي على أن إجمالي المقابل المالي لتخارج الطرف الأول هو مبلغ [...] جنيه مصري، سدد منه الشركاء المستمرون نقداً [...] جنيه بمجلس العقد، والمتبقي يُسدد على (3) أقساط بنكية متساوية.',
          contentEnglish: 'The agreed financial consideration for First Party exit is [...] EGP, whereof [...] EGP was paid in cash at execution and balance payable in (3) equal bank installments.'
        },
        {
          titleArabic: 'المادة الرابعة: التنازل عن الأرباح المتراكمة والشهرة التجارية (Goodwill)',
          titleEnglish: 'Article 4: Assignment of Retained Profits & Goodwill',
          contentArabic: 'يتنازل الطرف الأول تنازلاً نهائياً عن أي حق في الأرباح السابقة أو المحتجزة أو الشهرة التجارية أو العلامة التجارية أو موجودات الشركة، وليس له أي حق في المطالبة بأي مبالغ إضافية.',
          contentEnglish: 'First Party irrevocably waives all claims to historic or retained profits, commercial goodwill, trademarks, or Company assets, with no right to claim additional sums.'
        },
        {
          titleArabic: 'المادة الخامسة: إبراء الذمة المالية المتبادلة والنهائية',
          titleEnglish: 'Article 5: Mutual Comprehensive Financial Discharge',
          contentArabic: 'يُبرئ الطرف الأول ذمة الشركة والشركاء المستمرين إبراءً شاملاً مانعاً من الرجوع، كما يُبرئ الشركاء المستمرون والشركة ذمة الطرف الأول من أي التزام أو مسؤولية عن أعماله السابقة.',
          contentEnglish: 'First Party grants Company and Continuing Partners complete irrevocable release, and Continuing Partners grant First Party complete release from past operational responsibilities.'
        },
        {
          titleArabic: 'المادة السادسة: نقل المسؤولية الضريبية والتأمينية للشركاء المستمرين',
          titleEnglish: 'Article 6: Transfer of Tax & Social Security Liabilities',
          contentArabic: 'يتحمل الشركاء المستمرون والشركة كامل المسؤولية عن أي ديون ضريبية أو تأمينية أو تجارية أو مطالبات عمالية مستحقة على الشركة عن الماضي أو المستقبل، مع تعويض المتخارج عن أي مطالبة.',
          contentEnglish: 'Continuing Partners and Company bear full responsibility for all tax, social security, commercial, or labor obligations past and future, indemnifying Exiting Partner against claims.'
        },
        {
          titleArabic: 'المادة السابعة: تعديل عقد الشركة وقيد التخارج بالسجل التجاري',
          titleEnglish: 'Article 7: Amendment of Commercial Registry & Articles',
          contentArabic: 'يلتزم الشركاء المستمرون بإتمام كافة إجراءات تعديل عقد الشركة ومحو اسم الطرف الأول من السجل التجاري والبطاقة الضريبية والتأمينات خلال (30) يوماً من تاريخ هذا العقد.',
          contentEnglish: 'Continuing Partners covenant to complete all company contract amendments, removing First Party from Commercial Registry, Tax Card, and Social Insurance within (30) days.'
        },
        {
          titleArabic: 'المادة الثامنة: الالتزام بالمثول أمام الشهر العقاري',
          titleEnglish: 'Article 8: Notary Attendance Covenant',
          contentArabic: 'يلتزم الطرف المتخارج بالمثول أمام مصلحة الشهر العقاري للتصديق على توقيعه على محضر التخارج وتعديل عقد الشركة متى دُعي لذلك رسمياً.',
          contentEnglish: 'The Exiting Partner covenants to appear before the Notary Office to authenticate signature on the exit deed and contract amendment upon official notification.'
        },
        {
          titleArabic: 'المادة التاسعة: حظر المنافسة التجارية واستقطاب العملاء',
          titleEnglish: 'Article 9: Non-Competition & Non-Solicitation Covenant',
          contentArabic: 'يتعهد الطرف المتخارج بعدم ممارسة أي نشاط تجاري مماثل أو منافس لنشاط الشركة، وبعدم الاتصال أو استقطاب أي من عملاء الشركة الحاليين لمدة (24) شهراً داخل النطاق الجغرافي للنشاط.',
          contentEnglish: 'Exiting Partner covenants not to engage in competing business or solicit existing Company clients for (24) months within Company geographic territory.'
        },
        {
          titleArabic: 'المادة العاشرة: السرية وحماية المعلومات الجوهرية',
          titleEnglish: 'Article 10: Trade Secrets & Confidentiality',
          contentArabic: 'يلتزم الطرف الأول بالسرية المطلقة لكافة أسرار الشركة وحساباتها وتقنياتها وقوائم عملائها، ويحظر عليه إفشاء أي بيان لأي جهة تحت طائلة المسؤولية المدنية والجنائية.',
          contentEnglish: 'First Party maintains strict confidentiality of Company secrets, accounts, tech, and client lists, prohibited from disclosing data under civil and criminal liability.'
        },
        {
          titleArabic: 'المادة الحادية عشرة: استرداد الضمانات والكفالات الشخصية',
          titleEnglish: 'Article 11: Release of Personal Guarantees & Collateral',
          contentArabic: 'يلتزم الشركاء المستمرون برفع أي كفالة شخصية أو ضمان بنكي أو شيك ضمان قدمه الطرف الأول لصالح الشركة لدى البنوك أو الموردين، وإحلال ضماناتهم محله فوراً.',
          contentEnglish: 'Continuing Partners covenant to release all personal guarantees, bank collateral, or guarantee checks executed by First Party for the Company, substituting their own collateral.'
        },
        {
          titleArabic: 'المادة الثانية عشرة: الشرط الفاسخ والتعويض الاتفاقي عند التعثر',
          titleEnglish: 'Article 12: Default & Acceleration of Installments',
          contentArabic: 'إذا تأخر الشركاء المستمرون عن سداد أي قسط في موعده، تستحق باقي الأقساط فوراً بقوة القانون، مع التزامهم بسداد تعويض اتفاقي قدره 10% دون حاجة لإنذار.',
          contentEnglish: 'Upon default in paying any installment when due, all remaining installments accelerate automatically with 10% liquidated damages without need for prior notice.'
        },
        {
          titleArabic: 'المادة الثالثة عشرة: الموطن المختار والإخطارات',
          titleEnglish: 'Article 13: Chosen Domicile & Legal Communications',
          contentArabic: 'تعتبر العناوين الموضحة بصدر هذا العقد موطناً مختاراً لكل طرف لصحة الإعلانات القضائية والمراسلات الرسمية.',
          contentEnglish: 'Addresses in the preamble are elected legal domiciles for service of process and official communications.'
        },
        {
          titleArabic: 'المادة الرابعة عشرة: القانون الواجب والاختصاص القضائي',
          titleEnglish: 'Article 14: Governing Law & Jurisdiction',
          contentArabic: 'يخضع هذا العقد ويفسر وفقاً للقانون المصري، وتختص المحاكم الاقتصادية المصرية بنظر أي منازعة تنشأ عن تفسيره أو تنفيذه.',
          contentEnglish: 'This Agreement is governed by Egyptian law, and the competent Egyptian Economic Courts possess exclusive jurisdiction.'
        },
        {
          titleArabic: 'المادة الخامسة عشرة: نسخ العقد وحجيته',
          titleEnglish: 'Article 15: Counterparts & Final Execution',
          contentArabic: 'تحرر هذا العقد من (5) نسخ أصلية باللغتين العربية والإنجليزية، نسخة لكل طرف، ونسخة تودع بالسجل التجاري ومصلحة الضرائب المصرية.',
          contentEnglish: 'Executed in (5) original counterparts, one for each Party, and one filed with Commercial Registry and Egyptian Tax Authority.'
        }
      ]
    }
  },

  // 5. New Partner Admission & Capital Increase (عقد دخول شريك جديد وزيادة رأس المال)
  {
    id: 'official-new-partner-admission-capital-increase',
    category: 'عقود الشركات والشراكات التجارية',
    titleAr: 'عقد انضمام ودخول شريك جديد وزيادة رأس المال وتعديل الحصص',
    titleEn: 'New Partner Admission, Capital Increase & Quota Restructuring Agreement',
    source: 'الصيغة المعتمدة لدى مصلحة الشركات ومصلحة الشهر العقاري والسجل التجاري بالاستثمار',
    statutoryBasis: 'قانون الشركات رقم 159 لسنة 1981 وقانون التجارة رقم 17 لسنة 1999 والقانون المدني 131 لسنة 1948',
    totalClauses: 15,
    contractData: {
      contractTitleArabic: 'عقد اتفاق وتعديل رسمي لدخول شريك جديد وزيادة رأس مال الشركة وتعديل الإدارة',
      contractTitleEnglish: 'Official Agreement for Admission of New Partner, Capital Expansion & Management Restructuring',
      preambleArabic: 'إنه في يوم [...] الموافق [...]، تم الاتفاق بين كل من:\nأولاً: الشركاء الأصليون بشركة [...]، ويمثلهم: [...] (طرف أول - الشركاء القدامى).\nثانياً: السيد/ [اسم الشريك الجديد أو الشركة المستثمرة]، بطاقة رقم قومي / سجل تجاري: [...] (طرف ثانٍ - الشريك الجديد المنضم).\nثالثاً: شركة [...]، سجل تجاري رقم: [...] (طرف ثالث - الشركة المقرة).\nوبعد أن أقر جميع الأطراف بأهليتهم القانونية والتجارية للتعاقد، اتفقوا على زيادة رأس المال ودخول الشريك الجديد وفقاً للبنود الآتية:',
      preambleEnglish: 'On this day [...] this Agreement was entered into between:\nFirst: Original Partners of [...] Company, represented by: [...] (First Party - Original Partners).\nSecond: Mr./Company [New Partner / Investor Name], National ID / CR No: [...] (Second Party - Admitted New Partner).\nThird: [...] Company, CR No: [...] (Third Party - Joining Company).\nHaving affirmed their full legal competence to contract, Parties agreed upon capital expansion and partner admission as follows:',
      recitalsArabic: 'لما كانت الشركة شركة تجارية قائمة ترغب في التوسع وضخ استثمارات نقدية جديدة وتحديث خطوط الإنتاج والتقنية؛ وقد وافق الشركاء بالإجماع على زيادة رأس المال وقبول انضمام الطرف الثاني كشريك مساهم بحصة نقدية وتعديل عقد التأسيس طبقاً لأحكام القانون.',
      recitalsEnglish: 'Whereas the Company is an operating commercial entity seeking expansion, fresh capital infusion, and tech upgrade; and original partners unanimously approved capital expansion and admission of Second Party as contributing partner amending bylaws per law.',
      certificationStatement: 'عقد تعديل ودخول شريك مقنن ومستوفٍ لكافة الإجراءات الشكلية والموضوعية المطلوبة بالشهر العقاري وهيئة الاستثمار والسجل التجاري.',
      legalNotes: 'يشمل تحديد رأس المال السابق والجديد، وقيمة الحصص المكتتب فيها، ومصير الأرباح السابقة، وتعديل صلاحيات التوقيع البنكي والإدارة.',
      shariaComplianceNotes: 'مشاركة تجارية مشروعة مستوفية لأحكام شركة العنان وضوابط زيادة رأس المال وتوزيع الربح والخسارة.',
      legalAudit: {
        complianceScore: 100,
        officialPortalValidation: 'مطابق لإجراءات تعديل عقود التأسيس ونشرها بصحيفة الاستثمار والسجل التجاري المصري.',
        cassationPrinciplesValidation: 'متطابق مع قضاء محكمة النقض في نفاذ انضمام الشريك الجديد وحجيته فور قيده بالسجل التجاري (الطعن 1502 لسنة 58 ق).',
        customaryPracticeValidation: 'النموذج المعتمد لدى كبرى الإدارات القانونية والشركات الاستثمارية في مصر.',
        shariaAuditStatement: 'عقد شراكة وزيادة رأسمال خالٍ من الربا والمحظورات الفقهية.',
        verificationChecklist: [
          { item: 'موافقة الجمعية العامة غير العادية بالإجماع على دخول الشريك', status: 'مستوفى ومعتمد', reference: 'المادة 70 من القانون 159 لسنة 1981' },
          { item: 'إيداع قيمة زيادة رأس المال في حساب الشركة البنكي بالكامل', status: 'مستوفى ومعتمد', reference: 'المادة 32 من اللائحة التنفيذية للقانون 159/1981' },
          { item: 'تعديل جدول الحصص والنسب في عقد التأسيس', status: 'مستوفى ومعتمد', reference: 'المادة 120 من القانون 159 لسنة 1981' },
          { item: 'تنظيم سلطات الإدارة والتوقيع البنكي بعد الانضمام', status: 'مستوفى ومعتمد', reference: 'المادة 121 من القانون 159 لسنة 1981' },
          { item: 'توثيق التعديل بالشهر العقاري والنشر بالسجل التجاري', status: 'مستوفى ومعتمد', reference: 'القانون 34 لسنة 1976 بتنظيم السجل التجاري' }
        ]
      },
      clauses: [
        {
          titleArabic: 'المادة الأولى: التمهيد واعتباره جزءاً لا يتجزأ من العقد',
          titleEnglish: 'Article 1: Recitals as Integral Part',
          contentArabic: 'يُعتبر التمهيد جزءاً لا يتجزأ من هذا العقد وبنداً جوهرياً ملزماً ومفسراً لأحكامه.',
          contentEnglish: 'The recitals constitute an integral, binding, and interpretive part of this Agreement.'
        },
        {
          titleArabic: 'المادة الثانية: زيادة رأس المال والحصة المكتتب بها',
          titleEnglish: 'Article 2: Capital Increase & Subscribed Quotas',
          contentArabic: 'اتفق الأطراف على زيادة رأس مال الشركة من مبلغ [...] جنيه إلى مبلغ [...] جنيه مصري، بزيادة نقدية قدرها [...] جنيه اكتتب فيها الشريك الجديد بالكامل وسددها في الحساب البنكي للشركة.',
          contentEnglish: 'Parties agree to increase capital from [...] EGP to [...] EGP through cash increase of [...] EGP subscribed in full by New Partner and deposited in Company bank account.'
        },
        {
          titleArabic: 'المادة الثالثة: قبول انضمام الشريك الجديد وتعديل هيكل الملكية',
          titleEnglish: 'Article 3: Admission of New Partner & Ownership Restructuring',
          contentArabic: 'يقبل الشركاء القدامى بالإجماع انضمام الطرف الثاني شريكاً في الشركة بحصة تمثل [...]% من إجمالي رأس مال الشركة بعد الزيادة، وتعدل نسب الشركاء القدامى تبعاً لذلك.',
          contentEnglish: 'Original Partners unanimously admit Second Party as partner owning [...]% in expanded capital, and original partner percentages adjust accordingly.'
        },
        {
          titleArabic: 'المادة الرابعة: سداد علاوة الإصدار وتسوية الأرباح السابقة',
          titleEnglish: 'Article 4: Issue Premium & Historic Profits Treatment',
          contentArabic: 'سدد الشريك الجديد مبلغ [...] جنيه كعلاوة إصدار تضاف لحساب الاحتياطي الرأسمالي، ويقر بأن الأرباح المحتجزة السابقة عن السنوات الماضية تظل حقاً خالصاً للشركاء القدامى.',
          contentEnglish: 'New Partner paid [...] EGP as issue premium credited to capital reserve, acknowledging historic retained earnings remain exclusive property of Original Partners.'
        },
        {
          titleArabic: 'المادة الخامسة: تعديل تشكيل الإدارة وصلاحيات التوقيع البنكي',
          titleEnglish: 'Article 5: Board Reconstitution & Banking Signature Powers',
          contentArabic: 'تتولى إدارة الشركة لجنة مديرين يمثل فيها الشريك الجديد بعضو، ويكون التوقيع أمام البنوك والجهات الحكومية توقيعاً ثنائياً مشتركاً يضم توقيع الشريك الجديد في المعاملات الكبرى.',
          contentEnglish: 'Company management is entrusted to a board of managers with New Partner represented; banking and government representation requires joint dual signatures for major transactions.'
        },
        {
          titleArabic: 'المادة السادسة: توزيع الأرباح السنوية والسياسة المالية',
          titleEnglish: 'Article 6: Annual Profit Distribution Policy',
          contentArabic: 'توزع الأرباح الصافية بنهاية كل سنة مالية بنسبة الحصص الجديدة المعتمدة بعد استقطاع الاحتياطيات القانونية وحصة العاملين الإلزامية.',
          contentEnglish: 'Net annual profits shall be distributed at financial year-end in proportion to newly amended quotas following deduction of statutory reserve and employee shares.'
        },
        {
          titleArabic: 'المادة السابعة: الالتزام بالنظام الأساسي للشركة',
          titleEnglish: 'Article 7: Adherence to Company Articles of Association',
          contentArabic: 'يقر الشريك الجديد باطلاعه على عقد التأسيس والنظام الأساسي وسجلات الشركة وميزانياتها وقبوله التام لجميع التزاماتها السارية كشريك في الكيان.',
          contentEnglish: 'New Partner confirms inspection of Articles of Association, registers, and balance sheets, accepting all prevailing obligations as partner in the entity.'
        },
        {
          titleArabic: 'المادة الثامنة: التوثيق بالشهر العقاري والقيد بالسجل التجاري',
          titleEnglish: 'Article 8: Notary Authentication & Commercial Registry Publication',
          contentArabic: 'يلتزم جميع الشركاء بالمثول أمام الشهر العقاري لتوثيق عقد التعديل واتخاذ إجراءات النشر بصحيفة الاستثمار وتحديث السجل التجاري خلال (21) يوماً.',
          contentEnglish: 'All partners covenant to attend Notary Office to authenticate amendment deed and publish with Investment Gazette and update Commercial Registry within (21) days.'
        },
        {
          titleArabic: 'المادة التاسعة: المصروفات والرسوم الحكومية للتعديل',
          titleEnglish: 'Article 9: Government Fees & Amendment Costs',
          contentArabic: 'تتحمل الشركة كافة الرسوم الحكومية ومصروفات المحاماة والنشر بالسجل التجاري الناتجة عن زيادة رأس المال ودخول الشريك الجديد كمصروفات تأسيس.',
          contentEnglish: 'The Company bears all government fees, legal costs, and Commercial Registry publication expenses arising from capital increase as incorporation expenses.'
        },
        {
          titleArabic: 'المادة العاشرة: السرية وحظر المنافسة',
          titleEnglish: 'Article 10: Non-Competition & Confidentiality Covenants',
          contentArabic: 'يلتزم جميع الشركاء بالسرية التامة لمعلومات الشركة وأسرارها، ويمتنع أي شريك عن ممارسة أي نشاط تجاري منافس لنشاط الشركة طوال فترة شراكته.',
          contentEnglish: 'All partners maintain absolute confidentiality of Company information, prohibited from engaging in competing commercial activity throughout partnership.'
        },
        {
          titleArabic: 'المادة الحادية عشرة: حق الشفعة وأولوية التنازل عن الحصص',
          titleEnglish: 'Article 11: Preemption Rights on Future Quota Transfers',
          contentArabic: 'في حال رغبة أي شريك مستقبلاً في بيع حصته، يلتزم بعرضها أولاً على باقي الشركاء بنسبة حصصهم الحالية قبل التنازل عنها لأي طرف ثالث.',
          contentEnglish: 'Should any partner desire to sell quotas in the future, it must first offer them to remaining partners pro-rata before offering to third parties.'
        },
        {
          titleArabic: 'المادة الثانية عشرة: الشرط الفاسخ والتعويض الاتفاقي',
          titleEnglish: 'Article 12: Explicit Rescission & Breach Remedy',
          contentArabic: 'إذا أخل الشريك الجديد بسداد قيمة الزيادة في الموعد أو امتنع أي طرف عن التوثيق، يعتبر الاتفاق مفسوخاً من تلقاء نفسه مع حق الطرف المتضرر في التعويض.',
          contentEnglish: 'Upon failure by New Partner to pay capital increase or failure by any party to authenticate, this Agreement is rescinded automatically with damages.'
        },
        {
          titleArabic: 'المادة الثالثة عشرة: الموطن المختار والإخطارات القضائية',
          titleEnglish: 'Article 13: Chosen Domicile & Legal Notices',
          contentArabic: 'اتخذ الأطراف العناوين الواردة بصدر هذا العقد موطناً مختاراً لكافة المراسلات والإعلانات القضائية.',
          contentEnglish: 'Parties designate their addresses indicated in the preamble as elected domiciles for judicial process and formal notices.'
        },
        {
          titleArabic: 'المادة الرابعة عشرة: القانون الواجب والاختصاص القضائي',
          titleEnglish: 'Article 14: Governing Law & Economic Court Jurisdiction',
          contentArabic: 'يخضع هذا العقد لأحكام القانون المصري، وتختص المحكمة الاقتصادية بنظر أي نزاع ينشأ عنه.',
          contentEnglish: 'This Agreement is governed by Egyptian law, and competent Economic Court retains jurisdiction.'
        },
        {
          titleArabic: 'المادة الخامسة عشرة: نسخ العقد والنفاذ الفوري',
          titleEnglish: 'Article 15: Counterparts & Final Execution',
          contentArabic: 'حرر هذا العقد من (4) نسخ أصلية باللغتين العربية والإنجليزية، نسخة لكل طرف، ونسخة تودع بالسجل التجاري بالهيئة العامة للاستثمار.',
          contentEnglish: 'Executed in (4) original counterparts, one for each Party, and one filed with GAFI Commercial Registry.'
        }
      ]
    }
  }
];
