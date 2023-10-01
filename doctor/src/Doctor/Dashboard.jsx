import React, { useState, useEffect } from 'react';
import DatePicker from "react-multi-date-picker";
import ReactPaginate from 'react-paginate';
import './PaginationStyle.css';
import Icon from "react-multi-date-picker/components/icon";
import './Dashboard.scss';
function Dashboard() {
  const [totalItems, settotalItems] = useState(0); // Total number of items
  const [MAP1, setMAP] = useState([]);
  const [date, setdate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [cancel,setcancel]=useState(0);
  const [approve,setapprove]=useState(0);
  const [reject,setreject]=useState(0);
  const [total,settotal]=useState(0);
  const itemsPerPage = 6; // Number of items per page
  const pageCount = Math.ceil(totalItems / itemsPerPage);// Calculate the total number of pages
  const fetchdata = async () => {
    try {
      let response = await fetch("http://localhost:5000/recent_appoints_data", {
        method: "post",
        // body: JSON.stringify({ date: date.toISOString().slice(0,10)+"T18:30:00.000+00:00" }),
        body: JSON.stringify({ date: date,doctor_mail: localStorage.getItem('email')}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();
      let varcancel=0,varapprove=0,varreject=0,i;
      // console.log(response);
      for(i=0;i<response.name.length;i++){
        if(response.name[i].status_bit===0){
          varcancel+=1;
        }
        if(response.name[i].status_bit===1){
          varapprove+=1;
        }
        if(response.name[i].status_bit===2){
          varreject+=1;
        }
      }
      const map1 = response.name.map((item, index) => {
        return ({
          Sr: index + 1,
          Date: item.date,
          Time: item.time_slot,
          Name: item.firstname + " " + item.lastname,
          Contact: item.contact,
          id: item._id,
          Index: index,
          Status: item.status_bit,
          VisitedBit: item.visited_bit
        })
      })
      // console.log(response);
      setMAP(map1);
      settotalItems(map1.length);
      setapprove(varapprove);
      setcancel(varcancel);
      setreject(varreject);
      settotal(varapprove+varcancel+varreject);
    }
    catch (error) {
      console.error("Error Logging In:", error);
    }
  }
  useEffect(() => {
    fetchdata();
  }, [date]);

  // const setselectfunction = async (index, patientId) => {
  //   try {
  //     const updatedAppointments = [...MAP1];
  //     const appointmentIndex = updatedAppointments.findIndex(
  //       (item) => item.Index === index
        
  //     );
  //       console.log("index",appointmentIndex);
  //     if (appointmentIndex !== -1) {
  //       const updatedAppointment = { ...updatedAppointments[appointmentIndex] };
  //       updatedAppointment.Status =
  //         updatedAppointment.Status === 1 ? 2 : 1;
  //       console.log("appointmnet",updatedAppointment.Date,"status",updatedAppointment.Status,"Visted",updatedAppointment.VisitedBit)
       
  //       if (updatedAppointment.VisitedBit === 0 && new Date(updatedAppointment.Date)>new Date()) {
  //         updatedAppointments[appointmentIndex] = updatedAppointment;
  //         setMAP(updatedAppointments);

  //         const response = await fetch("http://localhost:5000/change_data_dashboard", {
  //           method: "post",
  //           body: JSON.stringify({
  //             s_bit: updatedAppointment.Status,
  //             p_id: patientId,
  //             date: updatedAppointment.Date,
              
  //             // date: date
  //           }),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });


  //         if (!response.ok) {
  //           console.error("Error while updating data");
  //         }
  //       }
  //       else if(new Date(updatedAppointment.Date)<new Date()){
  //         alert("You Can't Change the Status for Past Dates");
  //       }
  //       else if(updatedAppointment.VisitedBit === 1){
  //         alert("You Can't Change the Status of Visited Patient");
  //       }
  //     }
  //   }
  //   catch (error) {
  //     console.error("Error Logging In:", error);
  //   }
  // }
  const rejectAppoint = async (appoint_id) => {
    console.log(appoint_id.toString());
    try {
      let result = await fetch("http://localhost:5000/rejectappoint", {
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
        fetchdata();
      }
      console.warn(result);
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
  };
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // Fetch and update data for the new page
    // You would typically have an array of items and slice it to get the current page's items.
  };
  const MAP = [{
    number: cancel,
    text1: "Cancelled",
    text2: "Appointments",
    count: 1
  },
  {
    number: approve,
    text1: "Approved",
    text2: "Appointments",
    count: 2
  },
  {
    number: reject,
    text1: "Rejected",
    text2: "Appointments",
    count: 3
  }, {
    number: total,
    text1: "Total",
    text2: "Appointments",
    count: 4
  }]
  // const MAP1 = [{
  //   Sr: 1,
  //   Date: '26-02-2020',
  //   Time: '3:00 PM',
  //   Name: 'Karim Ahmed',
  //   Contact: 1234567890,
  //   // Action:<select className='box' onChange={(e)=>setstatus(e.target.value)} value={status} style={{color:"white",backgroundColor:status==='Pending'? "#77C6FF": status==='Approved'? "#38B288" :"#FF7777"}}><option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Cancle">Cancelled</option></select>
  // },
  // {
  //   Sr: 2,
  //   Date: '26-02-2020',
  //   Time: '3:00 PM',
  //   Name: 'Karim Ahmed',
  //   Contact: 1234567890,
  //   // Action:<select className='box' onChange={(e)=>setstatus(e.target.value)} value={status}><option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Cancle">Cancelled</option></select>
  // },
  // {
  //   Sr: 3,
  //   Date: '26-02-2020',
  //   Time: '3:00 PM',
  //   Name: 'Karim Ahmed',
  //   Contact: 1234567890,
  //   // Action:<select className='box' onChange={(e)=>setstatus(e.target.value)} value={status}><option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Cancle">Cancelled</option></select>
  // }, {
  //   Sr: 4,
  //   Date: '26-02-2020',
  //   Time: '3:00 PM',
  //   Name: 'Karim Ahmed',
  //   Contact: 1234567890,
  //   // Action:<select className='box' onChange={(e)=>setstatus(e.target.value)} value={status}><option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Cancle">Cancelled</option></select>
  // }, {
  //   Sr: 5,
  //   Date: '26-02-2020',
  //   Time: '3:00 PM',
  //   Name: 'Karim Ahmed',
  //   Contact: 1234567890,
  //   // Action:<select className='box' onChange={(e)=>setstatus(e.target.value)} value={status}><option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Cancle">Cancelled</option></select>
  // }, {
  //   Sr: 6,
  //   Date: '26-02-2020',
  //   Time: '3:00 PM',
  //   Name: 'Karim Ahmed',
  //   Contact: 1234567890,
  //   // Action:<select className='box' onChange={(e)=>setstatus(e.target.value)} value={status}><option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Cancle">Cancelled</option></select>
  // },
  // {
  //   Sr: 7,
  //   Date: '26-02-2020',
  //   Time: '3:00 PM',
  //   Name: 'Karim Ahmed',
  //   Contact: 1234567890,
  //   // Action:<select className='box' onChange={(e)=>setstatus(e.target.value)} value={status}><option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Cancle">Cancelled</option></select>
  // }]
  return (
    <>
      <div className='main3 p-4'>
        <div className='mb-4'>
          <h2 className='animate__animated animate__slideInDown text-theme'>Dashboard</h2>
        </div>
        {/* <div> */}
        <div className='d-lg-flex justify-content-around patients_number mb-3'>
          {MAP.map((item) => {
            return (<div className={"card" + item.count + " d-flex py-2"}>
              <div className='count py-2 px-4'>{item.number}</div>
              <div className='count-txt px-3'>
                <div className='d-inline'>{item.text1}</div><br />
                <div className='d-inline'>{item.text2}</div>
              </div>
            </div>
            )
          })}
        </div>
        {/* </div> */}


        <div className='column_dashboard py-4'>
          <div className='dashboard_1 d-flex justify-content-between'>
            <h2 className='recent_appo '>Recent Appointments</h2>
            <div className='dates1'><DatePicker onChange={(e) => setdate(new Date(e))} render={<Icon />} /> </div>
          </div>
          {/* to get the selected value from date picker, use usestate just like calendar. */}
          <div className='dashboard_content pt-4'>
            {
              totalItems === 0 ?
                <>
                  <div className='mt-3 fs-18'>There Is No appointments for the date </div>
                </>
                :
                <table className='table table-striped'>
                  <thead className='thead-dark'>
                    <tr>
                      <th >Sr. No</th>
                      <th >Date</th>
                      <th >Time</th>
                      <th >Name</th>
                      <th >Contact</th>
                      <th >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    MAP1.slice(((currentPage - 1) * itemsPerPage), (currentPage * itemsPerPage)).map((item, index) => {
                      return (
                        <tr >
                          <th>{item.Sr}</th>
                          <td >{item.Date.toString().slice(0, 8) + (((parseInt(item.Date.toString()[8] + item.Date.toString()[9]) + 1).toString().length) === 1 ? "0" : "") + (parseInt(item.Date.toString()[8] + item.Date.toString()[9]) + 1)}</td>
                          <td >{item.Time}</td>
                          <td >{item.Name}</td>
                          <td >{item.Contact}</td>
                          {/* <td >
                            {
                              item.Status === 0 ?
                                <button className="cancel-btn py-1" key={index} disabled>
                                  Cancelled
                                </button>
                                :
                                <button
                                className={item.Status === 2 ? 'py-1 rejected-btn' : 'py-1 py-1 approve-btn'} key={index}
                                  onClick={() => setselectfunction(item.Index, item.id)}
                                >
                                  {item.Status === 1 ? "Approved" : "Rejected"}
                                </button>
                            }

                          </td> */}
                          <td>
                          {item.VisitedBit === 1?<><td className="d-flex justify-content-center">Approved</td></>:(item.Status !== 0 ? (
                        item.Status === 2 ? (
                          <>
                            <td className="d-flex justify-content-center">Rejected</td>
                          </>
                        ) : (
                          <td className="d-flex justify-content-center">
                            
                              
                            <span className="">
                              <button
                                type="button"
                                className="cancel-btn py-1"
                                data-bs-toggle="modal"
                                data-bs-target={"#exampleModal"+index}
                                style={{backgroundColor: '#e04646',
                                  color: 'white',
                                  border:0,
                                  borderRadius: '5px !important',
                                  textAlign: 'center',
                                  width:'100px',
                                  outline:'1px solid #de5252'}}
                              >
                                Reject
                              </button>
                              <div
                                className="modal fade"
                                id={"exampleModal"+index}
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
                                        Reject Appointment
                                      </h1>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      Are you sure you want to reject this
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
                                        style={{backgroundColor: '#e04646',
                                  color: 'white',
                                  border:0,
                                  borderRadius: '5px !important',
                                  textAlign: 'center',
                                  width:'100px',
                                  outline:'1px solid #de5252'}}
                                          onClick={() => rejectAppoint(item.id)}
                                        
                                      >
                                        Reject
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
                          <td className="d-flex justify-content-center">Cancelled</td>
                        </>
                      ))}
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </table>
            }
          </div>
          <div className='row  justify-content-around'>
            {/* <div className='col'> */}
            {
              totalItems > itemsPerPage ?
                <ReactPaginate
                  previousLabel={<i class="fa-solid fa-angle-left"></i>}
                  nextLabel={<i class="fa-solid fa-angle-right"></i>}
                  breakLabel={'...'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                /> : ""
            }
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard