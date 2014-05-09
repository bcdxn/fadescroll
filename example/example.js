!function ($, undefined) {
  $('.test-wrapper').fadescroll({
    'fromClass': 'my-from',
    'toClass': 'my-to',
    'blurLocExpr': 'bottom+100'
  });
  $('#testWrapper3').fadescroll({
    'fromClass': 'my-from-img',
    'toClass': 'my-to-img',
    'fadeScrollDelta': 75,
  });
}(jQuery)