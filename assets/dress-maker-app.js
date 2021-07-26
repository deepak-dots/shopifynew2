// variable array id(id:'N01-UK8') should be exists in the HTML code.
//Tea Dress Maker App....
var tea_dress_maker_app = { 
  name: 'Tea Dress Maker',
  settings: { canvas_id: '#dresscanvas',
              root_url: '',
              share_url: 'https://www.suzannah.com/products/custom-design-your-own-tea-dress#',
              asset_folder: '',
              error_finish_msg: "* Select all the variants to be able to add your dress to the cart.",
              error_stock_msg: "Out of stock",
              error_add_cart_msg: "Selected print product sold out.",
              test_mode: false },
        necklines: [
          {id:'N01-ROUNDED_NECK_WITH_KEYHOLE',name:'Rounded with keyhole',short_code:'ROUNDED',layer_content:'odette'},
          {id:'N02-V_NECK',name:'V neck',short_code:'NECK',layer_content:'tea'}
        ],
        sleeves: [
          {id:'N01-CLASSIC_SLEEVES',name:'Classic sleeves',short_code:'CLASSIC',layer_content:'classic'},
          {id:'N02-LENGTH_SLEEVES_WIH_GATHERED_DETAIL',name:'Length sleeves with gathered detail',short_code:'GATHERED',layer_content:'shirred'},
          {id:'N03-LONG_SLEEVES_WIH_CUFF',name:'Long sleeves',short_code:'LONG',layer_content:'long'}
        ],
        lengths: [
          {id:'standard length',name:'Standard length',short_code:'STANDARD',layer_content:'knee'},
          {id:'midi length',name:'Midi length',short_code:'MIDI',layer_content:'midi'},
          {id:'maxi length',name:'Maxi length',short_code:'MAXI',layer_content:'maxi'}
        ],
        prints: [],
        sizes: [
          {id:'N01-UK8',name:'UK8',short_code:'UK8'},
          {id:'N02-UK10',name:'UK10',short_code:'UK10'},
          {id:'N03-UK12',name:'UK12',short_code:'UK12'},
          {id:'N01-UK14',name:'UK14',short_code:'UK14'},
          {id:'N02-UK16',name:'UK16',short_code:'UK16'}
        ]
  };
    var error_finish_msg = "Select all the variants to be able to add your dress to the cart";

  var tea_dress_maker_app_app_loader = {};
