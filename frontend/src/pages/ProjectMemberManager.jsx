import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const UserManager = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([{}]);
  const [inviteId, setInviteId] = useState('');
  const [filter, setFilter] = useState('');


  useEffect(() => {

    const array = [
      { name: "Alice Johnson", role: "Admin" },
      { name: "Bob Smith", role: "Developer" },
      { name: "Charlie Brown", role: "Manager" },
      { name: "Diana Prince", role: "Submitter" },
      { name: "Ethan Clark", role: "Developer" },
      { name: "Fiona Lee", role: "Submitter" },    
      { name: "Bruce Wayne", role: "" },
      { name: "Bruce Banner", role: "" },
      { name: "Tony Stark", role: "" },
    ];
    setUsers(array)
  },[])


const getColor = (role) => {
  switch (role) {
    case "Admin":
      return "bg-red-500 text-white font-semibold hover:bg-red-600";       // strong red
    case "Manager":
      return "bg-orange-400 text-white font-semibold hover:bg-orange-500"; // softer, warm orange
    case "Developer":
      return "bg-blue-500 text-white font-semibold hover:bg-blue-600";      // nice blue
    case "Submitter":
      return "bg-purple-500 text-white font-semibold hover:bg-purple-700"; // vibrant purple
    default:
      return "bg-gray-400 text-white font-semibold hover:bg-gray-600";      // neutral gray
  }
};

  const row = (name, userRole, roleCategory, key) => {
    
    if(userRole == roleCategory)
    return (
      <div
        onClick={() => handleClick(name)}
        key={key}
        className={`px-4 py-2 ${getColor(userRole)} rounded cursor-pointer transition-transform transform hover:scale-105 hover:shadow-md`}
      >
        <p className="flex flex-wrap">{name}</p>
      </div>
    );
  };

  const handleClick = (title) => {
    alert(`You clicked on: ${title}`);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You typed: ${inviteId}`);
  };
 
  const handleFilter = async (e) => {
    e.preventDefault();
    await setFilter(e.target.value);
  };

  return (
    <div>


        <div className='mt-5 px-4 h-96 py-2 bg-white  rounded grid-rows-2  shadow-gray-900 h-auto min-w-130'>
            

            <h1 className='self-center text-center font-bold text-3xl pt-5 pb-5 border-b-3'>Unassigned Users</h1>  
            
            <div>
            <input type="text" className='border-1 mt-5 mb-5 py-1 p-1' />
            <select
                value={filter}
                onChange={handleFilter}
                className="border rounded px-3 py-1 ml-4 bg-white shadow"
            >
                <option value="">All</option>
                {Array.from({ length: 26 }, (_, i) => {
                const letter = String.fromCharCode(65 + i); // A-Z
                return (
                    <option key={letter} value={letter}>
                    {letter}
                    </option>
                );
                })}
            </select>
                
            </div>
            <div className='grid grid-rows-4 '>
                
                <div>
                    <div className="flex flex-wrap gap-2">
                        {users.map((user, index) =>
                        row(user.name, user.role, "", index)
                        )}
                    </div>
                </div>

            </div>
            
        </div>

        <div className='mt-5 px-4 h-96 py-2 bg-white  rounded grid-rows-2  shadow-gray-900 h-auto min-w-130'>
            <h1 className='self-center text-center font-bold text-3xl pt-5 pb-5 border-b-3'>Assigned Users</h1>  
            <div className='grid grid-rows-4 '>
                
                <div>
                <p className='m-auto h-auto font-bold'>Admin</p>
                <div className="flex flex-wrap gap-2">
                    {users.map((user, index) =>
                    row(user.name, user.role, "Admin", index)
                    )}
                </div>
                </div>

                <div>
                <p className='m-auto h-auto font-bold'>Project Manager</p>
                <div className="flex flex-wrap gap-2">
                    {users.map((user, index) =>
                    row(user.name, user.role, "Manager", index)
                    )}
                </div>
                </div>

                <div>
                <p className='m-auto h-auto font-bold'>Developer</p> 
                <div className="flex flex-wrap gap-2">
                    {users.map((user, index) =>
                    row(user.name, user.role, "Developer", index)
                    )}
                </div>   
                </div>

                <div>
                <p className='m-auto h-auto font-bold'>Submitter</p>
                <div className="flex flex-wrap gap-2">
                    {users.map((user, index) =>
                    row(user.name, user.role, "Submitter", index)
                    )}
                </div>
                </div>

            </div>
            
        </div>
    </div>
  )
}

export default UserManager
