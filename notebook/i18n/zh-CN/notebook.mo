��    b      ,              <  #   =  [   a  q  �  :   /  "   j     �  m   �  g   	  J   u	  ,   �	  I   �	  :   7
     r
     �
  3   �
      �
  I   �
  X   I  �   �  3   a  Y   �  !   �  i     v   {  <   �  1   /  �   a  �        �  (   �     �     �            ?   8  g   x  !   �  &     B   )  *   l  <   �  9   �  ?     *   N  5   y     �  )   �  0   �  �    \   �  @     H   [  P   �  D   �  &   :  2   a  �   �  &     ,   F  =   s  B   �  5   �  @   *  O   k     �  '   �  /     +   3  W   _  ;   �  -   �      !     B      b  "   �  M   �  3   �  ,   (  !   U    w     �  Y   �  $   �       �     6     �   E  +   �  !     ,   2  6   _     �     �     �     �  8   �        �     #   �!  [   �!  q  )"  :   �#     �#     �#  m   �#  g   d$  ?   �$  %   %  C   2%  ?   v%     �%     �%  !   �%      
&  I   +&  X   u&  �   �&  :   e'  =   �'     �'  i   �'  v   _(  <   �(  &   )  �   :)  �   �)     �*  $   �*     �*     �*     �*     +  (   4+  g   ]+  !   �+     �+  B   �+      A,     b,  7   x,  9   �,  #   �,  1   -     @-     M-     d-  �  u-  \   /  @   r/  H   �/  P   �/  D   M0     �0  #   �0  �   �0     `1  %   w1  <   �1  A   �1  5   2  @   R2  O   �2     �2  !   3  $   %3  (   J3  G   s3  $   �3  $   �3      4     &4      F4  "   g4  C   �4  1   �4  #    5  !   $5    F5  	   S6  K   ]6  $   �6     �6  �   �6  +   �7  �   �7  '   `8     �8  ,   �8  6   �8     9     
9     9     *9  3   :9     n9   	$ python -m notebook.auth password 
        DISABLED: use %pylab or %matplotlib in the notebook to enable matplotlib.
         
        Set the tornado compression options for websocket connections.

        This value will be returned from :meth:`WebSocketHandler.get_compression_options`.
        None (default) will disable compression.
        A dict (even an empty one) will enable compression.

        See the tornado docs for WebSocketHandler.get_compression_options for details.
         
    webapp_settings is deprecated, use tornado_settings.
 %d active kernel %d active kernels %s does not exist (bytes/sec)
        Maximum rate at which stream output can be sent on iopub before they are
        limited. (msgs/sec)
        Maximum rate at which messages can be sent on iopub before they are
        limited. (sec) Time window used to 
        check the message and data rate limits. Allow the notebook to be run from root user. Alternatively use `%s` when working on the notebook's Javascript and LESS Cannot bind to localhost, using 127.0.0.1 as default ip
%s Could not set permissions on %s DEPRECATED use base_url DEPRECATED use the nbserver_extensions dict instead DEPRECATED, use tornado_settings DISABLED: use %pylab or %matplotlib in the notebook to enable matplotlib. Deprecated: Use minified JS file or not, mainly use during dev to avoid JS recompilation Dict of Python modules to load as notebook server extensions.Entry values can be used to enable and disable the loading ofthe extensions. The extensions will be loaded in alphabetical order. Don't open the notebook in a browser after startup. ERROR: the notebook server could not be started because no available port could be found. Error loading server extension %s Extra keyword arguments to pass to `set_secure_cookie`. See tornado's set_secure_cookie docs for details. Extra paths to search for serving jinja templates.

        Can be used to override templates from notebook.templates. Extra variables to supply to jinja templates when rendering. Hint: run the following command to set a password If True, each line of output will be a JSON object with the details from the server info file. For a JSON list output, see the NbserverListApp.jsonlist configuration value If True, the output will be a JSON list of objects, one per active notebook server, each with the details from the relevant server info file. Interrupted... List currently running notebook servers. No answer for 5s: No such file or directory: %s No such notebook dir: '%r' No web browser found: %s. Notebook servers are configured to only be run with a password. One-time token used for opening a browser.
        Once used, this token cannot be used again.
         Path to search for custom.js, css Permission to listen on port %i denied Please use `%pylab{0}` or `%matplotlib{0}` in the notebook itself. Produce machine-readable JSON list output. Produce machine-readable JSON object on each line of output. Reraise exceptions encountered loading server extensions? Running as root is not recommended. Use --allow-root to bypass. Serving notebooks from local directory: %s Set the Access-Control-Allow-Credentials: true header Shutdown confirmed Shutdown this notebook server (%s/[%s])?  Shutting down %d kernel Shutting down %d kernels Specify Where to open the notebook on startup. This is the
        `new` argument passed to the standard library method `webbrowser.open`.
        The behaviour is not guaranteed, but depends on browser support. Valid
        values are:
            2 opens a new tab,
            1 opens a new window,
            0 opens in an existing window.
        See the `webbrowser.open` documentation for details.
         Supply SSL options for the tornado HTTPServer.
            See the tornado docs for details. Supply extra arguments that will be passed to Jinja environment. Supply overrides for terminado. Currently only supports "shell_command". Supply overrides for the tornado.web.Application that the Jupyter notebook uses. Support for specifying --pylab on the command line has been removed. Terminals not available (error was %s) The IP address the notebook server will listen on. The Jupyter HTML Notebook.
    
    This launches a Tornado based HTML Notebook Server that serves up an HTML5/Javascript Notebook client. The Jupyter Notebook is running at:
