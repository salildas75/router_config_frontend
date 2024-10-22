import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { CircleOutlined, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Tooltip, Zoom } from "@mui/material";
import { menuList } from "./data";
import { useLocation, useNavigate } from "react-router-dom";
import { ROLE_LIST } from "../constants/constant";

function Sidemenu({ open = false, mainProps }) {
  const location = useLocation();
  const activeTab =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const activeTabChild = location.pathname.split("/").slice(-2).join("/");

  const router = useNavigate();

  const [isCollapse, setIsCollapse] = useState({});

  const handleCollapse = (id) => {
    setIsCollapse((prev) => ({
      // ...prev,  //if need all collapse at a time
      [id]: !prev[id],
    }));
  };

  // dynamic featurelist checking
  const isItemInList = (item) => mainProps?.featureList?.includes(item);

  let filteredMenuList = menuList.reduce((acc, menuItem) => {
    if (isItemInList(menuItem.item) || menuItem.item === "Log out") {
      acc.push(menuItem);
    } else if (menuItem.child) {
      const filteredChildItems = menuItem.child.filter((childItem) =>
        isItemInList(childItem.item)
      );
      if (filteredChildItems.length > 0) {
        const parentItemCopy = { ...menuItem, child: filteredChildItems };
        acc.push(parentItemCopy);
      }
    }
    return acc;
  }, []);

  if (mainProps?.featureList[0] === ROLE_LIST.admin) {
    filteredMenuList = menuList;
  }

  return (
    <List>
      {filteredMenuList.map((menu, index) => (
        <Box key={menu.id}>
          <Tooltip
            title={open ? null : menu.item}
            placement="right"
            arrow
            TransitionComponent={Zoom}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -8],
                    },
                  },
                ],
              },
            }}
          >
            <ListItem
              key={menu.id}
              disablePadding
              onClick={() => menu.child && handleCollapse(menu.id)}
              alignItems="center"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1.5,
                  bgcolor: menu.pageHref === activeTab ? "#D9D9D940" : null,
                }}
                onClick={() =>
                  (menu?.logout && mainProps?.handleLogout()) ||
                  router(menu.pageHref)
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : "auto",
                    ml: "auto",
                    justifyContent: "center",
                  }}
                >
                  <menu.icon color="surface1" />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={menu.item}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                )}
                {open &&
                  menu?.child &&
                  (isCollapse[menu.id] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
          </Tooltip>

          {/* for sub sidebar */}
          {menu?.child?.map((childMenu, i) => (
            <Collapse
              key={childMenu.id}
              in={isCollapse[menu.id]}
              timeout="auto"
              unmountOnExit
              sx={{
                backgroundColor: "#320b03",
              }}
            >
              <Tooltip
                title={open ? null : childMenu.item}
                placement="right"
                arrow
                TransitionComponent={Zoom}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -8],
                        },
                      },
                    ],
                  },
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: open ? 3 : "auto",
                      bgcolor:
                        childMenu.pageHref === activeTabChild
                          ? "#D9D9D940"
                          : null,
                    }}
                    onClick={() => router(childMenu.pageHref)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        ml: "auto",
                        justifyContent: "center",
                      }}
                    >
                      <childMenu.icon color="surface1" />
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        primary={childMenu.item}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </Collapse>
          ))}
        </Box>
      ))}
    </List>
  );
}

export default Sidemenu;
