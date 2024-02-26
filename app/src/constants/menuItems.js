import Dashboard from "../screens/Dashboard";
import Schedules from "../screens/Schedules";
import Glossary from "../screens/Glossary";
import PeopleDetails from "../screens/PeopleDetails";
import AddPeople from "../screens/AddPeople";
import Messaging from "../screens/Messaging";
import Facilities from "../screens/Facilities";
import WhosOn from "../screens/WhosOn";
import Timecards from "../screens/Timecards";

import DashboardIcon from "../assets/icons/menuIcons/dashboard";
import SchedulesIcon from "../assets/icons/menuIcons/schedules";
import WhosOnIcon from "../assets/icons/menuIcons/whoson";
import PeopleIcon from "../assets/icons/menuIcons/people";
import FacilitiesIcon from "../assets/icons/menuIcons/facilities";
import MessagingIcon from "../assets/icons/menuIcons/messaging";
import TimecardIcon from "../assets/icons/menuIcons/timecard";
import SupportIcon from "../assets/icons/menuIcons/support";
import SettingsIcon from "../assets/icons/menuIcons/settings";
import ReportsIcon from "../assets/icons/menuIcons/reports";
import People from "../screens/People";
import AddShift from "../screens/AddShift";
import AddFacility from "../screens/AddFacility";
import AddTimeCard from "../screens/Timecards/AddTimeCard";
import Reports from "../screens/Reports";
import Support from "../screens/Support";
import Settings from "../screens/Settings";
import AddStaffMember from "../screens/Settings/AddStaffMember";
import Payroll from "../screens/Payroll";
import MyAvailability from "../screens/MyAvailability";
import Marketplace from "../screens/Marketplace";
import TotalBilling from "../screens/TotalBilling";
import Invoices from "../screens/Invoices";

const menuItems = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/",
    element: <Dashboard />,
  },
  {
    name: "Schedule",
    icon: SchedulesIcon,
    path: "/schedules",
    element: <Schedules />,
  },
  {
    name: "My Schedule",
    icon: SchedulesIcon,
    path: "/schedules",
    element: <Schedules />,
  },
  {
    name: "My Availability",
    icon: WhosOnIcon,
    path: "/availability",
    element: <MyAvailability />,
  },
  {
    name: "Marketplace",
    icon: SchedulesIcon,
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    name: "Who's ON",
    icon: WhosOnIcon,
    path: "/whoson",
    element: <WhosOn />,
  },

  {
    name: "People",
    icon: PeopleIcon,
    path: "/people",
    element: <People />,
  },
  {
    name: "Facilities",
    icon: FacilitiesIcon,
    path: "/facilities",
    element: <Facilities />,
  },
  {
    name: "Add Facilities",
    icon: FacilitiesIcon,
    path: "/addFacility",
    element: <AddFacility />,
  },
  {
    name: "Messaging",
    icon: MessagingIcon,
    path: "/messaging",
    element: <Messaging />,
  },
  {
    name: "Timecards",
    icon: TimecardIcon,
    path: "/timecard",
    element: <Timecards />,
  },
  // {
  //   name: "Reports",
  //   icon: ReportsIcon,
  //   path: "/reports",
  //   element: <Reports />,
  // },
  {
    name: "Total Billing",
    icon: ReportsIcon,
    path: "/billing",
    // element: <TotalBilling />,
    element: <Invoices />,
  },
  {
    name: "Invoices",
    icon: ReportsIcon,
    path: "/invoices",
    element: <Invoices />,
  },
  {
    name: "Payroll",
    icon: ReportsIcon,
    path: "/payroll",
    element: <Payroll />,
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    path: "/settings",
    element: <Settings />,
  },

  {
    name: "Support",
    icon: SupportIcon,
    path: "/support",
    element: <Support />,
  },

  {
    name: "Add Shift",
    icon: ReportsIcon,
    path: "/addshift",
    element: <AddShift />,
  },
  {
    name: "Glossary",
    icon: ReportsIcon,
    path: "/glossary",
    element: <Glossary />,
  },
  {
    name: "People Details",
    icon: ReportsIcon,
    path: "/peopleDetails",
    element: <PeopleDetails />,
  },
  {
    name: "Add People",
    icon: ReportsIcon,
    path: "/addPeople",
    element: <AddPeople />,
  },
  {
    name: "Add People",
    icon: ReportsIcon,
    path: "/addTimeCard",
    element: <AddTimeCard />,
  },
  // {
  //   name: "Settings",
  //   icon: ReportsIcon,
  //   path: "/settings",
  //   element: <Settings />,
  // },
  {
    name: "Add Staff Member",
    icon: ReportsIcon,
    path: "/addStaffMember",
    element: <AddStaffMember />,
  },
];

export { menuItems };
