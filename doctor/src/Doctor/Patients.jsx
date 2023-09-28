import React, { useState, useEffect } from 'react';
import './Patients.scss';
import ReactPaginate from 'react-paginate';
import './PaginationStyle.css';
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
        let response = await fetch("http://localhost:5000/appoints_data", {
          method: "post",
          body: JSON.stringify({ date: date.toDateString(),doctor_mail:localStorage.getItem('email') }),
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
      <div className='main5 d-flex-column p-4'>
        <div>
          <h2 className='animate__animated animate__slideInDown text-theme'>Patients</h2>
        </div>
        <div className='column_patients justify-content-center mt-4 '>
          <div className='d-flex justify-content-between mb-2 mx-2'>
            <h5 className='patients text-theme'>All Patients</h5> 
            <div className='date'><DatePicker onChange={(e) => setdate(new Date(e))} render={<Icon />} /></div>
            {/* to get the selected value from date picker, use usestate just like calendar. */}
          </div>
          <div className='patients_content d-flex'>
            {
              totalItems === 0 ?
                <>
                  <div className='no_appo_text'>There Is No appointments for the date</div>
                </>
                :
                <table className='table table-striped'>
                  <thead>
                    <tr className=''>
                      <th className=''>Sr. No</th>
                      <th className=''>Name</th>
                      <th className=''>Gender</th>
                      <th className=''>Age</th>
                      <th className=''>Weight</th>
                      <th className=''>Contact</th>
                      <th className=''>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    MAP.slice(((currentPage - 1) * itemsPerPage), (currentPage * itemsPerPage)).map((item, index) => {
                      return (
                        <tr className='' key={index}>
                          <th className=''>{item.Sr}</th>
                          <td className=''>{item.Name}</td>
                          <td className=''>{item.Gender}</td>
                          <td className=''>{item.Age}</td>
                          <td className=''>{item.Weight}</td>
                          <td className=''>{item.Contact}</td>
                          <td className=''>
                            {displayedAddress === index ? (
                              <div className=''>
                                <div className='address'>{item.Address}</div>
                                <i className="fa-regular fa-circle-xmark close-button mt-1"  onClick={hideAddress}></i>
                              </div>
                            ) : (
                              <button className="address-btn py-1" onClick={() => showAddress(index)}>Address</button>
                            )}
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
    </>
  )
}

export default Patients

