var fs = require('fs'),
	path = require('path');

var TRANSLATION = {
	'.html': '.gt',
	'.js': '.gts',
	'.css': '.gtc',
	'.json': '.json'
};
function _replace(file, fn_replace){
	var content = fs.readFileSync(file, 'utf8');
		content = fn_replace(content);
		fs.writeFileSync(file, content);
}
function changeSuffix(dir){
	var files = fs.readdirSync(dir);
	files.forEach(function(file){
		var pathname = path.join(dir, file),
			stat = fs.lstatSync(pathname);
		
		if(stat.isDirectory()){
			if(file == 'css' || file == 'js'){
				if(file == 'css'){
					file = 'c';
				}else{
					file = 'j';
				}
				var new_pathname = path.join(dir, file);
				fs.renameSync(pathname, new_pathname);
				changeSuffix(new_pathname);
			}else{
				changeSuffix(pathname);
			}
		}else{
			var ext = path.extname(pathname);
			var toExt = TRANSLATION[ext];
			if(toExt){
				var newPathName = path.join(dir, path.basename(pathname, ext) + toExt);
				if(pathname != newPathName){
					fs.renameSync(pathname, newPathName);
				}
				if('.html' == ext){
					_replace(newPathName, function(content){
						return content.replace(/\.css/g,'.gtc').replace(/css(?=\/)/g,'c')
								.replace(/\.js/g,'.gts').replace(/js(?=\/)/g,'j');
					});
				}else if('.json' == ext){
					_replace(newPathName, function(content){
						return content.replace(/"toolbar":\s*true/, '"toolbar": false').replace(/\.js/g, '.gts');
					});
				} else if ('.js' == ext) {
					_replace(newPathName, function(content){
						return content.replace(/\.js(?=['"])/g, '.gts');
					});
				}
			}
		}
	});
}
// 替换指定文件内容
function _repalce_content(dir){
	// _replace(path.join(dir, 'j/echarts.gts'), function(content){
	// 	return content.replace(/\.js/g, '.gts');
	// });
	// _replace(path.join(dir, 'j/typhoon.gts'), function(content){
	// 	return content.replace(/\/js\/"/g, '/j/"');
	// });
	// _replace(path.join(dir, 'index.gts'), function(content){
	// 	return content.replace(/index\.html/g, 'index.gt');
	// });
	_replace(path.join(dir, 'conf.json'), function(content) {
		var data = JSON.parse(content);
		delete data.debug;
		delete data.DEBUG;
		return JSON.stringify(data);
	});
}

var args = [].slice.call(process.argv);
//命令行进行指定文件压缩
if(args.length > 2){
	var dir = args[2];
	// changeSuffix(dir);
	_repalce_content(dir);
}