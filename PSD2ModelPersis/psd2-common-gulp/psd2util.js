'use strict';
var del = require('../node_modules/del');
var fs = require('../node_modules/fs');
var util = require('../node_modules/gulp-util');
var exit = require('../node_modules/gulp-exit');
var glob = require('../node_modules/glob');
//var plato = require('plato');
var connect = require('../node_modules/gulp-connect-multi');


module.exports.all = function(buildDir, done) {
  function clean(path, done) {
    del(path, null, done);
  }

  var files = [].concat(process.cwd() + buildDir);
  clean(files, done);
};

module.exports.file = function(_file) {
	fs.exists(_file, function(exists) {
	  if (exists) {
	    fs.unlinkSync(_file);
	  }
	});
};



module.exports = function(gulp, buildDir, _package) {
  if(!_package.hasOwnProperty('files')){
    console.error(
      util.colors.red(
        'ERROR: Missing package.json files, ' +
        'Unable to distribute files.'
      )
    );
  } else {
    gulp.src(_package.files, {base:'.'})
    .pipe(gulp.dest(process.cwd() + buildDir));
  }
};

module.exports.jscs = function(gulp, _files, $) {
    return gulp
    .src(_files)
    .pipe($.jscs(
      {
        configPath: __dirname+'/.jscsrc',
        esnext: true,
        fix: true
      }
    ));
};


module.exports.jshint = function(gulp, _files, args, $) {
    return gulp
    .src(_files)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jshint(__dirname+'/.jshintrc'))
    .pipe($.ignore.exclude( __dirname+'/.jshintignore' ))
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
};


module.exports.logger = function(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnPropertyItem) {
        util.log(util.colors.blue(msg[item]));
      } else {
      	util.log(util.colors.blue(item));
      }
    }
  } else {
    util.log(util.colors.blue(msg));
  }
};


module.exports.mocha = function(gulp, _files, $) {
  return gulp.src(_files)
    // Covering files
    .pipe($.istanbul({
      includeUntested: true
    }))
    // Force `require` to return covered files
    .pipe($.istanbul.hookRequire())
    .on('finish', function() {
      // Specify server specs
      gulp.src(['test/*.js', 'test/**/*.js'], {
          read: false
        })
        .pipe($.plumber())
        .pipe($.mocha({
          reporter: 'spec',
          timeout: 20000
        }))
        // Write reports to Istanbul
        .pipe($.istanbul.writeReports())
        .pipe(exit());
    });
};


module.exports.report = function(gulp, _files, logger, done) {
  plato.inspect(
    glob.sync('*.js', _files),
    process.cwd() + '/report/plato',
    {
      title: 'Plato Inspections Report',
      exclude: /.*\.spec\.js/
    },
    function (report) {
      plato.getOverviewReport(report);
      logger('View Report using \'gulp report\'');
      if (done) {
        done();
      }
    }
  );
};

module.exports.openReport = function(browser, rootdir, openfile, openport, lrport){
  return connect().server({
    root: [rootdir],
    port: openport,
    livereload:{
      port:lrport
    },
    open: {
      browser: browser,
      file:openfile
    }
  });
};


module.exports.generateReport = function(gulp, alljs, $) {
  // Track src files that should be covered
  return gulp.src(alljs)
    // Covering files
    .pipe($.istanbul({
      includeUntested: true
    }))
    // Force `require` to return covered files
    .pipe($.istanbul.hookRequire())
    .on('finish', function() {
      // Specify server specs
      gulp.src(['test/**/*.js'], {
        read: false
      })
      .pipe($.plumber())
      .pipe($.mocha({
        reporter: 'spec',
        timeout: 20000
      }))
        // Write reports to Istanbul
      .pipe($.istanbul.writeReports());
    });
};


module.exports.list = function(title, tasks) {
    util.log('');
    util.log(util.colors.gray(title));
    util.log('------------------------------');
    Object.keys(tasks).forEach(function(name) {
      if (name.indexOf('pre-')) {
        util.log(util.colors.cyan('    ' + name));
      }
    });
};