;(function($){
	$.fn.rili=function(){
		//扩展参数
		var opt=$.extend({
			sTime:new Date(),//第一个日历时间
			size:3
		},opt||{})
		//遍历对象
		$(this).each(function(){
			//遍历生成的日历数
			var main=$(this),
				sTime=opt.sTime,
				y=sTime.getFullYear(),
				m=sTime.getMonth()+1;
			for(var i=0;i<opt.size;i++){
				//调用日历函数
				createRill(main,y,m+i);
			}
		})
	}
	function createRill(main,y,m){
		var html='<div class="mian_box" id="tab'+m+'">';
			html+='<h2>'+y+'年'+addzero(m)+'月</h2>'
			html+='<ol><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ol>';
			//表格的渲染
			html+=cTable(y,m);
			html+='</div>';
			//渲染到页面
			main.append($(html))
	}
	//渲染表格的函数
	function cTable(y,m){
		var str="<table>",
			days=getDays(y,m),//获取到当前月的总天数
			privious=getDays(y,m-1),//获取上个月的总天数
			prevDays=new Date(y,m-1,1).getDay(),//上个月显示的天数
			//计算行数(上个月显示的天数加上这个月的总天数)/7
			rows=Math.ceil((prevDays+days)/7),
			today=new Date(),//今天
			tdate=today.getDate(),
			tmonth=today.getMonth()+1;
		for(var i=0;i<rows;i++){
			str+='<tr>';
			for(var j=1;j<=7;j++){
				var d=(j+i*7)-prevDays;
				if(d<1){
					str+='<td class="prev"><small>'+(privious+d)+'</small></td>';
				}else if(d<=days){
					if(tmonth==m && d<tdate){
						str+='<td class="guole"><small>'+d+'</small></td>';
					}else{
						str+='<td><small>'+d+'</small></td>';
					}
				}
			}
			str+='</tr>';
		}
		str+='</table>';
		return str;
	}
	//判断每月天数
	function getDays(y,m){
		if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){
			return 31;
		}else if(m==4||m==6||m==9||m==11){
			return 30;
		}else{
			if(y%400==0 || (y%4==0 && y%100!=0)){
				return 29
			}else{
				return 28
			}
		}
	}
})(jQuery)