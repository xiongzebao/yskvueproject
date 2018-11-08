import { MessageBox } from 'mint-ui';
import Index from '@/components/index.vue';
const routeList=[
		{
            path: '/',
            name: 'Index',
            component:Index,
            beforeEnter(to,from,next){
              if(from.path=='/Inforperfect'){
                let baseChang='';
                if(window.yksapp){
                    baseChang=yksapp.getValueByKey("h5baseintroChange"); 
                }else{
                    baseChang=localStorage.getItem("h5baseintroChange");  
                }
                if(baseChang!='change'){
					
                    next();
                    return ;
                }
                MessageBox({
                    title: '温馨提示',
                    message: '您修改了基本信息,是否确定退出?',
                    showCancelButton: true
                }).then(action => {
                    if(action=='cancel'){
                        next(false);
                     }else{            
                        if(window.yksapp){
                           yksapp.setKeyValue("h5baseintroChange",'nochange');
                        }else{
                           localStorage.setItem("h5baseintroChange",'nochange'); 
                        } 	
                        next();                  
                    }
               });
              }else{
                   next()
              }
               
            }
	   }
];
export default{
	routeList
}
