import sh

sh.cd ("ext/deps/")
sh.wget ("http://download.nanomsg.org/nanomsg-0.3-beta.tar.gz")
sh.tar ("xzf", "nanomsg-0.3-beta.tar.gz")
sh.cd ("nanomsg-0.3-beta")
sh.sh ("configure")
sh.make ()
