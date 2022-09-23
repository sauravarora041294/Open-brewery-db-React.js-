import { FC, ReactElement, useEffect, useState } from "react";
import { IDashboard } from "../../../interfaces/dashboard";
import "./Form.scss";

interface Props {
    data?: any;
    isEdit: boolean;
    onAdd: (data: IDashboard) => void;
    handleEdit: (data: IDashboard) => void;
}

const Form: FC<Props> = ({data, onAdd, isEdit, handleEdit}): ReactElement => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [rating, setRating] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        setName(data?.name ?? "");
        setType(data?.brewery_type ?? "");
        setCity(data?.city ?? "");
        setCountry(data?.country ?? "");
        setId(data?.id ?? "");
        setRating(data?.rating ?? "");
    }, [data]);

    const isFormInValid = () => {
        if(name === "" || type === "" || city === "" || country === "" || rating === "") {
            return true;
        } 
        return false;
    }

    const resetForm = () => {
        setName("");
        setType("");
        setCity("");
        setCountry("");
        setRating("0");
    }

    const handleAdd = () => {
        const saveData: IDashboard = {
            name,
            brewery_type: type,
            city,
            country,
            rating,
            id: isEdit ? id : Math.floor((Math.random() * 10000) + 1).toString()
        }
        if(isEdit) {
            handleEdit(saveData);
        } else {
            onAdd(saveData);
        }
        resetForm();
    }

    const handleRating = (rating: string) => {
        if(+rating > 0 && +rating < 10){
            setRating(rating.toString());
        } else {
            setRating("");
        }
    }

    return <div>
        <h2>Add/Edit Brewery Details</h2>
        <form className="FormSection">
            <div className="FormRow">
                <label>Brewery Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="FormRow">
                <label>Brewery Type</label>
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div className="FormRow">
                <label>City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="FormRow">
                <label>Country</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div className="FormRow">
                <label>Rating</label>
                <input type="number" value={rating} onChange={(e) => handleRating(e.target.value)} />
            </div>
        </form>
        <button className="FormButton" disabled={isFormInValid()} onClick={() => handleAdd()}>Save</button>
    </div>
}

export default Form;