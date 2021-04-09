export default function RespAfterEdit({data, message}) {
    return (
        <div className="containerResponse" >
            <div className="responseInside">
            {data}
            <p className="mesText">
                {message}
            </p>
            </div>
        </div>
    );
}
