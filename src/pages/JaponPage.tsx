import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const JaponPage = () => {

const countryId = 4;

    
const [places, setPlaces] = useState<Place[]>([]);

useEffect(() => {
    fetch(`https://6632f68bf7d50bbd9b47beee.mockapi.io/countries/${countryId}/places`)
        .then(response => response.json()) 
        .then(json => setPlaces(json))
}, [])

  return (

      <>
          <Header />
          <div className='container-card'>
              {
                  places?.length > 0 && places.map((place: Place) => (
                      <div key={place.placeId} className='place-card'>
                          <img id='place-image' src={place.image}></img>
                          <strong id='place-name'> {place.name}</strong>
                          <br />
                          <p id='place-description'> {place.description}</p>
                          <p id='place-price'>{place.price}</p>
                          <p id='place-rating' >{place.rating}</p>
                      </div>
                  ))
              }
          </div>
          <Footer/>
      </>

  )
}

export default JaponPage