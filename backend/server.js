var nm = require("nodemailer");
var trans = nm.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "healixpvtltd@gmail.com",
    pass: "gafl wpuh nbnr fovu",
  },
});

const mongoose = require("mongoose");
mongoose.pluralize(null);
mongoose
  .connect(
    "mongodb+srv://Sparse2002:shrey14112002@cluster0.tq8pkzd.mongodb.net/Form"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_doctor: {
    type: Boolean,
    required: true,
  },
});
const User = mongoose.model("datas", UserSchema);
User.createIndexes();

const PatientSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  contact1: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  specialisation: {
    type: String,
    required: true,
  },
  doctor_name: {
    type: String,
    required: true,
  },
  doctor_id: {
    type: String,
    required: true,
  },
  patient_id: {
    type: String,
    required: true,
  },
  status_bit: {
    type: Number,
    required: true,
  },
  time_slot: {
    type: String,
    required: true,
  },
  visited_bit: {
    type: Number,
    required: true,
  },
  user_mail: {
    type: String,
    required: true,
  },
});
const Patient = mongoose.model("appoints", PatientSchema);
Patient.createIndexes();

const SpecSchema = new mongoose.Schema({
  spec_name: {
    type: String,
    required: true,
  },
});
const Spec = mongoose.model("specialisation", SpecSchema);
Spec.createIndexes();

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  timing_slot: {
    type: Array,
    required: true,
  },
  specialisation: {
    type: String,
    required: true,
  },
});
const Doctor = mongoose.model("doctor", DoctorSchema);
Doctor.createIndexes();

const Doc_spec_schema = new mongoose.Schema({
  doc_id: {
    type: String,
    required: true,
  },
  spec_id: {
    type: String,
    required: true,
  },
});
const Doc_spec = mongoose.model("doc_spec", Doc_spec_schema);
Doc_spec.createIndexes();

const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ error: "Email is aldready registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      is_doctor: false,
    });
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred in register" });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ mail: "Mail id not found" });
    }

    const pwd = await bcrypt.compare(password, user.password);
    if (!pwd) {
      return res.status(401).json({ pass: "Invalid password" });
    } else {
      console.log("success");
    }
    if (user.is_doctor) {
      res.json({
        message: "Login successful",
        getemail: email,
        getid: user._id.toString(),
        isdoctor: true,
      });
    } else {
      res.json({
        message: "Login successful",
        getemail: email,
        getid: user._id.toString(),
      });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});
