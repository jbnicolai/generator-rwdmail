'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var RwdmailGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.npmInstall();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        console.log(chalk.magenta('You\'re using the fantastic RWD-Mail generator.'));

        var prompts = [{
            type: 'list',
            name: 'layout',
            message: 'What layout template would you like?',
            choices: [
                { name: 'Single column', value: 'one'},
                { name: 'Two column', value: 'two'},
                { name: 'Three column', value: 'three'}
            ]
        }, {
            type: 'list',
            name: 'platform',
            message: 'What email platform are you using?',
            choices: [
                { name: 'None', value: 'none' },
                { name: 'Campaign Monitor', value: 'cm' }
            ]
        }];

        // Ask what template they want
        this.prompt(prompts, function (answers) {
            this.cm = (answers.platform === 'cm');
            this.layout = answers.layout;

            done();
        }.bind(this));
    },

    app: function () {
        this.mkdir('app');
        this.mkdir('app/images')

        this.template('_Gruntfile.js', 'Gruntfile.js');
        this.copy('_package.json', 'package.json');
        this.copy('gitignore', '.gitignore');
    },

    htmlTemplate: function () {
        this.template('index.html', 'app/index.html');
    },

    styles: function () {
        this.mkdir('app/styles');

        this.copy('styles/style.scss', 'app/styles/style.scss');
        this.copy('styles/_variables.scss', 'app/styles/_variables.scss');
        this.copy('styles/_reset.scss', 'app/styles/_reset.scss');
        this.copy('styles/_scaffolding.scss', 'app/styles/_scaffolding.scss');
        this.copy('styles/_typography.scss', 'app/styles/_typography.scss');
        this.copy('styles/_preheader.scss', 'app/styles/_preheader.scss');
        this.copy('styles/_header.scss', 'app/styles/_header.scss');
        this.copy('styles/_footer.scss', 'app/styles/_footer.scss');

        this.copy('styles/_' + this.layout + 'Column.scss', 'app/styles/_body.scss');
    }
});

module.exports = RwdmailGenerator;
