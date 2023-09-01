import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(presupuesto);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    setDisponible(totalDisponible);
    const porcionGastado = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);
    setTimeout(() => {
      setPorcentaje(porcionGastado);
    }, 1500);

    setGastado(totalGastado);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleReset = () => {
    const resultado = confirm("¿Desear resetear presupuesto y gastos?");
    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div className="conteniendo-presupuesto">
        <CircularProgressbar
          value={porcentaje}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "red" : "#3b82f6",
            trailColor: "#f5f5f5",
            textColor: porcentaje > 100 ? "red" : "#3b82f6",
          })}
          text={`${porcentaje}% Gastado`}
        />

        <div className="contenido-presupuesto">
          <button type="button" onClick={handleReset} className="reset-app">
            Resetear App
          </button>
          <p>
            <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
          </p>
          <p className={`${disponible < 0 ? "negativo" : ""}`}>
            <span>Disponible: </span> {formatearCantidad(disponible)}
          </p>
          <p>
            <span>Gastado: </span> {formatearCantidad(gastado)}
          </p>
        </div>
      </div>
    </div>
  );
};
