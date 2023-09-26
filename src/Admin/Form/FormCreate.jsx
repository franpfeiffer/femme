import React, { useState } from "react";

export const FormCreate = ({ onSubmit, formData, setFormData, inputName, inputPlaceholder, buttonText }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name={inputName}
                value={formData[inputName]}
                onChange={handleInputChange}
                className="input-create-stock"
                placeholder={inputPlaceholder}
            />
            <button>{buttonText}</button>
        </form>
    );
}