%s The Jupyter Notebook requires tornado >= 4.0 The Jupyter Notebook requires tornado >= 4.0, but you have %s The Jupyter Notebook requires tornado >= 4.0, but you have < 1.1.0 The MathJax.js configuration file that is to be used. The `ignore_minified_js` flag is deprecated and no longer works. The `ignore_minified_js` flag is deprecated and will be removed in Notebook 6.0 The config manager class to use The default URL to redirect to from `/` The directory to use for notebooks and kernels. The file where the cookie secret is stored. The full path to a certificate authority certificate for SSL/TLS client authentication. The full path to a private key file for usage with SSL/TLS. The full path to an SSL/TLS certificate file. The kernel manager class to use. The login handler class to use. The logout handler class to use. The notebook manager class to use. The number of additional ports to try if the specified port is not available. The port %i is already in use, trying another port. The port the notebook server will listen on. The session manager class to use. Token used for authenticating first-time connections to the server.

        When no password is enabled,
        the default is to generate a new, random token.

        Setting to an empty string disables authentication altogether, which is NOT RECOMMENDED.
         Untitled Use Control-C to stop this server and shut down all kernels (twice to skip confirmation). Using MathJax configuration file: %s Using MathJax: %s Welcome to Project Jupyter! Explore the various tools available and their corresponding documentation. If you are interested in contributing to the platform, please visit the communityresources section at http://jupyter.org/community.html. Whether to allow the user to run the notebook as root. Whether to trust or not X-Scheme/X-Forwarded-Proto and X-Real-Ip/X-Forwarded-For headerssent by the upstream reverse proxy. Necessary if the proxy handles SSL Writing notebook server cookie secret to %s [all ip addresses on your system] base_project_url is deprecated, use base_url extra paths to look for Javascript notebook extensions interrupted n received signal %s, stopping resuming operation... server_extensions is deprecated, use nbserver_extensions y Project-Id-Version: Jupyter VERSION
