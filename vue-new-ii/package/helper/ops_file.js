import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import fs from "fs";

export function createVueFile (file, type) {
  inquirer.prompt([{
    type: "checkbox",
    message: "组件的标签生成:",
    name: "list",
    choices: [{
      name: "<template>",
      checked: true // 默认选中

    },
    {
      name: "<script>",
      checked: true // 默认选中
    },
    {
      name: "<style>",
      checked: true // 默认选中

    }
    ]
  }]).then(({
    list
  }) => {
    list = list.map(e => {
      if (/style/.test(e)) {
        return e.substr(0, 6) + " lang=\"stylus\" scoped" + ">" + "\n\n" + e[0] + "/" + e.substr(1);
      } else if (/script/.test(e)) {
        return e + "\nexport default {  \n\tdata (){\n\t\treturn {\n\t\t} \n\t}\n}\n" + e[0] + "/" + e.substr(1) + "\n";
      } else if (/template/.test(e)) {
        return e + "\n\t<div></div>    \n" + e[0] + "/" + e.substr(1);
      }
    });

    // 如果当前文件不存在先创建
    if (!fs.existsSync(`./src/${type.toLowerCase()}`)) {
      fs.mkdirSync(`./src/${type.toLowerCase()}`);
    }
    const spinner = ora("文件生成中 ...").start();
    // 如果当前是以 / 头加一层目录
    const path = `./src/${type.toLowerCase()}/${file}.vue`;
    if (fs.existsSync(path)) {
      return spinner.fail(chalk.red("文件已经存在"));
    }
    // spinner.start()
    fs.writeFileSync(path, list.join("\n"), {

    });
    spinner.text = chalk.red(`${file}.vue  `) + chalk.green("文件生成成功...");
    spinner.succeed();
  });
}

export function createStoreFile (file, type) {
  inquirer.prompt([{
    type: "checkbox",
    message: "状态树的属性生成:",
    name: "list",
    choices: [{
      name: "namespaced",
      checked: true // 默认选中

    }, {
      name: "modules",
      checked: false // 默认选中

    }, {
      name: "getters",
      checked: false // 默认选中

    },
    {
      name: "state",
      checked: true // 默认选中

    },
    {
      name: "mutations",
      checked: true // 默认选中
    },
    {
      name: "actions",
      checked: true // 默认选中

    }
    ]
  }]).then(({
    list
  }) => {
    list = list.map(e => {
      if (e === "namespaced") {
        return `  ${e}: true`;
      } else {
        return `  ${e}: {\n\n  }`;
      }
    });
    if (!fs.existsSync("./src/store")) {
      fs.mkdirSync("./src/store");
    }
    if (!fs.existsSync("./src/store/modules")) {
      fs.mkdirSync("./src/store/modules");
    }
    const spinner = ora("文件生成中 ...").start();

    fs.writeFileSync(`./src/store/modules/${file}.js`, `export default {\n${list.join(",\n")}\n};\n`, {

    });
    spinner.text = chalk.red(`${file}.js  `) + chalk.green("文件生成成功...");
    spinner.succeed();
  });
}

export function createUtilsFile (file, type) {
  if (!fs.existsSync("./src/utils")) {
    fs.mkdirSync("./src/utils");
  }
  const spinner = ora("文件生成中 ...").start();

  fs.writeFileSync(`./src/utils/${file}.js`, "export default {\n\n\n\n\n};\n", {

  });
  spinner.text = chalk.red(`${file}.js  `) + chalk.green("文件生成成功...");
  spinner.succeed();
}
