import countries from "../../data/countries";
import React from "react";
import cities from "../../data/cities";
import Field from "./Field";


const Contacts = props => {
    const {
        country,
        onChange,
        city,
        email,
        mobile,
        errors
    } = props;

   const getOptions = arrayOfCountries => {
        return arrayOfCountries.map(country => (
            <option value={country.name} key={country.id}>{country.name}</option>
        ))

    }
    const filteredCities = () => {
        const con = cities.filter(c => c.country == country)   //todo ???
           .map(value => value);
       // console.log(con);
       return con;
    }

    const getOptionsCity = (citi) => {
     return citi.map(cit => (
         <option value={cit.name} key={cit.name}>{cit.name}</option>
     ))

    }

    return (
        <div>
            <div className="form-group">
                <Field
                    id="mobile"
                    labelText="Mobile number"
                    type="number"
                    placeholder="Enter phone number"
                    value= {mobile}
                    onChange={onChange}
                    name="mobile"
                    error={errors.mobile}
                />

                <Field
                    id="email"
                    labelText="Email"
                    type="email"
                    placeholder="Enter email"
                    value= {email}
                    onChange={onChange}
                    name="email"
                    error={errors.email}
                />

                <label>Select country</label>
                <select className="form-control" aria-label="Default select example"
                        id="country"
                        value={country}
                        name="country"
                        onChange={onChange}
                >
                    <option selected>Choose your country</option>
                    {getOptions(countries)}
                </select>

                <label>Select city</label>
                <select className="form-control" aria-label="Default select example"
                        id="city"
                        value={city}
                        name="city"
                        onChange={onChange}
                >
                    <option selected>Choose you city</option>
                    {getOptionsCity(filteredCities())}
                </select>
            </div>

        </div>
    );
}

export default Contacts