Report-Msgid-Bugs-To: EMAIL@ADDRESS
POT-Creation-Date: 2017-08-25 02:53-0400
PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE
Last-Translator: FULL NAME <EMAIL@ADDRESS>
Language: zh_Hans_CN
Language-Team: zh_Hans_CN <LL@li.org>
Plural-Forms: nplurals=1; plural=0
MIME-Version: 1.0
Content-Type: text/plain; charset=utf-8
Content-Transfer-Encoding: 8bit
Generated-By: Babel 2.5.0
 	$ python -m notebook.auth password 
        DISABLED: use %pylab or %matplotlib in the notebook to enable matplotlib.
         
        Set the tornado compression options for websocket connections.

        This value will be returned from :meth:`WebSocketHandler.get_compression_options`.
        None (default) will disable compression.
        A dict (even an empty one) will enable compression.

        See the tornado docs for WebSocketHandler.get_compression_options for details.
         
    webapp_settings is deprecated, use tornado_settings.
 %d 活跃的服务 %s 不存在 (bytes/sec)
        Maximum rate at which stream output can be sent on iopub before they are
        limited. (msgs/sec)
        Maximum rate at which messages can be sent on iopub before they are
        limited. (sec)时间窗口被用来 
 检查消息和数据速率限制. 允许notebook在root用户下运行. 在使用notebook的JavaScript和LESS时，可以替换使用 `%s`  不能绑定到localhost, 使用127.0.0.1作为默认的IP 
 %s 不能在 %s 设置权限 DEPRECATED use base_url 不赞成使用nbserverextensions DEPRECATED, use tornado_settings DISABLED: use %pylab or %matplotlib in the notebook to enable matplotlib. Deprecated: Use minified JS file or not, mainly use during dev to avoid JS recompilation 将Python模块作为笔记本服务器扩展加载。可以使用条目值来启用和禁用扩展的加载。这些扩展将以字母顺序加载。 在启动服务以后不在浏览器中打开一个窗口. 错误: 服务启动失败因为没有找到可用的端口.  加载插件 %s 失败 Extra keyword arguments to pass to `set_secure_cookie`. See tornado's set_secure_cookie docs for details. Extra paths to search for serving jinja templates.

        Can be used to override templates from notebook.templates. Extra variables to supply to jinja templates when rendering. 提示: 运行下面命令设置密码 如果是正确的，每一行输出将是一个JSON对象，其中有来自服务器信息文件的详细信息。对于一个JSON列表输出，请参阅NbserverListApp。jsonlist配置值 如果是正确的，输出将是一个对象的JSON列表，一个活动的笔记本服务器，每一个都有相关的服务器信息文件的详细信息。 已经中断... 列出当前运行的Notebook服务. 5s 未响应 找不到文件或文件夹: %s 没有找到路径: '%r'  没有找到web浏览器: %s. 服务设置为只能使用密码运行. One-time token used for opening a browser.
        Once used, this token cannot be used again.
         Path to search for custom.js, css 监听端口 %i 失败 Please use `%pylab{0}` or `%matplotlib{0}` in the notebook itself. 生成机器可读的JSON输出. 当前运行的服务 重新运行的异常会遇到加载服务器扩展吗? 不建议以root身份运行.使用--allow-root绕过过. 启动notebooks 在本地路径: %s 设置Access-Control-Allow-Credentials:true报头 关闭确定 关闭服务 (%s/[%s]) 关闭 %d 服务 Specify Where to open the notebook on startup. This is the
        `new` argument passed to the standard library method `webbrowser.open`.
        The behaviour is not guaranteed, but depends on browser support. Valid
        values are:
            2 opens a new tab,
            1 opens a new window,
            0 opens in an existing window.
        See the `webbrowser.open` documentation for details.
         Supply SSL options for the tornado HTTPServer.
            See the tornado docs for details. Supply extra arguments that will be passed to Jinja environment. Supply overrides for terminado. Currently only supports "shell_command". Supply overrides for the tornado.web.Application that the Jupyter notebook uses. Support for specifying --pylab on the command line has been removed. 终端不可用(错误: %s) notebook服务会监听的IP地址. The Jupyter HTML Notebook.
 
 这将启动一个基于tornado的HTML笔记本服务器，它提供一个html5/javascript笔记本客户端。 本程序运行在: %s 该程序要求 tornado 版本 >= 4.0 该程序要求 tornado 版本 >= 4.0, 可是现实却是 %s 该程序要求 tornado 版本 >= 4.0, 可是现实却是 < 1.1.0 The MathJax.js configuration file that is to be used. The `ignore_minified_js` flag is deprecated and no longer works. The `ignore_minified_js` flag is deprecated and will be removed in Notebook 6.0 The config manager class to use 从 `/` 重定向到的默认URL  用于笔记本和内核的目录。 存放cookie密钥的文件被保存了. 用于ssl/tls客户端身份验证的证书颁发证书的完整路径. SSL/TLS 私钥文件所在全路径. SSL/TLS 认证文件所在全路径. The kernel manager class to use. The login handler class to use. The logout handler class to use. The notebook manager class to use. 如果指定的端口不可用，则要尝试其他端口的数量. 端口 %i 已经被站用, 请尝试其他端口. notebook服务会监听的IP端口. The session manager class to use. Token used for authenticating first-time connections to the server.

        When no password is enabled,
        the default is to generate a new, random token.

        Setting to an empty string disables authentication altogether, which is NOT RECOMMENDED.
         未命名 使用control-c停止此服务器并关闭所有内核(两次跳过确认). Using MathJax configuration file: %s Using MathJax: %s 欢迎来到项目Jupyter! 探索可用的各种工具及其相应的文档. 如果你有兴趣对这个平台,请访问http://jupyter.org/community.html community resources部分. 是否允许notebook在root用户下运行. Whether to trust or not X-Scheme/X-Forwarded-Proto and X-Real-Ip/X-Forwarded-For headerssent by the upstream reverse proxy. Necessary if the proxy handles SSL 把notebook 服务cookie密码写入 %s [系统所有IP地址] base_project_url is deprecated, use base_url extra paths to look for Javascript notebook extensions 中断 n 接受信号 %s, 正在停止 重启操作... 服务器扩展被弃用，使用nbserverextensions y 