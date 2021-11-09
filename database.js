let Database = {
  Cindy: {
    reminders: [
      { id: 1, title: "abc", description: "abcabc", completed: false },
      { id: 2, title: "abcd", description: "abcabcd", completed: false },
    ],
  },
  Alex: {
    reminders: [],
  },
};

let userInfo = {
  Cindy: {
    id: 1,
    name: "Cindy",
    email: "cindy@gmail.com",
    password: "cindy1",
    role: "admin",
  },
  Alex: {
    id: 2,
    name: "Alex",
    email: "alex@gmail.com",
    password: "alex1",
    role: "user",
  },
};

const userModel = {
  findOne: (email) => {
    info_list = Object.values(userInfo);
    for (let user of info_list) {
      if (user.email === `${email}`) {
        return user;
      }
    }
    throw new Error(`Couldn't find user with id: ${email}`);
  },
  findById: (id) => {
    info_list = Object.values(userInfo);
    for (let user of info_list) {
      if (user.id === id) {
        return user;
      }
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { Database, userModel, userInfo };
