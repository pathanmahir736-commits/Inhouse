  import mongoose from "mongoose";

  const collegeProfileSchema = new mongoose.Schema(
    {
      collegeId: {
        type: String,
        required: true,
        unique: true,
      },

      collegeName: String,
      authorizedPerson: String,
      email: String,
      mobile: String,
      password:String,
      collegeType: String,
      state: String,
      city: String,
      address: String,
      pincode: String,

      documents: {
    registrationCertificate: {
      path: String,
      originalName: String,
    },
    approvalCertificate: {
      path: String,
      originalName: String,
    },
    logo: {
      path: String,
      originalName: String,
    },
  },


      isSubmitted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  export default mongoose.model("CollegeProfile", collegeProfileSchema);
