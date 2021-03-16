
export default function ResponseAfterReg({data}) {
  return (
    <div >
        {data}
        <p className="mesText">
            A message has been sent to your email, please activate your account.
        </p>
    </div>
  );
}
