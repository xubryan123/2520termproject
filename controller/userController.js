const userModel = require("../database").userModel;
const userInfo = require("../database").userInfo

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const isUserValid = (user, password) => {
  return user.password === password;
}

const getUserByGithubIdOrCreate = (profile) => {
  info_list = Object.values(userInfo);
  for (let user of info_list){
    if (profile.id === user) {
      return user
    }
    else {
      userInfo[profile.id] = "Github"
      return profile.id
    }
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById, isUserValid, getUserByGithubIdOrCreate
};
