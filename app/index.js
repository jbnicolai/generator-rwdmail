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

        // this.prompt(prompts, function (props) {
        //   //this.someOption = props.someOption;

        //   done();
        // }.bind(this));
        done();
    },

    app: function () {
        this.mkdir('app');

        this.template('_Gruntfile.js', 'Gruntfile.js');
        this.copy('_package.json', 'package.json');
        this.copy('_gitignore', '.gitignore');
    },

    htmlTemplate: function () {
        this.copy('_index.html', 'app/index.html');
    },

    styles: function () {
        this.mkdir('app/styles');

        this.copy('styles/_base.scss', 'app/styles/_base.scss');
        this.copy('styles/_main.scss', 'app/styles/_main.scss');
        this.copy('styles/_media-queries.scss', 'app/styles/_media-queries.scss');
        this.copy('styles/_variables.scss', 'app/styles/_variables.scss');
        this.copy('styles/style.scss', 'app/styles/style.scss');
    }
});

module.exports = RwdmailGenerator;
