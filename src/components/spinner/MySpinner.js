import React from "react";
import './spinner.css';
import Loader from "react-loader-spinner";

const MySpinner =
    //    <div className="spinner-border  text-muted loadingForSpinner "
    // ></div>
    <div className="containerSpinner">
        {/*<div className="spinner-border text-info  loading"></div>*/}
        <div className="loading"><Loader type="Oval" color="#2cc3d9" height={50} width={50}/>
        </div>
    </div>


export default MySpinner;
