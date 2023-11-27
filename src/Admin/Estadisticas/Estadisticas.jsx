import React, { useEffect, useState } from 'react';
import useAuthorization from '../HooksAdmin/useAuthorization';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory';

export const Estadisticas = () => {
    const token = localStorage.getItem('token');
    const accesoPermitido = useAuthorization();
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        const fetchMarca = async () => {
            try {
                const response = await fetch('http://localhost:3000/facturacion/list', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                setDatos(data);
            } catch (error) {
                console.error('Error fetching componentes, marca:', error);
            }
        };

        fetchMarca();
    }, [token]);

    const calcularDatos = () => {
        const ingresosPorMes = {};

        datos.forEach(factura => {
            const fecha = new Date(factura.fecha_emision);
            const mesAnio = format(fecha, 'MM/yyyy');
            ingresosPorMes[mesAnio] = ingresosPorMes[mesAnio] || 0;
            ingresosPorMes[mesAnio] += factura.total;
        });

        const fechasMensuales = Object.keys(ingresosPorMes).sort();
        const ingresosMensuales = fechasMensuales.map(fecha => ingresosPorMes[fecha]);

        return { fechasMensuales, ingresosMensuales };
    };


    const { fechasMensuales, ingresosMensuales } = calcularDatos();

    if (!accesoPermitido) {
        return 'Acceso denegado';
    }

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h2>Ingresos Mensuales</h2>
            <VictoryChart
                domainPadding={{ x: 100 }}
                width={800}
                height={400}
                animate={{ duration: 500, onLoad: { duration: 500 } }}
            >
                <VictoryAxis tickValues={fechasMensuales} style={{ tickLabels: { fontSize: 12, padding: 10 } }} />
                <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} style={{ tickLabels: { fontSize: 12, padding: 10 } }} />
                <VictoryBar
                    data={fechasMensuales.map((fecha, index) => ({
                        x: fecha,
                        y: ingresosMensuales[index],
                        label: `$${ingresosMensuales[index]}`,
                    }))}
                    labels={({ datum }) => datum.label}
                    labelComponent={<VictoryTooltip />}
                />
            </VictoryChart>
        </div>

    );
};
