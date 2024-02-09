const User = require("../models/Users");
 exports.addUser = async (req, res, next) => {
  try {
    // if (!req.body.phone) {
    //   throw new Error("Phone NUmber Mandatory");
    // }

    let name = req.body.username;
    // console.log(req.body.username);
    let email = req.body.email;
    let phonenumber = req.body.phone;
    console.log(name,email,phonenumber);
    let data = await User.create({ name: name, email: email, phonenumber: phonenumber });

     res.status(201).json({newUserList: data });
    // res.json(data);
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    })
    console.log(err)
  }
};

exports.getUsers = async (req, res, next) => {
    try {
      const users = await User.findAll();
  
       res.status(200).json({ allUsers: users });
    } catch (err) {
      res.status(500).json({ error: err.message }); // Use err.message for better error reporting
    }
  };

exports.deleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ err: "ID is missing" });
    }

    const uId = req.params.id;
    await User.destroy({
      where: { id: uId },
    });
    res.status(200);
  } catch (err) {
    console.log(err);
  }
};
