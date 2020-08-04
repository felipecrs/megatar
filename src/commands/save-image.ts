import { Command, flags } from '@oclif/command'
import * as execa from 'execa'
import cli from 'cli-ux'

export default class SaveImage extends Command {
  static description = 'describe the command here'

  static examples = [
    '$ megatar save-image hello-world',
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    'new-tag': flags.string({ char: 't', description: 'the new tag to write in the image' }),
    'discard-parents': flags.boolean({ allowNo: true, description: 'whether to discard the repository and registry fields or not', default: true })
  }

  static args = [{ name: 'image', required: true, description: "the docker image to save" }]

  async run() {
    const { args, flags } = this.parse(SaveImage)

    const imageName: string = args.image.split(':')[0]
    const imageTag: string = args.image.split(':')[1] || 'latest'
    const image = `${imageName}:${imageTag}`
    const baseImageName = imageName.split('/').reverse()[0]
    const newImageName: string = flags["discard-parents"] ? baseImageName : imageName
    const newImageTag: string = flags["new-tag"] || imageTag
    const newImage = `${newImageName}:${newImageTag}`
    const newImageFile = `${baseImageName}-${newImageTag}.tgz`

    cli.action.start(`Pulling image '${image}'`)
    await execa.command(`docker pull ${args.image}`)
    cli.action.stop()

    if (image !== newImage) {
      cli.action.start(`Tagging with '${newImage}'`)
      await execa.command(`docker tag ${image} ${newImage}`)
      cli.action.stop()
    }

    cli.action.start(`Saving '${newImage}' and compressing to '${newImageFile}'`)
    await execa.command(`docker save ${newImage} | gzip > ${newImageFile}`, { shell: 'bash' })
    cli.action.stop()

  }
}
