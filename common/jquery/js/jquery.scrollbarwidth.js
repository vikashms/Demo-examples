﻿/*
 * jQuery scrollbarWidth - v0.2 - 2/11/2009
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,b,a){$.scrollbarWidth=function(){var c,d;if(a===b){c=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body");d=c.children();a=d.innerWidth()-d.height(99).innerWidth();c.remove()}return a}})(jQuery);