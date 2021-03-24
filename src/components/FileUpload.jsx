import axios from "axios";
import http from "../http-common";
import { useAlert } from 'react-alert';


export function FileUpload() {

    const alert = useAlert();
    const handleImageUpload = (e) => {
        const image_as_files = e.target.files[0];
        http.get(`/signed-url?name=${image_as_files.name}`)
            .then(result => {
                const imageURL = result.data.url;
                if (imageURL !== null) {
                    axios.put(
                        imageURL,
                        image_as_files,
                        {
                            headers: {
                                "Content-type": image_as_files.type,
                            },
                        }
                    )
                        .then(res => {
                            alert.success("Image Uploaded. Scroll down to gallery");
                            console.log(`Success` + res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            });
    };


    return (
        <div>
            <label htmlFor="file-upload" className="custom-file-upload">
                <div>Click here</div>
            </label>
            <span> to share the images of your pet</span>
            <div>Scroll down to checkout the gallery</div>
            <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
    );

}

export default FileUpload;