// const minimist = require("minimist");

import chalk from "chalk";
import inquirer from "inquirer";

import {
  createVueFile,
  createStoreFile,
  createUtilsFile

} from "./ops_file.js";
// const readline = require("readline");
// console.log(minimist(process.argv.slice(2)));

inquirer.prompt({
  type: "list",
  message: chalk.red("[Myworld] ") + "请选择生成的文件.",
  name: "type",
  choices: [{
    name: "View"
  },
  {
    name: "Components"
  },
  {
    name: "Store"
  },
  {
    name: "Utils"
  }
  ]

}).then(({
  type
}) => {
  inquirer.prompt([{
    type: "input",
    message: type + "  的名字请选择",
    name: "file",
    validate: function (val) {
      if (!val) { // 校验位数
        return "文件名必须存在";
      } else {
        return true;
      }
    }
  }

  ]).then(({
    file
  }) => {
    switch (type) {
      case "View":
      case "Components":
        createVueFile(file, type);
        break;
      case "Store":
        createStoreFile(file, type);
        break;
      case "Utils":
        createUtilsFile(file, type);
        break;
    }
  });
});
