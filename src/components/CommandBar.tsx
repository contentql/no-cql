'use client'

import { Page } from '@payload-types'
import { useDebouncedEffect } from '@payloadcms/ui'
import { CommandLoading } from 'cmdk'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { trpc } from '@/trpc/client'
import { useMetadata } from '@/utils/metadataContext'

import { Button } from './ui/button'

type CommandItemType = {
  id: string
  name: any
  subtitle: any
  perform: () => void
  section: 'tags' | 'blogs' | 'authors'
  priority: number
}

type SectionType = 'blogs' | 'tags' | 'authors'

const CommandBar = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] =
    useState<Record<SectionType, CommandItemType[]>>()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const { redirectionLinks } = useMetadata()

  const { mutate: globalSearchMutate, isPending } =
    trpc.search.globalSearch.useMutation({
      // on success adding those results
      onSuccess: data => {
        if (data && data.length > 0) {
          const groupedList = data
            .map(result => {
              const section = result?.parsedValues?.category as SectionType

              if (result.parsedValues?.title) {
                return {
                  id: String(result.id),
                  name: result.parsedValues?.title || '',
                  subtitle: result.parsedValues?.description || '',
                  perform: () => {
                    if (redirectionLinks) {
                      const { authorLink, blogLink, tagLink } = redirectionLinks

                      const linkMap = {
                        blogs: blogLink,
                        tags: tagLink,
                        authors: authorLink,
                      }

                      const link = linkMap[section]

                      const slug =
                        link && typeof link !== 'string'
                          ? (link.value as Page).path!
                          : ''
                      const slicedSlug = slug ? slug.split('[')[0] : ''

                      if (slug) {
                        return router.push(
                          `${slicedSlug}${result?.parsedValues?.path}`,
                        )
                      }
                    }
                  },
                  section,
                  priority: result.priority as number,
                }
              }

              return undefined
            })
            .filter(result => result !== undefined)
            .reduce<Record<SectionType, CommandItemType[]>>(
              (acc, current) => {
                if (acc[current?.section]) {
                  acc[current?.section].push(current)
                } else {
                  acc[current?.section] = [current]
                }
                return acc
              },
              {} as Record<SectionType, CommandItemType[]>,
            )

          setSearchResults(groupedList)
        }
      },
      // on error adding no results found
      onError: () => {
        setSearchResults(undefined)
      },
    })

  useDebouncedEffect(
    () => {
      globalSearchMutate({ search })
    },
    [search],
    800,
  )

  return (
    <>
      <Button
        size={'sm'}
        onClick={() => {
          setOpen(current => !current)
        }}>
        Search
        <span className='rounded border border-primary-foreground px-1 text-xs'>
          ⌘ K
        </span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Type a command or search...'
          onValueChange={search => setSearch(search)}
        />

        <CommandList>
          {isPending && <CommandLoading>Loading...</CommandLoading>}

          {!isPending && !Object.entries(searchResults ?? {}).length && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {searchResults
            ? Object.entries(searchResults).map(([group, items]) => {
                return (
                  <CommandGroup key={group} heading={group}>
                    {items.map(({ perform, name, subtitle }) => {
                      return (
                        <CommandItem
                          key={name}
                          className='grid'
                          onSelect={() => {
                            perform()
                            setOpen(false)
                          }}>
                          <p className='font-semibold'>{name}</p>
                          {subtitle && (
                            <p className='text-muted-foreground'>{subtitle}</p>
                          )}
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                )
              })
            : null}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandBar
