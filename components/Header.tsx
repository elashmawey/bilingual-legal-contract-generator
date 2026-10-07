import React from 'react';

export type AppTab = 'landing' | 'create' | 'encyclopedia' | 'clause-bank' | 'archive';

interface HeaderProps {
  currentTab: AppTab;
  onNavigateTab: (tab: AppTab) => void;
  savedContractsCount: number;
  onOpenBranding: () => void;
  onOpenDisclaimer: () => void;
  onOpenGovPortal?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigateTab,
  savedContractsCount,
  onOpenBranding,
  onOpenDisclaimer,
  onOpenGovPortal,
}) => {
  return (
    <header className="bg-slate-950 text-slate-100 border-b border-slate-800/80 sticky top-0 z-40 print:hidden shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Brand & Slogan */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div
            onClick={() => onNavigateTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center text-base font-black shadow-sm group-hover:scale-105 transition-transform">
              <i className="fas fa-scale-balanced"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  عدالة كونتراكت
                </span>
                <span className="text-[10px] text-amber-400 font-bold tracking-wider">
                  منظومة الصياغة والتوثيق المعتمدة
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight" style={{ direction: 'ltr' }}>
                Egyptian Certified Legal Drafting System
              </p>
            </div>
          </div>
        </div>

        {/* Central Segmented Navigation */}
        <nav className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-bold gap-1 overflow-x-auto max-w-full">
          <button
            onClick={() => onNavigateTab('landing')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              currentTab === 'landing'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <i className={`fas fa-compass text-xs ${currentTab === 'landing' ? 'text-slate-950' : 'text-amber-400'}`}></i>
            <span>الرئيسية والمزايا</span>
          </button>

          <button
            onClick={() => onNavigateTab('create')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              currentTab === 'create'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <i className={`fas fa-feather-pointed text-xs ${currentTab === 'create' ? 'text-slate-950' : 'text-blue-400'}`}></i>
            <span>صياغة وتوليد عقد</span>
          </button>

          <button
            onClick={() => onNavigateTab('encyclopedia')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              currentTab === 'encyclopedia'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <i className={`fas fa-landmark text-xs ${currentTab === 'encyclopedia' ? 'text-slate-950' : 'text-amber-400'}`}></i>
            <span>الموسوعة الرسمية</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-black ${currentTab === 'encyclopedia' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-amber-300'}`}>
              600+
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('clause-bank')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              currentTab === 'clause-bank'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <i className={`fas fa-cubes-stacked text-xs ${currentTab === 'clause-bank' ? 'text-slate-950' : 'text-emerald-400'}`}></i>
            <span>بنك الشروط</span>
          </button>

          <button
            onClick={() => onNavigateTab('archive')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              currentTab === 'archive'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <i className={`fas fa-box-archive text-xs ${currentTab === 'archive' ? 'text-slate-950' : 'text-slate-400'}`}></i>
            <span>الأرشيف</span>
            {savedContractsCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-black ${currentTab === 'archive' ? 'bg-slate-950 text-amber-400' : 'bg-blue-600 text-white'}`}>
                {savedContractsCount}
              </span>
            )}
          </button>
        </nav>

        {/* User Account & Actions */}
        <div className="flex items-center gap-2">
          {/* E-Court Portal Quick Action */}
          {onOpenGovPortal && (
            <button
              onClick={onOpenGovPortal}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black transition-all border border-emerald-500/40 flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="ضغط واعتماد المستندات لبوابة رفع الدعاوى المصرية (< 2MB)"
            >
              <i className="fas fa-scale-balanced text-amber-300"></i>
              <span className="hidden sm:inline">بوابة رفع الدعاوى</span>
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {'<'}2MB
              </span>
            </button>
          )}

          {/* Law Firm Branding Trigger */}
          <button
            onClick={onOpenBranding}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all border border-slate-800 flex items-center gap-1.5 cursor-pointer"
            title="تخصيص هوية وشعار مكتب المحاماة ورقم القيد"
          >
            <i className="fas fa-stamp text-amber-400"></i>
            <span>هوية المكتب والشعار</span>
          </button>

          {/* Terms & Info Trigger */}
          <button
            onClick={onOpenDisclaimer}
            className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs transition-colors border border-slate-800 cursor-pointer"
            title="شروط الاستخدام والمسؤولية القانونية"
          >
            <i className="fas fa-circle-info"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
