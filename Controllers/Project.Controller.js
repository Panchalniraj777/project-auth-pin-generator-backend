const ProjectModel = new (require('../Models/Project.Models'))();

const { STATUS_CODES } = require('../Configs/constants');
const {
    generateUniqProject,
    getQrCodeBase64,
    generateSixDigitPin,
    isValidUuid,
} = require('../Utils/helpers');

module.exports = class ProjectAuthController {
    generateQr = async (req, res) => {
        try {
            let uniqProjectQr = generateUniqProject();

            const qrDetail = await getQrCodeBase64(
                `${process.env.CLIENT_URL}scan-project/${uniqProjectQr}`
            );

            return res.status(STATUS_CODES.SUCCESS).send({
                data: {
                    qr: uniqProjectQr,
                    qrDetail,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(STATUS_CODES.SERVER_ERROR).send({
                message: 'Something went wrong',
            });
        }
    };

    addProject = async (req, res) => {
        try {
            const { qr } = req.body;

            if (!qr || !isValidUuid(qr)) {
                return res.status(STATUS_CODES.BAD_REQUEST).send({
                    message: 'NOT_VALID_QR',
                });
            }

            const isProjectExist = await ProjectModel.getProject(
                {
                    qr,
                },
                {
                    _id: 1,
                },
                {
                    lean: true,
                }
            );

            if (isProjectExist?._id) {
                return res.status(STATUS_CODES.NOT_ALLOWED).send({
                    message: 'PROJECT_EXIST',
                });
            }

            const response = await ProjectModel.addProject(
                `Project_${new Date().getTime()}`,
                qr,
                generateSixDigitPin()
            );
            
            await response.save();

            return res.status(STATUS_CODES.SUCCESS).send({
                data: response,
            });
        } catch (error) {
            console.log(error);
            return res.status(STATUS_CODES.SERVER_ERROR).send({
                message: 'Something went wrong',
            });
        }
    };

    generateAuth = (element, newNumbers) => {
        let sixDigitPin = generateSixDigitPin();

        if (newNumbers?.includes(sixDigitPin)) {
            this.generateAuth(element, newNumbers);
        } else {
            element.pin = sixDigitPin;
            newNumbers.push(sixDigitPin);
        }

        return {
            updateOne: {
                filter: {
                    _id: element._id,
                },
                update: {
                    $set: {
                        pin: element.pin,
                    },
                },
            },
        };
    };

    updateProjectAuth = async (req, res) => {
        try {
            let projectAuth = await ProjectModel.getProjectList();

            if (!projectAuth?.length) {
                return res.status(STATUS_CODES.SUCCESS).send({
                    data: projectAuth,
                });
            }

            const newNumbers = [];
            projectAuth = projectAuth.map(element => this.generateAuth(element, newNumbers));

            await ProjectModel.projectBulkWrite(projectAuth);

            let response = await ProjectModel.getProjectList({}, {}, { sort: { created_at: -1 } });

            return res.status(STATUS_CODES.SUCCESS).send({
                data: response,
            });
        } catch (error) {
            console.log(error);
            return res.status(STATUS_CODES.SERVER_ERROR).send({
                message: 'Something went wrong',
            });
        }
    };
};
