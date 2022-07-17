Node.js MongoDB – User Authentication - JWT & Mongoose



```
node server.js
```





**User Registration, User Login and Authorization process.**

![](http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-17-jwt-token-authentication-node-js-example-flow.png)

## API 使用

### POST `api/auth/signup`  注册

```
{
  "username": "..",
  "email": "..",
  "password": "..",
  "roles": ["user", "moderator", "admin"]
}

Body - raw , 最右侧选择 JSON 模式


服务器返回: 
{
    "message": "User was registered successfully!"
}
```





### POST `api/auth/signin`  登录

```
Body - raw , 最右侧选择 JSON 模式 : 
{
  "username": "modera",
  "password": "123456"
}

服务器返回: 
{
    "id": "62d3c5f74aaa0c3f6a38a73a",
    "username": "modera",
    "email": "mode@ala.com",
    "roles": [
        "ROLE_USER",
        "ROLE_MODERATOR"
    ],
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDNjNWY3NGFhYTBjM2Y2YTM4YTczYSIsImlhdCI6MTY1ODA0NjEzMiwiZXhwIjoxNjU4MTMyNTMyfQ.xI21iAPlsNx1YeYLqQ6u_Zmhy0qLw420AzzhHL6bBLg"
}
```

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-17-082239.png" style="zoom:50%;" />



### GET `/api/test/user`

看下路由怎么写的 : 

- `api/test/all`  无需任何权限, 谁都能查看
- `api/test/user`  : 需要提供 Token ( verifyToken ) , 如果不传 Token 则提示 `"No token provided!"` 
- `api/test/mod` : 需要提供 Token , 且会检验你有没有 Moderate 权限 
- `api/test/admin` :  需要 Role 为 Admin ,  否则提示 : `"message": "Require Admin Role!"` 

```js
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  // 以数组的方式, 使用多个局部中间件
  // controller.userBoard 是回调函数, 路由被触发时的回调函数
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // [authJwt.verifyToken, authJwt.isModerator] 以数组的方式, 使用多个局部中间件
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
```



看下回调函数 : 

```js
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
```



接口调用如下 : 

<img src="http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-07-17-084018.png" style="zoom:50%;" />







## MongoDB ( models )

1. **Configure MongoDB database**

`config/db.config.js`

```js
module.exports = {
  HOST: "localhost",
  PORT: 27017,
  DB: "bezkoder_db"
};
```



2. **Define the Mongoose Model**

用户 User 对象将有一个角色 Role 数组，其中包含角色 Role 集合中的 id 作为 Ref .

这种范式叫做 : ***Reference Data Models* or *Normalization*.** 

