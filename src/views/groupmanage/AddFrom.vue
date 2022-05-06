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

                <el-tabs v-model="message" >
                    <el-tab-pane :label="`班组信息`" >
                        <div class="form-box">
                        <el-form ref="formRef" :rules="rules" :model="form" label-width="100px">
                            <el-form-item label="班组名称" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="班组负责人" prop="leader">
                                <el-select v-model="form.leader" placeholder="请选择">
                                    <el-option key="bbk" label="张三" value="bbk"></el-option>
                                    <el-option key="xtc" label="里斯" value="xtc"></el-option>
                                    <el-option key="imoo" label="王五" value="imoo"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属公司" prop="company">
                                <el-select v-model="form.company" placeholder="请选择">
                                    <el-option key="bbk" label="张三的公司" value="bbk"></el-option>
                                    <el-option key="xtc" label="翰南科技" value="xtc"></el-option>
                                    <el-option key="imoo" label="其他公司" value="imoo"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="进场时间">
                                <el-date-picker type="date" placeholder="进场时间" v-model="form.inputDate"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="退场时间">
                                <el-date-picker type="date" placeholder="进场时间" v-model="form.outDate"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="备注" prop="remark">
                                <el-input type="textarea" rows="5" v-model="form.remark"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">表单提交</el-button>
                                <el-button @click="onReset">重置表单</el-button>
                            </el-form-item>
                        </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="`班组人员`"  >
                        <el-checkbox-group v-model="form.type">

                            <el-checkbox label="全选" name="type">
                            </el-checkbox>
                            <el-button type="primary" icon="el-icon-delete" @click="goInsert">删除</el-button>
                            <el-button type="primary" icon="el-icon-search" @click="openAppend">添加</el-button>
                        </el-checkbox-group>
                        <div>
                            <el-checkbox-group v-model="form.type">

                        <el-row :gutter="20">
                            <el-col :span="4" body-style="{ width: '200px' }" v-for="(o, index) in 10" :key="o" :offset="index > 0 ? 2 : 0">
                                <el-checkbox :label="o" :name="o">
                                <el-card :body-style="{ padding: '0px' }">
                                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                                    <div style="padding: 14px;">
                                        <span>好吃的汉堡</span>
                                        <div class="bottom clearfix">
                                            <time class="time">{{ currentDate }}</time>
                                            <el-button type="text" class="button">操作按钮</el-button>
                                        </div>
                                    </div>
                                </el-card>
                                </el-checkbox>
                            </el-col>
                        </el-row>

                            </el-checkbox-group>
                        </div>
                    </el-tab-pane>

                </el-tabs>
            <!-- 添加弹出框 -->
            <el-dialog title="编辑" v-model="appendVisible" width="70%">
                <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="leader" label="班组负责人"></el-table-column>
                    <el-table-column prop="createUser" label="创建人"></el-table-column>
                    <el-table-column prop="createDate" label="创建时间"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                </el-table>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="appendVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
                </template>
            </el-dialog>

        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
export default {
    name: "baseform",
    setup() {
        const appendVisible = ref(false);
        const tableData = ref([{name:'张三'}]);
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

        const openAppend = () =>{
            appendVisible.value = true;
        }

        const saveEdit = () =>{

        }

        return {
            options,
            rules,
            formRef,
            form,
            appendVisible,
            tableData,
            onSubmit,
            onReset,
            openAppend,
            saveEdit,
        };
    },
};
</script>
<style>
    .el-col-offset-2 {
        margin-left: 0%;
    }
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
