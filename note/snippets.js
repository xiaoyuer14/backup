//创建事件, Event是无法传递参数的
var event = new Event('build');
//创建事件, CustomEvent是可以传递参数的
var event = new CustomEvent('build', { 
	detail: elem.dataset.time 
});

// 监听事件Listen for the event.
elem.addEventListener('build', function (e) { 
		//... 
	}, false);

// 分发/触发事件Dispatch the event.
elem.dispatchEvent(event);


var getFunCallTimes = (function() {

    // 装饰器，在当前函数执行前先执行另一个函数
    function decoratorBefore(fn, beforeFn) {
    	
        return function() {
            var ret = beforeFn.apply(this, arguments);
            // 在前一个函数中判断，不需要执行当前函数
            if (ret !== false) {
                fn.apply(this, arguments);
            }
        };
    }

    // 执行次数
    var funTimes = {};

    // 给fun添加装饰器，fun执行前将进行计数累加
    return function(fun, funName) {
        // 存储的key值
        funName = funName || fun;

        // 不重复绑定，有则返回
        if (funTimes[funName]) {
            return funTimes[funName];
        }

        // 绑定
        funTimes[funName] = decoratorBefore(fun, function() {
            // 计数累加
            funTimes[funName].callTimes++;
            console.log('count', funTimes[funName].callTimes);
        });

        // 定义函数的值为计数值（初始化）
        funTimes[funName].callTimes = 0;
        return funTimes[funName];
    }
})();

var someFunction = function () {
 console.log('someFunction');
}
var otherFunction = function () {
 console.log('otherFunction');
}
someFunction = getFunCallTimes(someFunction, 'someFunction');
someFunction(); // count 1
someFunction(); // count 2
someFunction(); // count 3
someFunction(); // count 4
console.log(someFunction.callTimes); // 4


otherFunction = getFunCallTimes(otherFunction);
otherFunction(); // count 1
console.log(otherFunction.callTimes); // 1
otherFunction(); // count 2
console.log(otherFunction.callTimes); // 2



var getFnCallTimes = function(){

	var fnTimes = {};

	return function(fn, fnName){
		fnName 
	}
}

// fn call times
var getCallFnTimes = (function(){
    var fnTimes = {};
    function detoratorBefore(fn, beforeFn){
        return function() {
            var ret = beforeFn.apply(this, arguments);
            if(ret !== false){
                fn.apply(this, arguments);
            }
        }
    }

    return function(oldFn, fnName) {
        fnName = fnName || oldFn;
        if(fnTimes[fnName]){
            return fnTimes[fnName];
        }
        fnTimes[fnName] = detoratorBefore(oldFn, function() {
            fnTimes[fnName].callTimes++;
            console.log("count times:", fnTimes[fnName].callTimes);
        });
        fnTimes[fnName].callTimes = 0;
        return fnTimes[fnName];
    }
})();
var fn = function() {console.log("call fn!");}
fn = getCallFnTimes(fn, 'fn');