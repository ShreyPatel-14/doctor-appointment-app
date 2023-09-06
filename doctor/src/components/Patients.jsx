import React, { useState, useEffect } from 'react';
import './Patients.scss';
import ReactPaginate from 'react-paginate';
// import './PaginationStyle.css';
import '../CheckComponent/Pagination.css';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
function Patients() {
  const [totalItems, settotalItems] = useState(0); // Total number of items
  const [MAP, setMAP] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [date, setdate] = useState(new Date());
  const [displayedAddress, setDisplayedAddress] = useState(null); // Add a new state variable
  const itemsPerPage = 7; // Number of items per page
  const pageCount = Math.ceil(totalItems / itemsPerPage);// Calculate the total number of pages
  useEffect(() => {
    const fetchdata = async () => {
      try {
        let response = await fetch("http://localhost:5001/appoints_data", {
          method: "post",
          body: JSON.stringify({ date: date.toDateString() }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        response = await response.json();
        // console.log(response);
        const MAP1 = response.name.map((item, index) => {
          return ({
            Sr: index + 1,
            Name: item.firstname + " " + item.lastname,
            Gender: item.gender,
            Age: item.age,
            Weight: item.weight,
            Contact: item.contact1,
            Address: item.address,
          })
        })
        // console.log(response);
        setMAP(MAP1);
        settotalItems(MAP1.length);
      }
      catch (error) {
        console.error("Error Logging In:", error);
      }
    }
    fetchdata();
  }, [date]);
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // Fetch and update data for the new page
    // You would typically have an array of items and slice it to get the current page's items.
  };
  // Function to show the address for a specific user
  const showAddress = (index) => {
    setDisplayedAddress(index);
  };
  // Function to hide the displayed address
  const hideAddress = () => {
    setDisplayedAddress(null);
  };
  // const MAP = [{
  //   Sr: 1,
  //   Name: 'Dhairya Patel',
  //   Gender: 'Male',
  //   Age: 19,
  //   Weight: 48.3,
  //   Contact: 1234567890,
  //   Address: '54 Alok Tenament-2, Near Karnvati chokdi, takshila school road, vastral'
  // },
  // {
  //   Sr: 2,
  //   Name: 'Dhairya Patel',
  //   Gender: 'Male',
  //   Age: 19,
  //   Weight: 48.3,
  //   Contact: 1234567890,
  //   Address: '54 Alok Tenament-2, Near Karnvati chokdi, takshila school road, vastral'
  // },
  // {
  //   Sr: 3,
  //   Name: 'Dhairya Patel',
  //   Gender: 'Male',
  //   Age: 19,
  //   Weight: 48.3,
  //   Contact: 1234567890,
  //   Address: '54 Alok Tenament-2, Near Karnvati chokdi, takshila school road, vastral'
  // }, {
  //   Sr: 4,
  //   Name: 'Dhairya Patel',
  //   Gender: 'Male',
  //   Age: 19,
  //   Weight: 48.3,
  //   Contact: 1234567890,
  //   Address: '54 Alok Tenament-2, Near Karnvati chokdi, takshila school road, vastral'
  // }, {
  //   Sr: 5,
  //   Name: 'Dhairya Patel',
  //   Gender: 'Male',
  //   Age: 19,
  //   Weight: 48.3,
  //   Contact: 1234567890,
  //   Address: '54 Alok Tenament-2, Near Karnvati chokdi, takshila school road, vastral'
  // }, {
  //   Sr: 6,
  //   Name: 'Dhairya Patel',
  //   Gender: 'Male',
  //   Age: 19,
  //   Weight: 48.3,
  //   Contact: 1234567890,
  //   Address: '54 Alok Tenament-2, Near Karnvati chokdi, takshila school road, vastral'
  // }, {
  //   Sr: 7,
  //   Name: 'Dhairya Patel',
  //   Gender: 'Male',
  //   Age: 19,
  //   Weight: 48.3,
  //   Contact: 1234567890,
  //   Address: '54 Alok Tenament-2, Near Karnvati chokdi, takshila school road, vastral'
  // }, {
  //   Sr: 8,
  //   Name: 'Dhairya Patel',
  //   Gender: 'Male',
  //   Age: 19,
  //   Weight: 48.3,
  //   Contact: 1234567890,
  //   Address: '54 Alok Tenament-2, Near Karnvati chokdi, takshila school road, vastral',
  // },
  // {
  //   Sr: 9,
  //   Name: 'Dhairya Patel',
  //   Gender: 'Male',
  //   Age: 19,
  //   Weight: 48.3,
  //   Contact: 1234567890,
  //   Address: '54 Alok Tenament-2, Near Karnvati chokdi, takshila school road, vastral'
  // },
  // {
  //   Sr: 10,
  //   Name: 'Dhairya Patel',
  //   Gender: 'Male',
  //   Age: 19,
  //   Weight: 48.3,
  //   Contact: 1234567890,
  //   Address: '54 Alok Tenament-2, Near Karnvati chokdi, takshila school road, vastral',
  // }
  // ]
  return (
    <>
      <div className='main'>
        <div>
          <h2 className='animate__animated animate__slideInDown'>Patients</h2>
        </div>
        <div className='column_patients'>
          <div className='d-flex justify-content-between'>
            <h2 className='patients'>All Patients</h2>
            <div className='date'><DatePicker onChange={(e) => setdate(new Date(e))} render={<Icon />} /></div>
            {/* to get the selected value from date picker, use usestate just like calendar. */}
          </div>
          <div className='patients_content'>
            {
              totalItems === 0 ?
                <>
                  <div className='no_appo_text'>There Is No appointments for the date</div>
                </>
                :
                <>
                  <div className='row mb-1 justify-content-around head'>
                    <div className='col col-1 mb-3'>Sr. No</div>
                    <div className='col col-2 mb-3'>Name</div>
                    <div className='col col-1 mb-3'>Gender</div>
                    <div className='col col-1 mb-3'>Age</div>
                    <div className='col col-1 mb-3'>Weight</div>
                    <div className='col col-2 mb-3'>Contact</div>
                    <div className='col col-4 mb-3'>Address</div>
                  </div>
                  {
                    MAP.slice(((currentPage - 1) * itemsPerPage), (currentPage * itemsPerPage)).map((item, index) => {
                      return (
                        <div className='row mb-1 justify-content-around text' key={index}>
                          <div className='col col-1 mb-2'>{item.Sr}</div>
                          <div className='col col-2 mb-2'>{item.Name}</div>
                          <div className='col col-1 mb-2'>{item.Gender}</div>
                          <div className='col col-1 mb-2'>{item.Age}</div>
                          <div className='col col-1 mb-2'>{item.Weight}</div>
                          <div className='col col-2 mb-2'>{item.Contact}</div>
                          <div className='col col-4 mb-2'>
                            {displayedAddress === index ? (
                              <div className='row'>
                                <div className='col address'>{item.Address}</div>
                                <i className="col fa-regular fa-circle-xmark close-button"  onClick={hideAddress}></i>
                              </div>
                            ) : (
                              <button className="address-button" onClick={() => showAddress(index)}>Address</button>
                            )}
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
    </>
  )
}

export default Patients

