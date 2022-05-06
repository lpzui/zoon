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

                公司名称<el-input v-model="query.name" placeholder="公司名称" class="handle-input mr10"></el-input>
                分包类型<el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="类型一" value="类型一"></el-option>
                    <el-option key="2" label="类型二" value="类型二"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="公司名称"></el-table-column>
                <el-table-column prop="leader" label="负责人"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="content" label="分包内容"></el-table-column>
                <el-table-column prop="content" label="资质文件">
                    <template #default="scope">￥{{ scope.row.content }}</template>
                </el-table-column>
                <el-table-column prop="address" label="注册地址"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
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
                <el-form-item label="公司名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="form.leader"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.leader"></el-input>
                </el-form-item>
                <el-form-item label="资质文件">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="资质文件">
                    <el-input type="textarea" rows="5" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="注册地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="开户银行">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="纳税人识别号">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" rows="5" v-model="form.remark"></el-input>
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

export default {
    name: "basetable",
    setup() {
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
            tableData.value = [{id:'1' , name:'合同一',leader:'王富贵',phone:1567896785,content:'士大夫士大夫',address:'湖南省长沙市望城区'}]
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
            editVisible.value = true;
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
