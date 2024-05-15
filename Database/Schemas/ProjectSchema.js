const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        qr: {
            type: String,
            required: true,
        },
        pin: {
            type: Number,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)

module.exports = mongoose.model("projects", ProjectSchema);
