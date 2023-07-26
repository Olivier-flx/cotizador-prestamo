import { useState, useEffect } from "react"
import Header from "./components/Header"
import Button from "./components/Button"
import {formatearDinero,calcularTotal} from './helpers/index.js'


function App() {
  let [plazo, setPlazo] = useState(6)
  const [cantidad, setCantidad] = useState(10000);
  const [total, setTotal] = useState(0);
  const [mensuales, setMensuales] = useState(0)
  
  useEffect (() => {
    console.log('componente Listo ... o la cantidad cambio o los meses')
    setTotal(calcularTotal(cantidad, plazo))
    
    //calcular el pago mensual //incluso esta mejor ponerlo en otro useeffect
    setMensuales(total/plazo)

  }, [cantidad, plazo, total])
  

  console.log(cantidad)
  console.log(plazo)

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  function handleChange (e) {
    setCantidad(+ e.target.value) // con + se transforma en numero
  }

  function handleClick (e) {
    const plusOMenos = e.target.textContent
    
    if ( (cantidad == MIN && plusOMenos=="-" ) ||(cantidad == MAX && plusOMenos=="+" )  ){ 
      alert('cantidad no valida')
    } else if (plusOMenos == "-" ){
      setCantidad(cantidad - STEP)
    } else if (plusOMenos == "+") {
      setCantidad(cantidad + STEP)
    }

  }

  function handleSelect (e){
    setPlazo(+ e.target.value)
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header />

      <div className='flex justify-between my-6'>
        <Button 
          operador='-'
          fn={handleClick}
        />
        <Button 
          operador='+'
          fn={handleClick}
        />
        
      </div>

      <input 
        type="range"
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime:400"
        onChange={handleChange}
        min= {MIN}
        max= {MAX}
        step={STEP}
        value = {cantidad}
      />

      <p className="text-center my-10 text-5-xl font-extrabold text-indigo-600">
      { formatearDinero(cantidad) }
      </p>

      <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
          Elige un <span className='text-indigo-600'>Pazo</span> a pagar
      </h2>
      
      <select
        className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
        value={plazo}
        onChange={handleSelect}>
        
          <option value="6"
                >6 Meses</option>
          <option 
            value="12"
              >1 año</option>
          <option 
            value="24"
              >2 años</option>
      </select>

    <div className='my-5 space-y-3 bg-gray-50 p-5'></div>
      <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
          Resumen <span className='text-indigo-600'>de pagos</span> 
      </h2>

      <p className="text-xl text-gray-500 text-center font-bold">Meses : {plazo}</p>
      <p className="text-xl text-gray-500 text-center font-bold">Total a pagar: {formatearDinero(total)
      } </p>
      <p className="text-xl text-gray-500 text-center font-bold">Mensuales: {formatearDinero(mensuales)} </p>

    </div>
  )
}

export default App
