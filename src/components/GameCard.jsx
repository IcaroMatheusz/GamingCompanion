function GameCard({ title, description, img, alt }) {
  return (
    <div className="card bg-base-100 w-64 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
      <figure>
        <img src={img} alt={alt} className="w-full h-auto object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default GameCard;
