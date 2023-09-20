import { Link } from "react-router-dom";
import useAuthorization from './HooksAdmin/useAuthorization';

export const AdminPanel = () => {
    const accesoPermitido = useAuthorization();

    if (!accesoPermitido) {
        return 'No autorizado';
    }

    return (
    
    <div>AdminPanel
    
    <Link to='/create'><button>CREAR PRODUCTO</button></Link>
    

    </div>
    
    
    );
};
