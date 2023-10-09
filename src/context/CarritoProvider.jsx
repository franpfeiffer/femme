import { useReducer } from 'react'
import { CarritoContext } from './CarritoContext'


const initialState = []

export const CarritoProvider = ({ children }) => {

    const comprasReducer = (state = initialState, action = {}) => {
        switch (action.type) {
            case '[CARRITO] Agregar Compra':
                return [...state, action.payload]
            case '[CARRITO] Aumentar Cantidad Compra': 
                return state.map(item => {
                    const cant = item.cantidad + 1
                    if(item.id === action.payload) return {...item, cantidad: cant}
                    return item
                })
            case '[CARRITO] Disminuir Cantidad Compra': 
            return state.map(item => {
                const cant = item.cantidad -1
                if(item.id === action.payload && item.cantidad > 1) return {...item, cantidad: cant}
                return item
            })
                break;
            case '[CARRITO] Eliminar Compra':
                return state.filter(compra => compra.id !== action.payload)
            default:
                return state
        }
    }

    const [listaCompras, dispatch] = useReducer(comprasReducer, initialState)

    const agregarCompra = (producto, colorSeleccionado, talleSeleccionado) => {
        const compra = {
            id: `${producto.id}-${colorSeleccionado}-${talleSeleccionado}`,
            idProducto: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
            color: colorSeleccionado,
            talle: talleSeleccionado,
        };
        const action = {
            type: '[CARRITO] Agregar Compra',
            payload: compra,
        };
        dispatch(action)

    }
    const aumentarCantidad = (id) => {
        const action = {
            type: '[CARRITO] Aumentar Cantidad Compra',
            payload: id
        }
        dispatch(action)

    }
    const disminuirCantidad = (id) => {
        const action = {
            type: '[CARRITO] Disminuir Cantidad Compra',
            payload: id
        }
        dispatch(action)

    }
    const eliminarCompra = (id) => {
        const action = {
            type: '[CARRITO] Eliminar Compra',
            payload: id
        }
        dispatch(action)

    }
    
    return (

        <CarritoContext.Provider value={{listaCompras, agregarCompra, aumentarCantidad, disminuirCantidad, eliminarCompra }}>
            {children}
        </CarritoContext.Provider>
    )
}