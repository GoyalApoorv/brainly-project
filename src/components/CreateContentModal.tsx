import React, { useRef, useState } from "react";
import { CrossIcon } from "./CrossIcon"; 
import { Input } from "./Input";     
import Button from "./Button";       
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Document = "document" 
}

// Controlled component
export function CreateContentModal({open, onClose}: {onClose: () => void}) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link, title, type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose();
    }

    return (
        <div>
            {open && (
                <> {/* Fragment to avoid unnecessary div */}
                    <div className="w-screen h-screen fixed top-0 left-0 opacity-75 bg-slate-300 flex justify-center"> 
                    <div className="w-screen h-screen fixed top-0 left-0 bg-slate-300 flex justify-center">
                        <div className="flex items-center">
                                <span className="opacity-100 bg-white p-4 rounded">
                                <div className="flex justify-end">
                                    <div onClick={onClose}>
                                        <CrossIcon />
                                    </div>
                                </div>
                                <div>
                                    <Input ref={titleRef} placeholder="Title" />
                                    <Input ref={linkRef} placeholder="Link" />
                                </div>
                                <div className="flex justify-center items-center">
                                    <span className="pt-1 text-sm">Type:</span>
                                    <div className="flex gap-4 p-4 justify- pb-2">
                                        <Button
                                            title="Youtube" size="tag"
                                            variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                            onClick={() => setType(ContentType.Youtube)}
                                        />
                                        <Button
                                            title="Twitter" size="tag"
                                            variant={type === ContentType.Twitter ? "primary" : "secondary"} 
                                            onClick={() => setType(ContentType.Twitter)}
                                        />
                                        <Button
                                            title="Doc" size="tag"
                                            variant={type === ContentType.Document ? "primary" : "secondary"} 
                                            onClick={() =>{
                                                console.log("Doc button clicked"); setType(ContentType.Document)
                                                console.log("Current type:", type);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button variant="primary" title="Submit" size="contentSubmit" onClick={addContent} />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>    
                </>
            )}
        </div>
    );
};

export default CreateContentModal;