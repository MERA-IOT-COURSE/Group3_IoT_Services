var join = require('path').join
var childProcess = require('child_process')

function install(moduleName) {
    console.log(`Installation of the module: ${moduleName}`)
    childProcess.execSync(`npm install`, { cwd: join(__dirname, moduleName), env: childProcess.env, stdio: 'inherit' })
}

function remove(moduleName) {
    console.log(`Removing of the module: ${moduleName}`)
    if (/^win/i.test(process.platform)) {
        childProcess.execSync(`powershell -Command "Remove-Item 'node_modules' -Recurse -Force`, { cwd: join(__dirname, moduleName), env: childProcess.env, stdio: 'inherit' })
        childProcess.execSync(`powershell -Command "Remove-Item 'package-lock.json' -Recurse -Force`, { cwd: join(__dirname, moduleName), env: childProcess.env, stdio: 'inherit' })
    } else {
        childProcess.execSync(`rm -rf node_modules`, { cwd: join(__dirname, moduleName), env: childProcess.env, stdio: 'inherit' })
        childProcess.execSync(`rm -f package-lock.json`, { cwd: join(__dirname, moduleName), env: childProcess.env, stdio: 'inherit' })
    }
}

const modules = ["Utils", "Models", "Protocol", "Server", "Device"]
if (process.argv[2] === "--install") {
    modules.forEach((moduleName) => { install(moduleName) })
} else if (process.argv[2] === "--reinstall") {
    modules.forEach((moduleName) => {
        remove(moduleName)
        install(moduleName)
    })
}