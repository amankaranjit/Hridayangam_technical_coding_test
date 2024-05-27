import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const PokemonListing = () => {
    const [pokemons, setPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get(nextUrl)
            .then(response => {
                const pokemonData = response.data.results;
                setNextUrl(response.data.next);
                const detailedPromises = pokemonData.map(pokemon => {
                    return axios.get(pokemon.url)
                        .then(details => details.data)
                        .catch(error => {
                            console.error("Error fetching Pokémon details:", error);
                            return null;
                        });
                });
                return Promise.all(detailedPromises);
            })
            .then(detailedPokemons => {
                setPokemons(prevPokemons => [...prevPokemons, ...detailedPokemons.filter(pokemon => pokemon !== null)]);
            })
            .catch(error => {
                console.error("Error fetching Pokémon data:", error);
            });
    }, [nextUrl]);

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (e) => {
        e.preventDefault();
        const searchTerm = e.target.elements.search.value.trim();
        setSearchQuery(searchTerm);
    };

    return (
        <>
            <div className="container">
                <h2 className='title'>Pokemon List</h2>
                <div className="pokemon-list">
                    <div className="form__wrapper">
                        <form onSubmit={handleSearch}>
                            <input type="text" id="search" name="search" placeholder="Enter Pokemon name" />
                            <input type="submit" value="Search" />
                        </form>
                    </div>
                    <div className="row">
                        {filteredPokemons.map(pokemon => (
                            <PokemonCard
                                key={pokemon.id}
                                name={pokemon.name}
                                image={pokemon.sprites.front_default}
                                type={pokemon.types.map(typeInfo => typeInfo.type.name)}
                                base_experience={pokemon.base_experience}
                                abilities={pokemon.abilities.map(abilityInfo => abilityInfo.ability.name)}
                                cries={pokemon.cries}
                                gameIndices={pokemon.game_indices.map(game => game.version.name)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PokemonListing;
