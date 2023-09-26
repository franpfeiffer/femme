import { Link } from "react-router-dom"

export const EditButton = ({id}) => {
  return (
    <Link to={`/${id}/editar`} ><button className="button-editar boton-agregar">Editar</button></Link>
  )
}
