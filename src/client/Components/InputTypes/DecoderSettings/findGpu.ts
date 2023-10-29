
export const findGpuSettings = (osType: string): string[] => {
    switch(osType) {
        case 'Darwin':
            console.log("MacOS Video Toolbox GPU");
            return ['-hwaccel', 'videotoolbox']
        case 'Linux': 
            console.log("Linux, NVidia GPU")
            return ['-hwaccel', 'cuda'] // sometimes adding this??: -hwaccel_output_format cuda
        case 'Windows_NT':
            console.log("windows no GPU accelration")
            return []
        default: 
            console.log("Other OS, no GPU accelration")
            return []
    }
}