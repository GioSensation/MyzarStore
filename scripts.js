document.addEventListener('DOMContentLoaded', function() {
	var	menuContainer = document.getElementById('menu-container'),
		viewport = document.documentElement.clientWidth,
		deviceHeight = document.documentElement.clientHeight - 50,
		hash = window.location.hash.substring(1),
		contattiInner = document.getElementById('contatti-inner'),
		designersSecondary = document.querySelector('#designers .secondary'),
		beenDoneC = false,
		beenDoneP = false,
		copyright = document.getElementById('copyright'),
		telLink = document.getElementsByClassName('telLink'),
		mapLink = document.getElementsByClassName('mapLink'),
		isiOSSafari = (navigator.userAgent.match(/Mac OS X/i)) ? true: false;

	function enlargeImgs() {
		[].forEach.call(document.querySelectorAll('.secondary__img'), function(el) {
			el.addEventListener('click', function() {
				var popped = document.querySelector('.popped'),
					classes = this.classList;
				if ( popped ) {
					if ( classes.contains('popped') ) {
						classes.remove('popped');
					} else {
						popped.classList.remove('popped');
						classes.add('popped');
					}
				} else {
					classes.add('popped');
				}
			});
		});
	}

	function lazyLoad( thing ) {
		thing.innerHTML = thing.innerHTML.replace(/<!--((.|\n|\r)*?)-->/g, '$1');
		if ( thing === contattiInner ) {
			beenDoneC = true;
		} else if ( thing === designersSecondary ) {
			enlargeImgs();
			beenDoneP = true;
		}
	}

	if ( !hash ) {
		window.location.hash = 'home';
	} else if ( hash === 'contatti') {
		lazyLoad( contattiInner );
	} else if ( hash === 'designers' ) {
		lazyLoad( designersSecondary );
	}

	if ( viewport < 767 ) {
		document.getElementById('menu-helper').addEventListener('click', function() {
			menuContainer.classList.add('menu-open');
		});

		document.getElementById('close-menu').addEventListener('click', function() {
			menuContainer.classList.remove('menu-open');
		});

		[].forEach.call( document.querySelectorAll('#menu li'), function(el) {
			el.addEventListener('click', function() {
				menuContainer.classList.remove('menu-open');
			}, false);
		});

		[].forEach.call( document.querySelectorAll('section'), function(el) {
			el.style.height = deviceHeight + 'px';

			// Fix iOS7 Safari bug preventing scrolling with -webkit-overflow-scrolling: touch;
			el.addEventListener('touchstart', function(event){});
		});

	//	document.querySelectorAll('section').style.height = deviceHeight + 'px';
	}

	if ( viewport < 1025 ) {
		// (most)Tablet scripts
		FastClick.attach(document.body);
	}

	if ( viewport > 1200 ) {
		// Desktop scripts
	}

	document.getElementById('designers-link').addEventListener('click', function() {
		if ( beenDoneP === false ) {
			lazyLoad( designersSecondary );
		}
	}, false);

	document.getElementById('contatti-link').addEventListener('click', function() {
		if ( beenDoneC === false ) {
			lazyLoad( contattiInner );
		}
	}, false);

//	[].forEach.call( document.querySelectorAll('#menu li'), function(el) {
//		el.addEventListener('click', function() {
//			if ( beenDone === false ) {
//				contattiInner.innerHTML = contattiInner.innerHTML.replace(/<!--((.|\n|\r)*?)-->/g, '$1');
//				beenDone = true;
//			}
//		}, false);
//	});

	if ( !isiOSSafari ) {
		[].forEach.call( mapLink, function(el) {
			var coords = el.getAttribute('data-coords');
			el.setAttribute('href', 'https://maps.google.com/maps?q='+ coords +'&t=m&z=17');
		});
	};

	// Recalculate viewport size after resize (smarty!)
	var resizeFired = false,
		drawing = false,
		requestAnimationFrame = window.requestAnimationFrame ||
								window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame;

	function throttleResize() {
		// set resizeFired to true and execute drawResize if it's not already running
		if (drawing === false) {
			resizeFired = true;
			drawResize();
		}
	}

	function drawResize() {
		// render friendly resize loop
		if (resizeFired === true) {
			resizeFired = false;
			drawing = true;

			document.getElementById('container').style.zIndex = 1;

			requestAnimationFrame(drawResize);
		} else {
			drawing = false;
		}
	}
	window.addEventListener('resize', throttleResize, false);

});
