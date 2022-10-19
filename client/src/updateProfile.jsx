import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import CardButton from "./components/cardButton";

const SignOut = () => {
  
  const navigate = useNavigate();

  return(
    <div>
        <CardButton
        title={"Profile"}
        // onClick={() => }
        renderBody={() => (
          <div className="d-flex flex-column lh-24">
            <div className="d-flex flex-row w-100 justify-content-between">
              <div>Project Name</div>
            </div>
          </div>
        )}
        renderFooter={() => (
          <div className="d-flex flex-row justify-content-around align-items-center">
            Date
          </div>
        )}
        />
      <h1>Update Profile</h1>
    </div>
  )
}

export default SignOut