import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [perc, setPerc] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
            default:
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await setDoc(doc(db, "users", user.uid), {
        ...data,
        timestamp: serverTimestamp(),
      });
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} id={input.id} onChange={handleInput} />
                </div>
              ))}
              <button disabled={perc !== null && perc < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
