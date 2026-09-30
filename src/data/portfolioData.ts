export interface DesignerInfo {
  name: string;
  role: string;
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
}

export const DESIGNER_INFO: DesignerInfo = {
  name: 'Cao Ngọc Minh',
  role: 'Graphic Designer & Brand Creator',
  tagline: 'Biến ý tưởng thành ngôn ngữ thị giác chiến lược',
  bio: 'Chuyên gia thiết kế đồ họa với tư duy thị giác ứng dụng cao, tập trung vào xây dựng nhận diện thương hiệu nhất quán, key visual quảng cáo số cuốn hút và ấn phẩm in ấn/POSM thực chiến.',
  specializations: [
    'Brand Identity (Nhận diện thương hiệu)',
    'Key Visual & Digital Advertising',
    'Menu & POSM F&B / Retail',
    'Packaging & Editorial Design'
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

export const FEATURED_PROJECTS: PortfolioProject[] = [
  {
    id: 'vortex',
    title: 'Vortex Energy Drink',
    client: 'Vortex Beverage Co.',
    category: 'Brand Identity & Motion',
    categorySlug: 'brand',
    description: 'Hệ thống nhận diện thương hiệu và Key Visual bùng nổ năng lượng cho dòng nước tăng lực thế hệ mới.',
    coverImage: 'assets/images/case-study-1-cover.png',
    url: 'pages/case-study-vortex.html',
    tags: ['Brand Identity', '3D Key Visual', 'Packaging']
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
    tags: ['Brand Identity', 'Menu Design', 'POSM']
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
    tags: ['Visual Identity', 'Social Templates', 'Print System']
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
    tags: ['UI/UX Design', 'Design System', 'Accessibility']
  }
];
