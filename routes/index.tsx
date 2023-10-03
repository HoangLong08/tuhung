import ChartIcon from './icons/ChartIcon';
import AboutIcon from './icons/AboutIcon';
import ConstructionIcon from './icons/ConstructionIcon';
import ContactIcon from './icons/ContactIcon';
import InfoContactIcon from './icons/InfoContactIcon';
import NewsIcon from './icons/NewsIcon';
import PartnerIcon from './icons/PartnerIcon';
import ProductIcon from './icons/ProductIcon';
import ProductTypeIcon from './icons/ProductTypeIcon';
import SlideHomeIcon from './icons/SlideHomeIcon';
import SideThumbIcon from './icons/SlideThumbIcon';
import TypeNew from './icons/TypeNewIcon';
import ConstructionTypeIcon from './icons/ConstructionTypeIcon';
import InfoAddressIcon from './icons/InfoAddressIcon';

const routes = [
  {
    label: 'Thống kê',
    key: 'tk',
    url: '/admin/thong-ke',
    icon: ChartIcon,
  },
  {
    label: 'Về chúng tôi',
    key: 'gt',
    url: '/admin/ve-chung-toi',
    icon: AboutIcon,
  },
  {
    label: 'Loại tin tức',
    key: 'loai',
    url: '/admin/loai-tin-tuc',
    icon: TypeNew,
  },
  {
    label: 'Tin tức',
    key: 'tt',
    url: '/admin/tin-tuc',
    icon: NewsIcon,
  },
  {
    label: 'Loại sản phẩm',
    key: 'lsp',
    url: '/admin/loai-san-pham',
    icon: ProductTypeIcon,
  },
  {
    label: 'Sản phẩm',
    key: 'sp',
    url: '/admin/san-pham',
    icon: ProductIcon,
  },
  {
    label: 'Liên hệ - tuyển dụng',
    key: 'td',
    url: '/admin/quan-ly-tuyen-dung',
    icon: ContactIcon,
  },
  {
    label: 'Thông tin công ty',
    key: 'ttk',
    url: '/admin/thong-tin-khac',
    icon: InfoContactIcon,
  },
  {
    label: 'Slide ảnh trang chủ',
    key: 'slide-tc',
    url: '/admin/slide-anh-trang-chu',
    icon: SlideHomeIcon,
  },
  {
    label: 'Slide ảnh Thumbnail',
    key: 'slide-th',
    url: '/admin/slide-anh-thumbnail',
    icon: SideThumbIcon,
  },
  {
    label: 'Địa chỉ chi nhánh',
    key: 'ttlh',
    url: '/admin/thong-tin-lien-he',
    icon: InfoAddressIcon,
  },
  {
    label: 'Loại công trình',
    key: 'lct',
    url: '/admin/loai-cong-trinh',
    icon: ConstructionTypeIcon,
  },
  {
    label: 'Công trình trọng điểm',
    key: 'cttd',
    url: '/admin/cong-trinh-trong-diem',
    icon: ConstructionIcon,
  },
  {
    label: 'Đối tác',
    key: 'dt',
    url: '/admin/doi-tac',
    icon: PartnerIcon,
  },
];

export default routes;
