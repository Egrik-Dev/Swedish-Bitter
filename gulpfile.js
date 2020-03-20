"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var ghPages = require('gulp-gh-pages-will');
var del = require("del");

gulp.task("css", function () {
  // Получаем файл с которым будем работать и запускаем цепочку действий
  return gulp.src("source/sass/style.scss")
    // Данный плагин предотвращает остановку вызовов "пайпов" при возникновении ошибки
    .pipe(plumber())
    // Необходим для отображении в dev-tools браузера иерархии scss файлов
    .pipe(sourcemap.init())
    // Данный плагин преобразовывает scss файлы в css
    .pipe(sass())
    // PostCSS необходим для работы других плагинов связанных с работой с CSS
    .pipe(postcss([
      // Добавляет кроссбраузерные префиксы к CSS свойствам
      autoprefixer()
    ]))
    // Минифицируем наш css
    .pipe(csso())
    // Переименовываем css
    .pipe(rename("style.min.css"))
    // Указываем в какую директорию записать сурсмэп файлы
    .pipe(sourcemap.write("."))
    // Отдаём конечный результат после преобразований
    .pipe(gulp.dest("build/css"))
    // Перезапускает вкладку браузера
    .pipe(server.stream());
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
  .pipe(gulp.dest("build"));
})

gulp.task("js", function() {
  return gulp.src("source/js/*.js")
  .pipe(gulp.dest("build/js"));
})

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
  });

gulp.task("server", function () {
  // Команда server.init запускает сервер
  server.init({
    // Указываем корень нашего сайта
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  // Вотчеры следят за изменениями во всех scss и html файлах, и при их изменениях запускают команды
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "html", "refresh"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**",
      "source/*.ico"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "html"));

// var options = {
//   remoteUrl: "https://github.com/Egrik-Dev/Swedish-Bitter",
//   branch: "build"
// };

gulp.task('deploy', function() {
  return gulp.src('build/**/*.*')
    .pipe(ghPages());
});

gulp.task("start", gulp.series("build", "server"));
