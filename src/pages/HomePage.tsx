import React from 'react';
import {
  DESIGNER_INFO,
  getFeaturedProjects,
  PortfolioProject
} from '../data/portfolioData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  const featuredProjects: PortfolioProject[] = getFeaturedProjects(4);

  return (
    <div className="min-h-screen bg-[#04201A] text-white font-sans antialiased selection:bg-[#00DF89] selection:text-[#04201A]">
      <Navbar currentRoute="home" />

      {/* ==========================================================================
          02. HERO SECTION
          ========================================================================== */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#05261F] to-[#04201A]">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00DF89]/10 border border-[#00DF89]/30 text-[#00DF89] text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00DF89] animate-pulse"></span>
            <span>{DESIGNER_INFO.availability}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight sm:leading-tight mb-6 max-w-4xl tracking-tight">
            Biến ý tưởng thành{' '}
            <span className="bg-gradient-to-r from-[#00DF89] via-[#A3E635] to-[#00DF89] bg-clip-text text-transparent">
              hệ thống thị giác rõ ràng
            </span>{' '}
            và nhất quán.
          </h1>

          {/* Bio / Subtitle (Readable in under 5s) */}
          <p className="text-base sm:text-lg text-[#B8D3CB] max-w-2xl mb-8 leading-relaxed font-normal">
            {DESIGNER_INFO.bio}
          </p>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
            <a
              href="#selected-work"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#00DF89] text-[#04201A] hover:bg-[#A3E635] hover:scale-105 transition-all shadow-lg text-center"
            >
              Xem Dự Án
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#072C24] text-white border border-[#00DF89]/40 hover:border-[#00DF89] hover:bg-[#0A362D] transition-all text-center"
            >
              Liên Hệ Ngay
            </a>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-10 pt-8 border-t border-white/10 w-full max-w-xl">
            <div className="text-center">
              <span className="block text-2xl sm:text-4xl font-black text-[#00DF89]">
                {DESIGNER_INFO.stats.experienceText}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#B8D3CB] mt-1 block">
                Kinh Nghiệm
              </span>
            </div>
            <div className="text-center">
              <span className="block text-2xl sm:text-4xl font-black text-[#00DF89]">
                {DESIGNER_INFO.stats.completedProjects}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#B8D3CB] mt-1 block">
                Dự Án Thực Chiến
              </span>
            </div>
            <div className="text-center">
              <span className="block text-2xl sm:text-4xl font-black text-[#00DF89]">
                {DESIGNER_INFO.stats.satisfactionRate}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#B8D3CB] mt-1 block">
                Độ Hài Lòng
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          03. FEATURED PROJECTS SECTION (Strictly max 4 featured)
          ========================================================================== */}
      <section id="selected-work" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#00DF89] font-bold block mb-2">
              Dự Án Tiêu Biểu
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Dự Án Chọn Lọc
            </h2>
          </div>
          <a
            href="pages/selected-work.html"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00DF89] hover:underline"
          >
            <span>Xem tất cả dự án</span>
            <span>&rarr;</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-[#072C24] rounded-2xl overflow-hidden border border-white/10 hover:border-[#00DF89]/50 transition-all duration-300 shadow-lg hover:shadow-[#00DF89]/10 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#04201A]">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00DF89] bg-[#00DF89]/10 px-2.5 py-1 rounded-md">
                    {project.category}
                  </span>
                  <span className="text-xs text-[#B8D3CB]">• {project.projectType || project.client}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00DF89] transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-[#B8D3CB] mb-4 flex-grow line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] text-[#B8D3CB] bg-white/5 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.url && (
                    <a
                      href={project.url}
                      className="text-xs font-bold text-[#00DF89] hover:text-[#A3E635] inline-flex items-center gap-1"
                    >
                      <span>Chi tiết</span>
                      <span>&rarr;</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