[MongoDB One-to-Many Relationship tutorial with Mongoose examples](https://bezkoder.com/mongoose-one-to-many-relationship/)



`.models/role.model.js`

> 角色类型:   moderator 调度员 ,  admin 管理员 , 普通用户 user
>
> 这些 Role 类型会在 nodemon server.js 启动时 , 由 ` function initial()  `自动创建 

```js
const mongoose = require("mongoose");
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);
module.exports = Role;
```



`.models/user.model.js`

```js
const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);
module.exports = User;
```



初始化 Mongoose 后，我们不需要编写 CRUD 函数，因为 Mongoose 都支持：

- 创建一个新用户：object.save()
- 通过 id 查找用户：User.findById(id)
- 通过电子邮件查找用户：User.findOne({ email: ... })
- 通过用户名查找用户：User.findOne({ username: ... })
- 查找给定角色数组中名称的所有角色： Role.find({ name: { $in: roles } })



### Initialize Mongoose

`app/models/index.js` 

```js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
```



`initial()`  function helps us to create 3 important rows in `roles` collection.







## Middleware functions ( 分支验证, 鉴权)



`middlewares/index.js` 

```js
const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
module.exports = {
  authJwt,
  verifySignUp
};
```



### Signup 注册

要验证注册操作，我们需要 2 个函数：

- 检查用户名和电子邮件的重复

- 检查请求中的角色是否合法



1. `User.findOne`  查看 user 是否存在 : 
   1. check 数据格式问题 ; 
   2. 数据格式没问题, 如果 User 存在 : return `400 Error - Username is already in use` 
   3. 如果不存在 , 查看 Email 是否存在 : 
      1. 如果存在 : return  `400 Error - Email is already in use` 
      2. 如果不存在 : 说明 User 和 Email 都不在数据库里 , next 转交下一个执行



`middlewares/verifySignUp.js` 

```js
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    // roles 是一个数组
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  next();
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};
module.exports = verifySignUp;
```



### 处理身份验证和授权

为了处理身份验证和授权，我们创建了以下函数：

- 检查是否提供了 Token，Token 合法与否。从 HTTP headers 的 x-access-token 中获取 token，然后使用 jsonwebtoken 的 verify() 函数验证合法性

- 检查用户的 `roles` 是否包含所需的`role`



`middlewares/authJwt.js` 

```js
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;
```



## Controllers ( 和 Mangodb 交互)

身份验证有两个主要功能：

- 注册：在数据库中创建新用户（如果未指定角色，则角色为用户）

- 登入：
  - 在数据库中查找请求的用户名（如果存在）
  - 使用 bcrypt 将密码与数据库中的密码进行比较，如果正确
  - 使用 jsonwebtoken 生成令牌
  - 返回用户信息&访问Token



### 注册 & 登录功能 



`controllers/auth.controller.js` 



signup 部分 : 

```js
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};
```



### 登录

目前 Web App 没有开放注册功能 , 所以只有一个管理员账号可以使用 ; 

```js
{
    "username": "soda",
    "email": "Sodaoo@qq.com",
    "password": "so....",
    "roles": [
        "user",
        "moderator",
        "admin"
    ]
}
```





## Configure 



### Db Configuration

```js
module.exports = {
  HOST: "localhost",
  PORT: 27017,
  DB: "auth_user_db"
};
```



### Auth Key

**jsonwebtoken** functions such as `verify()` or `sign()` use algorithm that needs a secret key (as String) to encode and decode token.

jsonwebtoken 函数，例如 verify() 或 sign() 使用需要密钥（作为字符串）来编码和解码令牌的算法



`app/config/auth.config.js`

```js
module.exports = {
  secret: "bezkoder-secret-key ^_^"
};
```



## 









----

**More Practice:**

> [Node.js, Express & MongoDb: Build a CRUD Rest Api example](https://www.bezkoder.com/node-express-mongodb-crud-rest-api/)

> [Server side Pagination in Node.js with MongoDB and Mongoose](https://www.bezkoder.com/node-js-mongodb-pagination/)

> [Node.js Express File Upload Rest API example](https://www.bezkoder.com/node-js-express-file-upload/)

Associations:
> [MongoDB One-to-One relationship tutorial with Mongoose examples](https://www.bezkoder.com/mongoose-one-to-one-relationship-example/)

> [MongoDB One-to-Many Relationship tutorial with Mongoose examples](https://www.bezkoder.com/mongoose-one-to-many-relationship/)

> [MongoDB Many-to-Many Relationship with Mongoose examples](https://www.bezkoder.com/mongodb-many-to-many-mongoose/)

Fullstack:
> [Vue.js + Node.js + Express + MongoDB example](https://www.bezkoder.com/vue-node-express-mongodb-mevn-crud/)

> [Angular 8 + Node.js + Express + MongoDB example](https://www.bezkoder.com/angular-mongodb-node-express/)

> [Angular 10 + Node.js + Express + MongoDB example](https://www.bezkoder.com/angular-10-mongodb-node-express/)

> [Angular 11 + Node.js + Express + MongoDB example](https://www.bezkoder.com/angular-11-mongodb-node-js-express/)

> [Angular 12 + Node.js + Express + MongoDB example](https://www.bezkoder.com/angular-12-mongodb-node-js-express/)

> [Angular 13 + Node.js + Express + MongoDB example](https://www.bezkoder.com/mean-stack-crud-example-angular-13/)

> [React + Node.js + Express + MongoDB example](https://www.bezkoder.com/react-node-express-mongodb-mern-stack/)

Integration on same Server/Port:
> [Integrate Angular 8 with Node.js Express](https://www.bezkoder.com/integrate-angular-8-node-js/)

> [Integrate Angular 10 with Node.js Express](https://www.bezkoder.com/integrate-angular-10-node-js/)

> [Integrate Angular 12 with Node.js Express](https://www.bezkoder.com/integrate-angular-12-node-js/)

> [Integrate React with Node.js Express](https://www.bezkoder.com/integrate-react-express-same-server-port/)











For more detail, please visit:

> [Node.js + MongoDB: User Authentication & Authorization with JWT](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)

