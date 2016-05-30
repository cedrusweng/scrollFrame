/**
	作者：FE-脚后跟
	时间：2013-11-14
	版本：v 1.0
	功能：实例垂直滚动对应的执行动画组
	构造函数 constructor:
		scrollFrame:function
 		@param frameArray 动画数组 默认为[],
			动画项 JSON数据为
			{yPos:'',//Y位置
			 initFn:'',//初始化函数
			 playFn:''//位置触发函数
			 }
		@param context 滚动主体 默认值为window
	原型对象 proto:
		_init: 初始化
		_getScrollTop:获取当前top值
		_addEvent:事件绑定
		_getFrameYPos:获取对应的Y位置设置
		_frameExec: 执行对应的动画函数
		addFrame: 添加帧动画
		_playList：遍历执行所有动画
		enable：应用效果
*/
(function(){
	function scrollFrame(opts){
		this._locked=[];
		this.frameArray=opts&&opts.frameArray||[];
		this.context=opts&&opts.context||window;
		this._init();
	}
	scrollFrame.prototype={
		constructor:scrollFrame,
		_init:function(){
			var i=0,len=this.frameArray.length;
			if(len<1)return;
			for(;i<len;i++){
				this._frameExec(i,'initFn');
			}	
		},
		_getScrollTop:function(){
			return this.context.scrollTop|| 
					document.body.scrollTop|| 
					document.documentElement.scrollTop;
		},
		_addEvent:function(fn){
			if(this.context.addEventListener){
				this.context.addEventListener('scroll',fn,false);	
			}else if(this.context.attachEvent){
				this.context.attachEvent('onscroll',fn);
			}else{
				this.context["onscroll"]=fn;
			}
		},
		_getFrameYPos:function(idx){
			return this.frameArray[idx]['yPos'];
		},
		_frameExec:function(idx,key){
			this.frameArray[idx][key]&&this.frameArray[idx][key]();
		},	
		_playList:function(){		
			if(this.frameArray.length<1)return;
			var top=this._getScrollTop(),
				i=0,
				len=this.frameArray.length;
			for(;i<len;i++){
				if(this._getFrameYPos(i)&&top>this._getFrameYPos(i)){
					if(!this._locked[i]){
						this._locked[i]=true;
						this._frameExec(i,'playFn');	
					}			
				}else{
					if(this._locked[i]){
						this._locked[i]=false;
						this._frameExec(i,'initFn');	
					}				
				}
				
			}
		},
		addFrame:function(frameObj){
			this.frameArray.push(frameObj);
			this._init();
		},enable:function(){
			var that=this;
			this._addEvent(function(){
				that._playList.call(that);
			});
			
		}
	}
	//对外接口
	window.scrollFrame=(function(){
		return function(opts){
			var sF=new scrollFrame(opts);
			this.addFrame=function(frameObj){
				sF.addFrame(frameObj);
			}
			this.enable=function(){
				sF.enable();
			}		
			this.playList=function(){
				sF._playList();	
			}		
		}	
	})()	
})()
/* 示例
	//动画数组集体定义
	var frameArray=[
		{	yPos:100,
			playFn:function(){
				$(".c1_flv").stop(true,true).animate({top:126},100);
			},
			initFn:function(){
				$(".c1_flv").stop(true,true).animate({top:800},100);			
			}
		},
		{	yPos:800,
			initFn:function(){
				$(".c1_car").animate({left:-1200,top:868},200);
			},
			playFn:function(){
				$(".c1_car").animate({left:-243,top:828},300);
			}
		},
		{	yPos:1800,
			initFn:function(){
				$(".c3_temp").hide();
			},
			playFn:function(){
				$(".c3_temp").each(function(i){
					var top=$(this).css('top');
					$(this).show().css({'top':-800}).stop(true,true).animate({'top':top},i*100)	
				});
			}
		}			
	]
	//初始化
	var scrFrame=new scrollFrame({'frameArray':frameArray});	
	//调用
	scrFrame.enable();
	//添加单帧动画
	scrFrame.addFrame({
		yPos:1300,
		initFn:function(){
			$(".c2_title").hide();	
		},
		playFn:function(){
			$(".c2_title").fadeIn();		
		}
	})
	scrFrame.addFrame({
		yPos:2300,
		initFn:function(){
			$("#featured-area").css({"top":500,"opacity":0});			
		},
		playFn:function(){
			$("#featured-area").stop(true,true).animate({"top":80,"opacity":1});		
		}
	})
 */
