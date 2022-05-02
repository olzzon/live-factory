import { spawn } from 'child_process'
// Node Modules:
const path = require('path')
const homeDir = require('os').homedir()
const command = path.resolve(homeDir, 'live-factory', 'ffmpegruntime')

let ndiSources: string[] = ['Finding Sources...']
let args = ' -hide_banner ' + '-f libndi_newtek -find_sources 1 -i dummy '

setInterval(() => {
	let findSources: string[] = ['Discovered Sources :']
	let childProcess = spawn(command, [args], { shell: true })
	childProcess.stderr.on('data', (response) => {
		let data = response.toString('utf8')
		if (data.slice(0, 16) === ('[libndi_newtek @')) {
            let sources = data.split('\n')
            sources.forEach((source: string) => {
                let sourceData = source.split('\t')

                if (sourceData.length > 1) {
                    findSources.push(sourceData[1].slice(1, -1))
                }
            })
            ndiSources = findSources
		}
	})
}, 8000)

export const discoverNdiSources = () => {
	return ndiSources
}
