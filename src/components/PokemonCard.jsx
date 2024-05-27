import React from 'react';

const PokemonCard = ({ name, image, type, base_experience, abilities, cries, gameIndices }) => {
  return (
    <div className="col-lg-3 col-md-3 col-sm-12">
      <div className="card__wrapper">
        <div className="img__wrapper">
          <figure>
            <img src={image} alt={`${name} Image`} />
          </figure>
        </div>
        <div className="description__wrapper">
          <h2>{name}</h2>
          <div className='type__wrap'>
            {type.map((t, index) => (
              <span key={index} className="type">{t}</span>
            ))}
          </div>
          <p className='badge'><strong>Base Experience:</strong> {base_experience}</p>
        
          <h3>Game Indices:</h3>
          <ul>
            {gameIndices.map((index, i) => (
              <li key={i}>{index}</li>
            ))}
          </ul>
          <div className="abilities">
            <p>Abilities:</p>
            <ol>
            {abilities && abilities.length > 0 && (
              abilities.map((ability, index) => (
                <li key={index}>{ability}</li>
              ))
            )}
            </ol>
          </div>
          <audio controls>
            <source src={cries?.latest} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
