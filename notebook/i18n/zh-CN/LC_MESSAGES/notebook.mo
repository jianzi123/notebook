��    a      $              ,  #   -  [   Q  q  �  :     "   Z     }  m   �  g   �  J   e	  ,   �	  I   �	  :   '
     b
     �
     �
  3   �
      �
  I   
  X   T  �   �  3   l  Y   �  !   �  i     v   �  <   �  1   :  ^   l     �  (   �               3     N  ?   h  g   �  !     &   2  B   Y  %   �  9   �  ?   �  *   <  5   g     �  )   �  0   �  �    \   �  @     H   I  P   �  D   �  &   (  2   O  �   �  &     ,   4  =   a  B   �  5   �  @     O   Y     �  '   �  /   �  +   !  W   M  ;   �  -   �           0      P  "   q  M   �  3   �  ,     !   C    e     r  Y   {  $   �     �  �     6   �  �   3  +   �  !   �  ,      6   M     �     �     �     �  8   �     �  �     #   �   [   �   q  !  :   �"     �"     �"  m   �"  g   R#  J   �#  ,   $  I   2$  :   |$     �$     �$     �$  3   %      8%  I   Y%  X   �%  �   �%  3   �&  Y   �&     I'  i   _'  v   �'  <   @(  1   }(  ^   �(     )  (   )  
   G)     R)     p)     �)  ?   �)  g   �)  !   Q*  &   s*  B   �*  %   �*  9   +  9   =+  #   w+  5   �+     �+  )   �+     ,  �  ,  \   �-  @   .  H   Z.  P   �.  D   �.  &   9/  2   `/  �   �/     0  %   60  <   \0  A   �0  5   �0  @   1  O   R1     �1  '   �1  /   �1  +   2  W   F2  ;   �2  -   �2      3     )3      I3  "   j3  M   �3  3   �3  ,   4  !   <4    ^4  	   k5  K   u5  $   �5     �5  �   �5  6   �6  �   �6  '   �7  !   �7  ,   �7  6   �7     18     =8     ?8     \8  8   l8     �8   	$ python -m notebook.auth password 
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
%s Could not set permissions on %s Currently running servers: DEPRECATED use base_url DEPRECATED use the nbserver_extensions dict instead DEPRECATED, use tornado_settings DISABLED: use %pylab or %matplotlib in the notebook to enable matplotlib. Deprecated: Use minified JS file or not, mainly use during dev to avoid JS recompilation Dict of Python modules to load as notebook server extensions.Entry values can be used to enable and disable the loading ofthe extensions. The extensions will be loaded in alphabetical order. Don't open the notebook in a browser after startup. ERROR: the notebook server could not be started because no available port could be found. Error loading server extension %s Extra keyword arguments to pass to `set_secure_cookie`. See tornado's set_secure_cookie docs for details. Extra paths to search for serving jinja templates.

        Can be used to override templates from notebook.templates. Extra variables to supply to jinja templates when rendering. Hint: run the following command to set a password If True, each line of output will be a JSON object with the details from the server info file. Interrupted... List currently running notebook servers. No answer for 5s: No such file or directory: %s No such notebook dir: '%r' No web browser found: %s. Notebook servers are configured to only be run with a password. One-time token used for opening a browser.
        Once used, this token cannot be used again.
         Path to search for custom.js, css Permission to listen on port %i denied Please use `%pylab{0}` or `%matplotlib{0}` in the notebook itself. Produce machine-readable JSON output. Reraise exceptions encountered loading server extensions? Running as root is not recommended. Use --allow-root to bypass. Serving notebooks from local directory: %s Set the Access-Control-Allow-Credentials: true header Shutdown confirmed Shutdown this notebook server (%s/[%s])?  Shutting down %d kernel Shutting down %d kernels Specify Where to open the notebook on startup. This is the
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
POT-Creation-Date: 2017-08-21 07:57-0400
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
        limited. (sec) Time window used to 
        check the message and data rate limits. Allow the notebook to be run from root user. Alternatively use `%s` when working on the notebook's Javascript and LESS Cannot bind to localhost, using 127.0.0.1 as default ip
