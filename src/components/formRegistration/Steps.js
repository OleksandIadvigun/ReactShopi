
export default function Steps({step, doneStep}) {

  return (
      <div className="steps mb-2">
          <div className={`step ${step === 1 ? 'is-active' : ''} ${doneStep >=1 ? 'is-completed' : ''}`}>
              <div className="step__marker">1</div>
              <div className="step__title mt-1">Basic</div>
          </div>
          <div className={`step ${step === 2 ? 'is-active' : ''} ${doneStep >=2 ? 'is-completed' : ''}`}>
              <div className="step__marker">2</div>
              <div className="step__title mt-1">Contacts</div>
          </div>
          <div className={`step ${step === 3 ? 'is-active' : ''} ${doneStep >=3 ? 'is-completed' : ''}`}>
              <div className="step__marker">3</div>
              <div className="step__title mt-1">Avatar</div>
          </div>
          <div className={`step ${step === 4 ? 'is-active' : ''} `}>
              <div className="step__marker">4</div>
              <div className="step__title mt-1">Finish</div>
          </div>
      </div>
  );
}