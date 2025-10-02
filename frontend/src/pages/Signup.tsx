import { useRef } from "react";
import Button from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        if (!username || !password) {
            alert("Please enter both a username and password.");
            return;
        }
        
        try {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });

            alert("Signup successful! Please sign in.");
            navigate("/signin");

        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed. That username might already be taken.");
        }
    }

 return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
    <div className="bg-white rounded border min-w-48 p-8">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />
        <div className=" flex justify-center items-center pt-4">
            <Button onClick={signup} variant="primary" title="Signup" size="sm" />
        </div>
    </div>
 </div>   
}