'use strict';

import jsonFile from 'jsonfile';

export default {
  json(filePath) {
    return new Promise(function (res, rej) {
      jsonFile.readFile(filePath, function (err, obj) {
        if (err) {
          rej(err);
        } else {
          res(obj);
        }
      });
    });
  }
};
