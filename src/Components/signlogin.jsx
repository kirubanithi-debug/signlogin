import { useRef , useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const SignLogin = () => {
    const webcamRef = useRef(null);
    const [message, setMessage] = useState("");
    const [isloading, setIsLoading] = useState(false);

    const captureSign = async () => {
        setIsLoading(true);
        const imagesrc = webcamRef.current.getScreenshot();
        try {
            const res = await axios.post("http://localhost:5000/signlogin", {
                image: imagesrc
            });
            setMessage(res.data.message);
        } catch (error) {
            console.error("Error during sign login:", error);
            setMessage("Error during sign login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">Sign Language Login</h2>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded shadow-md"
        width={320}
        height={240}
      />
      <button
        onClick={captureSign}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isLoading ? "Checking..." : "Login with Sign"}
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
};

export default SignLogin;