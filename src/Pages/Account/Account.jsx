import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Account.css"
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig';
import { useMyContext } from '../../ContextPage';
import UpdateProjectForm from '../../Components/UpdateProject/UpdateProject';
import axios from 'axios';

const Account = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [industrySector, setIndustrySector] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [show,setShow] = useState(false);
   const [updatedData,setUpdatedData] = useState(null);
 
  const {apiUrl,user,projects,getProjects} = useMyContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };



  const showUpdateModal=async(item)=>{
    setUpdatedData({...item});
    setShow(true);
  }


  const getData=async()=>{
    const uid = user.uid;
    console.log(uid)
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setName(docSnap.data().name)
      setEmail(docSnap.data().email)
      setAddress(docSnap.data().address)
      setIndustrySector(docSnap.data().sector)
      setDescription(docSnap.data().description)
      setPhone(docSnap.data().phone)
      setWebsite(docSnap.data().website)



     console.log("Document data:", docSnap.data()); 
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    } 
  }

  const handleSave = async() => {
    const uid = user.uid
    const washingtonRef = doc(db, "users", uid);
    await updateDoc(washingtonRef, {
      name:name || "",
      email:email || "",
      address:address || "",
      sector:industrySector || "",
      phone:phone || "",
      website:website || "",
      description:description || ""
});
    alert('Changes saved!');
  };

  const handleCancel = () => {
    // Reset all form values or handle cancel logic
    setName('');
    setAddress('');
    setEmail('');
    setIndustrySector('');
    setPhone('+212 64567931');
    setWebsite('');
    setDescription('We are a leading company specializing in innovative solutions...');
    setImage(null);
  };


  const deleteProject=async(projectId)=>{
    const uid = user.uid;

    const url = `${apiUrl}/deleteProject`;
    const url2 = `${apiUrl}/api/projects/deleteProject/${projectId}/${uid}`;

    try {
      const response = await axios.delete(url2).then(( )=>{
        getProjects();
      })

    } catch (error) {
      console.log(error.message)
    }
  }




  useEffect(()=>{
    if (user) {
      getData();
    }
  },[user])

  return (
    <div className="container light-style flex-grow-1 container-p-y">
      {show && (
        <div className="showUpdateModal">
          <UpdateProjectForm fields={updatedData} setShow={setShow}/>
        </div>
      )}
      <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
      <div className="card overflow-hidden">
        <div className="row no-gutters row-bordered row-border-light">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
              <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Informations</a>
              <a className="list-group-item list-group-item-action" data-toggle="list" href="#projects-info">Projects</a>

            </div>
          </div>
          <div className="col-md-9">
            <div className="tab-content">
              {/* General Settings */}
              <div className="tab-pane fade active show" id="account-general">
                <div className="card-body media align-items-center">
                  <div className="media-body ml-4">
                    <label style={{display:"none"}} className="btn btn-outline-primary">
                      Upload new photo
                      <input type="file" className="account-settings-fileinput" onChange={handleImageChange} />
                    </label>
                    <div style={{display:"none"}}  className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                  </div>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      className="form-control mb-1"
                      placeholder="Enter company name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter company address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-mail</label>
                    <input
                      type="email"
                      className="form-control mb-1"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="alert alert-warning mt-3">
                      Your email is not confirmed. Please check your inbox.<br />
                      <a href="javascript:void(0)">Resend confirmation</a>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Industry Sector</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter industry sector"
                      value={industrySector}
                      onChange={(e) => setIndustrySector(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Info Settings */}
              <div className="tab-pane fade" id="account-info">
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    >
                      {description}
                    </textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Website</label>
                    <input
                      type="text"
                      className="form-control"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Info Settings */}
              <div className="tab-pane fade" id="projects-info">
                <div className="card-body pb-2">
                  {projects.length > 0 && projects.map((item,index)=>{return(
                    <div className="accountProject">
                    <p>{item?.title}</p>
                    <div style={{display:"flex",alignItems:"center"}}>
                    <button onClick={()=>showUpdateModal(item)} className='updateDelete'>Update</button>
                      <button onClick={()=>deleteProject(item.projectId)} className='buttonDelete'>DELETE</button>
                    </div>
                   </div>
                  )})}

                </div>
              </div>

              {/* Save & Cancel Buttons */}
              <div className="text-right mt-3">
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>&nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
