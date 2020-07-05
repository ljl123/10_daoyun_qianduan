export function get(data) {
    return JSON.parse(localStorage.getItem(data));
}

export function set(data, dataInfo) {
    return localStorage.setItem(data, JSON.stringify(dataInfo));
}

export function init(dataName) {
    if (get(dataName) == null) {
        set(dataName, []);
    }
    return get(dataName);
}

export function getById(id, dataName) {
    var List = get(dataName);
    for (var i = 0; i < List.length; i++) {
        if (id == List[i].id) {
            return List[i];
        }
    }
    return false;
}

export function delById(id, dataName) {
    var List = get(dataName);
    for (var i = 0; i < List.length; i++) {
        if (id == List[i].id) {
            List.splice(i, 1);
            set(dataName, List);
            return true;
        }
    }
    return false;
}

//user
const userList = 'userList';

export function initUsers() {
    return init(userList);
}

export function insertUser(data) {
    var List = get(userList);
    var initId = -1;
    if (List.length < 1) {
        initId = 1;
    } else {
        for (var i = 0; i < List.length; i++) {
            if (data.phone == List[i].phone)
                return false;
        }
        initId = List[List.length - 1].id + 1;
    }
    let dataInfo = {
        id: initId,
        phone: data.phone,
        email: data.email,
        name: data.name,
        gender: data.gender,
        role: data.role,
        idNumber: data.idNumber
    };
    List.push(dataInfo);
    set(userList, List);
    return true;
}

export function getUserById(id) {
    return getById(id, userList);
}

export function modifyUserById(id, data) {
    var List = get(userList);
    for (var i = 0; i < List.length; i++) {
        if (id == List[i].id) {
            List[i].phone = data.phone;
            List[i].email = data.email;
            List[i].name = data.name;
            List[i].gender = data.gender;
            List[i].role = data.role;
            List[i].idNumber = data.idNumber;
            set(userList, List);
            return true;
        }
    }
    return false;
}

export function delUserById(id) {
    return delById(id, userList);
}


//params
const paramsList = 'paramsList';

export function initParams() {
    return init(paramsList);
}

export function insertParam(data) {
    var List = get(paramsList);
    var initId = -1;
    if (List.length < 1) {
        initId = 1;
    } else {
        for (var i = 0; i < List.length; i++) {
            if (data.English == List[i].English)
                return false;
        }
        initId = List[List.length - 1].id + 1;
    }

    let dataInfo = {
        id: initId,
        Chinese: data.Chinese,
        English: data.English,
        value: data.value
    };
    List.push(dataInfo);
    set(paramsList, List);
    return true;
}

export function getParamById(id) {
    return getById(id, paramsList);
}

export function modifyParamById(id, data) {
    var List = get(paramsList);
    for (var i = 0; i < List.length; i++) {
        if (id == List[i].id) {
            List[i].Chinese = data.Chinese;
            List[i].English = data.English;
            List[i].value = data.value;

            set(paramsList, List);
            return true;
        }
    }
    return false;
}

export function delParamById(id) {
    return delById(id, paramsList);
}


//structure
const structureList = 'structureList';

export function initStructure() {
    const data = [
        {
            title: '学校/学院/专业',
            key: '0',
            children: [
                {
                    title: '福州大学',
                    key: '00',
                    children: [
                        {
                            title: '数学与计算机科学学院',
                            key: '000',
                            children: [
                                { title: '数学专业', key: '0000' },
                                { title: '信息与计算科学专业', key: '0001' },
                                { title: '计算机科学专业', key: '0002' },
                                { title: '信息安全与网络工程专业', key: '0003' },
                                { title: '软件工程专业', key: '0004' },
                            ]
                        },
                        {
                            title: '电气工程与自动化学院',
                            key: '001',
                            children: [
                                { title: '电气工程专业', key: '0010' },
                                { title: '电力工程专业', key: '0011' },
                                { title: '建筑电气专业', key: '0012' },
                                { title: '自动化专业', key: '0013' },
                                { title: '应用电子专业', key: '0014' },
                            ]
                        },
                        {
                            title: '机械工程及自动化学院',
                            key: '002',
                            children: [
                                { title: '机械设计专业', key: '0020' },
                                { title: '机电工程专业', key: '0021' },
                                { title: '材料成型专业', key: '0022' },
                                { title: '车辆工程专业', key: '0023' }
                            ]
                        },

                    ],
                },
                {
                    title: '福建师范大学',
                    key: '01',
                    children: [
                        {
                            title: '数学与信息学院',
                            key: '010',
                            children: [
                                { title: '数学专业', key: '0100' },
                                { title: '统计学专业', key: '0101' },
                                { title: '计算机科学与技术专业', key: '0102' },
                                { title: '软件工程专业', key: '0103' },
                                { title: '网络空间安全专业', key: '0104' },
                            ]
                        }

                    ],
                },
                {
                    title: '福建工程学院',
                    key: '02',
                    children: []
                },
            ],
        }
    ];
    if (get(structureList) == null || get(structureList) == '') {
        set(structureList, data);
    }
    return get(structureList);
}