app.post("/appointment", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      gender,
      age,
      weight,
      contact1,
      address,
      date,
      specialisation,
      doctor_name,
      doctor_id,
      patient_id,
      status_bit,
      time_slot,
      visited_bit,
      user_mail,
    } = req.body;
    const newPatient = new Patient({
      firstname,
      lastname,
      gender,
      age,
      weight,
      contact1,
      address,
      date,
      specialisation,
      doctor_name,
      doctor_id,
      patient_id,
      status_bit,
      time_slot,
      visited_bit,
      user_mail,
    });
    await newPatient.save();
    res.status(201).json({ message: "Form submitted successfully" });
    var mailoption = {
      from: "healixpvtltd@gmail.com",
      to: user_mail,
      subject: "Confirmation of Your Scheduled Appointment",
      // html:`<h2>Your Appointment booked successfully</h2><h3>Appointment details:</h3><p>Name:${firstname}</p><p>Contact:${contact1}</p><p>Date:${date}</p><p>Specialisation:${specialisation}</p><p>Doctor name:${doctor_name}</p><p>Timing:${time_slot}</p>`
      html: `<p>Dear ${firstname},<br><br>We are writing to confirm that your appointment has been 
      successfully scheduled and is set for the following date and time:<br><br>Date: ${date}<br>
      Time: ${time_slot}<br>Doctor: ${doctor_name}<br><br>We understand the importance of your appointment and want to ensure
      that all necessary arrangements have been made to accommodate your needs.<br><br>If you have 
      any questions or need to make any changes to your appointment, please do not hesitate to 
      contact us at +91 1234567890. Our team is here to assist you and will be happy to address 
      any concerns you may have.<br><br>We look forward to serving you and providing you with the 
      best possible experience during your appointment. Thank you for choosing our services, and we 
      appreciate the opportunity to assist you.<br><br>Best Regards,<br><br>Care & Cure<br>+91 1234567890</p>`,
    };
    trans.sendMail(mailoption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("email sent" + info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred in form submission" });
  }
});
app.post("/specialisation", async (req, res) => {
  try {
    const { specialisation, selected_date } = req.body;
    console.log(specialisation, selected_date);
    // var ms = new Date(selected_date).getTime();
    // ms += 86400000;
    // const newdate= new Date(ms).toISOString();
    // console.log(newdate)
    console.log("----------------------");
    var newdate = selected_date;
    console.log(newdate);
    const doc_obj = await Doctor.find(
      { specialisation },
      { name: 1, _id: 1, timing_slot: 1 }
    );
    const doct_name = doc_obj[0].name;
    const doct_id = doc_obj[0]._id.toString();
    const doct_slot = doc_obj[0].timing_slot;
    const v = await Patient.find(
      {
        doctor_name: doct_name,
        date: newdate,
        $or: [{ status_bit: 1 }, { status_bit: 2 }],
      },
      { time_slot: 1, _id: 0 }
    );
    console.log("----------------------");
    console.log(v);
    const filter_array = [];
    for (i of v) {
      filter_array.push(i.time_slot);
    }
    console.log("----------------------");
    console.log(filter_array);
    const doct_filtered = doct_slot.filter((val) => {
      if (filter_array.includes(val)) {
        return false;
      } else {
        return true;
      }
    });
    console.log(doct_filtered);
    console.log("----------------------");
    if (!doct_name) {
      return res.status(401).json({ error: "No doctor found" });
    }
    res.status(201).json({
      message: "Doctor found",
      doct_name: doct_name,
      doct_id: doct_id,
      avails_slot: doct_filtered,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred in getting doctor name" });
  }
});

app.post("/yourappoints", async (req, res) => {
  try {
    const { email } = req.body;
    const data = await Patient.find(
      { user_mail: email },
      {
        firstname: 1,
        lastname: 1,
        date: 1,
        specialisation: 1,
        doctor_name: 1,
        status_bit: 1,
        time_slot: 1,
        _id: 1,
        visited_bit: 1,
      }
    ).sort({ date: -1 });
    res
      .status(201)
      .json({ message: "Got Patient Data successfully.", history: data });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred in getting patient data" });
  }
});

app.post("/cancelappoint", async (req, res) => {
  try {
    const { _id } = req.body;

    await Patient.updateOne({ _id }, { $set: { status_bit: 0 } });
    res.status(201).json({ message: "Cancelled successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred in getting patient data" });
  }
});
app.post("/updateappoint", async (req, res) => {
  try {
    const { _id, date, time_slot } = req.body;
    await Patient.updateOne(
      { _id },
      { $set: { date: date, time_slot: time_slot } }
    );
    res.status(201).json({ message: "Updated successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred in getting patient data" });
  }
});
app.post("/updatemodal", async (req, res) => {
  try {
    const { _id, date, doctor } = req.body;
    console.log(date, doctor);
    console.log("----------------------");
    const date1 = new Date(date);
    console.log(date1);
    const doc_obj = await Doctor.find(
      { name: doctor },
      { timing_slot: 1, _id: 0 }
    );
    const doct_slot1 = doc_obj[0].timing_slot;
    const v = await Patient.find(
      {
        doctor_name: doctor,
        date: date1,
        $or: [{ status_bit: 1 }, { status_bit: 2 }],
      },
      { time_slot: 1, _id: 0 }
    );
    console.log("----------------------");
    console.log(v);
    const filter_array1 = [];
    for (i of v) {
      filter_array1.push(i.time_slot);
    }
    console.log("----------------------");
    console.log(filter_array1);
    const doct_filtered1 = doct_slot1.filter((val) => {
      if (filter_array1.includes(val)) {
        return false;
      } else {
        return true;
      }
    });
    console.log(doct_filtered1);
    console.log("----------------------");
    res.status(201).json({
      message: "Details found",
      avails_slot: doct_filtered1,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred in getting details" });
  }
});

app.post("/appoints_data", async (req, res) => {
  try {
    const { date, doctor_mail } = req.body;
    console.log("dm", doctor_mail);
    const doctor_id = await Doctor.findOne({ email: doctor_mail }, { _id: 1 });
    const doc_id = doctor_id._id.toString();
    console.log("di", doc_id);
    console.log("express-date", date);
    const name = await Patient.find({ date, doctor_id: doc_id });
    console.log('name',name);
    res
      .status(201)
      .json({ message: "User signed up successfully.", name: name });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});
app.post("/recent_appoints_data", async (req, res) => {
  try {
    const { date, doctor_mail } = req.body;
    // console.log("express-date",date);
    const doctor_id = await Doctor.findOne({ email: doctor_mail }, { _id: 1 });
    const doc_id = doctor_id._id.toString();
    console.log(doc_id);
    const all_data = await Patient.find({ doctor_id: doc_id });
    console.log(all_data.length);

    const name = await Patient.find({
      date: { $lte: date },
      doctor_id: doc_id,
    }).sort({
      date: -1,
      time_slot: -1,
    });
    // console.log(name);
    res.status(201).json({ message: "recent appoint ments.", name: name });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});
app.post("/change_data", async (req, res) => {
  try {
    const { v_bit, p_id, date, doctor_mail } = req.body;
    console.log(doctor_mail);
    const doctor_id = await Doctor.findOne({ email: doctor_mail }, { _id: 1 });
    const doc_id = doctor_id._id.toString();
    console.log(doc_id);
    // console.log("express-date", v_bit);
    const name = await Patient.updateOne(
      {
        $and: [
          { _id: p_id },
          { date: date },
          { status_bit: 1 },
          { doctor_id: doc_id },
        ],
      },
      { $set: { visited_bit: v_bit } }
    );
    console.log(name);
    res.status(201).json({ message: "succesfully updates." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});
app.post("/change_data_dashboard", async (req, res) => {
  try {
    const { s_bit, p_id, date } = req.body;
    console.log("express-date", date);
    // const newDate=new ISODate(date);
    // console.log("new",newDate);
    const name = await Patient.updateOne(
      { $and: [{ _id: p_id }, { date: date }] },
      { $set: { status_bit: s_bit } }
    );
    console.log(name);
    const patient_ids = await Patient.findOne({_id:p_id},{patient_id:1,_id:0})
    console.log(patient_ids)
    var ObjectId = require('mongodb').ObjectId
    const obj_id = new ObjectId(patient_ids.patient_id)
    console.log(obj_id)
    const patient_email = await User.findOne({_id:obj_id},{email:1,_id:0})
    console.log(patient_email)
    var mailoption = {
      from: "healixpvtltd@gmail.com",
      to: patient_email.email,
      subject: "Rejection of Your Scheduled Appointment",
      // html:`<h2>Your Appointment booked successfully</h2><h3>Appointment details:</h3><p>Name:${firstname}</p><p>Contact:${contact1}</p><p>Date:${date}</p><p>Specialisation:${specialisation}</p><p>Doctor name:${doctor_name}</p><p>Timing:${time_slot}</p>`
      html: `<p>You are rejected!</p>`,
    };
    trans.sendMail(mailoption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("email sent" + info.response);
      }
    });
    res.status(201).json({ message: "succesfully updates." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});
// const sendData = async () => {
//   try {
//     const spec = [
//       { spec_name: "General" },
//       { spec_name: "Cardiovascular" },
//       { spec_name: "Urologist" },
//       { spec_name: "Orthopedic" },
//       { spec_name: "Dermatologist" },
//       { spec_name: "Surgical" },
//     ];
//     const s1 = await Spec.insertMany(spec);
//   } catch (error) {
//     console.log(error);
//   }
// };
// sendData();
// const sendData = async () => {
//   try {
//     const doctor = [
//       { name: "Dr Dhairya Patel",email:"dhairya@gmail.com",password:"Dp123456",contact:"1234567890",gender:"male",timing_slot:["12:00 PM","12:15 PM","12:30 PM","12:45 PM","01:00 PM","01:15 PM","01:30 PM","01:45 PM","02:00 PM","02:15 PM","02:30 PM","02:45 PM","03:00 PM"],specialisation:"General" },
//       { name: "Dr Shrey Patel",email:"shrey@gmail.com",password:"Sp123456",contact:"1234567891",gender:"male",timing_slot:["12:00 PM","12:15 PM","12:30 PM","12:45 PM","01:00 PM","01:15 PM","01:30 PM","01:45 PM","02:00 PM","02:15 PM","02:30 PM","02:45 PM","03:00 PM"],specialisation:"Cardiovascular" },
//       { name: "Dr Henil Patel",email:"henil@gmail.com",password:"Hp123456",contact:"1234567892",gender:"male",timing_slot:["12:00 PM","12:15 PM","12:30 PM","12:45 PM","01:00 PM","01:15 PM","01:30 PM","01:45 PM","02:00 PM","02:15 PM","02:30 PM","02:45 PM","03:00 PM"],specialisation:"Urologist" },
//       { name: "Dr Mansi Parmar",email:"mansi@gmail.com",password:"Mp123456",contact:"1234567893",gender:"female",timing_slot:["12:00 PM","12:15 PM","12:30 PM","12:45 PM","01:00 PM","01:15 PM","01:30 PM","01:45 PM","02:00 PM","02:15 PM","02:30 PM","02:45 PM","03:00 PM"],specialisation:"Orthopedic" },
//       { name: "Dr Jinay Doshi",email:"jinay@gmail.com",password:"Jd123456",contact:"1234567894",gender:"male",timing_slot:["12:00 PM","12:15 PM","12:30 PM","12:45 PM","01:00 PM","01:15 PM","01:30 PM","01:45 PM","02:00 PM","02:15 PM","02:30 PM","02:45 PM","03:00 PM"],specialisation:"Dermatologist" },
//       { name: "Dr Jayveersinh Jadeja",email:"jayveersinh@gmail.com",password:"Jj123456",contact:"1234567895",gender:"others",timing_slot:["12:00 PM","12:15 PM","12:30 PM","12:45 PM","01:00 PM","01:15 PM","01:30 PM","01:45 PM","02:00 PM","02:15 PM","02:30 PM","02:45 PM","03:00 PM"],specialisation:"Surgical" },
//     ];
//     const s1 = await Doctor.insertMany(doctor);
//   } catch (error) {
//     console.log(error);
//   }
// };
// sendData();
// const sendData = async () => {
//   try {
//     const doc_spec_map = [
//       {doc_id:"64f1b9104e81e28b667be7ee",spec_id:"64f1b56591cef0f0d81267e5"},
//       {doc_id:"64f1b9104e81e28b667be7ef",spec_id:"64f1b56591cef0f0d81267e6"},
//       {doc_id:"64f1b9104e81e28b667be7f0",spec_id:"64f1b56591cef0f0d81267e7"},
//       {doc_id:"64f1b9104e81e28b667be7f1",spec_id:"64f1b56591cef0f0d81267e8"},
//       {doc_id:"64f1b9104e81e28b667be7f2",spec_id:"64f1b56591cef0f0d81267e9"},
//       {doc_id:"64f1b9104e81e28b667be7f3",spec_id:"64f1b56591cef0f0d81267ea"},
//     ];
//     const s1 = await Doc_spec.insertMany(doc_spec_map);
//   } catch (error) {
//     console.log(error);
//   }
// };
// sendData();
// const sendData = async () => {
//     try {
//       const doc_spec_map = [
//         {name:'Dr Dhairya Patel',password:'Dpatel@1234',email:'dhairya@gmail.com',is_doctor:true},
//         {name:'Dr Shrey Patel',password:'Spatel@1234',email:'shrey@gmail.com',is_doctor:true},
//         {name:'Dr Henil Patel',password:'Hpatel@1234',email:'henil@gmail.com',is_doctor:true},
//         {name:'Dr Mansi Parmar',password:'Mparmar@1234',email:'mansi@gmail.com',is_doctor:true},
//         {name:'Dr Jinay Doshi',password:'Jdoshi@1234',email:'jinay@gmail.com',is_doctor:true},
//         {name:'Dr Jayveersinh Jadeja',password:'Jjade@1234',email:'jayveersinh@gmail.com',is_doctor:true},

//       ];
//       const s1 = await User.insertMany(doc_spec_map);
//     } catch (error) {
//       console.log(error);
//     }
//   };
// sendData()
app.listen(5000);
