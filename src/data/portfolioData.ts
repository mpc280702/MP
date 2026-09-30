export interface DesignerInfo {
  name: string;
  role: string;
  headline: string;
  tagline: string;
  bio: string;
  specializations: string[];
  email: string;
  phone: string;
  phoneDisplay: string;
  zalo: string;
  facebook: string;
  cv: string;
  address: string;
  availability: string;
  education: string;
  stats: {
    experienceYears: number;
    experienceText: string;
    completedProjects: string;
    satisfactionRate: string;
  };
}

export type ProjectType = 'Concept Project' | 'Personal Project';

export interface PortfolioProject {
  id: string;
  title: string;
  projectType: ProjectType;
  client?: string;
  category: string;
  categorySlug: string;
  description: string;
  coverImage: string;
  visualNote: string;
  url?: string;
  tags: string[];
  featured: boolean;
}

export const DESIGNER_INFO: DesignerInfo = {
  name: 'Cao Ngọc Minh',
  role: 'Graphic Designer & Brand Creator',
  headline: 'Biến ý tưởng thành hệ thống thị giác rõ ràng và nhất quán.',
  tagline: 'Biến ý tưởng thành hệ thống thị giác rõ ràng và nhất quán.',
  bio: 'Sáng tạo bản sắc thương hiệu, định vị hình ảnh và thiết kế ấn phẩm truyền thông số thực chiến. Kết hợp tư duy thẩm mỹ hiện đại và tính ứng dụng cao.',
  specializations: [
    'Brand Identity',
    'Packaging',
    'Key Visual & Digital',
    'Editorial',
    'UI & Design Systems'
  ],
  email: 'mngoc1285l@gmail.com',
  phone: '0327430794',
  phoneDisplay: '0327.430.794',
  zalo: 'https://zalo.me/0327430794',
  facebook: 'https://www.facebook.com/ngoc.minh.510465',
  cv: 'https://drive.google.com/file/d/1PYnFqpZGrsDulrnaYoRtTAQZjraynhed/view?usp=sharing',
  address: 'Hà Nội, Việt Nam',
  availability: 'On-site (Hà Nội) & Remote Toàn quốc',
  education: 'Đại Học Mỏ - Địa Chất',
  stats: {
    experienceYears: 5,
    experienceText: '05+ Năm',
    completedProjects: '40+',
    satisfactionRate: '98%'
  }
};

export interface ProcessStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
}

