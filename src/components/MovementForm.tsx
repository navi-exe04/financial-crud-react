import { useState, FormEvent, useEffect } from "react"
import { Movement } from "../models/Movement"

// Props interface
interface MovementFormProps {
    movement: Movement | null,
    funOnSave: (movement: Movement) => void
}

export default function MovementForm({movement, funOnSave} : Readonly<MovementFormProps>) {

    // State component
    const [type, setType] = useState<'Income' | 'Expense'>(movement?.type ?? 'Income');
    const [amount, setAmount] = useState(movement?.amount ?? 0);
    const [description, setDescription] = useState(movement?.description ?? "");

    // Use effect for movement info in form
    useEffect(() => {
        setType(movement?.type ?? 'Income');
        setAmount(movement?.amount ?? 0);
        setDescription(movement?.description ?? "");
    }, [movement]);

    // Funcion for form submit
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Save the movement info in app state
        const movementInfo : Movement = {
            id: movement ? movement.id : Date.now(),
            type: type,
            amount: amount,
            description: description,
            date: new Date(),
        };
        funOnSave(movementInfo);
        // Clean the component state
        setType('Income');
        setAmount(0);
        setDescription('');
    }

    return (
        <form onSubmit={handleSubmit} className="card">
            <div className="card-header">
                {
                    movement == null
                        ? (<h2>Create a movement</h2>)
                        : (<h2>Edit movement</h2>) 
                }
            </div>
            <div className="px-5 py-2">
                <label htmlFor="type" className="form-label">Movement type:</label>
                <select 
                    value={type} 
                    name="type" 
                    id="type" 
                    onChange={(e) => setType(e.target.value as 'Income' | 'Expense')}
                    className="form-select"
                >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
            </div>
            <div className="px-5 py-2">
                <label htmlFor="amount" className="form-label">Movement amount $:</label>
                <input 
                    type="number" 
                    name="amount" 
                    value={amount} 
                    placeholder="Enter the amount of the movement"
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className="form-control"
                />
            </div>
            <div className="px-5 py-2">
                <label htmlFor="description" className="form-label">Description:</label>
                <input 
                    type="text" 
                    name="description" 
                    value={description} 
                    placeholder="Enter the description of the movement"
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                />
            </div>
            {
                movement 
                    ? (<button type="submit" className="btn btn-primary my-3 mx-5">Create movement</button>)
                    : (<button type="submit" className="btn btn-primary my-3 mx-5">Edit movement</button>) 
            }
        </form>
    )
}
