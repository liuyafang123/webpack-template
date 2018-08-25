<template>
    <div >
        <el-form>
            <div >
                <h3 >2133131331</h3>
                <el-select  @change="setLanguage">
                        <el-option label="中文" value="zh"></el-option>
                        <el-option label="English" value="en" ></el-option>
                </el-select>
            </div>
        </el-form>
    </div>
</template>

<script>

export default{
    name: 'login',
    data() {
        return {

        }
    },
    methods:{
        setLanguage(lang){
            this.$i18n.locale = lang

        }
    }
}
</script>