import { useForm } from 'react-hook-form';
import '../styles/NewPlaceForm.css'
import { useNavigate } from 'react-router-dom';
import { createPlaces } from '../services/Places';
import { PlaceType } from '../types/PlaceType';

const NewPlaceForm = () => {

  const { register, handleSubmit, formState: {errors} } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const placeData: PlaceType = JSON.parse(JSON.stringify(data))

    try {
      await createPlaces(placeData)
      navigate('/')
    } catch (error) {
      console.error('Error creating product:', error)
    }
  })

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <>
      <h1>Formulario</h1>
      <div className='container_form'>
        <form onSubmit={onSubmit}>
          <div>
            <label>PlaceId</label>
            <input
              type='text'
              {...register('placeId',  {required: true}) }
            />
          </div>
          <br />
          <div>
            <label>Nombre</label>
            <input

              type='text'
              {...register('name', {required: true})}
            />
          </div>
          <br />
          <div>
            <label>Descripción</label>
            <input
              type='text'
              {...register('description', {required: true})} />
          </div>
          <div>
            <label htmlFor='imagenInput'>Imagen</label>
            <input
              type='text'
              {...register('image')}
              id='imagenInput' />
          </div>
          <br />
          <div>
            <label htmlFor='priceInput'>Precio</label>
            <input
              type='text'
              {...register('price', {required: true})}
              id='priceInput'
            />
          </div>
          <br />
          <div>
            <label htmlFor='ratingInput'>Rating</label>
            <input
              type="number"
              {...register('rating', {
                max: { value: 5, message: 'El rating no puede ser mayor a 5' },
                min: { value: 0, message: 'El rating no puede ser menor a 0' },
              })}
              id='ratingInput'
            />
       
            {errors.rating && (
            <span className='error-message'>{errors.rating.message}</span>)}
           <br/>
            <label
              htmlFor='countryId'>
              <strong>Country</strong>
            </label>
            <br />
            <select
              {...register('countryId', {required: true})}
              id='countryId'
              required>
              <option >Select country</option>
              <option value='1'> Costa Rica </option>
              <option value='2'> Portugal </option>
              <option value='3'> India </option>
              <option value='4'> Japon </option>
              <option value='5'> Australia </option>
            </select>
          </div>
          <div className='confirm-input'>
            <button className='Button' type='submit' value='Aceptar' >Aceptar</button>
            <button className='Button' type='submit' value='Cancelar' onClick={handleCancel} >Cancelar</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewPlaceForm