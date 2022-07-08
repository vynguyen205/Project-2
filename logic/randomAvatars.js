const avatars = require('../json/avatars.json');

function randomAvatar() {
  return avatars[Math.floor(Math.random() * avatars.length)];
}

module.exports = randomAvatar;
