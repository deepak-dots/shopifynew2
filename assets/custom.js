//toggle
$(function() {
  $('.bag, .close').click(function(e) {
    e.preventDefault();
    theme.Custom.drawertoggle('.mini-cart-slide');
  });

});

//GA notify 
function custom_ga_track_event(track_event,track_label){
  if (typeof ga != "undefined") {
    ga('send', 'event', 'Shopify Theme', track_event, track_label);
  }
  console.log('EVENT TRACKED:'+track_event+' = '+track_label);
}
$(document).ready(function() {
  $("#book_consultation").click(function(){
    custom_ga_track_event('product','book consultation');
  });
  $("a.consult").click(function(){
    custom_ga_track_event('boutique','book consultation');
  });
});

//headerfixed
$(document).ready(function() {
   $(".toshi-btn").click(function(){  
      $('.css-hmngz').html('TOSHI On-demand delivery');
   });
  $(".announcement-bar").removeClass("hide");
  //$('.header').scrollToFixed();
  /*
  $('.collection-header .filter-row').scrollToFixed({
    marginTop: $('.header').outerHeight()
  });
  */

$(document).on('click, touchstart', '.currency .submenu li a', function(e){
  e.preventDefault();
  var currency_val = $(this).parent().data('value');console.log(currency_val);
  $('select.currency-picker').val(currency_val).trigger('change');
  $("body").removeClass("mmactive");
  $("#sm_menu_ham").removeClass("open");
  $(".sm_menu_outer").removeClass("active");
});

  $("span.close-bar-btn").click(function(){
    $(".announcement-bar").addClass("hide");
    sessionStorage.setItem("closeBar", "true");
    $("body").removeClass("notify-bar");
  });

  if(sessionStorage.getItem("closeBar")){
    $(".announcement-bar").addClass("hide");
  }else{
    $(".announcement-bar").removeClass("hide");
    $("body").addClass("notify-bar");
  }

  $("p.newsearch").click(function(){
    $(".search-block.clearfix").addClass("active");
  });

  $(window).scroll(function() {
    var st = $(window).scrollTop();
    if(st > $(".announcement-bar").height()){
      $("body").removeClass("notify-bar");
    }else{
      $("body").addClass("notify-bar");
    }
  });
  
//  discount js   
   $(document).on("click","#dcodeSubmit",function() {
     //discountUpdate("500");
     $('body').addClass('hide-dcode');
     $('.dcode-fix-message').show();
     setTimeout(function(){ discountReload() },500);
   });
  $(document).on("click","#removeDiscount",function() {
   var original_price = $(".total .js-total-price span").data("currency-gbp");
   $(".total .js-total-price span").text(original_price);
  }); 
  
  if($(".template-cart").length > 0) {
      discountUpdate("100");
      $(document).on('cart.requestComplete', function(event, cart) {
        if($("#removeDiscount").length > 0) {
          $(".dcodeTable").css("display", "none");
          location.reload();
        }
      });

  }

  function discountReload(){
  	if($(".dcode-discount-label").length > 0) {
      location.reload();
    }else{
      console.log('waiting for code to apply');
      setTimeout(function(){ discountReload() },500);
    }
  }
  
  function discountUpdate(timer) {
    var myVar = setInterval(myTimer, timer);
    
    
    function myTimer() {
      
      if($(".dcode-discount-value").length > 0) {
        var discount = $(".dcode-discount-value").text(); 
        //console.log('found discount: '+discount);
        
        if ($(".dcode-discount-values").length == 0) {
         
          $(".dcode-discount-row .money").append("<span class='dcode-discount-values'>" + parseFloat(discount*1.2).toFixed(2) +"</span>");
        }   
      if($(".money .dcode-total-value").length > 0) {
        var withDiscount = $(".money .dcode-total-value").text(); 
        //console.log('found withDiscount: '+withDiscount);
        
        if ($(".dcode-total-values").length == 0) {
           $(".dcode-total-row .money").append("<span class='money dcode-total-values'>" + parseFloat(withDiscount*1.2).toFixed(2) +"</span>");
           var currency = $(".dcode-total-currency").html();
          
           //console.log('found currency: '+currency);
          
           $(".total .js-total-price span").text(currency + parseFloat(withDiscount*1.2).toFixed(2));
          //clearInterval(myVar);
           setTimeout(function(){  clearInterval(myVar); }, 10000);
        }
      }     
      
     }
      else {
       setTimeout(function(){  clearInterval(myVar); }, 10000);
      }
    }   
    
  }
 
});
