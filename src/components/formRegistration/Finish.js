import DefaultAvatar from "../../data/defAvat.png";
import React from "react";
import countries from "../../data/countries";




const Finish =props=> {
  const {
      avatar,
      name,
      age,
      email,
      mobile,
      country,
      city,
      agree,
      onChange,
      onSubmit

  }=props;
   // const selectedCountry = countries.find(item => item.id === Number(country)) || {};

     const onChangeCheckbox = (event) => {
         onChange({target:{
             name:"agree",
             value: event.target.checked
             }})
      }

  return (

    <div>
        <img className="avatar-view" src={avatar||DefaultAvatar}/>
        <div className="info">

                <p><strong>Name:</strong> {name}</p>
                <p><strong>Age:</strong> {age}</p>
                <p><strong>Mobile:</strong> {mobile}</p>
                <p><strong>email:</strong> {email}</p>
                <p><strong>Location:</strong> {country}, {city}</p>

        </div>
        <div className="form-check">
            <input className="form-check-input" type="checkbox"
                   value={agree}
                   id="agree"
                   name="agree"
                   onChange={onChangeCheckbox}
            />
            <label className="form-check-label"


                   htmlFor="flexCheckDefault">
                <span className={agree===false ? "red_text": ""} > agree all rules</span>
            </label>

        </div>
        <button type="submit" id="sub" className="btn btn-primary w-50" onClick={onSubmit}>
            Submit
        </button>
    </div>
  );
}

 export default Finish
