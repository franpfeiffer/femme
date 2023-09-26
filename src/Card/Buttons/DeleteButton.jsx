/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie';

export const DeleteButton = ({ id }) => {
    const usuarioCookie = Cookies.get('usuario');
    const handleButton = async () => {
        try {
            const response = await fetch(`http://localhost:3000/productos/${id}/delete`, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${usuarioCookie}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error al enviar el formulario: ${response.status}`);
            }

            const responseData = await response.json();

        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    }
    return (
        <button onClick={handleButton} className='button-eliminar boton-agregar'>Eliminar</button>
    )
}
