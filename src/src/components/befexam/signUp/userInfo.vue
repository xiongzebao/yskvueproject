 <template>
    <div class="selected-prof">
        <div class="user-info">
            <div class="xMing">
                <div class="minWidrth">姓名：</div>
                <div class="text">{{userName}}</div>
            </div>
            <div class="sFen">
                <div class="minWidrth">省份：</div>
                <div class="text">{{provinceName}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    name: '',
    data() {
        return {
            userName: "",
            provinceName: ""
        }
    },
    mounted() {
        this.userName = yksapp_user.getStdName();
        // this.userName = "一代天骄成";
        this.provinceName = yksapp_user.getStdProvince();
        // this.provinceName = "杭州市杭";
    },
    methods: {
        asd() {
            this.$bus.emit("click");
        }
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lf {
    float: left;
}

.rf {
    float: right;
}

.f-fixed:after {
    content: '\200b';
    display: block;
    height: 0;
    clear: both;
}

.user-info {font-size:.25rem;padding:0rem .1rem;background: #fff;height:.5rem;line-height:.5rem;display:flex;}
.user-info .xMing{flex:1;overflow: hidden;display: flex;align-items: center;}
.user-info .sFen{flex:0.5;overflow: hidden;display: flex;align-items: center;text-align:right;}
.minWidrth{width:.8rem;box-sizing: border-box;}
.user-info .text{color:#5ABEFA;font-style:normal;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;width:calc(100% - 0.9rem);}
</style>
