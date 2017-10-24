/**
 * @ postcss config with autoprefixer
 */

const autoPreFixer = require("autoprefixer");

module.exports = {
    plugins: [
        autoPreFixer({
            browsers: [
                ">1%",
                "last 4 versions",
                "Firefox ESR",
                "not ie < 9" // React doesn"t support IE8 anyway
            ]
        })
    ]
};

