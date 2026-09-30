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

export interface CaseStudyDetails {
  scopeOfWork?: string[];
  colorPalette?: { hex: string; name: string }[];
  typography?: { primary: string; secondary?: string; usage: string };
  contextAndProblem?: string;
  objectives?: string[];
  researchAndDirection?: string;
  designSolution?: string;
  designOutputs?: string[];
  gallery?: { image: string; caption: string; isReferenceVisual: boolean }[];
}

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
  caseStudy?: CaseStudyDetails;
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
    featured: true,
    caseStudy: {
      scopeOfWork: [
        'Thiết kế Logo & Brandmark tối giản',
        'Hệ thống bao bì túi cà phê 250g & 500g',
        'Bộ tem nhãn phân biệt 4 dòng hạt rang',
        'Tài liệu Brand Guidelines chuẩn ứng dụng'
      ],
      colorPalette: [
        { hex: '#2C2A29', name: 'Charcoal Brown' },
        { hex: '#D6C7B2', name: 'Kraft Beige' },
        { hex: '#EBE6DE', name: 'Wabi-Sabi Cream' },
        { hex: '#00DF89', name: 'Accent Mint' }
      ],
      typography: {
        primary: 'Noto Sans JP & Inter',
        secondary: 'Cormorant Garamond',
        usage: 'Phông không chân tinh gọn kết hợp nét thanh nhã của serif cho tiêu đề.'
      },
      contextAndProblem: 'Thị trường cà phê đặc sản thường lạm dụng nhiều chi tiết minh họa rườm rà, làm lu mờ thông tin cốt lõi về nguồn gốc hạt và độ cao vùng trồng. Đề bài đặt ra là tối giản hóa bao bì theo triết lý Kanso để tập trung trải nghiệm vào hương vị hạt.',
      objectives: [
        'Loại bỏ các yếu tố đồ họa dư thừa, ưu tiên khoảng trắng thông thoáng.',
        'Thiết kế cấu trúc tem nhãn trực quan, dễ quét thông tin kỹ thuật hạt rang.',
        'Đảm bảo bao bì tương thích tốt với chất liệu giấy tái chế thân thiện môi trường.'
      ],
      researchAndDirection: 'Khảo sát văn hóa tối giản Nhật Bản kết hợp cùng trường phái thiết kế bao bì Bắc Âu đương đại. Định hướng thị giác chọn khoảng lặng không gian và độ cân bằng typography làm nhân vật chính.',
      designSolution: 'Phát triển hệ thống lưới căn gióng chặt chẽ, tạo cấu trúc tem nhãn 3 khối thông tin rõ ràng. Logo tối giản dạng chữ kết hợp ký hiệu hạt cà phê cách điệu tạo điểm nhấn nhận biết nhẹ nhàng.',
      designOutputs: [
        'Bộ file Vector Logo Master chuẩn định dạng (AI, SVG, PDF, PNG)',
        'Bản vẽ trải khuôn bao bì Dieline 2 quy cách in ấn',
        'Bộ file thiết kế tem nhãn xuất xưởng in chuẩn hệ màu CMYK',
        'Tài liệu Brand Guidelines hướng dẫn quy cách 24 trang'
      ],
      gallery: [
        {
          image: 'assets/images/lamee-stationery-flatlay.jpg',
          caption: 'Visual tham khảo: Mockup nhận diện thương hiệu và bao bì tối giản',
          isReferenceVisual: true
        },
        {
          image: 'assets/images/net-que-stationery-flatlay.jpg',
          caption: 'Visual tham khảo: Bố cục tem nhãn và tài liệu văn phòng',
          isReferenceVisual: true
        }
      ]
    }
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
    featured: true,
    caseStudy: {
      scopeOfWork: [
        'Định vị bảng màu & ngôn ngữ đồ họa hữu cơ',
        'Thiết kế nhãn chai serum, hũ kem & hộp giấy',
        'Bộ biểu tượng minh họa thành phần thảo mộc'
      ],
      colorPalette: [
        { hex: '#1C3A27', name: 'Botanical Green' },
        { hex: '#E8DFD0', name: 'Warm Cream' },
        { hex: '#A88D70', name: 'Earth Clay' }
      ],
      typography: {
        primary: 'Outfit / Roboto',
        usage: 'Font không chân hình học đảm bảo độ sắc nét của thông số dung tích ở kích thước in nhỏ.'
      },
      contextAndProblem: 'Các dòng mỹ phẩm thiên nhiên thường gặp khó khăn trong việc cân bằng giữa cảm giác mộc mạc và chuẩn mực khoa học đáng tin cậy. Nhãn chai kích thước nhỏ đòi hỏi phân cấp thông tin cực kỳ chặt chẽ.',
      objectives: [
        'Tạo dựng diện mạo tinh tế, sang trọng nhưng vẫn giữ nguyên tính chất thảo mộc lành tính.',
        'Quy hoạch diện tích hiển thị rõ ràng bảng thành phần và chứng nhận an toàn.',
        'Kiểm soát kỹ thuật in nhãn trên chất liệu chai thủy tinh mờ.'
      ],
      researchAndDirection: 'Nghiên cứu các dòng Clean Beauty chuẩn quốc tế. Sử dụng màu xanh thực vật đậm làm gốc, bổ trợ bằng màu kem ấm để gợi cảm giác dịu nhẹ cho làn da.',
      designSolution: 'Phân chia nhãn chai thành 2 mặt đối xứng: mặt trước làm nổi bật tên hoạt chất và dung tích, mặt sau tối ưu lưới chữ hiển thị thành phần đầy đủ.',
      designOutputs: [
        'Bản thiết kế nhãn 3 quy cách chai (30ml, 50ml, 100ml)',
        'Bản vẽ kỹ thuật khuôn hộp giấy (Dieline Print-Ready)',
        'File bóc tách kẽm ép kim và phủ màng bóng',
        'Bộ hình ảnh Mockup 3D trình diễn concept'
      ],
      gallery: [
        {
          image: 'assets/images/lamee-isometric-mockup.jpg',
          caption: 'Visual tham khảo: Mockup phối cảnh bao bì mỹ phẩm trên nền vật liệu tự nhiên',
          isReferenceVisual: true
        }
      ]
    }
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
    featured: true,
    caseStudy: {
      scopeOfWork: [
        'Thiết kế cấu trúc hệ lưới Modular 12 cột',
        'Dàn trang ấn phẩm kiến trúc 48 trang',
        'Thiết kế bìa sách dập chìm & Dust Jacket'
      ],
      colorPalette: [
        { hex: '#111111', name: 'Brutal Black' },
        { hex: '#E5E5E5', name: 'Raw Concrete' },
        { hex: '#FF3B30', name: 'Signal Red' }
      ],
      typography: {
        primary: 'Space Mono / Helvetica',
        usage: 'Sự kết hợp giữa phông chữ đơn cách kỹ thuật và phông chữ Thụy Sĩ kinh điển.'
      },
      contextAndProblem: 'Dự án khám phá tính liên kết giữa bề mặt vật liệu bê tông thô ráp và độ tương phản của trang giấy in. Thử thách là làm sao để cấu trúc dàn trang tĩnh thể hiện được sự đồ sộ của kiến trúc.',
      objectives: [
        'Khai thác tối đa tiềm năng phân cấp của hệ lưới Modular.',
        'Tạo ra khoảng thở thị giác sâu giữa các trang ảnh chụp công trình.',
        'Chuẩn hóa thông số gáy sách cho hình thức khâu chỉ hở lưng.'
      ],
      researchAndDirection: 'Nghiên cứu nguyên lý xuất bản Bauhaus và phong cách đồ họa Thụy Sĩ (International Typographic Style). Ưu tiên các khối chữ lớn tương phản với ảnh đen trắng góc rộng.',
      designSolution: 'Ứng dụng các khối tiêu đề đậm nét (ultra-bold) đặt lệch trục có chủ đích, tạo nhịp điệu chuyển trang dứt khoát như những nhát cắt hình khối kiến trúc.',
      designOutputs: [
        'File dàn trang nguyên bản Adobe InDesign (INDD, IDML)',
        'File PDF High-Res xuất xưởng in chuẩn Bleed 3mm',
        'Phiên bản Interactive PDF tối ưu hiển thị màn hình',
        'File thiết kế khuôn bế bìa áo (Dust Jacket)'
      ],
      gallery: [
        {
          image: 'assets/images/portfolio-workspace-mockup.jpg',
          caption: 'Visual tham khảo: Không gian trưng bày ấn phẩm và quy cách dàn trang',
          isReferenceVisual: true
        }
      ]
    }
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
    featured: true,
    caseStudy: {
      scopeOfWork: [
        'Nghiên cứu biến thể hình học của con chữ',
        'Bộ 12 Poster nghệ thuật typography',
        'Chuỗi visual chuyển động số phục vụ trình chiếu'
      ],
      colorPalette: [
        { hex: '#00DF89', name: 'Acid Mint' },
        { hex: '#072C24', name: 'Dark Emerald' },
        { hex: '#A3E635', name: 'Cyber Lime' }
      ],
      typography: {
        primary: 'Custom Experimental Type',
        usage: 'Con chữ được tái cấu trúc hình học, biến con chữ thành tác phẩm thị giác độc lập.'
      },
      contextAndProblem: 'Trong kỷ nguyên số, con chữ thường chỉ được nhìn nhận như công cụ truyền tải thông điệp thụ động. Dự án này thử nghiệm đưa typography trở thành trung tâm biểu đạt cảm xúc thị giác.',
      objectives: [
        'Thử nghiệm sự phá vỡ cấu trúc giải phẫu chữ viết thông thường.',
        'Kết hợp ánh sáng neon dạ quang với chiều sâu không gian đồ họa.',
        'Tạo lập bộ poster nghệ thuật có khả năng ứng dụng triển lãm.'
      ],
      researchAndDirection: 'Thu thập tư liệu từ biển báo giao thông, graffiti và văn hóa nghệ thuật đương đại. Định hướng sử dụng màu dạ quang có độ bão hòa cao trên nền tối.',
      designSolution: 'Tạo lập các góc nghiêng động lực học và hiệu ứng quang học phân tầng, mang lại cảm giác con chữ đang biến chuyển không ngừng theo nhịp sống đô thị.',
      designOutputs: [
        'Bộ 12 file in poster khổ A1 độ phân giải 300DPI',
        'Bộ asset đồ họa số định dạng WebP/PNG tối ưu',
        'Sổ tay ghi chép phương pháp giải phẫu chữ số'
      ],
      gallery: [
        {
          image: 'assets/images/portfolio-3d-screens.jpg',
          caption: 'Visual tham khảo: Trình diễn các tác phẩm typography trên màn hình hiển thị 3D',
          isReferenceVisual: true
        }
      ]
    }
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
    featured: false,
    caseStudy: {
      scopeOfWork: [
        'Thiết kế biểu tượng Monogram & Logo chữ',
        'Quy chuẩn bao bì hộp giày cứng & thẻ bảo hành da',
        'Thiết kế Lookbook giới thiệu bộ sưu tập 28 trang'
      ],
      colorPalette: [
        { hex: '#3B2317', name: 'Leather Brown' },
        { hex: '#C5A059', name: 'Muted Gold' },
        { hex: '#F9F6F0', name: 'Warm Parchment' }
      ],
      typography: {
        primary: 'Cinzel & Playfair Display',
        usage: 'Font chữ có chân cổ điển thể hiện phẩm chất thủ công tỉ mỉ và đẳng cấp sang trọng.'
      },
      contextAndProblem: 'Sản phẩm giày da cao cấp cần một ngôn ngữ thị giác truyền tải được độ bền bỉ và tay nghề thủ công, tránh sự hào nhoáng giả tạo nhưng vẫn tạo được sự tin cậy tuyệt đối.',
      objectives: [
        'Khắc họa tinh thần nghệ nhân qua từng chi tiết nhận diện.',
        'Tối ưu quy cách đóng gói hộp giày mang lại trải nghiệm mở hộp trang trọng.',
        'Đồng bộ tone màu từ catalogue in ấn đến thẻ bảo hành da.'
      ],
      researchAndDirection: 'Tìm hiểu lịch sử xưởng đóng giày truyền thống châu Âu. Định hướng màu nâu da thuộc kết hợp hiệu ứng dập nhiệt chìm và ép nhũ vàng mờ.',
      designSolution: 'Biểu tượng Monogram lồng chữ tinh xảo được ứng dụng trên nhãn đồng và dập nhiệt trực tiếp lên da. Bao bì sử dụng giấy mỹ thuật ép gân tôn vinh nét đẹp thủ công.',
      designOutputs: [
        'Bộ file Vector Monogram & Logo Wordmark hoàn chỉnh',
        'Bản vẽ khuôn hộp giày âm dương và túi vải bọc bảo vệ',
        'File in ấn Lookbook khổ vuông chuẩn màu',
        'Thông số quy chuẩn kỹ thuật ép kim và dập nổi trên da'
      ],
      gallery: [
        {
          image: 'assets/images/net-que-isometric-mockup.jpg',
          caption: 'Visual tham khảo: Mockup nhận diện thương hiệu sang trọng và ấn phẩm',
          isReferenceVisual: true
        }
      ]
    }
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
    featured: false,
    caseStudy: {
      scopeOfWork: [
        'Sáng tạo Key Visual chủ đạo cho chiến dịch ra mắt',
        'Hệ thống Template bài đăng mạng xã hội đa tỷ lệ',
        'Quy chuẩn ánh sáng và bố cục hình ảnh số'
      ],
      colorPalette: [
        { hex: '#0B0B0C', name: 'Obsidian Noir' },
        { hex: '#FFFFFF', name: 'Pure White' },
        { hex: '#71717A', name: 'Monochrome Slate' }
      ],
      typography: {
        primary: 'Bodoni Moda / Neue Haas Grotesk',
        usage: 'Tương phản mạnh mẽ giữa nét thanh mảnh thời trang và phông không chân trung tính.'
      },
      contextAndProblem: 'Thương hiệu thời trang tối giản cần một hệ thống hình ảnh số nổi bật ngay lập tức trên feed mạng xã hội, tránh sự đơn điệu của phong cách đen trắng thông thường.',
      objectives: [
        'Tạo ấn tượng thị giác sâu nhờ kỹ thuật tương phản sáng tối.',
        'Xây dựng hệ khung Template linh hoạt cho nhiều định dạng truyền thông số.',
        'Bảo đảm tính đồng bộ từ quảng cáo banner đến trang đích sản phẩm.'
      ],
      researchAndDirection: 'Nghiên cứu ánh sáng điện ảnh Noir kết hợp bố cục biên tập thời trang cao cấp. Trọng tâm hướng vào kết cấu sợi vải và hình bóng người mẫu.',
      designSolution: 'Sử dụng ánh sáng cắt gắt chiaroscuro tạo chiều sâu kịch tính, kết hợp kiểu chữ tiêu đề kích thước lớn làm điểm neo thị giác mạnh mẽ.',
      designOutputs: [
        'Bộ file Key Visual Master độ phân giải 4K',
        '15 mẫu Template bài đăng mạng xã hội (tỷ lệ 1:1, 4:5, 9:16)',
        'Gói file nguồn PSD/AI phân chia layer có quy chuẩn',
        'Tài liệu hướng dẫn căn chỉnh bố cục số'
      ],
      gallery: [
        {
          image: 'assets/images/ulibee-campaign-kv.jpg',
          caption: 'Visual tham khảo: Mockup hình ảnh Key Visual trên các ấn phẩm số',
          isReferenceVisual: true
        }
      ]
    }
  }
];

export const getFeaturedProjects = (limit = 4): PortfolioProject[] => {
  return PROJECTS.filter((project) => project.featured).slice(0, limit);
};

export const FEATURED_PROJECTS = getFeaturedProjects(4);

