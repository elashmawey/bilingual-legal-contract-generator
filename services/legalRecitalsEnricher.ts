import type { OfficialEncyclopediaContract } from '../types';

/**
 * Universal Egyptian Legal Recitals Synthesizer & Validator
 * Ensures that EVERY contract in the encyclopedia contains an authentic,
 * comprehensive, multi-paragraph contractual preamble & recitals (التمهيد التعاقدي المشترك وحيثيات التعاقد)
 * conforming to Egyptian statutory standards, Court of Cassation precedents, and notarial templates.
 */

export const STANDARDIZED_ARTICLE_1 = {
  titleArabic: 'المادة الأولى: حجية التمهيد واعتباره جزءاً لا يتجزأ من العقد',
  titleEnglish: 'Article 1: Binding Recitals as an Integral Part of the Contract',
  contentArabic:
    'يُعتبر التمهيد السابق جزءاً لا يتجزأ من هذا العقد وبنداً جوهرياً ومكملاً ومفسراً لكافة أحكامه وشروطه ومواده، وتسري عليه ذات القوة القانونية والتنفيذية الملزمة المقررة لسائر بنود هذا العقد ومواده وملاحقه، ولا ينفصل عنها بحال من الأحوال.',
  contentEnglish:
    'The foregoing recitals constitute an integral, operative, and inseverable part of this Agreement, having the same binding legal force and executive effect as the substantive articles and operational schedules herein.'
};

export function ensureStandardClauses(clauses: any[]): any[] {
  if (!clauses || clauses.length === 0) return [STANDARDIZED_ARTICLE_1];

  const first = clauses[0];
  const isFirstPreamble =
    (first.titleArabic || '').includes('تمهيد') ||
    (first.titleArabic || '').includes('جزءاً لا يتجزأ');

  if (isFirstPreamble) {
    return [
      STANDARDIZED_ARTICLE_1,
      ...clauses.slice(1)
    ];
  }

  // Prepend standardized Article 1 and cleanly renumber remaining clauses
  const arabicOrdinalMap: { [key: number]: string } = {
    2: 'الثانية',
    3: 'الثالثة',
    4: 'الرابعة',
    5: 'الخامسة',
    6: 'السادسة',
    7: 'السابعة',
    8: 'الثامنة',
    9: 'التاسعة',
    10: 'العاشرة',
    11: 'الحادية عشرة',
    12: 'الثانية عشرة',
    13: 'الثالثة عشرة',
    14: 'الرابعة عشرة',
    15: 'الخامسة عشرة',
    16: 'السادسة عشرة',
    17: 'السابعة عشرة',
    18: 'الثامنة عشرة',
    19: 'التاسعة عشرة',
    20: 'العشرون',
    21: 'الحادية والعشرون',
    22: 'الثانية والعشرون',
    23: 'الثالثة والعشرون',
    24: 'الرابعة والعشرون',
    25: 'الخامسة والعشرون',
    26: 'السادسة والعشرون',
    27: 'السابعة والعشرون',
    28: 'الثامنة والعشرون',
    29: 'التاسعة والعشرون',
    30: 'الثلاثون'
  };

  const renumberedRest = clauses.map((c, idx) => {
    const newNum = idx + 2;
    const ordAr = arabicOrdinalMap[newNum] || String(newNum);
    const rawTitleAr = (c.titleArabic || '').replace(/^المادة\s+(الأولى|الثانية|الثالثة|الرابعة|الخامسة|السادسة|السابعة|الثامنة|التاسعة|العاشرة|الحادية عشرة|الثانية عشرة|الثالثة عشرة|الرابعة عشرة|الخامسة عشرة|السادسة عشرة|السابعة عشرة|الثامنة عشرة|التاسعة عشرة|العشرون|[0-9]+)\s*:\s*/, '');
    const rawTitleEn = (c.titleEnglish || '').replace(/^Article\s+[0-9]+:\s*/i, '');

    return {
      ...c,
      titleArabic: `المادة ${ordAr}: ${rawTitleAr}`,
      titleEnglish: `Article ${newNum}: ${rawTitleEn}`
    };
  });

  return [STANDARDIZED_ARTICLE_1, ...renumberedRest];
}

