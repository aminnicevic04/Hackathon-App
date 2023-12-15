import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const SidebarData = [
  {
    id: "s1",
    title: "Dashboard",
    icon: <DashboardIcon style={{ color: "#fff", fontSize: "19px" }} />,
    href: "/",
  },
  {
    id: "s2",
    title: "Profile",
    icon: <PersonIcon style={{ color: "#fff", fontSize: "19px" }} />,
    href: "/profile",
  },
  {
    id: "s3",
    title: "Sign In",
    icon: <LockOpenIcon style={{ color: "#fff", fontSize: "19px" }} />,
    href: "/login",
  },
  {
    id: "s4",
    title: "Sign Up",
    icon: <AddBoxIcon style={{ color: "#fff", fontSize: "19px" }} />,
    href: "/signup",
  },
];
