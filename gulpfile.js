// 依赖部分
var gulp = require("gulp"),
    // 加载别的插件用的，一个个require太麻烦
    plugins = require("gulp-load-plugins")();

// 以下部分开始配置任务

// html部分
gulp.task("html",function () {
    gulp.src("html/*.html")
    // 压缩
    .pipe(plugins.minifyHtml())
    .pipe(gulp.dest("dist/html"))
    // 刷新
    .pipe(plugins.connect.reload())
})

// css部分
gulp.task("css",function () {
    gulp.src("css/*.css")
    // 压缩
    .pipe(plugins.minifyCss())
    // 重命名
    .pipe(plugins.rename({suffix:".min"}))
    .pipe(gulp.dest("dist/css"))
    // 合并，合并的代码会自动压缩
    .pipe(plugins.concat("all.min.css"))
    .pipe(gulp.dest("dist/all"))
    // 刷新
    .pipe(plugins.connect.reload())
})

// js部分
gulp.task("js",function () {
    gulp.src("js/*.js")
    // 压缩
    .pipe(plugins.uglify())
    // 重命名
    .pipe(plugins.rename({suffix:".min"}))
    .pipe(gulp.dest("dist/js"))
    // 合并
    .pipe(plugins.concat("all.min.js"))
    .pipe(gulp.dest("dist/all"))
    // 刷新
    .pipe(plugins.connect.reload())
})

// jq部分
gulp.task("jq",function () {
    gulp.src("js/lib/jquery-3.2.1.min.js")
    .pipe(gulp.dest("dist/js/lib"))
})
// img
gulp.task("img",function () {
    gulp.src("img/*.{png,jpg,jpeg,gif,ico,svg}")
    .pipe(plugins.imagemin([
        plugins.imagemin.gifsicle({interlaced: true}),
        plugins.imagemin.jpegtran({progressive: true}),
        plugins.imagemin.optipng({optimizationLevel: 5}),
        plugins.imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest("dist/img"))
})

// conncet
gulp.task("connect",function () {
    plugins.connect.server({
        root:"dist",
        livereload:true,
        port:3000
    })
})

// 监测
gulp.task("watch",function () {
    gulp.watch("html/*.html",["html"]);
    gulp.watch("css/*.css",["css"]);
    gulp.watch("js/*.js",["js"]);
})

// default
gulp.task("default",["html","css","js","img","connect","watch","jq"])