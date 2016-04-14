runApplescript = require 'run-applescript'
Promise = require('es6-promise').Promise

tellTo = 'tell application "System Events" to '

module.exports =

    enable: (opts) ->
        new Promise (resolve, reject) ->
            isHidden = if opts.isHiddenOnLaunch then 'false' else 'true'
            properties = "{path:\"#{opts.appPath}\", hidden:#{isHidden}, name:\"#{opts.appName}\"}"
            command = "#{tellTo} make login item at end with properties #{properties}"

            runApplescript(command).then (result) ->
                resolve()

    disable: (opts) ->
        new Promise (resolve, reject) ->
            command = tellTo + "delete login item \"#{opts.appName}\""

            runApplescript(command).then (result) ->
                resolve()

    isEnabled: (opts) ->
        new Promise (resolve, reject) ->
            command = tellTo + "get the name of every login item"

            runApplescript(command).then (loginItems) ->
                isPresent = loginItems?.indexOf(opts.appName)
                resolve(isPresent? and isPresent isnt -1)
