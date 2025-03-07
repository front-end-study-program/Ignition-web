import * as React from 'react'
import { Col, Row, Layout } from 'antd'
import { ToolBox } from './toolbar'
import { Canvas } from './canvas'
import { css } from '@emotion/css'
import { LeftPanel } from './left'
import { RightPanel } from './right'
import { useTokens } from '@/hooks/useTokens'
import { Editor } from '@craftjs/core'
import { RenderNodeWrapper } from './canvas/render-node-wrapper'
import * as _materials_ from '@lgnition-lowcode/materials'

console.log(_materials_, '_materials_')

export interface FrameworkProviderProps {
  children?: React.ReactNode
}

export const FrameworkContext =
  React.createContext<FrameworkProviderProps | null>(null)

export function Framework({ children }: FrameworkProviderProps): JSX.Element {
  const { token } = useTokens()

  return (
    <Editor enabled resolver={_materials_} onRender={RenderNodeWrapper} onNodesChange={(dragProps) => console.log(`onNodesChange`, dragProps)} >
      <FrameworkContext.Provider value={null}>
        {
          children ? children : (
            <Layout
              className={css({
                height: '100vh',
                overflow: 'hidden',
                background: token.colorBgContainer
              })}
            >
              <ToolBox />
              <Row className={css({
                height: '100%'
              })}
              >
                <Col flex='320px'>
                  <LeftPanel />
                </Col>
                <Col flex='auto'>
                  <Canvas />
                </Col>
                <Col flex='350px'>
                  <RightPanel />
                </Col>
              </Row>
            </Layout>
          )
        }
      </FrameworkContext.Provider>
    </Editor>
  )
}
