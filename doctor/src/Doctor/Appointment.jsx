import React, { useState, useEffect } from 'react';
import './Appointment.scss'
import ReactPaginate from 'react-paginate';
import './PaginationStyle.css';
import Calendar from 'react-calendar';
import { format } from "date-fns";
import './calendar.css';
function Appointment() {
  const [totalItems, settotalItems] = useState(0); // Total number of items
  const [MAP, setMAP] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [date, setdate] = useState(new Date());
  // const [mystyle,setmyStyle]=useState({});
  const itemsPerPage = 7; // Number of items per page
  const pageCount = Math.ceil(totalItems / itemsPerPage);// Calculate the total number of pages

  // useEffect(() => {
  //   const fetchdata_initial = async () => {
  //     try {
  //       let response = await fetch("http://localhost:8000/api/doctors/appoints_data/", {
  //         method: "post",
  //         body: JSON.stringify({ date: format(date, "yyyy-MM-dd"), doctor_mail:localStorage.getItem("email")  }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (response.message) {
  //         response = await response.json();

  //         const MAP1 = response.appoint.map((item, index) => {
  //           return ({
  //             Name: item.firstname + " " + item.lastname,
  //             Schedule: item.time_slot,
  //             VisitedBit: item.visited_bit,
  //             id: item.id,
  //             Index: index,
  //             Status: item.status_bit,
  //             Date: item.date
  //           })
  //         })
  //         setMAP(MAP1);
  //         settotalItems(MAP1.length);
  //       }
  //       else {
  //         console.error("Error while fetching data");
  //       }
  //     }
  //     catch (error) {
  //       console.error("Error Logging In:", error);
  //     }
  //   }
  //   fetchdata_initial();
  // }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let result = await fetch("http://localhost:8000/api/doctors/appoints_data/", {
          method: "post",
          body: JSON.stringify({ date: format(date, "yyyy-MM-dd"),doctor_mail:localStorage.getItem("email") }),
          headers: {
            "content-type": "application/json",
          },
        });
        result=await result.json()
        if (result.message) {
          
          console.log(result.message)
          const MAP1 = result.appoint.map((item, index) => {
            return ({
              Name: item.firstname + " " + item.lastname,
              Schedule: item.time_slot,
              VisitedBit: item.visited_bit,
              id: item.id,
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

          const response = await fetch("http://localhost:8000/api/doctors/change_data/", {
            method: "post",
            body: JSON.stringify({
              v_bit: updatedAppointment.VisitedBit,
              p_id: patientId,
              // date: format(date, "yyyy-MM-dd"),
              // doctor_mail:localStorage.getItem("email")
            }),
            headers: {
              "content-type": "application/json",
            },
          });
          if(response.message)
          {
            console.log('updated successfully')
          }
        }
        else if(updatedAppointment.VisitedBit===1){
          alert("Patient have already visited so you can\'t change status to 'Not Visited'");
        }
        else if(new Date(updatedAppointment.Date)>new Date()){
          alert("Status can\'t be changed for future dates");
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

  return (
    <>
      <div className='main2 p-4'>
        <div className='container-1'>
          <h2 className='animate__animated animate__slideInDown text-theme'>Appointments</h2>
        </div>
        <div className='d-md-flex container-2 pt-5'>
          <div className=''>
            <Calendar onChange={(e) => setdate(e)} value={date} />
          </div>
          <div className='column_appointment px-3'>
            <div className='d-flex justify-content-between pt-2'>
              <h2 className='appointments'>Appointments</h2>
              <div className='dates'>{date.toDateString()}</div>
            </div>
            <div className='appointments_content pt-4'>
              {
                totalItems === 0 ?
                  <>
                    <div className='no-appo'>There is no appointments for this date </div>
                  </>
                  :
                  <table className='table table-striped'>
                    <thead className=''>
                      <tr>
                        <th className=''>Name</th>
                        <th className=''>Schedule</th>
                        <th className=''>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      MAP.slice(((currentPage - 1) * itemsPerPage), (currentPage * itemsPerPage)).map((item, index) => {
                        return (
                          <tr >
                            <td className=''>{item.Name}</td>
                            <td className=''>{item.Schedule}</td>
                            <td className=''>
                              {
                                item.Status === 1 ?
                                  <button
                                    className="btn-visit py-1"
                                    key={index}
                                    onClick={() => setselectfunction(item.Index, item.id)}
                                  >
                                    {item.VisitedBit === 1 ? "Visited" : "Not Visited"}
                                  </button>
                                  :
                                  <button className={item.Status === 0 ? "cancel-btn py-1" : "reject-btn py-1"} disabled>
                                    {item.Status === 0 ? "Cancelled" : "Rejected"}
                                  </button>
                              }
                            </td>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
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


