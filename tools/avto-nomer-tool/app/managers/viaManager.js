const fs = require('fs'),
      path = require('path')
;

module.exports = {
    prepareViaPart (data, keys, srcDir){
        const dataPart = Object.assign({},data);
        dataPart._via_img_metadata = {};
        // console.log('keys-----------------------------');
        // console.log(keys);
        for (let item of keys) {
            let file =  path.join(srcDir, item);
            if (fs.existsSync(file)) {
                dataPart._via_img_metadata[item] = data._via_img_metadata[item]
            } else {
                new Error(`File "${item}" is not exists!`)
            }
        }
        return dataPart
    },

    moveViaPart(dataPart, srcDir, targetDir, subDir) {
        for (let key in dataPart._via_img_metadata) {
            let fileIn = path.join(srcDir, dataPart._via_img_metadata[key].filename),
                fileOut = path.join(targetDir, subDir, dataPart._via_img_metadata[key].filename)
            ;
            fs.renameSync(fileIn, fileOut);
        }
        return dataPart
    },

    writeViaPart(dataPart, targetDir, subDir, viaFile) {
        let fullViaFile = path.join(targetDir, subDir, viaFile);
        let wstream = fs.createWriteStream(fullViaFile);
        wstream.write(JSON.stringify(dataPart,null,2));
        wstream.end();
    }
}