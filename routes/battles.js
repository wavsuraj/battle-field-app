// Filename : user.js

const express = require("express");
// const { check, validationResult} = require("express-validator/check");
// const bcrypt = require("bcryptjs");
const lodash = require("lodash");
const router = express.Router();

const Battles = require("../models/Battles");


router.get('/getAllBattlesLocation', function (req, res) {

    Battles.find()
        .then((result) => {
            let resultData = lodash.map(result, (params) => {
                return params.location
            })
            return res.status(200).json(resultData);

        })
        .catch((error) => {
            return res.status(400).json({
                message: error
            });

        })
});


router.get('/countOfBattles', function (req, res) {

    Battles.countDocuments()
        .then((countResult) => {
            return res.status(200).json(countResult);
        })
        .catch((error) => {
            return res.status(400).json({
                message: error
            });

        })
});


router.post('/search', function (req, res) {

    let king = req.body.king;

    let findObject = {};
    findObject["$or"] = [];
    if (king) {
        let objToPush1 = { attacker_king: king };
        findObject["$or"].push(objToPush1);
        let objToPush2 = { defender_king: king };
        findObject["$or"].push(objToPush2);
    }

    Battles.find(findObject)
        .then((findResult) => {
            return res.status(200).json(findResult);
        })
        .catch((error) => {
            return res.status(400).json({
                message: error
            });

        })
});


router.post('/searchByMultiple', function (req, res) {

    let requestData = req.body.data;
    let findObject = {};
    findObject["$and"] = [];
    if (requestData && requestData.length) {
        lodash.forEach(requestData, (eachReqObj) => {

            let sendObj = {};
            let keyData = Object.keys(eachReqObj)[0];
            let valueData = Object.values(eachReqObj)[0];
            if (keyData == "king") {
                let tempObj1 = {};
                let tempObj2 = {};
                let keyData1 = "attacker_king";
                let keyData2 = "defender_king";
                let condObj = {};
                condObj["$or"] = [];
                tempObj1[keyData1] = valueData;
                tempObj2[keyData2] = valueData;
                condObj["$or"].push(tempObj1);
                condObj["$or"].push(tempObj2);
                // sendObj[keyData2] = valueData;
                // condObj["$or"].push(sendObj);
                findObject["$and"].push(condObj);
            } else {
                sendObj[keyData] = valueData;
                findObject["$and"].push(sendObj)
            }
            // console.log('www', eachReqObj, Object.keys(eachReqObj), Object.values(eachReqObj));
        })
        console.log("findObject  wdf", findObject["$and"][0]["$or"], findObject)
        Battles.find(findObject)
            .then((findResult) => {
                console.log("Result", findResult)
                return res.status(200).json(findResult);
            })
            .catch((error) => {
                return res.status(400).json({
                    message: error
                });

            })

    } else {
        return res.status(400).json({
            message: "Atleast one search parameter required"
        });

    }


    // let findObject = {};
    // findObject["$or"] = [];
    // if (king) {
    //     let objToPush1 = { attacker_king: king };
    //     findObject["$or"].push(objToPush1);
    //     let objToPush2 = { defender_king: king };
    //     findObject["$or"].push(objToPush2);
    // }


});

router.post('/searchBySearchString', function (req, res) {

    let searchStr = req.body.searchString;

    let findObject = {};
    findObject["location"] = new RegExp('^' + searchStr, "i");
    // findObject["location"] = `/^${searchStr}$/`;
    // console.log("findObjectfindObject", findObject)
    Battles.find(findObject)
        .then((findResult) => {
            return res.status(200).json(findResult);
        })
        .catch((error) => {
            return res.status(400).json({
                message: error
            });

        })
});

module.exports = router;
