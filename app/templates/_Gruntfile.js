module.exports = function (grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project path configuration
    // ================================================
    paths: {
      // Sources
      app: 'app',
      // Build
      dist: 'dist'
    },

    // Watch for changes and live reload
    // ================================================
    watch: {
      compass: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: ['<%%= paths.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:serve']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= paths.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%%= paths.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },

    // Run a local server
    // ================================================
    connect: {
      options: {
        open: true,
        hostname: 'localhost',
        port: 9000,
        livereload: 35729
      },
      serve: {
        options: {
          base: [
            '<%%= paths.app %>',
            '.tmp'
          ]
        }
      }
    },

    // Remove generated files
    // ================================================
    clean: {
      serve: ['.tmp', '<%%= paths.dist %>']
    },

    // Optimize the images for production
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%%= paths.app %>/images',
            src: '{,*/}*.{png,jpg,jpeg,gif}',
            dest: '<%%= paths.dist %>/images'
          }
        ]
      }
    },

    // Compile sass style sheets
    // ================================================
    compass: {
      options: {
        sassDir: '<%%= paths.app %>/styles',
      },
      serve: {
        options: {
          cssDir: '.tmp/css'
        }
      },
      dist: {
        options: {
          environment: 'production',
          cssDir: '<%%= paths.dist %>/css',
          debugInfo: false,
          outputStyle: 'compact'
        }
      }
    },

    // Add vendor prefixed styles
    // ================================================
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%%= paths.dist %>/css',
            src: '{,*/}*.css',
            dest: '<%%= paths.dist %>/css'
          }
        ]
      }
    },

    // Copy the main template
    // ================================================
    copy: {
      template: {
        expand: true,
        cwd: '<%%= paths.app %>',
        src: '**/*.html',
        dest: '<%%= paths.dist %>'
      },

    },

    // Inline the CSS properties for Mailchimp
    // ================================================
    inlinecss: {
      build: {
        expand: true,
        cwd: '<%%= paths.dist %>',
        src: '**/*.html',
        dest: '<%%= paths.dist %>'
      }
    },

    // Copy the external CSS files inline for Mandrill
    // ================================================
    inline: {
      build: {
        expand: true,
        cwd: '<%%= paths.dist %>',
        src: '**/*.html',
        dest: '<%%= paths.dist %>'
      }
    },

    // Create a zip file of assets
    // ================================================
    compress: {
      main: {
        options: {
          archive: '<%%= paths.dist %>/assets.zip',
          mode: 'zip'
        },
        expand: true,
        cwd: '<%%= paths.dist %>/',
        src: ['**/*']
      }
    }
  });

  grunt.registerTask('default', 'serve');

  grunt.registerTask('serve', [
    'clean',
    'compass:serve',
    'connect:serve',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'imagemin',
    'compass:dist',
    'autoprefixer',
    'copy'
  ]);

  grunt.registerTask('cm', [
    'build',
    'compress'
  ]);

  grunt.registerTask('mc', [
    'build',
    'inlinecss',
    'compress'
  ]);

  grunt.registerTask('mandrill', [
    'build',
    'inline'
  ]);
};
