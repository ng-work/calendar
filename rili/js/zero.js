//补0
function addzero(m){
	if(m<10){
		return '0'+m
	}else{
		return m;
	}
}

//获取入住时间及离店时间的参数
function getargument(){
	var obj={},
		argument= location.search;
		if(!argument) return false;
	//1.将所有的参数作为对象的属性（key）存储起来{date_in:2016-07-23,date_out:2016-07-26}
	var argument= location.search.substr(1);
	arr=argument.split('&');
	arr.forEach(function(ele,i){
		rs=ele.split('=');
		obj[rs[0]]=rs[1];
	})
	return obj;
}

function removezero(num){
	if(num.charAt(0)==0){
		return num.substr(1);
	}else{
		return num;
	}
	//return num*1
}