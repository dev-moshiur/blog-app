import {useState} from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [profession, setprofession] = useState('')
  const [files, setFiles] = useState('');
  async function register(ev) {
    ev.preventDefault();
    if (files[0]) {
      const imageData = new FormData();
      imageData.append("file",files[0]);
      imageData.append("upload_preset", "school-management");
      imageData.append("cloud_name", "dbop0bxeu");

      fetch(`https://api.cloudinary.com/v1_1/dbop0bxeu/image/upload`, {
        method: "post",
        body: imageData,
      })
        .then((res) => res.json())
        .then((img) => {
          console.log(img.url);
          fetch('http://localhost:4000/register', {
          headers: { "Content-type": "application/json" },
          method: 'POST',
          body: JSON.stringify({username,
            password,
            bio,
            profession,
          image:img.url}),
          

        })
        .then((res)=>{
          if (res.status == 200) {
            console.log('success')
            
          }
        })
      } )
    
    
    

    }
    
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
             placeholder="username"
             required
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
             
      <input type="password"
             placeholder="password"
             value={password}
             required
             onChange={ev => setPassword(ev.target.value)}/>
             
      <input type="text"
             placeholder="Profession"
             value={profession}
             required
             onChange={ev => setprofession(ev.target.value)}/>
             
      <input type="text"
             placeholder="bio"
             value={bio}
             required
             onChange={ev => setBio(ev.target.value)}/>
             
      <input type="file"
      onChange={ev => setFiles(ev.target.files)} />
      
      <button>Register</button>
    </form>
  );
}