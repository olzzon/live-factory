import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalInParamString,
	storeSetInputParams,
	storeSetInputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IDecklinkProps {
	factoryId: number
}

const DecklinkInputOptions: React.FC<IDecklinkProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const decklinkInput = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[0])
	const channels = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[1])

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		dispatch(storeSetGlobalInParamString(id, `-err_detect explode `))
		dispatch(storeSetInputParamString(id, ` -f decklink -i 'DeckLink Quad ({arg0}) -channels {arg1}' `))
		if (!decklinkInput) {
			dispatch(storeSetInputParams(id, 0, '1'))
		}
		if (!channels) {
			dispatch(storeSetInputParams(id, 1, '2'))
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				Decklink input :
				<input
					className="input-number"
					type="number"
					value={decklinkInput ?? 1}
					onChange={(event) => dispatch(storeSetInputParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Auduiochannels (2-16) :
				<input
					className="input-number"
					type="number"
					value={channels ?? 2}
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default DecklinkInputOptions


/*
list_formats
If set to true, print a list of supported formats and exit. Defaults to false.

format_code <FourCC>
This sets the input video format to the format given by the FourCC. To see the supported values of your device(s) use list_formats. Note that there is a FourCC 'pal ' that can also be used as pal (3 letters). Default behavior is autodetection of the input video format, if the hardware supports it.

raw_format
Set the pixel format of the captured video. Available values are:

‘auto’
This is the default which means 8-bit YUV 422 or 8-bit ARGB if format autodetection is used, 8-bit YUV 422 otherwise.

‘uyvy422’
8-bit YUV 422.

‘yuv422p10’
10-bit YUV 422.

‘argb’
8-bit RGB.

‘bgra’
8-bit RGB.

‘rgb10’
10-bit RGB.

teletext_lines
If set to nonzero, an additional teletext stream will be captured from the vertical ancillary data. Both SD PAL (576i) and HD (1080i or 1080p) sources are supported. In case of HD sources, OP47 packets are decoded.

This option is a bitmask of the SD PAL VBI lines captured, specifically lines 6 to 22, and lines 318 to 335. Line 6 is the LSB in the mask. Selected lines which do not contain teletext information will be ignored. You can use the special all constant to select all possible lines, or standard to skip lines 6, 318 and 319, which are not compatible with all receivers.

For SD sources, ffmpeg needs to be compiled with --enable-libzvbi. For HD sources, on older (pre-4K) DeckLink card models you have to capture in 10 bit mode.

channels
Defines number of audio channels to capture. Must be ‘2’, ‘8’ or ‘16’. Defaults to ‘2’.

duplex_mode
Sets the decklink device duplex/profile mode. Must be ‘unset’, ‘half’, ‘full’, ‘one_sub_device_full’, ‘one_sub_device_half’, ‘two_sub_device_full’, ‘four_sub_device_half’ Defaults to ‘unset’.

Note: DeckLink SDK 11.0 have replaced the duplex property by a profile property. For the DeckLink Duo 2 and DeckLink Quad 2, a profile is shared between any 2 sub-devices that utilize the same connectors. For the DeckLink 8K Pro, a profile is shared between all 4 sub-devices. So DeckLink 8K Pro support four profiles.

Valid profile modes for DeckLink 8K Pro(with DeckLink SDK >= 11.0): ‘one_sub_device_full’, ‘one_sub_device_half’, ‘two_sub_device_full’, ‘four_sub_device_half’

Valid profile modes for DeckLink Quad 2 and DeckLink Duo 2: ‘half’, ‘full’

timecode_format
Timecode type to include in the frame and video stream metadata. Must be ‘none’, ‘rp188vitc’, ‘rp188vitc2’, ‘rp188ltc’, ‘rp188hfr’, ‘rp188any’, ‘vitc’, ‘vitc2’, or ‘serial’. Defaults to ‘none’ (not included).

In order to properly support 50/60 fps timecodes, the ordering of the queried timecode types for ‘rp188any’ is HFR, VITC1, VITC2 and LTC for >30 fps content. Note that this is slightly different to the ordering used by the DeckLink API, which is HFR, VITC1, LTC, VITC2.

video_input
Sets the video input source. Must be ‘unset’, ‘sdi’, ‘hdmi’, ‘optical_sdi’, ‘component’, ‘composite’ or ‘s_video’. Defaults to ‘unset’.

audio_input
Sets the audio input source. Must be ‘unset’, ‘embedded’, ‘aes_ebu’, ‘analog’, ‘analog_xlr’, ‘analog_rca’ or ‘microphone’. Defaults to ‘unset’.

video_pts
Sets the video packet timestamp source. Must be ‘video’, ‘audio’, ‘reference’, ‘wallclock’ or ‘abs_wallclock’. Defaults to ‘video’.

audio_pts
Sets the audio packet timestamp source. Must be ‘video’, ‘audio’, ‘reference’, ‘wallclock’ or ‘abs_wallclock’. Defaults to ‘audio’.

draw_bars
If set to ‘true’, color bars are drawn in the event of a signal loss. Defaults to ‘true’.

queue_size
Sets maximum input buffer size in bytes. If the buffering reaches this value, incoming frames will be dropped. Defaults to ‘1073741824’.

audio_depth
Sets the audio sample bit depth. Must be ‘16’ or ‘32’. Defaults to ‘16’.

decklink_copyts
If set to true, timestamps are forwarded as they are without removing the initial offset. Defaults to false.

timestamp_align
Capture start time alignment in seconds. If set to nonzero, input frames are dropped till the system timestamp aligns with configured value. Alignment difference of up to one frame duration is tolerated. This is useful for maintaining input synchronization across N different hardware devices deployed for ’N-way’ redundancy. The system time of different hardware devices should be synchronized with protocols such as NTP or PTP, before using this option. Note that this method is not foolproof. In some border cases input synchronization may not happen due to thread scheduling jitters in the OS. Either sync could go wrong by 1 frame or in a rarer case timestamp_align seconds. Defaults to ‘0’.

wait_for_tc (bool)
Drop frames till a frame with timecode is received. Sometimes serial timecode isn’t received with the first input frame. If that happens, the stored stream timecode will be inaccurate. If this option is set to true, input frames are dropped till a frame with timecode is received. Option timecode_format must be specified. Defaults to false.

enable_klv(bool)
If set to true, extracts KLV data from VANC and outputs KLV packets. KLV VANC packets are joined based on MID and PSC fields and aggregated into one KLV packet. Defaults to false.


*/