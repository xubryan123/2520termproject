<<<<<<< HEAD
let Database = {
  cindy: {
    reminders: [
      { id: 1, title: "abc", description: "abcabc", completed: false },
      { id: 2, title: "abcd", description: "abcabcd", completed: false },
    ],
  },
  alex: {
    reminders: [],
  },
};

let userInfo = {
  Cindy: {
    id: 1,
    name: "Cindy",
    email: "cindy@gmail.com",
    password: "cindy1",
    role: "admin"
  },
  // 78901382: "Github"
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
  }
};

module.exports = { Database, userModel, userInfo };
=======
let Database = {
  Cindy: {
    reminders: [
      { id: 1, title: "Cindy Reminder", description: "abcabc", completed: false },
      { id: 2, title: "Cindy 2nd Reminder", description: "abcabcd", completed: false },
    ],
  },
  Alex: {
    reminders: [
      { id: 1, title: "Alex Reminder", description: "abcabc", completed: false },
    ],
  },
};

let userInfo = {
  Cindy: {
    id: 1,
    name: "Cindy",
    email: "cindy@gmail.com",
    password: "cindy1",
    picture: "https://images.unsplash.com/photo-1635005454347-87805c9ecf1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzQxODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc0NDA4OTM&ixlib=rb-1.2.1&q=80&w=200",
    role: "admin",
  },
  Alex: {
    id: 2,
    name: "Alex",
    email: "alex@gmail.com",
    password: "alex1",
    picture: "https://images.unsplash.com/photo-1635434033429-827adfad864b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzQxODB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc0NDA5MDU&ixlib=rb-1.2.1&q=80&w=200",
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
    throw new Error(`Couldn't find user with email: ${email}`);
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
>>>>>>> be9dec0cfafeb1c19bce45c49232304cda665e81
