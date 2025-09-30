'use client'

import { Button, useField, useFormFields } from '@payloadcms/ui'
import React, { useCallback, useEffect, useState } from 'react'

import { checkDNSConfigAction } from './checkDNSConfigAction'

const VerifiedDomainField: React.FC<any> = props => {
  const { path } = props

  const { value, setValue } = useField<boolean>({ path })

  const { hostname } = useFormFields(([fields]) => ({
    hostname: fields?.hostname?.value as string | undefined,
  }))

  const [loading, setLoading] = useState(false)
  const [dnsDetails, setDnsDetails] = useState<any>(null)

  const checkDNS = useCallback(async () => {
    if (!hostname) return
    setLoading(true)
    try {
      const res = await checkDNSConfigAction(
        hostname,
        'CNAME',
        'charan.deepflow.sh',
      )
      if (res.success) {
        setValue(res.verified)
      }
      setDnsDetails(res)
    } finally {
      setLoading(false)
    }
  }, [hostname, setValue])

  useEffect(() => {
    checkDNS()
    const interval = setInterval(checkDNS, 10000)
    return () => clearInterval(interval)
  }, [checkDNS])

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid var(--theme-elevation-100)',
      }}>
      <strong>Domain Verification</strong>
      <p>Hostname: {hostname || '-'}</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>Status: {value ? '✅ Verified' : '❌ Not verified'}</p>
      )}

      <Button onClick={checkDNS} size='small' disabled={loading}>
        Refresh DNS
      </Button>

      {dnsDetails && (
        <pre
          style={{
            marginTop: '1rem',
            background: 'var(--theme-elevation-50)',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            overflowX: 'auto',
          }}>
          {JSON.stringify(dnsDetails, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default VerifiedDomainField
