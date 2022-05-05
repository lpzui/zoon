<template>
    <div>
        <div class="crumbs">
<!--            <el-breadcrumb separator="/">-->
<!--                <el-breadcrumb-item>-->
<!--                    <i class="el-icon-lx-calendar"></i>实名制-->
<!--                </el-breadcrumb-item>-->
<!--                <el-breadcrumb-item>编辑</el-breadcrumb-item>-->
<!--            </el-breadcrumb>-->
        </div>
        <div class="container">
            <div>
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-row :gutter="20" class="mgb60">
                        <el-col :span="8">
                            <h3>身份证信息</h3>
                        </el-col>
                        <el-col :span="8">
                            <h3>工人项目信息</h3>
                        </el-col>
                        <el-col :span="8">
                            <h3>实名制基础信息</h3>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="mgb60">
                        <el-col :span="8">
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="民族" prop="region">
                                <el-input v-model="form.region"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="sex">
                                <el-input v-model="form.sex"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄" prop="age">
                                <el-input v-model="form.age"></el-input>
                            </el-form-item>
                            <el-form-item label="出生日期" prop="bart">
                                <el-input v-model="form.bart"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号" prop="idcode">
                                <el-input v-model="form.idcode"></el-input>
                            </el-form-item>
                            <el-form-item label="籍贯" prop="jigaun">
                                <el-input v-model="form.jigaun"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" prop="address">
                                <el-input v-model="form.address"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">

                            <el-form-item label="所属项目" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="归属公司" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="班组" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="是否班组长" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="工种" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="工人类型" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="状态" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="进场时间" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="退场时间" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="是否有合同" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">

                            <el-form-item label="入册工龄" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="认证技能" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="身体状态" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            无不良记录
                            <el-form-item label="手机号" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">

                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">表单提交</el-button>
                                <el-button @click="onReset">重置表单</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>

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
        const options = [
            {
                value: "guangdong",
                label: "广东省",
                children: [
                    {
                        value: "guangzhou",
                        label: "广州市",
                        children: [
                            {
                                value: "tianhe",
                                label: "天河区",
                            },
                            {
                                value: "haizhu",
                                label: "海珠区",
                            },
                        ],
                    },
                    {
                        value: "dongguan",
                        label: "东莞市",
                        children: [
                            {
                                value: "changan",
                                label: "长安镇",
                            },
                            {
                                value: "humen",
                                label: "虎门镇",
                            },
                        ],
                    },
                ],
            },
            {
                value: "hunan",
                label: "湖南省",
                children: [
                    {
                        value: "changsha",
                        label: "长沙市",
                        children: [
                            {
                                value: "yuelu",
                                label: "岳麓区",
                            },
                        ],
                    },
                ],
            },
        ];
        const rules = {
            // name: [
            //     { required: true, message: "请输入表单名称", trigger: "blur" },
            // ],
        };
        const formRef = ref(null);
        const form = reactive({
            name: "张三",
            region: "汉",
            sex: "男",
            age: "19",
            bart: "1994-02-09",
            idcode: "34252352435345",
            jiguan: "湖南省长沙市望城区",
            address: "湖南省长沙市望城区",
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

        return {
            options,
            rules,
            formRef,
            form,
            onSubmit,
            onReset,
        };
    },
};
</script>
