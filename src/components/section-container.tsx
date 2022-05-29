import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}

/**
 * a relative centered container with padding settings
 */
const SectionContainer = ({ children, className }: Props) => (
  <div
    className={classNames(
      `container relative mx-auto py-16 md:py-24 px-6 lg:px-16 xl:px-20`,
      className
    )}
  >
    {children}
  </div>
)

export default SectionContainer
