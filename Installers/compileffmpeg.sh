echo '♻️ ' Create Ramdisk

if df | grep Ramdisk >/dev/null; then
    tput bold
    echo
    echo ⏏ Eject Ramdisk
    tput sgr0
fi

if df | grep Ramdisk >/dev/null; then
    diskutil eject Ramdisk
    sleep 1
fi

DISK_ID=$(hdid -nomount ram://70000000)

newfs_hfs -v tempdisk ${DISK_ID}

diskutil mount ${DISK_ID}

sleep 1

SOURCE="/Volumes/tempdisk/sw"

COMPILED="/Volumes/tempdisk/compile"

mkdir ${SOURCE}

mkdir ${COMPILED}

export PATH=${SOURCE}/bin:$PATH

export CC=clang && export PKG_CONFIG_PATH="${SOURCE}/lib/pkgconfig"

#
# ask user to copy all files to ramdisk
#

echo
echo Copy all files to ramdisk tempdisk/compile folder and press a key when ready
read -s

echo '♻️ ' Start compiling YASM

#
# compile YASM
#

cd ${COMPILED}

cd yasm-1.3.0

./configure --prefix=${SOURCE}

make -j 10

make install

sleep 1

echo '♻️ ' Start compiling NASM

#
# compile NASM
#

cd ${COMPILED}

cd nasm-2.15.05

./configure --prefix=${SOURCE}

make -j 10

make install

sleep 1

echo '♻️ ' Start compiling PKG

#
# compile PKG
#

cd ${COMPILED}

cd pkg-config-0.29.2

export LDFLAGS="-framework Foundation -framework Cocoa"

./configure --prefix=${SOURCE} --with-pc-path=${SOURCE}/lib/pkgconfig --with-internal-glib --disable-shared --enable-static

make -j 10

make install

unset LDFLAGS

sleep 1

echo '♻️ ' Start compiling ZLIB

#
# ZLIB
#

cd ${COMPILED}

cd zlib-1.2.11

./configure --prefix=${SOURCE}

make -j 10

make install

rm ${SOURCE}/lib/libz.so*

rm ${SOURCE}/lib/libz.*

echo '♻️ ' Start compiling CMAKE

#
# compile CMAKE
#

cd ${COMPILED}

cd cmake-3.22.1

./configure --prefix=${SOURCE}

make -j 10

make install

sleep 1

echo '♻️ ' Start compiling Lame

#
# compile Lame
#

cd ${COMPILED}

cd lame

./configure --prefix=${SOURCE} --disable-shared --enable-static

make -j 10

make install

echo '♻️ ' Start compiling X264

#
# x264
#

cd ${COMPILED}

cd x264

./configure --prefix=${SOURCE} --disable-shared --enable-static --enable-pic

make -j 10

make install

make install-lib-static

# echo
# echo continue
# read -s

sleep 1

echo '♻️ ' Start compiling X265

#
# x265
#

rm -f ${SOURCE}/include/x265*.h 2>/dev/null

rm -f ${SOURCE}/lib/libx265.a 2>/dev/null

echo '♻️ ' X265 12bit

cd ${COMPILED}

cd /Volumes/tempdisk/compile/x265/source

cmake -DCMAKE_INSTALL_PREFIX:PATH=${SOURCE} -DHIGH_BIT_DEPTH=ON -DMAIN12=ON -DENABLE_SHARED=NO -DEXPORT_C_API=NO -DENABLE_CLI=OFF .

make

mv libx265.a libx265_main12.a

make clean-generated

rm CMakeCache.txt

echo '♻️ ' X265 10bit

cd ${COMPILED}

cd /Volumes/tempdisk/compile/x265/source

cmake -DCMAKE_INSTALL_PREFIX:PATH=${SOURCE} -DHIGH_BIT_DEPTH=ON -DMAIN10=ON -DENABLE_SHARED=NO -DEXPORT_C_API=NO -DENABLE_CLI=OFF .

make clean

make

mv libx265.a libx265_main10.a

make clean-generated && rm CMakeCache.txt

echo '♻️ ' X265 full

cd ${COMPILED}

cd /Volumes/tempdisk/compile/x265/source

cmake -DCMAKE_INSTALL_PREFIX:PATH=${SOURCE} -DEXTRA_LIB="x265_main10.a;x265_main12.a" -DEXTRA_LINK_FLAGS=-L. -DLINKED_10BIT=ON -DLINKED_12BIT=ON -DENABLE_SHARED=OFF -DENABLE_CLI=OFF .

make clean

make

mv libx265.a libx265_main.a

libtool -static -o libx265.a libx265_main.a libx265_main10.a libx265_main12.a 2>/dev/null

make install

sleep 1

echo '♻️ ' Start compiling VPX

#
# VPX
#

cd ${COMPILED}

cd libvpx

./configure --prefix=${SOURCE} --enable-vp8 --enable-postproc --enable-vp9-postproc --enable-vp9-highbitdepth --disable-examples --disable-docs --enable-multi-res-encoding --disable-unit-tests --enable-pic --disable-shared

make -j 10

make install

echo '♻️ ' Start compiling EXPAT

#
# EXPAT
#

cd ${COMPILED}

cd expat-2.2.10

./configure --prefix=${SOURCE} --disable-shared --enable-static

make -j 10

make install

echo '♻️ ' Start compiling LIBICONV

#
# libiconv
#

cd ${COMPILED}

cd libiconv-1.16

./configure --prefix=${SOURCE} --disable-shared --enable-static

make -j 10

make install

echo '♻️ ' Start compiling Gettext

#
# Gettext
#

cd ${COMPILED}

cd gettext-0.21

./configure --prefix=${SOURCE} --disable-dependency-tracking --disable-silent-rules --disable-debug --with-included-gettext --with-included-glib \
    --with-included-libcroco --with-included-libunistring --with-emacs --disable-java --disable-native-java --disable-csharp \
    --disable-shared --enable-static --without-git --without-cvs --disable-docs --disable-examples

make -j 10

make install

echo '♻️ ' Start compiling LIBPNG

#
# LIBPNG
#

cd ${COMPILED}

cd libpng

./configure --prefix=${SOURCE} --disable-dependency-tracking --disable-silent-rules --enable-static --disable-shared

make -j 10

make install

echo '♻️ ' Start compiling ENCA

#
# ENCA
#

cd ${COMPILED}

cd enca-1.19

./configure --prefix=${SOURCE} --disable-shared --enable-static

make -j 10

make install

echo '♻️ ' Start compiling FREETYPE

#
# FREETYPE
#

cd ${COMPILED}

cd freetype-2.10.4

./configure --prefix=${SOURCE} --disable-shared --enable-static

make -j 10

make install

echo '♻️ ' Start compiling FRIBIDI

#
# FRIBIDI
#

cd ${COMPILED}

cd fribidi-1.0.10

./configure --prefix=${SOURCE} --disable-shared --enable-static

make -j 10

make install

echo '♻️ ' Start compiling FONTCONFIG

#
# FONTCONFIG
#

cd ${COMPILED}

cd fontconfig-2.13.92

./configure --prefix=${SOURCE} --enable-iconv --disable-libxml2 --disable-shared --enable-static

make -j 10

make install

sleep 1

echo '♻️ ' Start compiling harfbuzz

#
# HARFBUZZ
#

cd ${COMPILED}

cd harfbuzz-2.7.2

./configure --prefix=${SOURCE} --disable-shared --enable-static

make -j 10

make install

echo '♻️ ' Start compiling LIBASS

sleep 1

#
# LIBASS
#

cd ${COMPILED}

cd libass-0.15.0

./configure --prefix=${SOURCE} --disable-fontconfig --disable-shared --enable-static

make -j 10

make install

sleep 1

echo '♻️ ' Start compiling OPUS

#
# OPUS
#

cd ${COMPILED}

cd opus-1.3.1

./configure --prefix=${SOURCE} --disable-shared --enable-static

make -j 10

make install

sleep 1

#
# LIBOGG
#

cd ${COMPILED}

cd libogg-1.3.3

./configure --prefix=${SOURCE} --disable-shared --enable-static

make -j 10

make install

sleep 1

#
# LIBVORBIS
#

cd ${COMPILED}

cd libvorbis-1.3.6

./configure --prefix=${SOURCE} --with-ogg-libraries=${SOURCE}/lib --with-ogg-includes=${SOURCE}/include/ --enable-static --disable-shared

make -j 10

make install

sleep 1

#
# THEORA
#

cd ${COMPILED}

cd libtheora-1.1.1

./configure --prefix=${SOURCE} --disable-asm --with-ogg-libraries=${SOURCE}/lib --with-ogg-includes=${SOURCE}/include/ --with-vorbis-libraries=${SOURCE}/lib --with-vorbis-includes=${SOURCE}/include/ --enable-static --disable-shared

make -j 10

make install

sleep 1

echo '♻️ ' Start compiling Vid-stab

#
# Vidstab
#

cd ${COMPILED}

cd vidstab-master

cmake -DCMAKE_INSTALL_PREFIX:PATH=${SOURCE} -DLIBTYPE=STATIC -DBUILD_SHARED_LIBS=OFF -DUSE_OMP=OFF -DENABLE_SHARED=off .

make -j 10

make install

sleep 1

#
# SNAPPY
#

cd ${COMPILED}

cd snappy

cmake -DCMAKE_INSTALL_PREFIX:PATH=${SOURCE} -DENABLE_SHARED=OFF -DENABLE_CLI=OFF

make -j 10

make install

echo '♻️ ' Start compiling OpenJPEG

sleep 1

#
# OpenJPEG
#

cd ${COMPILED}

cd openjpeg-2.4.0

cmake -DCMAKE_INSTALL_PREFIX:PATH=${SOURCE} -DENABLE_C_DEPS=ON -DLIBTYPE=STATIC -DENABLE_SHARED=OFF -DENABLE_STATIC=ON .

make -j 10

make install

rm ${SOURCE}/lib/libopenjp2.2.4.0.dy*
rm ${SOURCE}/lib/libopenjp2.dy*
rm ${SOURCE}/lib/libopenjp2.7.dy*

Sleep 1

echo '♻️ ' Start compiling AOM

#
# AOM
#

cd ${COMPILED}

cd aom

mkdir aom_build

cd aom_build

cmake ${COMPILED}/aom -DENABLE_TESTS=0 -DCMAKE_INSTALL_PREFIX:PATH=${SOURCE} -DLIBTYPE=STATIC -DAOM_TARGET_CPU=ARM64 -DCONFIG_RUNTIME_CPU_DETECT=0

make -j 10

make install

sleep 1

echo '♻️ ' Start compiling WEBP

#
# WEBP
#

cd ${COMPILED}

cd libwebp-1.1.0

cmake -DCMAKE_INSTALL_PREFIX:PATH=${SOURCE} -DENABLE_C_DEPS=ON -DLIBTYPE=STATIC -DENABLE_SHARED=OFF -DENABLE_STATIC=ON .

make -j 10

make install

sleep 1

echo '♻️ ' compile zimg

cd ${COMPILED}

cd zimg-release-3.0.2

./autogen.sh

./Configure --prefix=${SOURCE} --disable-shared --enable-static

make -j 10

make install

echo '♻️ ' Start compiling SVT-AV1

#
# SVT-AV1
#

cd ${COMPILED}

cd SVT-AV1-master

cmake -DCMAKE_INSTALL_PREFIX:PATH=${SOURCE} -DCMAKE_BUILD_TYPE=Release -DBUILD_DEC=OFF -DBUILD_SHARED_LIBS=OFF -DLIBTYPE=STATIC -DENABLE_SHARED=OFF -DENABLE_STATIC=ON .

make -j 10

make install

sleep 1

echo '♻️ ' Start compiling FFMPEG

cd ${COMPILED}

cd ffmpeg

export LDFLAGS="-L${SOURCE}/lib"

export CFLAGS="-I${SOURCE}/include"

export LDFLAGS="$LDFLAGS -framework VideoToolbox"

./configure --prefix=${SOURCE} --extra-cflags="-fno-stack-check" --arch=arm64 --cc=/usr/bin/clang --enable-gpl --enable-libopenjpeg --enable-libopus --enable-libmp3lame --enable-libx264 --enable-libx265 --enable-libvpx --enable-libwebp --enable-libass --enable-libfreetype --enable-libtheora --enable-libvorbis --enable-libsnappy --enable-libaom --enable-libvidstab --enable-libzimg --enable-libsvtav1 --enable-version3 --pkg-config-flags=--static --disable-ffplay --enable-postproc --enable-nonfree --enable-neon --enable-runtime-cpudetect --disable-indev=qtkit --disable-indev=x11grab_xcb

make -j 10

make install
