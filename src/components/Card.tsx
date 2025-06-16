import { DeleteIcon } from "../icons/DeleteIcon";
import { DocIcon } from "../icons/DocIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";

interface CardProps {
    title: string,
    link: string,
    type: "tweet" | "youtube" | "document";
}

export function Card({ title, link, type }: CardProps) {
    let LeftIconComponent: React.FC<any> = ShareIcon; // Default icon

    switch (type) {
        case "youtube":
            LeftIconComponent = YouTubeIcon;
            break;
        case "tweet":
            LeftIconComponent = TwitterIcon;
            break;
        case "document":
            LeftIconComponent = DocIcon;
            break;
    } // Conditionally rendering icon based on the document type.

    return <div className="p-4 rounded-md bg-white shadow-md outline-gray-100 hover:cursor-pointer w-48 max-w-72 border">
                <div className="flex justify-between">
                    {/* Left section: Title with icon */}
                    <div className="flex items-center text-md">
                        <div className="text-gray-500 pr-2">
                            <LeftIconComponent />
                        </div>
                        {title}
                    </div>
                    {/* Right section: Links with icons */}
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            <ShareIcon size={'sm'} />
                        </div>
                        <div className="pr-2 text-gray-500">
                            <a href={link} target="_blank">
                              <DeleteIcon />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    {/* Render YouTube embed if type is "youtube" */}
                    {type === "youtube" && (
                        <iframe
                            className="w-full"
                            src={link
                                .replace("watch", "embed")
                                .replace("?v=", "/")}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {/* Render Twitter embed if type is "twitter" */}
                    {type === "tweet" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace('x.com', 'twitter.com')}></a>
                        </blockquote>
                    )}
                </div>
        </div>
}