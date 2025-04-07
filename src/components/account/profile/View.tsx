import { User } from '@payload-types'

import ProfileForm from './ProfileForm'

interface Props {
  user: User
}

const ProfileView: React.FC<Props> = ({ user }) => {
  return (
    <section className='flex min-h-screen w-full items-center justify-center'>
      <ProfileForm user={user} />
    </section>
  )
}

export default ProfileView
