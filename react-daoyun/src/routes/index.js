import Login from "../pages/Login";
import Index from "../pages/admin/dashboard/Index";
import List from "../pages/admin/users/List";
import Edit from "../pages/admin/users/Edit";
import PageNotFound from "../pages/PageNotFound";
import LessonList from "../pages/admin/lesson/LessonList";
import LessonEdit from "../pages/admin/lesson/Edit";
import ForgotPwd from "../pages/ForgotPwd";
import genderDicList from "../pages/admin/dic/gender/gender_List";
import genderDicEdit from "../pages/admin/dic/gender/gender_Edit";
import collegeDicList from "../pages/admin/dic/college/college_List";
import collegeDicEdit from "../pages/admin/dic/college/college_Edit";
import ParamsList from "../pages/admin/params/List";
import ParamsEdit from "../pages/admin/params/Edit";
import StructureList from "../pages/admin/structure/List";
import StructureNew from "../pages/admin/structure/New";
import StructureEdit from "../pages/admin/structure/Edit";
import MenuList from "../pages/admin/menu/List";
import MenuEdit from "../pages/admin/menu/Edit";
import RoleList from "../pages/admin/role/List";
import RoleEdit from "../pages/admin/role/Edit";

export const mainRoutes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/forgotPwd",
        component: ForgotPwd
    },
    {
        path: "/404",
        component: PageNotFound
    }
];

export const adminRoutes = [
    {
        path: "/admin/dashboard",
        component: Index,
        isShow: true,
        title: "看板"
    },
    {
        path: "/admin/users",
        component: List,
        exact: true,
        isShow: true,
        title: "用户管理"
    },
    {
        path: "/admin/users/edit/:id?",
        component: Edit,
        isShow: false,
    },
    {
        path: "/admin/lesson",
        component: LessonList,
        exact: true,
        isShow: true,
        title: "课程管理"
    },
    {
        path: "/admin/lesson/edit/:id?",
        component: LessonEdit,
        isShow: false,
    },
    {
        path: "/admin/params",
        component: ParamsList,
        exact: true,
        isShow: true,
        title: "系统参数"
    },
    {
        path: "/admin/params/edit/:id?",
        component: ParamsEdit,
        isShow: false,
    },
    {
        path: "/admin/structure",
        component: StructureList,
        exact: true,
        isShow: true,
        title: "组织结构"
    },
    {
        path: "/admin/structure/new/:id?",
        component: StructureNew,
        isShow: false,
    },
    {
        path: "/admin/structure/edit/:id?",
        component: StructureEdit,
        isShow: false,
    },
    {
        path: "/admin/menu",
        component: MenuList,
        exact: true,
        isShow: true,
        title: "菜单管理"
    },
    {
        path: "/admin/menu/edit/:id?",
        component: MenuEdit,
        isShow: false,
    },
    {
        path: "/admin/role",
        component: RoleList,
        exact: true,
        isShow: true,
        title: "角色权限"
    },
    {
        path: "/admin/role/edit/:id?",
        component: RoleEdit,
        isShow: false,
    },
];
export const dicRoutes = [
    {
        path: "/admin/dic/gender",
        component: genderDicList,
        exact: true,
        isShow: true,
        title: "性别管理"
    },
    {
        path: "/admin/dic/gender/edit/:id?",
        component: genderDicEdit,
        isShow: false,
    },
    {
        path: "/admin/dic/college",
        component: collegeDicList,
        exact: true,
        isShow: true,
        title: "学校管理"
    },
    {
        path: "/admin/dic/college/edit/:id?",
        component: collegeDicEdit,
        isShow: false,
    }
]
