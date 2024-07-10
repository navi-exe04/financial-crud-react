import { useEffect, useState } from "react";
import MovementForm from "./components/MovementForm";
import MovementsList from "./components/MovementsList";
import { Movement } from "./models/Movement";

export default function App() {

  // State application
  const [movements, setMovements] = useState<Movement[]>([]);
  const [editingMovement, setEditingMovement] = useState<Movement | null>(null);
  const [total, setTotal] = useState<number>(0);

  // Use effect for total calculation
  useEffect(() => {
    let total_amounts : number = 0;
    movements.forEach((m) => {
      total_amounts = m.type == 'Income' ? total_amounts + m.amount : total_amounts - m.amount;
    });
    setTotal(total_amounts)
  }, [movements]);

  // Function to save new movement or edit a movement
  const handleSaveMovement = (movement : Movement) => {
    // Verify if there is movement information to edit
    if (editingMovement) {
      setMovements(
        movements.map((m) => (m.id === movement.id ? movement : m))
      );
      setEditingMovement(null);
    }
    // Saves a new movement info
    else {
      setMovements([...movements, movement]);
    }
  }

  // Function to save the movement info to edit
  const handleEditMovement = (movement : Movement) => {
    setEditingMovement(movement);
  }

  // Function to delete a movement
  const handleDeleteMovement = (id : number) => {
    setMovements(movements.filter((m) => m.id !== id));
  }

  return (
    <main>
      <div className="my-5">
        <h1 className="display-1 text-center">FINANCIAL CRUD</h1>
        {
          total <= 0
          ? (<h2 className="display-5 text-center text-danger">Total: ${total}</h2>)
          : (<h2 className="display-5 text-center text-success">Total: ${total}</h2>)
        }
      </div>
      <div className="container text-center w-100">
        <div className="row">
          <section className="col-lg-6 col-xs-12">
            <MovementForm funOnSave={handleSaveMovement} movement={editingMovement}></MovementForm>
          </section>
          <section className="col-lg-6 col-xs-12">
            <h2 className="mb-3">List of movements</h2>
            <MovementsList movements={movements} funEditMovement={handleEditMovement} funDeleteMovement={handleDeleteMovement}></MovementsList>
          </section>
        </div>
      </div>
    </main>
  )
}

