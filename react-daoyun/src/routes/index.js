import Login from "../pages/Login";
import Index from "../pages/admin/dashboard/Index";
import List from "../pages/admin/users/List";
import Edit from "../pages/admin/users/Edit";
import PageNotFound from "../pages/PageNotFound";
import LessonList from "../pages/admin/lesson/LessonList";
import LessonEdit from "../pages/admin/lesson/Edit";
import ForgotPwd from "../pages/ForgotPwd";

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
    }
]