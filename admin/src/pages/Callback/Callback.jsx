import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


export default function Callback() {

    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get("token")
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {   
            localStorage.setItem("token", searchParams.get("token"))
            navigate("/")
        } else {
            navigate("/error")
        }
    })
    
    return <></>
}