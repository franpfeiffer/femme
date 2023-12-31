import { useEffect, useState } from "react";


const useAuthorization = () => {
    const [accesoPermitido, setAccesoPermitido] = useState(false);
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await fetch('https://api-femme.onrender.com/admin/listAdmin', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setAccesoPermitido(true);
            } else {
                setAccesoPermitido(false);
            }
        } catch (error) {
            console.error('Error al obtener la autorización:', error);
            setAccesoPermitido(false);
        }
    };

    return accesoPermitido;
};

export default useAuthorization;
