const { AnimatedLogoDark, AnimatedLogo } = require("./AnimatedLogo");

module.exports = {
  components: {
    navigator: false, // set false to disable the navigator component ( default: true )
  },
  AnimatedLogo: AnimatedLogo,
  AnimatedLogoDark: AnimatedLogoDark,
};
