export default function loggerList(list, title) {
  const chalk = require('chalk')
  console.log(`${title}有：\n`);
  list.forEach((item, i) => {
    console.log(chalk.magenta(`${i + 1}.${item}\n`));
  })
}