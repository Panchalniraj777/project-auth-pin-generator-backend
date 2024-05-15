const ProjectSchema = require('../Database/Schemas/ProjectSchema');

module.exports = class ProjectAuthModel {
    getProject = (filter = {}, projection = {}, options = {}) => {
        return ProjectSchema.findOne(filter, projection, options);
    };

    getProjectList = (filter = {}, projection = {}, options = {}) => {
        return ProjectSchema.find(filter, projection, options);
    };

    addProject = (title, qr, pin) => {
        return new ProjectSchema({
            title,
            qr,
            pin,
        });
    };

    projectBulkWrite = async (updates) => {
        return ProjectSchema.bulkWrite(updates)
    }
};
