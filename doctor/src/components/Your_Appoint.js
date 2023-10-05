import React, { useEffect, useState } from "react";
import "./Your_Appoint.scss";
import Calendar from "react-calendar";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
function Your_Appoint() {
  const [totalItems, settotalItems] = useState(0);
  const [data, setData] = useState([]);
  const [obj, setObj] = useState({});
  const [id, setId] = useState("");
  const [docName, setDocName] = useState("");
  const [slots, setSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  var currentdate = new Date();
  var mindate = new Date();
  mindate.setDate(currentdate.getDate() + 1);
  var maxdate = new Date();
  maxdate.setDate(currentdate.getDate() + 30);

  const fetchData = async () => {
    try {
      let result = await fetch(
        "http://localhost:8000/api/users/yourappoints/",
        {
          method: "post",
          body: JSON.stringify({
            email: localStorage.getItem("email"),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = await result.json();
      if (result.error) {
        console.log(result.error);
      } else if (result.message) {
        console.log(result.history);
        setData(result.history);
        console.log(result.history.length);
        settotalItems(result.history.length);
      }
      console.warn(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const cancelAppoint = async (appoint_id) => {
    console.log(appoint_id.toString());
    try {
      let result = await fetch(
        "http://localhost:8000/api/users/cancelappoint/",
        {
          method: "post",
          body: JSON.stringify({
            appoint_id: appoint_id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = await result.json();
      if (result.error) {
        console.log(result.error);
      } else if (result.message) {
        console.log(result.message);
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
      console.log(date, time_slot);
      let result = await fetch(
        "http://localhost:8000/api/users/updateappoint/",
        {
          method: "post",
          body: JSON.stringify({
            appoint_id: id,
            date: date,
            time_slot: time_slot,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = await result.json();
      if (result.error) {
        console.log(result.error);
      } else if (result.message) {
        console.log(result.message);
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
    const value = new Date(e);
    setObj({ ...obj, ["date"]: format(value, "yyyy-MM-dd") });
    // console.log(format(value, 'yyyy-MM-dd'))
    // console.log(docName);

    try {
      let result = await fetch("http://localhost:8000/api/users/updatemodal/", {
        method: "post",
        body: JSON.stringify({
          appoint_id: id,
          date: format(value, "yyyy-MM-dd"),
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
    e.preventDefault();
    updateAppoint(obj);
  };
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // Fetch and update data for the new page
    // You would typically have an array of items and slice it to get the current page's items.
  };
  return (
    <>
      <div className="p-5 your-appointment">
        <div className="my-5">
          <h2 className="">Your Appointments</h2>
          <div style={{ height: "1px", backgroundColor: "lightgray" }}></div>
        </div>
        <div className="">
          <div className="d-flex">
            {/* <div className='date'><DatePicker onChange={(e) => setdate(new Date(e))} render={<Icon />} /></div> */}
            {/* to get the selected value from date picker, use usestate just like calendar. */}
          </div>
          <div className="d-flex justify-content-center mx-3 ">
            {data.length === 0 ? (
              <>
                <div className="fs-2 h-32">
                  There is No appointments for the user
                </div>
              </>
            ) : (
              <table className="table table-striped">
                <thead className="">
                  <tr>
                    <th scope="col">Sr. No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Specialisation</th>
                    <th scope="col">Doctor Name</th>
                    <th scope="col">Time Slot</th>
                    <th scope="col" className="d-flex justify-content-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item, index) => {
                      var newdate = new Date(item.date);
                      return (
                        <tr className="" key={index}>
                          <th>
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </th>
                          <td className="">
                            {item.firstname + " " + item.lastname}
                          </td>
                          <td className="">
                            {newdate.getDate() +
                              "/" +
                              (newdate.getMonth() + 1) +
                              "/" +
                              newdate.getFullYear()}
                          </td>
                          <td className="">{item.specialisation_1}</td>
                          <td className="">{item.doctor_name}</td>
                          <td className="">{item.time_slot}</td>
                          {/* {item.status_bit===0?<><p className="col mb-2">Cancelled</p></>
                      :<><div className="col mb-2">
                        <button>Update</button>
                      </div>
                      <div className="col mb-2">
                        <button onClick={()=>{cancelAppoint(item._id)}}>Cancel</button>
                      </div></>} */}
                          {item.visited_bit === 1 ? (
                            <>
                              <td className="d-flex justify-content-center">
                                Approved
                              </td>
                            </>
                          ) : item.status_bit !== 0 ? (
                            item.status_bit === 2 ? (
                              <>
                                <td className="d-flex justify-content-center">
                                  Rejected
                                </td>
                              </>
                            ) : (
                              <td className="d-flex justify-content-center">
                                <span className="">
                                  <button
                                    type="button"
                                    className="btn-update py-1 mx-2"
                                    data-bs-toggle="modal"
                                    data-bs-target={
                                      "#exampleModalLabel" + index
                                    }
                                    data-bs-whatever="@mdo"
                                    onClick={() => {
                                      setId(item.id);
                                      setDocName(item.doctor_name);
                                    }}
                                  >
                                    Update
                                  </button>

                                  <div
                                    className="modal fade"
                                    id={"exampleModalLabel" + index}
                                    tabindex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                  >
                                    <div className="modal-dialog">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <h1
                                            className="modal-title fs-5"
                                            id="exampleModalLabel"
                                          >
                                            Update Appointment
                                          </h1>
                                          <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                        <div className="modal-body">
                                          <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                              <label
                                                for="recipient-name"
                                                className="col-form-label"
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
                                            <div className="mb-4">
                                              <label
                                                for="message-text"
                                                className="col-form-label"
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

                                            <div className="modal-footer d-flex justify-content-center">
                                              <input
                                                type="submit"
                                                value="Update"
                                                className=" btn-update py-1"
                                              />
                                            </div>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </span>
                                <span className="">
                                  <button
                                    type="button"
                                    className="cancel-btn py-1"
                                    data-bs-toggle="modal"
                                    data-bs-target={"#exampleModal" + index}
                                  >
                                    Cancel
                                  </button>
                                  <div
                                    className="modal fade"
                                    id={"exampleModal" + index}
                                    tabindex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                  >
                                    <div className="modal-dialog">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <h1
                                            className="modal-title fs-5"
                                            id="exampleModalLabel"
                                          >
                                            Cancel Appointment
                                          </h1>
                                          <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                        <div className="modal-body">
                                          Are you sure you want to cancel your
                                          appointment?
                                        </div>
                                        <div className="modal-footer">
                                          <button
                                            type="button"
                                            className="close-btn py-1"
                                            data-bs-dismiss="modal"
                                          >
                                            Close
                                          </button>
                                          <button
                                            type="button"
                                            className="cancel-btn py-1"
                                            onClick={() => {
                                              cancelAppoint(item.id);
                                            }}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </span>
                              </td>
                            )
                          ) : (
                            <>
                              <td className="d-flex justify-content-center">
                                Cancelled
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
          {/* <tbody>
                  {data.slice(((currentPage - 1) * itemsPerPage), (currentPage * itemsPerPage)).map((item, index) => {
                    var newdate = new Date(item.date);
                    return (
                      <tr
                        className=""
                        key={index}
                      >
                        <th>{(index + 1)+(currentPage-1)*(itemsPerPage)}</th>
                        <td className="">
                          {item.firstname + " " + item.lastname}
                        </td>
                        <td className="">
                          {newdate.getDate() +
                            "/" +
                            (newdate.getMonth() + 1) +
                            "/" +
                            newdate.getFullYear()}
                        </td>
                        <td className="">
                          {item.specialisation}
                        </td>
                        <td className="">{item.doctor_name}</td>
                        <td className="">{item.time_slot}</td>
                        
                        {item.visited_bit === 1 ? <><td className="d-flex justify-content-center">Approved</td></> : (item.status_bit !== 0 ? (
                          item.status_bit === 2 ? (
                            <>
                              <td className="d-flex justify-content-center">Rejected</td>
                            </>
                          ) : (
                            <td className="d-flex justify-content-evenly">
                              <span className="">
                                <button
                                  type="button"
                                  className="btn btn-primary px-3 py-1"
                                  data-bs-toggle="modal"
                                  data-bs-target={"#exampleModalLabel" + index}
                                  data-bs-whatever="@mdo"
                                  onClick={() => {
                                    setId(item._id);
                                    setDocName(item.doctor_name);
                                  }}
                                >
                                  Update
                                </button>

                                <div
                                  className="modal fade"
                                  id={"exampleModalLabel" + index}
                                  tabindex="-1"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h1
                                          className="modal-title fs-5"
                                          id="exampleModalLabel"
                                        >
                                          Update Appointment
                                        </h1>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <form onSubmit={handleSubmit}>
                                          <div className="mb-3">
                                            <label
                                              for="recipient-name"
                                              className="col-form-label"
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
                                          <div className="mb-4">
                                            <label
                                              for="message-text"
                                              className="col-form-label"
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

                                          <div className="modal-footer d-flex justify-content-center">

                                            <input
                                              type="submit"
                                              value="Update"
                                              className=" btn btn-primary px-4 py-2"
                                            />

                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </span>
                              <span className="">
                                <button
                                  type="button"
                                  className="btn btn-primary px-3 py-1"
                                  data-bs-toggle="modal"
                                  data-bs-target={"#exampleModal" + index}
                                >
                                  Cancel
                                </button>
                                <div
                                  className="modal fade"
                                  id={"exampleModal" + index}
                                  tabindex="-1"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h1
                                          className="modal-title fs-5"
                                          id="exampleModalLabel"
                                        >
                                          Cancel Appointment
                                        </h1>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        Are you sure you want to cancel your
                                        appointment?
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-primary"
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
                              </span>
                            </td>
                          )
                        ) : (
                          <>
                            <td className="d-flex justify-content-center ">Cancelled</td>
                          </>
                        ))}
                      </tr>
                    );
                  })}
                </tbody> */}
        </div>
        <div className="row mb-1 justify-content-around">
          {totalItems > itemsPerPage ? (
            <ReactPaginate
              previousLabel={<i class="fa-solid fa-angle-left"></i>}
              nextLabel={<i class="fa-solid fa-angle-right"></i>}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Your_Appoint;
