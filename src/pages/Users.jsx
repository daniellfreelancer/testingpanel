import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { reloadValueState } from '../features/reloadSlice'
import axios from 'axios'
import UserList from '../components/UserList'


export default function Users() {

  const reloaded = useSelector(reloadValueState)
  const [usersData, setUsersData] = useState([])


  useEffect(() => {
    axios.get('https://whale-app-qsx89.ondigitalocean.app/admin/users').then((res) => {

      if (res.data) {
        setUsersData(res.data.users)
      }
    }).catch((error) => {
      console.log(error)
    })

  }, [reloaded])

  return (
    <>
      <UserList usersData={usersData} />
    </>
  )
}
