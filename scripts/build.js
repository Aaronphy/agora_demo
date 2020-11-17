const path = require('path');
const execSync = require('child_process').execSync;

const exec = (cmd) =>{
    execSync(cmd,{stdio:'inherit',env:process.env});
}

const cwd= process.cwd();

process.chdir(path.resolve(__dirname,'..'));

exec('npm run build');

try{
    exec('cp -R ./dist/* ./docs');
    exec('cp -R ./public/*.css ./docs')
}catch(e){
    console.log(e);
}

process.chdir(cwd);