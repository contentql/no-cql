import EmailVerificationView from '@/components/auth/verify-email'
import withNoAuth from '@/utils/withNoAuth'

const VerifyEmail = () => {
  return <EmailVerificationView />
}

export default withNoAuth(VerifyEmail)
