function DigimonRadialProgress({ captured = 0, total = 475 }) {

  const percentage = total > 0 ? Math.round((captured / total) * 100) : 0;

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div
          className="radial-progress bg-base-200 border-4 border-base-200"
          style={{
            "--value": percentage,
            "--size": "12rem",
            "--thickness": "4px",
          }}
          role="progressbar"
        >
          {captured}/{total}
        </div>
        <h1 className="text-xl">{percentage}%</h1>
      </div>
    </>
  );
}

export default DigimonRadialProgress;
