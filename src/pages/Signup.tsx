import { useRef, useState } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const [loading, SetLoading] = useState(false);
  const [usernameError, SetUsernameError] = useState("");
  const [passwordError, SetPasswordError] = useState("");
  
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    SetUsernameError("");
    SetPasswordError("");
    SetLoading(true);
    
    try {
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password
      });
      
      // alert("Signup successful! Please sign in.");
      navigate("/Signin");
      
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        
        if (responseData?.errors) {
          try {
            let issues;
            
            if (typeof responseData.errors.message === 'string') {
              issues = JSON.parse(responseData.errors.message);
            } else if (responseData.errors.issues) {
              issues = responseData.errors.issues;
            }
            
            if (issues && Array.isArray(issues)) {
              issues.forEach((err: any) => {
                if (err.path && err.path[0] === 'username') {
                  SetUsernameError(err.message);
                } else if (err.path && err.path[0] === 'password') {
                  SetPasswordError(err.message);
                }
              });
            }
          } catch (parseError) {
            alert("Validation error. Please check your input.");
          }
        } 
        else if (responseData?.message) {
          if (responseData.message === "User Already Exists") {
            SetUsernameError("This username is already taken");
          } else {
            alert(responseData.message);
          }
        } else {
          alert("Signup failed. Please try again.");
        }
      } else {
        alert("Signup failed. Please check your connection.");
      }
    } finally {
      SetLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-200 fixed flex justify-center items-center">
      <div className="bg-white rounded-md min-w-96 flex flex-col justify-center items-center p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

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
            placeholder="Password" 
            type="password"
            error={passwordError}
          />
        </div>

        <div className="w-full">
          <Button 
            onClick={signup} 
            variant="secondary" 
            text={loading ? "Signing up..." : "Sign Up"} 
            size="md" 
            fullWidth={true} 
            loading={loading} 
          />
        </div>   

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span 
            onClick={() => navigate("/Signin")} 
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};