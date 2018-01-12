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
    'base/js/dialog',
    'base/js/events',
    'base/js/promises',
    'base/js/page',
    'base/js/utils',
    'services/config',
    'tree/js/notebooklist',
    'tree/js/sessionlist',
    'tree/js/kernellist',
    'tree/js/terminallist',
    'tree/js/newnotebook',
    'tree/js/treeapi',
//    'tree/js/showdata',
    'auth/js/loginwidget',
    'bidi/bidi',
], function(
    $,
    contents_service,
    IPython,
    dialog,
    events,
    promises,
    page,
    utils,
    config,
    notebooklist,
    sesssionlist,
    kernellist,
    terminallist,
    newnotebook,
    treeapi,
    loginwidget,
    bidi){
    "use strict";
    
    try{
        requirejs(['custom/custom'], function() {});
        bidi.loadLocale();
    } catch(err) {
        console.log("Error loading custom.js from tree service. Continuing and logging");
        console.warn(err);
    }

    console.log('这个项目源自jupyternotebook，可以去http://jupyter.org/community.html 查看相关信息。');

    // Setup all of the config related things

    var common_options = {
        base_url: utils.get_body_data("baseUrl"),
        notebook_path: utils.get_body_data("notebookPath"),
    };
    var cfg = new config.ConfigSection('tree', common_options);
    cfg.load();
    common_options.config = cfg;
    var common_config = new config.ConfigSection('common', common_options);
    common_config.load();

    // Instantiate the main objects

    var api = new treeapi.dataAPI(common_options.base_url);
    var sqlData = api.getStaticData('data');

    page = new page.Page('div#header', 'div#site');

    var session_list = new sesssionlist.SesssionList($.extend({
        events: events},
        common_options));
    var contents = new contents_service.Contents({
        base_url: common_options.base_url,
        common_config: common_config
    });
    IPython.NotebookList = notebooklist.NotebookList;
    var notebook_list = new notebooklist.NotebookList('#notebook_list', $.extend({
        contents: contents,
        session_list:  session_list},
        common_options));
    var kernel_list = new kernellist.KernelList('#running_list',  $.extend({
        session_list:  session_list},
        common_options));
    
    var terminal_list;
    if (utils.get_body_data("terminalsAvailable") === "True") {
        terminal_list = new terminallist.TerminalList('#terminal_list', common_options);
    }

    var login_widget = new loginwidget.LoginWidget('#login_widget', common_options);

    var new_buttons = new newnotebook.NewNotebookWidget("#new-buttons",
        $.extend(
            {contents: contents, events: events},
            common_options
        )
    );

    var interval_id=0;
    // auto refresh every xx secondes, no need to be fast,
    //  update is done most of the time when page get focus
    IPython.tree_time_refresh = 60; // in sec

    // limit refresh on focus at 1/10sec, otherwise this
    // can cause too frequent refresh on switching through windows or tabs.
    IPython.min_delta_refresh = 10; // in sec

    var _last_refresh = null;

    var _refresh_list = function(){
        _last_refresh = new Date();
        session_list.load_sessions();
        if (terminal_list) {
            terminal_list.load_terminals();
        }
    };

    var enable_autorefresh = function(){
        /**
         *refresh immediately , then start interval
         */
        var now = new Date();

        if (now - _last_refresh < IPython.min_delta_refresh*1000){
            console.log("Reenabling autorefresh too close to last tree refresh, not refreshing immediately again.");
        } else {
            _refresh_list();
        }
        if (!interval_id){
            interval_id = setInterval(_refresh_list,
                    IPython.tree_time_refresh*1000
            );
        }
    };

    var disable_autorefresh = function(){
        clearInterval(interval_id);
        interval_id = 0;
    };

    // stop autorefresh when page lose focus
    $(window).blur(function() {
        disable_autorefresh();
    });

    //re-enable when page get focus back
    $(window).focus(function() {
        enable_autorefresh();
    });

    // finally start it, it will refresh immediately
    enable_autorefresh();

    page.show();

    // For backwards compatability.
    IPython.page = page;
    IPython.notebook_list = notebook_list;
    IPython.session_list = session_list;
    IPython.kernel_list = kernel_list;
    IPython.login_widget = login_widget;
    IPython.new_notebook_widget = new_buttons;

    events.trigger('app_initialized.DashboardApp');
    
    // Now actually load nbextensions
    utils.load_extensions_from_config(cfg);
    utils.load_extensions_from_config(common_config);
    
    // bound the upload method to the on change of the file select list
    $("#alternate_upload").change(function (event){
        notebook_list.handleFilesUpload(event,'form');
    });
    
    // set hash on tab click
    $("#tabs").find("a").click(function(e) {
        // Prevent the document from jumping when the active tab is changed to a 
        // tab that has a lot of content.
        e.preventDefault();

        // Set the hash without causing the page to jump.
        // http://stackoverflow.com/a/14690177/2824256
        var hash = $(this).attr("href");
        if(window.history.pushState) {
            window.history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }
    });
    
    // load tab if url hash
    if (window.location.hash) {
        $("#tabs").find("a[href=" + window.location.hash + "]").click();
    }

    // self fix--------------------------------------
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
        // console.log($tImg[0].html());
        var img = $tImg[0];
        if (img == 'undefined') {
          return;
        }

        if (img.getAttribute("src") === undefined) {
          img.src = window.document.location.origin + $("body").attr('data-base-url') + "static/list.png";
          var $detail = tItem.next();
          $detail.css('hidden', true);
        } else if (img.getAttribute("src") === window.document.location.origin + $("body").attr('data-base-url') + "static/drop.png") {
          img.src = window.document.location.origin + $("body").attr('data-base-url') + "static/list.png";
          var $detail = tItem.nextAll()[0];
          $($detail).css('display', 'none');
        } else {
          img.src = window.document.location.origin + $("body").attr('data-base-url') + "static/drop.png";
          var $detail = tItem.nextAll()[0];
          $($detail).css('display', 'block');
        }

        var $det = $('div.data-detail');
        var i = 0;
        for(i = 0; i < $det.length; i++){
            var $brother = $($det.get(i)).prev();
            if($brother.attr('id') == tId){
                continue;
            }
            if($($det.get(i)).css('display') == "block"){
                $($det.get(i)).css('display', 'none');
            }
        };

        var $x = $("img.test")
        for(i = 0; i < $x.length; i++){
            var tmp = $($x.get(i)).parent().parent().attr('id');
            if(tmp == tId){
                continue;
            }
            $($x.get(i)).attr("src", window.document.location.origin + $("body").attr('data-base-url') + "static/list.png");
        };
    });

    $(document).on('click', 'ul#data-para li', function(e){
        var tItem = $(e.target);
        var tId = tItem.attr('id');

        if(tId == undefined){
            return;
        }

        var nums = tId.split('_');
        if(nums.length == 3){
            var table = parseInt(nums[0]);
            var column = parseInt(nums[1]);
            var para = parseInt(nums[2]);

            var title = sqlData[table].table[column];
            var data = sqlData[table].table_detail[column];
            var detail = data.para_detail[para];
            $('div.title p').html(data.para[para]);
            // console.log(detail);
            var example_list = detail.example.split(",");
            var exam_tmp = '';
            if (example_list.length > 0){
                example_list = $.grep(example_list, function () {
                    return this != ''
                 });

                if(example_list.length > 4){
                    exam_tmp = example_list.slice(0, 4).toString();
                }else{
                    exam_tmp = example_list.toString();
                }
                exam_tmp = exam_tmp.replace(/,/g, ",\n");
            }
            $('#kind').html(detail.type);
            $('#explain').html(detail.explain);
            $('#example').html(exam_tmp);
            $('#dialog-div').attr('style', 'display: block;');

        }else{
            return;
        }

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
    var detail = document.getElementsByClassName('data-detail');
    var i = 0;
    for(i = 0; i < detail.length; i++){
        if(detail[i].style.display == "block"){
            detail[i].style.display = "none";
        }
    };
    var $x = $("img.test")
    for(i = 0; i < $x.length; i++){
        $($x.get(i)).attr("src", window.document.location.origin + $("body").attr('data-base-url') + "static/list.png");
    };
    $($("div#dialog-div").get(0)).attr("style", "display: none");
  });

    $(document).on('click', ".dialog .dialog-header .img", function(e){
        $("#dialog-div").attr("style", "display: none");
    });

    var addItem = function(index, data) {
        var tmp = '';
        var pic_url = window.document.location.origin + $("body").attr('data-base-url') + "static/list.png";
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
                                      <img class="test" src='+ pic_url +' />\
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
