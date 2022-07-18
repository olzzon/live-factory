# Using WebRTC:

## Install Janus:
Folow this README:
https://github.com/meetecho/janus-gateway

## HTTP Webserver for hosting Janus example:
Go to folder /home/xxx/janus-gateway/html and run:
```
python3 -m http.server 3001
```
https://appdividend.com/2022/01/29/python-simplehttpserver/

## Enabling unsecure pages in Chrome
To be able to use camera and Mic on an unsecure connection you need to add http://xx.xx.xx.xx:3001 here:

```
chrome://flags/#unsafely-treat-insecure-origin-as-secure
```
https://medium.com/@Carmichaelize/enabling-the-microphone-camera-in-chrome-for-local-unsecure-origins-9c90c3149339

