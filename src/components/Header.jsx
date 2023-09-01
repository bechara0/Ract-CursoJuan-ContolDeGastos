import { ControlPresupuesto } from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
  isValidPresupuesto,
  gastos,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValidPresupuesto ? (
        <ControlPresupuesto
          presupuesto={presupuesto}
          setGastos={setGastos}
          gastos={gastos}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