export const DESIGN_PROCESS: ProcessStep[] = [
  {
    step: 1,
    title: 'Khám phá',
    subtitle: 'Nghiên cứu & Phân tích',
    description: 'Tìm hiểu bối cảnh thương hiệu, đối tượng người dùng mục tiêu và mục tiêu cốt lõi của dự án.'
  },
  {
    step: 2,
    title: 'Định hướng',
    subtitle: 'Concept & Moodboard',
    description: 'Xây dựng concept thiết kế, moodboard thị giác và xác định phong cách thẩm mỹ đồng nhất.'
  },
  {
    step: 3,
    title: 'Thiết kế',
    subtitle: 'Thực thi & Phát triển Visual',
    description: 'Triển khai bố cục, hệ màu, kiểu chữ (typography) và hệ thống hình ảnh chi tiết theo đúng định hướng.'
  },
  {
    step: 4,
    title: 'Tinh chỉnh',
    subtitle: 'Đánh giá & Tối ưu hóa',
    description: 'Rà soát chi tiết, tiếp nhận phản hồi, kiểm tra tính ứng dụng thực tế và hoàn thiện từng điểm chạm thị giác.'
  },
  {
    step: 5,
    title: 'Bàn giao',
    subtitle: 'Đóng gói & Chuẩn hóa',
    description: 'Đóng gói file thiết kế chuẩn in ấn/digital đầy đủ, kèm hướng dẫn ứng dụng hệ thống rõ ràng.'
  }
];

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  scope: string;
  deliverables: string[];
  scopeDetermination: string;
  timeline: string;
  icon: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    subtitle: 'Nhận diện thương hiệu toàn diện',
    timeline: 'Tùy phạm vi dự án',
    icon: 'palette',
    scope: 'Nghiên cứu và xây dựng bản sắc thương hiệu từ gốc: cấu trúc logo, hệ thống màu sắc, kiểu chữ (typography) và bộ quy chuẩn nhận diện số & văn phòng.',
    deliverables: [
      'Bộ file Logo Master chuẩn vector (AI, EPS, SVG, PNG trong suốt)',
      'Tài liệu Brand Guidelines hướng dẫn sử dụng chi tiết (PDF)',
      'Ấn phẩm văn phòng cơ bản: Namecard, Tiêu đề thư, Phong bì',
      'Hệ thống Avatar & Cover chuẩn kích thước mạng xã hội'
    ],
    scopeDetermination: 'Được xác định dựa trên số lượng ấn phẩm ứng dụng, số hướng concept cần thử nghiệm và quy mô hệ thống thương hiệu.'
  },
  {
    id: 'packaging-design',
    title: 'Packaging Design',
    subtitle: 'Bao bì & Nhãn mác sản phẩm',
    timeline: 'Tùy số lượng SKU & kết cấu',
    icon: 'inventory_2',
    scope: 'Thiết kế kết cấu và đồ họa bao bì, nhãn dán sản phẩm, tối ưu thị giác trên kệ hàng và kiểm soát chặt chẽ thông số kỹ thuật in ấn.',
    deliverables: [
      'Bản vẽ trải (Dieline) chuẩn kỹ thuật xuất xưởng in (AI, PDF Print-Ready)',
      'Hình ảnh Render Mockup 3D trực quan sản phẩm thực tế',
      'Bố cục nhãn phụ, mã vạch và thông tin dinh dưỡng / thành phần',
      'File phân lớp hiệu ứng in đặc biệt (Ép kim, Dập nổi, Phủ UV)'
    ],
    scopeDetermination: 'Được xác định dựa trên số lượng mã sản phẩm (SKU), độ phức tạp của kết cấu khuôn hộp và quy cách gia công thành phẩm.'
  },
  {
    id: 'editorial-profile',
    title: 'Editorial & Profile',
    subtitle: 'Hồ sơ năng lực, Catalogue & Menu',
    timeline: 'Tùy độ dài nội dung',
    icon: 'menu_book',
    scope: 'Thiết kế ấn phẩm nhiều trang: Company Profile, Báo cáo thường niên, Catalogue sản phẩm và Menu F&B với hệ thống lưới phân cấp thông tin khoa học.',
    deliverables: [
      'File PDF in ấn phân giải cao, thiết lập sẵn khoảng tràn lề (Bleed)',
      'File Digital PDF tối ưu dung lượng kèm liên kết tương tác cho email/web',
      'Bộ khung Template dàn trang đồng bộ (Adobe InDesign / Illustrator)',
      'Bộ asset hình ảnh đồ họa và biểu đồ trích xuất độc lập'
    ],
    scopeDetermination: 'Được xác định dựa trên tổng số trang nội dung, độ phức tạp của biểu đồ / infographic và mức độ biên tập hình ảnh tư liệu.'
  },
  {
    id: 'key-visual-digital',
    title: 'Key Visual & Digital',
    subtitle: 'Hình ảnh chiến dịch & Truyền thông số',
    timeline: 'Tùy phạm vi thiết kế',
    icon: 'ads_click',
    scope: 'Sáng tạo hình ảnh chủ đạo (Key Visual) cho chiến dịch truyền thông, phát triển hệ thống banner quảng cáo số và ấn phẩm truyền thông đa kênh.',
    deliverables: [
      'Key Visual Master chất lượng cao phục vụ in ấn và hiển thị số',
      'Hệ thống Banner phái sinh (Resize) theo kích thước chuẩn các nền tảng',
      'Bộ mẫu Template bài đăng mạng xã hội (Facebook, Instagram, LinkedIn)',
      'Gói file nguồn được tổ chức layer chuẩn mực'
    ],
    scopeDetermination: 'Được xác định dựa trên số lượng concept Key Visual cần phát triển và danh sách các kích thước chuyển thể phái sinh.'
  }
];

