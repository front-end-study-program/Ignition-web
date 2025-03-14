import * as React from 'react'
import type { UserComponent} from '@craftjs/core';
import { useNode } from '@craftjs/core'
import type { ResizeCallback } from 're-resizable';
import { Resizable } from 're-resizable'
import { IndicatorRound } from './Indicators'

export interface ContainerProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  initialWidth?: string | number;
  initialHeight?: string | number;
}

export const Container: UserComponent<
    ContainerProps
> = ({ children, initialWidth, initialHeight, style, ...styleProps }) => {
  const resizable = React.useRef<any>(null)

  const {
    actions: { setProp },
    connectors: { connect },
    active
  } = useNode((node) => ({
    parent: node.data.parent,
    active: node.events.selected
  }))

  const handleResizableChange: ResizeCallback = (
    _,
    __,
    elRef,
  ) => {
    const { width, height } = elRef.style
    setProp((prop: Record<string, any>) => {
      prop.width = width
      prop.height = height
    }, 400)
  }

  console.log(active, 'active')

  return (
    <Resizable
      style={{
        position: 'relative',
        ...style,
        ...styleProps,
      }}
      defaultSize={{
        width: initialWidth || '100%',
        height: initialHeight || '100%'
      }}
      bounds='parent'
      enable={{
        right: true,
        bottom: true
      }}
      ref={(ref) => {
        if (ref) {
          resizable.current = ref
          connect(resizable.current.resizable)
        }
      }}
      onResize={handleResizableChange}
    >
      {children}
      <IndicatorRound show={active} />
    </Resizable>
  )
}


Container.craft = {
  displayName: '容器11',
  related: {
  }
}