export function enrichContractRecitals(contract: OfficialEncyclopediaContract): OfficialEncyclopediaContract {
  const cd = contract.contractData;
  const currentAr = (cd.recitalsArabic || '').trim();

  // Standardize clauses so Article 1 is ALWAYS the integral recitals clause
  const standardizedClauses = ensureStandardClauses(cd.clauses || []);

  const titleAr = contract.titleAr || cd.contractTitleArabic || '';
  const titleEn = contract.titleEn || cd.contractTitleEnglish || '';
  const cat = contract.category || '';
  const law = contract.statutoryBasis || 'القانون المدني المصري وقانون التجارة رقم 17 لسنة 1999';

  // If contract already has a rich recitals (> 130 chars and contains 'لما كان' or 'حيث إن' or numbered clauses), keep it
  const isAlreadyRich =
    currentAr.length >= 130 &&
    (currentAr.includes('لما كان') || currentAr.includes('حيث إن') || currentAr.includes('1.')) &&
    !currentAr.startsWith('يُعتبر هذا التمهيد جزءاً لا يتجزأ من هذا العقد وبنداً مفسراً');

  let rAr = currentAr;
  let rEn = (cd.recitalsEnglish || '').trim();

  if (!isAlreadyRich) {

  // 1. NDA & Confidentiality (Check first before generic categories)
  if (
    titleAr.includes('سرية') ||
    titleAr.includes('إفصاح') ||
    titleAr.includes('NDA') ||
    titleEn.toLowerCase().includes('nda') ||
    titleEn.toLowerCase().includes('confidential')
  ) {
    rAr = `التمهيد التعاقدي لسرية المعلومات وحماية البيانات والملكية الفكرية:
1. لما كان الطرفان بصدد التباحث والدخول في مفاوضات تجارية وشراكة استراتيجية بخصوص: "${titleAr}"، مما يستلزم بالضرورة تبادل معلومات تجارية ومالية وتقنية فائقة السرية تُمثل أسراراً مهنية مملوكة لأحد الطرفين أو كليهما؛
2. ولما كان كل طرف حريصاً على حماية حقوق ملكيته الفكرية وأسراره التجارية وقواعد بيانات عملائه من أي إفشاء أو تداول غير مصرح به؛
3. ولما تعهد الطرف المتلقي بالحفاظ التام على سرية المعلومات المستلمة واستخدامها حصرياً في الغرض المتفق عليه في ضوء ${law}؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للطرفين بكامل أهليتهما القانونية والشرعية، فقد اتفقا وتراضيا على المواد الآتية:`;
    rEn = `NON-DISCLOSURE & CONFIDENTIALITY MUTUAL RECITALS:
1. WHEREAS, the Parties are engaging in strategic commercial discussions regarding: "${titleEn}", requiring reciprocal disclosure of highly confidential business and technical information;
2. WHEREAS, each Party strictly protects its trade secrets, IP assets, and customer databases against unauthorized disclosure;
3. WHEREAS, the Receiving Party covenants to preserve absolute confidentiality and use disclosed data exclusively for agreed objectives pursuant to ${law};
4. NOW, THEREFORE, the Parties, having affirmed their full legal capacity, covenant and agree as follows:`;
  }
  // 2. GAFI & Corporate Formation
  else if (
    cat.includes('GAFI') ||
    cat.includes('تأسيس') ||
    titleAr.includes('تأسيس') ||
    titleAr.includes('نظام أساسي') ||
    titleAr.includes('شركة مساهمة') ||
    titleAr.includes('ذات مسؤولية محدودة') ||
    titleAr.includes('الشخص الواحد')
  ) {
    rAr = `التمهيد التعاقدي والتأسيسي وحيثيات الاتفاق:
1. لما كان أطراف هذا العقد (المؤسسون/الشركاء) يرغبون في توظيف واستثمار أموالهم في مشروع اقتصادي مشترك داخل جمهورية مصر العربية بعنوان: "${titleAr}"، والاستفادة من الضمانات والحوافز الاستثمارية الممنوحة بموجب ${law}؛
2. ولما كانت غاية التعاقد هي ممارسة الأنشطة التجارية والصناعية والتنموية المقررة، بعد استيفاء الموافقات والتراخيص الإدارية والأمنية المقررة نظاماً من الهيئة العامة للاستثمار والمناطق الحرة (GAFI) والجهات المختصة؛
3. ولما اتفق الأطراف بالإجماع على رأس مال الشركة وتوزيعه ونظام الإدارة وتوزيع الأرباح والخسائر والالتزام التام بنصوص هذا النظام الأساسي؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للشركاء المؤسسين بكامل أهليتهم القانونية والشرعية، فقد اتفقوا وتراضوا على المواد الآتية:`;
    rEn = `FOUNDATIONAL & STATUTORY RECITALS:
1. WHEREAS, the Founding Parties desire to pool capital and establish a corporate entity in the Arab Republic of Egypt regarding: "${titleEn}", benefiting from statutory investment incentives under ${law};
2. WHEREAS, the corporate purpose encompasses lawful commercial and industrial activities subject to regulatory approvals from GAFI and competent ministries;
3. WHEREAS, the Parties have unanimously agreed upon equity distributions, board management, profit and loss allocations, and statutory governance;
4. NOW, THEREFORE, the Founding Parties, having affirmed their full legal capacity, covenant and agree as follows:`;
  }
  // 3. Commercial Supply & Distribution (Check before generic sale to catch "توريد وبيع بضائع")
  else if (
    titleAr.includes('توريد') ||
    titleAr.includes('توزيع') ||
    titleAr.includes('وكالة تجارية') ||
    titleAr.includes('امتياز تجاري') ||
    titleAr.includes('فرانشايز') ||
    titleAr.includes('تخصيم') ||
    cat.includes('توريد') ||
    cat.includes('معاملات تجارية')
  ) {
    rAr = `التمهيد التعاقدي التجاري والتوريدي وحيثيات التعامل:
1. لما كان الطرف الأول يعمل في مجال الأنشطة التجارية/الصناعية وبحاجة مستمرة وموثوقة إلى: "${titleAr}"؛
2. ولما كان الطرف الثاني مورداً/موزعاً معتمداً مقيداً بالسجل التجاري ولديه القدرات التوريدية واللوجستية وشبكة التوزيع والفواتير الإلكترونية المعتمدة بمنظومة مصلحة الضرائب المصرية؛
3. ولما تلاقت إرادة الطرفين على تحديد المواصفات القياسية والأسعار ومواعيد التسليم والضمانات بموجب ${law}؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للطرفين بكامل أهليتهما التجارية والتعاقدية، فقد اتفقا وتراضيا على المواد الآتية:`;
    rEn = `COMMERCIAL SUPPLY & DISTRIBUTION RECITALS:
1. WHEREAS, the First Party requires reliable periodic commercial procurement and fulfillment regarding: "${titleEn}";
2. WHEREAS, the Second Party is an authorized commercial supplier possessing distribution logistics and certified Egyptian e-invoicing compliance;
3. WHEREAS, the Parties reached consensus upon prices, specifications, delivery schedules, and warranties under ${law};
4. NOW, THEREFORE, the Parties, having affirmed their commercial legal competence, covenant and agree as follows:`;
  }
  // 4. Lease & Usufruct (Check before generic real estate sale)
  else if (
    titleAr.includes('إيجار') ||
    titleAr.includes('استئجار') ||
    cat.includes('إيجار') ||
    cat.includes('انتفاع')
  ) {
    rAr = `التمهيد التعاقدي المشترك وعلاقة الإيجار والانتفاع:
1. لما كان الطرف الأول (المؤجر) هو المالك والحائز القانوني وصاحب الحق في تأجير وتمكين الانتفاع بالعين محل هذا التعاقد (${titleAr})، وخلوها من أي موانع قانونية أو نزاع قضائي يعوق انتفاع المستأجر الهادئ بها؛
2. ولما كان الطرف الثاني (المستأجر) يرغب في استئجار العين المذكورة لاستعمالها في الغرض المخصص والمشروع، وقام بمعاينتها المعاينة التامة النافية للجهالة شرعاً وقانوناً، وتعهد بالالتزام بسداد الأجرة الشهرية في مواعيدها وصيانة العين؛
3. ولما تلاقت إرادة الطرفين الصريحة على إبرام هذه الإجارة خاضعة بصورة حاسمة لأحكام ${law}، مع أحقية المؤجر في تذييل العقد بالصيغة التنفيذية؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للطرفين بكامل أهليتهما القانونية والشرعية، فقد اتفقا وتراضيا على الشروط والمواد الآتية:`;
    rEn = `LEASE & USUFRUCT MUTUAL RECITALS:
1. WHEREAS, the First Party (Lessor) holds full lawful ownership and tenure to lease the premises under: "${titleEn}", free from judicial encumbrances impeding quiet enjoyment;
2. WHEREAS, the Second Party (Lessee) desires to lease the premises for designated lawful occupancy, having inspected the property and undertaking timely rental payments and maintenance;
3. WHEREAS, mutual consent is attained subjecting this Lease definitively to ${law}, entitling executive notarial certification;
4. NOW, THEREFORE, the Parties, having affirmed their full legal capacity, covenant and agree as follows:`;
  }
  // 5. Employment & Professional Services
  else if (
    titleAr.includes('عقد عمل') ||
    titleAr.includes('موارد بشرية') ||
    titleAr.includes('توظيف') ||
    titleAr.includes('موظف') ||
    titleAr.includes('مستقل') ||
    cat.includes('عقود العمل') ||
    (cat.includes('عمل') && !cat.includes('معاملات') && !cat.includes('أعمال'))
  ) {
    rAr = `التمهيد التعاقدي العمالي والمهني وحيثيات التوظيف:
1. لما كان الطرف الأول منشأة مصرية قائمة ومرخصة قانوناً، وترغب في الاستعانة بالكوادر المهنية المتخصصة لشغل المهام الوظيفية المتعلقة بـ: "${titleAr}"؛
2. ولما كان الطرف الثاني يتمتع بالصلاحية والمؤهلات العلمية والخبرات العملية اللازمة، وأبدى استعداده التام للقيام بتلك المهام بأعلى درجات الولاء المهني والأمانة والسرية؛
3. ولما تلاقت إرادة الطرفين على تنظيم علاقة العمل وحقوق الأجر والتأمينات والالتزامات المهنية وفقاً لأحكام ${law} وقانون التأمينات الاجتماعية؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للطرفين بكامل أهليتهما القانونية، فقد اتفقا وتراضيا على المواد الآتية:`;
    rEn = `EMPLOYMENT & PROFESSIONAL RECITALS:
1. WHEREAS, the First Party is an established registered Egyptian business seeking specialized personnel to perform duties regarding: "${titleEn}";
2. WHEREAS, the Second Party possesses verified academic and professional qualifications, committing to execute duties with utmost diligence, loyalty, and confidentiality;
3. WHEREAS, mutual consent has been attained regulating salary, social insurance, and duties compliant with ${law};
4. NOW, THEREFORE, the Parties, having affirmed their legal capacity, covenant and agree as follows:`;
  }
  // 6. Technology, Telecoms, Software & IP
  else if (
    cat.includes('تكنولوج') ||
    cat.includes('اتصال') ||
    cat.includes('فكر') ||
    cat.includes('برمج') ||
    titleAr.includes('برمج') ||
    titleAr.includes('سحابي') ||
    titleAr.includes('تطبيق') ||
    titleAr.includes('علامة') ||
    titleAr.includes('بيانات شخصية')
  ) {
    rAr = `التمهيد التعاقدي التكنولوجي والملكية الفكرية:
1. لما كان الطرف الأول يسعى إلى تطوير واستغلال حلول تكنولوجية ورقمية متقدمة ونظم معلوماتية وحماية حقوقه الفكرية في مجال: "${titleAr}"؛
2. ولما كان الطرف الثاني مؤسسة تقنية متخصصة تمتلك البنية البرمجية والخبرة الهندسية والتراخيص الصادرة من الجهات المنظمة (NTRA و ITIDA)، وحقوق الملكية الفكرية اللازمة؛
3. ولما كان الطرفان يحرصان على تأمين سرية البيانات وحماية البيانات الشخصية والأمن السيبراني وفقاً لأحكام ${law}؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للطرفين بكامل أهليتهما القانونية والتقنية، فقد اتفقا وتراضيا على المواد الآتية:`;
    rEn = `TECHNOLOGY, TELECOMS & IP RECITALS:
1. WHEREAS, the First Party desires to implement, license, or develop digital technology solutions regarding: "${titleEn}";
2. WHEREAS, the Second Party is a specialized enterprise possessing software infrastructure, ITIDA/NTRA regulatory licensing, and IP ownership;
3. WHEREAS, both Parties are committed to safeguarding data privacy, cybersecurity, and intellectual property rights under ${law};
4. NOW, THEREFORE, the Parties, having confirmed their technical and legal capacity, covenant and agree as follows:`;
  }
  // 7. Engineering & Construction
  else if (
    cat.includes('مقاول') ||
    cat.includes('تشييد') ||
    cat.includes('هندس') ||
    titleAr.includes('مقاول') ||
    titleAr.includes('تشطيب') ||
    titleAr.includes('بناء') ||
    titleAr.includes('إنشاء')
  ) {
    rAr = `التمهيد التعاقدي الهندسي والتشييدي وحيثيات التنفيذ:
1. لما كان الطرف الأول (رب العمل) يمتلك المشروع/الموقع الكائن بجمهورية مصر العربية، ويرغب في إسناد وتنفيذ الأعمال الهندسية والإنشائية المتعلقة بـ: "${titleAr}"؛
2. ولما كان الطرف الثاني (المقاول/المهندس) شركة مقاولات مؤهلة ومصنفة رسمياً، وتمتلك الكفاءة الفنية والعمالة الفنية المدربة والمعدات اللازمة للتنفيذ طبقاً لأصول الصنعة والمواصفات القياسية والكود المصري؛
3. ولما راجع الطرف الثاني المخططات المعمارية والإنشائية وجداول الكميات وفحص الموقع بدقة وفقاً لـ ${law}، وأقر بإمكانية التنفيذ وفق الجدول الزمني المعتمد؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للطرفين بكامل أهليتهما القانونية والهندسية، فقد اتفقا وتراضيا على المواد الآتية:`;
    rEn = `ENGINEERING & CONSTRUCTION RECITALS:
1. WHEREAS, the First Party (Employer) owns the project site and seeks to award engineering and execution works regarding: "${titleEn}";
2. WHEREAS, the Second Party (Contractor) is an authorized engineering contractor possessing technical expertise, plant machinery, and workforce compliant with Egyptian Building Codes;
3. WHEREAS, the Contractor has reviewed architectural drawings, bill of quantities, and site conditions under ${law}, confirming feasibility without reservation;
4. NOW, THEREFORE, the Parties, having verified project parameters, covenant and agree as follows:`;
  }
  // 8. Amicable Dispute Settlement & Arbitration
  else if (
    titleAr.includes('صلح') ||
    titleAr.includes('تسوية') ||
    titleAr.includes('تحكيم') ||
    cat.includes('صلح') ||
    cat.includes('تحكيم')
  ) {
    rAr = `التمهيد التعاقدي للتسوية الودية والتحكيم وحسم النزاع:
1. لما كان قد ثار بين الطرفين نزاع/خلاف قانوني ومالي ناشئ عن المعاملات والالتزامات المتعلقة بـ: "${titleAr}"؛
2. ولما كانت رغبة الطرفين المشتركة قد اتجهت إلى درء الخصومة وتجنب أعباء ومصروفات التقاضي وإنهاء كافة المطالبات العالقة بالتراضي التام والصلح البات؛
3. ولما تلاقت إرادة الطرفين على إبرام هذا الصلح/المشارطة كعقد ملزم ومانع من تجديد النزاع وله قوة السند التنفيذي وفقاً لأحكام ${law}؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للطرفين بكامل أهليتهما المعتبرة قانوناً وقضاءً، فقد اتفقا وتراضيا على المواد الآتية:`;
    rEn = `AMICABLE SETTLEMENT & ARBITRATION RECITALS:
1. WHEREAS, a commercial dispute has arisen between the Parties regarding rights and covenants under: "${titleEn}";
2. WHEREAS, both Parties genuinely desire to resolve all pending claims, avert adversarial litigation, and achieve mutual final discharge;
3. WHEREAS, the Parties agree to execute this legally binding compromise/arbitration protocol endowed with executive enforceability under ${law};
4. NOW, THEREFORE, the Parties, having resolved all contentious matters, covenant and agree as follows:`;
  }
  // 9. Partnerships & Shareholders Agreements
  else if (
    cat.includes('شرك') ||
    cat.includes('شراكة') ||
    titleAr.includes('شراكة') ||
    titleAr.includes('شريك') ||
    titleAr.includes('مساهمين')
  ) {
    rAr = `التمهيد التعاقدي المشترك وحيثيات الشراكة:
1. لما كان الأطراف يرغبون في توطيد شراكتهم التجارية والاستثمارية المشتركة وتنظيم الحقوق والالتزامات المتعلقة بـ: "${titleAr}"؛
2. ولما كان الأطراف حريصين على إرساء آليات الحوكمة الرشيدة وحماية حقوق الملكية وقواعد التصويت وتداول الحصص والأسهم وفض المنازعات طبقاً لـ ${law}؛
3. ولما تلاقت إرادة الأطراف على بنود هذه الاتفاقية بكامل الأهلية والرضا التام الخالي من أي شائبة من شوائب الإكراه أو التدليس أو الغبن؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للشركاء بكامل أهليتهم الاستثمارية والتجارية، فقد اتفقوا وتراضوا على المواد الآتية:`;
    rEn = `CORPORATE & PARTNERSHIP RECITALS:
1. WHEREAS, the Parties desire to consolidate their commercial partnership and govern: "${titleEn}";
2. WHEREAS, the Parties seek to establish sound corporate governance, equity protections, voting covenants, and dispute mechanics pursuant to ${law};
3. WHEREAS, mutual consent has been fully attained with verified legal capacity and unvitiated will;
4. NOW, THEREFORE, the Partners, possessing full capacity, covenant and agree as follows:`;
  }
  // 10. Sale & Property Ownership
  else if (
    cat.includes('بيع') ||
    cat.includes('ملكية') ||
    titleAr.includes('بيع') ||
    titleAr.includes('شراء') ||
    titleAr.includes('هبة')
  ) {
    rAr = `التمهيد التعاقدي المشترك وسند الملكية:
1. لما كان الطرف الأول يمتلك العين/المال محل التعاقد (${titleAr}) بموجب سند ملكية رسمي قانوني وخالٍ من كافة الديون والرهون والحقوق العينية الأصلية والتبعية وحقوق الارتفاق وحقوق الغير؛
2. ولما كان الطرف الأول قد رغب في بيع ونقل ملكية موضوع العقد إلى الطرف الثاني بيعاً نهائياً وباتاً وناجزاً غير معلق على شرط واقف أو فاسخ؛
3. ولما كان الطرف الثاني قد قبل الشراء بالثمن والشروط المحددة بهذا العقد بعد أن عاين المبيع المعاينة التامة النافية للجهالة شرعاً وقانوناً، وفقاً لأحكام ${law}؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للطرفين بكامل أهليتهما القانونية والشرعية للتصرف والتعاقد، فقد اتفقا وتراضيا على المواد الآتية:`;
    rEn = `SALE, CONVEYANCE & TITLE RECITALS:
1. WHEREAS, the First Party owns the subject asset under registered legal title free from all encumbrances, liens, mortgages, and third-party adverse rights regarding: "${titleEn}";
2. WHEREAS, the First Party desires to sell, convey, and definitively transfer unencumbered ownership unto the Second Party;
3. WHEREAS, the Second Party agrees to purchase the asset for the consideration stipulated herein following comprehensive physical and legal inspection pursuant to ${law};
4. NOW, THEREFORE, the Parties, possessing unvitiated capacity, covenant and agree as follows:`;
  }
  // 11. Logistics & Transportation
  else if (
    cat.includes('نقل') ||
    cat.includes('لوجست') ||
    cat.includes('شحن') ||
    titleAr.includes('نقل') ||
    titleAr.includes('شحن') ||
    titleAr.includes('لوجست')
  ) {
    rAr = `التمهيد التعاقدي اللوجستي والملاحي:
1. لما كان الطرف الأول يمتلك بضائع وشحنات تجارية يرغب في نقلها وتخزينها والتخليص الجمركي عليها بخصوص: "${titleAr}"؛
2. ولما كان الطرف الثاني وكيلاً وناقلاً لوجستياً معتمداً ومقيداً بالجهات المعنية ويمتلك الأسطول المجهز والتراخيص اللازمة للملاحة والنقل البري والبحري والجوي؛
3. ولما اتفق الطرفان على الالتزام بالقواعد واللوائح الجمركية ومنظومة التسجيل المسبق للشحنات ACI وتأمين الشحنات بموجب ${law}؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للطرفين بكامل أهليتهما المهنية والتعاقدية، فقد اتفقا وتراضيا على المواد الآتية:`;
    rEn = `LOGISTICS, FREIGHT & MARITIME RECITALS:
1. WHEREAS, the First Party requires cargo freight, customs clearance, and warehousing services regarding: "${titleEn}";
2. WHEREAS, the Second Party is a licensed logistics operator and freight forwarder maintaining compliant fleets and operating permits;
3. WHEREAS, both Parties covenant to adhere strictly to customs regulations, ACID protocols, and cargo insurance pursuant to ${law};
4. NOW, THEREFORE, the Parties, possessing full capacity, covenant and agree as follows:`;
  }
  // 12. Financing & Collateral
  else if (
    cat.includes('تمويل') ||
    cat.includes('رهن') ||
    cat.includes('ائتمان') ||
    titleAr.includes('تمويل') ||
    titleAr.includes('قرض') ||
    titleAr.includes('تسهيل') ||
    titleAr.includes('رهن')
  ) {
    rAr = `التمهيد التعاقدي التمويلي والائتماني:
1. لما كان الطرف الثاني قد تقدم بطلب للحصول على تسهيلات ائتمانية/تمويلية مخصصة لتمويل: "${titleAr}"؛
2. ولما كان الطرف الأول مؤسسة تمويلية/مصرفية مرخصة من البنك المركزي المصري أو الهيئة العامة للرقابة المالية (FRA) وقد وافق على منح التمويل بعد دراسة الجدارة الائتمانية والضمانات؛
3. ولما قدم الطرف الثاني الضمانات العينية والشخصية والرهون الموثقة لضمان الوفاء بكافة الأقساط والمصروفات بموجب ${law}؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للطرفين بكامل أهليتهما المالية والقانونية، فقد اتفقا وتراضيا على المواد الآتية:`;
    rEn = `FINANCING, CREDIT & COLLATERAL RECITALS:
1. WHEREAS, the Second Party has formally applied for dedicated credit financing to facilitate: "${titleEn}";
2. WHEREAS, the First Party is an authorized financial institution under CBE/FRA oversight agreeing to disburse credit upon solvency due diligence;
3. WHEREAS, the Second Party has furnished collateral pledges, mortgages, and guarantees securing amortized repayment under ${law};
4. NOW, THEREFORE, the Parties, having affirmed full credit capacity, covenant and agree as follows:`;
  } else {
    rAr = `التمهيد التعاقدي المشترك وحيثيات التعاقد:
1. لما كان الطرف الأول يرغب في التعاقد والاتفاق القانوني الملزم بشأن: "${titleAr}"، وفقاً للأنظمة والتشريعات المصرية السارية؛
2. ولما كان الطرف الثاني يتمتع بالأهلية القانونية والخبرة المهنية والقدرات التشغيلية والملاءة اللازمة لتنفيذ وإنجاز كافة الواجبات والالتزامات الموكلة إليه؛
3. ولما تلاقت إرادة الطرفين الصريحة على إرساء إطار تعاقدي متوازن يحكمه مبدأ حسن النية، وتحديد الحقوق والالتزامات المتبادلة بموجب أحكام ${law}؛
4. وبناءً على ما تقدم، وإذ تلاقت الإرادة الحرة للطرفين بكامل أهليتهما القانونية والشرعية، فقد اتفقا وتراضيا على المواد الآتية:`;
    rEn = `GENERAL CONTRACTUAL RECITALS & WHEREAS CLAUSES:
1. WHEREAS, the First Party desires to enter into a legally binding agreement regarding: "${titleEn}", in full compliance with applicable Egyptian statutory laws;
2. WHEREAS, the Second Party possesses the requisite operational capability, professional qualification, and statutory permits under ${law};
3. WHEREAS, mutual consent has been attained establishing reciprocal rights and obligations governed by good faith and law;
4. NOW, THEREFORE, the Parties, possessing unvitiated capacity, covenant and agree as follows:`;
  }
  }

  return {
    ...contract,
    totalClauses: standardizedClauses.length,
    contractData: {
      ...cd,
      recitalsArabic: rAr,
      recitalsEnglish: rEn,
      clauses: standardizedClauses,
    },
  };
}

