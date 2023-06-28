const mysql = require("mysql");
const con = mysql.createConnection({
  user: "mvenn",
  host: "localhost",
  database: "mydb",
  password: "dcm123",
  port: 5000,
});

//add customer
function addCustomer(phoneNumber, password) {
  return new Promise((resolve, reject) => {
    validator(password)
      .then(() => {
        return isPhoneNumberExist(phoneNumber);
      })
      .catch((e) => {
        console.log(e);
      });
    con.query(
      "INSERT INTO Account(phone_number,password) values($1,$2)",
      [phone_number, password],
      (err, res) => {
        if (err) {
          reject(err);
        } else resolve("Your have successfully added!");
      }
    );
  });
}

function isPhoneNumberExist(phoneNumber) {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT phone_number FROM Account where phone_number =$1 ",
      [phone_number],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.rowCount) {
            reject("Phone Number Already exist!");
          } else resolve();
        }
      }
    );
  });
}

function validator(password) {
  return new Promise((resolve, reject) => {
    const format = "/^[!@#$%^&*()_+-=[]{};':|,.<>/?]*$/";
    if (password.length >= 8) {
      for (let i = 0; i < password.length; i++) {
        for (let j = 0; j < format.length; j++) {
          if (password[i] === format[j]) {
            resolve();
          }
        }
      }
      reject("Password should have atleast one special character!");
    } else {
      reject("Password should have atleast one special character!");
    }
  });
}
addCustomer("1234567890", "123dd@")
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
