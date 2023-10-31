import { GPU_TYPES } from '../../../../interface/SettingsInterface';
export const findGpuSettings = (gpuType: GPU_TYPES): string[] => {
    switch(gpuType) {
        case GPU_TYPES.MAC:
            console.log("MacOS Video Toolbox GPU");
            return ['-hwaccel', 'videotoolbox']
        case GPU_TYPES.NVIDIA:
            console.log("Linux, NVidia GPU")
            return ['-hwaccel', 'cuda'] // sometimes adding this??: -hwaccel_output_format cuda
        default:
            console.log("Other OS, no GPU accelration")
            return []
    }
}