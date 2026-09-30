import React from 'react';
import {
  DESIGNER_INFO,
  DESIGN_PROCESS,
  ProcessStep
} from '../data/portfolioData';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#04201A] text-white font-sans antialiased selection:bg-[#00DF89] selection:text-[#04201A]">
      {/* ==========================================================================
          01. NAVIGATION
          ========================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#04201A]/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <a href="../index.html" className="flex items-center gap-2.5 font-bold tracking-wider text-base text-white hover:text-[#00DF89] transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00DF89]"></span>
            <span>CAO NGỌC MINH</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#B8D3CB]">
            <a href="../index.html#selected-work" className="hover:text-[#00DF89] transition-colors">Dự Án</a>
            <a href="#" className="text-[#00DF89] font-bold">Giới Thiệu</a>
            <a href="contact.html" className="hover:text-[#00DF89] transition-colors">Liên Hệ</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={DESIGNER_INFO.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#00DF89] text-[#04201A] hover:bg-[#A3E635] transition-all shadow-md"
            >
              Tải CV
            </a>
          </div>
        </div>
      </header>

      {/* ==========================================================================
          02. HERO / ABOUT INTRO SECTION
          ========================================================================== */}
      <main className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Title Section */}
        <section className="mb-16 sm:mb-20 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00DF89]/10 border border-[#00DF89]/30 text-[#00DF89] text-xs font-bold uppercase tracking-wider mb-4">
            <span>Hồ Sơ Năng Lực &amp; Phương Pháp</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
            Về Tôi &amp; Cách Tôi Thiết Kế
          </h1>
          <p className="text-base sm:text-xl text-[#B8D3CB] max-w-3xl leading-relaxed font-normal">
            Tôi là <strong className="text-white font-semibold">{DESIGNER_INFO.name}</strong>, Graphic Designer &amp; Brand Creator hoạt động tại <strong className="text-white font-semibold">{DESIGNER_INFO.address}</strong>. 
            Mục tiêu của tôi là tạo nên các giải pháp thị giác có cấu trúc rõ ràng, tính thẩm mỹ hiện đại và khả năng ứng dụng thực tế cao trong môi trường kinh doanh số và in ấn.
          </p>
        </section>

        {/* Core Philosophy & Work Mindset */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#072C24] p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#00DF89] font-bold block mb-2">
                Tư Duy Thiết Kế
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Thẩm mỹ gắn liền với công năng
              </h2>
              <p className="text-sm sm:text-base text-[#B8D3CB] leading-relaxed mb-4">
                Một thiết kế tốt không chỉ dừng lại ở mặt hình thức bắt mắt, mà cần truyền tải thông điệp thương hiệu chính xác, dẫn dắt hành vi người dùng tự nhiên và đồng bộ trên mọi kênh tiếp xúc.
              </p>
              <p className="text-sm sm:text-base text-[#B8D3CB] leading-relaxed">
                Mỗi quyết định về bố cục, màu sắc, kiểu chữ đều được xây dựng dựa trên mục tiêu thực tế của thương hiệu và bối cảnh sử dụng của đối tượng mục tiêu.
              </p>
            </div>
          </div>

          <div className="bg-[#072C24] p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#00DF89] font-bold block mb-2">
                Tính Ứng Dụng &amp; Chuẩn Hóa
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Dễ mở rộng, chuẩn quy cách
              </h2>
              <p className="text-sm sm:text-base text-[#B8D3CB] leading-relaxed mb-4">
                Tôi chú trọng quy trình đóng gói và bàn giao kỹ lưỡng: hệ thống file được tổ chức khoa học, chuẩn hệ màu in ấn (CMYK, Pantones) và hiển thị kỹ thuật số (RGB, WebP/SVG tối ưu).
              </p>
              <p className="text-sm sm:text-base text-[#B8D3CB] leading-relaxed">
                Kèm theo tài liệu hướng dẫn (Guidelines) giúp đội ngũ marketing hoặc xưởng in dễ dàng vận hành mà không làm biến dạng bản sắc ban đầu.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            03. SPECIALIZATIONS
            ========================================================================== */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-[#00DF89] font-bold block mb-2">
              Chuyên Môn Cốt Lõi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Lĩnh Vực Hoạt Động
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DESIGNER_INFO.specializations.map((spec, index) => (
              <div
                key={index}
                className="bg-[#072C24]/80 p-5 rounded-xl border border-white/10 hover:border-[#00DF89]/40 transition-all flex items-center gap-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-[#00DF89]/15 text-[#00DF89] flex items-center justify-center font-bold text-sm shrink-0">
                  0{index + 1}
                </div>
                <span className="text-sm sm:text-base font-semibold text-white">
                  {spec}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            04. 5-STEP DESIGN PROCESS
            ========================================================================== */}
        <section className="mb-20">
          <div className="mb-10">
            <span className="text-xs uppercase tracking-widest text-[#00DF89] font-bold block mb-2">
              Quy Trình Làm Việc
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Quy Trình 5 Bước Thực Hiện Dự Án
            </h2>
            <p className="text-sm text-[#B8D3CB] mt-2 max-w-2xl">
              Các bước làm việc minh bạch giúp đảm bảo tiến độ, tối ưu chi phí và bám sát mục tiêu đã thống nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {DESIGN_PROCESS.map((step: ProcessStep) => (
              <div
                key={step.step}
                className="bg-[#072C24] p-5 rounded-2xl border border-white/10 hover:border-[#00DF89]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-[#00DF89] bg-[#00DF89]/10 px-2.5 py-1 rounded-md">
                      BƯỚC 0{step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <span className="text-xs text-[#00DF89]/90 font-medium block mb-3">
                    {step.subtitle}
                  </span>
                  <p className="text-xs sm:text-sm text-[#B8D3CB] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            05. CONTACT CALLOUT
            ========================================================================== */}
        <section className="bg-gradient-to-r from-[#072C24] to-[#0A362D] p-8 sm:p-12 rounded-3xl border border-[#00DF89]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Sẵn sàng hợp tác trong dự án tiếp theo?
            </h3>
            <p className="text-sm text-[#B8D3CB]">
              Liên hệ trực tiếp qua email <strong className="text-white">{DESIGNER_INFO.email}</strong> hoặc số điện thoại <strong className="text-white">{DESIGNER_INFO.phoneDisplay}</strong>.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="contact.html"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#00DF89] text-[#04201A] hover:bg-[#A3E635] hover:scale-105 transition-all text-center"
            >
              Gửi Yêu Cầu
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#031813] border-t border-white/10 py-8 px-4 text-center text-xs text-[#B8D3CB]">
        <p>© {new Date().getFullYear()} {DESIGNER_INFO.name}. All rights reserved. • {DESIGNER_INFO.address}</p>
      </footer>
    </div>
  );
};

export default AboutPage;
