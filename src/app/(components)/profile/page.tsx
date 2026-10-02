import { redirect } from 'next/navigation'
import { myToken } from '@/utilities/myToken'

export default async function Profile() {
      const token = await myToken()
      if (!token) {
        redirect('/login')
        return
      }
    redirect('/profie/addresses')
}
