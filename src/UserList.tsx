import { User } from "./user.interface"

interface UserListProps {
  users: User[];
  handleDelete: (email:string) => void;
}

export function UserList({ users, handleDelete }: UserListProps) {

  return (
    <table width="100%">
      <thead>
        <th>
          Foto
        </th>
        <th>
          Nombre
        </th>
        <th>
          Apellido
        </th>
        <th>
          País
        </th>
        <th>
          Acción
        </th>
      </thead>
      <tbody>
        {
          users && users.map((user: User) => {
            return (
              <tr key={user.email}>
                <td>
                  <img src={user.picture.thumbnail} alt={user.email} />
                </td>
                <td>
                  {user.name.first}
                </td>
                <td>
                  {user.name.last}
                </td>
                <td>
                  {user.location.country}
                </td>
                <td>
                  <button onClick={() => handleDelete(user.email)}>
                    Borrar
                  </button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}