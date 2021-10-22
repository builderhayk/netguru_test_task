export default (mongoose) => {
    let MovieSchema = mongoose.Schema({
        userId: { type: Number, required: true, },
        title: { type: String, required: true, maxLength: 55, minLength: 2, index: true },
        released: { type: Date, required: true, },
        genre: { type: String, maxLength: 55, minLength: 2, default: "n/e", },
        director: { type: String, required: true, minLength: 3, maxLength: 55, },
    }, { timestamps: true });

    return mongoose.model("Movie", MovieSchema);
};
