import React, { useState, useEffect } from 'react';
import './Appointment.scss'
import ReactPaginate from 'react-paginate';
import './PaginationStyle.css';
import Calendar from 'react-calendar';
import './calendar.css';
function Appointment() {
  const [totalItems, settotalItems] = useState(0); // Total number of items
  const [MAP, setMAP] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [date, setdate] = useState(new Date());
  // const [mystyle,setmyStyle]=useState({});
  const itemsPerPage = 7; // Number of items per page
  const pageCount = Math.ceil(totalItems / itemsPerPage);// Calculate the total number of pages

  useEffect(() => {
    const fetchdata_initial = async () => {
      try {
        let response = await fetch("http://localhost:5000/appoints_data", {
          method: "post",
          body: JSON.stringify({ date: date.toDateString() }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          response = await response.json();

          const MAP1 = response.name.map((item, index) => {
            return ({
              Name: item.firstname + " " + item.lastname,
              Schedule: item.time_slot,
              VisitedBit: item.visited_bit,
              id: item._id,
              Index: index,
              Status: item.status_bit,
              Date: item.date
            })
          })
          setMAP(MAP1);
          settotalItems(MAP1.length);
        }
        else {
          console.error("Error while fetching data");
        }
      }
      catch (error) {
        console.error("Error Logging In:", error);
      }
    }
    fetchdata_initial();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let response = await fetch("http://localhost:5000/appoints_data", {
          method: "post",
          body: JSON.stringify({ date: date,doctor_mail:localStorage.getItem("email") }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          response = await response.json();

          const MAP1 = response.name.map((item, index) => {
            return ({
              Name: item.firstname + " " + item.lastname,
              Schedule: item.time_slot,
              VisitedBit: item.visited_bit,
              id: item._id,
              Index: index,
              Status: item.status_bit,
              Date: item.date
              
            })
          })
          setMAP(MAP1);
          settotalItems(MAP1.length);
        }
        else {
          console.error("Error while fetching the data");
        }
      }
      catch (error) {
        console.error("Error Logging In:", error);
      }
    }
    fetchdata();
  }, [date]);

  const setselectfunction = async (index, patientId) => {
    try {
      const updatedAppointments = [...MAP];
      const appointmentIndex = updatedAppointments.findIndex(
        (item) => item.Index === index
      );

      if (appointmentIndex !== -1) {
        const updatedAppointment = { ...updatedAppointments[appointmentIndex] };
        if (new Date(updatedAppointment.Date) < new Date() && updatedAppointment.VisitedBit === 0) {
          // updatedAppointment.VisitedBit = (updatedAppointment.VisitedBit === 1 ? 0 : 1);
          updatedAppointment.VisitedBit = 1;
          updatedAppointments[appointmentIndex] = updatedAppointment;
          setMAP(updatedAppointments);

          const response = await fetch("http://localhost:5000/change_data", {
            method: "post",
            body: JSON.stringify({
              v_bit: updatedAppointment.VisitedBit,
              p_id: patientId,
              date: date,
              doctor_mail:localStorage.getItem("email")
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            console.error("Error while updating data");
          }
        }
        else if(updatedAppointment.VisitedBit===1){
          alert("Patient Is Already Visited So You Cannot Change Status to 'Not Visited'");
        }
        else if(new Date(updatedAppointment.Date)>new Date()){
          alert("Status Is not change for future dates");
        }
      }
    }
    catch (error) {
      console.error("Error Logging In:", error);
    }
  }

  const handlePageClick = (selectedPage) => {

    setCurrentPage(selectedPage.selected + 1);
    // Fetch and update data for the new page
    // You would typically have an array of items and slice it to get the current page's items.
  };
  // const hoverStyle = (s_bit,index) =>{
  //   const elements = document.getElementsByClassName("box_cr");

  //   if (index >= 0 && index < elements.length) {
  //     elements[index].style.backgroundColor = "white";
  //     elements[index].style.color = s_bit===0?"#F1526E":"#FF7777";
  //   }
  //   // const style={
  //   //   backgroundColor:"white",
  //   //   color:s_bit===0?"#F1526E":"#FF7777"
  //   // }
  //   // setmyStyle(style);
  // }
  // const WhoverStyle = (s_bit,index) =>{
  //   const elements = document.getElementsByClassName("box_cr");

  // if (index >= 0 && index < elements.length) {
  //   elements[index].style.backgroundColor = s_bit === 0 ? "#F1526E" : "#FF7777";
  //   elements[index].style.color = "white";
  // }
  //   // const style={
  //   //   backgroundColor:s_bit===0?"#F1526E":"#FF7777",
  //   //   color:"white"
  //   // }
  //   // setmyStyle(style);
  // }
  return (
    <>
      <div className='main2'>
        <div className='container-1'>
          <h2 className='animate__animated animate__slideInDown'>Appointments</h2>
        </div>
        <div className='row container-2'>
          <div className='col-md'>
            <Calendar onChange={(e) => setdate(e)} value={date} />
            {/* minDate={new Date()}  */}
          </div>
          <div className='col-md column_appointment'>
            <div className='d-flex justify-content-between'>
              <h2 className='appointments'>Appointments</h2>
              <div className='dates'>{date.toDateString()}</div>
            </div>
            <div className='appointments_content'>
              {
                totalItems === 0 ?
                  <>
                    <div className='no_appo_text'>There Is No appointments for the date </div>
                  </>
                  :
                  <>
                    <div className='row justify-content-around heads'>
                      <div className='col mb-3'>Name</div>
                      <div className='col mb-3'>Schedule</div>
                      <div className='col mb-3'>Action</div>
                    </div>
                    {
                      MAP.slice(((currentPage - 1) * itemsPerPage), (currentPage * itemsPerPage)).map((item, index) => {
                        return (
                          <div className='row justify-content-around text'>
                            <div className='col mb-3'>{item.Name}</div>
                            <div className='col mb-3'>{item.Schedule}</div>
                            <div className='col mb-3'>
                              {
                                item.Status === 1 ?
                                  <button
                                    className="box"
                                    key={index}
                                    onClick={() => setselectfunction(item.Index, item.id)}
                                  >
                                    {item.VisitedBit === 1 ? "Visited" : "Not Visited"}
                                  </button>
                                  :
                                  <button className='box_cr' style={{ backgroundColor: item.Status === 0 ? "#F1526E" : "#FF7777" }} disabled>
                                    {item.Status === 0 ? "Cancelled" : "Rejected"}
                                  </button>
                              }
                            </div>
                          </div>
                        )
                      })
                    }
                  </>
              }
            </div>
            <div className='row mb-1 justify-content-around'>
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
      </div>
    </>
  )
}

export default Appointment


