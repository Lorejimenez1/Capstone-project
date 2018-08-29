const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const proSettingsSchema = mongoose.Schema ({
    player: 'string',
    mouse: 'string',
    sensitivity: {type: Number, requires: true},
    dpi: {type: Number, requires: true},
    ads: {type: Number, requires: true},
    ScopeSensitivity:  {type: Number, requires: true},
    keyboard: 'string'
});

proSettingsSchema.methods.serialize = function () {
    return {
        id: this._id,
        player: this.player,
        mouse: this.mouse,
        sensitivity: this.sensitivity,
        dpi: this.dpi,
        ads: this.ads,
        ScopeSensitivity:  this.ScopeSensitivity,
        keyboard: this.keyboard
    };

};

const Settings = mongoose.model('Settings', proSettingsSchema);
module.exports = {Settings}

