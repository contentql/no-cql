import { HeroType } from '@payload-types'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Params } from '../types'

interface HeroProps extends HeroType {
  params: Params
}

export const HeroBlock: React.FC<HeroProps> = ({ params, ...block }) => {
  return (
    <section className='relative flex min-h-screen w-full flex-col items-center gap-36 py-4'>
      <div className='hidden w-full items-center justify-between md:flex'>
        <code className='border-base-content/10 bg-base-content/20 rounded border-2 px-4 py-2'>
          Get Started by editing <strong>src/payload/blocks</strong>
        </code>

        <p className='inline-flex items-center gap-x-2 text-lg font-semibold'>
          By
          <Image src='/favicon.ico' alt='icon' width={32} height={32} />
          ContentQL
        </p>
      </div>

      <code className='sticky top-0 mt-0 w-full justify-center bg-transparent py-4  md:hidden'>
        Get Started by editing <strong>src/payload/blocks</strong>
      </code>

      <div className='font-display'>
        <div className='absolute left-[50%] top-[40%] h-[10%] w-[20%] -translate-x-1/2 rounded-full bg-primary blur-[110px]'></div>
        <h1 className='w-full text-center text-3xl font-bold md:text-4xl lg:text-7xl'>
          {block?.heading}
        </h1>
        <p className='text-base-content mt-3 w-full text-center text-3xl font-bold md:text-4xl lg:text-7xl'>
          {block?.subHeading}
        </p>
      </div>

      <div className='grid w-full gap-8 md:grid-cols-2 lg:grid-cols-4'>
        <Link
          href='/sign-in'
          className='group w-full cursor-pointer space-y-4 rounded px-6  py-3 transition-colors duration-300 hover:bg-secondary/30'>
          <p className='inline-flex items-center gap-x-4 font-display text-2xl font-bold'>
            Sign In
            <span className='transition-transform duration-300 group-hover:translate-x-2'>
              <ArrowRight />
            </span>
          </p>
          <p className='text-base-content/70'>
            Welcome! Please sign in to your account to access all your features,
            and services.
          </p>
        </Link>

        <Link
          href='/authors'
          className='group w-full space-y-4 rounded  px-6  py-3 transition-colors duration-300 hover:bg-secondary/30'>
          <p className='inline-flex items-center gap-x-4 font-display text-2xl font-bold'>
            Authors
            <span className='transition-transform duration-300 group-hover:translate-x-2'>
              <ArrowRight />
            </span>
          </p>
          <p className='text-base-content/70'>
            Meet the creative minds behind our compelling blogs, where each
            author brings expertise.
          </p>
        </Link>

        <Link
          href='/blogs'
          className='group w-full space-y-4 rounded  px-6  py-3 transition-colors duration-300 hover:bg-secondary/30'>
          <p className='inline-flex items-center gap-x-4 font-display text-2xl font-bold'>
            Blogs
            <span className='transition-transform duration-300 group-hover:translate-x-2'>
              <ArrowRight />
            </span>
          </p>
          <p className='text-base-content/70'>
            Discover a wealth of knowledge and inspiration in our insightful
            blog collection.
          </p>
        </Link>

        <Link
          href='/tags'
          className='group w-full space-y-4 rounded  px-6  py-3 transition-colors duration-300 hover:bg-secondary/30'>
          <p className='inline-flex items-center gap-x-4 font-display text-2xl font-bold'>
            Tags
            <span className='transition-transform duration-300 group-hover:translate-x-2'>
              <ArrowRight />
            </span>
          </p>
          <p className='text-base-content/70'>
            Dive deeper into our blog topics using our convenient tags page.
          </p>
        </Link>
      </div>
    </section>
  )
}
