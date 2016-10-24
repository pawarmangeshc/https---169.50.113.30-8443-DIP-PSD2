'use strict';

var args = require('yargs').argv;
var runSequence = require('../node_modules/run-sequence');
var $ = require('../node_modules/gulp-load-plugins')({
  lazy: true
});

var psd2util = require('./psd2util');

var opts = require(process.cwd() + '/gulp-config.json');
if (!opts.hasOwnProperty('browserName') ||
  (opts.browserName !== 'chrome' &&
    opts.browserName !== 'firefox')) {
  opts.browserName = '';
}



function testTask(done) {
  runSequence(
    'vet',
    'plato',
    'mocha'
  );
  done();
}

function defaultTask(done) {
  runSequence(
    
    //'vet',
    //'git-init'
	'mocha'
  );
  done();
}

function openReportTask(done) {
  runSequence(
    'vet',
    'generate-report',
    'plato',
    'plato-report',
    'coverage-report'
  );
  done();
}

function platoReportTask(done) {
  psd2util.openReport(
    opts.browserName,
    'report/plato/',
    'index.html', 1025, 35730
  )();
  done();
}

function coverageReportTask(done) {
  psd2util.openReport(
    opts.browserName,
    'coverage/lcov-report/',
    'index.html', 1024, 35729
  )();
  done();
}

function distTask(done) {
  runSequence(
    'clean-all',
    'distjs'
  );
  done();
}

function cleanAllTask(done) {
  psd2util.clean.all('/dist', done);
}

function vetTask(done) {
  psd2util.logger('Analyzing source with JSHint and JSCS');
  runSequence(
    'jscs',
    'jshint'
  );

  psd2util.logger('Completed Analyzing source with JSHint and JSCS');
  done();
}

function gitInitTask(done) {
  //init('/.git/hooks/');
  done();
}

function prePushTask() {
  //githooks.prepush($);
}

module.exports = function (gulp) {

  gulp.task('default', defaultTask);
 // gulp.task('test', testTask);
  //gulp.task('open-report', openReportTask);
  /*gulp.task('generate-report', function (done) {
    psd2util.generateReport(gulp, opts.alljs, $);
  });
  gulp.task('plato', function (done) {
    psd2util.report(gulp, opts.plato.js, psd2util.logger, done);
  });
  gulp.task('plato-report', platoReportTask);
  gulp.task('coverage-report', coverageReportTask);
  gulp.task('dist', distTask);
  gulp.task('distjs', function (done) {
    dist(gulp, '/dist', _package);
    done();
  });*/
  gulp.task('clean-all', cleanAllTask);
  gulp.task('mocha', function (done) {
    psd2util.mocha(gulp, opts.alljs, $);
    done();
  });
  /*gulp.task('vet', vetTask);
  gulp.task('jshint', function (done) {
    psd2util.logger('Starting JSHint...');
    psd2util.jshint(gulp, opts.alljs, args, $);
    psd2util.logger('...Completed JSHint');
    done();
  });
  gulp.task('jscs', function (done) {
    psd2util.logger('Starting JSCS...');
    psd2util.jscs(gulp, opts.alljs, $);
    psd2util.logger('...Completed JSCS');
    done();
  });
  gulp.task('help', function (done) {
    psd2util.list('Main Tasks', gulp.tasks);
    done();
  });
  gulp.task('git-init', gitInitTask);
  gulp.task('pre-commit', ['vet']);
  gulp.task('pre-push', prePushTask);
*/
  var gulpTasks = {
    testTask: testTask,
    defaultTask: defaultTask,
    openReportTask: openReportTask,
    platoReportTask: platoReportTask,
    coverageReportTask: coverageReportTask,
    distTask: distTask,
    cleanAllTask: cleanAllTask,
    vetTask: vetTask,
    gitInitTask: gitInitTask,
    prePushTask: prePushTask
  };
  return gulpTasks;
};
