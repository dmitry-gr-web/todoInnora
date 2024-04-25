import React, { ReactElement, useState, Children } from 'react'
interface InfinityListProps {
  children: ReactElement[]
  itemHeight: number
  windowHeight: number
  classParent: string
}
const InfinityList: React.FC<InfinityListProps> = ({
  children,
  itemHeight = 26,
  windowHeight = 100,
  classParent = '',
}) => {
  const [scrollTop, setScrollTop] = useState(0)
  let numItems = Children.count(children)
  const innerHeight = numItems * itemHeight
  const offset = 0
  const startIndex = Math.max(
    0,
    Math.floor((scrollTop * 0.8) / itemHeight) - offset,
  )
  const endIndex = Math.min(
    numItems - 1,
    Math.floor((scrollTop + windowHeight * 0.8) / itemHeight) + offset,
  )
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }
  const newChildrens = Children.map(children, (child, i) => {
    let style: React.CSSProperties = {
      position: 'absolute',
      transform: `translate3d(0px, ${i * itemHeight}px, 0px)`,
      willChange: 'transform, scroll-position',
    }
    return (
      <div className='item' style={style}>
        {child}
      </div>
    )
  }).slice(startIndex, endIndex + 5)
  return (
    <div
      className={classParent}
      onScroll={onScroll}
      style={{ overflowY: 'scroll', height: `${windowHeight}px` }}
    >
      <div
        style={{
          position: 'relative',
          height: `${innerHeight}px`,
        }}
      >
        {newChildrens}
      </div>
    </div>
  )
}

export default InfinityList
