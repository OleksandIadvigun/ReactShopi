export default function RespAfterEdit({data, message}) {
    return (
        <div >
            {data}
            <p className="mesText">
                {message}
            </p>
        </div>
    );
}
