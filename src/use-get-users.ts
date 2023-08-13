import { useEffect, useRef, useState } from "react";
import { User } from "./user.interface";


export function useGetUsers() {
  const [filteredUsers, setFilteredUsers] = useState<string | null>(null);
  const [orderUsers, setOrderUsers] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  let originalUsers = useRef<User[]>(users);

  const filtered = filteredUsers
    ? [...users].filter((user) => user.location.country.toLowerCase().includes(filteredUsers.toLowerCase()))
    : users;

  const sorting = orderUsers
    ? [...filtered].sort((a, b) => {
      return a.location.country.localeCompare(b.location.country);
    })
    : filtered;

  const handleNext = () => {
    setPage(page + 1);
  }

  const handlePrev = () => {
    setPage(page - 1);
  }

  const selectCurrentPage = (page:number) => {
    setPage(page)
  }

  useEffect(() => {
    fetch(`https://randomuser.me/api/?page=${page}&results=10`)
      .then((res) => res.json())
      .then((data) => {
        const users: User[] = data.results;
        setUsers(users)
        originalUsers.current = users;
      })
      .catch((error) => console.log(error))
  }, [page])

  const indexPages:number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]
 
  return {
    users: sorting,
    setFilteredUsers,
    orderUsers,
    setOrderUsers,
    originalUsers,
    setUsers,
    handleNext,
    handlePrev,
    indexPages,
    selectCurrentPage
  }
}