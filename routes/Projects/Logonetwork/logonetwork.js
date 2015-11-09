/**
 * Created by Luan on 15. 11. 8..
 */
/**
 * Created by Luan on 15. 11. 7..
 */
/**
 * Created by Luan on 15. 10. 30..
 */

var express = require('express');
var router = express.Router();
module.exports = router;
var csvParser = require('../../../functions/CsvToJson');

router.get('/viewer', function (req, res) {
    var result = {};
    result.tab = 'projects';
    var total_data = {keys: []};
    var result = {};
    csvParser.Parse('./ProjectData/Logo/logo_data3_2.csv', function (object) {

        for (var i = 0; i < object.length; i++) {
            total_data[object[i].name] = object[i];
            if (object[i].name != 'max' && object[i].name != 'node_color' &&
                object[i].name != 'cat' && object[i].name != 'idx_name' && object[i].name != 'idx_name_korean')
                total_data.keys.push(object[i].name);
        }

        result.default_data = JSON.stringify(total_data);
        res.render('projects/logonetwork/logonetwork_circularParellar', result);
    });

})


router.get('/multicamera', function (req, res) {
    var result = {};
    result.tab = 'projects';
    res.render('projects/logonetwork/logonetwork_multicamera', result);
})
router.get('/filterednetwork', function (req, res) {
    var result = {};
    result.tab = 'projects';
    res.render('projects/logonetwork/logonetwork_filtered', result);
})
router.get('/prototype01', function (req, res) {
    var result = {};
    result.tab = 'projects';

    try {
        csvParser.Parse('./ProjectData/Logo/logo_data01.csv', function (object) {
            var data = require('../../../functions/CsvtoNetworkJSON').CsvToD3JSJSON(object, function (same, max) {
                var result = Math.pow((same / max), 0.5);
                if (result > 0.46) return result
                else return 0;
            });
            result.default_data = JSON.stringify(data, null, 4);
            res.render('projects/logonetwork/logonetwork_prototype', result);
        })


    } catch (e) {
        res.redirect('projects');
    }

})
router.get('/prototype02', function (req, res) {
    var result = {};
    result.tab = 'projects';
    try {
        csvParser.Parse('./ProjectData/Logo/logo_data01.csv', function (object) {
            var data = require('../../../functions/CsvtoNetworkJSON').CsvToSigmaJSON(object, function (same, max) {
                var result = Math.pow((same / max), 0.5);

                if (result < 0.5) return 0;
                return result;
            });
            result.default_data = JSON.stringify(data, null, 4);
            res.render('projects/logonetwork/logonetwork_prototype02', result);
        })


    } catch (e) {
        res.redirect('projects');
    }

})



router.get('/', function (req, res) {
    var result = {};
    result.tab = 'projects';
    res.render('./projects/logonetwork/logonetwork_main', result);
});