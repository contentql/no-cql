import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '@react-email/components'

interface ResetPasswordEmailProps {
  userFirstName: string
  resetPasswordLink: string
}

const ResetPasswordTemplate = ({
  userFirstName,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row style={header}>
              <Column>
                <Img
                  src={`${process.env.PAYLOAD_URL}/favicon.ico`}
                  width='40'
                  height='40'
                  alt='ContentQL'
                />
              </Column>
              <Column>
                <Text style={title}>ContentQL</Text>
              </Column>
            </Row>
            <Hr style={hr} />
          </Section>
          <Section style={infoSection}>
            <Text style={infoText}>Hello, {userFirstName}</Text>

            <Text style={infoText}>
              Someone recently requested a password change for your account. If
              this was you, you can set a new password here:
            </Text>

            <Button href={resetPasswordLink} style={button}>
              Rest password
            </Button>

            <Text className='dark:text-zinc-300'>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default ResetPasswordTemplate

export const ResetPassword = (props: ResetPasswordEmailProps) =>
  render(<ResetPasswordTemplate {...props} />, { pretty: true })

const infoSection = {
  marginBottom: '24px',
}

const header = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '10px',
}

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#f1f5f9',
  marginLeft: '10px',
}

const main = {
  backgroundColor: '#fff',
  color: '#f1f5f9',
  margin: 'auto',
  padding: '10px 0px',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
}

const container = {
  maxWidth: '600px',
  backgroundColor: '#0f172a',
  margin: 'auto',
  padding: '24px',
}

const hr = {
  borderColor: '#334155',
  margin: '20px 0',
}

const infoText = {
  margin: '0 0 10px 0',
  fontSize: '14px',
  color: '#f1f5f9',
  textAlign: 'left' as const,
}

const button = {
  fontSize: '16px',
  backgroundColor: '#8b5cf6',
  color: '#f1f5f9',
  lineHeight: 1.5,
  borderRadius: '8px',
  padding: '12px 24px',
  transition: 'background-color 0.2s ease-in-out',
  marginTop: '8px',
  marginBottom: '8px',
}
