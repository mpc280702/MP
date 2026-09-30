import React from 'react';
import {
  DESIGNER_INFO,
  SERVICES,
  ServiceItem
} from '../data/portfolioData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ServicesPage: React.FC = () => {
  const serviceList: ServiceItem[] = SERVICES || [];

  return (
    <div className="min-h-screen bg-[#04201A] text-white font-sans antialiased selection:bg-[#00DF89] selection:text-[#04201A]">
      <Navbar currentRoute="services" />

      {/* ==========================================================================
          02. HERO SECTION
          ========================================================================== */}
      <main className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <section className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00DF89]/10 border border-[#00DF89]/30 text-[#00DF89] text-xs font-bold uppercase tracking-wider mb-4">
            <span>Dịch Vụ Thiết Kế Chuyên Nghiệp</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Dịch Vụ &amp; Phạm Vi Thực Hiện
          </h1>
          <p className="text-base sm:text-lg text-[#B8D3CB] leading-relaxed">
            Các gói giải pháp thiết kế đồ họa tập trung vào tính thực tiễn, quy chuẩn chuẩn in/số và khả năng vận hành đồng bộ lâu dài cho thương hiệu.
          </p>
        </section>

        {/* ==========================================================================
            03. 4 SERVICES GRID
            ========================================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {serviceList.map((service, idx) => (
            <article
              key={service.id || idx}
              className="bg-[#072C24] p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#00DF89]/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-5 pb-5 border-b border-white/10">
                  <div>
                    <span className="text-xs font-bold text-[#00DF89] uppercase tracking-wider block mb-1">
                      0{idx + 1}. {service.title}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {service.subtitle}
                    </h2>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#00DF89]/15 border border-[#00DF89]/30 text-[#00DF89] text-[11px] font-bold shrink-0">
                    ⏱ {service.timeline}
                  </div>
                </div>

                {/* Q1: Tôi làm gì? */}
                <div className="mb-5">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-[#00DF89] mb-1.5 flex items-center gap-1.5">
                    <span>✦</span> Tôi làm gì?
                  </h3>
                  <p className="text-sm text-[#DDE8E4] leading-relaxed">
                    {service.scope}
                  </p>
                </div>

                {/* Q2: Bàn giao gì? */}
                <div className="mb-5">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-[#00DF89] mb-2 flex items-center gap-1.5">
                    <span>✦</span> Bàn giao những gì?
                  </h3>
                  <ul className="space-y-1.5">
                    {(service.deliverables || []).map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs sm:text-sm text-[#B8D3CB] flex items-start gap-2">
                        <span className="text-[#00DF89] font-bold shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Q3: Phạm vi được xác định ra sao? */}
                <div className="mb-6 p-3.5 rounded-xl bg-[#04201A]/80 border border-white/5">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#B8D3CB] mb-1">
                    Cơ sở xác định phạm vi &amp; thời gian:
                  </h4>
                  <p className="text-xs text-[#B8D3CB]/90 leading-relaxed">
                    {service.scopeDetermination}
                  </p>
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#B8D3CB]">Báo giá theo nhu cầu cụ thể</span>
                <a
                  href="contact.html"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#00DF89]/15 border border-[#00DF89]/40 text-[#00DF89] hover:bg-[#00DF89] hover:text-[#04201A] transition-all"
                >
                  <span>Liên Hệ Tư Vấn</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* ==========================================================================
            04. BOTTOM CONTACT BANNER
            ========================================================================== */}
        <section className="bg-gradient-to-r from-[#072C24] via-[#0A362D] to-[#072C24] p-8 sm:p-12 rounded-3xl border border-[#00DF89]/30 text-center flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Cần trao đổi chi tiết về dự án của bạn?
          </h3>
          <p className="text-sm sm:text-base text-[#B8D3CB] max-w-2xl mb-8">
            Gửi yêu cầu dự án để nhận phản hồi và tư vấn giải pháp thị giác phù hợp nhất.
          </p>
          <a
            href="contact.html"
            className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#00DF89] text-[#04201A] hover:bg-[#A3E635] hover:scale-105 transition-all shadow-lg"
          >
            Chuyển Đến Trang Liên Hệ
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
