import {
  ContactEmergency,
  Dashboard,
  ExitToAppOutlined,
  GroupAdd,
  ManageAccountsOutlined,
  PersonAddAlt,
} from "@mui/icons-material";

export const menuList = [
  {
    id: 1,
    item: "Dashboard",
    icon: Dashboard,
    pageHref: "/dashboard",
  },
  {
    id: 3,
    item: "User Management",
    icon: GroupAdd,
    // pageHref: "/user",
    child: [
      {
        id: 1,
        item: "Users",
        icon: PersonAddAlt,
        pageHref: "user/users",
      },
      {
        id: 3,
        item: "Role",
        icon: ManageAccountsOutlined,
        pageHref: "user/roles",
      },
    ],
  },

  {
    id: 7,
    item: "Profile",
    icon: ContactEmergency,
    pageHref: "profile",
  },

  {
    id: 10,
    item: "Log out",
    icon: ExitToAppOutlined,
    logout: true,
  },
];
