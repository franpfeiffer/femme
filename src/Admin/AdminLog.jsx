
export const AdminLog = () => {
  return (
    <div className="login-container">
      <form action="http://localhost:3000/admin/login" method="post" className="login-form">
        <h2>Admin Login</h2>
        <div className="form-group">
          <input type="text" name="usuario" id="usuario" placeholder="User" />
        </div>
        <div className="form-group">
          <input type="password" name="password" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="login-button">Iniciar sesión</button>
      </form>
    </div>
  )
}
