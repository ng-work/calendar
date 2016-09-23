;(function($){
	init();
	function init(){
		//调用显示默认入住及离店时间的函数
		setDefauleTime();
		//跳转到日历页并将入住时间及离店时间传递过去
		gotorili();
	}
	function setDefauleTime(){
		//获取参数，判断如果有参数，将参数中的时间作为入住及离店时间
		var argument=getargument();
		console.log(argument)
		if(argument){
			//有参数，设置入住及离店时间
			var inTime=argument.date_in,//2016-07-22
			outTime=argument.date_out;
		}else{
			//1、没有参数，设置默认入住及离店时间
			var inTime=_setTime(),//2016-07-22
			outTime=_setTime(10);
		}
		sub=(new Date(outTime)*1-new Date(inTime)*1)/86400000;
		if(sub==0){
				$('#count').text(1);
		}else{
				$('#count').text(sub);
		}
		$('#date_in').val(inTime);
		$('#date_out').val(outTime);
		//2、显示今明后
		var inchange=change(inTime),
			outchange=change(outTime);
		$('#now').text(inchange);
		$('#temp').text(outchange);
	}
	//设置入住或离店时间
	function _setTime(n){
		var n=n||0,
			//获取系统时间
			today=new Date(),
			newDate=new Date(today.getFullYear(),today.getMonth(),(today.getDate()+n));
			return newDate.getFullYear()+'-'+addzero(newDate.getMonth()+1)+'-'+addzero(newDate.getDate());
	}
	//根据时间转为今明后或星期
	function change(t){
		//时间与系统时相减的到的时间差==0（今天）==1（明天）
		var arr=['日','一','二','三','四','五','六'],
			today=new Date(),//系统时间
			step=86400000,//一天的毫秒数
			sub=Math.abs(Math.ceil((new Date(t)*1-today*1)/step)),//时间差
			txt="",
			week=new Date(t).getDay();//星期
			
		switch(sub){
			case 0:txt="今天";break;
			case 1:txt="明天";break;
			case 2:txt="后天";break;
			default:txt="星期"+arr[week];
		}
		return txt;
	}
	//跳转到日历页并将入住时间及离店时间传递过去
	function gotorili(){
		//date_in=2016-07-22&date_out=2016-07-25
		$('#goto').on('click',function(){
			var _in=$('#date_in').val(),
				_out=$('#date_out').val(),
				url="calendar.html?date_in="+_in+"&date_out="+_out;
			$(this).attr('href',url);
		})
	}
	
})(Zepto)