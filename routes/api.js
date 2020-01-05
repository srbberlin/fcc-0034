/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input//.toLowerCase()
      var initNum = convertHandler.getNum(input)
      var initUnit = convertHandler.getUnit(input)
      var returnNum
      var returnUnit

      if (initNum !== null && initUnit !== null) {
        initNum = parseFloat(Number(initNum).toFixed(5))
        returnNum = parseFloat(Number(convertHandler.convert(initNum, initUnit)).toFixed(5))
        returnUnit = convertHandler.getReturnUnit(initUnit)
        res.json(convertHandler.getString(initNum, initUnit, returnNum, returnUnit))
      }
      else {
        if (initNum) {
          res.send('invalid unit')
        }
        else if (initUnit) {
          res.send('invalid number')
        }
        else {
          res.send('invalid number and unit')
        }
      }
    });
    
};
