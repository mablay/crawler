module.exports = function(grunt) {
  grunt.initConfig({
    ts: {
      default : {
        src: ["**/*.ts", "!node_modules/**/*.ts"],
        options: {
          module: 'commonjs'
        },
        watch: '.'
      }
    },
    execute: {
      target: {
        src: ['main.js']
      }
    }
  });
  grunt.loadNpmTasks("grunt-execute");
  grunt.loadNpmTasks("grunt-ts");
  grunt.registerTask("default", ["execute"]);
};
