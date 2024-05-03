import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface SubmenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
}

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  submenus?: SubmenuItem[];
}

interface ExpandableListProps {
  items: MenuItem[];
}

const ExpandableList: React.FC<ExpandableListProps> = ({ items }) => {
  const navigate = useNavigate();
  const [openList, setOpenList] = useState<boolean[]>(
    new Array(items.length).fill(false)
  );

  const handleClick = (index: number) => {
    const newOpenList = [...openList];
    newOpenList[index] = !newOpenList[index];
    setOpenList(newOpenList);
  };

  return (
    <List>
      {items.map((item, index) => (
        <div key={index}>
          <ListItemButton
            onClick={() => {
              if (item.path) {
                navigate(`/${item.path}`);
              } else {
                handleClick(index);
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            {item.submenus &&
              (openList[index] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          {item.submenus && (
            <Collapse in={openList[index]} timeout="auto" unmountOnExit>
              {item.submenus.map((submenu, subIndex) => (
                <ListItemButton
                  key={subIndex}
                  sx={{ pl: 4 }}
                  onClick={() => navigate(`/cadastros/${submenu.path}`)}
                >
                  <ListItemIcon>{submenu.icon}</ListItemIcon>
                  <ListItemText primary={submenu.text} />
                </ListItemButton>
              ))}
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );
};

export default ExpandableList;
