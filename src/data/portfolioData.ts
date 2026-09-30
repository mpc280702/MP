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

