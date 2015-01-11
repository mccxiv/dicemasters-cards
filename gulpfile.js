var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	mincss = require('gulp-minify-css'),
	minhtml = require('gulp-minify-html'),
	usemin = require('gulp-usemin'),
	concat = require('gulp-concat'),
	getHtmlSrc = require('gulp-html-src');

gulp.task('concat-minify-js', function()
{
	gulp.src('./dev-public/index.html')
		.pipe(getHtmlSrc({presets: 'script'}))
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('concat-minify-css', function()
{
	gulp.src('./dev-public/index.html')
		.pipe(getHtmlSrc({presets: 'css'}))
		.pipe(concat('styles.min.css'))
		.pipe(mincss())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('use-min-and-minify-html', function()
{
	gulp.src('./dev-public/index.html')
		.pipe(usemin())
		//.pipe(minhtml({spare: true, empty: true}))
		.pipe(gulp.dest('./public'));
});

gulp.task('default', ['concat-minify-js', 'concat-minify-css', 'use-min-and-minify-html']);