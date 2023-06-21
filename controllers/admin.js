// get api for activity log
// get api for onboarded entities
const User = require('./../models/user');
const Merchant = require('../models/merchant');
const Bank = require('./../models/bank');
const ActivityLog = require('./../models/activityLog');
const { organisationDetails } = require('./../utils/data');
const { encryptData, decryptData } = require('./../utils/functions');

const getActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find({});
        const encryptedData = encryptData(
            JSON.stringify({
                message: 'Logs found!',
                data: {
                    logs
                }
            })
        );
        // res.status(200).json({
        //     message: 'Logs found!',
        //     data: {
        //         logs
        //     }
        // });
        res.status(200).send(encryptedData);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getOnboardedEntities = async (req, res) => {
    try {
        // get all merchants
        const merchants = await Merchant.find(
            {},
            {
                bankAccountDetails: 0,
                user: 0
            }
        );

        // get all organisations from object directly

        // get all banks
        const banks = await Bank.find({});
        let bankUsers = [];

        for (const bank of banks) {
            const user = await User.findById(bank.user, { tokens: 0 });
            let bankUser = {
                user: {},
                bank: {}
            };
            bankUser.user = user;
            bankUser.bank = bank;
            bankUsers.push(bankUser);
        }

        const encryptedData = encryptData(
            JSON.stringify({
                message: 'Onboarded entities found!',
                data: {
                    merchants,
                    bankUsers,
                    organisationDetails
                }
            })
        );
        // res.status(200).json({
        //     message: 'Onboarded entities found!',
        //     data: {
        //         merchants,
        //         bankUsers,
        //         organisationDetails
        //     }
        // });
        res.status(200).send(encryptedData);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    getActivityLogs,
    getOnboardedEntities
};