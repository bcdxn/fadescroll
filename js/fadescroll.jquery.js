/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Benjamin Dixon
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
;!function ($, undefined) {
  var _TEMPLATE = [
    '<div class="fade-scroll-wrapper">',
      '<div class="fade-scroll-content">',
        '{{CONTENT}}',
      '</div>',
      '<div class="bg-panel from {{FROM_CLASS}}"></div>',
      '<div class="bg-panel to {{TO_CLASS}}"></div>',
    '</div>'
  ].join(''),
  _lastScrollY = 0,
  _scrolling = false;

  $.fn.fadescroll = function (config) {
    var $self  = $(this);

    var fromClass        = config.fromClass        || 'my-from',
        toClass          = config.toClass          || 'my-to',
        fadeScrollDelta  = config.fadeScrollDelta  || 200,
        $scrollContainer = config.$scrollContainer || $(window),
        blurLocExpr      = config.blurLocExpr      || 'top',
        blurLoc          = _parseBlurLocExpr(blurLocExpr);

    $(this).each(function () {
      var markup = _TEMPLATE.replace('{{FROM_CLASS}}', fromClass)
          .replace('{{TO_CLASS}}', toClass)
          .replace('{{CONTENT}}', $(this).html());

      $(this).html(markup);
    });

    _setOpacity($('.bg-panel.to', $(this)), 0);

    $scrollContainer.on('scroll', function () {
      _onScroll($self, fadeScrollDelta, $scrollContainer, blurLoc);
    });
  };

  $.fn.fadescroll.version = '0.0.1';

  /* Private Helper Functions
  ----------------------------------------------------------------------------*/

  function _onScroll($self, fadeScrollDelta, $scrollContainer, blurLoc) {
    _lastScrollY = $scrollContainer.scrollTop();
    _requestRender($self, fadeScrollDelta, blurLoc);
  }

  function _requestRender($self, fadeScrollDelta, blurLoc) {
    if (!_scrolling) {
      _requestAnimationFrame(function () {
        _render($self, fadeScrollDelta, blurLoc);
      });
    } else {
      _scrolling = true;
    }

    setTimeout(function () {
      _scrolling = false;
    }, 50);
  }

  function _render($selection, fadeScrollDelta, blurLoc) {
    $selection.each(function (index, elem) {
      var start = $(elem).offset().top,
          scroll = _lastScrollY,
          opacity = 0;

      if (blurLoc.start === 'bottom') {
        start += -($(window).height());
      }

      start += blurLoc.offset;

      if (start < 0) { start = 0; }

      if (scroll > start) {
        opacity = (scroll - start) / fadeScrollDelta;
      }

      if (opacity > 1) { opacity = 1; }
      else if (opacity < 0) { opacity = 0; }

      _setOpacity($('.bg-panel.to', $(elem)), opacity);
    });

    // Continue to request frames IFF user is still scrolling
    if (_scrolling) {
      _requestAnimationFrame(function () {
        _render($selection, fadeScrollDelta, blurLoc);
      });
    }
  }

  function _parseBlurLocExpr(blurLocExprStr) {
    var operatorRegEx = /[\+\-]/g,
        operator = blurLocExprStr.match(operatorRegEx),
        blurLocExpr = blurLocExprStr.replace(operatorRegEx, '#').split('#');

    blurLocExpr.push(operator);
    
    if (blurLocExpr[2] !== undefined && blurLocExpr[2] !== null) {
      if (operator.toString() === '+') {
        blurLocExpr[1] = parseInt(blurLocExpr[1]);
      } else if (operator.toString() === '-') {
        blurLocExpr[1] = -(parseInt(blurLocExpr[1]));
      } else {
        throw new Error('Illegal operand in blur start location expression');
      }
    }

    return {
      'start': blurLocExpr[0],
      'offset': blurLocExpr[1]
    };
  }

  function _setOpacity($elem, opacity) {
    $elem.css('opacity', opacity);
    $elem.css('-ms-filter',
      'progid:DXImageTransform.Microsoft.Alpha(Opacity="' + opacity + '")');
  }

  /*
  Thanks Paul Irish
  @url: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  */
  var _requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function ( callback ) {
              window.setTimeout(callback, 1000 / 60);
            };
  })();
}(jQuery);