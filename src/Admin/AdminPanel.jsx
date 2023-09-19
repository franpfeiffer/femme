import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export const AdminPanel = () => {
    const [accesoPermitido, setAccesoPermitido] = useState(false);
    const usuarioCookie = Cookies.get('usuario');
    useEffect(() => {
        if (usuarioCookie) {
            fetchUser();
        }
    }, [usuarioCookie]);
    const fetchUser = async () => {
        const response = await fetch('http://localhost:3000/admin/listAdmin', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${usuarioCookie}`,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            data.forEach(usuario => {
                if (usuario.usuario === usuarioCookie) {
                    setAccesoPermitido(true)
                }
            });
        } else {
            setAccesoPermitido(false);
        }
    };

    if (!accesoPermitido) {
        return 'No autorizado';
    }

    return (
    
    <div>AdminPanel {usuarioCookie}
    
    <Link to='/create'><button>CREAR PRODUCTO</button></Link>
    
    
    </div>
    
    
    );
};
