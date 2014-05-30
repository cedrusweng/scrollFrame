# scrollFrame.js

## ����˵��

#### ����
<pre>{
    frameArray:[], array Ĭ��Ϊ�գ���������
	context:window object Ĭ��Ϊwindow
}</pre>
#### ����
 * addFrame(frameItem):��Ӷ����� frameItem={yPos:0,playFn:function(){},initFn:function(){}}
 * enable:��ʼʹ��

## ʹ��˵��

#### head����
	* JS�ļ� scrollFrame.js
#### html��ʹ��
���ȣ�Ҫ�ȶ���һ��Ҫ���ŵĶ������顣
```javascript
//�������鼯�嶨��
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
����������
``` javascript
//���嶯����
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
* yPos:���������߶ȴﵽ
* inifFn:���嶯����ʼλ��
* playFn:���嶯������λ��


#### ҳ�����
```javascript
//��ʼ��	
var scrFrame=new scrollFrame({'frameArray':frameArray});	
//����
scrFrame.enable();	
```
