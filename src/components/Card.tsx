import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube";
}

// The Card component represents a styled card that can display either a YouTube video or a Twitter embed based on the type prop.
export function Card({ title, link, type }: CardProps) {
    return <div className="p-4 rounded-md bg-white shadow-md outline-gray-100 hover:cursor-pointer max-w-72 border">
        <div className="flex justify-between">
            <div className="flex text-gray-500 items-center text-md">
                <div className="text-gray-500 pr-2">
                    <ShareIcon size={'sm'} />
                </div>
                {title}
            </div>
            <div className="flex items-center">
                <div className="pr-2 text-gray-500">
                    <ShareIcon size={'sm'} />
                </div>
                <div className="pr-2 text-gray-500">
                    <a href={link} target="_blank">
                        <ShareIcon size={'sm'} />
                    </a>
                </div>
            </div>
            <div className="pt-4">
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
                    {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link}></a>
                        </blockquote>
                    )}
                </div>

            </div>
        </div>
    </div>
}