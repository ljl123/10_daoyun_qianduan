import Login from "../pages/Login";
import Index from "../pages/admin/dashboard/Index";
import List from "../pages/admin/users/List";
import Edit from "../pages/admin/users/Edit";
import PageNotFound from "../pages/PageNotFound";
import LessonList from "../pages/admin/lesson/List";
import LessonEdit from "../pages/admin/lesson/Edit";
import DicList from "../pages/admin/dic/List";
import DicEdit from "../pages/admin/dic/Edit";
import DicInfoEdit from "../pages/admin/dic/InfoEdit";
import ParamsList from "../pages/admin/params/List";
import ParamsEdit from "../pages/admin/params/Edit";
import StructureList from "../pages/admin/structure/List";
import StructureNew from "../pages/admin/structure/New";
import StructureEdit from "../pages/admin/structure/Edit";
import MenuList from "../pages/admin/menu/List";
import MenuEdit from "../pages/admin/menu/Edit";
import RoleList from "../pages/admin/role/List";
import RoleEdit from "../pages/admin/role/Edit";
import ResetPwd from "../pages/admin/ResetPwd";
import NoAuth from "../pages/NoAuth";
import { getMenu } from "../utils/data";
import Help from "../pages/Help";


export const mainRoutes = [
    {
        path: "/login",
        component: Login
    },

    {
        path: "/404",
        component: PageNotFound
    },
    {
        path: "/403",
        component: NoAuth
    },
    {
        path: "/help",
        component: Help,
        title: '帮助'
    },
];

export const personRoutes = [
    {
        path: "/admin/resetPwd",
        component: ResetPwd,
        title: getMenu()[1].children[0].title,
        isShow: true,
    }
];

export const adminRoutes = [

    {
        path: "/admin/users",
        component: List,
        exact: true,
        isShow: true,
        title: getMenu()[0].children[0].title
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
        title: getMenu()[0].children[1].title
    },
    {
        path: "/admin/lesson/edit/:id?",
        component: LessonEdit,
        isShow: false,
    },
    // {
    //     path: "/admin/params",
    //     component: ParamsList,
    //     exact: true,
    //     isShow: true,
    //     title: "系统参数"
    // },
    // {
    //     path: "/admin/params/edit/:id?",
    //     component: ParamsEdit,
    //     isShow: false,
    // },
    // {
    //     path: "/admin/structure",
    //     component: StructureList,
    //     exact: true,
    //     isShow: true,
    //     title: "组织结构"
    // },
    // {
    //     path: "/admin/structure/new/:id?",
    //     component: StructureNew,
    //     isShow: false,
    // },
    // {
    //     path: "/admin/structure/edit/:id?",
    //     component: StructureEdit,
    //     isShow: false,
    // },

    {
        path: "/admin/role",
        component: RoleList,
        exact: true,
        isShow: true,
        title: getMenu()[0].children[2].title
    },
    {
        path: "/admin/role/edit/:id?",
        component: RoleEdit,
        isShow: false,
    },
    ,
    {
        path: "/admin/dic",
        component: DicList,
        exact: true,
        isShow: true,
        title: getMenu()[0].children[3].title
    },
    {
        path: "/admin/dic/edit/:id?",
        component: DicEdit,
        isShow: false,
    },
    {
        path: "/admin/dic/infoedit/:id?",
        component: DicInfoEdit,
        isShow: false,
    },
    {
        path: "/admin/menu",
        component: MenuList,
        exact: true,
        isShow: true,
        title: getMenu()[0].children[4].title
    },
    {
        path: "/admin/menu/edit/:id?",
        component: MenuEdit,
        isShow: false,
    },
];
export const teRoutes = [
    {
        path: "/admin/params",
        component: ParamsList,
        exact: true,
        isShow: true,
        title: getMenu()[0].children[5].title
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
        title: getMenu()[0].children[6].title
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
];

