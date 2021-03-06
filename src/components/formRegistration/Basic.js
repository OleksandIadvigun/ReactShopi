
import Field from "./Field";
import React from "react";


const Basic = props => {
    const {
        onChange,
        username,
        errors,
        gender,
        password,
        repeatPassword,
        age,
        decrementAge,
        incrementAge,
        response,
        firstname,
        lastname
    } = props;

    return (
        <div>
            <div>
                <div className="error">{response}</div>
            </div>
            <Field
                id="username"
                labelText="Username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={onChange}
                name="username"
                error={errors.username}

            />
            <Field
                id="firstname"
                labelText="Firstname"
                type="text"
                placeholder="Enter firstname"
                value={firstname}
                onChange={onChange}
                name="firstname"
                error={errors.firstname}

            />
            <Field
                id="lastname"
                labelText="Lastname"
                type="text"
                placeholder="Enter lastname"
                value={lastname}
                onChange={onChange}
                name="lastname"
                error={errors.lastname}

            />

            <Field
                id="password"
                labelText="Password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={onChange}
                name="password"
                error={errors.password}

            />
            <Field
                id="repeatPassword"
                labelText="Repeat password"
                type="password"
                placeholder="Repeat password"
                value={repeatPassword}
                onChange={onChange}
                name="repeatPassword"
                error={errors.repeatPassword}
            />

            <fieldset className="form-group">
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Gender:
                </label>
                <div id="checker" className="form-check">
                    <input className="form-check-input" type="radio" value="male" id="male"
                           name="sex"
                           checked={gender === "male"}
                           onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Male
                    </label>
                </div>
                <div className="form-check" >
                    <input className="form-check-input" type="radio" value="female" id="female"
                           name="sex"
                           checked={gender === "female"}
                           onChange={onChange}

                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Female
                    </label>
                </div>

            </fieldset>

            <div className="form-group my">
                <div>
                    <label>Age</label>
                </div>
                <div className="btn-group">
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={decrementAge}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        className="form-control  my"
                        placeholder="Enter age"
                        name="age"
                        value={age}
                        onChange={onChange}
                    />
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={incrementAge}
                    >
                        +
                    </button>
                </div>
                {errors.age ? (
                    <div className="error">{errors.age}</div>
                ) : null}
            </div>

        </div>
    );
}

export default Basic;
