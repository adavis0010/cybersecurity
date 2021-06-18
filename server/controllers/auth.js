const users = []
const bcrypt = require('bcryptjs');

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body;

      // const salt = bcrypt.genSaltSync(5);
      // const passHash = bcrypt.hashSync(password, salt);

      
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
        const authenticated = bcrypt.compareSync(password, users[i].passHash)
        if (authenticated) {
          let userToReturn = {...users[i]}
          delete userToReturn.passHash;
          return res.status(200).send(userToReturn);
        }
      }
    }
    return res.status(400).send("User not found.")
    },
    register: (req, res) => {

      const {username, email,firstName,lastName,password} = req.body;

      for (let i = 0; i < users.length; i++){
        const existing = bcrypt.compareSync(password, users[i].passHash);

        if (existing) {
            return
            //Come back to?
        }
      };

        const salt = bcrypt.genSaltSync(5);
        const passHash = bcrypt.hashSync(password, salt);

        let userObj = {
          passHash,
          username,
          email,
          firstName,
          lastName
        }

        console.log('Registering User')
        users.push(userObj)
        console.log(req.body)
        let infoToReturn = {...userObj}
        delete infoToReturn.passHash;
        res.status(200).send(userObj)


    }
}

// Then build out the login function to receive a username and password. First, make sure the username exists in the database, if it does, compare the passoword being passed in to the hashed password in the database with the appropriate bcrypt method. If the password is correct, send a copy of the user object back to the front-end. However, make sure you delete the hashed password off of the object copy you send.