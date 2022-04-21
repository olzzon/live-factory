import { spawn } from 'child_process'

let ndiSources: string[] = ['Finding Sources...']
const command = `${__dirname}/../ffmpegruntime`
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
