import React, { useEffect, useState } from "react";
import "./Your_Appoint.scss";
import Calendar from "react-calendar";
function Your_Appoint() {
  const [data, setData] = useState([]);
  const [obj, setObj] = useState({});
  const [id, setId] = useState("");
  const [docName, setDocName] = useState("");
  const [slots, setSlots] = useState([]);
  var currentdate = new Date();
  var mindate = new Date();
  mindate.setDate(currentdate.getDate() + 1);
  var maxdate = new Date();
  maxdate.setDate(currentdate.getDate() + 30);
  const fetchData = async () => {
    try {
      let result = await fetch("http://localhost:5000/yourappoints", {
        method: "post",
        body: JSON.stringify({
          email: localStorage.getItem("email"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.error) {
        console.log(result.error);
      } else if (result.message) {
        console.log(result.history);
        setData(result.history);
      }
      console.warn(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const cancelAppoint = async (appoint_id) => {
    console.log(appoint_id.toString());
    try {
      let result = await fetch("http://localhost:5000/cancelappoint", {
        method: "post",
        body: JSON.stringify({
          _id: appoint_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.error) {
        console.log(result.error);
      } else if (result.message) {
        console.log(result.message);
        fetchData();
      }
      console.warn(result);
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateAppoint = async (obj) => {
    try {
      let { date, time_slot } = obj;
      let result = await fetch("http://localhost:5000/updateappoint", {
        method: "post",
        body: JSON.stringify({
          _id: id,
          date: date.toLocaleDateString(),
          time_slot: time_slot,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.error) {
        console.log(result.error);
      } else if (result.message) {
        console.log(result.message);
        fetchData();
        window.location.reload();
      }
      console.warn(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObj({ ...obj, [name]: value });
  };

  const handleChange1 = async (e) => {
    const value = e;
    setObj({ ...obj, ['date']: value });
    console.log(value);
    console.log(docName);

    try {
      let result = await fetch("http://localhost:5000/updatemodal", {
        method: "post",
        body: JSON.stringify({
          _id: id,
          date: value.toLocaleDateString(),
          doctor: docName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.error) {
        console.log(result.error);
      } else if (result.message) {
        console.log(result.message);
        setSlots(result.avails_slot);
      }
      console.warn(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    // updateAppoint(_id);
    e.preventDefault();
    const _id = "";
    console.log(obj);
    updateAppoint(obj);
  };

  return (
    <>
      <div className="background container">
        <div>
          <h2 className="animate__animated animate__slideInDown">
            Your Appointments
          </h2>
        </div>
        <div className="column_patients container">
          <div className="d-flex justify-content-between">
            <h2 className="patients">All Appointments</h2>
            {/* <div className='date'><DatePicker onChange={(e) => setdate(new Date(e))} render={<Icon />} /></div> */}
            {/* to get the selected value from date picker, use usestate just like calendar. */}
          </div>
          <div className="patients_content">
            {data.length === 0 ? (
              <>
                <div className="no_appo_text">
                  There Is No appointments for the user
                </div>
              </>
            ) : (
              <>
                <div className="row mb-1 justify-content-around head">
                  <div className="col col-1 mb-3">Sr. No</div>
                  <div className="col col-2 mb-3">Name</div>
                  <div className="col col-1 mb-3">Date</div>
                  <div className="col col-1 mb-3">Specialisation</div>
                  <div className="col col-2 mb-3">Doctor Name</div>
                  <div className="col col-2 mb-3">Time Slot</div>
                  <div className="col col-2 mb-3"></div>
                  <div className="col col-2 mb-3"></div>
                </div>
                {data.map((item, index) => {
                  var newdate = new Date(item.date);
                  return (
                    <div
                      className="row mb-1 justify-content-around text"
                      key={index}
                    >
                      <div className="col col-1 mb-2">{index + 1}</div>
                      <div className="col col-2 mb-2">
                        {item.firstname + " " + item.lastname}
                      </div>
                      <div className="col col-1 mb-2">
                        {newdate.getDate() +
                          "/" +
                          (newdate.getMonth() + 1) +
                          "/" +
                          newdate.getFullYear()}
                      </div>
                      <div className="col col-1 mb-2">
                        {item.specialisation}
                      </div>
                      <div className="col col-2 mb-2">{item.doctor_name}</div>
                      <div className="col col-2 mb-2">{item.time_slot}</div>
                      {/* {item.status_bit===0?<><p className="col mb-2">Cancelled</p></>
                      :<><div className="col mb-2">
                        <button>Update</button>
                      </div>
                      <div className="col mb-2">
                        <button onClick={()=>{cancelAppoint(item._id)}}>Cancel</button>
                      </div></>} */}
                      {item.visited_bit === 1?<><p className="col mb-2">Approved</p></>:(item.status_bit !== 0 ? (
                        item.status_bit === 2 ? (
                          <>
                            <p className="col mb-2">Rejected</p>
                          </>
                        ) : (
                          <>
                            <div className="col mb-2">
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target={"#exampleModalLabel"+index}
                                data-bs-whatever="@mdo"
                                onClick={() => {
                                  setId(item._id);
                                  setDocName(item.doctor_name);
                                }}
                              >
                                Update
                              </button>

                              <div
                                class="modal fade"
                                id={"exampleModalLabel"+index}
                                tabindex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1
                                        class="modal-title fs-5"
                                        id="exampleModalLabel"
                                      >
                                        Update Appointment
                                      </h1>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div class="modal-body">
                                      <form onSubmit={handleSubmit}>
                                        <div class="mb-3">
                                          <label
                                            for="recipient-name"
                                            class="col-form-label"
                                          >
                                            Date:
                                          </label>
                                          <Calendar
                                            name="date1"
                                            required
                                            onChange={handleChange1}
                                            minDate={mindate}
                                            maxDate={maxdate}
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            for="message-text"
                                            class="col-form-label"
                                          >
                                            Timing slot:
                                          </label>
                                          <select
                                            className="form-control"
                                            name="time_slot"
                                            onChange={handleChange}
                                          >
                                            <option>--select slot--</option>
                                            {slots.map((val) => {
                                              return <option>{val}</option>;
                                            })}
                                          </select>
                                        </div>
                                        <input
                                          type="submit"
                                          value="Update"
                                          class="btn btn-primary"
                                        />
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col mb-2">
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target={"#exampleModal"+index}
                              >
                                Cancel
                              </button>
                              <div
                                class="modal fade"
                                id={"exampleModal"+index}
                                tabindex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1
                                        class="modal-title fs-5"
                                        id="exampleModalLabel"
                                      >
                                        Cancel Appointment
                                      </h1>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div class="modal-body">
                                      Are you sure you want to cancel your
                                      appointment?
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-primary"
                                        onClick={() => {
                                          cancelAppoint(item._id);
                                        }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      ) : (
                        <>
                          <p className="col mb-2">Cancelled</p>
                        </>
                      ))}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Your_Appoint;
