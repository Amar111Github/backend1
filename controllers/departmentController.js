const Joi = require('joi');
const Department = require("../models/departmentModel");
const DepartmentValidation = require("../validations/departmentValideton");


const getAllDepartment = async (req, res) => {
  Department.find()
    .populate("company")
    .exec(function (err, employees) {
      res.send(employees);
    });
};

const createDepartment = async (req, res) => {
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newDepartment;

      newDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID,
      };

      Department.create(newDepartment, function (err, department) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(department);
          console.log("new Role Saved");
        }
      });
    }
  });
};

// const deleteDepartment = async (req, res) => {
//   Employee.find({ department: req.params.id }, function (err, d) {
//     if (err) {
//       console.log(err);
//       res.send(err);
//     } else {
//       if (d.length == 0) {
//         Department.findByIdAndRemove(
//           { _id: req.params.id },
//           function (err, department) {
//             if (!err) {
//               console.log("department deleted");
//               res.send(department);
//               // });
//               console.log("new Department Saved");
//             } else {
//               console.log("error");
//               res.send("err");
//             }
//           }
//         );
//         console.log("delete");
//         console.log(req.params.id);
//       } else {
//         res
//           .status(403)
//           .send(
//             "This department is associated with Employee so you can not delete this"
//           );
//       }
//     }
//   });
// };

const updateDepartment = async (req, res) => {
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updateDepartment;

      updateDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID,
      };

      Department.findByIdAndUpdate(
        req.params.id,
        updateDepartment,
        function (err, department) {
          if (err) {
            res.send("error");
          } else {
            res.send(updateDepartment);
          }
        }
      );
    }
  });
};

module.exports = {
  getAllDepartment,
  createDepartment,
  // deleteDepartment,
  updateDepartment,
};
