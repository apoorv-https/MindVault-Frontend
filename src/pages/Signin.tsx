import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useRef, useState } from "react"

export const Signin = () => {
  const [loading, SetLoading] = useState(false);
  const [usernameError, SetUsernameError] = useState("");
  const [passwordError, SetPasswordError] = useState("");
    
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    SetUsernameError("");
    SetPasswordError("");
    SetLoading(true);
    
    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username, 
        password
      });
   
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
   
      navigate("/Dashboard");
      
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data?.message || "Signin failed. Please try again.";
        SetPasswordError(message);
      } else {
        SetPasswordError("Signin failed. Please try again.");
      }
    } finally {
      SetLoading(false);
    }
  } 
    
  return (
    <div className="w-screen h-screen bg-gray-200 fixed flex justify-center items-center">
      <div className="bg-white rounded-md min-w-96 flex flex-col justify-center items-center p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>

        <div className="w-full">
          <Input 
            refrence={usernameRef} 
            placeholder="Username"
            error={usernameError}
          />
        </div>

        <div className="w-full">
          <Input 
            refrence={passwordRef} 
            type="password" 
            placeholder="Password"
            error={passwordError}
          />
        </div>
        
        <div className="w-full">
          <Button 
            onClick={signin} 
            variant="secondary" 
            text={loading ? "Signing in..." : "Sign In"} 
            size="md" 
            fullWidth={true} 
            loading={loading}
          />
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <span 
            onClick={() => navigate("/Signup")} 
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};