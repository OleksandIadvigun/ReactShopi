import React from "react";
import DefaultAvatar from "../../data/defAvat.png";

const  Avatar = props => {
    const{
        avatar,
        onChange,



    } = props;

    let error = '';
    const onChangeAvatar = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            onChange({
                target: {
                    name: "avatar",
                    value: event.target.result
                }
                // console.log(event.target.result)
            })
        }
        reader.onerror = event => {
            console.error(event);
            error = "Something wrong";
        };
        reader.readAsDataURL(file)
    }

  return (
    <div>
        <img className="avatar-preview" src={avatar||DefaultAvatar}/>

        <div className="form-group">
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Avatar
            </label>
            <div className="mb-4 my">
                <div className="custom-file my">
            <input type="file" className=" custom-file-input my"

                   id="avatar"
                   onChange={onChangeAvatar}
                   name="avatar"

            />
                    <label className="custom-file-label my " htmlFor="avatar">
                        Choose avatar
                    </label>
                </div>
            </div>
        </div>

    </div>
  );
}
 export default Avatar
