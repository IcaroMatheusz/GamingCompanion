function DigimonRadialProgress() {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div
          className="radial-progress bg-base-200 border-4 border-base-200"
          style={{
            "--value": "70",
            "--size": "12rem",
            "--thickness": "4px",
          }}
          role="progressbar"
        >
          127/475
        </div>
        <h1 className="text-xl">70%</h1>
      </div>
    </>
  );
}

export default DigimonRadialProgress;
