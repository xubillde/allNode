import commander from 'commander'
import { PACKAGE_VERSION } from '../src.config'
import chalk from 'chalk'

commander
  .version(PACKAGE_VERSION);

import CORE from '../package.config'

CORE.forEach(c => {
  const sortName = c.children.sort((a,b) => (a.name.length - b.name.length))
  sortName.forEach(data => {
    commander.command(data.name, data.comment)
    commander.command(data.abbr, `alias for ${data.name}`)
  })
})


commander.on('--help', function(){
  console.log('\n')
  CORE.forEach(c => {
    console.log(chalk.blue(`--| ${c.class} | --`))
    c.children.forEach((data, index) => {
      console.log(`${index + 1}.[${data.name}] abbr: `, chalk.yellow(`[core ${data.abbr}]`), data.comment)
    })
  })
})

commander.parse(process.argv);