export function insertStructure(parentKey, data) {
    var tree = get(structureList);
    if (parentKey.length == 1) { //0
        for (var i = 0; i < tree[0].children.length; i++) {
            if (data.title == tree[0].children[i].title)
                return false;
        }

        var p1 = parseInt(tree[0].children[tree[0].children.length - 1].key[1]) + 1;

        let dataInfo = {
            title: data.title,
            key: parentKey + p1,
            children: []
        }

        tree[0].children.push(dataInfo);
        set(structureList, tree);
        return true;
    }

    if (parentKey.length == 2) { //00
        var node1 = tree[0].children[parseInt(parentKey[1])];

        for (var i = 0; i < node1.children.length; i++) {
            if (data.title == node1.children[i].title)
                return false;
        }

        if (node1.children.length > 0) {
            var p2 = parseInt(node1.children[node1.children.length - 1].key[2]) + 1;
        } else {
            var p2 = 0;
        }

        let dataInfo2 = {
            title: data.title,
            key: parentKey + p2,
            children: []
        }

        node1.children.push(dataInfo2);
        // return tree;
        set(structureList, tree);
        return true;
    }

    if (parentKey.length == 3) { //000
        var node2 = tree[0].children[parseInt(parentKey[1])].children[parseInt(parentKey[2])];

        for (var i = 0; i < node2.children.length; i++) {
            if (data.title == node2.children[i].title)
                return false;
        }

        if (node2.children.length > 0) {
            var p3 = parseInt(node2.children[node2.children.length - 1].key[3]) + 1;
        } else {
            var p3 = 0;
        }

        let dataInfo3 = {
            title: data.title,
            key: parentKey + p3,
            children: []
        }

        node2.children.push(dataInfo3);
        set(structureList, tree);
        return true;
    }

    if (parentKey.length > 3) {
        return false;
    }

}

export function getStructureById(selfKey) {
    var tree = get(structureList);
    if (selfKey.length == 1) { //0
        return tree[0];
    }

    if (selfKey.length == 2) { //00
        return tree[0].children[parseInt(selfKey[1])];
    }

    if (selfKey.length == 3) { //000
        return tree[0].children[parseInt(selfKey[1])].children[parseInt(selfKey[2])];
    }

    if (selfKey.length == 4) { //0000
        return tree[0].children[parseInt(selfKey[1])].children[parseInt(selfKey[2])].children[parseInt(selfKey[3])];
    }

    return false;
}

export function modifyStructureById(selfKey, data) {
    var tree = get(structureList);
    var flag = false;

    if (selfKey.length == 1) { //0
        tree[0].title = data.title;
        flag = true;
    }

    if (selfKey.length == 2) { //00
        tree[0].children[parseInt(selfKey[1])].title = data.title;
        flag = true;
    }

    if (selfKey.length == 3) { //000
        tree[0].children[parseInt(selfKey[1])].children[parseInt(selfKey[2])].title = data.title;
        flag = true;
    }

    if (selfKey.length == 4) { //0000
        tree[0].children[parseInt(selfKey[1])].children[parseInt(selfKey[2])].children[parseInt(selfKey[3])].title = data.title;
        flag = true;
    }
    set(structureList, tree);
    return flag;
}

export function delStructureById(selfKey) {
    var tree = get(structureList);
    var flag = false;

    if (selfKey.length == 1) { //0
        tree.splice(parseInt(selfKey[0]), 1);
        flag = true;
    }

    if (selfKey.length == 2) { //00
        tree[0].children.splice(parseInt(selfKey[1]), 1);
        flag = true;
    }

    if (selfKey.length == 3) { //000
        tree[0].children[parseInt(selfKey[1])].children.splice(parseInt(selfKey[2]), 1);
        flag = true;
    }

    if (selfKey.length == 4) { //0000
        tree[0].children[parseInt(selfKey[1])].children[parseInt(selfKey[2])].children.splice(parseInt(selfKey[3]), 1);
        flag = true;
    }
    set(structureList, tree);
    return flag;
}

//menu
const menuList = 'menuList';

const menuData = [
    {
        title: '后台管理系统菜单',
        key: '0',
        url: '',
        children: [
            {
                title: '用户管理',
                key: '00',
                url: '/admin/users',
                children: [],
            },
            {
                title: '课程管理',
                key: '01',
                url: "/admin/lesson",
                children: [],
            },
            {
                title: '角色权限',
                key: '02',
                url: "/admin/role",
                children: []
            },
            {
                title: '字典管理',
                key: '03',
                url: "/admin/dic",
                children: []
            },
            {
                title: '菜单管理',
                key: '04',
                url: "/admin/menu",
                children: []
            },
            {
                title: '系统参数',
                key: '05',
                url: "/admin/params",
                children: []
            },
            {
                title: '组织结构',
                key: '06',
                url: "/admin/structure",
                children: []
            },
        ],
    },
    {
        title: '个人中心',
        key: '1',
        url: "",
        children: [
            {
                title: '修改密码',
                key: '10',
                url: "/admin/resetPwd",
                children: []
            }
        ]
    },
];

