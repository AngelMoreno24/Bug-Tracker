import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth"; 
import { listCompanyMembers } from '../api/CompanyMemberAPI';
import { getPossibleProjectMembers, getProjectMembers, addProjectMember } from '../api/ProjectMemberAPI'
import AddProjectMemberForm from "../components/forms/AddProjectMemberForm";

import Modal from "../components/Modal"; // adjust the path as needed
const UserManager = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [inviteId, setInviteId] = useState('');
  const [filter, setFilter] = useState('');

  const { id } = useParams();  // <-- grabs "id" from the URL


  // retrieves token and user data from authContext
  const {  token  } = useAuth();


  const [projectMembers, setProjectMembers] = useState([]);

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //                         Fetches destails for Company members
  /////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
      if (token) {
          fetchProjectMembers();
          fetchPossibleProjectMembers();
      }
  }, [token]);

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //                                         Assiged Member Details
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const fetchProjectMembers = async () => {
    try {
        const members = await getProjectMembers(id, token); // 🔑 use token from context
        console.log(members);
        console.log(members);
        console.log(members);
        console.log(members);
        console.log(members);
        console.log(members);
        console.log(members);
        console.log(members);
        console.log(members);
        console.log(members);
        console.log(members);

        setUsers(members)


    } catch (err) {
        console.error(err.message);
    }
  };


  /////////////////////////////////////////////////////////////////////////////////////////////////
  //                                        Unassigned Member Details
  /////////////////////////////////////////////////////////////////////////////////////////////////


  const [unassignedProjectMembers, setUnassignedProjectMembers] = useState([]);
  
  const fetchPossibleProjectMembers = async () => {
    try {
        const members = await getPossibleProjectMembers(id, token); // 🔑 use token from context
        console.log(members);
        console.log(members);
        console.log(members);
        setUnassignedProjectMembers(members)


    } catch (err) {
        console.error(err.message);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //                                          Assign Role Modal
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const [addProjectMemberOpen, setAddProjectMemberOpen] = useState(false);
  const [projectMemberForm, setProjectMemberForm] = useState();

  const handleAddProjectMember = async (name, key) =>{

    console.log(projectMemberForm)

    
    await addProjectMember(id, projectMemberForm.id, projectMemberForm.role, token)
    //await createProject(projectForm.title, projectForm.description, projectForm.companyId, token)
    //await fetchProjects() 


    setProjectMemberForm({ name: "", role: "" });
    setAddProjectMemberOpen(false);
  }

  

  const unassignedRow = (name, userRole, roleCategory, key, id) => {
    


    console.log(id)
    return (
      <div
        onClick={() => {
          setAddProjectMemberOpen(true)
          setProjectMemberForm({name: name, role: "Developer", id:id} )
      }}
        key={key}
        className={`px-4 py-2 ${getColor(userRole)} rounded cursor-pointer transition-transform transform hover:scale-105 hover:shadow-md`}
      >
        <p className="flex flex-wrap">{name}</p>
      </div>
    );
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //                                          Other
  /////////////////////////////////////////////////////////////////////////////////////////////////










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
    
    if(userRole == roleCategory || roleCategory == "")
    return (
      <div
        onClick={() => {
          setAddProjectMemberOpen(true)
          setProjectMemberForm({name: name, role: "developer"} )
      }}
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

            {

            /////////////////////////////////////////////////////////////////////////////////////////////////
            //                                          List Unassigned Users
            /////////////////////////////////////////////////////////////////////////////////////////////////

            }
            <div className='grid grid-rows-4 '>
                
                <div>
                    <div className="flex flex-wrap gap-2">
                        {unassignedProjectMembers.map((user, index) =>
                        unassignedRow(user.name, user.role, "", index, user.id)
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
        
      {addProjectMemberOpen && (
        <Modal title={projectMemberForm.name} onClose={() => setAddProjectMemberOpen(false)} onSave={handleAddProjectMember}>
          <AddProjectMemberForm projectMemberForm={projectMemberForm} setProjectMemberForm={setProjectMemberForm} />
        </Modal>
      )}
    </div>
  )
}

export default UserManager
