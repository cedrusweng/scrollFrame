# scrollFrame.js

## 函数说明

#### 参数
<pre>{
    frameArray:[], array 默认为空，动画数组
	context:window object 默认为window
}</pre>
#### 方法
 * addFrame(frameItem):添加动画项 frameItem={yPos:0,playFn:function(){},initFn:function(){}}
 * enable:开始使用

## 使用说明

#### head引用
	* JS文件 scrollFrame.js
#### html中使用
首先，要先定义一个要播放的动画数组。
```javascript
//动画数组集体定义
var frameArray=[
	{	yPos:100,
		playFn:function(){
			$(".c1").stop(true,true).animate({top:800},100);
		},
		initFn:function(){
			$(".c1").stop(true,true).animate({top:100},100);			
		}
	},
	{	yPos:500,
		initFn:function(){
			$(".c2").animate({left:-1200,top:0},200);
		},
		playFn:function(){
			$(".c2").animate({left:-243,top:0},300);
		}
	},
	{	
		yPos:900,
		initFn:function(){
			$(".c3").hide();
		},
		playFn:function(){
			$(".c3").fadeIn()
		}
	},
	{	
		yPos:1500,
		initFn:function(){
			$(".c4").animate({right:-100});
		},
		playFn:function(){
			$(".c4").show().animate({right:'100%'})
		}
	}			
]
```
其中数组项
``` javascript
//具体动画项
frameItem={	
	yPos:1500,
	initFn:function(){
		$(".c4").animate({right:-100});
	},
	playFn:function(){
		$(".c4").show().animate({right:'100%'})
	}
}
```
* yPos:代表当滚动高度达到
* inifFn:定义动画初始位置
* playFn:定义动画结束位置


#### 页面调用
```javascript
//初始化	
var scrFrame=new scrollFrame({'frameArray':frameArray});	
//调用
scrFrame.enable();	
```
