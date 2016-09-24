//需求：
//点击菜单项，相应的下拉菜单出现，标题前的+变成-;
//点击菜单时，其他菜单项的所有内容全部隐藏；

window.onload = function(){
	//找到元素
	var list = document.getElementById('list');
	var arrItem = list.getElementsByClassName('item'); 
	//定义变量Ul来存每个列表下面的ul
	var ul = null;
	
	show(list,'h3');
	//设置列表项的功能
	function show(which,h,fn){
		//找到某一个ul中的title即h3/h4/h5
		var obj = which.getElementsByTagName(h);
		//遍历title列表
		for (var i = 0; i < obj.length; i++) {
			//给每个title添加记录自身状态的自定义属性
			obj[i].onOff = true;
			//给每个title添加索引值
			obj[i].index = i;
			//给每个title添加点击事件
			obj[i].onclick = function(){
				//找到该title下面的第一个span并存入变量
				var span = this.getElementsByTagName('span')[0];
				if(this.onOff){
					//判断当点击时的状态为true时
					//设置他的下一个兄弟元素，即ul显示
					this.nextElementSibling.style.display = 'block';
					//设置span显示为-
					span.innerHTML = '-';
					//更改自身状态为false
					this.onOff = false;
				}else{
					//判断当点击时的状态为false时
					//设置他的下一个兄弟元素，即ul隐藏
					this.nextElementSibling.style.display = '';
					//设置span显示为+
					span.innerHTML = '+';
					//更改自身状态为ture
					this.onOff = true;
				}
				//找到当前title的父级
				var parent = this.parentNode;
				//找到当前title的父级的父级的最后一个元素下的h
				//目的是为了获取他的索引值，找到当前title的父级有几个兄弟级元素
				var num = this.parentNode.parentNode.lastElementChild.getElementsByTagName(h)[0].index;
				//定义变量记录上一个元素
				var ele = null;
				//将当前的TITLE赋给ele
				ele = this;
				//定义i来自增达到逐个隐藏的目的
				var i = 0;
				//只要变量值小于当前的索引值就一直执行，将当前项之前的同级元素隐藏;
				while(i < this.index){
					//找到ele父级元素的上一个兄弟级元素
					var prev = ele.parentNode.previousElementSibling;
					//将prev下面的title赋给ele，这样下一次就可以直接从现在项开始往上找
					ele = prev.getElementsByTagName(h)[0];
					//判断ele的下一个兄弟级元素，即ul是否为显示，显示则将其隐藏
					if(ele.nextElementSibling.style.display == 'block'){
						//设置ele的下一个兄弟级元素隐藏
						ele.nextElementSibling.style.display = '';
						//将其状态改为true，下次点击时可以直接展开
						ele.onOff = true;
						//将其里面的第一个span显示为+
						ele.getElementsByTagName('span')[0].innerHTML = '+';
					}
					//调用hide函数，判断ele父级下面有无展开的ul，有则设置相应功能；
					hide(ele.parentNode);
					//每次让i自增来逐个隐藏；
					i++;
				}
				//定义变量记录下一个元素
				var netEle = null;
				//将当前的TITLE赋给ele
				netEle = this;
				//定义j来自增达到逐个隐藏的目的	并将当前的索引值赋给j以从当前项开始往后找
				var j = this.index;
				//只要变量值小于num就一直执行，将当前项之后的同级元素隐藏;
				while(j < num){
					//找到netEle父级元素的下一个兄弟级元素
					var next = netEle.parentNode.nextElementSibling;
					//将next下面的title赋给netEle，这样下一次就可以直接从现在项开始往下找
					netEle = next.getElementsByTagName(h)[0];
					//调用hide函数，判断netEle父级下面有无展开的ul，有则设置相应功能；
					hide(netEle.parentNode);
					//判断netEle的下一个兄弟级元素，即ul是否为显示，显示则将其隐藏
					if(netEle.nextElementSibling.style.display == 'block'){
						//设置netEle的下一个兄弟级元素隐藏
						netEle.nextElementSibling.style.display = '';
						//将其状态改为true，下次点击时可以直接展开
						netEle.onOff = true;
						//将其里面的第一个span显示为+
						netEle.getElementsByTagName('span')[0].innerHTML = '+';
					}
					//每次j来自增达到逐个隐藏的目的
					j++;
				}
				
			}
			
			//获取每个title的下一个兄弟级元素ul并存入变量
			ul = obj[i].nextElementSibling;
			//判断当fn为函数时，立即执行
			if(typeof fn === 'function'){
				fn();
			}
			//调用自身，使当前ul下面的各项得到相应功能
			show(ul,'h4',function(){
				//再次调用自身，因ul已更新为下一级的ul
				show(ul,'h5',function(){
					//找到当前ul下的所有li
					var arrLi = ul.getElementsByTagName('li');
					//遍历li
					for (var i = 0; i < arrLi.length; i++) {
						//给每个li添加移入事件
						arrLi[i].onmouseover = function(){
							//清掉所有li的激活样式
							for (var i = 0; i < arrLi.length; i++) {
								arrLi[i].style.backgroundColor = '';
							}
							//给当前Li添加激活样式
							this.style.backgroundColor = '#f1f1f1';
						}
					}
				});
			});
		}
	}
	
	//找到元素下面的所有ul，判断其展开状态，根据其是否展开设置相应功能
	function hide(ele){
		//找到ele下面的ul
		var ul = ele.getElementsByTagName('ul');
		//遍历所有的ul
		for (var i = 0; i < ul.length; i++) {
			//判断当ul为展开时
			if(ul[i].style.display == 'block'){
				//设置将其隐藏
				ul[i].style.display = '';
				//获取其上一个兄弟级元素即title
				var prev = ul[i].previousElementSibling;
				//设置title的状态为true，使下次点击能直接展开
				prev.onOff = true;
				//设置title下面的第一个span显示+
				prev.getElementsByTagName('span')[0].innerHTML = '+';
			}
		}
	}
}