export function initMenu() {

    if (get(menuList) == null || get(menuList) == '') {
        set(menuList, menuData);
    }
    return get(menuList);
}

export function getMenu() {
    if (get(menuList) == null || get(menuList) == '') {
        return menuData;
    } else {
        return get(menuList);
    }
}

export function insertMenu(parentKey, data) {
    var tree = get(menuList);
    if (parentKey.length == 1) { //0
        for (var i = 0; i < tree[0].children.length; i++) {
            if (data.title == tree[0].children[i].title)
                return false;
        }

        var p1 = parseInt(tree[0].children[tree[0].children.length - 1].key[1]) + 1;

        let dataInfo = {
            title: data.title,
            key: parentKey + p1,
            url: data.url,
            children: []
        }

        tree[0].children.push(dataInfo);
        set(menuList, tree);
        return true;
    }


    if (parentKey.length > 1) {
        return false;
    }

}

export function modifyMenuById(selfKey, data) {
    var tree = get(menuList);
    var flag = false;

    if (selfKey.length == 1) { //0
        tree[0].title = data.title;
        tree[0].url = data.url;
        flag = true;
    }

    if (selfKey.length == 2) { //00
        tree[0].children[parseInt(selfKey[1])].title = data.title;
        tree[0].children[parseInt(selfKey[1])].url = data.url;
        flag = true;
    }


    set(menuList, tree);
    return flag;
}

export function delMenuById(selfKey) {
    var tree = get(menuList);
    var flag = false;

    if (selfKey.length == 1) { //0
        tree.splice(parseInt(selfKey[0]), 1);
        flag = true;
    }

    if (selfKey.length == 2) { //00
        tree[0].children.splice(parseInt(selfKey[1]), 1);
        flag = true;
    }


    set(menuList, tree);
    return flag;
}


//role


const roleList = 'roleList';

export function initRole() {
    const roleData = [
        {
            id: 1,
            role: "管理员",
            authority: ["用户管理", "课程管理", "系统参数", "组织结构", "菜单管理", "角色权限", "字典管理"]
        }, {
            id: 2,
            role: "教师",
            authority: ["系统参数", "组织结构"]
        }
    ];

    // var List = init(roleList);
    var List = get(roleList);

    if (List == null) {
        set(roleList, roleData);
        List = roleData;
    }
    var l = [];
    var data = '';
    for (var i = 0; i < List.length; i++) {
        data = '';
        if (List[i].authority != null) {
            for (var j = 0; j < List[i].authority.length; j++) {
                data = data + List[i].authority[j] + '；';
            }
        }

        let dataInfo = {
            id: List[i].id,
            role: List[i].role,
            authority: data
        }
        l.push(dataInfo);
    }
    return l;
}

export function insertRole(data) {
    var List = get(roleList);
    var initId = -1;
    if (List.length < 1) {
        initId = 1;
    } else {
        for (var i = 0; i < List.length; i++) {
            if (data.role == List[i].role)
                return false;
        }
        initId = List[List.length - 1].id + 1;
    }
    let dataInfo = {
        id: initId,
        role: data.role,
        authority: data.authority
    };
    List.push(dataInfo);
    set(roleList, List);
    return true;
}

export function getRoleById(id) {
    return getById(id, roleList);
}

export function modifyRoleById(id, data) {
    var List = get(roleList);
    for (var i = 0; i < List.length; i++) {
        if (id == List[i].id) {
            List[i].role = data.role;
            List[i].authority = data.authority;

            set(roleList, List);
            return true;
        }
    }
    return false;
}

export function delRoleById(id) {
    return delById(id, roleList);
}

//dic
const dicList = 'dicList';
const dicInfoList = 'dicInfoList';

export function initDic() {
    const data = [
        {
            id: 1,
            ch: "性别",
            en: "gender",
            describe: "用户性别"
        }

    ];

    const dataInfo = [
        {
            id: 1,
            children: [
                {
                    id: 1,
                    value: '0',
                    texture: '未知',
                    isDefault: 'true'
                }, {
                    id: 2,
                    value: '1',
                    texture: '男',
                    isDefault: 'false'
                }, {
                    id: 3,
                    value: '2',
                    texture: '女',
                    isDefault: 'false'

                }
            ]
        }
    ];

    if (get(dicList) == null || get(dicList) == '') {
        set(dicList, data);
        set(dicInfoList, dataInfo)
    }
    return get(dicList);
}

export function getDicInfoById(id) {
    return getById(id, dicInfoList).children
}
