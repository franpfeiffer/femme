
export const AdminLog = () => {
  return (
    <div>

        <form action="http://localhost:3000/admin/login" method="post">
            <input type="text" name="usuario" />
            <input type="password" name="password" id="" />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}
