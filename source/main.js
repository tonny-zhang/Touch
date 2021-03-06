/* global process */
/* global global */
/* global __dirname */
!function(){
	// "use strict";

	var path = require('path');
	var electron = require('electron');
	var app = electron.app;
	var BrowserWindow = electron.BrowserWindow;
    var globalShortcut = electron.globalShortcut;
	var ipc = electron.ipcMain;
	var toolConsole = require('./js/console/tool');
    
	var shouldQuit = app.makeSingleInstance(function() {
		// 让全部窗口都得到焦点
		var wins = BrowserWindow.getAllWindows();
		wins.forEach(function(w) {
			w.focus();
		});
	});
	if (shouldQuit) {
		app.quit();
		return;
	}
    app.on('window-all-closed', function () {
		app.quit();
	});
	
	var conf = require('./common/tool').CONF;
	process._PACKAGE = conf;

	var win_main;
	var win_console;
	function _showWin(opt, pathName) {
		opt.title = conf.title;
		var win = new BrowserWindow(opt);
		win.loadURL(path.join('file://' , __dirname, pathName));
		win._PACKAGE = conf;
		// win.show();
		return win;
	}
	function _showMain() {
		var opt = {
			// width: 682,
			// height: 512,
			width: 1024,
			height: 768,
			show: false,
			fullscreen: true,
			autoHideMenuBar: true
		}
		if (conf.debug) {
			delete opt.fullscreen;
			delete opt.autoHideMenuBar;
		}
		win_main = _showWin(opt, 'index.html');
		if (!toolConsole.isHaveMenu()) {
			win_main.hide();
			var win = _showConsole({
				tab: 'menu',
				alert: '请先进行系统配置！'
			});
		} else {
			win_main.show();
		}
	}
	function _showConsole(data) {
		var opt = {
			width: 682,
			height: 512,
			show: true,
			autoHideMenuBar: true,
			alwaysOnTop: true
		}
		data = JSON.stringify(data);
		win_console = _showWin(opt, 'console.html'+(data? '#'+data: ''));
		if (win_main) {
			function _rmListener() {
				win_main.removeListener('focus', _fn_focus);
			}
			function _fn_focus() {
				try {
					// win_main.blur();
					
					win_console.setAlwaysOnTop(true);
					win_console.restore();
					win_console.focus();
					win_console.setAlwaysOnTop(false);
					_shake(win_console);
				} catch(e) {
					console.log(e);
					_rmListener();
				}
			}
			win_main.on('focus', _fn_focus);
			win_console.on('close', _rmListener);
		}
	}
	// 晃动窗口
	function _shake(win) {
		if (win.___shake) {
			return;
		}
		var t = 0,
			z = 3;
		var pos = win.getPosition();
		var left = pos[0],
			top = pos[1];
		win.___shake = setInterval(function() {
			var i = t / 180 * Math.PI,
				x = Math.sin(i) * z,
				y = Math.cos(i) * z;
			win.setPosition(left + x, top + y);
			if ((t += 90) > 1080) {
				clearInterval(win.___shake);
				delete win.___shake;
			}
		}, 30);
	}
	function _visibleMain() {
		if (win_main && !win_main.isVisible() && toolConsole.isHaveMenu()) {
			win_main.show();
		}
	}
	ipc.on('show.main', _visibleMain);
	ipc.on('open.console', function(e, data) {
		if (data) {
			win_main.hide();
		}
		_showConsole(data);
	});
	ipc.on('console.save', function() {
		win_main && win_main.send('console.save');
		_visibleMain();
	});
	app.on('ready', function() {
		_showMain();
		globalShortcut.register('Alt+Shift+i', function() {
            var win = BrowserWindow.getFocusedWindow();
			win && win.openDevTools();
        });
	});

	// 启动处理缓存和日志文件的子进程
	require('child_process').fork(path.join(__dirname, 'cache'));
}();
