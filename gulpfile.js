var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	mincss = require('gulp-minify-css'),
	minhtml = require('gulp-minify-html'),
	replaceHtml = require('gulp-html-replace'),
	concat = require('gulp-concat'),
	getFiles = require('gulp-dom-src'),
	clean = require('gulp-clean'),
	runSequence = require('run-sequence');

gulp.task('everything', function(cb)
{
	runSequence('clean-public',	['copy-images', 'concat-minify-js', 'concat-minify-css'], 'use-min-and-minify-html', cb);
});

gulp.task('copy-images', function()
{
	return gulp.src('./public-dev/img/**').pipe(gulp.dest('./public/img'));
});

gulp.task('concat-minify-js', function()
{
	return getFiles({file: './public-dev/index.html', selector: 'script', attribute: 'src'})
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('concat-minify-css', function()
{
	return getFiles({file: './public-dev/index.html', selector: 'link[rel="stylesheet"]', attribute: 'href'})
		.pipe(concat('styles.min.css'))
		.pipe(mincss())
		.pipe(gulp.dest('./public/css'));
});

gulp.task('use-min-and-minify-html', function()
{
	return gulp.src('./public-dev/index.html')
		.pipe(replaceHtml({js: 'js/scripts.min.js', css: 'css/styles.min.css'}))
		.pipe(minhtml({spare: true, empty: true}))
		.pipe(gulp.dest('./public'));
});

gulp.task('clean-public', function()
{
	return gulp.src('./public', {read: false}).pipe(clean());
});

gulp.task('default', ['everything']);