export const PROJECTS: PortfolioProject[] = [
  {
    id: 'kanso-roastery',
    title: 'Kanso Roastery',
    projectType: 'Concept Project',
    client: 'Concept Project',
    category: 'Brand Identity & Packaging',
    categorySlug: 'brand',
    description: 'Concept nhận diện thương hiệu và bao bì cà phê túi lọc tối giản theo triết lý Kanso (Nhật Bản).',
    coverImage: 'assets/images/lamee-stationery-flatlay.jpg',
    visualNote: 'Visual tham khảo & Mockup minh họa',
    url: 'pages/selected-work.html#kanso-roastery',
    tags: ['Brand Identity', 'Packaging', 'Typography'],
    featured: true
  },
  {
    id: 'aura-botanicals',
    title: 'Aura Botanicals',
    projectType: 'Concept Project',
    client: 'Concept Project',
    category: 'Packaging & Brand Identity',
    categorySlug: 'packaging',
    description: 'Concept nhận diện thương hiệu và thiết kế nhãn mác dòng mỹ phẩm chăm sóc da thảo mộc hữu cơ.',
    coverImage: 'assets/images/lamee-isometric-mockup.jpg',
    visualNote: 'Visual tham khảo & Mockup minh họa',
    url: 'pages/selected-work.html#aura-botanicals',
    tags: ['Packaging', 'Cosmetics', 'Eco Friendly'],
    featured: true
  },
  {
    id: 'monolith-editorial',
    title: 'MONOLITH Editorial',
    projectType: 'Personal Project',
    client: 'Personal Project',
    category: 'Editorial & Publication',
    categorySlug: 'editorial',
    description: 'Dự án cá nhân nghiên cứu thiết kế dàn trang ấn phẩm kiến trúc Brutalism với hệ lưới Modular.',
    coverImage: 'assets/images/portfolio-workspace-mockup.jpg',
    visualNote: 'Dự án cá nhân / Khám phá thị giác độc lập',
    url: 'pages/selected-work.html#monolith-editorial',
    tags: ['Editorial', 'Layout Grid', 'Publication'],
    featured: true
  },
  {
    id: 'urban-type',
    title: 'Urban Type',
    projectType: 'Personal Project',
    client: 'Personal Project',
    category: 'Typography & Poster',
    categorySlug: 'digital',
    description: 'Dự án cá nhân khám phá typography đường phố đương đại và nghệ thuật sắp đặt con chữ đồ họa.',
    coverImage: 'assets/images/portfolio-3d-screens.jpg',
    visualNote: 'Dự án cá nhân / Khám phá nghệ thuật chữ',
    url: 'pages/selected-work.html#urban-type',
    tags: ['Typography', 'Poster Art', 'Experimental'],
    featured: true
  },
  {
    id: 'soulier-no-7',
    title: 'Soulier No. 7',
    projectType: 'Concept Project',
    client: 'Concept Project',
    category: 'Brand Identity & Editorial',
    categorySlug: 'brand',
    description: 'Concept nhận diện thương hiệu và lookbook giới thiệu bộ sưu tập giày da thủ công phong cách cổ điển.',
    coverImage: 'assets/images/net-que-isometric-mockup.jpg',
    visualNote: 'Visual tham khảo & Mockup minh họa',
    url: 'pages/selected-work.html#soulier-no-7',
    tags: ['Brand Identity', 'Editorial', 'Handcrafted'],
    featured: false
  },
  {
    id: 'noir-atelier',
    title: 'Noir Atelier',
    projectType: 'Concept Project',
    client: 'Concept Project',
    category: 'Key Visual & Digital',
    categorySlug: 'digital',
    description: 'Concept định hình Key Visual kỹ thuật số và bộ ấn phẩm mạng xã hội cho studio thời trang đơn sắc.',
    coverImage: 'assets/images/ulibee-campaign-kv.jpg',
    visualNote: 'Visual tham khảo & Mockup minh họa',
    url: 'pages/selected-work.html#noir-atelier',
    tags: ['Key Visual', 'Digital Media', 'Minimal Fashion'],
    featured: false
  }
];

export const getFeaturedProjects = (limit = 4): PortfolioProject[] => {
  return PROJECTS.filter((project) => project.featured).slice(0, limit);
};

export const FEATURED_PROJECTS = getFeaturedProjects(4);

