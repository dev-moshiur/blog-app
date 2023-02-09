import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
 
  const [image, setImage] = useState('')
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    ev.preventDefault();
    console.log(files[0])
    if (files[0].type=='image/jpeg' || files[0].type=='image/png') {
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
          console.log(img.url)
          setImage(img.url);
          console.log(image)
          fetch('http://localhost:4000/post', {
          headers: { "Content-type": "application/json" },
          method: 'POST',
          body: JSON.stringify({title,
            summary,
            content,
            image:img.url}),
          credentials: 'include',

        })
        .then((res)=>{
          if (res.status == 200) {
            setRedirect(true);
          }
        })
      } )
      .catch(err=>console.log(err))
    
    
    

    }
    else{
      console.log('only jpg and png type image allowed')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}