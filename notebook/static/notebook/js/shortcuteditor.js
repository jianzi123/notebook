// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

define([
    "jquery",
    "notebook/js/quickhelp",
    "base/js/dialog",
    "components/marked/lib/marked"
], function (
    $,
    QH,
    dialog,
    marked
) {
    var render = preact.render;
    var createClass = preactCompat.createClass;
    var createElement = preactCompat.createElement;


/**
 * Humanize the action name to be consumed by user.
 * internally the actions name are of the form
 * <namespace>:<description-with-dashes>
 * we drop <namespace> and replace dashes for space.
 */
var humanize_action_id = function(str) {
  return str.split(':')[1].replace(/-/g, ' ').replace(/_/g, '-');
};

/**
 * given an action id return 'command-shortcut', 'edit-shortcut' or 'no-shortcut'
 * for the action. This allows us to tag UI in order to visually distinguish
 * Wether an action have a keybinding or not.
 **/

var KeyBinding = createClass({
  displayName: 'KeyBindings',
  getInitialState: function() {
    return {shrt:''};
  },
  handleShrtChange: function (element){
    this.setState({shrt:element.target.value});
  },
  render: function(){
    var that = this;
    var available = this.props.available(this.state.shrt);
    var empty = (this.state.shrt === '');
    var binding_setter = function(){
      if (available) { 
        that.props.onAddBindings(that.state.shrt, that.props.ckey);
      }
      that.state.shrt='';
      return false;
    };
    return createElement('form', {className:'jupyter-keybindings',
            onSubmit: binding_setter
        },
              createElement('i', {className: "pull-right fa fa-plus", alt: 'add-keyboard-shortcut',
                  onClick: binding_setter
              }),
              createElement('input', {
                                      type:'text', 
                               placeholder:'add shortcut', 
                                 className:'pull-right'+((available||empty)?'':' alert alert-danger'),
                                     value:that.state.shrt,
                                  onChange:that.handleShrtChange
              }),
              that.props.shortcuts ? that.props.shortcuts.map(function (item, index) {
                return createElement('span', {className: 'pull-right'},
                  createElement('kbd', {}, [
                    item.h,
                    createElement('i', {className: "fa fa-times", alt: 'remove '+item.h,
                      onClick:function () {
                        that.props.unbind(item.raw);
                      }
                    })
                  ])
                );
              }): null,
              createElement('div', {title: '(' + that.props.ckey + ')' ,
                className:'jupyter-keybindings-text'}, that.props.display )
      );
  }
});

var KeyBindingList = createClass({
  displayName: 'KeyBindingList',
  getInitialState: function(){
    return {data:[]};
  },
  componentDidMount: function(){
      this.setState({data:this.props.callback()});
  },
  render: function() {
      var that = this;
      var children = this.state.data.map(function (binding) {
          return createElement(KeyBinding, Object.assign({}, binding, {
          onAddBindings: function (shortcut, action) {
              that.props.bind(shortcut, action);
              that.setState({data:that.props.callback()});
          },
          available: that.props.available,
          unbind: function (shortcut) {
                  that.props.unbind(shortcut);
                  that.setState({data:that.props.callback()});
             }
          }));
      });
      children.unshift(createElement('div', {className:'well', key:'disclamer', id:'short-key-binding-intro', dangerouslySetInnerHTML:
            {__html: 
            marked(

            //"Here you can modify the keyboard shortcuts available in "+
            //"command mode. Your changes will be stored for later sessions. "+
            //"See more [**details of defining keyboard shortcuts**](#long-key-binding-intro) below."
            "在这里你可以修改命令模式快捷键." +
            "这些改变会在下次登录生效." +
            "更多查看下面[**快捷键详细定义**](#long-key-binding-intro)"
            )}
      }));
      children.push(createElement('div', {className:'well', key:'disclamer', id:'long-key-binding-intro', dangerouslySetInnerHTML:
            {__html: 
            marked(

            // "This dialog allows you to modify the keyboard shortcuts available in command mode. "+
            // "Any changes will be persisted between sessions and across environments. "+
            // "You can define two kinds of shorctuts: **key combinations** and **key sequences**.\n"+
            // "\n"+
            "在这里修改命令模式快捷键, 并且会保存下来. 你可以定义两种快捷键: **组合键** 和 **有顺序按键**.\n"+
            "\n"+
            // " - **Key Combinations**:\n"+
            " - **组合键**:\n"+
            // "   - Use hyphens `-` to represent keys that should be pressed at the same time.\n"+
            "   - 使用连接符 `-` 代表应该在同一时间按下.\n"+
            // "   - This is designed for use with *modifier* keys: `Cmd`, `Ctrl`, `Alt` ,`Meta`, "+
            // "`Cmdtrl`, and `Shift`.\n"+
            "   - 这是为了 *控制键* 设计的, 比如: `Cmd`, `Ctrl`, `Alt` ,`Meta`, `Cmdtrl`, 和`Shift`."+
//            "       - `Cmdtrl` acts like `Cmd` on OS X/MacOS and `Ctrl` on Windows/Linux.\n"+
//            "   - At most, one non-modifier key can exist in a key combination.\n"+
//            "   - Multiple modifier keys can exist in a key combination.\n"+
//            "   - Modifier keys need to precede the non-modifier key in a combination.\n"+
//            "   - *Valid Examples*: `Shift-a`, `Ctrl-;`, or `Ctrl-Shift-a`. \n"+
//            "   - *Invalid Example*s: `a-b` and `a-Ctrl-Shift`. \n"+
//            " - **Key Sequences**:\n"+
//            "   - Use commas `,` to represent keys that should be pressed in sequence.\n"+
//            "   - The order in which keys must be pressed exactly matches the left-to-right order of "+
//            "the characters in the sequence, with no interruptions.\n"+
//            "     - E.g., `h,a,l,t` would be triggered by typing <kbd>h</kbd> <kbd>a</kbd> "+
//            "<kbd>l</kbd> <kbd>t</kbd> but not <kbd>h</kbd> <kbd>a</kbd> <kbd>a</kbd> <kbd>l</kbd> "+
//            "<kbd>t</kbd> or <kbd>a</kbd>  <kbd>h</kbd> <kbd>l</kbd> <kbd>t</kbd>.\n"+
//            "   - Sequences can include the same key multiple times (e.g., `d,d`).\n"+
//            "   - You cannot include any pairs of sequences where one is a 'prefix' the other.\n"+
//            "     - E.g., `d,d,d` cannot be used a the same time as `d,d`.\n"+
//            "   - Key combinations are unique elements that can be used in a sequence.\n"+
//            "     - E.g., `Ctrl-d,d` and `d,d` can exist at the same time and are both valid key sequences.\n"+
//            "\n"+
            "       - `Cmdtrl` 像 OS X/MacOS 里的 `Cmd` 和 Windows/Linux 里的`Ctrl`.\n"+
            "   - 在大多数情况下，一个非修饰词键可以存在于一个关键的组合中.\n"+
            "   - 多个修饰符键可以存在于一个关键的组合中.\n"+
            "   - 修饰符键需要在非修饰符键前面加上一个组合.\n"+
            "   - *有效例子*: `Shift-a`, `Ctrl-;`,  或者`Ctrl-Shift-a`. \n"+
            "   - *无效例子*: `a-b` 和 `a-Ctrl-Shift`. \n"+
            " - **有顺序按键**:\n"+
            "   - 使用符号 `,` 表示按键在一个顺序序列上.\n"+
            "   - 键的顺序必须精确地匹配序列中字符的左到右顺序, 没有中断.\n"+
            "     - 举例来说, `h,a,l,t` 可以通过键入 <kbd>h</kbd> <kbd>a</kbd> "+
            "<kbd>l</kbd> <kbd>t</kbd> 来触发, 而不是 <kbd>h</kbd> <kbd>a</kbd> <kbd>a</kbd> <kbd>l</kbd> "+
            "<kbd>t</kbd> or <kbd>a</kbd>  <kbd>h</kbd> <kbd>l</kbd> <kbd>t</kbd>.\n"+
            "   - 序列可以多次包含相同的键 (例如, `d,d`).\n"+
            "   - 你不能包括任何一组序列，其中一个是另一个的“前缀”.\n"+
            "     - 举例来说, `d,d,d` 跟 `d,d` 同时生效.\n"+
            "   - 键组合是可以在序列中使用的唯一元素.\n"+
            "     - 举例来说, `Ctrl-d,d` 跟 `d,d` 可以同时生效，并且都是有效的序列键.\n"+
            "\n"+

//            "**Additional notes**:\n"+
//            "\n"+
//            "The case in which elements are written does not change the binding's meaning. "+
//            "E.g., `Ctrl-D` and `cTrl-d` are the same key binding. "+
//            "Thus, `Shift` needs to be explicitly included if it is part of the key binding. "+
//            "So, for example, if you set a command to be activated by `Shift-D,D`, the second `d` "+
//            "cannot be pressed at the same time as the `Shift` modifier key.\n"+
//            "\n"+
//            "Valid modifiers are specified by writing out their names explicitly: "+
//            "e.g., `Shift`, `Cmd`, `Ctrl`, `Alt` ,`Meta`, `Cmdtrl`. You cannot use the symbol equivalents "+
//            "(e.g., `⇧`, `⌘`, `⌃`, `⌥`); refer to developer docs for the corresponding keys "+
//            "(the mapping of which depends on the platform you are using)."+
//            "You can hover on the name/description of a command to see its exact internal name and "+
//            "differentiate from actions defined in various plugins. \n"+
//            "\n"+
//            "Changing the keybindings of edit mode is not currently available."

            "**补充说明**:\n"+
            "\n"+
            "编写元素的大小写不会改变绑定的含义. "+
            "举例来说, `Ctrl-D` and `cTrl-d` 是相同的组合. "+
            "总之, 如果 `Shift` 是关键绑定的一部分，则需要显式地包括. "+
            "因此, 例如, 如果你编辑命令 `Shift-D,D` ,第二个 `d` 不能跟shift一起按下.\n"+
            "\n"+
            "有效的修饰符是通过显式地写出它们的名称来指定的: "+
            "举例来说, `Shift`, `Cmd`, `Ctrl`, `Alt` ,`Meta`, `Cmdtrl`. 你不能使用符号等价 "+
            "(举例来说, `⇧`, `⌘`, `⌃`, `⌥`); 关于对应的键，请参考开发人员文档 (映射取决于您使用的平台)."+
            "您可以在命令的名称/描述上悬停，以查看其确切的内部名称，并与在各种插件中定义的操作区分开来. \n"+
            "\n"+
            "更改编辑模式的键绑定目前还没有."
            )}
      }));
      return createElement('div',{}, children);
    }
});

var get_shortcuts_data = function(notebook) {
    var actions = Object.keys(notebook.keyboard_manager.actions._actions);
    var src = [];

    for (var i = 0; i < actions.length; i++) {
      var action_id = actions[i];
      var action = notebook.keyboard_manager.actions.get(action_id);

      var shortcuts = notebook.keyboard_manager.command_shortcuts.get_action_shortcuts(action_id);
      var hshortcuts = [];
      if (shortcuts.length > 0) {
        hshortcuts = shortcuts.map(function (raw) {
          return {h:QH._humanize_sequence(raw),raw:raw};}
        );
      }
      src.push({
        display: humanize_action_id(action_id),
        shortcuts: hshortcuts,
        key:action_id, // react specific thing
        ckey: action_id
      });
    }
    return src;
};


var ShortcutEditor = function(notebook) {

    if(!notebook){
      // throw new Error("CommandPalette takes a notebook non-null mandatory argument");
      throw new Error("command调色板接受一个非空的强制性参数");
    }

    var body =  $('<div>');
    var mod = dialog.modal({
        notebook: notebook,
        keyboard_manager: notebook.keyboard_manager,
        // title : "Edit Command mode Shortcuts",
        title: "编辑命令行快捷键",
        body : body,
        buttons : {
            OK : {}
        }
    });
    
    var src = get_shortcuts_data(notebook);

    mod.addClass("modal_stretch");

    mod.modal('show');
    render(
        createElement(KeyBindingList, {
            callback: function () { return  get_shortcuts_data(notebook);},
            bind: function (shortcut, command) {
                return notebook.keyboard_manager.command_shortcuts._persist_shortcut(shortcut, command);
            },
            unbind: function (shortcut) {
                return notebook.keyboard_manager.command_shortcuts._persist_remove_shortcut(shortcut);
            },
            available: function (shrt) { return notebook.keyboard_manager.command_shortcuts.is_available_shortcut(shrt);}
          }),
        body.get(0)
    );
};
    return {ShortcutEditor: ShortcutEditor};
});
