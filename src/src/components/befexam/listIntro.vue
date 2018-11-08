<template>
	<div id="listIntro">
		<mt-header fixed title="成绩详情">
			<router-link to="/Firstest" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<ul class="grade">
		    <li>
		        <div class="grade-base"><span>姓</span><span>名:</span></div>
		        <div class='grade-note'>{{data.xingMing}}</div>
		    </li>
			<li>
                <div class="grade-base"><span>性</span><span>别:</span></div>
                <div class='grade-note'>{{data.xingBie}}</div>
			</li>
			<li>
			    <div class="grade-base">
                    <span>证</span>
                    <span>件</span>
                    <span>号</span>
                    <span>码:</span>
			    </div>
			    <div class='grade-note grade-specil'>{{data.shenFenZH}}</div>
			 </li>
			 <li>
			    <div class="grade-base">
			        <span>准</span>
                    <span>考</span>
                    <span>证</span>
                    <span>号:</span>
                </div>
			    <div class='grade-note grade-specil'>{{data.zhunKaoZH}}</div>
			 </li>
			 <li>
			    <div class="grade-base"><span>院</span><span>校:</span></div>
			    <div class='grade-note'>{{data.xueXiaoMC}}</div>
			 </li>
			 <li>
			    <div class="grade-base"><span>考</span><span>点:</span></div>
			    <div class='grade-note'>{{data.kaoDianMC}}</div>
			 </li>
			 <li>
			    <div class="grade-base"><span>专</span><span>业:</span></div>
			    <div class='grade-note'>{{data.zhuanYeMC}}</div>
			 </li>
			<li>
                <div class="grade-base">
                    <span>考</span>
                    <span>试</span>
                    <span>时</span>
                    <span>间:</span></div>
                <div class='grade-note'>{{data.kaoShiRQStr}}</div>
			</li>
			<li>
                <div class="grade-base">
                    <span>复</span>
                    <span>试</span>
                    <span>说</span>
                    <span>明:</span>
                </div>
                <div class='grade-note'>{{data.fuShiSM}}</div>
			</li>
			<li>
                <div class="grade-base">
                    <span>总</span>
                    <span>成</span>
                    <span>绩:</span>
                </div>
                <div class='grade-note'>{{data.zongCJ}}</div>
			</li>
			<li>
                <div class="grade-base">
                    <span>合</span>
                    <span>格</span>
                    <span>标</span>
                    <span>志:</span>
                </div>
                <div class='grade-note'>{{data.passStr}}</div>
			</li>
			<li v-if="data.keMu1MC">
			    <div class="grade-base"> 
                    <span>科</span>
                    <span>目</span>
                    <span>1</span>
                    <span>名</span>
                    <span>称:</span></div>
			    <div class='grade-note'>{{data.keMu1MC}}</div>
			 </li>
			 <li v-if="data.keMu1MC">
			    <div class="grade-base">
			        <span>科</span>
                    <span>目</span>
                    <span>1</span>
                    <span>成</span>
                    <span>绩:</span>
                 </div>
			    <div class='grade-note'>{{data.keMu1}}</div>
			 </li>
			 <li v-if="data.keMu2MC">
			    <div class="grade-base">
			        <span>科</span>
                    <span>目</span>
                    <span>2</span>
                    <span>名</span>
                    <span>称:</span>
			    </div>
			    <div class='grade-note'>{{data.keMu2MC}}</div>
			 </li>
			 <li v-if="data.keMu2MC">
			    <div class="grade-base">
			        <span>科</span>
                    <span>目</span>
                    <span>2</span>
                    <span>成</span>
                    <span>绩:</span>
                </div>
			    <div class='grade-note'>{{data.keMu2}}</div>
			 </li>
			 <li v-if="data.keMu3MC">
                <div class="grade-base">
                    <span>科</span>
                    <span>目</span>
                    <span>3</span>
                    <span>名</span>
                    <span>称:</span>
                </div>
                <div class='grade-note'>{{data.keMu3MC}}</div>
			</li>
			<li v-if="data.keMu3MC">
                <div class="grade-base">
                    <span>科</span>
                    <span>目</span>
                    <span>3</span>
                    <span>成</span>
                    <span>绩:</span>
                </div>
                <div class='grade-note'>{{data.keMu3}}</div>
			</li>
			<li v-if="data.keMu4MC">
                <div class="grade-base">
                    <span>科</span>
                    <span>目</span>
                    <span>4</span>
                    <span>名</span>
                    <span>称:</span>
                </div>
                <div class='grade-note'>{{data.keMu4MC}}</div>
			</li>
			<li v-if="data.keMu4MC">
                <div class="grade-base">
                    <span>科</span>
                    <span>目</span>
                    <span>4</span>
                    <span>成</span>
                    <span>绩:</span>
                </div>
                <div class='grade-note'>{{data.keMu4}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name: "listIntro",
		created() {
			this.fixdata(this.$route.params.id)
		},
		data() {
			return {
				data: ""
			}
		},
		methods: {
			fixdata: function(id) {
				var data = {
					id: id
				};
				var that = this;
				ajaxMethod.doAjax("befexam,/api/m/auth/apply/query_exam_achievedetail.htm", data, function(database) {
					if(database.success) {
						that.data = database.datas.obj;
						console.log(that.data)
					} else {
						Toast({
							message: database.message,
							position: 'middle',
							duration: 5000
						});
					}
				})
			}
		}
	}
</script>

<style scoped>
#listIntro {
		width: 100%;
		background: #fff;
        padding-bottom: 20px;
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
	}
	
	#listIntro .grade {
		padding: 0.8rem 10px 0 10px;
	}
    #listIntro .grade li{
        padding:8px 0;
        display: flex;
        align-items:center;
        font-size: 0.25rem;
        border-bottom: 1px double #ededed;
		color: #787878;
    }
    #listIntro .grade .grade-base{
        flex-shrink: 0;
        width:1.4rem;
        display: flex;
        justify-content: space-between;
    }
    #listIntro .grade .grade-note{
        flex-grow: 1;
        word-break: break-all;
        padding-left: 10px;
        color: #0d0d0d;
    }
    #listIntro .grade .grade-specil{
        color: #ffa90d;
    }
</style>