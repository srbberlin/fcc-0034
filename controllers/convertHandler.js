/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  const re = /([0-9.\/]*)\s*(\D*)/;
  
  this.getNum = function(input) {
    console.log('getNum:', input)
    var r = re.exec(input)
    if (r) {
      r = r[1].split('/')
      if (r.length === 1) {
        if (r[0].length === 0) {
          return 1
        }
        else {
          let res = r[0] / 1;
          if(res)
            return res
        }
      }
      else if (r.length === 2) {
        let res = r.reduce((a, b) => a / b);
        if(res)
          return res
      }
    }
    return null
  };
  
  this.getUnit = function(input) {
    var r = re.exec(input);
    if (r) {
      return this.spellOutUnit(r[2]);
    }
    return null
  };
  
  this.getReturnUnit = function(initUnit) {
    var o = {
      'gal': 'l',
      'l'  : 'gal',
      'mi' : 'km',
      'km' : 'mi',
      'lbs': 'kg',
      'kg' : 'lbs'
    }
    return this.spellOutUnit(initUnit) ? o[initUnit.toLowerCase()] : null;
  };

  this.spellOutUnit = function(unit) {
    return ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'].indexOf(unit) >= 0 ? unit : null
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    var calc = {
      'gal': () => initNum * galToL,
      'l'  : () => initNum / galToL,
      'mi' : () => initNum * miToKm,
      'km' : () => initNum / miToKm,
      'lbs': () => initNum * lbsToKg,
      'kg' : () => initNum / lbsToKg,
      'GAL': () => initNum * galToL,
      'L'  : () => initNum / galToL,
      'MI' : () => initNum * miToKm,
      'KM' : () => initNum / miToKm,
      'LBS': () => initNum * lbsToKg,
      'KG' : () => initNum / lbsToKg
    }

    return this.spellOutUnit(initUnit) ? calc[initUnit]() : null;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    var unitString = (u, v) => {
      var p = v === 1 ? '' : 's'
      var o = {
        'gal': ' gallon'+p,
        'l'  : ' liter'+p,
        'mi' : ' mile'+p,
        'km' : ' kilometer'+p,
        'lbs': ' pound'+p,
        'kg' : ' kilogram'+p,
        'GAL': ' gallon'+p,
        'L'  : ' liter'+p,
        'MI' : ' mile'+p,
        'KM' : ' kilometer'+p,
        'LBS': ' pound'+p,
        'KG' : ' kilogram'+p
      }

      return o[u]
    }
    
    var result = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: initNum+unitString(initUnit, initNum)+' converts to '+returnNum+unitString(returnUnit, returnNum)
    }
    
    return result;
  };
}

module.exports = ConvertHandler;
