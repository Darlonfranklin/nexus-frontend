import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShopIcon from "@mui/icons-material/Shop";
import { useState } from "react";
import { ImageL, ImageP, Logo, MyToolBar, Title, TitleVersion } from "./styles";
import CheckIcon from "@mui/icons-material/Check";
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

import ExpandableList from "../List";

const drawerWidth = 290;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "space",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#0089BA",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DrawerMenu({ children }: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  function handleDrawerOpen(): void {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          path: "supplier",
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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open}>
        <MyToolBar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Title>NEXUS</Title>
          <CheckIcon style={{ marginRight: "5px" }} />
          <TitleVersion>version 1.0.0</TitleVersion>
        </MyToolBar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Logo>
          {open ? <ImageP src="/nexus.png" /> : <ImageL src="/logo.png" />}
        </Logo>
        <ExpandableList items={menuPerson} />
        <ExpandableList items={menuMovimentation} />
        <ExpandableList items={menuEmployees} />
        <ExpandableList items={menuPurchases} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, marginTop: 10 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
