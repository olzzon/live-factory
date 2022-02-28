# live-factory
Reciever - transmitter - transcoder for video and audio 


-f lavfi -i smptehdbars=1920x1080



### Build FFMPEG for Mac M1
Follow https://trac.ffmpeg.org/wiki/CompilationGuide/macOS

Add dependencies:
```
brew install automake fdk-aac git lame libass libtool libvorbis libvpx opus sdl shtool texi2html theora wget x264 x265 xvid nasm
```
```
install: http://new.tk/NDIRedistV5Apple
```

Remember to run:
```
make distclean 
```


```
./configure  --prefix=/usr/local --enable-gpl --enable-nonfree --enable-libass --enable-libfdk-aac --enable-libfreetype --enable-libvorbis --enable-libvpx --enable-libx264 --enable-libx265 --enable-libopus --samples=fate-suite --enable-videotoolbox --enable-libndi_newtek --enable-hwaccel=h264  
```

Decode HW:
```
./ffmpeg -stream_loop -1 -hwaccel videotoolbox -hwaccel_output_format videotoolbox -re -vsync 0 -i /Users/olzzon/coding/live-factory/media/RedBull.ts -f libndi_newtek -pix_fmt uyvy422 OUTPUT
```
### Patch FFMPEG:
https://gist.github.com/pabloko/8affc8157a83e201503c326a28d17bf2
