import { Movement } from "../models/Movement";

// Props interface
interface MovementsListProps {
    movements: Movement[],
    funEditMovement: (movement : Movement) => void,
    funDeleteMovement: (id : number) => void,
}

export default function MovementsList({ movements, funEditMovement, funDeleteMovement } : Readonly<MovementsListProps>) {
    // Iterate the movements
    return (
        movements.map((m) => (
            <div key={m.id} className="card my-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3>{m.description}</h3>
                    {
                        m.type == "Income" 
                            ? (<span className="display-6 text-success">+ ${m.amount}</span>) 
                            : (<span className="display-6 text-danger">- ${m.amount}</span>)
                    }
                </div>
                <div className="card-body d-flex justify-content-between">
                    <span className="fs-4 fst-italic">Date: {m.date.toDateString()}</span>
                    <div>
                        <button onClick={() => funEditMovement(m)} className="btn btn-success mx-2">Edit</button>
                        <button onClick={() => funDeleteMovement(m.id)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        ))
    )
}
