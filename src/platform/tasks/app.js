
module.exports = {
  install(args, environment) {
    console.log(`I am happy to report that I am running the "app:install" task with the environment given`, environment)
    environment.logv("Shhh, verbose only!")
    return 1
  },

  update(args, environment) {
    console.log(`I am happy to report that I am running the "app:update" task with the environment given`, environment)
    environment.logv("Shhh, verbose only!")
    console.log("Running install task...")
    return 2
  },

  remove(args, environment) {
    console.log(`I am happy to report that I am running the "app:remove" task with the environment given`, environment)
    environment.logv("Shhh, verbose only!")
    return 3
  }
}
