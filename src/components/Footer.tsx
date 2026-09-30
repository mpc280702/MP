import React from 'react';
import { DESIGNER_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#031813] border-t border-white/10 text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00DF89]"></span>
              <h3 className="font-extrabold text-base tracking-wider uppercase text-white">
                {DESIGNER_INFO.name}
              </h3>
            </div>
            <p className="text-xs text-[#B8D3CB] leading-relaxed">
              {DESIGNER_INFO.role} hoạt động tại {DESIGNER_INFO.address}. Tập trung vào nhận diện thương hiệu, bao bì và thiết kế truyền thông số thực chiến.
            </p>
            <div className="pt-1">
              <span className="inline-block text-[11px] font-bold text-[#00DF89] bg-[#00DF89]/10 px-2.5 py-1 rounded-md border border-[#00DF89]/30">
                Portfolio 2026
              </span>
            </div>
          </div>

          {/* Col 2: Sitemap (Consistent Naming) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00DF89]">
              Sitemap
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#B8D3CB]">
              <li>
                <a href="../index.html" className="hover:text-[#00DF89] transition-colors">Home</a>
              </li>
              <li>
                <a href="about.html" className="hover:text-[#00DF89] transition-colors">About</a>
              </li>
              <li>
                <a href="services.html" className="hover:text-[#00DF89] transition-colors">Services</a>
              </li>
              <li>
                <a href="about.html#skills" className="hover:text-[#00DF89] transition-colors">Skills</a>
              </li>
              <li>
                <a href="selected-work.html" className="hover:text-[#00DF89] transition-colors">Works</a>
              </li>
              <li>
                <a href="contact.html" className="hover:text-[#00DF89] transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00DF89]">
              Liên Hệ Trực Tiếp
            </h4>
            <div className="space-y-2 text-xs text-[#B8D3CB]">
              <div>
                <span className="block text-[10px] uppercase text-[#B8D3CB]/60">Email</span>
                <a
                  href={`mailto:${DESIGNER_INFO.email}`}
                  className="font-semibold text-white hover:text-[#00DF89] transition-colors"
                >
                  {DESIGNER_INFO.email}
                </a>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-[#B8D3CB]/60">Hotline / Zalo</span>
                <a
                  href={`tel:${DESIGNER_INFO.phone}`}
                  className="font-semibold text-white hover:text-[#00DF89] transition-colors"
                >
                  {DESIGNER_INFO.phoneDisplay}
                </a>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-[#B8D3CB]/60">Địa Điểm</span>
                <span className="text-white font-medium">{DESIGNER_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Verified Social & Portfolio Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00DF89]">
              Mạng Xã Hội &amp; Hồ Sơ
            </h4>
            <div className="flex flex-col gap-2 text-xs font-semibold">
              <a
                href={DESIGNER_INFO.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#B8D3CB] hover:text-[#00DF89] transition-colors"
              >
                <span>💬</span>
                <span>Zalo Trực Tiếp</span>
              </a>
              <a
                href={DESIGNER_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#B8D3CB] hover:text-[#00DF89] transition-colors"
              >
                <span>🌐</span>
                <span>Facebook Cá Nhân</span>
              </a>
              <a
                href={DESIGNER_INFO.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#00DF89] hover:text-[#A3E635] transition-colors"
              >
                <span>📄</span>
                <span>Hồ Sơ Năng Lực (CV Drive)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Visual System & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8D3CB]">
          <div className="flex items-center gap-2">
            <span>Visual system:</span>
            <span className="text-white font-semibold">Emerald / Forest</span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00DF89]"></span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#04201A] border border-white/20"></span>
          </div>

          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} {DESIGNER_INFO.name}. All rights reserved. • Portfolio 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
