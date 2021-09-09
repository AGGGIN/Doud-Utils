const { src, watch, dest, parallel } = require("gulp");
const ts = require("gulp-typescript");
const stylus = require("gulp-stylus");

const sourcemaps = require("gulp-sourcemaps");

function style() {
  return src("src/styles/*.css")
    .pipe(
      stylus({
        compress: true,
      })
    )
    .pipe(dest("dist/styles"));
}

function script() {
  return src("src/scripts/*.ts", { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(
      ts({
        noImplicitAny: true,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest("dist/scripts"));
}

watch("src/scripts/*.ts", script);
watch("src/styles/*.css", style);

exports.script = script;
exports.style = style;
exports.default = parallel(style, script);
