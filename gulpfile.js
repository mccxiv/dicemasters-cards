var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	mincss = require('gulp-minify-css'),
	minhtml = require('gulp-minify-html'),
	usemin = require('gulp-usemin'),
	concat = require('gulp-concat'),
	getHtmlSrc = require('gulp-html-src'),
	del = require('del');

gulp.task('copy-images', function()
{
	gulp.src('./public-dev/img/**').pipe(gulp.dest('./public/img'));
});

gulp.task('concat-minify-js', function()
{
	gulp.src('./public-dev/index.html')
		.pipe(getHtmlSrc({presets: 'script'}))
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('concat-minify-css', function()
{
	gulp.src('./public-dev/index.html')
		.pipe(getHtmlSrc({presets: 'css'}))
		.pipe(concat('styles.min.css'))
		.pipe(mincss())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('use-min-and-minify-html', function()
{
	gulp.src('./public-dev/index.html')
		.pipe(usemin())
		//.pipe(minhtml({spare: true, empty: true})) throws exception. I don't know why
		.pipe(gulp.dest('./public'));
});

gulp.task('clean-public', function(cb)
{
	del.sync(['./public/**'], cb);
});

gulp.task('default', ['clean-public', 'copy-images', 'concat-minify-js', 'concat-minify-css', 'use-min-and-minify-html']);