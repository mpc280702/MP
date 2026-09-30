import React, { useState } from 'react';
import {
  DESIGNER_INFO,
  PROJECTS,
  PortfolioProject,
  ProjectType
} from '../data/portfolioData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeImage } from '../components/SafeImage';

export const WorksPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categorySlug === activeFilter);

  return (
    <div className="min-h-screen bg-[#04201A] text-white font-sans antialiased selection:bg-[#00DF89] selection:text-[#04201A]">
      <Navbar currentRoute="works" />

      {/* ==========================================================================
          02. HEADER & INTRO
          ========================================================================== */}
      <main className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00DF89]/10 border border-[#00DF89]/30 text-[#00DF89] text-xs font-bold uppercase tracking-wider mb-4">
            <span>Portfolio • Dự Án Chọn Lọc</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Dự Án Nghiên Cứu &amp; Thiết Kế
          </h1>
          <p className="text-base sm:text-lg text-[#B8D3CB] leading-relaxed">
            Tuyển tập 6 dự án bao gồm <strong>Concept Projects</strong> (dự án nghiên cứu giả lập giải quyết đề bài thương hiệu) và <strong>Personal Projects</strong> (thử nghiệm thị giác &amp; nghệ thuật chữ độc lập).
          </p>
        </section>

        {/* ==========================================================================
            03. FILTER BUTTONS
            ========================================================================== */}
        <section className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'all'
                ? 'bg-[#00DF89] text-[#04201A] shadow-md'
                : 'bg-[#072C24] text-[#B8D3CB] border border-white/10 hover:border-[#00DF89]/50'
            }`}
          >
            Tất Cả ({PROJECTS.length})
          </button>
          <button
            onClick={() => setActiveFilter('brand')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'brand'
                ? 'bg-[#00DF89] text-[#04201A] shadow-md'
                : 'bg-[#072C24] text-[#B8D3CB] border border-white/10 hover:border-[#00DF89]/50'
            }`}
          >
            Brand Identity
          </button>
          <button
            onClick={() => setActiveFilter('packaging')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'packaging'
                ? 'bg-[#00DF89] text-[#04201A] shadow-md'
                : 'bg-[#072C24] text-[#B8D3CB] border border-white/10 hover:border-[#00DF89]/50'
            }`}
          >
            Packaging
          </button>
          <button
            onClick={() => setActiveFilter('editorial')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'editorial'
                ? 'bg-[#00DF89] text-[#04201A] shadow-md'
                : 'bg-[#072C24] text-[#B8D3CB] border border-white/10 hover:border-[#00DF89]/50'
            }`}
          >
            Editorial &amp; Publication
          </button>
          <button
            onClick={() => setActiveFilter('digital')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === 'digital'
                ? 'bg-[#00DF89] text-[#04201A] shadow-md'
                : 'bg-[#072C24] text-[#B8D3CB] border border-white/10 hover:border-[#00DF89]/50'
            }`}
          >
            Typography &amp; Digital
          </button>
        </section>

        {/* ==========================================================================
            04. 6 PROJECTS GRID
            ========================================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project: PortfolioProject) => (
            <a
              key={project.id}
              href={project.url || '#'}
              className="group bg-[#072C24] rounded-2xl overflow-hidden border border-white/10 hover:border-[#00DF89]/50 transition-all duration-300 shadow-xl hover:shadow-[#00DF89]/10 hover:-translate-y-1 motion-reduce:transform-none flex flex-col cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#00DF89]"
            >
              {/* Image & Type Badge Overlay */}
              <div className="relative overflow-hidden">
                <SafeImage
                  src={project.coverImage}
                  alt={`Ảnh minh họa dự án ${project.title}`}
                  aspectRatio="aspect-[16/10]"
                  className="w-full h-full object-cover group-hover:scale-105 motion-reduce:transform-none transition-transform duration-500"
                />
                {/* Clear Project Type Badge */}
                <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 pointer-events-none z-10">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md border ${
                      project.projectType === 'Concept Project'
                        ? 'bg-[#04201A]/90 text-[#00DF89] border-[#00DF89]/40'
                        : 'bg-[#04201A]/90 text-[#A3E635] border-[#A3E635]/40'
                    }`}
                  >
                    {project.projectType}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#B8D3CB] mb-2 font-medium">
                    <span className="text-[#00DF89] font-bold">{project.category}</span>
                    <span className="text-[11px] text-[#B8D3CB]/80 italic">{project.visualNote}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-[#00DF89] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#B8D3CB] leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold text-[#B8D3CB] bg-[#04201A] px-2.5 py-1 rounded border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-[#00DF89] group-hover:translate-x-1 motion-reduce:transform-none transition-transform">
                    <span>Xem Dự Án</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </section>

        {/* ==========================================================================
            05. TRANSPARENCY DISCLAIMER NOTE
            ========================================================================== */}
        <section className="mt-16 p-6 rounded-2xl bg-[#072C24]/60 border border-white/10 text-center max-w-2xl mx-auto">
          <p className="text-xs text-[#B8D3CB] leading-relaxed">
            💡 <strong>Lưu ý minh bạch:</strong> Toàn bộ các dự án trên được thực hiện dưới hình thức Concept Research hoặc Personal Exploration phục vụ mục đích kiểm chứng giải pháp thiết kế thị giác. Không có số liệu doanh thu hoặc khách hàng thương mại chưa được kiểm chứng.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WorksPage;
