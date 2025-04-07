import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <div className='login-icon-container'>
      <Image
        src={'/logo.svg'}
        width={40}
        height={40}
        alt='ContentQL Logo'
        className='logo-image'
      />

      <p>ContentQL</p>
    </div>
  )
}

export default Logo
