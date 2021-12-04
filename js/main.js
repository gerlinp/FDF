
(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }
    

    if($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top',0); 
    }  
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
    }

    $(window).on('scroll',function(){
        if($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top',0); 
        }  
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
        } 
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function(){
                if($(this).css('display') == 'block') { console.log('hello');
                    $(this).css('display','none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });
                
        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function(){
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity','0');
    });

    $('.js-hide-modal-search').on('click', function(){
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity','1');
    });

    $('.container-search-header').on('click', function(e){
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine : 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });


    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function(){
        var numProduct = Number($(this).next().val());
        if(numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function(){
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function(){
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function(){
            var index = item.index(this);
            var i = 0;
            for(i=0; i<=index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function(){
            var index = item.index(this);
            rated = index;
            $(input).val(index+1);
        });

        $(this).on('mouseleave', function(){
            var i = 0;
            for(i=0; i<=rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });
    
    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click',function(e){
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });

    $('.js-hide-modal1').on('click',function(){
        $('.js-modal1').removeClass('show-modal1');
    });



})(jQuery);



/**
 * cbpShop.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
 ;( function( window ) {
	
	'use strict';

	function cbpShop( el ) {
		this.el = el;
		this._init();
	}

	cbpShop.prototype = {
		_init : function() {
			var self = this;
			
			this.touch = Modernizr.touch;

			this.products = this.el.querySelectorAll( 'ul.cbp-pggrid > li' );
			Array.prototype.slice.call( this.products ).forEach( function( el, i ) {
				var content = el.querySelector( 'div.cbp-pgcontent' ),
					item = content.querySelector( 'div.cbp-pgitem' ),
					rotate = content.querySelector( 'span.cbp-pgrotate' );

				if( self.touch ) {

					rotate.addEventListener( 'touchstart', function() { self._rotateItem( this, item ); } );

					var options = content.querySelector( 'ul.cbp-pgoptions' ),
						size = options.querySelector( 'li.cbp-pgoptsize > span' ),
						color = options.querySelector( 'li.cbp-pgoptcolor > span' );
					
					size.addEventListener( 'touchstart', function() { self._showItemOptions( this ); } );
					color.addEventListener( 'touchstart', function() { self._showItemOptions( this ); } );
				}
				else {
					rotate.addEventListener( 'click', function() { self._rotateItem( this, item ); } );
				}
			} );
		},
		_rotateItem : function( trigger, item ) {
			if( item.getAttribute( 'data-open' ) === 'open' ) {
				item.setAttribute( 'data-open', '' );
				trigger.className = trigger.className.replace(/b cbp-pgrotate-activeb/,'');
				item.className = item.className.replace(/b cbp-pgitem-showbackb/,'');
			}
			else {
				item.setAttribute( 'data-open', 'open' );
				trigger.className += ' cbp-pgrotate-active';
				item.className += ' cbp-pgitem-showback';
			}
		},
		_showItemOptions : function( trigger ) {
			if( trigger.getAttribute( 'data-open' ) === 'open' ) {
				trigger.setAttribute( 'data-open', '' );
				trigger.parentNode.className = trigger.parentNode.className.replace(/b cbp-pgoption-activeb/,'');
			}
			else {
				trigger.setAttribute( 'data-open', 'open' );
				trigger.parentNode.className += ' cbp-pgoption-active';
			}
		},
		/*
		other functions..
		*/
	}

	window.cbpShop = cbpShop;

} )( window );


// products

const products = document.querySelector('#products')
const tshirt = document.querySelector('#tshirt')
const options = document.querySelectorAll('.cbp-pgopttooltip')
// let   tshirt = document.querySelector('#tshirt')

{/*<img data-color='black' data-style='style01' data-color2='white' data-src="images/clothing/tshirt/black-white-style01.jpg"/> */}

options.forEach(option => {
    option.addEventListener("click", (e) => {
        let folder = e.target.dataset.folder
        let option = e.target.dataset.option
        let number = e.target.dataset.number
        console.log(number)
        applyChange(folder,option,number)

    } )
});

// clicking on style changes the stul of picture

function applyChange(folder, option, number) {
    let target = document.querySelector(`#${folder}`)
    console.log(target)
    if (option === 'style') {
        target.innerHTML = `<img data-color='black' data-style='style0${number}' data-color2='white' src="images/clothing/tshirt/black-white-style0${number}.jpg"/>`
    }
}