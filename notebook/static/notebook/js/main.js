// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// adapted from Mozilla Developer Network example at
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
// shim `bind` for testing under casper.js
var bind = function bind(obj) {
  var slice = [].slice;
  var args = slice.call(arguments, 1),
    self = this,
    nop = function() {
    },
    bound = function() {
      return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
    };
  nop.prototype = this.prototype || {}; // Firefox cries sometimes if prototype is undefined
  bound.prototype = new nop();
  return bound;
};
Function.prototype.bind = Function.prototype.bind || bind ;


require([
    'jquery',
    'contents',
    'base/js/namespace',
    'notebook/js/notebook',
    'services/config',
    'base/js/utils',
    'base/js/page',
    'base/js/events',
    'base/js/promises',
    'auth/js/loginwidget',
    'notebook/js/maintoolbar',
    'notebook/js/pager',
    'notebook/js/promises',
    'notebook/js/quickhelp',
    'notebook/js/menubar',
    'notebook/js/notificationarea',
    'notebook/js/savewidget',
    'notebook/js/actions',
    'notebook/js/keyboardmanager',
    'notebook/js/kernelselector',
    'codemirror/lib/codemirror',
    'notebook/js/about',
    'notebook/js/searchandreplace',
    'notebook/js/clipboard',
    'bidi/bidi',
    'tree/js/treeapi',
], function(
    $,
    contents_service,
    IPython,
    notebook,
    configmod,
    utils,
    page,
    events,
    promises,
    loginwidget,
    maintoolbar,
    pager,
    nb_promises,
    quickhelp,
    menubar,
    notificationarea,
    savewidget,
    actions,
    keyboardmanager,
    kernelselector,
    CodeMirror,
    about,
    searchandreplace,
    clipboard,
    bidi,
    treeapi
    ) {
    "use strict";

    // Pull typeahead from the global jquery object
    var typeahead = $.typeahead;
    
    try{
        requirejs(['custom/custom'], function() {});
        bidi.loadLocale();
    } catch(err) {
        console.log("Error processing custom.js. Logging and continuing");
        console.warn(err);
    }

    // compat with old IPython, remove for IPython > 3.0
    window.CodeMirror = CodeMirror;

    // Setup all of the config related things
    

    var common_options = {
        ws_url : utils.get_body_data("wsUrl"),
        base_url : utils.get_body_data("baseUrl"),
        notebook_path : utils.get_body_data("notebookPath"),
        notebook_name : utils.get_body_data('notebookName')
    };

    var config_section = new configmod.ConfigSection('notebook', common_options);
    config_section.load();
    var common_config = new configmod.ConfigSection('common', common_options);
    common_config.load();

    // Instantiate the main objects

    var api = new treeapi.dataAPI(common_options.base_url);
    var sqlData = api.getStaticData('data');

    var page = new page.Page('div#header', 'div#site');
    var pager = new pager.Pager('div#pager', {
        events: events});
    var acts = new actions.init();
    var keyboard_manager = new keyboardmanager.KeyboardManager({
        pager: pager,
        events: events,
        actions: acts, 
        config: config_section,
    });
    var save_widget = new savewidget.SaveWidget('span#save_widget', {
        events: events,
        keyboard_manager: keyboard_manager});
    acts.extend_env({save_widget:save_widget});
    var contents = new contents_service.Contents({
          base_url: common_options.base_url,
          common_config: common_config
        });
    var notebook = new notebook.Notebook('div#notebook', $.extend({
        events: events,
        keyboard_manager: keyboard_manager,
        save_widget: save_widget,
        contents: contents,
        config: config_section},
        common_options));
    var login_widget = new loginwidget.LoginWidget('span#login_widget', common_options);
    var toolbar = new maintoolbar.MainToolBar('#maintoolbar-container', {
        notebook: notebook,
        events: events,
        actions: acts});
    var quick_help = new quickhelp.QuickHelp({
        keyboard_manager: keyboard_manager,
        events: events,
        notebook: notebook});
    keyboard_manager.set_notebook(notebook);
    keyboard_manager.set_quickhelp(quick_help);
    var menubar = new menubar.MenuBar('#menubar', $.extend({
        notebook: notebook,
        contents: contents,
        events: events,
        save_widget: save_widget,
        quick_help: quick_help,
        actions: acts,
        config: config_section},
        common_options));
    var notification_area = new notificationarea.NotebookNotificationArea(
        '#notification_area', {
        events: events,
        save_widget: save_widget,
        notebook: notebook,
        keyboard_manager: keyboard_manager});
    notification_area.init_notification_widgets();
    var kernel_selector = new kernelselector.KernelSelector(
        '#kernel_logo_widget', notebook);
    searchandreplace.load(keyboard_manager);

    $('body').append('<div id="fonttest"><pre><span id="test1">x</span>'+
                     '<span id="test2" style="font-weight: bold;">x</span>'+
                     '<span id="test3" style="font-style: italic;">x</span></pre></div>');
    var nh = $('#test1').innerHeight();
    var bh = $('#test2').innerHeight();
    var ih = $('#test3').innerHeight();
    if(nh != bh || nh != ih) {
        $('head').append('<style>.CodeMirror span { vertical-align: bottom; }</style>');
    }
    $('#fonttest').remove();

    page.show();

    events.one('notebook_loaded.Notebook', function () {
        var hash = document.location.hash;
        if (hash) {
            document.location.hash = '';
            document.location.hash = hash;
        }
        notebook.set_autosave_interval(notebook.minimum_autosave_interval);
    });

    IPython.page = page;
    IPython.notebook = notebook;
    IPython.contents = contents;
    IPython.pager = pager;
    IPython.quick_help = quick_help;
    IPython.login_widget = login_widget;
    IPython.menubar = menubar;
    IPython.toolbar = toolbar;
    IPython.notification_area = notification_area;
    IPython.keyboard_manager = keyboard_manager;
    IPython.save_widget = save_widget;
    IPython.tooltip = notebook.tooltip;

    try {
        events.trigger('app_initialized.NotebookApp');
    } catch (e) {
        console.error("Error in app_initialized callback", e);
    }

    Object.defineProperty( IPython, 'actions', {
      get: function() {
          console.warn('accessing "actions" on the global IPython/Jupyter is not recommended. Pass it to your objects contructors at creation time');
          return acts;
      },
      enumerable: true,
      configurable: false
    });

    clipboard.setup_clipboard_events();
    
    // Now actually load nbextensionsload_extensions_from_config
    Promise.all([
        utils.load_extensions_from_config(config_section),
        utils.load_extensions_from_config(common_config),
    ])
    .catch(function(error) {
        console.error('Could not load nbextensions from user config files', error);
    })
    // BEGIN HARDCODED WIDGETS HACK
    .then(function() {
        if (!utils.is_loaded('jupyter-js-widgets/extension')) {
            // Fallback to the ipywidgets extension
            utils.load_extension('widgets/notebook/js/extension').catch(function () {
                console.warn('Widgets are not available.  Please install widgetsnbextension or ipywidgets 4.0');
            });
        }
    })
    .catch(function(error) {
        console.error('Could not load ipywidgets', error);
    });
    // END HARDCODED WIDGETS HACK

    notebook.load_notebook(common_options.notebook_path);

    // self fix wsj ------------------------------
        $(document).on('click', ".data-table", function(e) {
        // alert(e.target);
        var tItem = $(e.target)
        var tId = tItem.attr('id');
        var tClass = tItem.attr('class');

       while (tClass != "data-table" || tItem.tagName == "li") {
          tItem = tItem.parent();
          tId = tItem.attr('id');
          tClass = tItem.attr('class');
        }

        var $tImg = tItem.find('img');
        if ($tImg == 'undefined') {
          return;
        }
        var img = $tImg[0];
        if (img == 'undefined') {
          return;
        }

        if (img.getAttribute("src") === undefined) {
          img.src = "../static/list.png";
          var $detail = tItem.next();
          $detail.css('hidden', true);
        } else if (img.getAttribute("src") === "static/drop.png") {
          img.src = "../static/list.png";
          var $detail = tItem.nextAll()[0];
          $($detail).css('display', 'none');
        } else {
          img.src = "../static/drop.png";
          var $detail = tItem.nextAll()[0];
          $($detail).css('display', 'block');
        }
    });

    $(document).on('click', 'ul#data-para li', function(e){
        var tItem = $(e.target);
        var tId = tItem.attr('id');

        if(tId == undefined){
            return;
        }

        var nums = tId.split('_');
        var data = null;
        var title = null;
        var detail = null;
        if(nums.length == 3){
            var table = parseInt(nums[0]);
            var column = parseInt(nums[1]);
            var para = parseInt(nums[2]);

            title = sqlData[table].table[column];
            data = sqlData[table].table_detail[column];
            detail = data.para_detail[para];
        }else{
            return;
        }

        $('#kind').html(detail.type);
        $('#explain').html(detail.explain);
        $('#example').html(detail.example);
        $('#dialog-div').attr('style', 'display: block;');
    });

    $(document).on('click', "div.data-detail ul li", function(e) {

    var item = $(e.target);
    var id = item.attr('id');
    if (id === undefined) {
      return;
    }

    var index = id.split("_");
    var data = null;
    var title = null;
    if(index.length == 2) {
        var table = parseInt(index[0]);
        var column = parseInt(index[1]);
        title = sqlData[table].table[column];
        data = sqlData[table].table_detail[column];
    }else{
        return;
    }
    var value = item.text();
    if (value === undefined) {
    }

    var tmp = '';
    for (var i = 0; i < data.para.length; i++) {
      tmp = tmp + '<li id="' + id + '_' + i.toString() + '">' + data.para[i] + ' </li> ';
    }

    $('ul#data-para').html('');
    $('div.des-list span').html(title);
    $(tmp).appendTo('ul#data-para');
    var detail = $('#second-float').get(0);
    // title text
    // $('div#pro-table-info span.title-content').text('jion');
    // content

    $(detail).css('display', 'block');
    $($('#first-float').get(0)).css('display', 'none');

  });


  $(document).on('click', "div#des-title img.goback", function(e) {
    var item = $(e.target);
    $($('#first-float').get(0)).css('display', 'block');
    $($('#second-float').get(0)).css('display', 'none');

  });

    $(document).on('click', ".dialog .dialog-header .img", function(e){
        $("#dialog-div").attr("style", "display: none");
    });

    var addItem = function(index, data) {
        var tmp = '';
        var title = data.title;
        var table_content = data.table;
        for (var i = 0; i < table_content.length; i++) {
          tmp = tmp + '<li id="' + index.toString() + '_' + i.toString() + '">' + table_content[i] + ' </li> ';
        }
        var h_data = '<li >\
                                  <div class="data-table" id="data_table_' + index.toString() + ' ">\
                                    <div class="data-header-title">\
                                      <a class="ctext" id="text1">' + data.title +  '</a>\
                                    </div>\
                                    <div class="data-header-img">\
                                      <img class="test" src="../static/list.png" />\
                                    </div>\
                                  </div>\
                                  <!-- 展示数据 -->\
                                  <div class="data-detail" style="display: none;" >\
                                    <ul > ' +  tmp + '</ul>\
                                  </div>\
                                </li>';
        return h_data;
      };

    var index = sqlData.length;
    var content = null;
    sqlData.forEach(
        function(elem, index){
            content = addItem(index, elem);
            $(content).appendTo('div#static-data ul#data-ul');
        }
    );

});
