var GridWindowManager = (function() {
	function window_manager(w, h) {
		this.w = w;
		this.h = h;
		this.child_windows = [];
	}

	window_manager.prototype.init = function() {
		for(var j = 0; j < this.h; j++) {
			this.child_windows[j] = [];
			for(var i = 0; i < this.w; i++) {
				var option = {
					// width: 100,
					// height: 80,
					// top: screen.height / 2 - this.h * 50 + j * 100,
					// left: screen.width / 2 - this.w * 50 + i * 100,
					width: 1,
					height: 1,
					top: screen.height,
					left: screen.width,
					scrollbars: 'no',
					resizable: 'no',
					toolbar: 'no',
					location: 'no',
					menubar: 'no',
					status: 'no'
				};
				var option_str_arr = [];
				for(var key in option) {
					option_str_arr.push(key + "=" + option[key]);
				}
				var option_str = option_str_arr.join(",");

				var w = window.open('about:blank', '_blank', option_str);
				if(w) this.child_windows[j].push(w);
				else console.log("blocked?");
				w.blur();
			}
		}
		window.focus();
	}

	window_manager.prototype.open = function(array) {
		for(var j = 0; j < this.h; j++) {
			for(var i = 0; i < this.w; i++) {
				if(array[j][i]) {
					var top  = j * 100 + 500,
						left = i * 100 + 500;
					this.child_windows[j][i].resizeTo(100, 80);
					this.child_windows[j][i].moveTo(left, top);
					// this.child_windows[j][i].focus();
				} else {
					this.child_windows[j][i].resizeTo(1, 1);
					this.child_windows[j][i].moveTo(screen.width, screen.height);
					// this.child_windows[j][i].blur();
				}
			}
		}
	}

	window_manager.prototype.close = function() {
		for(var j = 0; j < this.h; j++) {
			for(var i = 0; i < this.w; i++) {
				// this.child_windows[j][i].resizeTo(1, 1);
				// this.child_windows[j][i].moveTo(-100, -100);
				this.child_windows[j][i].blur();
			}
		}
	}

	window_manager.prototype.destroy = function() {
		for(var j = 0; j < this.h; j++) {
			for(var i = 0; i < this.w; i++) {
				this.child_windows[j][i].close();
				this.child_windows[j][i] = null;
			}
		}
		this.child_windows = [];
		window.focus();
	}

	return window_manager;
})();

jQuery(function($, undefined) {
	var window_array = [
		[
			[0,1,1,1,0],
			[0,0,0,0,1],
			[1,1,1,1,0],
			[1,0,0,0,0],
			[1,1,1,1,1]
		],
		[
			[1,0,0,0,0],
			[1,0,0,0,0],
			[1,1,1,0,0],
			[1,0,0,1,0],
			[1,1,1,0,0]
		],
		[
			[0,0,1,0,0],
			[0,0,0,0,0],
			[0,0,1,0,0],
			[0,0,1,0,0],
			[0,1,1,1,0]
		],
		[
			[0,1,0,0,0],
			[1,1,1,1,0],
			[0,1,0,0,0],
			[0,1,0,1,0],
			[0,0,1,0,0]
		],
		[
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,1,1,0,0],
			[0,1,1,0,0]
		],
		[
			[0,0,1,1,0],
			[0,0,0,0,0],
			[0,0,0,1,0],
			[0,1,0,1,0],
			[0,0,1,0,0]
		],
		[
			[1,1,1,0,0],
			[1,0,0,1,0],
			[1,1,1,0,0],
			[1,0,0,0,0],
			[1,0,0,0,0],
		],
	];

	var n = 0, manager = new GridWindowManager(5, 5), timer = null;
	function start() {
		if(timer) return;
		manager.init();
		timer = setInterval(function() {
			if(n == window_array.length) {
				clearInterval(timer);
				// timer = null;
				n = 0;
				manager.destroy();
				return;
			}
			manager.open(window_array[n]);
			n++;
		}, 400);
	}
	// start();
//	$(window).click(start);
});