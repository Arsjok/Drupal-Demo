var gulp = require('gulp'),
    watch = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass')(require('node-sass'));

var config = {
  scss: './themes/custom/scss/*.scss',
  watch: './themes/custom/scss/**',
  css: './themes/custom/css',
  node_modules: './node_modules',
};

function css() {
  return gulp
    .src(config.scss)
    .pipe(plumber())
    .pipe(sass({
      sourceComments: 'map',    // Add comments to the compiles css file
      sourceMap: 'sass',        // The comments will be mapped to the source scss file
      outputStyle: "expanded"   // Makes the css more human-readable. Setting to "nested" would make the file a bit smaller.
    }))
    .pipe(gulp.dest(config.css));  // Output the css files in the css directory
}

// Watch files
function watchFiles() {
  // Monitor the scss directory for changes in the scss files.
  //  If there was a change, compile it into css
  gulp.watch(config.watch, css);
}

// Export the functions so we can call them from the command line
exports.watch = watchFiles;
exports.css = css;

// By setting the default, we can simply run 'lando gulp' to start watching for changes.
exports.default = watchFiles;
