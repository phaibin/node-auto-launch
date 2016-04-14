var Promise, runApplescript, tellTo;

runApplescript = require('run-applescript');

Promise = require('es6-promise').Promise;

tellTo = 'tell application "System Events" to ';

module.exports = {
  enable: function(opts) {
    return new Promise(function(resolve, reject) {
      var command, isHidden, properties;
      isHidden = opts.isHiddenOnLaunch ? 'false' : 'true';
      properties = "{path:\"" + opts.appPath + "\", hidden:" + isHidden + ", name:\"" + opts.appName + "\"}";
      command = tellTo + " make login item at end with properties " + properties;
      return runApplescript(command).then(function(result) {
        return resolve();
      });
    });
  },
  disable: function(opts) {
    return new Promise(function(resolve, reject) {
      var command;
      command = tellTo + ("delete login item \"" + opts.appName + "\"");
      return runApplescript(command).then(function(result) {
        return resolve();
      });
    });
  },
  isEnabled: function(opts) {
    return new Promise(function(resolve, reject) {
      var command;
      command = tellTo + "get the name of every login item";
      return runApplescript(command).then(function(loginItems) {
        var isPresent;
        isPresent = loginItems != null ? loginItems.indexOf(opts.appName) : void 0;
        return resolve((isPresent != null) && isPresent !== -1);
      });
    });
  }
};
