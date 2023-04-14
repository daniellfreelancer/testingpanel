function InstitutionInfo({ usersData, usersAdmin }) {
    return (
      <div className='bg-white flex justify-between rounded-lg w-full border p-4'>
        <div className='flex flex-col w-full pb-2 gap-2'>
          <p className='text-2xl font-bold'>Datos de la institución:</p>
          <p className='text-gray-600'>Nombre: {usersData?.name}</p>
          <p className='text-gray-600'>Direccion: {usersData?.address}</p>
          <p className='text-gray-600'>Telefono: +56 {usersData?.phone}</p>
          <p className='text-gray-600'>Email: {usersData?.email}</p>
          <p className='text-gray-600'>
            Administrador: {usersAdmin?.name + ' ' + usersAdmin?.lastName}
          </p>
        </div>
      </div>
    );
  }
  
  export default InstitutionInfo;
  