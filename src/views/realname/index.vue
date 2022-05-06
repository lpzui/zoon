<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-input v-model="query.name" placeholder="姓名/手机号/身份证" class="handle-input mr10"></el-input>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                 <el-select v-model="query.address" placeholder="工种" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                <el-button type="primary" icon="el-icon-search" @click="goInsert">添加人员</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="身份证信息">

                    <template #default="scope">

                         张三
                        <br>
                        民族：汉
                        <br>
                        年龄：29
                        <br>
                        性别：男
                        <br>
                        出生日期：
                        <br>
                        1988-04-15
                        <br>
                        身份证号：3411112235656232
                        <br>
                        籍贯：皖XXXXXXXX
                        <br>
                        地址：皖XXXXXXXX
                        <el-tag >{{ scope.row.state }}</el-tag>
                    </template>


                </el-table-column>
                <el-table-column label="工人项目信息">
                    <template #default="scope">
                        所属项目：核心项目
                        <br>
                        归属公司：XX劳务公司
                        <br>
                        班组：张三的班组
                        <br>
                        归属公司：XX劳务公司
                        <br>
                        工种：制冷工
                        <br>
                        状态：进场
                        <br>
                        进场时间：2020-08-23  06:20
                        <br>
                        是否签署合同：是

                    </template>
                </el-table-column>
                <el-table-column label="实名制基础信息" align="center">
                    <template #default="scope">
                        入册工龄：1年
                        <br>
                        身体状态：健康
                        <br>
                        认证技能：瓦工，木工
                        <br>
                        无不良记录
                        <br>
                        手机号：15689784567

                    </template>
                </el-table-column>
                <el-table-column prop="address" label="当前项目奖惩信息">
                    <template #default="scope">
                        危险操作：-次
                        <br>
                        通报批评：1次
                        <br>
                        违规记录：-次
                        <br>
                        缺勤：5次

                    </template>
                </el-table-column>
                <!-- <el-table-column label="状态" align="center">
                    <template #default="scope">
                        <el-tag :type="
                                scope.row.state === '成功'
                                    ? 'success'
                                    : scope.row.state === '失败'
                                    ? 'danger'
                                    : ''
                            ">{{ scope.row.state }}</el-tag>
                    </template>
                </el-table-column> -->

                <!-- <el-table-column prop="date" label="注册时间"></el-table-column> -->
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-lx-search"
                                   @click="handleDelete(scope.$index, scope.row)">查看</el-button>
                        <br>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <br>
                        <el-button type="text" icon="el-icon-lx-attention"
                                   @click="handleDelete(scope.$index, scope.row)">合同预览</el-button>
                        <br>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../../api/index";
import { useRouter } from "vue-router"  // 引入userRouter
import request from '../../utils/request'

export default {
    name: "realname",
    setup() {

        const router = useRouter();
        const query = reactive({
            address: "",
            name: "",
            pageIndex: 1,
            pageSize: 10,
        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const getData = () => {
            fetchData(query).then((res) => {
                tableData.value = res.list;
                pageTotal.value = res.pageTotal || 50;
            });
            tableData.value= [{state:'成功',date:'2022-04-23'},{state:'失败',date:'2022-04-23'},{state:'成功',date:'2022-04-23'}]
            pageTotal.value =3 || 50;

        };
        getData();

        // 查询操作
        const handleSearch = () => {
            query.pageIndex = 1;
            getData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData();
        };

        // 删除操作
        const handleDelete = (index) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    ElMessage.success("删除成功");
                    tableData.value.splice(index, 1);
                })
                .catch(() => {});
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            name: "",
            address: "",
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
           // editVisible.value = true;
            router.push('/editReal')
        };
        const goInsert = () => {
            router.push('/addReal')
        };
        const saveEdit = () => {
            editVisible.value = false;
            ElMessage.success(`修改第 ${idx + 1} 行成功`);
            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
            });
        };

        return {
            query,
            tableData,
            pageTotal,
            editVisible,
            form,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            goInsert,
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
