import React from "react";
import './spinner.css';
import Loader from "react-loader-spinner";

const SpinnerInside =
    //    <div className="spinner-border  text-muted loadingForSpinner "
    // ></div>

        // <div className="spinner-border text-info  loading"></div>
    <div className="loadingInside">
 <Loader type="ThreeDots" color="#CD5C5C" height={60} width={60} visible={90}  />
</div>


export default SpinnerInside ;
