/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie';
import useAuthorization from '../../Admin/HooksAdmin/useAuthorization';

export const DeleteButton = ({ id }) => {
    const accesoPermitido = useAuthorization();
    const token = localStorage.getItem('token');
    const handleButton = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta imagen?");
        if (confirmDelete) {
            try {
                const response = await fetch(`https://api-femme.onrender.com/productos/${id}/Deleteimagenes`, {
                    method: "DELETE",
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
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
    }
    if(!accesoPermitido)return
    return (
        <button onClick={handleButton} className='button-eliminar boton-agregar'>Eliminar Imagen</button>
    )
}