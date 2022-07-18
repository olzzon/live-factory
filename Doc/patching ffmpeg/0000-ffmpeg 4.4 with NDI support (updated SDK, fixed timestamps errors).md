# ffmpeg 4.4 with NDI

This patch adds libndi_newtek to last ffmpeg version, and fix timecode related issues that produces wrong PTS/DTS timestamps that seems to happen with newer NDI SDKs.

### changes

- Updated libndi methods by newer versions (v2/v3)
- Calculating PTS/DTS from timestamp instead of timecode, that is optionally sent by the sender.