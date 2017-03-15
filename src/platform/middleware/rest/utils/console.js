import chalk from 'chalk'

export const padString = (text, length) => {

  return text + '                                                                                       '.slice(0, length - text.length)

}

export const printRoutingTable = (routes, method) => {

  console.log(chalk.grey(' ======================================================================='))
  console.log('%s %s %s %s %s', chalk.grey('|'), chalk.white(padString('METHOD', 6)),chalk.grey('|'), chalk.white(padString('PATH', 60)),chalk.grey('|'))
  console.log(chalk.grey('|=======================================================================|'))

  routes.map(route => {

    if(method !== 'all' && method !== route.method) return

    console.log('%s %s %s %s %s', chalk.grey('|'), chalk.green(padString(route.method.toUpperCase(), 6)),chalk.grey('|'), chalk.white(padString(route.path, 60)),chalk.grey('|'))

  })

  console.log(chalk.grey(' ======================================================================='))
  console.log()

}
