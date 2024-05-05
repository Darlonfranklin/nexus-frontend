import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import {
  DateView,
  Exit,
  HourView,
  ImageL,
  ImageP,
  Logo,
  MyToolBar,
  Separator,
  Title,
  TitleVersion,
} from "./styles";
import CheckIcon from "@mui/icons-material/Check";
import ExpandableList from "../List";

import { useAuth } from "../../contexts/auth";
import { menusItems } from "../../menus";
import Modal from "../Dialog";
import {
  CalendarMonthOutlined,
  Logout,
  QueryBuilder,
} from "@mui/icons-material";

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
  const { signOut } = useAuth();

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  function handleDrawerOpen(): void {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = String(now.getFullYear());
      setTime(`${hours}:${minutes}:${seconds}`);
      setDate(`${day}/${month}/${year}`);
    });

    return () => clearInterval(interval);
  }, []);

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
          <Modal
            text={"Deseja realmente sair do sistema ?"}
            handleClose={signOut}
            open={openModal}
            cancel={handleClose}
          />
          <QueryBuilder style={{ marginRight: "5px", fontSize: 18 }} />
          <HourView>Hora: {time}</HourView>
          <Separator>|</Separator>
          <CalendarMonthOutlined style={{ marginRight: "5px", fontSize: 18 }} />
          <DateView>Data: {date}</DateView>
          <Separator>|</Separator>
          <Exit onClick={handleClickOpen}>
            <Logout style={{ marginRight: "5px", fontSize: 18 }} />
            Sair
          </Exit>
          <Separator>|</Separator>
          <CheckIcon style={{ marginRight: "5px", fontSize: 18 }} />
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
        {menusItems.map((menu: any, subIndex: any) => (
          <ExpandableList key={subIndex} items={menu} />
        ))}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, marginTop: 10 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