$(document).ready(function(){

  define_szapp(tea_dress_maker_app);

  /*tea_dress_maker_app_app_loader.load_cbapp_html = function(){
    let html_src = "https://test.com/app";
    $.ajax({ type: "GET",
       url: html_src,
       success : function(text)
       {
           $('body.template-product').prepend(text);
           //console.log('app html loaded');
           setup_szapp(tea_dress_maker_app);
       }
    });
  }*/

  tea_dress_maker_app_app_loader.load_cbapp_prints_json = function(){
    let prints_collection_url = 'https://www.suzannah.com/collections/prints';
    console.log(prints_collection_url)
    $.get( prints_collection_url , function( json_string ) {
      var data = jQuery.parseJSON(json_string);
      var prints = data.products;
      if(prints){
        //save them somewhere
        tea_dress_maker_app.prints_json_string = json_string;

        //and trigger
        tea_dress_maker_app_app_loader.load_trigger();
      }
    });
  };

  tea_dress_maker_app_app_loader.load_trigger = function(){
    this.load_counter += -1;
    //if(this.load_counter == 0){
      setup_szapp(tea_dress_maker_app);
   // }
  };

  tea_dress_maker_app_app_loader.load = function(){
    //do 2 ajax load operations
    // carolina_bucci_bracelet_app_loader.load_counter = 2;
    // carolina_bucci_bracelet_app_loader.load_cbapp_html();
    tea_dress_maker_app_app_loader.load_cbapp_prints_json();
  };
  tea_dress_maker_app_app_loader.load();


  function setup_szapp(app){
    /* start button */
    $('.cba-button-launch').click(function(){ app.event_start('blank'); });
    $('.cba-button-launch-continue').click(function(){ app.event_start('stored'); });
    $('.cba-button-launch-shared').click(function(){ app.event_start('shared'); });

    $('.sz-button-continue').click(function(){ app.event_steps(); });
    $('.sz-button-step').click(function(){  app.event_button_step($(this)); });   

    // Desktop button step back
    $('.sz-button-step-back').click(function(){ app.event_button_step_back($(this)); });

   /* Mobile button */
    $('.sz-button-mobile-previous').click(function(){  app.event_mobile_button_step($(this)); });
    $('.sz-button-mobile-next').click(function(){  app.event_mobile_button_step($(this)); });
    $('.sz-button-mobile-step').click(function(){  app.event_mobile_button_step($(this),'dropdown'); });
    $('ul.sz-dress-mobile-steps li').click(function(){  app.event_show_mobile_steps(); });
    

    /* back button */
    $('.cba-button-back').click(function(){ app.event_end(); });

    /* Help popup button */
    $('.sz-button-help').click(function(){ app.event_show_info('help'); });
    $('.sz-button-close').click(function(){ app.action_show_overlay(false); });

    /* info popup button */
    $('.sz-button-terms').click(function(){ app.action_show_panel_popup('terms'); });
    $('.sz-button-info').click(function(){ app.action_show_panel_popup('product-info'); });
    $('.sz-button-size').click(function(){ app.action_show_panel_popup('size-guide'); });
    $('.sz-panel-button-close').click(function(){ app.action_show_panel_popup('close'); app.action_reset_print_image_zoom();});
    $('.sz-button-back').click(function(){ app.action_show_panel_popup('close'); app.action_reset_print_image_zoom();});

    $('.sz-button-exit-cancel').click(function(){ app.event_confirm_exit(false) });
    $('.sz-button-exit-confirm').click(function(){ app.event_confirm_exit(true) });
    $('.sz-button-add-cart-cancel').click(function(){ app.event_confirm_exit(false); app.action_switch_canvas_view("front"); });
    $('.sz-button-add-cart-confirm-canel').click(function(){ app.action_show_panel_popup('complete'); });

    /* Mobile read more button */
    $('.sz-button-more').click(function(){ app.action_show_more_print(); });
    $('.sz-button-less').click(function(){ app.action_show_less_print(); });

    $('.sz-button-zoom').click(function(){ 
      if($(".sz-button-zoom").hasClass("disable")) return false;
      app.action_show_panel_popup('zoom'); 
      app.action_show_print_image_zoom();
    });

    /* Zoom popup button for mobile*/
    if (window.matchMedia('(max-width: 767px)').matches) {
      $(document).on("click", ".panel-print ul li.option-button", function(){
        if (app.data.doubleclicks == 0) {
          app.data.doubleclicks = new Date().getTime();
        } else {
          if (((new Date().getTime()) - app.data.doubleclicks) < 500) {
            app.action_show_panel_popup('zoom');
            app.action_show_print_image_zoom();
            app.data.doubleclicks = 0;
          } else {
            app.data.doubleclicks = 0;
          }
        }
      });
    }

    $('.sz-button-finish').click(function(){ app.event_finish(); });
    $('.sz-button-add-cart').click(function(){ app.event_add_to_cart(true) });

    $('.sz-button-share-link').click(function(){ app.event_share("url") });
    $(".sz-terms").change(function() {  app.event_terms_check($(this)); });

    // Draw Canvas view mode Front/Back
    $('.sz-canvas-view-back').click(function(){ app.action_switch_canvas_view("back") });
    $('.sz-canvas-view-front').click(function(){ app.action_switch_canvas_view("front") });

     // Draw Canvas mobile view mode Front/Back
    $('.sz-canvas-view-back-mobile').click(function(){ app.action_switch_canvas_mobile_view("back") });
    $('.sz-canvas-view-front-mobile').click(function(){ app.action_switch_canvas_mobile_view("front") });

    app.setup_stage();
    app.setup_options();
    app.setup_prints_json();

    //add a continue with saved dress
    if(localStorage.dress_stored == 1) {
      $('.cba-button-launch-continue').show();
      $('.cba-button-launch').text('CREATE A DRESS');
    }

    //do we have a linked URL
    if(app.get_uri_data()){
      $('.cba-button-launch-shared').show();
      //AND LAUNCH
      app.event_start('shared');
    }

  }
  function define_szapp(app){
    //event : something has happened
    //action : do something
    //get : give me data
    //set : set some data


    app.data = {};
    app.data.missclicks = 0;
    app.data.doubleclicks = 0;
    app.data.engine = '';

    // ------------------------------------------------------------------
        /* 1. __EVENT */
    // ------------------------------------------------------------------

    app.event_start = function(type) {
      //do start up
      app.action_onload_draw_canvas();
      this.action_app_show();
      this.action_init_dress_data();

      if(type == 'blank') {
        app.action_wipe_bracelet();
        app.action_show_panel_step('neckline');
        app.action_show_mobile_button("size", "sleeve");
        app.action_update_steps_breadcrumb("neckline");
        app.setup_canvas_dress();
        
      }

      //restore saved (only if we have saved!)
      if(type == 'stored'){
        this.event_restore_on_launch(type);
      }

      if(type == 'shared'){
        this.event_restore_on_launch(type);
      }
    }

    app.event_restore_on_launch = function(type){
      if(type == 'stored'){
        if(localStorage.dress_stored == 1){
          this.action_restore_dress();
        }
      }
      if(type == 'shared'){
        this.action_load_from_url();
      }
    }

    app.event_end = function(){
      //do shutdown up
      //this.action_app_hide();
      this.action_show_panel_popup('exit', 'hide');
      //this.action_show_mobile_tab('exit');

      //set exit msgs
      if(this.data.storage_type=='shared'){
        $('panel-exit-msg p').text('');
      }else{
        $('panel-exit-msg p').text('We will save your design to the browser');
      }
    }

    app.event_show_info = function(action) {
      app.action_show_overlay(true, action);
    }

    app.event_confirm_exit = function(is_confirmed){
      if(is_confirmed){
        if(this.data.storage_type!='shared'){
          this.action_store_dress(); //save our bracelet
        } 
        this.action_app_hide();
        //bead_event_track('close','app closed');
      }else{
        this.action_show_panel_popup('sz-panel');
        app.action_switch_canvas_view("back");
        //this.action_header_logo("show");
      }
    }

    app.event_steps = function() {
      //console.log(this.data.dress_parts);
      if($(".sz-button-continue").hasClass("disable")) return false;
      let parts = this.data.dress_parts;
      var next = '';

      if($(".sz-button-continue").data('next-step')) {
        var next = $(".sz-button-continue").attr('data-next-step');
      }
      if (next == 'neckline') {
        app.action_show_panel_step('sleeve');
        app.action_update_back_step('neckline');
        if( parts['sleeves'] == undefined) app.action_continue_button(false);
        if( parts['sleeves'] != undefined) $(".sz-button-continue").attr('data-next-step', "sleeve");
        app.action_update_steps_breadcrumb('sleeve');
        var save_id = $("ul.neckline li.selected").data("id");
        app.action_swap_neckline(save_id);
        app.event_mobile_button_step("sleeve", "continue");
        return true;
      }
      
      if (next == 'sleeve') {
        app.action_show_panel_step('length');
        app.action_update_back_step('sleeve');
        if( parts['lengths'] == undefined) app.action_continue_button(false);
        if( parts['lengths'] != undefined) $(".sz-button-continue").attr('data-next-step', "length");
        app.action_update_steps_breadcrumb('length');
        var save_id = $("ul.sleeve li.selected").data("id");
        app.action_swap_sleeve(save_id);
        app.event_mobile_button_step("length", "continue");
        return true;
      }

      if (next == 'length') {
        app.action_show_panel_step('print');
        app.action_update_back_step('length');
        if( parts['prints'] == undefined)app.action_continue_button(false);
        //if( parts['prints'] == undefined)app.action_show_zoomprint_button(false);
        if( parts['prints'] != undefined) $(".sz-button-continue").attr('data-next-step', "print");
        app.action_update_steps_breadcrumb('print');
        var save_id = $("ul.length li.selected").data("id");
        app.action_swap_length(save_id);
        app.event_mobile_button_step("print", "continue");
        return true;
      }

      if (next == 'print') {
         app.action_show_panel_step('size');
          app.action_update_back_step('print');
        if( parts['sizes'] == undefined)app.action_continue_button(false);
        //if( parts['sizes'] == undefined)app.action_show_zoomprint_button(false);
        if( parts['sizes'] != undefined) $(".sz-button-continue").attr('data-next-step', "size");
        app.action_update_steps_breadcrumb('size');
        var save_id = $("ul.print li.selected").data("id");
        app.action_swap_print(save_id);
        app.event_mobile_button_step("size", "continue");
        return true;
      }
      if (next == 'size') {
        app.action_continue_button(false);
        app.action_update_back_step('size');
        app.action_update_steps_breadcrumb('final');
        var save_id = $("ul.size li.selected").data("id");
        app.action_swap_size(save_id);
       // app.event_mobile_button_step("size", "continue");
        return true;
      }
    }

    app.event_first_draw =  function(){
      //this.get_size();
      this.setup_dress();
      //this.event_resize();
    }

    app.event_finish = function(){
      //can only finish if ready
      if(this.get_is_tea_dress_complete() || (this.settings.test_mode)){
        //bead_event_track('finish','bracelet completed');
        this.action_show_panel_popup('complete');
        app.action_update_final_canvas_layer();
        this.action_switch_canvas_view("both");
        //this.action_show_steps_selected_option();
        //this.action_save_image();
      }else{
        //bead_event_track('finish','bracelet NOT completed');

        this.data.missclicks = this.data.missclicks + 1;
        if( this.data.missclicks == 3 ){
          this.action_show_steps_finish_error();
          this.action_show_steps_breadcrumb_error();
          //alert("* Select all the variants to be able to add your dress to the cart.");
          this.data.missclicks = 0;
        }
      }
    }

    app.event_remove_print_product = function(event){
        var product_id = event.parents(".product-desc").find(".printsku").data("name");
        var dress_qty = event.parents(".product-desc").find(".printsku").data("quantity");
        var print_qty = $("div.sz-product-desc-info[data-id='"+product_id+"']").data("quantity");
        var update_qty =  parseInt(print_qty) - parseInt(dress_qty);
        app.action_update_cart(update_qty, product_id);
    }

    app.action_update_cart = function(qty,var_id){
        CartJS.updateItemById(var_id, qty);
    }

    app.event_add_to_cart = function(confirmed){
      if(confirmed){
        if($(".sz-button-add-cart").hasClass("disable")) {
          return true;
        }
        // do the print product add to cart code
        app.action_print_product_add_to_cart();

        //do the add to cart code!
        //app.action_add_to_cart();
        //wipe the storage?
        //this.action_wipe_bracelet();
        //store it instead!

        this.action_store_dress();
        //bead_event_track('click','add to cart');
      }else{
        this.action_show_panel_popup('sz-panel');
      }
    }

    app.event_button_step =  function(e){
      //if(e.closest("li").hasClass("current")) return true;
      var step = e.closest("li").data("steps"); 
      
      // change steps click on mobile short name label 
      if (window.matchMedia('(max-width: 767px)').matches) {
          $('ul.sz-dress-mobile-steps li[data-steps="' + step + '"] a').trigger("click"); 
      }
      // change steps click on mobile short name label 

      app.action_update_final_canvas_layer();

      var step_pre = e.closest("li").data("previous");
      var is_next_step = e.closest("li").prev().hasClass("current");
      console.log('event_button_step : is next step = '+ is_next_step); 
      
      if(e.closest("li").hasClass("completed") || e.closest("li").hasClass("current")) {
         var title = e.text();
         app.action_title_update(title);
         app.action_update_back_step(step_pre);
         app.action_show_panel_step(step);
         app.action_continue_button(true);
         if(step == 'print') {
            app.action_show_zoomprint_button(true);
            app.action_confirm_stock();
          }else{
            app.action_show_zoomprint_button(false);
          }
         //$(".sz-button-continue").removeData( "next-step");
         $(".sz-button-continue").attr('data-next-step', step);

      }else{

        if(!$(".sz-button-continue").hasClass("disable")){
           if(e.closest("li").hasClass("active")){
              $(".sz-button-continue").trigger("click");
           }
        }
      }
      if(e.closest("li").hasClass("current")) app.action_continue_button(false);
    }

    // Desktop Step back Event
    app.event_button_step_back =  function(e){
      var target = e.attr("data-step-back");
      if(target != undefined && target != '')$('ul.sz-dress-steps-breadcrumb li[data-steps="' + target + '"] a').trigger("click");
    }

    app.event_mobile_button_step =  function(event, type){
        $("ul.sz-dress-mobile-steps li").removeClass("current");
        if(type == 'dropdown') {
         var step = event.closest("li").attr("data-steps");
         $("ul.sz-dress-mobile-steps").removeClass("show-mobile-steps");
         app.event_show_mobile_steps();
        }
        else if( type == 'restore' || type == 'continue') var step = event;
        else{
        var step = event.attr("data-steps");
        }
        app.action_show_panel_step(step);
        
        if(step == 'print') {
          app.action_show_zoomprint_button(true);
          app.action_confirm_stock();
        }else{
          app.action_show_zoomprint_button(false);
        }

        $("ul.sz-dress-mobile-steps li").each(function(index,value){
        var slected_id = $(this).data("steps");
        if(slected_id == step) {
          $(this).addClass("current");
          var previous = $(this).prev().data("steps");
          var next = $(this).next().data("steps");
          if(step == 'size') next = 'neckline';
          if(step == 'neckline') previous = 'size';
          app.action_show_mobile_button(previous, next);
        }
      });
      app.action_update_final_canvas_layer();
    }
   
    app.event_show_mobile_steps =  function() {
       $("ul.sz-dress-mobile-steps").toggleClass("show-mobile-steps");
    }

    app.event_share = function(type){
      //bead_event_track('share',type);
      var uri = app.action_share(type);
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val(uri).select();
      document.execCommand("copy");
      $temp.remove();
      $(".js-copied-text").addClass("active");
      setTimeout(function(){ 
        $(".js-copied-text").removeClass("active");
      }, 1000);
            
    }

    app.event_terms_check = function(event) {
      var ischecked= event.is(':checked');
      if(ischecked) {
        $(".sz-button-add-cart").removeClass("disable");
      }
      else{ 
         $(".sz-button-add-cart").addClass("disable");
        return false;
      }
    }


    // ------------------------------------------------------------------
        /* 2. __ACTIONS */
    // ------------------------------------------------------------------


    app.action_init_dress_data = function() {
      this.data.dress_parts = [];
    }

    app.action_app_show = function(){
      $('body').addClass('show-app');
      //this.action_show_panel_popup('cba-panel');
      /*
      if(!this.data.isCached){
        this.setup_cache();
        this.data.isCached = true;
      }
      */
    }

    app.action_show_panel_popup = function(action, logo) {
      $(".app-head-logo").removeClass("popup-logo").show();
      if(logo == 'hide') {
        $(".app-head-logo").addClass("popup-logo").hide();
      }

      // hide options to show the double image in the mobile version
      app.action_hide_mobile_dress_part(false);

      if(action == "complete") app.action_hide_mobile_dress_part(true);

      let all_panels = ['.sz-panel-tab','.panel-exit', '.panel-complete', '.panel-zoom', '.panel-share', '.panel-save', '.panel-product-info', '.panel-size-guide', '.panel-terms'];
      $.each(all_panels,function(index,value){
        if(value.includes(action)){
          $(value).css("display", "flex");
        }else{
          $(value).hide();
        }
      });
    }

    app.action_add_print_zoom_content = function() {
      var zoomselectprotitle = $('.panel-print ul .option-button.selected').data("title");
      $('.panel-zoom .popup-content-block h2').html(zoomselectprotitle);
      var zoomselectimg = $('.panel-print ul .option-button.selected').data("zoomimg");
      $('.panel-zoom .zoom-block img.zoomer-image').attr("src",zoomselectimg);
    }

    app.action_show_print_image_zoom = function() { 
      //app.action_add_print_zoom_content();     
      $(".zoomer_basic").zoomer({
          controls: {
              zoomIn: ".zoomer_custom_zoom_in",
              zoomOut: ".zoomer_custom_zoom_out"
          },
          customClass: "custom",
          increment: 0.9,
          interval: 0.1
      });
    }

    app.action_reset_print_image_zoom = function() {
      $(".zoomer-zoom-out").hide();
      $(".zoomer-zoom-in").show();
      $(".zoomer_basic").zoomer("destroy");
    }

    app.action_show_dress_price = function() {      
      var szprice = $('.panel-length ul .option-button.selected span.price').text();
      $(".sz-select-variant-price").html(szprice);
      $('.panel-complete a.sz-button-terms span').html(szprice);
      $('.panel-terms a.sz-button-add-cart span').html(szprice);
    }

    app.action_restore_dress = function() {
      var last_step = '';
      if(typeof localStorage.dress_stored != 'undefined') {
        var steps = app.dress_store_array();
        for( var key in steps ) {
          if(localStorage.getItem(steps[key]) != undefined || localStorage.getItem(steps[key]) != null) {
            var editedText = key.slice(0, -1);
            this.data.dress_parts[key] = JSON.parse(localStorage.getItem(steps[key]));
            $(".sz-button-continue").attr('data-next-step', editedText);
            app.event_option_click(editedText,this.data.dress_parts[key], "restore");
            app.action_update_steps_breadcrumb(editedText);
            last_step = editedText;
          }
        }
        if(last_step != '') {
          app.action_show_panel_step(last_step);
          app.event_mobile_button_step(last_step, "restore");
        } 
      }
    }

    app.action_show_panel_step = function(action, button) {
      app.action_hide_mobile_dress_part(false);
      app.action_show_out_of_stock_message(false);

      if(action == "size"){
        app.action_update_last_step_button_text(true);  
      }else{
        app.action_update_last_step_button_text(false);
      }

      if(action == "neckline"){
        app.action_hide_first_step_button_back(true);  
      }else{
        app.action_hide_first_step_button_back(false);
      }

      let all_panels = ['.panel-neckline', '.panel-sleeve', '.panel-length', '.panel-print', '.panel-size'];
      $.each(all_panels,function(index,value){
        if(value.includes(action)){
          $(value).css("display", "flex");
        }else{
          $(value).hide();
        }
      });
    }

    app.action_show_mobile_button = function(previous, next) {
      $(".sz-button-mobile-previous").attr("data-steps", previous).text(previous);
      $(".sz-button-mobile-next").attr("data-steps", next).text(next);
    }

    app.action_app_hide = function(){
      $('body').removeClass('show-app'); 
      this.action_show_panel_popup('sz-panel');
    }

    app.action_continue_button = function(is_confirmed) {
      if(is_confirmed){
        $(".sz-button-continue").removeClass("disable");
      }else{
        $(".sz-button-continue").addClass("disable");
      }
    }

    app.action_update_last_step_button_text = function(is_confirmed){
        if(is_confirmed){
          $(".sz-continue-button-text").html("APPLY");
        }else{
          $(".sz-continue-button-text").html("APPLY & CONTINUE");
        }
    };

    app.action_hide_first_step_button_back = function(is_confirmed){
        if(is_confirmed){
          $(".sz-button-step-back").addClass("hide");
        }else{
          $(".sz-button-step-back").removeClass("hide");
        }
    };

    app.action_show_zoomprint_button = function(is_confirmed) {
      if(is_confirmed){
        if($(".panel-print ul li.option-button.selected").length > 0 ){
          $(".sz-button-zoom").removeClass("disable");
        }else{
          $(".sz-button-zoom").addClass("disable");
        }
      }else{
        $(".sz-button-zoom").addClass("disable");
      }
    }

/*    app.action_check_stock_available = function(){
      let availability = '';
      availability = $('.panel-print ul li.option-button.selected').data("available");
      if(availability == true && availability != undefined) {
        return true;
      }
      return false;
    };
*/
    app.action_confirm_stock = function(action){
      let availability = '';
      availability = $('.panel-print ul li.option-button.selected').data("available");
      if(action == 'finish' && availability == '' || availability == undefined) {
        return true;
      }
      if(availability == true || availability == undefined) {
        $('.sz-print-stock-error').html("");
        $('.sz-print-stock-error').addClass("hide");
        app.action_continue_button(true);
      }
      else{
        $('.sz-print-stock-error').removeClass("hide");
        $('.sz-print-stock-error').html(this.settings.error_stock_msg);
        $(".sz-button-finish").addClass("disable");
        app.action_continue_button(false);          
      }
    };

    app.action_show_out_of_stock_message = function(show){
        $('.sz-print-stock-error').html("");
        $('.sz-print-stock-error').addClass("hide");
        app.action_continue_button(false);
    };

    app.action_show_overlay = function(show_me, action){
      if(show_me && action) {
      app.action_show_panel_popup('sz-panel');
      let all_panels = ['.panel-help'];
      $.each(all_panels,function(index,value){
        if(value.includes(action)){
          $(value).show();
        }else{
          $(value).hide();
        }
      });
        $(".app-head-logo").show();
      }
      else{
        if($(".popup-logo").length > 0 ) $(".app-head-logo").hide();
        $('.app-popup').hide();
      }
    }

    app.action_update_steps_breadcrumb = function(id) {

      if(id == 'final') {
        // $("ul.sz-dress-steps-breadcrumb li").last().addClass("completed");
        $("ul.sz-dress-steps-breadcrumb li:last-child").addClass("completed");
        $("ul.sz-dress-steps-breadcrumb li:last-child").removeClass("current");

        $("ul.short-name-label li:last-child").addClass("completed");
        $("ul.short-name-label li:last-child").removeClass("current");

        var step = 'size';
        var short_name = $("ul." + step + ' li.selected').data("short-name");
        $("ul.short-name-label li:last-child").find("span").text(short_name);
        return true;
      }

      $("ul.sz-dress-steps-breadcrumb li").removeClass("current");
      $("ul.sz-dress-steps-breadcrumb li").each(function(index,value){
        var slected_id = $(this).data("steps");
        if(slected_id == id) {
          var title = $(this).children().text();
          app.action_title_update(title);
          if(id == 'neckline') {
            $("ul.sz-dress-steps-breadcrumb li").removeClass("completed");
          }
          else {
            $(this).prev().addClass("completed");
          }
          $(this).addClass("current");
        }
      });

      // short navigation update
      $("ul.short-name-label li").removeClass("current");
      $("ul.short-name-label li").each(function(index,value){
        var slected_id = $(this).data("steps");
        if(slected_id == id) {
          if(id == 'neckline') {
            $("ul.short-name-label li").removeClass("completed");
          }
          else {
            $(this).prev().addClass("completed");
            var cls = $(this).prev().data("steps");
            var short_name = $("ul." + cls + ' li.selected').data("short-name");
            $(this).prev().find("span").text(short_name);
          }
          $(this).addClass("current");
        }
      });
    }

    app.action_show_steps_breadcrumb_error = function() {
      $("ul.sz-dress-steps-breadcrumb li").each(function(index,value){
        if($(this).hasClass("completed")){
            $(this).removeClass("error");
        }else{
            $(this).addClass("error");
        }
      });
    }

    app.action_show_steps_finish_error = function() {
        $(".sz-steps-finish-error").html(this.settings.error_finish_msg);
        setTimeout(function(){ 
            $(".sz-steps-finish-error").html("");
         }, 5000);
    }

    app.action_show_add_cart_error = function() {
        $(".sz-error-add-cart").html(this.settings.error_add_cart_msg);
        setTimeout(function(){ 
            $(".sz-error-add-cart").html("");
         }, 20000);
    }

    app.action_title_update = function(title) {
      if(title != '') {
        $(".sz-title span").text(title);
      }
    }

    app.action_show_more_print = function() {
      size_li = $("ul.print li").size();
      x=12;
      x= (x <= size_li) ? size_li : size_li;
      $('ul.print li:lt('+x+')').show();
      $('#showLess').removeClass("hide");
      if(x == size_li)$('#loadMore').addClass("hide");
    }

    app.action_show_less_print = function() {
      $('ul.print li').not(':lt(12)').hide();
      $('#loadMore').removeClass("hide");
      $('#showLess').addClass("hide");
    }

    app.action_update_back_step = function(step) {
      if(step) {
        $(".sz-button-step-back").attr("data-step-back", step);
      }
    }

    app.action_check_bracelet_complete = function(){
      if (this.get_is_tea_dress_complete()){
        $('.sz-button-finish').removeClass('disable');
      }
    }

    app.event_option_click = function(type,id, action){

      //console.log(type + "==============" + id);
      let label = type + ' - ' + id;
     // bead_event_track('click',label);
      var options = ["neckline", "sleeve", "length", "print", "size"];
      if(jQuery.inArray(type, options) !== -1) {
         app.selected_dress_opt(type, id);
         app.action_continue_button(true);

         if(!$('ul.sz-dress-steps-breadcrumb li[data-steps="' + type + '"]').next().hasClass("active")){
            $('ul.sz-dress-steps-breadcrumb li[data-steps="' + type + '"]').next().addClass("active"); 
         }
         
         if(type == 'print') {
            app.action_show_zoomprint_button(true);
            app.action_confirm_stock();
         }else{
            app.action_show_zoomprint_button(false);
         }

         if(type == 'length') {
            app.action_show_dress_price();
         }
      }
      if(action == 'restore') {
        setTimeout(function(){
          if(type == 'neckline') app.action_swap_neckline(id);
          if(type == 'sleeve') app.action_swap_sleeve(id);
          if(type == 'length') app.action_swap_length(id);
          if(type == 'print') app.action_swap_print(id);
          if(type == 'size') app.action_swap_size(id);
        
        }, 500);
      }
      else {
          if(type == 'neckline') app.action_swap_neckline(id);
          if(type == 'sleeve') app.action_swap_sleeve(id);
          if(type == 'length') app.action_swap_length(id);
          if(type == 'print') app.action_swap_print(id);
          if(type == 'size') app.action_swap_size(id); 

          //if(type != 'size') app.action_update_canvas_layer(type,id);       
      }
    }

    app.action_swap_neckline = function(id) {
      let necklines = this.sprites['necklines'];
      this.data.dress_parts['necklines'] = id;
      app.action_update_canvas_layer('neckline',id);
      app.action_check_bracelet_complete();
    }

    app.action_swap_sleeve = function(id) {
      let sleeves = this.sprites['sleeves'];
      this.data.dress_parts['sleeves'] = id;
      app.action_update_canvas_layer('sleeve',id);
      app.action_check_bracelet_complete();
    }

    app.action_swap_length = function(id) {
      let lengths = this.sprites['lengths'];
      /*
      var newTexture = PIXI.Texture.fromImage(app.get_bracelet_image('tips',id));
      necklines.texture = newTexture;*/
      this.data.dress_parts['lengths'] = id;
      app.action_update_canvas_layer('length',id);
      app.action_check_bracelet_complete();
    }

    app.action_swap_print = function(id) {
      let prints = this.sprites['prints'];
      /*
      var newTexture = PIXI.Texture.fromImage(app.get_bracelet_image('tips',id));
      necklines.texture = newTexture;*/
      this.data.dress_parts['prints'] = id;
      app.action_update_canvas_layer('print',id);
      app.action_check_bracelet_complete();
      app.action_confirm_stock();
    }

    app.action_swap_size = function(id) {
      let sizes = this.sprites['sizes'];
      /*
      var newTexture = PIXI.Texture.fromImage(app.get_bracelet_image('tips',id));
      necklines.texture = newTexture;*/

      this.data.dress_parts['sizes'] = id;
      app.action_check_bracelet_complete();
    }

    app.action_store_dress = function(){
      var steps = app.dress_store_array();
      for( var key in steps ) {
        if(this.data.dress_parts[key] != undefined)
        localStorage.setItem(steps[key], JSON.stringify(this.data.dress_parts[key]));
      }
      localStorage.dress_stored = 1;
    }

    app.action_wipe_bracelet = function(){
      $('.sz-button-finish').addClass('disable');
      $("ul li.option-button").removeClass("selected");
      $("ul.short-name-label li span").text(" - ");
      var steps = app.dress_store_array();
      for( var key in steps ) {      
        localStorage.removeItem(steps[key]);
      }
      localStorage.removeItem('dress_stored');
    }

    app.action_share = function(type){
      //let share_url = "https://test.com/dress/" + this.get_dress_uri();
      let share_url = this.get_share_url();
      if(type == 'url'){
        return share_url;
      }
    }

    app.action_add_to_cart = function(){
      //select the correct length
      let length_ids = ['standard','midi','maxi'];
      let length = this.data.dress_parts['lengths'].toLowerCase();
      $.each(length_ids,function(index,length_id){
        if(length.includes(length_id)){
          $(".single-option-selector-dress-maker").val(length).change();
          $dropdown = $('.single-option-selector-dress-maker').prettyDropdown({
                  classic: true,
                  selectedMarker: ''
                });
          $dropdown.refresh();
        }
      });
      //add our custom data
      let neckline_name = this.get_name(this.necklines,this.data.dress_parts['necklines']);
      let sleeve_name = this.get_name(this.sleeves,this.data.dress_parts['sleeves']);
      let length_name = this.get_name(this.lengths,this.data.dress_parts['lengths']);
      let print_name = this.get_name(this.prints,this.data.dress_parts['prints']);
      let size_id = this.get_name(this.sizes,this.data.dress_parts['sizes']);
      let print_sku = this.get_print_vid();
      $('#neckline').val(neckline_name);
      $('#sleeve').val(sleeve_name);
      $('#print').val(print_name);
      $('#length').val(length_name);
      $('#size').val(size_id);
      $('#printsku').val(print_sku);

/*
      let view = this.get_share_url();
      $('#view').val(view);

      let image = this.settings.root_url + this.data.saved_image;
      $('#image').val(image);
*/
      //triggers the add to cart
      $('.js-AddToCart').trigger('click');
      //close the app or it gets messy
      setTimeout(function(){
        app.action_button_text_update(false);
        app.action_app_hide();
      }, 2000);
    }

    // Print product Add To cart
    app.action_print_product_add_to_cart = function(){
      app.action_button_text_update(true);
      var product_id = app.get_print_vid();
      if(product_id && product_id != undefined){
        CartJS.addItem(product_id, 1, {}, {

            // Define a success callback to display a success message.
            "success": function(data, textStatus, jqXHR) {
                app.action_add_to_cart();
                console.log("print product addedd..!");
            },

            // Define an error callback to display an error message.
            "error": function(jqXHR, textStatus, errorThrown) {
                app.action_show_add_cart_error();
                app.action_button_text_update(false);
                app.action_minicart_error_hide(true);
                console.log("error print product sold out..!");
            }

        });
        
      }
    }

    app.action_minicart_error_hide = function(is_confirmed){
      if(is_confirmed) {
      setTimeout(function () {
       $(".err-msg").addClass("hide");}, 1000);
      }
    }

    app.action_button_text_update = function(is_confirmed){
      if(is_confirmed){
        $(".sz-button-cart-text").removeClass("hide");
        $(".sz-button-add-cart").addClass("hide");
      }else{
        $(".sz-button-cart-text").addClass("hide");
        $(".sz-button-add-cart").removeClass("hide");
      }
    }

    app.action_update_final_canvas_layer = function() {
      var options = ["neckline", "sleeve", "length", "print"];
      $.each(options,function(index,type){
        var id = app.data.dress_parts[type+'s'];
        if(id){
          app.action_update_canvas_layer(type,id);
          app.selected_dress_opt(type, id);
        }else{
          if(type == "neckline"){
            app.data.engine.action_set_layer('bodice','odette');
          }
          if(type == "sleeve"){
            app.data.engine.action_set_layer('sleeve','classic');
          }
          if(type == "length"){
            app.data.engine.action_set_layer('skirt','midi');
          }
          if(type == "print"){
            app.data.engine.action_show_masks(false);
          }
          app.selected_dress_opt(type, '');
        }
      });
    }

    app.action_update_canvas_layer = function(type,id) {
  
      if(type == 'neckline'){
          let necklines = this.sprites['necklines'];
          let neckline_layer_content = this.get_layer_content(this.necklines,id);
          app.action_draw_layer_canvas('bodice', neckline_layer_content); 
      }

      if(type == 'sleeve'){
          let sleeves = this.sprites['sleeves'];
          let sleeve_layer_content = this.get_layer_content(this.sleeves,id);
          app.action_draw_layer_canvas('sleeve', sleeve_layer_content); 
      }

      if(type == 'length'){
          let lengths = this.sprites['lengths'];
          let length_layer_content = this.get_layer_content(this.lengths,id);
          app.action_draw_layer_canvas('skirt', length_layer_content);  
      }

      if(type == 'print'){
          let prints = this.sprites['prints'];
          let print_layer_content = this.get_layer_content(this.prints,id);
          app.action_draw_layer_canvas('print', print_layer_content);
      }
    }

    app.action_draw_layer_canvas = function(layer,content) {
      if(layer == "print"){
          app.data.engine.action_show_print(content);
          app.action_add_print_zoom_content(); 
      }else{
          app.data.engine.action_set_layer(layer,content);
      }
    }

    //switch display to show the back/front view
    app.action_switch_canvas_view = function(mode) {
      if(mode == "front"){
        $('.sz-canvas-view-front').addClass('hide');
        $('.sz-canvas-view-back').removeClass("hide");
      }else{
        $('.sz-canvas-view-back').addClass('hide');
        $('.sz-canvas-view-front').removeClass("hide");
      }
      app.data.engine.action_switch_display_mode(mode);
    }

    //switch mobile display to show the back/front view
    app.action_switch_canvas_mobile_view = function(mode) {
      if(mode == "front"){
        $('.sz-canvas-view-front-mobile').addClass('active');
        $('.sz-canvas-view-back-mobile').removeClass("active");
      }else{
        $('.sz-canvas-view-back-mobile').addClass('active');
        $('.sz-canvas-view-front-mobile').removeClass("active");
      }
      app.data.engine.action_switch_display_mode(mode);
    }

    app.action_hide_mobile_dress_part = function(confirmed) {
      if(confirmed){
          $(".sz-display").hide(); 
          $('.sz-canvas-switch-btn').addClass('hide');
      }else{
          $(".sz-display").show(); 
          $('.sz-canvas-switch-btn').removeClass("hide");
      } 
    }

    // app.action_show_steps_selected_option = function() {
    //   var htmlopt = '<ul>';
    //   $("ul.short-name-label li").each(function(index,value){
    //     var step = $(this).data("steps");
    //     var short_name = $("ul." + step + ' li.selected').data("short-name");
    //        htmlopt += "<li><span>"+ step +" : </span>"+ short_name +"</li>";
    //   });
    //   htmlopt += '</ul>';
    //   $(".sz-steps-all-selected-option").html(htmlopt);
    // }

    app.action_onload_draw_canvas = function() {
      if(app.data.engine != '') return true;
      var target = this.settings.canvas_id;
        jQuery(function($){
          var ready = function(){
            app.setup_canvas_dress();
          };
          app.data.engine = new BarnEngine(target,ready);
        });
    }

    app.action_load_from_url = function(){
      var parts = app.get_uri_data();
      var last_step = '';
      if(parts) {
        var steps = app.dress_store_array();
        for( var key in steps ) {
          var editedText = key.slice(0, -1);
          if(parts[editedText] != undefined || parts[editedText] != null) {
            app.data.dress_parts[key] = parts[editedText];
            app.event_option_click(editedText,app.data.dress_parts[key], "restore");
            app.action_update_steps_breadcrumb(editedText);
            last_step = editedText;
          }
        }
        if(last_step != '') {
          app.action_show_panel_step(last_step);
          app.event_mobile_button_step(last_step, "restore");
          $(".sz-button-continue").attr('data-next-step', last_step);
        } 
      }
    };

    // ------------------------------------------------------------------
        /* 3. SETUP */
    // ------------------------------------------------------------------

    app.setup_dress = function(){
      this.data.isCached = false;
      this.data.engine = '';
      //internal record of bracelet state
      this.data.dress_parts = [];
      //pixi containers array.
      this.containers = [];
      this.sprites = [];

     /*let bracelet = new PIXI.Container();
      let app_width = this.data.app_width;
      let app_height = this.data.app_height;
      let app_size = Math.min(app_height,app_width);
      let pixiapp = this.pixiapp;
      pixiapp.stage.addChild(bracelet);
      this.containers['bracelet'] = bracelet;

      //setups
      //this.setup_cache();

      this.setup_bracelet_base();
      this.setup_bracelet_cord();
      this.setup_bracelet_tips();
      this.setup_bracelet_beads();
      this.setup_bracelet_numbers();

      //redraw
      this.action_rescale_bracelet();
      this.action_show_selected_bead();
      if(this.get_is_mobile()){
        this.action_hide_bead_numbers();
      }*/
    }

    app.setup_stage = function(){
      var target = this.settings.canvas_id;
      //TODO : sort out the starting height/width of the canvas (or delay the resize)
      /*
      var start_width = $(target).height();
      var start_height = $(target).height();
      let type = "WebGL"
      if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
      }

      let pixiapp = new PIXI.Application({width: start_width, height: start_height, resolution:2, autoResize:true});
      this.pixiapp = pixiapp;
      pixiapp.renderer.backgroundColor = 0xf0eceb;
      $(target).append(pixiapp.view);

      pixiapp.render();
      */
      //trigger resize
      //setTimeout(function () {
        tea_dress_maker_app.event_first_draw();
      //}, 500);
    }

    app.setup_options = function() {
      let necklines = this.necklines;
      //this.setup_tab_buttons(cords,'.panel-cords','cord');

     //add clicks
      this.setup_tab_options();

      //mobile bead list
      //this.setup_tab_bead_numbers();
    }

    app.setup_tab_options = function(){
      $('.option-button').each(function(index,value) {
        $(this).on("click", function(){
          let type = $(this).data('type');
          let id = $(this).data('id');
          $(".sz-button-continue").attr('data-next-step', type);
          app.event_option_click(type,id);
        });
      });
    }


    app.setup_prints_json = function(){
      var data = jQuery.parseJSON(app.prints_json_string);
      var prints = data.products;

      if(prints){
        app.setup_tab_prints(prints,'.panel-print','prints');
        app.setup_options();
        ///app.setup_panel_pendant_panel_clear_buttons();

        //remap the id to an index
        prints_data = {}; //CHANGED to object
        prints_array = [];
        $.each(prints,function(index,value){
          app.prints.push({"id": value.id,"name":value.name, "short_code":value.tag, "layer_content":value.layerimg});
        });
        
        //app.prints = prints_data;
        //app.prints_array = prints_array; //<< [HACK]
      }
      //clear the data?
      //app.pendants_json_string = null;
    };

    app.setup_tab_prints = function(items,panel,type){

      $.each(items,function(index,value){
        var circleimg,zoomimg,title,id,printProVariantId,ele,available,tagname;

        //option = cord or tips (this is the same as beads?)
        circleimg = value.circleimg;
        zoomimg = value.zoomimg;
        title = value.name;
        id =  value.id;
        printProVariantId = value.variants[0].id;
        available = value.available;
        tagname = value.tag;
        
        ele = '<li class="option-button" data-type="print" data-id="'+id+'" data-title="'+title+'" data-short-name="'+tagname+'" data-zoomimg="'+zoomimg+'" data-variant-id="'+printProVariantId+'" data-available="'+available+'">';
        ele += '<span><img src="'+circleimg+'" alt="'+title+'"></span>';
        ele += '<p>'+title+'</p>';
        ele += '</li>';

        $(panel).find('ul').append(ele);
      });
    };

    app.setup_canvas_dress = function() {
      app.data.engine.action_set_layer('bodice','odette');
      app.data.engine.action_set_layer('sleeve','classic');
      app.data.engine.action_set_layer('skirt','midi');
      app.data.engine.action_show_masks(false);
      app.data.engine.action_switch_display_mode("front");  
    }

    // ------------------------------------------------------------------
        /* 4. GET */
    // ------------------------------------------------------------------

    app.get_is_tea_dress_complete = function(){
      let parts = this.data.dress_parts;

      if ( !('necklines' in parts) ){ return false; }
      if ( !('sleeves' in parts) ){ return false; }
      if ( !('lengths' in parts) ){ return false; }
      if ( !('prints' in parts) ){ return false; }
      if ( !('sizes' in parts) ){ return false; }
      if(parts['necklines'] == 'zz' || parts['sleeves'] == 'zz' || parts['lengths'] == 'zz' || parts['prints'] == 'zz' || parts['sizes'] == 'zz') {
        return false;
      }

      //ELSE bracelet is complete.
      return true;
    }
    app.get_share_url = function(){
      return this.settings.share_url + this.get_dress_uri();
    }

    app.get_dress_uri = function(){
      let neckline_id = this.get_short_code(this.necklines,this.data.dress_parts['necklines']);
      let sleeve_id = this.get_short_code(this.sleeves,this.data.dress_parts['sleeves']);
      let length_id = this.get_short_code(this.lengths,this.data.dress_parts['lengths']);
      let print_id = this.data.dress_parts['prints'];
      let size_id = this.get_short_code(this.sizes,this.data.dress_parts['sizes']);

      let uri = neckline_id+"_"+sleeve_id+"_"+length_id+"_"+print_id+"_"+size_id;

      return uri;
    }

    app.get_short_code = function(source_list,target){
      let short_code = 'zz';
      $.each(source_list, function(index,value){
        if(value.id == target){ short_code = value.short_code }
      });
      //console.log( 'Shortcode for '+target+' = '+short_code );
      return short_code;
    }

    app.get_layer_content = function(source_list,target){
      let layer_content = 'zz';
      $.each(source_list, function(index,value){
        if(value.id == target){ layer_content = value.layer_content }
      });      
      return layer_content;
    }

    app.get_name = function(source_list,target){
      let name = 'zz';
      $.each(source_list, function(index,value){
        if(value.id == target){ name = value.name }
      });
      //console.log( 'Shortcode for '+target+' = '+short_code );
      return name;
    }

    app.get_print_vid = function(){
      let product_vid = $('.panel-print ul li.option-button.selected').data("variant-id");
      //console.log( 'Shortcode for '+target+' = '+short_code );
      return product_vid;
    }

    app.get_id_from_shortcode = function(source_list,target){
      let id = '0';
      $.each(source_list, function(index,value){
        if(value.short_code == target){ id = value.id; }
      });
      return id;
    };

    app.get_uri_data = function(){
      if(window.location.hash){
        let hash = window.location.hash.replace('#','');
        let parts = hash.split("_");
        let neckline = app.get_id_from_shortcode(app.necklines,parts[0]);
        let sleeve = app.get_id_from_shortcode(app.sleeves,parts[1]);
        let length = app.get_id_from_shortcode(app.lengths,parts[2]);
        let print = parts[3];
        let size = app.get_id_from_shortcode(app.sizes,parts[4]);
         
        return {neckline: neckline, sleeve: sleeve, length: length, print: print, size: size};
      }else{
        return false;
      }
    };


    /* Extra */
    // ------------------------------------------------------------------
     app.selected_dress_opt = function(type, id) {
      $("ul." + type + " .option-button").removeClass("selected");
      $("ul." + type + " .option-button").each(function(index,value){
        var slected_id = $(this).data("id");
        if(slected_id == id) {
          $(this).addClass("selected");
        }
      });
    }

    app.dress_store_array = function() {
      var steps = [];
      //value = "local storage key";
      steps['necklines'] = "dress_neckline";
      steps['sleeves'] = "dress_sleeve";
      steps['lengths'] = "dress_length";
      steps['prints'] = "dress_print";
      steps['sizes'] = "dress_size";
      return steps;
    }
  }
});
