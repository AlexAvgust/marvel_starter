import { Form, Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import * as Yup from 'yup';
import './findChar.scss' 


const FindChar = () => {

  const [char, setChar] = useState(null)
  const { loading, error, getCharacterByName, clearError } = useMarvelService()

console.log(char)
  const onCharLoaded = (char) => {
    setChar(char)
  }

  const updateChar = (name) => {
    clearError()

    getCharacterByName(name)
    .then(onCharLoaded)

  }

  const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
  const result =!char ? null :
    <div className="char__search-wrapper">
      <div className="char__search-success">There is! Visit {char.name} page?</div>
      <Link to={`/characters/${char.id}`} className="button button__secondary">
        <div className="inner">To page</div>
      </Link>
    </div> 

  return (
    <div  className="char__search-form">
      <Formik initialValues={{
        name: ''
      }}
      validationSchema = {Yup.object({
        name: Yup.string().required('This field is required')
    })}
    onSubmit = { ({name}) => {
      updateChar(name);
  }}>

        <Form>
          <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
          <div className="char__search-wrapper">

            <Field type="text" name="name" placeholder="Enter name" />

            <button className='button button__main' type="submit" disabled={loading}>
              <div className='inner'>Find</div>
            </button>
          </div>
          <FormikErrorMessage className="char__search-error" name="name" component="div" />
        </Form>

      </Formik>
      {result}
      {errorMessage}
    </div>
  )
}

export default FindChar