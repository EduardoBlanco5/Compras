import { useState } from "react"
import Header from "./components/Header"
import Guitarra from "./components/Guitarra"
import { db } from "./data/db.js"


function App() {

  const [data, setData] = useState(db)
  const [carrito, setCarrito] = useState([])

  function addToCart(item) {

    const itemExists = carrito.findIndex((guitar) => guitar.id === item.id)
    
    if (itemExists >=0 ) {
      const updatedCart = [...carrito]
      updatedCart[itemExists].quantity++
      setCarrito(updatedCart)
    }else {
      item.quantity = 1
      setCarrito([...carrito, item])

    }

  }

  function removeFromCart(id) {
    setCarrito(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = carrito.map( item => {
      if (item.id === id) {
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCarrito(updatedCart)
  }

  

  return (
    <>
      
     <Header
      carrito={carrito}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
     /> 
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=>{

            return(
              <Guitarra
                key={guitar.id}
                guitar={guitar}
                setCarrito={setCarrito}
                addToCart={addToCart}
              />
            )
          })}
           
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
