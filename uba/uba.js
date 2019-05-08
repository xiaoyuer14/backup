// 行为类型   user_property
// type	是	行为类型	 行为类型   access/leaving
// platform	是	平台/项目名称 用于指定行为来源	 
// user_id	否	用户ID	 
// token	否	token	 
// device_type	否	设备类型（pc、modile）	 
// device_name	否	设备名称
// idfa	否	 	 
// imei	否	 	
// custom_obj 自定义事件参数json字符串
// dom_element 点击事件dom字符串
(function(w) {

    "use strict";

    var enptyFn = function(){};

    w.console = !w.console ? {
    	"log": enptyFn,
    	"error": enptyFn
    } : w.console;

    var Uba = w.UBA || function(){};

    var TYPE = [ 'access', 'leaving'],// 'custom_click' ],
    	STORAGE = ['zamUbaInfo', 'oldHashUrl', 'pageId', 'lastPushData'],
    	spiderKeys = ['baiduspider', 'adsbot-google', 'msnbot-media', 'pingbot', 'pyspider', '360spider', 'sogou web spider', 'monitor-splider', 'jiankongbao', 'networkbench', 'oneapm ffagent', 'phantomjs'],
    	platform,
    	limit = {
    		"num": 20,
    		"time": 30 * 60  //秒
    	},
    	intervalTime = limit.time,
    	intervalFn = setInterval(function(){
    		intervalTime = intervalTime-10;
    		// console.log(intervalTime, intervalFn);
    		if(intervalTime <= 0){

    			UBA.sendData && UBA.sendData(true);
    		}
    	},10000),
    	url = location.href,
    	API = {
    		"TRACKINGS": [location.protocol, "//", "10.8.8.233:8033/trackings"].join("")
    	},
    	targetId;

	var toString = Object.prototype.toString,
		enumerables = true,
		enumerablesTest = { toString: 1 },
		i;

	for (i in enumerablesTest) {
		enumerables = null;
	}

	if (enumerables) {
		enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable','toLocaleString', 'toString', 'constructor'];
	}

	var pushState = w.history.pushState;
	// fixed pushstate can't fire popstate
    w.history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
        }
        return pushState.apply(history, arguments);
    };

    /**
     * [getUuid create uuid]
     * @author dannyZhang
     * @DateTime 2018-12-27T10:35:35+0800
     * @param    {[Number]}                 len   [uuid length]
     * @param    {[Number]}                 radix [uuid radix]
     * @return   {[String]}                       [uuid]
     */
	function getUuid(len, radix) {

        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
        	uuid = [],
            i;

        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) {
            	uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data. At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }

    /**
     * [getUserDeviceInfo user browser info && device info]
     * @author dannyZhang
     * @DateTime 2018-12-27T10:59:00+0800
     * @return   {[Object]}                 [description]
     */
    function getUserDeviceInfo() {

        var u = navigator.userAgent,
        	deviceName = 'unKnown',
	    	deviceType = "mobile",
	    	systemVersion = "unKnown",
        	browserCore = "unKnown",
        	browserName = "unKnown",
        	browserVersion = "unKnown",
        	coreKey = "unKnown";

    	if (u.indexOf('Trident') > -1) { //IE内核
     		browserCore = "trident";
     		coreKey = "Trident";
		} else if (u.indexOf('Presto') > -1) { //opera内核
		    browserCore = "presto";
     		coreKey = "Presto";
		} else if (u.indexOf('AppleWebKit') > -1) { //苹果、谷歌内核
		    browserCore = "webKit";
     		coreKey = "AppleWebKit";
		} else if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1) { //火狐内核
		    browserCore = "gecko";
     		coreKey = "Gecko";
		}

        if(u.indexOf('Firefox')>-1){ 
            browserName = 'Firefox'; 
            browserVersion = u.substr(u.indexOf('FireFox')-3,10);
        }else if(u.indexOf("Edge")>-1){
            browserName = 'Edge'; 
            browserVersion = u.substr(u.indexOf('Edge')+5,10);
        }else if(u.indexOf('OPR')>-1){ 
            browserName = 'Opera'; 
            browserVersion = u.substr(u.indexOf('OPR')+4,4);
        }else if(u.indexOf('Chrome')>-1){ 
            browserName = 'Chrome'; 
            browserVersion = u.substr(u.indexOf('Chrome')+7,4);
        }else if(u.indexOf('Safari')>-1){ 
            browserName = 'Safari'; 
            browserVersion = u.substr(u.indexOf('Safari')+7,15);
        }else if(u.indexOf('Trident')>-1){ 
            browserName = 'IE'; 
            browserVersion = u.substr(u.indexOf('rv')+3,4);
        }

	    if(u.indexOf('Windows')>-1){	        //PC
	    	deviceType = "pc"
	    	deviceName = browserName;
			systemVersion = u.slice(u.indexOf('Windows'),u.indexOf(')'));
	    }else if(u.indexOf('Linux')>-1){	   //android
	        systemVersion = u.substr(u.indexOf('Android'),13);
	        deviceName = u.slice(u.indexOf(systemVersion), u.indexOf(coreKey)).replace(systemVersion, "").replace(")", "").replace("en-us", "").replace(/\;/gi,"").trim();
	    }else if(u.indexOf('iPhone')>-1){		// iPhone
	        systemVersion = u.slice(u.indexOf('iPhone OS'),u.indexOf('like Mac'));
	        deviceName = systemVersion;
	    }else if(u.indexOf('iPad')>-1){			 // iPad
	        systemVersion = u.slice(u.indexOf('CPU OS'),u.indexOf('like Mac')).replace("CPU", "iPad");
	        deviceName = systemVersion;
	    }

	    return {
	    	"browserInfo": {
				"core": browserCore,
				"name": browserName,
				"version": browserVersion,
	        	"language": (navigator.browserLanguage || navigator.language).toLowerCase()
			},
	    	"deviceInfo": {
		    	"deviceName": deviceName,
		    	"deviceType": deviceType,
		    	"systemVersion": systemVersion,
		    	"mobileInfo": {
		            "ios": !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		            "android": u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		            "iPhone": u.indexOf('iPhone') > -1 && u.indexOf('Mac') > -1, //iPhone或者QQHD浏览器
		            "iPad": u.indexOf('iPad') > -1 && u.indexOf('Mac') > -1 //iPad
		    	}
		    }
	    };
	}

	/**
     * 复制参数到指定对象
     * @param {Object} object 目标对象
     * @param {Object} config 参数属性
     * @param {Object} [defaults] 默认参数属性
     * @return {Object} returns obj
     */
    function apply (object, config, defaults) {
        if (defaults) {
            apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }

            if (enumerables) {
                for (j = enumerables.length; j--;) {
                    k = enumerables[j];
                    if (config.hasOwnProperty(k)) {
                        object[k] = config[k];
                    }
                }
            }
        }

        return object;
    }

	/**
	 * [deepCopy Object deep copy]
	 * @author dannyZhang
	 * @DateTime 2018-12-27T11:00:14+0800
	 * @param    {[Object]}                 obj [description]
	 * @return   {[Object]}                     [description]
	 */
	function deepCopy(obj){

		return JSON.parse(JSON.stringify(obj));
	}

	// getItem from localStorage
	function getStorage(name){

		var val;

		try{
			val = localStorage.getItem(name);
			val = JSON.parse(val);
		}catch(e){
			// console.log("Error:",e);
		}
		return val;
	}

	// setItem from localStorage
	function setStorage(name, value){

		try{
			value = typeof value === "string" ? value : JSON.stringify(value);
			localStorage.setItem(name, value);
		}catch(e){}
	}

	// removeItem from localStorage
	function removeStorage(name){

		try{
			localStorage.removeItem(name);
		}catch(e){}
	}

	// clear storage
	function clearStorage(arr){

		arr = arr || storageArr;

		arr.forEach(function(i){
			removeStorage(i);
		});
	}

    // function callFn(fn, arr) {
    //     return fn.apply(this, arr);
    // }

    function fetchData(postData, isClose, callback){

    	function ajax_method(url,data,method,success) {

		    var _ajax = new XMLHttpRequest();
		    // 注册事件
		    _ajax.onreadystatechange = function () {
		        // 在事件中 获取数据 并修改界面显示
		        if (_ajax.readyState==4 && _ajax.status==200) {
		            success && success(_ajax.responseText);
		        }
		    };

	        _ajax.open(method, url, false);

	        _ajax.setRequestHeader("Content-type","application/json;charset=utf-8");

	        if (data) {
	            _ajax.send(JSON.stringify(data));
	        }
		}

		if( isClose === true ){
			ajax_method(API.TRACKINGS, postData, "POST", callback);
		}else{
			try{
		    fetch( API.TRACKINGS,{
				    method: 'POST',
				    mode: 'cors',
					headers: {
						"Content-Type": "application/json;charset=utf-8"
					},
					body: JSON.stringify(postData)
				}).then(res => {
				    return res.json();
				}).then(json => {

					callback && callback(json);
				    // console.log('response:', json );
				    return json;
				}).catch(err => {
				    console.log('fetch Error:', err);
				});
			}catch(e){}
		}
    }

  	Uba.prototype = {
  		userDeviceInfo: getUserDeviceInfo(),
		isSpider: function(){

	        var u = navigator.userAgent.toLocaleLowerCase();

			return spiderKeys.some(function(item){return u.indexOf(item)>-1});
		},
		// getItem from "zamUbaInfo" in localStorage
		getUbaData: function ( name ){

			var zamStorageName = STORAGE[0],
				zamStorageObj = getStorage( zamStorageName );

			return zamStorageObj && zamStorageObj[name] ? zamStorageObj[name] : null;
		},
		// return new uuid && save
		makeUuid: function (){

			var uuid = getUuid();
			setStorage( STORAGE[2] , uuid);

			return uuid;
		},
		checkUuid: function (targetId){

			var dataList = this.getUbaData("pushDataList") || [],
				length = dataList.length;

			if(length>0 && dataList[length-1].target_id === targetId ){

				var timestamp = dataList[length-1].created_at;
				if(this.checkTimeout(timestamp)){
					targetId = this.makeUuid();
				}
			}

			return targetId;	
		},
		checkTimeout: function (timestamp){
			var _now = parseInt(new Date().getTime()/1000),
				_diff = limit.time;

			if(_now - _diff >= Number(timestamp)){
				return true;
			}

			return false;
		},
		// uba initialize
		init: function (config){

			var cfg = deepCopy(config),
				zamStorageName = STORAGE[0],
				zamStorageObj = getStorage( zamStorageName ) || {};
				
			if(cfg instanceof Object){

				if(!cfg.platform){
					return;
				}else{
					platform = cfg.platform;
				}

				if(cfg.API) {
					API.TRACKINGS = [location.protocol, "//", cfg.API].join("");
				}

				targetId = getStorage( STORAGE[2] );

				if(!targetId && typeof targetId === 'object'){
					targetId = this.makeUuid();
				}else{
					targetId = this.checkUuid(targetId);
				}

				setStorage( zamStorageName , apply(zamStorageObj, {
					"platform": platform	
				}));

				if(!getStorage( STORAGE[1] )){
					setStorage( STORAGE[1],  location.href);
				}
				this.pushData(TYPE[0], targetId);
			}

			// console.log("uba init success", targetId);

			this.bindEvents();
		},

		// bind events
		bindEvents: function (){

		 	w.onbeforeunload = onbeforeunload_handler;
		 	w.onpopstate = onpopstate_handler;
			// w.addEventListener('beforeunload',onbeforeunload_handler);
			// w.addEventListener('popstate',onbeforeunload_handler);
			
			w.history.onpushstate = function(e){onpopstate_handler("pushstate");};
			
		 	var _this = this;

		 	function onpopstate_handler (type){

		 		//hashChange access
		 		_this.pushData(TYPE[1], getStorage( STORAGE[2] ), getStorage( STORAGE[1] ), clearStorage.bind(this, [STORAGE[2]]));
		 		//hashChange leaving
		 		if(type === "pushstate"){
		 			var url = location.href;
		 			// console.log(url);

		 			timeout_handler();

		 			function timeout_handler(){

			 			setTimeout(function(){
			 				if(url !== location.href){
			 					// console.log("终于push了");
			 					_this.pushData(TYPE[0], _this.makeUuid());
			 				}else{
			 					// console.log("还在等待！");
			 					timeout_handler();
			 				}
			 			},1);
		 			}

		 		}else{
		 			_this.pushData(TYPE[0], _this.makeUuid());
		 		}
		 	}

		    function onbeforeunload_handler(e){ 

		    	//hashChang leaving
		    	_this.pushData(TYPE[1], getStorage( STORAGE[2] ), undefined, clearStorage.bind(this, [STORAGE[2]])); 
				clearInterval(intervalFn);
		    }

			// w.addEventListener('click',onclick_handler, false);

			function onclick_handler(e){
				
				var target = e.target,
					tagName = target.tagName.toLocaleUpperCase(),
					ignoreTag = ['HTML', 'HEAD', 'BODY'];

				if(ignoreTag.indexOf(tagName)<0){

		    		_this.pushData(TYPE[2], getStorage( STORAGE[2] ), undefined, undefined, encodeURIComponent(target.outerHTML));
				}
			}
		},
		/**
		 * [pushData pash data to array for submit]
		 * @author dannyZhang
		 * @DateTime 2018-12-28T09:33:56+0800
		 * @param    {[String]}                 type     [type:'access'、'leaving']
		 * @param    {[String]}                 targetId [pageId]
		 * @param    {[type]}                 url      [url]
		 * @param    {Function}               fn       [callback function]
		 */
		pushData: function (type, targetId, url, fn, custom_obj){
			//屏蔽爬虫关键字
			if(!this.isSpider()){ 
				var dataList = this.getUbaData("pushDataList") || [],
					zamStorageName = STORAGE[0],
					zamStorageObj = getStorage( zamStorageName ),
					userDeviceInfo = this.userDeviceInfo,
					deviceInfo = userDeviceInfo.deviceInfo || {},
					browserInfo = userDeviceInfo.browserInfo || {},
					obj = {
						"type": type,
						"platform": zamStorageObj.platform,
						"target_id": targetId,
						"url": this.getUrl(url),
						"session_id": null,
						"user_id": getStorage("userid"),
						"token": getStorage("token"),
						"created_at": parseInt(new Date().getTime()/1000),
						"device_type": deviceInfo.deviceType,
						"device_name": deviceInfo.deviceName,
						"broswer": browserInfo.name,
						"broswer_version": browserInfo.version,
						"idfa": null,
						"imei": null
					};

				try{
					custom_obj = custom_obj || null;
					custom_obj = JSON.stringify(custom_obj)
				}catch(e){}

				if(TYPE.indexOf(type)<0){
					obj = apply(obj,{
						"custom_obj": JSON.stringify(custom_obj)
					});
				// }else if(type === TYPE[2]){
				// 	obj = apply(obj,{
				// 		"dom_element": JSON.stringify(custom_obj)
				// 	});
				}

				dataList.push(obj);

				fn && fn();

				setStorage( zamStorageName, apply(zamStorageObj,{
					"pushDataList": dataList
				}));

				if(type === TYPE[1] && url === undefined){
					// 关闭窗口
					this.sendData(false, true)
				}else{
					if(type !== TYPE[1]){
						this.sendData();
					}
				}
			}
		},

		// saving oldHashUrl before browser url changed, and return it
		getUrl: function (url){

			if(!url || typeof url !== "string"){
				url = location.href;
				setStorage( STORAGE[1],  url);
			}

			return url;
		},

		// send data to saving
		sendData: function (isTimeUp, isClose){

			var zamStorageObj = getStorage(STORAGE[0]),
				pushDataList = zamStorageObj && zamStorageObj.pushDataList ? zamStorageObj.pushDataList : [],
				length = (isTimeUp === true || isClose === true) ? pushDataList.length : limit.num,
				postData;

			if( pushDataList.length>0 && pushDataList.length >= length || (isTimeUp === true || isClose === true)){

				postData = pushDataList.slice(0, length);

				setStorage( STORAGE[3], postData);

				// console.log("sendData:",postData);
    			intervalTime = limit.time; //重置计数器

				fetchData(postData, isClose, function(res){

					if(res && res.code === 200){

						var zamStorageObj = getStorage(STORAGE[0]),
							pushDataList = zamStorageObj && zamStorageObj.pushDataList ? zamStorageObj.pushDataList : [],
							postData = getStorage( STORAGE[3]) || [];

						postData = postData.map(function(i){
							return i.created_at;
						});

						setStorage( STORAGE[0], apply(zamStorageObj,{
							"pushDataList": pushDataList.filter(function(i){
								return postData.indexOf(i.created_at)<0
							})
						}));
						removeStorage( STORAGE[3]);
					}
				});
			}
		},
		/**
		 * [trackReport 对外接口]
		 * @DateTime 2019-01-02T14:55:26+0800
		 * @param    {[type]}                 trackName [description]
		 * @param    {[type]}                 trackData [description]
		 * @param    {Function}               callback  [description]
		 */
	    trackReport: function (trackName, trackData, callback){

	    	this.pushData( trackName, getStorage( STORAGE[2] ), null, callback, trackData)
	    }
	};

	w.UBA = new Uba();

	w.zamUbaInit && w.zamUbaInit();
	delete w.zamUbaInit;

}(window));