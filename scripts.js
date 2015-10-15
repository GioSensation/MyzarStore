document.addEventListener('DOMContentLoaded', function() {
	var	menuContainer = document.getElementById('menu-container'),
		viewport = document.documentElement.clientWidth,
		deviceHeight = document.documentElement.clientHeight - 50,
		hash = window.location.hash.substring(1),
		menuHelper = document.getElementById('menu-helper'),
		closeMenu = document.getElementById('close-menu'),
		contattiInner = document.getElementById('contatti'),
		aboutSection = document.getElementById('about'),
		designersSection = document.getElementById('designers'),
		beenDoneA = false,
		beenDoneC = false,
		beenDoneP = false,
		copyright = document.getElementById('copyright'),
		mapLink = document.getElementsByClassName('mapLink'),
		isApple = (navigator.userAgent.match(/Mac OS X/i)) ? true: false,
		toBlur = document.querySelector( '.to-blur' );
	
	function enlarge( imageToEnlarge ) {
		// Create loading thing
		var waitEl = document.createElement( 'div' );
		waitEl.classList.add( 'loading' );
		// Create the container
		var enlargingContainer = document.createElement( 'div' );
		enlargingContainer.classList.add( 'enlarging-container' );
		// Create the image
		var image = new Image();
		image.src = imageToEnlarge.getAttribute( 'src' ).replace( '/thumbs', '' );
		image.className = 'enlarged';
		
		toBlur.classList.add( 'blurred' );
		
		enlargingContainer = document.body.appendChild( enlargingContainer );
		waitEl = enlargingContainer.appendChild( waitEl );
		function makeItShow() {
			enlargingContainer.classList.add( 'visible' );
		}
		setTimeout( makeItShow, 1 );
		
		image = enlargingContainer.appendChild( image );
		image.onload = function () {
			enlargingContainer.removeChild( waitEl );
			image.classList.add( 'loaded' );
		};
		// Let's prepare to delete the thing
		function deleteMe() {
			document.body.removeChild( enlargingContainer );
		}
		enlargingContainer.addEventListener('click', function() {
			image.classList.remove( 'loaded' );
			enlargingContainer.classList.remove( 'visible' );
			toBlur.classList.remove( 'blurred' );
			setTimeout( deleteMe, 300 );
		}, false);
	}

	function enlargeImgs() {
		[].forEach.call(document.querySelectorAll( '.to-enlarge' ), function(el) {
			el.addEventListener('click', function(event) {
				event.stopImmediatePropagation();
				enlarge( el );
			}, true);
		});
	}

	function lazyLoad( where ) {
		[].forEach.call( where.querySelectorAll( '.lazy-me' ), function ( el ) {
			el.innerHTML = el.innerHTML.replace(/<!--((.|\n|\r)*?)-->/g, '$1');
			enlargeImgs();
		} );
	}

	if ( !hash ) {
		window.location.hash = 'home';
	} else if ( hash === 'contatti') {
		lazyLoad( contattiInner );
	} else if ( hash === 'designers' ) {
		lazyLoad( designersSection );
	} else if ( hash === 'about' ) {
		lazyLoad( aboutSection );
	}

	function viewportDependantScripts() {
		if ( viewport < 767 ) {
			menuHelper.addEventListener('click', function() {
				menuContainer.classList.add('menu-open');
			});
	
			closeMenu.addEventListener('click', function() {
				menuContainer.classList.remove('menu-open');
			});
	
			[].forEach.call( document.querySelectorAll('#menu li'), function(el) {
				el.addEventListener('click', function() {
					menuContainer.classList.remove('menu-open');
				}, false);
			});
			
			// Let's make sure that we always have the correct height, so that content is always perfectly visible on screen
			toBlur.style.height = deviceHeight + 50 + 'px';
			[].forEach.call( document.querySelectorAll('section'), function(el) {
				el.style.height = deviceHeight + 'px';
	
				// Fix iOS7 Safari bug preventing scrolling with -webkit-overflow-scrolling: touch;
				el.addEventListener('touchstart', function(){});
			});
	
		//	document.querySelectorAll('section').style.height = deviceHeight + 'px';
		}
	
		if ( viewport < 1025 ) {
			// (most)Tablet scripts
		}
	
		if ( viewport > 1200 ) {
			// Desktop scripts
		}
	}
	
	viewportDependantScripts();
	
	document.getElementById('about-link').addEventListener('click', function() {
		if ( beenDoneA === false ) {
			lazyLoad( aboutSection );
		}
	}, false);

	document.getElementById('designers-link').addEventListener('click', function() {
		if ( beenDoneP === false ) {
			lazyLoad( designersSection );
		}
	}, false);

	document.getElementById('contatti-link').addEventListener('click', function() {
		if ( beenDoneC === false ) {
			lazyLoad( contattiInner );
		}
	}, false);

	if ( !isApple ) {
		[].forEach.call( mapLink, function(el) {
			var coords = el.getAttribute('data-coords');
			el.setAttribute('href', 'https://maps.google.com/maps?q='+ coords +'&t=m&z=17');
		});
	}

	// Recalculate viewport size after resize (smarty!)
	var resizeFired = false,
		drawing = false,
		requestAnimFrame = window.requestAnimationFrame ||
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
			viewportDependantScripts();

			requestAnimFrame(drawResize);
		} else {
			drawing = false;
		}
	}
	window.addEventListener('resize', throttleResize, false);
	FastClick.attach(document.body);
});
