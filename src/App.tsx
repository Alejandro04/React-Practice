import { useGetUsers } from './use-get-users'
import { UserList } from './UserList';
import './App.css'

export default function App() {
  const { 
    users, 
    setFilteredUsers, 
    orderUsers, 
    setOrderUsers, 
    setUsers, 
    originalUsers,
    handleNext,
    handlePrev,
    indexPages,
    selectCurrentPage
  } = useGetUsers();

  const handleDelete = (email: string) => {
    const usersFiltered = users.filter((user) => user.email !== email)
    setUsers(usersFiltered)
  }

  return (
    <>
      <div className="dashboardContainer">
        <div className="sidebar">
          <ul>
            <li>Users</li>
          </ul>
        </div>
        <div className="content">
          <div className='actionsContainer'>
            <div>
              <button onClick={() => setOrderUsers(!orderUsers)}>
                Ordenar por país
              </button>
            </div>
            <div>
              <button onClick={() => setUsers(originalUsers.current)}>
                Estado inicial
              </button>
            </div>
            <div>
              <input type="text" name="userFilter" id="userFilter" aria-label="userFilter"
                onChange={(event) => setFilteredUsers(event.target.value)} />
            </div>
          </div>
          <UserList users={users} handleDelete={handleDelete} />
          <div className="paginationContainer">
            <button onClick={() => handlePrev()}>Prev</button>      
            <p>
              {
                indexPages && indexPages.map((index) => {
                  return(
                    <span key={index} onClick={() => selectCurrentPage(index)}> {index} </span>
                  )
                })
              }
            </p>      
            <button onClick={() => handleNext()}>Next</button>
          </div>
        </div>
      </div>
    </>
  )
}

