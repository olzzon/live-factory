import { spawn } from 'child_process'

// Node Modules:
const path = require('path')
const homeDir = require('os').homedir()
const command = path.resolve(homeDir, 'live-factory', 'ffmpegruntime')

let decklinkDevices: string[] = ['Finding Sources...']
let args = ' -hide_banner -sources decklink '

setInterval(() => {
	let findDevices: string[] = ['Decklink Inputs :']
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
		console.debug('Decklink Sources :', findDevices)
		decklinkDevices = findDevices
	})
}, 8000)

export const discoverDecklinkSources = () => {
	return decklinkDevices
}
