import PersonIcon from "@mui/icons-material/Person";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShopIcon from "@mui/icons-material/Shop";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import WidgetsIcon from "@mui/icons-material/Widgets";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ArchiveIcon from "@mui/icons-material/Archive";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DescriptionIcon from "@mui/icons-material/Description";
import BadgeIcon from "@mui/icons-material/Badge";
import { Dashboard } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const menuDashboard = [
  {
    text: "Gerenciamento",
    icon: <BarChartIcon />,
    submenus: [
      {
        text: "Dashboard",
        path: "dashboard",
        icon: <Dashboard />,
      },
      {
        text: "Relatórios",
        path: "dashboard",
        icon: <DocumentScannerIcon />,
      },
    ],
  },
];

const menuPerson = [
  {
    text: "Cadastros básicos",
    icon: <PersonIcon />,
    submenus: [
      {
        text: "Cadastro de cliente",
        path: "cliente",
        icon: <PersonIcon />,
      },
      {
        text: "Cadastro de fornecedor",
        path: "fornecedor",
        icon: <ContactPhoneIcon />,
      },
    ],
  },
];

const menuPurchases = [
  {
    text: "Pedidos",
    icon: <ShoppingBasketIcon />,
    submenus: [
      { text: "Pedido / compra", path: "", icon: <ShopIcon /> },
      {
        text: "Pedido / venda",
        path: "",
        icon: <ProductionQuantityLimitsIcon />,
      },
      { text: "Produtos", path: "", icon: <ShoppingCartIcon /> },
    ],
  },
];

const menuEmployees = [
  {
    text: "Func / Pagamentos",
    icon: <EngineeringIcon />,
    submenus: [
      { text: "Folha de Pagamento", path: "", icon: <DescriptionIcon /> },
      { text: "Funcionários", path: "", icon: <BadgeIcon /> },
    ],
  },
];

const menuMovimentation = [
  {
    text: "Movimentações",
    icon: <RocketLaunchIcon />,
    submenus: [
      {
        text: "Lança / Contabeis",
        path: "cliente",
        icon: <AccountBalanceWalletIcon />,
      },
      {
        text: "Movimento de Estoque",
        path: "supplier",
        icon: <WidgetsIcon />,
      },
      {
        text: "Contas Receber",
        path: "supplier",
        icon: <UnarchiveIcon />,
      },
      {
        text: "Contas Pagar",
        path: "supplier",
        icon: <ArchiveIcon />,
      },
      {
        text: "Fluxo de caixa",
        path: "supplier",
        icon: <MarkunreadMailboxIcon />,
      },
    ],
  },
];

const menuConfigurations = [
  {
    text: "Configurações",
    icon: <SettingsIcon />,
  },
];

const menuAssistant = [
  {
    text: "Assistência",
    icon: <HeadsetMicIcon />,
  },
];

export const menusItems = [
  menuDashboard,
  menuPerson,
  menuEmployees,
  menuMovimentation,
  menuPurchases,
  menuConfigurations,
  menuAssistant,
];
