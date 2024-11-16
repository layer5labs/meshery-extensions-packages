const {
  AnimatedMesheryDark,
} = require("./components/LoadingComponents/Animations/AnimatedMesheryCSS");
const {
  default: AnimatedMeshery,
} = require("./components/LoadingComponents/Animations/AnimatedMesheryCSS");

module.exports = {
  components: {
    navigator: false, // set false to disable the navigator component ( default: true )
  },
  AnimatedLogo: AnimatedMeshery,
  AnimatedLogoDark: AnimatedMesheryDark,
};
