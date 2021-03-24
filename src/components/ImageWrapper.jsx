import { useState } from "react";
import { useAlert } from "react-alert";
import http from "../http-common";
import { Like } from "./Like";

const imgStyle = {
    transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const selectedImgStyle = {
    transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
    transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};

const cont = {

    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative"
};
export function ImageWrapper({
    photo,
    margin,
    direction,
    top,
    left
}) {
    const [isSelected, setIsSelected] = useState(false);
    const alert = useAlert();
    const sx = (100 - (30 / photo.width) * 100) / 100;
    const sy = (100 - (30 / photo.height) * 100) / 100;
    selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

    if (direction === "column") {
        cont.position = "absolute";
        cont.left = left;
        cont.top = top;
    }

    const handleOnClick = (e, id) => {
        if (!isSelected) {
            http.post(`/gallery/${id}/like`, {}).then(() => {
                alert.success("Thank you for liking the photo.")
            });
        } else {
            http.post(`/gallery/${id}/unlike`, {});
        }
        setIsSelected(!isSelected);
    };

    return (
        <div
            style={{ margin, height: photo.height, width: photo.width, ...cont }}
        >
            <Like liked={isSelected ? true : false} count={photo.likes} />
            <img
                alt={photo.title}
                style={
                    isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
                }
                {...photo}
                onClick={(e) => handleOnClick(e, photo.id)}
            />
            <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
        </div>
    );
}