export function enrichEncyclopediaRecitals(contracts: OfficialEncyclopediaContract[]): OfficialEncyclopediaContract[] {
  // Deduplicate contracts: prioritized handcrafted 'official-' contracts first
  const seenSignatures = new Set<string>();
  const seenIds = new Set<string>();
  const deduplicatedContracts: OfficialEncyclopediaContract[] = [];

  // Known redundant mega IDs that duplicate handcrafted base encyclopedia contracts
  const knownDuplicateIds = new Set([
    're_sale-001',
    'lease-001',
    'epc-001',
    'labor-001',
    'corp-001',
    'corp-005',
    'gafi-001',
    'gafi-016',
    'gafi-026',
    'gafi-036',
    'gafi-037',
    'gafi-041',
    'gafi-011',
    'trade-010',
    'arbit-001',
    'corp-007',
    'corp-008',
    'corp-011',
    'trade-001',
  ]);

  // Sort so high-fidelity 'official-' handcrafted contracts come first
  const prioritized = [...contracts].sort((a, b) => {
    const aIsOff = a.id.startsWith('official-');
    const bIsOff = b.id.startsWith('official-');
    if (aIsOff && !bIsOff) return -1;
    if (!aIsOff && bIsOff) return 1;
    return 0;
  });

  for (const c of prioritized) {
    if (seenIds.has(c.id) || knownDuplicateIds.has(c.id)) {
      continue;
    }

    const norm = (c.titleAr || '')
      .toLowerCase()
      .replace(/\(ش\.م\.م\)|\(ش\.ذ\.م\.م\)|\(ش\.ش\.و\)|\(ش\.ش\.و\.ذ\.م\.م\)|\(llc\)|\(sae\)|\(opc\)|\(jsc\)|\(epc\)|\(sla\)|\(nda\)/gi, '')
      .replace(/عقد|اتفاقية|وثيقة|صيغة|نموذج/g, '')
      .replace(/نهائي وبات|محدد المدة|المعتمد|الرسمي|الموثق|بالشهر العقاري/g, '')
      .replace(/خاضع لأحكام.*/g, '')
      .replace(/وفقاً لأحكام.*/g, '')
      .replace(/وفق القانون.*/g, '')
      .replace(/طبقاً للقانون.*/g, '')
      .replace(/طبقا لأحكام.*/g, '')
      .replace(/[^\u0621-\u064A0-9a-zA-Z]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (norm.length > 5 && seenSignatures.has(norm)) {
      continue;
    }

    seenSignatures.add(norm);
    seenIds.add(c.id);
    deduplicatedContracts.push(enrichContractRecitals(c));
  }

  return deduplicatedContracts;
}
