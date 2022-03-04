import mongoose from "mongoose";

const statSchema = new mongoose.Schema(
    {

    }
)

const stat = mongoose.model('Stats', statSchema);
export default stat;