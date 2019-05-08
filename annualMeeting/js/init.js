
$(document).ready(function(){

	var images = [],
        path = "images/",
        $wrapper = $("#wrapper"),
        $modal = $("#modal"),
        $mask = $("#mask"),
        $desc = $modal.find(".desc"),
		tpl = [
			'<div class="photo-box" style="{style}" data-id="{id}" data-group="{group}" data-department="false">',
				'<span>{character}</span>',
				'<p>{description}</p>',
			'</div>'
		].join(""),
        subTpl = [
            '<div class="photo-box" data-group="{department}" data-department="true">',
                '<span>{department}</span>',
            '</div>'
        ].join("");

    function preLoad(personObj) {

        var newArr = [],
            i = 0,
            length;

        Object.keys(personObj).map(function(key){ 
            return personObj[key].map(function(item){
                item.group = key; 
                return item;
            })
        }).forEach(function(item){
            newArr = newArr.concat(item);
        });

        length = newArr.length;

        for(;i<length; i++){
            images[i] = new Image();
            images[i].src = path + newArr[i].image;
            images[i].data = newArr[i];
        }

        createView();
    }

    function init(){

        // initBaseFontSize(1920);
    	if(personObj){

			preLoad(personObj);
			bindEvents();
    	}
		// $.get("js/data.js").done(function(res){
		// 	try{
		// 		var personArray = JSON.parse(res);
				
		// 		preLoad(personArray);
		// 		bindEvents();
		// 	}catch(e){}
		// });
    }

    function createView(){

    	var i = 0,
    		length = images.length,
    		domArr = [];

    	if(length > 0){

    		images.forEach(function(item, index){
    			var data = item.data;
    			// console.log(item.data);
                if( (index + 1) % 5 === 1){
                    domArr.push(simpleApplyTpl(subTpl,{
                        "department": data.group
                    }));
                } 
    			domArr.push(simpleApplyTpl(tpl,{
    				"id": data.id,
                    "group": data.group,
    				"description": data.description,
                    "character": getCharacter(index + 1),
    				"style": ["background:url(",
    					path + data.image,
    					");background-size: cover; background-position: center"].join("")
    			}));
    		});

    		$wrapper.append(domArr.join(""));
    	}
    }

    function simpleApplyTpl (tpl, obj) {
        for (var key in obj) {
            tpl = tpl.replace(new RegExp('{' + key + '}', 'g'), obj[key]);
        }
        return tpl;
    }

    function getCharacter(num){
        var arr = 'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(""),
            str = '';

        if( isNumeric(num) ){
            num = parseInt(num);
            index = num % 5;
            index = index === 0 ? 5 : index;

            str = arr[ index - 1 ];
        }

        return str;
    }

    function bindEvents(){

    	$wrapper.delegate(".photo-box", "click", function(e){
    		var $target = $(e.target),
    			id,
    			isDone;

    		if($target[0].tagName !== "DIV"){
    			$target = $target.parents(".photo-box");
    		}

    		id = $target.attr("data-id");
    		isDone = $target.attr("data-done");

    		if(isDone !== "true" && $target.attr("data-department") === "false"){

    			$target.addClass("photo-box-rotate").attr("data-done", "true");
    			initModal(id);
    			showModal();
    		}
    	});

		document.onkeydown=function(event){
			
			var e = event || window.event || arguments.callee.caller.arguments[0];

			if(e && e.keyCode==32){ // 空格 
			    showDescription();
			}            
			if(e && e.keyCode==13){ // enter
			 	try{
			 		hideModal();
			 	}catch(e){

			 	}
			}
		}; 
    }

    function initModal(id){

    	if(isNumeric(id)){
	    	var _data = images[parseInt(id)-1].data;

	    	$modal.find("img").attr("src", path + _data.image);
	    	$desc.text(_data.description);
    	}
    }

    function showModal(){

    	$mask.removeClass("none");
    	$modal.fadeIn(2000);
    }

    function hideModal(){

    	$modal.fadeOut(1000,function(){

    		$mask.addClass("none");
    		$desc.fadeOut();
    	});
    }

    function showDescription(){

    	$desc.fadeIn(500);
    }

    function isNumeric(value) {

        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function initBaseFontSize(designWidth) {
    
        designWidth = designWidth || 640;
        var initialRem = designWidth / 100,
        deviceWidth = document.documentElement.clientWidth || window.innerWidth;

        if (deviceWidth > designWidth) {
        deviceWidth = designWidth;
        }
        document.documentElement.style.fontSize = deviceWidth / initialRem + 'px';
        $('html').attr('data-dpr', window.devicePixelRatio);
    }

    init();
});