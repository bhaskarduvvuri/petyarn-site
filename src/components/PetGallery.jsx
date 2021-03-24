import { useCallback, useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import http from "../http-common";
import { ImageWrapper } from "./ImageWrapper";

export function PetGallery() {
    const [gallery, setGallery] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const response = await http.get("/gallery");
            setGallery(response.data.gallery);
        }
        fetchData();
    }, []);

    const imageRenderer = useCallback(
        ({ index, left, top, key, photo }) => (
            <ImageWrapper
                key={key}
                margin={"2px"}
                index={index}
                photo={photo}
                left={left}
                top={top}
            />
        ),
        []
    );

    if (!gallery) {
        return <div></div>;
    }

    return <Gallery photos={gallery} renderImage={imageRenderer} />
}