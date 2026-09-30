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

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  categorySlug: string;
  description: string;
  coverImage: string;
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
    id: 'vortex',
    title: 'Vortex Energy Drink',
    client: 'Vortex Beverage Co.',
    category: 'Brand Identity & Motion',
    categorySlug: 'brand',
    description: 'Hệ thống nhận diện thương hiệu và Key Visual bùng nổ năng lượng cho dòng nước tăng lực thế hệ mới.',
    coverImage: 'assets/images/case-study-1-cover.png',
    url: 'pages/case-study-vortex.html',
    tags: ['Brand Identity', '3D Key Visual', 'Packaging'],
    featured: true
  },
  {
    id: 'net-que',
    title: 'Nét Quê Restaurant',
    client: 'Nét Quê F&B Group',
    category: 'Brand Identity & Editorial',
    categorySlug: 'editorial',
    description: 'Tái định vị thương hiệu chuỗi ẩm thực truyền thống, thiết kế thực đơn cao cấp và bộ nhận diện tại điểm bán.',
    coverImage: 'assets/images/case-study-2-cover.png',
    url: 'pages/case-study-net-que.html',
    tags: ['Brand Identity', 'Menu Design', 'POSM'],
    featured: true
  },
  {
    id: 'lamee',
    title: 'Lamee Beauty Spa',
    client: 'Lamee Wellness & Spa',
    category: 'Brand Identity & Editorial',
    categorySlug: 'brand',
    description: 'Ngôn ngữ thị giác thanh lịch, chuẩn mực cao cấp cho chuỗi viện thẩm mỹ & spa chăm sóc da chuyên sâu.',
    coverImage: 'assets/images/case-study-3-cover.png',
    url: 'pages/case-study-lamee.html',
    tags: ['Visual Identity', 'Social Templates', 'Print System'],
    featured: true
  },
  {
    id: 'portfolio',
    title: 'Creative Portfolio 2026',
    client: 'Cao Ngọc Minh',
    category: 'UI/UX & Interactive Design',
    categorySlug: 'uiux',
    description: 'Thiết kế website portfolio cá nhân phong cách Modern Dark Minimalist kết hợp công nghệ tối ưu hiệu năng.',
    coverImage: 'assets/images/case-study-4-cover.png',
    url: 'pages/case-study-portfolio.html',
    tags: ['UI/UX Design', 'Design System', 'Accessibility'],
    featured: true
  },
  {
    id: 'de-am-chay',
    title: 'Dê Âm Chay',
    client: 'Ẩm Thực Chay',
    category: 'Brand & Menu',
    categorySlug: 'brand',
    description: 'Bộ nhận diện thương hiệu thanh tịnh và thiết kế menu thực dưỡng.',
    coverImage: 'assets/images/case-study-2-cover.png',
    tags: ['Brand Identity', 'Menu Design'],
    featured: false
  }
];

export const getFeaturedProjects = (limit = 4): PortfolioProject[] => {
  return PROJECTS.filter((project) => project.featured).slice(0, limit);
};

export const FEATURED_PROJECTS = getFeaturedProjects(4);

