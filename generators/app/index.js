"use strict";
const Generator = require("yeoman-generator");
const prompts = require("./utils/prompts");
const chalk = require("chalk");
const { writeHexagonal } = require("./utils/fileWriter");

module.exports = class extends Generator {
  async prompting() {
    this.log(
      chalk.cyan(`
***********************************************
*                                             *
*    Welcome to the HexaBoot Generator!       *
*                                             *
***********************************************
`)
    );

    this.answers = await this.prompt(prompts);

    let appName = this.answers.appName.replace(/\s/g, "");
    this.answers.appName = appName.charAt(0).toUpperCase() + appName.slice(1);

    this.answers.groupID = this.answers.groupID.replace(/\s/g, "");
    this.answers.globalSnapShot = this.answers.globalSnapShot.replace(
      /\s/g,
      ""
    );
  }

  writing() {
    try {
      writeHexagonal(this);
    } catch (err) {
      this.log(chalk.red("\n[ERROR] " + err.message));
    }
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }

  end() {
    const appName = this.answers.appName;
    this.log(
      chalk.green(`
 Project "${appName}" generated successfully!
`)
    );
  }
};
