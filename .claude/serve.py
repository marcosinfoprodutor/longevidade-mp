import http.server, os, sys
os.chdir("/Users/mp/Desktop/Exames Marcos Paulo")
http.server.test(HandlerClass=http.server.SimpleHTTPRequestHandler, port=3000, bind="127.0.0.1")
