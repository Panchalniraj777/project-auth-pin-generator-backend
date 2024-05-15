const bwipJs = require("bwip-js");
const { v4: uuidv4 } = require('uuid');

const arrayBufferToBase64 = (arrayBuffer) => {
    const bytes = new Uint8Array(arrayBuffer)
    const len = bytes.byteLength
    let binary = ''

    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return Buffer.from(binary, "binary").toString("base64")
}

const getQrCodeBase64 = async (text) => {
    if (!text) return

    const qrCodeBuffer = await bwipJs.toBuffer({
        bcid: "qrcode",
        text,
        textxalign: "center",
        scale: 2,
        paddingwidth: 5,
        paddingtop: 5,
        paddingbottom: 4,
    })

    return "data:image/png;base64," + arrayBufferToBase64(qrCodeBuffer)
}

const generateUniqProject = () => {
    return uuidv4();
}

const generateSixDigitPin = () => {
    const randomNum = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    return randomNum;
}

const isValidUuid = (uuid) => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
};

module.exports = {
    arrayBufferToBase64,
    getQrCodeBase64,
    generateUniqProject,
    generateSixDigitPin,
    isValidUuid
};
