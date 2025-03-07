import { RouterLayout } from './router-layout'
import { Outlet, useLocation } from '@umijs/max'

export default () => {

  const location = useLocation()

  console.log(location, 'location')

  if (location.pathname === '/home') {
    return <Outlet/>
  }

  return (
    <RouterLayout />
  )
}
