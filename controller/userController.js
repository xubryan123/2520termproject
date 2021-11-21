const userModel = require("../database").userModel;
const userInfo = require("../database").userInfo
const database = require("../database").Database

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
      database[profile.id] = {reminders: []}
      userInfo[profile.id] = {
        name: `${profile.id}`, 
        picture: "https://images.unsplash.com/photo-1635005454347-87805c9ecf1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzQxODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc0NDA4OTM&ixlib=rb-1.2.1&q=80&w=200",
        role: "user"
      }

      return profile.id
    }
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById, isUserValid, getUserByGithubIdOrCreate
};
