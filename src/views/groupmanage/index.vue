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
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-search" @click="goInsert">添加班组</el-button>

            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="班组名称"></el-table-column>
                <el-table-column label="班组负责人">
                    <template #default="scope">{{ scope.row.leader }}</template>
                </el-table-column>
                <el-table-column prop="attach" label="进场附件"></el-table-column>
                <el-table-column prop="inputDate" label="进场时间"></el-table-column>
                <el-table-column prop="outDate" label="出场时间"></el-table-column>
                <el-table-column prop="createUser" label="创建人"></el-table-column>
                <el-table-column prop="createDate" label="创建时间"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-lx-search"
                                   @click="handleDelete(scope.$index, scope.row)">查看</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
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
import { useRouter } from "vue-router";

export default {
    name: "grouupList",
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
            tableData.value = [{id:1,name:'张三',leader:'王老五',attach:'合同',inputDate:'2021-08-01',outDate:'2022-10-01',createUser:'admin',createDate:'2021-08-01',remark:'士大夫'}
                                ,{id:1,name:'张三',leader:'王老五',attach:'合同',inputDate:'2021-08-01',outDate:'2022-10-01',createUser:'admin',createDate:'2021-08-01',remark:'士大夫'}];
            pageTotal.value = 3;
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
            router.push('/groupUpdate')
            // idx = index;
            // Object.keys(form).forEach((item) => {
            //     form[item] = row[item];
            // });
            // editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
            ElMessage.success(`修改第 ${idx + 1} 行成功`);
            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
            });
        };
        const goInsert = () =>{
            router.push('/groupAdd')
        }
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
