#!/usr/bin/env node
import symbols from 'log-symbols'
import fs from 'fs'
import download from 'download-git-repo'
import ora from 'ora'
import chalk from 'chalk'
import { program } from 'commander'

const version = '1.0.0'
const templateUrl = 'https://github.com:Vibing/react-admin'

program
  .version(version, '-v, --version')
  .command('init <name>')
  .action(name => {
    if (!fs.existsSync(name)) {
      const spinner = ora('正在下载模块...')
      spinner.start()
      download(templateUrl, name, { clone: true }, err => {
        if (err) {
          spinner.fail()
          console.log(symbols.error, chalk.red(err))
          return
        }

        spinner.succeed()
        console.log(symbols.success, chalk.green('下载完成😄'))
        console.log(symbols.info, chalk.green('cd ./' + name))
        console.log(symbols.info, chalk.green('yarn or npm install'))
        console.log(symbols.info, chalk.green('yarn dll or npm run dll'))
        console.log(symbols.info, chalk.green('yarn dev or npm run dev'))
        console.log(symbols.info, chalk.green('run at: http://localhost:3000'))
        console.log(
          symbols.info,
          chalk.green('template url: https://github.com/Vibing/react-admin')
        )
      })
      return
    }

    console.log(symbols.error, chalk.red('该文件夹名称已存在'))
  })
program.parse(process.argv)
