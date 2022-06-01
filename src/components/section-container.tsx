import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}

/**
 * a relative centered container with margin settings
 */
const SectionContainer = ({ children, className }: Props) => (
  <div
    className={classNames(
      `relative overflow-hidden my-16 md:my-24 mx-6 lg:mx-16 xl:mx-20`,
      className
    )}
  >
    {children}
  </div>
)

export default SectionContainer
