var path = require('path');
var chalk = require('chalk');    //不同颜色的info
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');    //yeoman弹出框

var zeptoPackage = yeoman.Base.extend({
    info: function() {
        this.log(chalk.green(
            'I am going to build your app!'
        ));
    },
    prompting: function() {
        this.log(yosay('Welcome to this ' + chalk.red('generator-zepto') + ' generator!'));
        
        const prompts = [{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname // Default to current folder name
          }, {
            type: 'input',
            name: 'version',
            message: 'version',
            default: '1.0.0'
          }, {
            type: 'input',
            name: 'description',
            message: 'description',
            default: ''
          }, {
            type: 'input',
            name: 'author',
            message: 'author',
            default: ''
          }];   
          return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
          });     
    },
    writing: function() { // 
        // 拷贝目录
        this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
        // 拷贝文件
        this.fs.copyTpl(
          this.templatePath('package.json'),
          this.destinationPath('package.json'), {
            name: this.props.name,
            description: this.props.description,
            author: this.props.author,
            version: this.props.version
          }
        );
    
        this.fs.copy(
          this.templatePath('README.md'),
          this.destinationPath('README.md')
        );
    
        this.fs.copy(
          this.templatePath('webpack.config.js'),
          this.destinationPath('webpack.config.js')
        );

        this.fs.copy(
          this.templatePath('index.html'),
          this.destinationPath('index.html')
        );
    
    },
    generateClient: function() {
        this.sourceRoot(path.join(__dirname, 'templates'));
        this.destinationPath('./');
    },
    install: function() {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    },
    end: function() {
        this.log(yosay(
            'Your app has been created successfully!'
        ));
    }

});

module.exports = zeptoPackage;