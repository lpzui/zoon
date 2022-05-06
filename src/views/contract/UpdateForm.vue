<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box" >
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="合同名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="合同类型" prop="type">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属企业" prop="company">
                        <el-select v-model="form.company" placeholder="请选择">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合同时间">
                        <el-date-picker
                                v-model="form.date"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="签署公司" prop="company">
                        <el-select v-model="form.company" placeholder="请选择">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                        <el-table-column prop="name" label="合同名称"></el-table-column>
                        <el-table-column label="合同类型">
                            <template #default="scope">{{ scope.row.type }}</template>
                        </el-table-column>
                        <el-table-column prop="company" label="所属公司"></el-table-column>
                        <el-table-column label="操作" width="210" align="center">
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

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button @click="onReset">重置表单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref } from "vue";
    import { ElMessage } from "element-plus";
    export default {
        name: "baseform",
        setup() {
            const tableData = ref([{name:'劳务派遣合同', type:'第三方制', company:'翰南科技',date:'2022-08-11',createUser:'admin', state:'有效'}]);

            const options = [

            ];
            const rules = {
                name: [
                    { required: true, message: "请输入表单名称", trigger: "blur" },
                ],
            };
            const formRef = ref(null);
            const form = reactive({
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: true,
                type: ["步步高"],
                resource: "小天才",
                desc: "",
                options: [],
            });
            // 提交
            const onSubmit = () => {
                // 表单校验
                formRef.value.validate((valid) => {
                    if (valid) {
                        console.log(form);
                        ElMessage.success("提交成功！");
                    } else {
                        return false;
                    }
                });
            };
            // 重置
            const onReset = () => {
                formRef.value.resetFields();
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


            return {
                options,
                rules,
                formRef,
                form,
                tableData,
                onSubmit,
                onReset,
                handleDelete,
            };
        },
    };
</script>
