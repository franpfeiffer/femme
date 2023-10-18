import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminLog = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/admin/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {  
          "Content-Type": "application/json"
        },
        credentials: 'include'
      });

      if (response.ok) {
        navigate('/adminpanel');
      } else {
        setError('Credenciales Incorrectas');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setError("Error de red. Por favor, intenta de nuevo más tarde.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <input type="text" name="usuario" value={formData.usuario} onChange={handleInputChange} placeholder="User" />
        </div>
        <div className="form-group">
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />
        </div>
        <button type="submit" className="login-button">Login</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};
