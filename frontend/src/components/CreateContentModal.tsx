import { useRef, useState } from "react";
import { CrossIcon } from "./CrossIcon";
import { Input } from "./Input";
import Button from "./Button";

export enum ContentType {
    Youtube = "youtube",
    Tweet = "tweet",
    Document = "document"
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
    onContentAdd: (data: { title: string; link?: string; file?: File | null; type: ContentType }) => Promise<void>;
    isAdding: boolean;
}

export function CreateContentModal({ open, onClose, onContentAdd, isAdding }: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [type, setType] = useState<ContentType>(ContentType.Youtube);

    const handleSubmit = () => {
        const title = titleRef.current?.value || "";

        if (!title) {
            alert("Please return a title");
            return;
        };

        if (type === ContentType.Document) {
            if (!file) {
                alert("Please upload a file for document");
                return;
            }
            onContentAdd({ title, file, type });
        } else {
            const link = linkRef.current?.value || "";
            if (!link) {
                alert("Please provide a link");
                return;
            }
            onContentAdd({ title, link, type });
        }
        onClose();
    };

    return (
        <div>
            {open && (
                <div className="w-screen h-screen fixed top-0 left-0 bg-slate-300 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-4 rounded w-[400px] flex flex-col">
                        {/* Close button */}
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>

                    <div className="flex flex-col gap-4 mt-4 items-center">
                        {/* Title input */}
                        <Input ref={titleRef} placeholder="Title" />

                        {/* Conditional input */}
                        {type === ContentType.Document ? (
                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.gif"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="mt-1 border p-2 rounded-lg border-gray-400 w-fit"
                            />
                        ) : (
                            <Input ref={linkRef} placeholder="Link" />
                        )}

                        {/* Type selector */}
                        <div className="flex justify-center items-center">
                            <span className=" text-sm">Type:</span>
                            <div className="flex gap-4 p-2">
                                <Button
                                    title="Youtube"
                                    size="tag"
                                    variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.Youtube)}
                                />
                                <Button
                                    title="Twitter"
                                    size="tag"
                                    variant={type === ContentType.Tweet ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.Tweet)}
                                />
                                <Button
                                    title="Document"
                                    size="tag"
                                    variant={type === ContentType.Document ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.Document)}
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className="flex justify-center mt-2">
                            <Button
                                variant="primary"
                                title={isAdding ? "Adding..." : "Submit"}
                                size="contentSubmit"
                                onClick={handleSubmit}
                                disabled={isAdding}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    );
}

export default CreateContentModal;
