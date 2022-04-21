import { spawn } from 'child_process'

let decklinkDevices: string[] = ['Finding Devices...']
const command = `${__dirname}/../ffmpegruntime`
let args = ' -hide_banner -sinks decklink '

setInterval(() => {
	let findDevices: string[] = ['Decklink Outputs :']
	let childProcess = spawn(command, [args], { shell: true })
	childProcess.stdout.on('data', (response) => {
		let data = response.toString('utf8')
		let devices = data.split('\n')
		devices.forEach((device: string) => {
			let deviceData = device.split('[')
            if (deviceData[1]) {
                deviceData = deviceData[1].split(']')
				findDevices.push(deviceData[0])
            }
		})
		console.debug('Decklink Devices :', findDevices)
		decklinkDevices = findDevices
	})
}, 8000)

export const discoverDecklinkOutputs = () => {
	return decklinkDevices
}
