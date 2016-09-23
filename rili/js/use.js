;(function($){
	init();
	function init(){
		//使用
		$('#main').rili();
		changetime();
		//获取地址栏中参数
		var arg=getargument(),
			date_in=arg.date_in.split('-'),
			inY=date_in[0],//入住年
			inM=removezero(date_in[1]),//入住月
			inD=removezero(date_in[2]),//入住天
			date_out=arg.date_out.split('-'),
			outY=date_out[0],//离店年
			outM=removezero(date_out[1]),//离店月
			outD=removezero(date_out[2]);//离店天
			//在日历中将入住时间及离店时间标准，添加class
		if(inM==outM){//同月
			var tds=$('#tab'+inM).find('td').not('.prev,.guole');
			/*tds.filter(function(){
				var txt=tds.eq(i).find('small').text()*1;
				if(txt>=inD&&txt<=outD){
					return $(this);
				}
			}).addClass('xuan');*/
			for(var i=0;i<tds.length;i++){
				var txt=tds.eq(i).find('small').text()*1;
				if(txt>=inD&&txt<=outD){
					tds.eq(i).addClass('xuan')
				}
			}
		}else{//跨月
			var intds=$('#tab'+inM).find('td').not('.prev,.guole'),
				outtds=$('#tab'+outM).find('td').not('.prev,.guole')
			intds.filter(function(){
				var txt=$(this).find('small').text()*1;
				if(txt>=inD){
					return $(this);
				}
			}).addClass('xuan');
			outtds.filter(function(){
				var txt=$(this).find('small').text()*1;
				if(txt<=outD){
					return $(this);
				}
			}).addClass('xuan');
		}
		$('.xuan').first().append('<b>入住</b>');
		$('.xuan').last().append('<span>离店</span>');
	}
	function changetime(){var isClick=false;
		$('#main').on('tap','td',function(){
			
			if($(this).is('.prev,.guole')) return false;
			if(!isClick){//第一次
				//取消原来的标注
				$('.xuan').find('b,span').remove();
				$('.xuan').removeClass('xuan');
				//把当前这个标注为入住
				$(this).addClass('xuan').append('<b>入住</b>');
				isClick=true;
			}else{//第二次
				//把当前这个标注为离店
				$(this).addClass('xuan').append('<span>离店</span>');
				isClick=false;
				//入住时间
				var In=$('.xuan').first(),
					Inday=addzero(In.find('small').text()),
					reg=/[\u4e00-\u9fa5]/g,
					Iny=In.parents('.mian_box').find('h2').text().replace(reg,'-'),
					endIntime=Iny+Inday,
					//离店时间
					ouT=$('.xuan').last(),
					ouTday=addzero(ouT.find('small').text()),
					reg=/[\u4e00-\u9fa5]/g,
					ouTy=ouT.parents('.mian_box').find('h2').text().replace(reg,'-'),
					endOuttime=ouTy+ouTday,
				//计算入住与离店的时间差，不允许超过15天
					sub=(new Date(endOuttime)*1-new Date(endIntime)*1)/86400000;
					console.log(sub)
				if(sub>15){
					alert('最多允许预定15天');
					return false;
				}
				location.href='rili.html?date_in='+endIntime+'&date_out='+endOuttime;
			}
		})
	}
})(jQuery)