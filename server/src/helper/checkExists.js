const db = require("../models");

exports.CheckUserNameExists = (userName) =>
  new Promise(async (resolve, reject) => {
    try {
      const { count, data } = await db.User.findAndCountAll({
        where: { userName },
        attributes: ["id", "userName"],
        raw: true,
      });

      resolve({
        err: count === 0 ? 0 : 1,
        msg:
          count === 0
            ? "Tên người dùng có thể sử dụng"
            : "Tên người dùng đã được sử dụng",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
