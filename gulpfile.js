var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	rename = require('gulp-rename'),
	pug = require('gulp-pug'),
	coffee = require('gulp-coffee'),
	stylus = require('gulp-stylus'),
	uglify = require('gulp-uglify'),
	csso = require('gulp-csso'),
	autoprefixer = require('gulp-autoprefixer'),
	htmlhint = require('gulp-htmlhint'),
	browserSync = require('browser-sync').create();

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "./docs"
		},
		notify: false
	});
});

gulp.task('html', function() {
	return gulp.src(['./src/pug/*.pug'])
		.pipe(plumber())
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(htmlhint('./.htmlhintrc'))
		.pipe(htmlhint.reporter())
		.pipe(gulp.dest('./docs/'))
});

gulp.task('html-refresh', ['html'], function () {
	browserSync.reload();
});

gulp.task('js', function() {
	return gulp.src('./src/coffee/*.coffee')
		.pipe(plumber())
		.pipe(coffee({ bare: true }))
		.pipe(gulp.dest('./dist/'))
		.pipe(uglify({
			preserveComments: 'license',
			mangle: true
		}))
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream({ match: '**/*.js' }));
});

gulp.task('css', function() {
	return gulp.src(['./src/stylus/*.styl'])
		.pipe(plumber())
		.pipe(stylus({'include css': true}))
		.pipe(autoprefixer({ browsers: ['last 2 versions', 'ios >= 7','firefox >=4','safari >=7','IE >=8','android >=2'] }))
		.pipe(gulp.dest('./dist/'))
		.pipe(csso())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('watch', function () {
	watch(['./src/coffee/*.coffee'], function() {
		gulp.start('js');
	});
	watch(['./src/stylus/*.styl'], function() {
		gulp.start('css');
	});
	watch(['./src/pug/*.pug'], function() {
		gulp.start('html-refresh');
	});
});

gulp.task('main', function() {
	gulp.start('html');
	gulp.start('js');
	gulp.start('css');
});

gulp.task('default', ['main', 'watch', 'serve']);
