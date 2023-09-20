import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

const useAuthorization = () => {
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
            const tieneAcceso = data.some(usuario => usuario.usuario === usuarioCookie);
            setAccesoPermitido(tieneAcceso);
        } else {
            setAccesoPermitido(false);
        }
    };

    return accesoPermitido;
};

export default useAuthorization;