%s 不能在 %s 设置权限 Currently running servers: DEPRECATED use base_url DEPRECATED use the nbserver_extensions dict instead DEPRECATED, use tornado_settings DISABLED: use %pylab or %matplotlib in the notebook to enable matplotlib. Deprecated: Use minified JS file or not, mainly use during dev to avoid JS recompilation Dict of Python modules to load as notebook server extensions.Entry values can be used to enable and disable the loading ofthe extensions. The extensions will be loaded in alphabetical order. Don't open the notebook in a browser after startup. ERROR: the notebook server could not be started because no available port could be found. 加载服务%s 失败 Extra keyword arguments to pass to `set_secure_cookie`. See tornado's set_secure_cookie docs for details. Extra paths to search for serving jinja templates.

        Can be used to override templates from notebook.templates. Extra variables to supply to jinja templates when rendering. Hint: run the following command to set a password If True, each line of output will be a JSON object with the details from the server info file. 已经中断... List currently running notebook servers. 等待5s:  No such file or directory: %s No such notebook dir: '%r' 没有找到web浏览器: %s. Notebook servers are configured to only be run with a password. One-time token used for opening a browser.
        Once used, this token cannot be used again.
         Path to search for custom.js, css Permission to listen on port %i denied Please use `%pylab{0}` or `%matplotlib{0}` in the notebook itself. Produce machine-readable JSON output. Reraise exceptions encountered loading server extensions? 不建议以root身份运行.使用--allow-root绕过过. 启动notebooks 在本地路径: %s Set the Access-Control-Allow-Credentials: true header 关闭已确认 Shutdown this notebook server (%s/[%s])?  关闭 %d 内核 Specify Where to open the notebook on startup. This is the
        `new` argument passed to the standard library method `webbrowser.open`.
        The behaviour is not guaranteed, but depends on browser support. Valid
        values are:
            2 opens a new tab,
            1 opens a new window,
            0 opens in an existing window.
        See the `webbrowser.open` documentation for details.
         Supply SSL options for the tornado HTTPServer.
            See the tornado docs for details. Supply extra arguments that will be passed to Jinja environment. Supply overrides for terminado. Currently only supports "shell_command". Supply overrides for the tornado.web.Application that the Jupyter notebook uses. Support for specifying --pylab on the command line has been removed. Terminals not available (error was %s) The IP address the notebook server will listen on. The Jupyter HTML Notebook.
    
    This launches a Tornado based HTML Notebook Server that serves up an HTML5/Javascript Notebook client. 本程序运行在: 
%s 该程序要求 tornado 版本 >= 4.0 该程序要求 tornado 版本 >= 4.0, 可是现实却是 %s 该程序要求 tornado 版本 >= 4.0, 可是现实却是 < 1.1.0 The MathJax.js configuration file that is to be used. The `ignore_minified_js` flag is deprecated and no longer works. The `ignore_minified_js` flag is deprecated and will be removed in Notebook 6.0 The config manager class to use The default URL to redirect to from `/` The directory to use for notebooks and kernels. The file where the cookie secret is stored. The full path to a certificate authority certificate for SSL/TLS client authentication. The full path to a private key file for usage with SSL/TLS. The full path to an SSL/TLS certificate file. The kernel manager class to use. The login handler class to use. The logout handler class to use. The notebook manager class to use. The number of additional ports to try if the specified port is not available. The port %i is already in use, trying another port. The port the notebook server will listen on. The session manager class to use. Token used for authenticating first-time connections to the server.

        When no password is enabled,
        the default is to generate a new, random token.

        Setting to an empty string disables authentication altogether, which is NOT RECOMMENDED.
         未命名 使用control-c停止此服务器并关闭所有内核(两次跳过确认). Using MathJax configuration file: %s Using MathJax: %s 欢迎来到项目Jupyter! 探索可用的各种工具及其相应的文档. 如果你有兴趣对这个平台,请访问http://jupyter.org/community.html community resources部分. Whether to allow the user to run the notebook as root. Whether to trust or not X-Scheme/X-Forwarded-Proto and X-Real-Ip/X-Forwarded-For headerssent by the upstream reverse proxy. Necessary if the proxy handles SSL 把notebook 服务cookie密码写入 %s [all ip addresses on your system] base_project_url is deprecated, use base_url extra paths to look for Javascript notebook extensions interrupted n received signal %s, stopping 重启操作... server_extensions is deprecated, use nbserver_extensions y 