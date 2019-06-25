function product_counter(){
  $('.add-product').on('click', function(){
    var parent = $(this).parents('.product-item');

    var count = parent.data('count');

    if(count) count++;
    else count = 1;

    parent.data('count', count);

    parent.find('.product-count').attr('value', count);
  });

  $('.remove-product').on('click', function(){
    var parent = $(this).parents('.product-item');

    var count = parent.data('count');

    if(count) count--;
    else count = 0;

    parent.data('count', count);

    parent.find('.product-count').attr('value', count);
  });
}




function add_to_cart(){
  $('.add-to-cart').on('click', function(){
    var parent = $(this).parents('.product-item');

    var count = parent.data('count');

    if(count){
      var product_name = parent.find('.product-name').text();

      var product_price = parent.find('.product-price').data('price');

      var product_lists = [];

      if($('.product-on-cart').length){
        var product_lists = document.getElementsByClassName('product-on-cart');
      }

      if(product_lists.length > 0){
        var it_exists = 'no';

        for(let i = 0; i < product_lists.length; i++){
          if(product_name == $(product_lists[i]).data('name')) it_exists = i;
        }

        if('no' == it_exists){
          $('.product-lists').append('<p class="product-on-cart" data-name="' + product_name + '" data-product-count="' + count + '" data-price="' + product_price + '"><span>' + product_name + '</span><span>' + count + '</span></p>');
        } else {
          $('.product-on-cart').eq(it_exists).html('<span>' + product_name + '</span><span>' + count + '</span>').data('product-count', count);
          
        }
      } else {
        $('.product-lists').append('<p class="product-on-cart" data-name="' + product_name + '" data-product-count="' + count + '" data-price="' + product_price + '"><span>' + product_name + '</span><span>' + count + '</span></p>');
      }
    }

    render_cart();
  });
}




function render_cart(){
  var products = $('.product-on-cart');

  var total = 0;

  for(let i = 0; i < products.length; i++){
    total = total + (parseFloat(products.eq(i).data('product-count')) * parseFloat(products.eq(i).data('price')));
  }

  total.toFixed(4);

  $('.total-eth-value').text(total);
}




function open_cart(){
  $('.cart').on('click', function(){
    if($('.dropdown-cart-base').hasClass('active')) $('.dropdown-cart-base').removeClass('active');
    else $('.dropdown-cart-base').addClass('active');
  });
}




function sidebar_nav(){
  $('#all-items').on('click', function(){
    $('.list-group-item').removeClass('active text-white');
    $(this).addClass('active text-white');
    $('.product-item').removeClass('hidden');
  });
  $('#utensils').on('click', function(){
    $('.list-group-item').removeClass('active text-white');
    $(this).addClass('active text-white');
    $('.product-item').addClass('hidden');
    $('.utensils').removeClass('hidden');
  });
  $('#electronics').on('click', function(){
    $('.list-group-item').removeClass('active text-white');
    $(this).addClass('active text-white');
    $('.product-item').addClass('hidden');
    $('.electronics').removeClass('hidden');
  });
}




function functionSequence() {
  product_counter();
  add_to_cart();
  open_cart();
  sidebar_nav();

  try { onstart_metamask() } catch (e) {}
}




// =========================================================
// On Load
// =========================================================
if (window.addEventListener) {
  window.addEventListener('load', function () {
    functionSequence();
  });
} else {
  window.attachEvent('onload', function () {
    functionSequence();
  });
}
