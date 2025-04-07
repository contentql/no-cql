import { NextPage } from 'next'

import { ResetPasswordView } from '@/components/auth/reset-password'
import withNoAuth from '@/utils/withNoAuth'

const ResetPasswordPage: NextPage = async () => {
  return <ResetPasswordView />
}

export default withNoAuth(ResetPasswordPage)
