/*jshint esversion: 6 */
/*jshint -W069 */
/*jslint browser: true */
/*globals ga:false */
/*globals jQuery:false */
/*globals console:false */
/*globals alert:false */
/*globals PIXI:false */
/*globals createjs:false */

function BarnEngine(target,ready_callback){
  var app = this; //reference to this.

  /* =============================================================================================================================
  [ shortcuts ]
  0. __INIT
  1. __EVENT
  2. __GET
  3. __ACTION
  4. __SETUP
  5. __TOOL

  */

  // -----------------------------------------------------------------------------------------------------------------------------
  /* 0. __INIT */
  // ------------------------------------------------------------------
  this.data = { 'display_scale': 1, 'backgroundColor': 0xFFFFFF, 'path':'https://cdn.shopify.com/s/files/1/0068/0873/1721/files/', 'version':'1602525031' };
  this.images = {
    'skirt':{'knee':['skirt_knee','skirt_knee_back'],'maxi':['skirt_maxi','skirt_maxi_back'],'midi':['skirt_midi','skirt_midi_back']},
    'bodice':{'tea':['bodice_tea','bodice_back'],'odette':['bodice_odette','bodice_back']},
    'sleeve':{'classic':['sleeve_classic','sleeve_classic'], 'long':['sleeve_long','sleeve_long_back'], 'shirred':['sleeve_shirred','sleeve_shirred']}
  };

  // -----------------------------------------------------------------------------------------------------------------------------
  /* 1. __EVENT */
  // ------------------------------------------------------------------

  //auto resize to fit
  this.event_resize = function(){
    console.log('Barn Engine: event_resize');
    let app_size = this.get_size();
    let pixiapp = this.pixiapp;
    pixiapp.renderer.resize(app_size.width, app_size.height);
    this.action_resize_stage();
    console.log(app_size);
  };

  this.event_first_draw =  function(){
    this.get_size();
    this.setup_display();
    this.event_resize();
    this.action_switch_display_mode('front');
    //trigger callback
    ready_callback();
  };

  // -----------------------------------------------------------------------------------------------------------------------------
  /* 2. __GET */
  // ------------------------------------------------------------------
  this.get_size = function(){
    let pixiapp = this.pixiapp;
    this.data.app_width = pixiapp.view.parentNode.clientWidth;
    this.data.app_height = pixiapp.view.parentNode.clientHeight;
    let size_obj = {width: this.data.app_width, height: this.data.app_height};
    return size_obj;
  };

  this.get_app_image = function(group_name,layer_name,item_name){
    console.log([group_name,layer_name,item_name]);
    //return 'imgs/suz_demo.png';
    let i = 0;
    if(group_name == 'back'){i=1;}
    let filename = this.images[layer_name][item_name][i];
    return this.data.path+filename+'.png?v='+this.data.version;
  };

  this.get_app_mask = function(group_name,layer_name,item_name){
    console.log([group_name,layer_name,item_name]);
    //return 'imgs/suz_demo.png';
    let i = 0;
    if(group_name == 'back'){i=1;}
    let filename = this.images[layer_name][item_name][i];
    return this.data.path+filename+'_mask.png?v='+this.data.version;
  };
  // -----------------------------------------------------------------------------------------------------------------------------
  /* 3. __ACTION */
  // ------------------------------------------------------------------

  //resize and center
  this.action_resize_stage = function(){
    let display = this.containers['display'];
    let app_width = this.data.app_width;
    let app_height = this.data.app_height;
    let app_size = Math.min(app_height,app_width);
    let re_scale = this.data.display_scale;
    display.height = display.width = app_size*re_scale;
    display.position.set((app_width)/2,(app_height)/2);

  };

  
  this.action_blank_design = function(){
	//for testing
  }
  
  
  //swap image layer graphic (with pre-load)
  this.action_set_layer = function(layer,content){
    this.action_set_layer_mask(layer,content);
    this.action_set_layer_part(layer,content);

    if(layer == 'skirt'){
      this.data['skirt'] = content;
      this.action_position_groups();
    }
  };

  this.action_set_layer_part = function(layer,content){
    if(content == 'blank'){
    	this.sprites['front_'+layer].texture = PIXI.Texture.EMPTY;
      	this.sprites['back_'+layer].texture = PIXI.Texture.EMPTY;
    }else{
    	let front_img = this.get_app_image('front',layer,content);
    	var new_front_texture = PIXI.Texture.fromImage(front_img);
    	this.sprites['front_'+layer].texture = new_front_texture;
      
        let back_img = this.get_app_image('back',layer,content);
    	var new_back_texture = PIXI.Texture.fromImage(back_img);
    	this.sprites['back_'+layer].texture = new_back_texture;
    }

  };
  this.action_set_layer_mask = function(layer,content){
    if(content == 'blank'){
    	this.sprites['front_'+layer+'_mask'].texture = PIXI.Texture.EMPTY;
      	this.sprites['back_'+layer+'_mask'].texture = PIXI.Texture.EMPTY;
    }else{
      let front_img = this.get_app_mask('front',layer,content);
      var new_front_texture = PIXI.Texture.fromImage(front_img);
      this.sprites['front_'+layer+'_mask'].texture = new_front_texture;

      let back_img = this.get_app_mask('back',layer,content);
      var new_back_texture = PIXI.Texture.fromImage(back_img);
      this.sprites['back_'+layer+'_mask'].texture = new_back_texture;
    }
  };

  this.action_show_print = function(print){
    let print_sprite_front = this.sprites['front_print'];
    var new_print_front = PIXI.Texture.fromImage(print);
    print_sprite_front.blendMode = PIXI.BLEND_MODES.ADD;
    print_sprite_front.texture = new_print_front;
    print_sprite_front.scale.set(1.5);

    let print_sprite_back = this.sprites['back_print'];
    var new_print_back = PIXI.Texture.fromImage(print);
    print_sprite_back.blendMode = PIXI.BLEND_MODES.ADD;
    print_sprite_back.texture = new_print_back;
    print_sprite_back.scale.set(1.5);

    this.action_show_masks(true);
  };

  this.action_show_masks = function(show){
    let masks = ['bodice_mask','skirt_mask','sleeve_mask'];

    for(n=0;n<3;n++){
      this.sprites['front_'+masks[n]].visible = show;
      this.sprites['back_'+masks[n]].visible = show;
    }

  };

  //switch display mode (front / back / double)
  this.action_switch_display_mode = function(mode){
    this.display_mode = mode;
    let front_display = true;
    let back_display = true;
    if(mode == 'front'){ back_display = false; }
    if(mode == 'back'){ front_display = false; }

    this.containers['front'].visible = front_display;
    this.containers['back'].visible = back_display;
    this.action_position_groups();
  };

  this.action_position_groups = function(){

    //Y
    pos_list = {'maxi':0,'midi':200,'knee':400};
    pos = pos_list[this.data['skirt']];
    this.containers['front'].y = pos;
    this.containers['back'].y = pos;

    //reverse move the prints so they DONT move and break out of boundry (which messes up scaling)
    this.sprites['front_print'].y = -pos;
    this.sprites['back_print'].y = -pos;
    
    //X
    if(this.display_mode == 'both'){
      //split them
      this.containers['front'].x = -700;
      this.containers['back'].x = 700;
    }else{
      //align them
      this.containers['front'].x = 0;
      this.containers['back'].x = 0;
    }
  };
  // -----------------------------------------------------------------------------------------------------------------------------
  /* 4. __SETUP */
  // ------------------------------------------------------------------
  this.setup = function(target){
    this.target = target;
    let ready = true;
    if (!window.jQuery) { ready = false; console.log('Barn Engine: no jquery'); }
    if (!window.PIXI){ ready = false; console.log('Barn Engine: no PIXI');}
    if(ready){
      console.log('Barn Engine: READY');
      this.setup_stage();
    }
  };

  //create stage
  this.setup_stage = function(){
    let target = this.target;
    var start_width = $(target).height();
    var start_height = $(target).height();
    let type = "WebGL";
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas";
    }

    let pixiapp = new PIXI.Application({width: start_width, height: start_height, resolution:2, autoResize:true});
    this.pixiapp = pixiapp;
    pixiapp.renderer.backgroundColor = 0xffffff;
    $(target).append(pixiapp.view);

    pixiapp.render();


    setTimeout(function () {
      app.event_first_draw();
    }, 500);

    window.onresize = function(event) {
        app.event_resize();
    };
  };

  //build the display groups
  this.setup_display = function(){
    console.log('setup_display');
    this.setup_display_base();
    this.setup_display_limits();
    this.setup_display_groups();

  };

  this.setup_display_base = function(){
    this.data.design_parts = {};
    this.containers = {};
    this.sprites = {};

    let display = new PIXI.Container();
    let app_width = this.data.app_width;
    let app_height = this.data.app_height;
    let app_size = Math.min(app_height,app_width);
    let pixiapp = this.pixiapp;
    pixiapp.stage.addChild(display);
    this.containers['display'] = display;

  };

  this.setup_display_limits = function(){
    //this square sets the bounds of the display so the scaling does not fall over
    let display = this.containers['display'];

    square_base = PIXI.Sprite.from(PIXI.Texture.WHITE);
    square_base.width = 3800;
    square_base.height = 3800;
    square_base.tint = this.data.backgroundColor;
    square_base.anchor.set(0.5);
    square_base.position.set(0,0);

    display.addChild(square_base);
  };

  this.setup_display_groups = function(){
    //front
    this.setup_group('front');
    this.setup_group_layer('front','bodice_mask','');
    this.setup_group_layer('front','sleeve_mask','');
    this.setup_group_layer('front','skirt_mask','');
    this.setup_group_layer('front','print','');
    this.setup_group_layer('front','bodice','');
    this.setup_group_layer('front','sleeve','');
    this.setup_group_layer('front','skirt','');


    //back
    this.setup_group('back');
    this.setup_group_layer('back','bodice_mask','');
    this.setup_group_layer('back','sleeve_mask','');
    this.setup_group_layer('back','skirt_mask','');
    this.setup_group_layer('back','print','');
    this.setup_group_layer('back','bodice','');
    this.setup_group_layer('back','sleeve','');
    this.setup_group_layer('back','skirt','');

    //hide the mask layers.
    this.action_show_masks(false);
  };

  this.setup_group = function(group_name){
    let display = this.containers['display'];
    let group = new PIXI.Container();
    this.containers[group_name] = group;
    display.addChild(group);

  };

  this.setup_group_layer = function(group_name,layer_name,item_name){
    let group = this.containers[group_name];
    //let new_layer = PIXI.Sprite.fromImage(this.get_app_image(group_name,layer_name,item_name));
    let new_layer = new PIXI.Sprite();
    new_layer.anchor.set(0.5);
    // move the sprite to the center of the screen
    new_layer.x = 0;
    new_layer.y = 0;
    new_layer.scale.set(1);
    group.addChild(new_layer);
    this.sprites[group_name+'_'+layer_name] = new_layer;
  };


  // -----------------------------------------------------------------------------------------------------------------------------
  /* 5. __TOOL */
  // ------------------------------------------------------------------



  //START
  this.setup(target);
}
