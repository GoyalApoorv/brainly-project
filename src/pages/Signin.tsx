import Button from "../components/Button";
import { Input } from "../components/Input";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
    try {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        });

        localStorage.setItem("token", response.data.token);
        navigate('/dashboard'); 
    } catch (error) {
        alert("Request failed. Please try again.");
        console.error("Sign in failed:", error);
    }
}

 return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
    <div className="bg-white rounded border min-w-48 p-8">
    <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />
        <div className=" flex justify-center items-center pt-4">
            <Button onClick={signin} variant="primary" title="Signin" size="sm" />
        </div>
    </div>
 </div>   
}