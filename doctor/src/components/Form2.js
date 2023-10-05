import React, { useState } from "react";
import "./form2.css";
import {format} from 'date-fns';
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "./calendar2.css";
function Form2() {
  const navigate = useNavigate();
  var [doc, setdoc] = useState("Speciality Not Selected");
  var [user, setUser] = useState({});
  var [slot, setSlot] = useState("Choose Speciality");
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
  const [btncolor,setBtncolor]=useState(null);
  var disesase = [
    "General",
    "Cardiologist",
    "Urologist",
    "Orthopedic",
    "Dermatologist",
    "Surgeon",
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
    const selectedDate = new Date(e);
    setDate(selectedDate);
    console.log('date selected is',selectedDate)
    setDateflag(true);
    try { 
      setSlot(e);
      let result = await fetch("http://localhost:8000/api/users/specialisation/", {
        method: "post",
        body: JSON.stringify({
          specialisation: dis,
          selected_date: format(selectedDate, 'yyyy-MM-dd'),
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
          date: format(selectedDate, 'yyyy-MM-dd'),
        });
      }
      console.warn(result);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  function handleInput(e) {
    e.preventDefault()
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
      let result = await fetch("http://localhost:8000/api/users/specialisation/", {
        method: "post",
        body: JSON.stringify({
          specialisation: selectedDisease,
          selected_date: format(date, 'yyyy-MM-dd'),
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
          date: format(date, 'yyyy-MM-dd'),
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
    let result = await fetch("http://localhost:8000/api/users/appointment/", {
      method: "post",
      body: JSON.stringify({...user,['email']:localStorage.getItem('email')}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.message) {
      navigate("/yourAppoint");
    }
    console.warn(result);
  };
  return (
  <body className="form2">
    
    <div className="container">
      <div className="m-3 mt-5">
        <h1>Book Your Appointment</h1>
      </div>
      <div className="mx-3" style={{backgroundColor:"lightgrey",height:"1px",width:"97.5%"}}></div>
      <fieldset>
        <form onSubmit={handleSubmit} className="mt-5">
          
          <div className="d-sm-flex name">
            <div className="input-container mx-3">
              <input type="text" name="firstname" onChange={handleInput} required/>
              <label for="input" class="label">First Name</label>
              <div class="underline"></div>
            </div>
            <div className="input-container mx-3 ">
              <input type="text" name="lastname" onChange={handleInput} required/>
              <label for="input" class="label">Last Name</label>
              <div class="underline"></div>
            </div>
          </div>

          <div className="d-sm-flex mt-5">
            <div className="input-container mx-3">
              <input type="text" name="age" onChange={handleInput} required/>
              <label for="input" class="label">Age</label>
              <div class="underline"></div>
            </div>
            <div className="input-container mx-3 ">
              <input type="text" name="weight" onChange={handleInput} required/>
              <label for="input" class="label">Weight</label>
              <div class="underline"></div>
            </div>
          </div>

          <div className="d-sm-flex mt-5">
            <div className="input-container mx-3">
              <input type="text" name="address" onChange={handleInput} required/>
              <label for="input" class="label">Address</label>
              <div class="underline"></div>
            </div>
            <div className="input-container mx-3 ">
              <input type="text" name="contact" onChange={handleInput} required/>
              <label for="input" class="label">Contact Number</label>
              <div class="underline"></div>
            </div>
          </div>

          <div className="d-flex gen mx-3 mt-5 mb-4">
            <div className="d-flex label">
              <label><h4>Gender: </h4></label>  
            </div>
          
            <div className="d-flex values mt-2">
              <div className="mx-3">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="form-check-input mx-2"
                    onChange={handleInput} 
                  />
                  Male
              </div>

              <div className="mx-3">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="form-check-input mx-2"
                  onChange={handleInput}
                />
                Female
              </div>

              <div className="mx-3">
                <input
                  type="radio"
                  name="gender"
                  value="others"
                  className="hov form-check-input mx-2"
                  onChange={handleInput}
                />
                Others
              </div>
            </div>
          </div>
          
          <div className="d-lg-flex mb-0">
            <div className="col-lg-6">
              <div className="mx-3">
                <div>
                  <h4 className="mb-3">Choose Date: </h4>
                </div>
                <div>
                  <div >
                    <Calendar 
                    name="date"
                    
                    required 
                    onChange={getvalue2}
                    minDate={mindate}
                    maxDate={maxdate}/>
                  </div>
                </div>
              </div>
              <div >
                <div >
                  <label className="mx-3 mt-4 mb-3"><h4> Speciality: </h4></label>
                  <select  onChange={getValue} name="specialisation" >
                    <option selected disabled hidden>
                      Choose speciality
                    </option>
                    {disesase.map((item) => {
                      return <option>{item}</option>;
                    })}
                  </select>
                </div>
                <div >
                  <label className="mx-3 mb-3"><h4>Doctor: </h4></label>
                  <span className="fs-5">{doc}</span>
                </div>
              </div>
            </div>
            {dateflag === true && slotflag === true ? (
              <div className="col-lg-6 px-3 mb-3">
              <div >
                <h4 className="mb-3">Timing Slots</h4>
                <div className="d-flex flex-wrap mb-3">
                      {timinglist.map((item) => {
                        return (
                          <button
                            className="timing px-4 m-2 btn btn-outline-secondary"
                            name="time_slot"
                            value={item}
                            onClick={handleInput}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                {user.time_slot && <h5 className="mb-3">Selected Time slot: {user.time_slot}</h5>}
              </div>
            </div>
            ) : ( "" )}
          </div>

          <div className="mx-3 mb-3" style={{backgroundColor:"lightgrey",height:"1px",width:"97.5%"}}></div>
          <div className="d-flex justify-content-center ">
            <input type="submit" value="Confirm Booking" className="btn-confirm py-2 px-3 mb-5 fs-5" />
          </div>

        </form>
      </fieldset>
    </div>
  </body>
  );
}

export default Form2;
