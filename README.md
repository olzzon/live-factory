# live-factory
Reciever - transmitter - transcoder for video and audio 


-f lavfi -i smptehdbars=1920x1080


# Mac M1 FFmpeg compilation:
### Install SRT support:
```

git clone --depth 1 https://github.com/Haivision/srt.git ~/ffmpeg_sources/srt
cd ~/ffmpeg_sources/srt

brew unlink openssl && brew link openssl --force
echo 'export PATH="/opt/homebrew/opt/openssl@3/bin:$PATH"' >> ~/.zshrc
# For macOS also export OpenSSL paths with the following commands:
# export OPENSSL_ROOT_DIR=$(brew --prefix openssl)
# export OPENSSL_LIB_DIR=$(brew --prefix openssl)"/lib"
# export OPENSSL_INCLUDE_DIR=$(brew --prefix openssl)"/include"

./configure
make
sudo make install

```

### Build FFMPEG
Follow https://trac.ffmpeg.org/wiki/CompilationGuide/macOS

Add dependencies:
```
brew install automake fdk-aac git lame libass libtool libvorbis libvpx opus sdl shtool texi2html theora wget x264 x265 xvid nasm
```
```
install: http://new.tk/NDIRedistV5Apple
```

#### Clone FFMPEG-NDI repository:
```
https://github.com/olzzon/ffmpeg-ndi
```

### Configure
```
make distclean 
./configure  --prefix=/usr/local --enable-libsrt --enable-gpl --enable-nonfree --enable-libass --enable-libfdk-aac --enable-libfreetype --enable-libvorbis --enable-libvpx --enable-libx264 --enable-libx265 --enable-libopus --samples=fate-suite --enable-videotoolbox --enable-libndi_newtek 
```

```
make -j10
sudo make install
```

Rename ffmpeg to ffmpegruntime and copy it to "dist/server" folder


# Build FFmpeg Ubuntu x86

## Install TeamViewer AFTER adding dependencies

### Get dependencies:
```
# These two had problems when installed later:
sudo apt install libsdl2-dev libass-dev 

sudo apt update -qq && sudo apt -y install autoconf automake build-essential cmake git libssl-dev libfreetype6-dev libgnutls28-dev libmp3lame-dev  libtool libva-dev libvdpau-dev libvorbis-dev libxcb1-dev libxcb-shm0-dev libxcb-xfixes0-dev meson ninja-build pkg-config texinfo wget yasm zlib1g-dev libunistring-dev libaom-dev nasm libx264-dev libx265-dev libnuma-dev libvpx-dev libfdk-aac-dev libopus-dev nvidia-cuda-toolkit

```

### Get source and set path:
```
mkdir ~/bin
cd ~
git clone https://github.com/olzzon/ffmpeg-ndi.git
cd ffmpeg-ndi
PATH="$HOME/bin:$PATH"
PKG_CONFIG_PATH="$HOME/ffmpeg-ndi/lib/pkgconfig" 
```

### Install Decklink:
install both Software AND SDK from blackmagicdesign.com
copy SDK lib files to ffmpeg-ndi/include
### Install NDI SDK:
https://downloads.ndi.tv/SDK/NDI_SDK_Linux/Install_NDI_SDK_v5_Linux.tar.gz
unpack with GUI
copy x86 libndi.so files to ffmpeg-ndi/lib
(HACK: extract SDK and copy the libndi.so.5 files to /usr/lib )

### Compile SRT:
```
cd ~/ffmpeg-ndi
git clone --depth 1 https://github.com/Haivision/srt.git
mkdir srt/build
cd ~/ffmpeg-ndi/srt/build
cmake -DENABLE_C_DEPS=ON -DENABLE_SHARED=ON -DENABLE_STATIC=OFF -fPIC ..
make
sudo make install
```

### Compile CUDA support:
```
cd ~/ffmpeg-ndi
git clone https://git.videolan.org/git/ffmpeg/nv-codec-headers.git
cd nv-codec-headers && sudo make install && cd ..

### Prepare and compile:
```
cd ~/ffmpeg-ndi
./configure --prefix="$HOME/ffmpeg-ndi" --pkg-config-flags="--static" --extra-cflags="-I$HOME/ffmpeg-ndi/include -I/usr/local/cuda/include" --extra-ldflags="-L/usr/local/cuda/lib64 -L$HOME/ffmpeg-ndi/lib" --extra-libs="-lpthread -lm" --ld="g++" --bindir="$HOME/bin" --enable-libsrt --enable-gpl --enable-gnutls --enable-nonfree --enable-libass --enable-libfdk-aac --enable-libfreetype --enable-libvorbis --enable-libvpx --enable-libx264 --enable-libx265 --enable-libopus --samples=fate-suite --enable-libndi_newtek --enable-decklink --enable-cuda-nvcc 

??? --enable-cuda --enable-cuvid --enable-nvdec --enable-nvenc

make
sudo make install
export LD_LIBRARY_PATH=/usr/local/lib:/usr/lib/:/home/ubuntu/ffmpeg-ndi/lib
source ~/.profile
```

Rebuild remember:
```
make distclean 

```

### Files for a Linux installation:
Compress lib:
```
tar -czvf lib.tar.gz lib/*
```
Transfer together with ffmpeg


## FFmpeg Examples
Decode HW:
```
./ffmpeg -stream_loop -1 -hwaccel videotoolbox -hwaccel_output_format videotoolbox -re -vsync 0 -i /Users/olzzon/coding/live-factory/media/RedBull.ts -f libndi_newtek -pix_fmt uyvy422 OUTPUT
```
Linux CUDA srt encoder:
```
./ffmpeg -hwaccel cuda -re -stream_loop -1 -i ~/mediefiler/Jazz.mp4 -c:v h264_nvenc -preset llhp -b:v 20M -maxrate:v 30M -bufsize 1M -zerolatency 1 -pix_fmt uyvy422 -f matroska "srt://0.0.0.0:9998?pkt_size=1316&mode=listener"
```

### Patch NDI - FFMPEG:
https://gist.github.com/pabloko/8affc8157a83e201503c326a28d17bf2

