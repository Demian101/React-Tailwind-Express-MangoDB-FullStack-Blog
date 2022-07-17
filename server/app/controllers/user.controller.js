exports.allAccess = (req, res) => {
  res.status(200).send("all Acess . Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("userBoard , User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("adminBoard, Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("moderatorBoard, Moderator Content.");
};
