var join = require("path").join
var childProcess = require("child_process")

function install(moduleName) {
    console.log(`Installation of the module: ${moduleName}`)
    childProcess.execSync("npm install", { cwd: join(__dirname, moduleName), env: childProcess.env, stdio: "inherit" })
}

function remove(moduleName) {
    console.log(`Removing of the module: ${moduleName}`)
    if (/^win/i.test(process.platform)) {
        try {
            childProcess.execSync("powershell -Command \"Remove-Item 'node_modules' -Recurse -Force -ErrorAction Ignore\"", { cwd: join(__dirname, moduleName), env: childProcess.env, stdio: "inherit" })
        } catch (e) { }
        try {
            childProcess.execSync("powershell -Command \"Remove-Item 'package-lock.json' -Recurse -Force -ErrorAction Ignore\"", { cwd: join(__dirname, moduleName), env: childProcess.env, stdio: "inherit" })
        } catch (e) { }
    } else {
        childProcess.execSync("rm -rf node_modules", { cwd: join(__dirname, moduleName), env: childProcess.env, stdio: "inherit" })
        childProcess.execSync("rm -f package-lock.json", { cwd: join(__dirname, moduleName), env: childProcess.env, stdio: "inherit" })
    }
}

const modules = ["Utils", "Models", "Protocol", "Server", "Device"]

switch (process.argv[2]) {
    case "--install-all":
        modules.forEach((moduleName) => { install(moduleName) })
        break
    case "--uninstall-all":
        modules.forEach((moduleName) => { remove(moduleName) })
        break
    case "--reinstall-all":
        modules.forEach((moduleName) => {
            remove(moduleName)
            install(moduleName)
        })
        break
}
