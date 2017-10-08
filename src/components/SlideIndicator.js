// @flow

import React from 'react'
import styled from 'styled-components'

type Props = {
    items: number,
    activeIndex: number
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(0,0,0,0.24);
  margin: 8px;
  position: relative;
  overflow: hidden;
  transform: scale(1);
`

const DotActive = styled.div`
  background: rgba(0,0,0,0.87);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

const SlideIndicator = (props: Props) => (
    <Container>
        {Array(props.items).fill(null).map((_, index) => {
            let opacity = props.activeIndex - index
            if (opacity <= 0) {
                opacity = 1 + opacity
            } else if (opacity > 0) {
                opacity = 1 - opacity
            }
            if (opacity < 0) {
                opacity = 0
            }
            return (
                <Dot style={{ transform: `scale(${1 + (opacity / 2)})` }} key={index}>
                    <DotActive style={{ opacity }} />
                </Dot>
            )
        })}
    </Container>
)

export default SlideIndicator
