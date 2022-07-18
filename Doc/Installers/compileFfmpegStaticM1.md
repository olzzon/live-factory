How to compile a real static FFmpeg file for macOS
There are several ways to compile FFmpeg. Homebrew is an easy way to compile FFmpeg files but sadly they are not static.
Static means you can copy the FFmpeg file anywere you want. It has no dependencies compared to a dynamically build like Homebrew does.

The below script will build a real static FFmpeg file. It does not cover all possible external libraries but it will give you a headstart. You can of course add more libs like Theora, Vorbis, VPX, .. yourself.
First download all source files:

- x264           git clone https://code.videolan.org/videolan/x264.git
- x265           https://bitbucket.org/multicoreware/x265/downloads/
- cmake   
- enca.          https://dl.cihar.com/enca/enca-1.19.tar.gz
- expat          https://github.com/libexpat/libexpat/releases/download/R_2_2_10/expat-2.2.10.tar.gz
- lame           git clone https://github.com/rbrito/lame.git
- fribidi          https://github.com/fribidi/fribidi/releases/download/
- freetype      https://download.savannah.gnu.org/releases/freetype/
- fontconfig    https://www.freedesktop.org/software/fontconfig/release/
- libiconv.      https://ftp.gnu.org/pub/gnu/libiconv/libiconv-1.16.tar.gz
- libass          https://github.com/libass/libass/releases/download/
- nasm.         https://www.nasm.us/pub/nasm/releasebuilds/2.15.05/nasm-2.15.05.tar.gz
- yasm          http://www.tortall.net/projects/yasm/releases/
- pkg-config  https://pkg-config.freedesktop.org/releases/

And of course FFmpeg :-)    git clone git://git.ffmpeg.org/ffmpeg.git

You also need to install Apple Xcode.