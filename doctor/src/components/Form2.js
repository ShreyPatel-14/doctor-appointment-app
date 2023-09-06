import React, { useState } from "react";
import "./form2.css";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "./calendar.css";
function Form2() {
  const navigate = useNavigate();
  var [doc, setdoc] = useState("doctor");
  var [user, setUser] = useState({});
  var [slot, setSlot] = useState("Choose speciality");
  var [slotflag, setSlotflag] = useState(false);
  var [dateflag, setDateflag] = useState(false);
  var [timinglist, setTiminglist] = useState([]);
  var [date, setDate] = useState(new Date());
  var [dis, setDis] = useState("");
  var currentdate = new Date();
  var mindate = new Date();
  mindate.setDate(currentdate.getDate() + 1);
  var maxdate = new Date();
  maxdate.setDate(currentdate.getDate() + 30);
  var disesase = [
    "General",
    "Cardiovascular",
    "Urologist",
    "Orthopedic",
    "Dermatologist",
    "Surgical",
  ];
  // var doctor = [
  //   "Dr Dhairya Patel",
  //   "Dr Shrey Patel",
  //   "Dr Henil Patel",
  //   "Dr Mansi Parmar",
  //   "Dr Jinay Doshi",
  //   "Dr Jayveersinh Jadeja",
  // ];
  // var dd = {
  //   General: "Dr Dhairya Patel",
  //   Cardiovascular: "Dr Shrey Patel",
  //   Urologist: "Dr Henil Patel",
  //   Orthopedic: "Dr Mansi Parmar",
  //   Dermatologist: "Dr Jinay Doshi",
  //   Surgical: "Dr Jayveersinh Jadeja",
  // };
  const getvalue2 = async (e) => {
    const selectedDate = e;
    setDate(selectedDate);
    console.log('date selected is',selectedDate)
    setDateflag(true);
    try { 
      setSlot(e);
      let result = await fetch("http://localhost:5000/specialisation", {
        method: "post",
        body: JSON.stringify({
          specialisation: dis,
          selected_date: selectedDate.toLocaleDateString(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.error) {
        console.log(result.error);
      } else if (result.message) {
        setdoc(result.doct_name);
        setTiminglist(result.avails_slot);
        setUser({
          ...user,
          specialisation: dis,
          doctor_name: result.doct_name,
          doctor_id: result.doct_id,
          patient_id: localStorage.getItem("Id"),
          status_bit: 1,
          date: selectedDate,
        });
      }
      console.warn(result);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }
  const getValue = async (e) => {
    try {
      const selectedDisease = e.target.value;
      setDis(selectedDisease);
      setSlot(e.target.value);
      setSlotflag(true);
      let result = await fetch("http://localhost:5000/specialisation", {
        method: "post",
        body: JSON.stringify({
          specialisation: selectedDisease,
          selected_date: date.toLocaleDateString(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.error) {
        console.log(result.error);
      } else if (result.message) {
        setdoc(result.doct_name);
        setTiminglist(result.avails_slot);
        setUser({
          ...user,
          specialisation: selectedDisease,
          doctor_name: result.doct_name,
          doctor_id: result.doct_id,
          patient_id: localStorage.getItem("Id"),
          status_bit: 1,
          date: date.toLocaleDateString(),
          visited_bit: 0,
          user_mail: localStorage.getItem("email"),
        });
      }
      console.warn(result);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5000/appointment", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.message) {
      navigate("/yourAppoint");
    }
    console.warn(result);
    if (result) {
      setUser({});
    }
  };
  return (
    <div className="container">
      <fieldset>
        <form onSubmit={handleSubmit} className="xyz">
          <div className="row">
            <div className="col-md-6">
              <label className="form-label col-sm-2">Name</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="first name"
                name="firstname"
                className="hov border"
                onChange={handleInput}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="last name"
                name="lastname"
                className="hov border"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Gender</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <input
                type="radio"
                name="gender"
                value="male"
                className="hov form-check-input"
                onChange={handleInput}
              />{" "}
              Male
            </div>
            <div className="col-md-2">
              <input
                type="radio"
                name="gender"
                value="female"
                className="hov form-check-input"
                onChange={handleInput}
              />{" "}
              female
            </div>
            <div className="col-md-2">
              <input
                type="radio"
                name="gender"
                value="others"
                className="hov form-check-input"
                onChange={handleInput}
              />{" "}
              others{" "}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {" "}
              <label className="form-label"> Age </label>
              <input
                type="number"
                className="hov border"
                name="age"
                required
                onChange={handleInput}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label"> Weight </label>
              <input
                type="number"
                className="hov border"
                name="weight"
                required
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Contact 1</label>
              <input
                type="number"
                className="hov border"
                name="contact1"
                required
                onChange={handleInput}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Contact 2</label>
              <input
                type="number"
                className="hov border"
                name="contact2"
                onChange={handleInput}
              />
            </div>
          </div>
          <label className="form-label"> Address </label>
          <textarea
            name="address"
            id=""
            cols="30"
            rows="2"
            className="hov"
            required
            onChange={handleInput}
          ></textarea>
          {/* <div className="row">
            <div className="col-md-2">
              <label className="form-label"> Date </label>
            </div>
            <div className="col-md-2">
              <input
                type="date"
                name="date"
                id=""
                className="hov"
                required
                onChange={getvalue2}
              />
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-2">
              <label className="form-label"> Date </label>
            </div>
            <Calendar
              name="date"
              className="hov"
              required
              onChange={getvalue2}
              minDate={mindate}
              maxDate={maxdate}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="hov form-label"> Speciality </label>
              <select
                onChange={getValue}
                className="hov specs"
                name="specialisation"
              >
                <option selected disabled hidden>
                  Choose speciality
                </option>
                {disesase.map((item) => {
                  return <option>{item}</option>;
                })}
              </select>
            </div>
            <div className="col-md-6">
              <label className="hov form-label"> Doctor </label>
              <p>{doc}</p>
            </div>
          </div>
          {dateflag === true && slotflag === true ? (
            <div className="row">
              <div className="col-md-6">
                <label className="hov form-label"> Timing slots </label>
                <select className="hov" name="time_slot" onChange={handleInput}>
                  <option selected disabled hidden>
                    Choose timing slots
                  </option>
                  {timinglist.map((item) => {
                    return <option>{item}</option>;
                  })}
                </select>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="row">
            <input type="submit" value="Submit" className="col-md-6" />
          </div>
        </form>
      </fieldset>
    </div>
  );
}

export default Form2;
