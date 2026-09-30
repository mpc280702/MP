import React, { useState, useEffect } from 'react';
import {
  DESIGNER_INFO,
  PROJECTS,
  PortfolioProject,
  CaseStudyDetails
} from '../data/portfolioData';

interface CaseStudyPageProps {
  initialProjectId?: string;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ initialProjectId }) => {
  // Support direct URL access via props, URL search param (?id=...) or window hash (#...)
  const [currentId, setCurrentId] = useState<string>(() => {
    if (initialProjectId) return initialProjectId;
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const queryId = searchParams.get('id');
      if (queryId) return queryId;
      const hashId = window.location.hash.replace('#', '');
      if (hashId) return hashId;
    }
    return PROJECTS[0]?.id || 'kanso-roastery';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hashId = window.location.hash.replace('#', '');
      if (hashId && PROJECTS.some((p) => p.id === hashId)) {
        setCurrentId(hashId);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const project: PortfolioProject =
    PROJECTS.find((p) => p.id === currentId) || PROJECTS[0];

  const caseStudy: CaseStudyDetails = project?.caseStudy || {};

  return (
    <div className="min-h-screen bg-[#04201A] text-white font-sans antialiased selection:bg-[#00DF89] selection:text-[#04201A]">
      {/* ==========================================================================
          01. NAVIGATION
          ========================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#04201A]/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <a
            href="works.html"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8D3CB] hover:text-[#00DF89] transition-colors"
          >
            <span>&larr;</span>
            <span>Tất Cả Dự Án</span>
          </a>

          {/* Quick Case Study Selector */}
          <div className="hidden md:flex items-center gap-2">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setCurrentId(p.id);
                  if (typeof window !== 'undefined') {
                    window.location.hash = p.id;
                  }
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  p.id === project.id
                    ? 'bg-[#00DF89] text-[#04201A] font-bold'
                    : 'text-[#B8D3CB] hover:text-white bg-white/5'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          <a
            href="contact.html"
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#00DF89] text-[#04201A] hover:bg-[#A3E635] transition-all shadow-md"
          >
            Liên Hệ
          </a>
        </div>
      </header>

      {/* ==========================================================================
          02. HERO / PROJECT HEADER
          ========================================================================== */}
      <main className="pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <article className="space-y-14 sm:space-y-16">
          {/* Header Metadata */}
          <section className="border-b border-white/10 pb-10">
            {/* 1. Loại dự án Badge */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span
                className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                  project.projectType === 'Concept Project'
                    ? 'bg-[#04201A] text-[#00DF89] border-[#00DF89]/40'
                    : 'bg-[#04201A] text-[#A3E635] border-[#A3E635]/40'
                }`}
              >
                {project.projectType}
              </span>
              <span className="text-xs text-[#B8D3CB] bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {project.category}
              </span>
              {project.visualNote && (
                <span className="text-[11px] text-[#B8D3CB]/80 italic bg-[#072C24] px-2.5 py-0.5 rounded border border-[#00DF89]/20">
                  {project.visualNote}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-[#B8D3CB] leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </section>

          {/* Cover Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#072C24] border border-white/10 shadow-2xl">
            <img
              src={project.coverImage}
              alt={`Hình ảnh trang bìa dự án ${project.title}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* 2. Hạng mục thực hiện (Scope of Work) */}
          {caseStudy.scopeOfWork && caseStudy.scopeOfWork.length > 0 && (
            <section className="bg-[#072C24] p-6 sm:p-8 rounded-2xl border border-white/10">
              <h2 className="text-xs uppercase tracking-widest text-[#00DF89] font-bold mb-4 flex items-center gap-2">
                <span>✦</span> Hạng Mục Thực Hiện
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.scopeOfWork.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-[#DDE8E4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00DF89] shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. Màu sắc & Typography */}
          {(caseStudy.colorPalette || caseStudy.typography) && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.colorPalette && caseStudy.colorPalette.length > 0 && (
                <div className="bg-[#072C24] p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                  <h3 className="text-xs uppercase tracking-widest text-[#00DF89] font-bold mb-4">
                    Bảng Màu Chủ Đạo (Color Palette)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {caseStudy.colorPalette.map((c, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <div
                          className="w-full h-12 rounded-xl border border-white/20 mb-2 shadow-inner"
                          style={{ backgroundColor: c.hex }}
                        ></div>
                        <span className="text-xs font-bold text-white">{c.name}</span>
                        <span className="text-[11px] text-[#B8D3CB] font-mono">{c.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {caseStudy.typography && (
                <div className="bg-[#072C24] p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-[#00DF89] font-bold mb-4">
                      Hệ Thống Kiểu Chữ (Typography)
                    </h3>
                    <div className="space-y-2">
                      <div className="text-base font-bold text-white">
                        {caseStudy.typography.primary}
                        {caseStudy.typography.secondary && (
                          <span className="text-sm font-normal text-[#B8D3CB]"> / {caseStudy.typography.secondary}</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#B8D3CB] leading-relaxed">
                        {caseStudy.typography.usage}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* 4. Bối cảnh & Vấn đề */}
          {caseStudy.contextAndProblem && (
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-[#00DF89] font-bold">
                Bối Cảnh &amp; Thách Thức
              </h2>
              <h3 className="text-2xl font-bold text-white">Vấn đề cốt lõi cần giải quyết</h3>
              <p className="text-base text-[#DDE8E4] leading-relaxed">
                {caseStudy.contextAndProblem}
              </p>
            </section>
          )}

          {/* 5. Mục tiêu thiết kế */}
          {caseStudy.objectives && caseStudy.objectives.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-widest text-[#00DF89] font-bold">
                Mục Tiêu Trọng Tâm
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {caseStudy.objectives.map((obj, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#072C24] border border-white/10 flex flex-col">
                    <span className="text-xs font-black text-[#00DF89] mb-2">0{idx + 1}.</span>
                    <p className="text-xs sm:text-sm text-[#DDE8E4] leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 6. Nghiên cứu & Định hướng */}
          {caseStudy.researchAndDirection && (
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-[#00DF89] font-bold">
                Nghiên Cứu &amp; Định Hướng
              </h2>
              <h3 className="text-2xl font-bold text-white">Cơ sở lý luận &amp; Thẩm mỹ</h3>
              <p className="text-base text-[#DDE8E4] leading-relaxed">
                {caseStudy.researchAndDirection}
              </p>
            </section>
          )}

          {/* 7. Giải pháp thiết kế */}
          {caseStudy.designSolution && (
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-[#00DF89] font-bold">
                Giải Pháp Thị Giác
              </h2>
              <h3 className="text-2xl font-bold text-white">Triển khai thực tế</h3>
              <p className="text-base text-[#DDE8E4] leading-relaxed">
                {caseStudy.designSolution}
              </p>
            </section>
          )}

          {/* 8. Kết quả đầu ra (Design Outputs - Not Sales Claims!) */}
          {caseStudy.designOutputs && caseStudy.designOutputs.length > 0 && (
            <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#072C24] to-[#0A362D] border border-[#00DF89]/30 space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#00DF89] font-bold block mb-1">
                  Bàn Giao Thực Tế
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Kết Quả Sản Phẩm Thiết Kế
                </h3>
                <p className="text-xs text-[#B8D3CB] mt-1">
                  Mô tả chính xác các sản phẩm và định dạng file được đóng gói hoàn thiện.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {caseStudy.designOutputs.map((output, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#DDE8E4]">
                    <span className="text-[#00DF89] font-bold mt-0.5">✓</span>
                    <span>{output}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 9. Hình ảnh & Visual Tham khảo (With Explicit Captions) */}
          {caseStudy.gallery && caseStudy.gallery.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-[#00DF89] font-bold">
                Thư Viện Hình Ảnh &amp; Mockup Trình Diễn
              </h2>

              <div className="grid grid-cols-1 gap-8">
                {caseStudy.gallery.map((item, idx) => (
                  <figure
                    key={idx}
                    className="bg-[#072C24] rounded-2xl overflow-hidden border border-white/10 flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#04201A]">
                      <img
                        src={item.image}
                        alt={item.caption}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="p-4 bg-[#04201A] border-t border-white/10 flex items-center justify-between text-xs text-[#B8D3CB]">
                      <span>{item.caption}</span>
                      {item.isReferenceVisual && (
                        <span className="text-[11px] text-[#00DF89] font-semibold bg-[#00DF89]/10 px-2 py-0.5 rounded">
                          Visual tham khảo
                        </span>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Navigation */}
          <section className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href="works.html"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00DF89] hover:underline"
            >
              <span>&larr;</span> Quay lại danh sách dự án
            </a>

            <a
              href="contact.html"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#00DF89] text-[#04201A] hover:bg-[#A3E635] transition-all shadow-md"
            >
              Trao Đổi Về Dự Án Của Bạn
            </a>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-[#031813] border-t border-white/10 py-8 px-4 text-center text-xs text-[#B8D3CB]">
        <p>© {new Date().getFullYear()} {DESIGNER_INFO.name}. All rights reserved. • {DESIGNER_INFO.address}</p>
      </footer>
    </div>
  );
};

export default CaseStudyPage;
